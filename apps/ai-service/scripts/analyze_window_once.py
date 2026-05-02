from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
import time
from datetime import datetime
from pathlib import Path
from typing import Any

APP_DIR = Path(__file__).resolve().parents[1] / "app"
if str(APP_DIR) not in sys.path:
    sys.path.insert(0, str(APP_DIR))

from config import AI_SERVICE_ROOT, DEFAULT_MODEL_PATH, REPO_ROOT


HUMANOMNI_MARKER = "=== HumanOmni Output ==="

EVENT_LABELS = {
    "frown_candidate": "疑似皱眉或面部紧张",
    "gaze_away_candidate": "疑似视线偏移或回避",
    "head_turn_candidate": "疑似转头或偏头",
    "head_down_candidate": "疑似低头",
    "head_shake_candidate": "疑似摇头",
    "hand_motion": "手部明显移动",
    "hand_near_face": "手部靠近面部",
    "posture_change": "坐姿或身体移动",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run HumanOmni and MediaPipe on the same video window, then write one unified JSON report."
    )
    parser.add_argument("--video-path", required=True, help="Path to the source mp4 video.")
    parser.add_argument("--modal", choices=["video", "video_audio", "audio"], default="video")
    parser.add_argument("--start-seconds", type=float, default=0.0, help="Window start time in seconds.")
    parser.add_argument("--duration-seconds", type=float, default=2.0, help="Window duration in seconds.")
    parser.add_argument("--humanomni-num-frames", type=int, default=32)
    parser.add_argument("--mediapipe-sample-fps", type=float, default=12.0)
    parser.add_argument("--max-width", type=int, default=960)
    parser.add_argument("--include-frames", action="store_true", help="Include compact MediaPipe frame signals.")
    parser.add_argument("--max-new-tokens", type=int, default=256)
    parser.add_argument(
        "--instruct",
        default=(
            "Analyze this interview video window. Summarize the visible person, emotional state, "
            "facial expression, gaze direction, head movement, hand movement, and posture changes. "
            "Mention uncertainty when evidence is weak."
        ),
    )
    parser.add_argument("--model-path", default=str(DEFAULT_MODEL_PATH))
    parser.add_argument(
        "--python",
        default=str(Path(sys.executable).resolve()),
        help="Python executable used by both HumanOmni and MediaPipe subprocesses.",
    )
    parser.add_argument(
        "--asr-json",
        default=None,
        help="Reserved ASR JSON input. When provided later, it will be embedded into the unified report.",
    )
    parser.add_argument("--humanomni-timeout-seconds", type=int, default=900)
    parser.add_argument("--mediapipe-timeout-seconds", type=int, default=300)
    parser.add_argument(
        "--output-dir",
        default=str(AI_SERVICE_ROOT / "window-runs"),
        help="Directory for unified JSON reports.",
    )
    parser.add_argument("--output-path", default=None, help="Optional explicit unified JSON output path.")
    parser.add_argument(
        "--keep-mediapipe-report",
        action="store_true",
        help="Keep the intermediate MediaPipe JSON report for debugging. By default only the unified JSON is kept.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    _validate_args(args)
    runtime_check = _check_unified_runtime(Path(args.python).resolve())
    if not runtime_check["ok"]:
        raise RuntimeError(runtime_check["message"])

    video_path = Path(args.video_path).resolve()
    output_path = _resolve_output_path(args, video_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    visual_report_path = _mediapipe_report_path(output_path, args.keep_mediapipe_report)
    humanomni_result = _run_humanomni(args, video_path)
    visual_result = _run_mediapipe(args, video_path, visual_report_path)
    asr_result = _load_asr_result(args.asr_json)

    unified = _build_unified_report(
        args=args,
        video_path=video_path,
        output_path=output_path,
        humanomni_result=humanomni_result,
        visual_result=visual_result,
        asr_result=asr_result,
    )
    output_path.write_text(json.dumps(unified, ensure_ascii=False, indent=2), encoding="utf-8")
    if not args.keep_mediapipe_report:
        _delete_file_if_exists(visual_report_path)

    print("=== Unified Window Analysis ===")
    print(f"Status: {'ok' if unified['ok'] else 'failed'}")
    print(f"Video: {video_path}")
    print(
        "Window: "
        f"{unified['window']['startSeconds']}s - {unified['window']['endSeconds']}s "
        f"({unified['window']['durationSeconds']}s)"
    )
    print(f"HumanOmni: {'ok' if humanomni_result['ok'] else 'failed'}")
    print(f"MediaPipe: {'ok' if visual_result['ok'] else 'failed'}")
    print(f"ASR: {asr_result['status']}")
    print(f"Fusion summary: {unified['fusion']['summary']}")
    print(f"JSON report: {output_path}")

    return 0 if unified["ok"] else 2


def _validate_args(args: argparse.Namespace) -> None:
    video_path = Path(args.video_path).resolve()
    if not video_path.is_file():
        raise FileNotFoundError(f"Video file does not exist: {video_path}")
    if args.start_seconds < 0:
        raise ValueError("--start-seconds must be greater than or equal to 0")
    if args.duration_seconds <= 0:
        raise ValueError("--duration-seconds must be greater than 0")
    if args.humanomni_num_frames <= 0:
        raise ValueError("--humanomni-num-frames must be greater than 0")
    if args.mediapipe_sample_fps <= 0:
        raise ValueError("--mediapipe-sample-fps must be greater than 0")
    if args.max_new_tokens <= 0:
        raise ValueError("--max-new-tokens must be greater than 0")
    if args.asr_json and not Path(args.asr_json).resolve().is_file():
        raise FileNotFoundError(f"ASR JSON file does not exist: {Path(args.asr_json).resolve()}")


def _check_unified_runtime(python_path: Path) -> dict[str, Any]:
    command = [
        str(python_path),
        "-c",
        (
            "import json, sys\n"
            "result = {'pythonVersion': sys.version.split()[0], 'pythonExecutable': sys.executable}\n"
            "result['pythonOk'] = sys.version_info[:2] == (3, 12)\n"
            "try:\n"
            "    import numpy as np\n"
            "    result['numpyVersion'] = getattr(np, '__version__', 'unknown')\n"
            "    result['numpyCompatible'] = int(result['numpyVersion'].split('.', 1)[0]) < 2\n"
            "except Exception as exc:\n"
            "    result['numpyVersion'] = None\n"
            "    result['numpyCompatible'] = False\n"
            "    result['numpyError'] = f'{type(exc).__name__}: {exc}'\n"
            "try:\n"
            "    import mediapipe as mp\n"
            "    result['mediapipeVersion'] = getattr(mp, '__version__', 'unknown')\n"
            "    result['mediapipeSolutionsOk'] = hasattr(mp, 'solutions')\n"
            "except Exception as exc:\n"
            "    result['mediapipeVersion'] = None\n"
            "    result['mediapipeSolutionsOk'] = False\n"
            "    result['mediapipeError'] = f'{type(exc).__name__}: {exc}'\n"
            "print(json.dumps(result, ensure_ascii=False))\n"
        ),
    ]
    result = _run_command(command, timeout_seconds=30)
    if result["returnCode"] != 0:
        return {
            "ok": False,
            "message": f"Unified Python runtime check failed: {_failure_text(result)}",
            "detail": result,
        }

    try:
        detail = json.loads(result["stdout"].strip().splitlines()[-1])
    except (IndexError, json.JSONDecodeError) as exc:
        return {
            "ok": False,
            "message": f"Cannot parse unified Python runtime check output: {exc}",
            "detail": result,
        }

    ok = bool(detail.get("pythonOk") and detail.get("numpyCompatible") and detail.get("mediapipeSolutionsOk"))
    if ok:
        return {"ok": True, "message": "Unified Python runtime is ready.", "detail": detail}

    return {
        "ok": False,
        "message": (
            "Unified Python runtime is not ready. Use Python 3.12 and install "
            "numpy>=1.26,<2 and mediapipe==0.10.21 in the same .venv as HumanOmni. "
            f"Current detail: {detail}"
        ),
        "detail": detail,
    }


def _resolve_output_path(args: argparse.Namespace, video_path: Path) -> Path:
    if args.output_path:
        return Path(args.output_path).resolve()

    output_dir = Path(args.output_dir).resolve()
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    stem = re.sub(r"[^A-Za-z0-9_.-]+", "_", video_path.stem)[:72]
    start = _seconds_for_name(args.start_seconds)
    duration = _seconds_for_name(args.duration_seconds)
    return output_dir / f"window-analysis-{stem}-s{start}-d{duration}-{timestamp}.json"


def _seconds_for_name(value: float) -> str:
    text = f"{value:.3f}".rstrip("0").rstrip(".")
    return text.replace(".", "p") or "0"


def _sidecar_path(output_path: Path, suffix: str) -> Path:
    return output_path.with_name(f"{output_path.stem}{suffix}{output_path.suffix}")


def _mediapipe_report_path(output_path: Path, keep_report: bool) -> Path:
    if keep_report:
        return _sidecar_path(output_path, ".mediapipe")

    fd, path_text = tempfile.mkstemp(prefix="ipra-mediapipe-", suffix=".json")
    os.close(fd)
    return Path(path_text)


def _delete_file_if_exists(path: Path) -> None:
    try:
        if path.is_file():
            path.unlink()
    except OSError:
        pass


def _run_humanomni(args: argparse.Namespace, video_path: Path) -> dict[str, Any]:
    python_path = Path(args.python).resolve()
    script_path = AI_SERVICE_ROOT / "scripts" / "humanomni_infer_once.py"
    command = [
        str(python_path),
        str(script_path),
        "--modal",
        args.modal,
        "--model-path",
        str(Path(args.model_path).resolve()),
        "--video-path",
        str(video_path),
        "--start-seconds",
        str(args.start_seconds),
        "--duration-seconds",
        str(args.duration_seconds),
        "--num-frames",
        str(args.humanomni_num_frames),
        "--max-new-tokens",
        str(args.max_new_tokens),
        "--instruct",
        args.instruct,
    ]
    result = _run_command(command, args.humanomni_timeout_seconds)
    summary = _parse_humanomni_output(result["stdout"])
    ok = result["returnCode"] == 0 and bool(summary)

    return {
        "ok": ok,
        "modelPath": str(Path(args.model_path).resolve()),
        "pythonPath": str(python_path),
        "modal": args.modal,
        "instruction": args.instruct,
        "numFrames": args.humanomni_num_frames,
        "maxNewTokens": args.max_new_tokens,
        "summary": summary,
        "elapsedSeconds": result["elapsedSeconds"],
        "returnCode": result["returnCode"],
        "error": None if ok else _failure_text(result),
    }


def _parse_humanomni_output(stdout: str) -> str:
    if HUMANOMNI_MARKER not in stdout:
        return ""

    return stdout.split(HUMANOMNI_MARKER, 1)[1].strip()


def _run_mediapipe(args: argparse.Namespace, video_path: Path, report_path: Path) -> dict[str, Any]:
    python_path = Path(args.python).resolve()
    script_path = AI_SERVICE_ROOT / "scripts" / "mediapipe_analyze_once.py"
    command = [
        str(python_path),
        str(script_path),
        "--video-path",
        str(video_path),
        "--start-seconds",
        str(args.start_seconds),
        "--duration-seconds",
        str(args.duration_seconds),
        "--sample-fps",
        str(args.mediapipe_sample_fps),
        "--max-width",
        str(args.max_width),
        "--output-path",
        str(report_path),
    ]
    if args.include_frames:
        command.append("--include-frames")

    result = _run_command(command, args.mediapipe_timeout_seconds)
    report: dict[str, Any] | None = None
    read_error: str | None = None
    if report_path.is_file():
        try:
            report = json.loads(report_path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            read_error = f"Cannot parse MediaPipe JSON report: {exc}"

    ok = result["returnCode"] == 0 and report is not None and read_error is None
    return {
        "ok": ok,
        "pythonPath": str(python_path),
        "sampleFps": args.mediapipe_sample_fps,
        "maxWidth": args.max_width,
        "includeFrames": bool(args.include_frames),
        "reportPath": str(report_path) if args.keep_mediapipe_report else None,
        "report": report,
        "elapsedSeconds": result["elapsedSeconds"],
        "returnCode": result["returnCode"],
        "error": None if ok else read_error or _failure_text(result),
    }


def _load_asr_result(asr_json: str | None) -> dict[str, Any]:
    placeholder = {
        "ok": False,
        "status": "not_connected",
        "provider": None,
        "model": None,
        "language": None,
        "text": "",
        "segments": [],
        "words": [],
        "sourcePath": None,
        "error": None,
        "notes": "ASR 预留字段：后续接入语音转写后，将同一窗口内的文本、分段时间戳和词级时间戳写入这里。",
    }
    if not asr_json:
        return placeholder

    path = Path(asr_json).resolve()
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        return {
            **placeholder,
            "status": "failed",
            "sourcePath": str(path),
            "error": f"{type(exc).__name__}: {exc}",
        }

    if not isinstance(data, dict):
        return {
            **placeholder,
            "status": "failed",
            "sourcePath": str(path),
            "error": "ASR JSON root must be an object.",
        }

    return {
        **placeholder,
        "ok": bool(data.get("ok", True)),
        "status": str(data.get("status") or "provided"),
        "provider": data.get("provider"),
        "model": data.get("model"),
        "language": data.get("language"),
        "text": data.get("text", ""),
        "segments": data.get("segments", []),
        "words": data.get("words", []),
        "sourcePath": str(path),
        "error": data.get("error"),
        "raw": data,
    }


def _run_command(command: list[str], timeout_seconds: int) -> dict[str, Any]:
    if not Path(command[0]).is_file():
        return {
            "returnCode": 127,
            "elapsedSeconds": 0.0,
            "stdout": "",
            "stderr": f"Python executable does not exist: {command[0]}",
        }

    env = os.environ.copy()
    env.setdefault("PYTHONUTF8", "1")
    env.setdefault("PYTHONIOENCODING", "utf-8")

    started = time.perf_counter()
    try:
        completed = subprocess.run(
            command,
            cwd=str(REPO_ROOT),
            env=env,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            timeout=timeout_seconds,
            check=False,
        )
    except subprocess.TimeoutExpired as exc:
        elapsed = time.perf_counter() - started
        return {
            "returnCode": 124,
            "elapsedSeconds": round(elapsed, 3),
            "stdout": exc.stdout or "",
            "stderr": f"Command timed out after {timeout_seconds}s.\n{exc.stderr or ''}".strip(),
        }

    elapsed = time.perf_counter() - started
    return {
        "returnCode": completed.returncode,
        "elapsedSeconds": round(elapsed, 3),
        "stdout": completed.stdout,
        "stderr": completed.stderr,
    }


def _failure_text(result: dict[str, Any]) -> str:
    stderr = _tail(result.get("stderr") or "")
    stdout = _tail(result.get("stdout") or "")
    parts = [f"returnCode={result.get('returnCode')}"]
    if stderr:
        parts.append(f"stderr={stderr}")
    if stdout:
        parts.append(f"stdout={stdout}")
    return "; ".join(parts)


def _tail(text: str, limit: int = 1200) -> str:
    cleaned = text.strip()
    if len(cleaned) <= limit:
        return cleaned
    return cleaned[-limit:]


def _build_unified_report(
    *,
    args: argparse.Namespace,
    video_path: Path,
    output_path: Path,
    humanomni_result: dict[str, Any],
    visual_result: dict[str, Any],
    asr_result: dict[str, Any],
) -> dict[str, Any]:
    visual_report = visual_result.get("report") or {}
    visual_summary = visual_report.get("summary") or {}
    timeline_events = visual_report.get("timelineEvents") or []

    evidence_timeline = [_normalize_event(event) for event in timeline_events]
    fusion_summary = _build_fusion_summary(humanomni_result, visual_summary, evidence_timeline, asr_result)

    return {
        "schemaVersion": "ai-service.window-analysis.v4",
        "ok": bool(humanomni_result["ok"] and visual_result["ok"]),
        "generatedAt": datetime.now().isoformat(timespec="seconds"),
        "videoPath": str(video_path),
        "reportPath": str(output_path),
        "window": {
            "startSeconds": round(args.start_seconds, 3),
            "durationSeconds": round(args.duration_seconds, 3),
            "endSeconds": round(args.start_seconds + args.duration_seconds, 3),
        },
        "asr": asr_result,
        "humanOmni": {
            key: value
            for key, value in humanomni_result.items()
            if key not in {"returnCode"}
        },
        "visualObservation": {
            "ok": visual_result["ok"],
            "provider": (visual_report.get("analyzer") or {}).get("provider"),
            "sampleFps": visual_result["sampleFps"],
            "startSeconds": (visual_report.get("analyzer") or {}).get("startSeconds"),
            "durationSeconds": (visual_report.get("analyzer") or {}).get("durationSeconds"),
            "endSeconds": (visual_report.get("analyzer") or {}).get("endSeconds"),
            "sourceFps": (visual_report.get("analyzer") or {}).get("sourceFps"),
            "framesAnalyzed": (visual_report.get("analyzer") or {}).get("framesAnalyzed"),
            "summary": visual_summary,
            "timelineEvents": timeline_events,
            "error": visual_result["error"],
            "elapsedSeconds": visual_result["elapsedSeconds"],
        },
        "fusion": {
            "mode": "same_window_candidate_observation",
            "summary": fusion_summary,
            "observedSignals": visual_summary.get("observedSignals", []),
            "evidenceTimeline": evidence_timeline,
            "limitations": [
                "当前统一输出只合并同一视频窗口内的 HumanOmni 摘要和 MediaPipe 视觉候选事件。",
                "ASR 字段已预留；未提供 ASR JSON 时，不判断语音语义与视觉表现是否一致。",
                "MediaPipe 输出属于候选观察线索，后续仍需要业务 LLM 与检查员结合上下文复核。",
            ],
        },
    }


def _normalize_event(event: dict[str, Any]) -> dict[str, Any]:
    event_type = event.get("type", "unknown")
    return {
        "type": event_type,
        "label": EVENT_LABELS.get(event_type, event_type),
        "startSeconds": event.get("startSeconds"),
        "endSeconds": event.get("endSeconds"),
        "startTime": event.get("startTime"),
        "endTime": event.get("endTime"),
        "confidence": event.get("confidence"),
        "description": event.get("description"),
        "source": event.get("source"),
        "evidence": event.get("evidence"),
    }


def _build_fusion_summary(
    humanomni_result: dict[str, Any],
    visual_summary: dict[str, Any],
    evidence_timeline: list[dict[str, Any]],
    asr_result: dict[str, Any],
) -> str:
    human_summary = (humanomni_result.get("summary") or "").strip()
    parts: list[str] = []
    if human_summary:
        parts.append(f"HumanOmni 整体描述：{human_summary}")
    elif humanomni_result.get("error"):
        parts.append("HumanOmni 未成功返回摘要。")

    asr_text = str(asr_result.get("text") or "").strip()
    if asr_text:
        parts.append(f"ASR 转写文本：{asr_text}")
    else:
        parts.append("ASR 尚未接入或未提供本窗口转写文本。")

    if evidence_timeline:
        top_events = sorted(
            evidence_timeline,
            key=lambda item: float(item.get("confidence") or 0),
            reverse=True,
        )[:5]
        event_text = "；".join(
            (
                f"{event['startTime']}-{event['endTime']} {event['label']}"
                f"（置信度 {event.get('confidence')}）"
            )
            for event in top_events
        )
        parts.append(f"MediaPipe 在同一窗口内检测到候选视觉事件：{event_text}。")
    else:
        coverage = visual_summary.get("coverage") or {}
        if coverage.get("totalFrames"):
            parts.append("MediaPipe 在同一窗口内未检测到明显候选视觉事件。")
        else:
            parts.append("MediaPipe 未获得可用帧或未成功完成观察分析。")

    parts.append("该结果用于后续融合判断的观察输入，不直接构成风险结论。")
    return " ".join(parts)


if __name__ == "__main__":
    raise SystemExit(main())
