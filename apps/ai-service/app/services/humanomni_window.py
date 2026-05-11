from __future__ import annotations

import os
import re
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile

from config import AI_SERVICE_ROOT, DEFAULT_HF_HOME, DEFAULT_MODEL_PATH, REPO_ROOT, resolve_path
from schemas.humanomni import (
    HumanOmniSummarizeWindowResponse,
    HumanOmniSummaryResult,
    UploadedWindowFile,
)
from schemas.inquiry import HumanOmniWindowSummary


HUMANOMNI_MARKER = "=== HumanOmni Output ==="
ALLOWED_EXTENSIONS = {".mp4", ".mov", ".mkv", ".avi", ".webm", ".wav", ".mp3", ".m4a"}
DEFAULT_INSTRUCT = (
    "Summarize this interview audio/video window briefly. Describe the visible person, "
    "speech content when available, and overall emotional state. Do not output structured JSON."
)


async def summarize_uploaded_window(
    *,
    file: UploadFile,
    session_id: str,
    question_id: str | None,
    window_id: str | None,
    modal: str,
    start_seconds: float | None,
    end_seconds: float | None,
    max_new_tokens: int,
    num_frames: int | None,
    instruct: str | None,
) -> HumanOmniSummarizeWindowResponse:
    _validate_modal(modal)
    _validate_times(start_seconds, end_seconds)
    _validate_positive_int(max_new_tokens, "maxNewTokens")
    if num_frames is not None:
        _validate_positive_int(num_frames, "numFrames")

    resolved_window_id = window_id or f"window-{datetime.now().strftime('%Y%m%d-%H%M%S')}-{uuid4().hex[:8]}"
    saved_path, size_bytes = await _save_upload(file, session_id, resolved_window_id)
    result = _run_humanomni(
        saved_path=saved_path,
        modal=modal,
        max_new_tokens=max_new_tokens,
        num_frames=num_frames,
        instruct=instruct or DEFAULT_INSTRUCT,
    )
    stored_path = str(saved_path)
    stored_bucket: str | None = None
    stored_object_key: str | None = None

    summary = result.raw_summary
    return HumanOmniSummarizeWindowResponse(
        ok=not result.error and bool(summary),
        sessionId=session_id,
        questionId=question_id,
        windowId=resolved_window_id,
        startSeconds=start_seconds,
        endSeconds=end_seconds,
        modal=modal,
        uploadedFile=UploadedWindowFile(
            filename=file.filename or saved_path.name,
            storedPath=stored_path,
            contentType=file.content_type,
            sizeBytes=size_bytes,
            bucket=stored_bucket,
            objectKey=stored_object_key,
        ),
        humanOmni=result,
        humanOmniWindow=HumanOmniWindowSummary(
            windowId=resolved_window_id,
            questionId=question_id,
            startSeconds=start_seconds,
            endSeconds=end_seconds,
            modal=modal,
            rawSummary=summary,
            modelName=result.model_name,
        ),
    )


def _validate_modal(modal: str) -> None:
    if modal not in {"video", "video_audio", "audio"}:
        raise ValueError("modal must be one of: video, video_audio, audio")


def _validate_times(start_seconds: float | None, end_seconds: float | None) -> None:
    if start_seconds is not None and start_seconds < 0:
        raise ValueError("startSeconds must be greater than or equal to 0")
    if end_seconds is not None and end_seconds < 0:
        raise ValueError("endSeconds must be greater than or equal to 0")
    if start_seconds is not None and end_seconds is not None and end_seconds <= start_seconds:
        raise ValueError("endSeconds must be greater than startSeconds")


def _validate_positive_int(value: int, field_name: str) -> None:
    if value <= 0:
        raise ValueError(f"{field_name} must be greater than 0")


async def _save_upload(file: UploadFile, session_id: str, window_id: str) -> tuple[Path, int]:
    original_name = file.filename or "window.mp4"
    extension = Path(original_name).suffix.lower()
    if extension not in ALLOWED_EXTENSIONS:
        raise ValueError(f"Unsupported upload file extension: {extension or '(none)'}")

    upload_dir = _upload_dir()
    upload_dir.mkdir(parents=True, exist_ok=True)
    safe_session = _safe_name(session_id)
    safe_window = _safe_name(window_id)
    saved_path = upload_dir / f"{safe_session}-{safe_window}{extension}"

    max_bytes = _max_upload_bytes()
    size = 0
    try:
        with saved_path.open("wb") as output:
            while True:
                chunk = await file.read(1024 * 1024)
                if not chunk:
                    break
                size += len(chunk)
                if size > max_bytes:
                    raise ValueError(f"Upload file is larger than {max_bytes // (1024 * 1024)} MB")
                output.write(chunk)
    except Exception:
        _delete_if_exists(saved_path)
        raise
    finally:
        await file.close()

    if size == 0:
        _delete_if_exists(saved_path)
        raise ValueError("Upload file is empty")

    return saved_path, size


