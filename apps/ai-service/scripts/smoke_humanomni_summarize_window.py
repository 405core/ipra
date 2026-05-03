from __future__ import annotations

import argparse
import json
import mimetypes
import uuid
import urllib.request
from pathlib import Path
from typing import Any


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Smoke test for /v1/humanomni/summarize-window.")
    parser.add_argument("--base-url", default="http://127.0.0.1:9000")
    parser.add_argument(
        "--video-path",
        default="apps/ai-service/samples/humanomni_test_02_funding_stress_video_ad.mp4",
        help="Local video/audio window file to upload.",
    )
    parser.add_argument("--session-id", default="inq-smoke-001")
    parser.add_argument("--question-id", default="q1")
    parser.add_argument("--window-id", default="w-smoke-001")
    parser.add_argument("--modal", choices=["video", "video_audio", "audio"], default="video_audio")
    parser.add_argument("--start-seconds", type=float, default=0.0)
    parser.add_argument("--end-seconds", type=float, default=5.0)
    parser.add_argument("--max-new-tokens", type=int, default=128)
    parser.add_argument("--num-frames", type=int, default=None)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    video_path = Path(args.video_path).resolve()
    if not video_path.is_file():
        raise FileNotFoundError(f"Video file does not exist: {video_path}")

    fields: dict[str, Any] = {
        "sessionId": args.session_id,
        "questionId": args.question_id,
        "windowId": args.window_id,
        "modal": args.modal,
        "startSeconds": str(args.start_seconds),
        "endSeconds": str(args.end_seconds),
        "maxNewTokens": str(args.max_new_tokens),
    }
    if args.num_frames is not None:
        fields["numFrames"] = str(args.num_frames)

    result = post_multipart(
        args.base_url.rstrip("/") + "/v1/humanomni/summarize-window",
        fields=fields,
        file_field="file",
        file_path=video_path,
    )

    ok = bool(
        result.get("ok")
        and (result.get("humanOmni") or {}).get("rawSummary")
        and (result.get("humanOmniWindow") or {}).get("rawSummary")
    )

    print("=== HumanOmni Summarize Window Smoke Test ===")
    print(f"Status: {'ok' if ok else 'failed'}")
    print(f"Window ID: {result.get('windowId')}")
    print(f"Summary: {(result.get('humanOmni') or {}).get('rawSummary', '')[:240]}")
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if ok else 2


def post_multipart(
    url: str,
    *,
    fields: dict[str, Any],
    file_field: str,
    file_path: Path,
) -> dict[str, Any]:
    boundary = f"----ipra-smoke-{uuid.uuid4().hex}"
    body = build_multipart_body(boundary, fields, file_field, file_path)
    request = urllib.request.Request(
        url,
        data=body,
        headers={"Content-Type": f"multipart/form-data; boundary={boundary}"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=1200) as response:
        return json.loads(response.read().decode("utf-8"))


def build_multipart_body(
    boundary: str,
    fields: dict[str, Any],
    file_field: str,
    file_path: Path,
) -> bytes:
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


if __name__ == "__main__":
    raise SystemExit(main())

