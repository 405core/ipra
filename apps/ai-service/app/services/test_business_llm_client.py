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
    load_prompt,
    load_business_llm_settings,
    _dedupe_followup_questions,
    _first_round_user_prompt,
    _followup_user_prompt,
    _rewrite_repeated_followup_questions,
)


class BusinessLlmClientTest(unittest.TestCase):
    def test_mock_first_round_uses_four_risk_case_categories(self) -> None:
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
        cases = [
            ("cross_border_gambling", "跨境赌博", "资金来源-境外活动安排", "活动费用"),
            ("cross_border_fraud", "跨境电诈", "邀约来源-境外联系人", "手机"),
            ("illegal_work", "非法务工", "工作资质-雇佣关系", "报酬"),
            ("suspicious_purpose", "出境目的存疑", "出境目的", "主要目的"),
        ]

        for category, label, focus_area, question_token in cases:
            with self.subTest(category=category):
                response = client.generate_first_round_strategy(
                    _first_round_request(
                        risk_case_context={
                            "source": "watchlist",
                            "category": category,
                            "label": label,
                            "reason": "名单分类命中",
                        },
                        question_count=4,
                    ),
                    "prompt",
                )
                questions = " ".join(question.question for question in response.questions)

                self.assertIn(focus_area, response.strategy.focus_areas)
                self.assertIn(question_token, questions)
                self.assertIn("名单线索触发", response.risk_assessment.summary)
                self.assertIn(label, response.strategy.goal)

    def test_mock_first_round_defaults_unknown_to_suspicious_purpose(self) -> None:
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

        response = client.generate_first_round_strategy(_first_round_request(), "prompt")

        self.assertIn("出境目的存疑", response.risk_assessment.summary)
        self.assertIn("出境目的", response.strategy.focus_areas)
        self.assertGreaterEqual(len(response.questions), 1)

    def test_mock_first_round_notes_officer_trigger(self) -> None:
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

        response = client.generate_first_round_strategy(
            _first_round_request(
                risk_case_context={
                    "source": "officer",
                    "category": "illegal_work",
                    "label": "非法务工",
                    "officerNote": "现场认为目的陈述和职业情况不匹配",
                }
            ),
            "prompt",
        )

        self.assertIn("工作人员人工判断触发", response.risk_assessment.summary)
        self.assertIn("非法务工", response.strategy.goal)

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

    def test_first_round_prompt_selects_each_risk_case_prompt(self) -> None:
        cases = [
            (
                "cross_border_gambling",
                "生效风险类型：cross_border_gambling",
                "资金来源、借贷、代付",
            ),
            (
                "cross_border_fraud",
                "生效风险类型：cross_border_fraud",
                "招聘、邀约、商务、培训",
            ),
            (
                "illegal_work",
                "生效风险类型：illegal_work",
                "签证或停留资格与实际出境目的",
            ),
            (
                "suspicious_purpose",
                "生效风险类型：suspicious_purpose",
                "时间线不清、材料缺口、联系人关系模糊",
            ),
        ]

        for category, marker, focus_text in cases:
            with self.subTest(category=category):
                user_prompt = _first_round_user_prompt(
                    load_prompt("first_round_strategy.base.zh.md"),
                    _first_round_request(
                        risk_case_context={
                            "source": "watchlist",
                            "category": category,
                            "label": "",
                        }
                    ),
                )

                self.assertIn("首轮问询策略生成 Base Prompt", user_prompt)
                self.assertIn(marker, user_prompt)
                self.assertIn(focus_text, user_prompt)
                self.assertIn(f"生效分类={category}", user_prompt)

    def test_followup_prompt_selects_each_risk_case_prompt(self) -> None:
        cases = [
            (
                "cross_border_gambling",
                "生效风险类型：cross_border_gambling",
                "费用来源、借贷、代付、预付费用",
            ),
            (
                "cross_border_fraud",
                "生效风险类型：cross_border_fraud",
                "设备账号用途链",
            ),
            (
                "illegal_work",
                "生效风险类型：illegal_work",
                "岗位、薪酬、培训或试工安排",
            ),
            (
                "suspicious_purpose",
                "生效风险类型：suspicious_purpose",
                "时间线、费用链、住宿链、联系人链、返程边界",
            ),
        ]

        for category, marker, focus_text in cases:
            with self.subTest(category=category):
                user_prompt = _followup_user_prompt(
                    load_prompt("followup_guidance.base.zh.md"),
                    _followup_request(
                        "已说明部分行程安排。",
                        risk_case_context={
                            "source": "officer",
                            "category": category,
                            "label": "",
                        },
                    ),
                )

                self.assertIn("后续追问指引生成 Base Prompt", user_prompt)
                self.assertIn(marker, user_prompt)
                self.assertIn(focus_text, user_prompt)
                self.assertIn(f"生效分类={category}", user_prompt)

    def test_prompt_falls_back_to_suspicious_purpose_for_unknown_invalid_or_missing_category(self) -> None:
        first_round_cases = [
            None,
            {"source": "none", "category": "unknown"},
            {"source": "none", "category": ""},
            {"source": "none", "category": "not_a_real_category"},
        ]

        for risk_case_context in first_round_cases:
            with self.subTest(risk_case_context=risk_case_context):
                user_prompt = _first_round_user_prompt(
                    load_prompt("first_round_strategy.base.zh.md"),
                    _first_round_request(risk_case_context=risk_case_context),
                )

                self.assertIn("生效风险类型：suspicious_purpose", user_prompt)
                self.assertIn("生效分类=suspicious_purpose", user_prompt)
                self.assertIn("已回退到 suspicious_purpose", user_prompt)
                self.assertIn("请您先完整说明这次出境的主要目的", user_prompt)

        followup_prompt = _followup_user_prompt(
            load_prompt("followup_guidance.base.zh.md"),
            _followup_request(
                "已说明部分行程安排。",
                risk_case_context={"source": "officer", "category": "unsupported"},
            ),
        )

        self.assertIn("生效风险类型：suspicious_purpose", followup_prompt)
        self.assertIn("生效分类=suspicious_purpose", followup_prompt)
        self.assertIn("已回退到 suspicious_purpose", followup_prompt)
        self.assertIn("先复述确认，再提出窄化问题", followup_prompt)

    def test_openai_compatible_sends_composed_first_round_prompt(self) -> None:
        fake_httpx = _install_fake_httpx(
            _chat_response(
                {
                    "sessionId": "ignored",
                    "riskAssessment": {
                        "level": "medium",
                        "summary": "需核验邀约来源和境外联系人。",
                        "reasons": ["联系人链待补齐"],
                    },
                    "strategy": {
                        "goal": "核验邀约来源。",
                        "focusAreas": ["邀约来源-境外联系人"],
                    },
                    "questions": [
                        {
                            "questionId": "q1",
                            "priority": 1,
                            "question": "请说明这次出境是谁邀请或联系的。",
                            "purpose": "核验邀约来源。",
                            "expectedEvidence": ["聊天记录"],
                        }
                    ],
                    "operatorNote": "保持中性核验。",
                }
            )
        )
        client = BusinessLlmClient(_openai_settings())

        client.generate_first_round_strategy(
            _first_round_request(
                risk_case_context={
                    "source": "watchlist",
                    "category": "cross_border_fraud",
                    "label": "跨境电诈",
                }
            ),
            load_prompt("first_round_strategy.base.zh.md"),
        )
        user_prompt = fake_httpx.calls[0]["json"]["messages"][1]["content"]

        self.assertIn("首轮问询策略生成 Base Prompt", user_prompt)
        self.assertIn("生效风险类型：cross_border_fraud", user_prompt)
        self.assertIn("招聘、邀约、商务、培训", user_prompt)
        self.assertIn("生效分类=cross_border_fraud", user_prompt)

    def test_openai_compatible_sends_composed_followup_prompt(self) -> None:
        fake_httpx = _install_fake_httpx(
            _chat_response(
                {
                    "sessionId": "ignored",
                    "roundNo": 2,
                    "multimodalAssessment": {
                        "summary": "材料来源仍需核验。",
                        "riskHints": ["合同来源待核验"],
                        "evidence": ["回答文本"],
                        "limitations": ["测试响应"],
                    },
                    "followupGuidance": [
                        {
                            "priority": 1,
                            "question": "材料是谁提供的？",
                            "reason": "核验材料来源。",
                            "operatorTip": "保持中性。",
                            "focusArea": "材料来源",
                        },
                        {
                            "priority": 2,
                            "question": "食宿由谁安排？",
                            "reason": "核验食宿安排。",
                            "operatorTip": "保持中性。",
                            "focusArea": "食宿安排",
                        },
                        {
                            "priority": 3,
                            "question": "返程时间是否确定？",
                            "reason": "核验返程边界。",
                            "operatorTip": "保持中性。",
                            "focusArea": "返程边界",
                        },
                    ],
                    "operatorNote": "保持中性核验。",
                    "warnings": [],
                }
            )
        )
        client = BusinessLlmClient(_openai_settings())

        client.generate_followup_guidance(
            _followup_request(
                "境外有人安排培训和住宿。",
                risk_case_context={
                    "source": "officer",
                    "category": "illegal_work",
                    "label": "非法务工",
                },
            ),
            load_prompt("followup_guidance.base.zh.md"),
        )
        user_prompt = fake_httpx.calls[0]["json"]["messages"][1]["content"]

        self.assertIn("后续追问指引生成 Base Prompt", user_prompt)
        self.assertIn("生效风险类型：illegal_work", user_prompt)
        self.assertIn("岗位、薪酬、培训或试工安排", user_prompt)
        self.assertIn("生效分类=illegal_work", user_prompt)

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
            "跟我的老婆孩子一起出去玩。行程安排的话，就是首先去洛杉矶的第一个著名景点，然后再去酒店把行李放完。住宿安排的话刚才也提到了，是去酒店住。",
            risk_case_context={
                "source": "officer",
                "category": "suspicious_purpose",
                "label": "出境目的存疑",
                "officerNote": "现场人工选择",
            },
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

    def test_rewrites_repeated_work_contact_and_device_topics(self) -> None:
        request = _followup_request(
            "境外联系人是朋友介绍的招聘中介，已经说了工作岗位和薪酬，也会携带手机、银行卡和电脑用于联系和入职材料。"
        )
        questions = [
            {
                "priority": 1,
                "question": "您是否有境外工作安排，具体岗位和薪酬是什么？",
                "reason": "工作安排待核验。",
                "operatorTip": "保持中性。",
                "focusArea": "工作安排",
            },
            {
                "priority": 2,
                "question": "境外联系人是谁，是否方便提供联系方式？",
                "reason": "联系人待核验。",
                "operatorTip": "保持中性。",
                "focusArea": "境外联系人",
            },
            {
                "priority": 3,
                "question": "您是否携带手机、银行卡或电脑，具体用途是什么？",
                "reason": "设备用途待核验。",
                "operatorTip": "保持中性。",
                "focusArea": "设备用途",
            },
        ]

        rewritten = _rewrite_repeated_followup_questions(questions, request)

        self.assertIn("安排方身份", rewritten[0]["question"])
        self.assertIn("对方身份", rewritten[1]["question"])
        self.assertIn("每件物品的用途", rewritten[2]["question"])


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


def _first_round_request(risk_case_context: dict | None = None, question_count: int = 1):
    from schemas.inquiry import FirstRoundStrategyRequest

    payload = {
        "sessionId": "inq-test",
        "passengerProfile": {"passengerId": "pax-test", "name": "张三"},
        "tripProfile": {"destination": "洛杉矶", "purposeDeclared": "旅游"},
        "knownFacts": ["未见返程票"],
        "constraints": {"questionCount": question_count},
    }
    if risk_case_context is not None:
        payload["riskCaseContext"] = risk_case_context
    return FirstRoundStrategyRequest.model_validate(payload)


def _followup_request(answer_text: str, risk_case_context: dict | None = None) -> FollowupGuidanceRequest:
    payload = {
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
    if risk_case_context is not None:
        payload["riskCaseContext"] = risk_case_context
    return FollowupGuidanceRequest.model_validate(payload)


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
