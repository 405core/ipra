from __future__ import annotations

import argparse
import json
import mimetypes
import uuid
import urllib.request
from datetime import datetime
from pathlib import Path
from typing import Any


AI_SERVICE_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_VIDEO_PATH = AI_SERVICE_ROOT / "samples" / "humanomni_test_02_funding_stress_video_ad.mp4"
DEFAULT_REPORT_DIR = AI_SERVICE_ROOT / "window-runs"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run a full AI-Service pipeline smoke test: sample JSON -> HumanOmni summary -> followup guidance."
    )
    parser.add_argument("--base-url", default="http://127.0.0.1:9000")
    parser.add_argument("--video-path", default=str(DEFAULT_VIDEO_PATH))
    parser.add_argument("--session-id", default="inq-full-smoke-001")
    parser.add_argument("--question-id", default="q1")
    parser.add_argument("--window-id", default="w-full-smoke-001")
    parser.add_argument("--start-seconds", type=float, default=12.0)
    parser.add_argument("--end-seconds", type=float, default=17.0)
    parser.add_argument("--question-count", type=int, default=3)
    parser.add_argument("--max-new-tokens", type=int, default=128)
    parser.add_argument("--num-frames", type=int, default=None)
    parser.add_argument("--report-dir", default=str(DEFAULT_REPORT_DIR))
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    base_url = args.base_url.rstrip("/")
    video_path = Path(args.video_path).resolve()
    if not video_path.is_file():
        raise FileNotFoundError(f"Video file does not exist: {video_path}")

    health = get_json(f"{base_url}/health")
    humanomni_result = summarize_window(base_url, args, video_path)
    humanomni_window = humanomni_result.get("humanOmniWindow") or {}
    followup_payload = build_followup_payload(args, humanomni_window)
    followup_result = post_json(f"{base_url}/v1/inquiry/followup-guidance", followup_payload, timeout=900)

    report = {
        "ok": bool(
            health.get("status") == "ok"
            and humanomni_result.get("ok")
            and len(followup_result.get("followupGuidance", [])) == args.question_count
        ),
        "baseUrl": base_url,
        "inputVideo": str(video_path),
        "health": health,
        "humanOmniUpload": humanomni_result,
        "followupRequest": followup_payload,
        "followupResponse": followup_result,
    }
    report_path = write_report(report, Path(args.report_dir))

    print("=== Full AI-Service Pipeline Smoke Test ===")
    print(f"Status: {'ok' if report['ok'] else 'failed'}")
    print(f"Health: {health.get('status')}")
    print(f"HumanOmni: {'ok' if humanomni_result.get('ok') else 'failed'}")
    print(f"HumanOmni summary: {((humanomni_result.get('humanOmni') or {}).get('rawSummary') or '')[:240]}")
    print(f"Followup count: {len(followup_result.get('followupGuidance', []))} / expected {args.question_count}")
    print(f"Report: {report_path}")
    print(json.dumps(followup_result, ensure_ascii=False, indent=2))
    return 0 if report["ok"] else 2


def summarize_window(base_url: str, args: argparse.Namespace, video_path: Path) -> dict[str, Any]:
    fields: dict[str, Any] = {
        "sessionId": args.session_id,
        "questionId": args.question_id,
        "windowId": args.window_id,
        "modal": "video_audio",
        "startSeconds": str(args.start_seconds),
        "endSeconds": str(args.end_seconds),
        "maxNewTokens": str(args.max_new_tokens),
    }
    if args.num_frames is not None:
        fields["numFrames"] = str(args.num_frames)

    return post_multipart(
        f"{base_url}/v1/humanomni/summarize-window",
        fields=fields,
        file_field="file",
        file_path=video_path,
        timeout=1200,
    )


