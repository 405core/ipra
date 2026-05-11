from __future__ import annotations

import argparse
import json
import sys
import urllib.request
from pathlib import Path
from typing import Any

APP_DIR = Path(__file__).resolve().parents[1] / "app"
if str(APP_DIR) not in sys.path:
    sys.path.insert(0, str(APP_DIR))

from schemas.inquiry import FollowupGuidanceRequest


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Smoke test for /v1/inquiry/followup-guidance.")
    parser.add_argument(
        "--base-url",
        default=None,
        help="Optional running service base URL, for example http://127.0.0.1:9000. Omit to call in-process.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    payload = build_payload()
    if args.base_url:
        result = post_json(args.base_url.rstrip("/") + "/v1/inquiry/followup-guidance", payload)
    else:
        result = call_in_process(payload)

    required = ["multimodalAssessment", "followupGuidance", "memoryReferences", "memoryUpdates", "warnings"]
    missing = [key for key in required if key not in result]
    expected_count = int(payload.get("constraints", {}).get("questionCount", 3))
    actual_count = len(result.get("followupGuidance", []))
    ok = not missing and actual_count == expected_count

    print("=== Followup Guidance Smoke Test ===")
    print(f"Status: {'ok' if ok else 'failed'}")
    print(f"Followup count: {actual_count} / expected {expected_count}")
    print("Required fields:", "ok" if not missing else f"missing {missing}")
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if ok else 2


def build_payload() -> dict[str, Any]:
    return {
        "sessionId": "inq-smoke-001",
        "roundNo": 2,
        "passengerProfile": {
            "passengerId": "pax-smoke-001",
            "name": "张三",
            "age": 28,
            "nationality": "中国",
            "occupation": "自由职业",
            "monthlyIncome": "不稳定",
        },
        "tripProfile": {
            "destination": "境外短期停留地",
            "purposeDeclared": "旅游",
            "stayDays": 21,
            "ticketType": "单程",
        },
        "qaHistory": [
            {
                "questionId": "q1",
                "roundNo": 1,
                "question": "请您说明这次出境的主要目的。",
                "answerText": "我是去旅游，可能住二十多天，具体还要看朋友那边安排。",
                "answerStartSeconds": 12.4,
                "answerEndSeconds": 25.8,
            }
        ],
        "humanOmniWindows": [
            {
                "windowId": "w1",
                "questionId": "q1",
                "startSeconds": 18.0,
                "endSeconds": 23.0,
                "modal": "video_audio",
                "rawSummary": "The person speaks with hesitation and shows a tense facial expression.",
                "modelName": "HumanOmni0.5",
            }
        ],
        "actionObservations": [
            {
                "observationId": "obs1",
                "type": "gaze_shift",
                "label": "视线偏移",
                "description": "回答停留时间时出现短暂视线偏移",
                "startSeconds": 18.0,
                "endSeconds": 20.5,
                "confidence": 0.68,
                "source": "frontend",
            },
            {
                "observationId": "obs2",
                "type": "hand_motion",
                "label": "手部动作增加",
                "description": "回答资金和朋友安排时手部动作明显增多",
                "startSeconds": 20.5,
                "endSeconds": 23.0,
                "confidence": 0.61,
                "source": "frontend",
            },
        ],
        "asr": {
            "status": "not_connected",
            "text": "",
            "segments": [],
            "words": [],
        },
        "memoryContext": {
            "sessionId": "inq-smoke-001",
            "passengerId": "pax-smoke-001",
            "sessionMemories": [
                {
                    "id": 1,
                    "scopeType": "session",
                    "scopeId": "inq-smoke-001",
                    "memoryType": "fact",
                    "title": "上一轮答复",
                    "content": "旅客提到朋友安排住宿，但未说明联系人身份。",
                    "source": "ai-service",
                }
            ],
            "passengerMemories": [],
            "ruleMemories": [
                {
                    "id": 0,
                    "scopeType": "rule",
                    "scopeId": "default",
                    "memoryType": "procedure",
                    "title": "中性追问",
                    "content": "追问必须保持中性、专业、非指控。",
                    "source": "system-rule",
                }
            ],
        },
        "constraints": {
            "questionCount": 3,
            "tone": "中性、专业、非指控",
            "language": "zh-CN",
        },
    }


def call_in_process(payload: dict[str, Any]) -> dict[str, Any]:
    from service import followup_guidance

    request = FollowupGuidanceRequest.model_validate(payload)
    response = followup_guidance(request)
    return response.model_dump(by_alias=True)


def post_json(url: str, payload: dict[str, Any]) -> dict[str, Any]:
    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


if __name__ == "__main__":
    raise SystemExit(main())
