from __future__ import annotations

import json
import sys
import types
import unittest
from unittest.mock import patch

from schemas.inquiry import FollowupGuidanceRequest
from services.business_llm_client import (
    BusinessLlmClient,
    BusinessLlmError,
    BusinessLlmSettings,
    DEFAULT_LOCAL_MODEL_PATH,
    load_business_llm_settings,
    _dedupe_followup_questions,
    _rewrite_repeated_followup_questions,
)


class BusinessLlmClientTest(unittest.TestCase):
    def test_loads_openai_compatible_provider_settings(self) -> None:
        with patch.dict(
            "os.environ",
            {
                "BUSINESS_LLM_PROVIDER": "openai_compatible",
                "BUSINESS_LLM_MODEL": "deepseek-ai/DeepSeek-V3.2",
                "BUSINESS_LLM_BASE_URL": "http://deepseek-server:8000/v1/",
                "BUSINESS_LLM_API_KEY": "test-token",
                "BUSINESS_LLM_TIMEOUT_SECONDS": "900",
                "BUSINESS_LLM_MAX_NEW_TOKENS": "1536",
                "BUSINESS_LLM_TEMPERATURE": "1.0",
                "BUSINESS_LLM_TOP_P": "0.95",
            },
            clear=False,
        ):
            settings = load_business_llm_settings()

        self.assertEqual(settings.provider, "openai_compatible")
        self.assertEqual(settings.model, "deepseek-ai/DeepSeek-V3.2")
        self.assertEqual(settings.base_url, "http://deepseek-server:8000/v1")
        self.assertEqual(settings.api_key, "test-token")
        self.assertEqual(settings.timeout_seconds, 900)
        self.assertEqual(settings.max_new_tokens, 1536)
        self.assertEqual(settings.temperature, 1.0)
        self.assertEqual(settings.top_p, 0.95)

    def test_followup_guidance_rejects_mock_provider(self) -> None:
        client = BusinessLlmClient(
            BusinessLlmSettings(
                provider="mock",
                model="mock-business-llm",
                model_path=DEFAULT_LOCAL_MODEL_PATH,
                timeout_seconds=1,
                max_new_tokens=64,
                torch_dtype="auto",
                device_map="auto",
            )
        )
        request = _followup_request(
            "这次出行的目的主要是去赌博，没有其他同行人员，已经安排酒店住宿。"
        )

        with self.assertRaisesRegex(BusinessLlmError, "business LLM"):
            client.generate_followup_guidance(request, "prompt")

    def test_openai_compatible_generates_first_round_strategy(self) -> None:
        fake_httpx = _install_fake_httpx(
            _chat_response(
                {
                    "sessionId": "ignored",
                    "riskAssessment": {
                        "level": "medium",
                        "summary": "需核验行程目的和材料链条。",
                        "reasons": ["行程信息仍需补齐"],
                    },
                    "strategy": {
                        "goal": "初步试探真实出境目的。",
                        "focusAreas": ["出境目的", "行程时间线"],
                    },
                    "questions": [
                        {
                            "questionId": "q1",
                            "priority": 1,
                            "question": "请您按时间顺序说明本次出行安排。",
                            "purpose": "核验出境目的。",
                            "expectedEvidence": ["行程订单"],
                        }
                    ],
                    "operatorNote": "保持中性核验。",
                }
            )
        )
        client = BusinessLlmClient(_openai_settings())

        response = client.generate_first_round_strategy(_first_round_request(), "prompt")

        self.assertEqual(response.session_id, "inq-test")
        self.assertEqual(response.llm.provider, "openai_compatible")
        self.assertEqual(response.llm.model, "deepseek-ai/DeepSeek-V3.2")
        self.assertEqual(response.risk_assessment.level, "medium")
        self.assertEqual(len(response.memory_updates), 2)
        self.assertEqual(fake_httpx.calls[0]["url"], "http://deepseek-server:8000/v1/chat/completions")
        self.assertEqual(fake_httpx.calls[0]["headers"]["Authorization"], "Bearer test-token")
        self.assertEqual(fake_httpx.calls[0]["json"]["model"], "deepseek-ai/DeepSeek-V3.2")
        self.assertEqual(fake_httpx.calls[0]["json"]["max_tokens"], 512)

    def test_openai_compatible_generates_followup_and_keeps_safeguards(self) -> None:
        duplicate_question = "您提到跟您的老婆孩子一起出去玩，能否提供一些具体信息，比如你们的行程安排、住宿安排等？"
        _install_fake_httpx(
            _chat_response(
                {
                    "sessionId": "ignored",
                    "roundNo": 2,
                    "multimodalAssessment": {
                        "summary": "回答已包含行程和住宿，但材料链条仍需核验。",
                        "riskHints": ["行程凭证待核验"],
                        "evidence": ["回答文本"],
                        "limitations": ["测试响应"],
                    },
                    "followupGuidance": [
                        {
                            "priority": 1,
                            "question": duplicate_question,
                            "reason": "需要更多信息。",
                            "operatorTip": "保持中性。",
                            "focusArea": "行程安排和住宿安排",
                        },
                        {
                            "priority": 2,
                            "question": duplicate_question,
                            "reason": "重复问题。",
                            "operatorTip": "保持中性。",
                            "focusArea": "行程安排和住宿安排",
                        },
                        {
                            "priority": 3,
                            "question": "住宿是否已经确定，是否方便说明具体安排？",
                            "reason": "住宿待核验。",
                            "operatorTip": "保持中性。",
                            "focusArea": "住宿安排",
                        },
                    ],
                    "operatorNote": "请补齐材料。",
                    "warnings": [],
                }
            )
        )
        client = BusinessLlmClient(_openai_settings())
        request = _followup_request(
            "跟我的老婆孩子一起出去玩。行程安排的话，就是首先去洛杉矶的第一个著名景点，然后再去酒店把行李放完。住宿安排的话刚才也提到了，是去酒店住。"
        )

        response = client.generate_followup_guidance(request, "prompt")
        questions = [item.question for item in response.followup_guidance]

        self.assertEqual(response.llm.provider, "openai_compatible")
        self.assertEqual(len(questions), 3)
        self.assertEqual(len(set(questions)), 3)
        self.assertTrue(any("预计日期" in question for question in questions))
        self.assertTrue(any("酒店名称" in question for question in questions))

    def test_openai_compatible_requires_base_url(self) -> None:
        client = BusinessLlmClient(_openai_settings(base_url=""))

        with self.assertRaisesRegex(BusinessLlmError, "BUSINESS_LLM_BASE_URL"):
            client.generate_followup_guidance(_followup_request("已回答住宿安排。"), "prompt")

    def test_openai_compatible_reports_http_errors(self) -> None:
        _install_fake_httpx(_FakeResponse(500, {"error": "boom"}, text="boom"))
        client = BusinessLlmClient(_openai_settings())

        with self.assertRaisesRegex(BusinessLlmError, "HTTP 500"):
            client.generate_followup_guidance(_followup_request("已回答住宿安排。"), "prompt")

    def test_openai_compatible_reports_timeout(self) -> None:
        _install_fake_httpx(TimeoutError("slow model"))
        client = BusinessLlmClient(_openai_settings())

        with self.assertRaisesRegex(BusinessLlmError, "timed out"):
            client.generate_followup_guidance(_followup_request("已回答住宿安排。"), "prompt")

    def test_openai_compatible_reports_empty_choices(self) -> None:
        _install_fake_httpx(_FakeResponse(200, {"choices": []}))
        client = BusinessLlmClient(_openai_settings())

        with self.assertRaisesRegex(BusinessLlmError, "missing choices"):
            client.generate_followup_guidance(_followup_request("已回答住宿安排。"), "prompt")

    def test_openai_compatible_reports_non_json_response(self) -> None:
        _install_fake_httpx(_FakeResponse(200, ValueError("bad json"), text="not json"))
        client = BusinessLlmClient(_openai_settings())

        with self.assertRaisesRegex(BusinessLlmError, "non-JSON response"):
            client.generate_followup_guidance(_followup_request("已回答住宿安排。"), "prompt")

    def test_rewrites_repeated_answered_followup_topics(self) -> None:
        request = _followup_request(
            "这次出行的目的主要是去赌博，没有其他同行人员，已经安排酒店住宿。"
        )
        questions = [
            {
                "priority": 1,
                "question": "您刚才提到的主要目的是去赌博，这是您真实的出行目的吗？",
                "reason": "回答内容与首轮答复不一致。",
                "operatorTip": "保持中性。",
                "focusArea": "真实出境目的",
            },
            {
                "priority": 2,
                "question": "您是否愿意提供更多关于您此次出行的具体安排细节，比如同行人员的身份和联系方式？",
                "reason": "同行关系待核验。",
                "operatorTip": "保持中性。",
                "focusArea": "同行关系",
            },
            {
                "priority": 3,
                "question": "住宿是否已经确定，是否方便说明具体安排？",
                "reason": "住宿安排待核验。",
                "operatorTip": "保持中性。",
                "focusArea": "住宿安排",
            },
        ]

        rewritten = _rewrite_repeated_followup_questions(questions, request)

        self.assertIn("按时间顺序", rewritten[0]["question"])
        self.assertNotIn("真实的出行目的吗", rewritten[0]["question"])
        self.assertIn("接待人或联络人", rewritten[1]["question"])
        self.assertNotIn("同行人员的身份和联系方式", rewritten[1]["question"])
        self.assertIn("酒店名称", rewritten[2]["question"])
        self.assertNotIn("住宿是否已经确定", rewritten[2]["question"])

    def test_dedupes_identical_followup_questions(self) -> None:
        request = _followup_request(
            "这次出行的目的主要是去赌博，没有其他同行人员，已经安排酒店住宿。"
        )
        duplicate_question = "您提到的赌博具体是指哪个地方？能否提供更多信息帮助我们更好地了解您的出行计划？"
        questions = [
            {
                "priority": 1,
                "question": "请您按时间顺序说明到达后的第一天安排。",
                "reason": "核验行程时间线。",
                "operatorTip": "保持中性。",
                "focusArea": "行程时间线",
            },
            {
                "priority": 2,
                "question": duplicate_question,
                "reason": "旅客回避了具体信息。",
                "operatorTip": "保持中性。",
                "focusArea": "出行目的",
            },
            {
                "priority": 3,
                "question": duplicate_question,
                "reason": "旅客回避了具体信息。",
                "operatorTip": "保持中性。",
                "focusArea": "出行目的",
            },
        ]

        deduped = _dedupe_followup_questions(questions, request)
        question_texts = [item["question"] for item in deduped]

        self.assertEqual(len(question_texts), 3)
        self.assertEqual(len(set(question_texts)), 3)
        self.assertEqual(question_texts.count(duplicate_question), 1)
        self.assertEqual([item["priority"] for item in deduped], [1, 2, 3])

    def test_rewrites_repeated_itinerary_and_accommodation_followup(self) -> None:
        request = _followup_request(
            "跟我的老婆孩子一起出去玩。行程安排的话，就是首先去洛杉矶的第一个著名景点，然后再去酒店把行李放完，晚上再去洛杉矶旁边吃饭。住宿安排的话刚才也提到了，是去这个酒店附近的景点去住酒店。"
        )
        questions = [
            {
                "priority": 1,
                "question": "您提到跟您的老婆孩子一起出去玩，能否提供一些具体信息，比如你们的行程安排、住宿安排等？",
                "reason": "核验行程和住宿安排。",
                "operatorTip": "保持中性。",
                "focusArea": "行程安排和住宿安排",
            },
            {
                "priority": 2,
                "question": "住宿是否已经确定，是否方便说明具体安排？",
                "reason": "住宿安排待核验。",
                "operatorTip": "保持中性。",
                "focusArea": "住宿安排",
            },
            {
                "priority": 3,
                "question": "请问这次行程费用的具体来源和支付方式是什么？",
                "reason": "资金来源待核验。",
                "operatorTip": "保持中性。",
                "focusArea": "资金来源",
            },
        ]

        rewritten = _rewrite_repeated_followup_questions(questions, request)

        self.assertIn("预计日期", rewritten[0]["question"])
        self.assertNotIn("能否提供一些具体信息", rewritten[0]["question"])
        self.assertIn("酒店名称", rewritten[1]["question"])
        self.assertNotIn("住宿是否已经确定", rewritten[1]["question"])
        self.assertEqual([item["priority"] for item in rewritten], [1, 2, 3])


