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

from schemas.inquiry import FirstRoundStrategyRequest


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Smoke test for /v1/inquiry/first-round-strategy.")
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
        result = post_json(args.base_url.rstrip("/") + "/v1/inquiry/first-round-strategy", payload)
    else:
        result = call_in_process(payload)

    required = ["riskAssessment", "strategy", "questions", "memoryReferences", "memoryUpdates", "operatorNote"]
    missing = [key for key in required if key not in result]
    ok = not missing and bool(result.get("questions"))

    print("=== First Round Strategy Smoke Test ===")
    print(f"Status: {'ok' if ok else 'failed'}")
    print(f"Question count: {len(result.get('questions', []))}")
    print("Required fields:", "ok" if not missing else f"missing {missing}")
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if ok else 2


def build_payload() -> dict[str, Any]:
    return {
        "sessionId": "inq-smoke-001",
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
            "companions": [],
            "fundingSource": "本人承担",
        },
        "knownFacts": [
            "旅客无法提供稳定收入证明",
            "行程停留时间较长",
        ],
        "memoryContext": {
            "sessionId": "inq-smoke-001",
            "passengerId": "pax-smoke-001",
            "sessionMemories": [
                {
                    "id": 1,
                    "scopeType": "session",
                    "scopeId": "inq-smoke-001",
                    "memoryType": "gap",
                    "title": "住宿安排待核验",
                    "content": "旅客尚未提供明确住宿地址。",
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
                    "title": "多模态线索使用边界",
                    "content": "动作、情绪和多模态观察只能作为追问方向参考，不能单独构成风险结论。",
                    "source": "system-rule",
                }
            ],
        },
        "constraints": {
            "questionCount": 6,
            "tone": "中性、专业、非指控",
            "language": "zh-CN",
        },
    }


def call_in_process(payload: dict[str, Any]) -> dict[str, Any]:
    from service import first_round_strategy

    request = FirstRoundStrategyRequest.model_validate(payload)
    response = first_round_strategy(request)
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