def _run_humanomni(
    *,
    saved_path: Path,
    modal: str,
    max_new_tokens: int,
    num_frames: int | None,
    instruct: str,
) -> HumanOmniSummaryResult:
    command = [
        sys.executable,
        str(AI_SERVICE_ROOT / "scripts" / "humanomni_infer_once.py"),
        "--modal",
        modal,
        "--model-path",
        str(DEFAULT_MODEL_PATH),
        "--video-path",
        str(saved_path),
        "--max-new-tokens",
        str(max_new_tokens),
        "--instruct",
        instruct,
    ]
    if num_frames is not None:
        command.extend(["--num-frames", str(num_frames)])

    env = os.environ.copy()
    env.setdefault("PYTHONUTF8", "1")
    env.setdefault("PYTHONIOENCODING", "utf-8")
    env["HF_HOME"] = str(DEFAULT_HF_HOME)
    env["HF_HUB_OFFLINE"] = "1"
    env["TRANSFORMERS_OFFLINE"] = "1"

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
            timeout=_infer_timeout_seconds(),
            check=False,
        )
    except subprocess.TimeoutExpired as exc:
        elapsed = time.perf_counter() - started
        return HumanOmniSummaryResult(
            rawSummary="",
            elapsedSeconds=round(elapsed, 3),
            error=f"HumanOmni inference timed out: {exc}",
        )

    elapsed = time.perf_counter() - started
    summary = _parse_summary(completed.stdout)
    error = None
    if completed.returncode != 0:
        error = _failure_text(completed)
    elif not summary:
        error = "HumanOmni output marker was not found or summary is empty."

    return HumanOmniSummaryResult(
        rawSummary=summary,
        elapsedSeconds=round(elapsed, 3),
        error=error,
    )


def _parse_summary(stdout: str) -> str:
    if HUMANOMNI_MARKER not in stdout:
        return ""
    return stdout.split(HUMANOMNI_MARKER, 1)[1].strip()


def _failure_text(completed: subprocess.CompletedProcess[str]) -> str:
    stderr = _tail(completed.stderr)
    stdout = _tail(completed.stdout)
    parts = [f"returnCode={completed.returncode}"]
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


def _upload_dir() -> Path:
    return resolve_path(os.getenv("HUMANOMNI_UPLOAD_DIR"), AI_SERVICE_ROOT / "uploads" / "humanomni-windows")


def _max_upload_bytes() -> int:
    raw_value = os.getenv("HUMANOMNI_UPLOAD_MAX_MB", "200").strip() or "200"
    try:
        megabytes = int(raw_value)
    except ValueError as exc:
        raise ValueError("HUMANOMNI_UPLOAD_MAX_MB must be an integer") from exc
    if megabytes <= 0:
        raise ValueError("HUMANOMNI_UPLOAD_MAX_MB must be greater than 0")
    return megabytes * 1024 * 1024


def _infer_timeout_seconds() -> int:
    raw_value = os.getenv("HUMANOMNI_INFER_TIMEOUT_SECONDS", "900").strip() or "900"
    try:
        timeout = int(raw_value)
    except ValueError as exc:
        raise ValueError("HUMANOMNI_INFER_TIMEOUT_SECONDS must be an integer") from exc
    if timeout <= 0:
        raise ValueError("HUMANOMNI_INFER_TIMEOUT_SECONDS must be greater than 0")
    return timeout


def _safe_name(value: str) -> str:
    cleaned = re.sub(r"[^A-Za-z0-9_.-]+", "_", value.strip())
    return cleaned[:80] or uuid4().hex[:12]


def _build_object_name(session_id: str, window_id: str, extension: str) -> str:
    day_path = datetime.now().strftime("%Y/%m/%d")
    safe_session = _safe_name(session_id)
    safe_window = _safe_name(window_id)
    return f"humanomni-windows/{day_path}/{safe_session}-{safe_window}{extension}"


def _delete_if_exists(path: Path) -> None:
    try:
        if path.is_file():
            path.unlink()
    except OSError:
        pass