def _openai_settings(base_url: str = "http://deepseek-server:8000/v1") -> BusinessLlmSettings:
    return BusinessLlmSettings(
        provider="openai_compatible",
        model="deepseek-ai/DeepSeek-V3.2",
        model_path=DEFAULT_LOCAL_MODEL_PATH,
        timeout_seconds=30,
        max_new_tokens=512,
        torch_dtype="auto",
        device_map="auto",
        base_url=base_url,
        api_key="test-token",
        temperature=1.0,
        top_p=0.95,
    )


def _first_round_request():
    from schemas.inquiry import FirstRoundStrategyRequest

    return FirstRoundStrategyRequest.model_validate(
        {
            "sessionId": "inq-test",
            "passengerProfile": {"passengerId": "pax-test", "name": "张三"},
            "tripProfile": {"destination": "洛杉矶", "purposeDeclared": "旅游"},
            "knownFacts": ["未见返程票"],
            "constraints": {"questionCount": 1},
        }
    )


def _followup_request(answer_text: str) -> FollowupGuidanceRequest:
    return FollowupGuidanceRequest.model_validate(
        {
            "sessionId": "inq-test",
            "roundNo": 2,
            "passengerProfile": {"passengerId": "pax-test", "name": "张三"},
            "tripProfile": {},
            "qaHistory": [
                {
                    "questionId": "round-1",
                    "roundNo": 1,
                    "question": "1. 真实出境目的：请说明主要目的。\n2. 同行关系：是否有同行人员？\n3. 住宿安排：住宿是否确定？",
                    "answerText": answer_text,
                }
            ],
            "humanOmniWindows": [],
            "actionObservations": [],
            "constraints": {"questionCount": 3},
        }
    )