def build_followup_payload(args: argparse.Namespace, humanomni_window: dict[str, Any]) -> dict[str, Any]:
    return {
        "sessionId": args.session_id,
        "roundNo": 2,
        "passengerProfile": {
            "passengerId": "pax-full-smoke-001",
            "name": "张三",
            "age": 28,
            "nationality": "中国",
            "occupation": "自由职业",
            "monthlyIncome": "不稳定",
            "travelHistory": ["首次前往该目的地"],
        },
        "tripProfile": {
            "destination": "境外短期停留地",
            "purposeDeclared": "旅游",
            "stayDays": 21,
            "ticketType": "单程",
            "returnTicketStatus": "未提供",
            "accommodation": "由朋友协助安排",
            "fundingSource": "本人和朋友共同承担",
        },
        "qaHistory": [
            {
                "questionId": args.question_id,
                "roundNo": 1,
                "question": "请您说明这次出境的主要目的和停留安排。",
                "answerText": "我是去旅游，可能住二十多天，具体还要看朋友那边安排，费用有一部分朋友会先帮忙。",
                "answerStartSeconds": 12.0,
                "answerEndSeconds": 27.0,
            }
        ],
        "humanOmniWindows": [humanomni_window],
        "actionObservations": [
            {
                "observationId": "obs-full-001",
                "type": "gaze_shift",
                "label": "视线偏移",
                "description": "回答停留天数和朋友安排时出现短暂视线偏移。",
                "startSeconds": 13.2,
                "endSeconds": 14.6,
                "confidence": 0.68,
                "source": "frontend-mock",
            },
            {
                "observationId": "obs-full-002",
                "type": "hand_motion",
                "label": "手部动作增加",
                "description": "回答资金来源时手部动作增多。",
                "startSeconds": 15.0,
                "endSeconds": 16.5,
                "confidence": 0.63,
                "source": "frontend-mock",
            },
        ],
        "asr": {
            "status": "not_connected",
            "text": "",
            "segments": [],
            "words": [],
        },
        "constraints": {
            "questionCount": args.question_count,
            "tone": "中性、专业、非指控",
            "language": "zh-CN",
        },
    }


def get_json(url: str, timeout: int = 30) -> dict[str, Any]:
    request = urllib.request.Request(url, method="GET")
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return json.loads(response.read().decode("utf-8"))


def post_json(url: str, payload: dict[str, Any], timeout: int = 30) -> dict[str, Any]:
    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return json.loads(response.read().decode("utf-8"))


def post_multipart(
    url: str,
    *,
    fields: dict[str, Any],
    file_field: str,
    file_path: Path,
    timeout: int,
) -> dict[str, Any]:
    boundary = f"----ipra-full-smoke-{uuid.uuid4().hex}"
    body = build_multipart_body(boundary, fields, file_field, file_path)
    request = urllib.request.Request(
        url,
        data=body,
        headers={"Content-Type": f"multipart/form-data; boundary={boundary}"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return json.loads(response.read().decode("utf-8"))


def build_multipart_body(boundary: str, fields: dict[str, Any], file_field: str, file_path: Path) -> bytes:
    chunks: list[bytes] = []
    for name, value in fields.items():
        chunks.extend(
            [
                f"--{boundary}\r\n".encode("utf-8"),
                f'Content-Disposition: form-data; name="{name}"\r\n\r\n'.encode("utf-8"),
                f"{value}\r\n".encode("utf-8"),
            ]
        )

    content_type = mimetypes.guess_type(file_path.name)[0] or "application/octet-stream"
    chunks.extend(
        [
            f"--{boundary}\r\n".encode("utf-8"),
            (
                f'Content-Disposition: form-data; name="{file_field}"; '
                f'filename="{file_path.name}"\r\n'
            ).encode("utf-8"),
            f"Content-Type: {content_type}\r\n\r\n".encode("utf-8"),
            file_path.read_bytes(),
            b"\r\n",
            f"--{boundary}--\r\n".encode("utf-8"),
        ]
    )
    return b"".join(chunks)


def write_report(report: dict[str, Any], report_dir: Path) -> Path:
    report_dir.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    path = report_dir / f"full-pipeline-smoke-{timestamp}.json"
    path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    return path


if __name__ == "__main__":
    raise SystemExit(main())
