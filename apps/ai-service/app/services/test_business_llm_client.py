from __future__ import annotations

import unittest

from schemas.inquiry import FollowupGuidanceRequest
from services.business_llm_client import (
    BusinessLlmClient,
    BusinessLlmError,
    BusinessLlmSettings,
    DEFAULT_LOCAL_MODEL_PATH,
    _dedupe_followup_questions,
    _rewrite_repeated_followup_questions,
)


class BusinessLlmClientTest(unittest.TestCase):
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


if __name__ == "__main__":
    unittest.main()