def _chat_response(content: dict) -> "_FakeResponse":
    return _FakeResponse(
        200,
        {
            "choices": [
                {
                    "message": {
                        "role": "assistant",
                        "content": json.dumps(content, ensure_ascii=False),
                    }
                }
            ]
        },
    )


class _FakeResponse:
    def __init__(self, status_code: int, payload, text: str | None = None) -> None:
        self.status_code = status_code
        self._payload = payload
        self.text = text if text is not None else json.dumps(payload, ensure_ascii=False)

    def json(self):
        if isinstance(self._payload, Exception):
            raise self._payload
        return self._payload


class _FakeHttpx(types.SimpleNamespace):
    def __init__(self, response: _FakeResponse | Exception) -> None:
        super().__init__(TimeoutException=TimeoutError, HTTPError=RuntimeError)
        self.response = response
        self.calls: list[dict] = []

    def post(self, url: str, *, headers: dict, json: dict, timeout: int):
        self.calls.append(
            {
                "url": url,
                "headers": headers,
                "json": json,
                "timeout": timeout,
            }
        )
        if isinstance(self.response, Exception):
            raise self.response
        return self.response


def _install_fake_httpx(response: _FakeResponse | Exception) -> _FakeHttpx:
    fake_httpx_state = _FakeHttpx(response)
    fake_httpx = types.ModuleType("httpx")
    fake_httpx.TimeoutException = fake_httpx_state.TimeoutException
    fake_httpx.HTTPError = fake_httpx_state.HTTPError
    fake_httpx.calls = fake_httpx_state.calls
    fake_httpx.post = fake_httpx_state.post
    sys.modules["httpx"] = fake_httpx
    return fake_httpx_state


if __name__ == "__main__":
    unittest.main()
