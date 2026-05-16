from __future__ import annotations

import asyncio
from dataclasses import dataclass
import json
import logging
import os
from typing import TYPE_CHECKING
from typing import Any
from urllib.parse import urlencode

if TYPE_CHECKING:
    from fastapi import WebSocket


DEFAULT_QWEN3_ASR_URL = "ws://47.108.217.127:9090/ws/asr"
PROVIDER = "qwen3-asr"
MODEL = "qwen3-asr"
LOGGER = logging.getLogger("ipra.qwen3_realtime_asr")


@dataclass(frozen=True)
class Qwen3RealtimeAsrSettings:
    url: str = DEFAULT_QWEN3_ASR_URL
    sample_rate: int = 16000
    language: str = "Chinese"
    partial_interval_sec: int = 2
    min_audio_sec: int = 1
    max_window_sec: int = 30


def _read_int_env(name: str, default: int) -> int:
    raw_value = os.getenv(name, "").strip()
    if not raw_value:
        return default
    try:
        return int(raw_value)
    except ValueError:
        LOGGER.warning("invalid %s=%r, using %s", name, raw_value, default)
        return default


def load_qwen3_realtime_asr_settings() -> Qwen3RealtimeAsrSettings:
    return Qwen3RealtimeAsrSettings(
        url=os.getenv("QWEN3_ASR_URL", DEFAULT_QWEN3_ASR_URL).strip()
        or DEFAULT_QWEN3_ASR_URL,
        sample_rate=_read_int_env("QWEN3_ASR_SAMPLE_RATE", 16000),
        language=os.getenv("QWEN3_ASR_LANGUAGE", "Chinese").strip() or "Chinese",
        partial_interval_sec=_read_int_env("QWEN3_ASR_PARTIAL_INTERVAL_SEC", 2),
        min_audio_sec=_read_int_env("QWEN3_ASR_MIN_AUDIO_SEC", 1),
        max_window_sec=_read_int_env("QWEN3_ASR_MAX_WINDOW_SEC", 30),
    )


def build_qwen3_realtime_asr_url(settings: Qwen3RealtimeAsrSettings) -> str:
    separator = "&" if "?" in settings.url else "?"
    params = urlencode(
        {
            "sample_rate": str(settings.sample_rate),
            "language": settings.language,
            "partial_interval_sec": str(settings.partial_interval_sec),
            "min_audio_sec": str(settings.min_audio_sec),
            "max_window_sec": str(settings.max_window_sec),
        }
    )
    return f"{settings.url}{separator}{params}"


def _parse_json_message(raw_message: str | bytes) -> dict[str, Any] | None:
    if isinstance(raw_message, bytes):
        raw_message = raw_message.decode("utf-8", errors="ignore")

    try:
        payload = json.loads(raw_message)
    except json.JSONDecodeError:
        return None

    return payload if isinstance(payload, dict) else None


def _first_text_value(payload: dict[str, Any]) -> str:
    for key in ("text", "transcript", "result"):
        value = payload.get(key)
        if isinstance(value, str) and value.strip():
            return value.strip()

    data = payload.get("data")
    if isinstance(data, dict):
        for key in ("text", "transcript", "result"):
            value = data.get(key)
            if isinstance(value, str) and value.strip():
                return value.strip()

    return ""


def _bool_from_payload(payload: dict[str, Any], *keys: str) -> bool:
    for key in keys:
        value = payload.get(key)
        if isinstance(value, bool):
            return value
        if isinstance(value, str):
            return value.lower() in {"true", "1", "yes", "final"}
        if isinstance(value, int):
            return value == 1
    return False


def extract_qwen3_message_event(raw_message: str | bytes) -> dict[str, Any] | None:
    if isinstance(raw_message, bytes):
        raw_message = raw_message.decode("utf-8", errors="ignore")

    raw_text = str(raw_message).strip()
    if not raw_text:
        return None

    payload = _parse_json_message(raw_text)
    if payload is None:
        return {
            "type": "transcript",
            "provider": PROVIDER,
            "model": MODEL,
            "text": raw_text,
            "segmentId": 0,
            "isFinal": False,
        }

    error_message = payload.get("error")
    code = payload.get("code")
    has_error_code = code not in (None, 0, "0", "ok", "OK")
    if (error_message or has_error_code) and not _first_text_value(payload):
        return {
            "type": "error",
            "provider": PROVIDER,
            "message": str(error_message or payload.get("message") or "Qwen3-ASR 转写失败"),
        }

    text = _first_text_value(payload)
    if not text:
        return None

    return {
        "type": "transcript",
        "provider": PROVIDER,
        "model": MODEL,
        "text": text,
        "segmentId": int(payload.get("segment_id", payload.get("segmentId", 0)) or 0),
        "startMs": int(payload.get("start_ms", payload.get("startMs", 0)) or 0),
        "endMs": int(payload.get("end_ms", payload.get("endMs", 0)) or 0),
        "isFinal": _bool_from_payload(payload, "is_final", "isFinal", "final"),
        "rawType": payload.get("type"),
    }


async def send_client_json(websocket: "WebSocket", payload: dict[str, Any]) -> None:
    await websocket.send_text(json.dumps(payload, ensure_ascii=False))


async def bridge_qwen3_realtime_asr(websocket: "WebSocket") -> None:
    from fastapi import WebSocketDisconnect

    await websocket.accept()

    try:
        import websockets
        from websockets.exceptions import WebSocketException
    except ImportError:
        await send_client_json(
            websocket,
            {
                "type": "error",
                "message": "AI-Service 缺少 websockets 依赖，请安装 requirements.txt 后重启服务。",
                "provider": PROVIDER,
            },
        )
        await websocket.close(code=1011)
        return

    settings = load_qwen3_realtime_asr_settings()
    vendor_url = build_qwen3_realtime_asr_url(settings)

    try:
        async with websockets.connect(
            vendor_url,
            max_size=None,
            open_timeout=10,
        ) as vendor:
            LOGGER.info(
                "Qwen3-ASR connected url=%s sample_rate=%s language=%s",
                settings.url,
                settings.sample_rate,
                settings.language,
            )
            await send_client_json(
                websocket,
                {
                    "type": "status",
                    "status": "connected",
                    "provider": PROVIDER,
                    "sampleRate": settings.sample_rate,
                },
            )

            async def forward_audio() -> None:
                try:
                    while True:
                        message = await websocket.receive()
                        if "bytes" in message and message["bytes"] is not None:
                            await vendor.send(message["bytes"])
                            continue

                        if "text" in message and message["text"]:
                            try:
                                command = json.loads(message["text"])
                            except json.JSONDecodeError:
                                command = {}
                            if command.get("type") == "end":
                                await vendor.send("end")
                                return
                except WebSocketDisconnect:
                    await vendor.close()

            async def forward_results() -> None:
                async for raw_message in vendor:
                    event = extract_qwen3_message_event(raw_message)
                    if event:
                        await send_client_json(websocket, event)

            await asyncio.gather(forward_audio(), forward_results())
    except WebSocketDisconnect:
        return
    except (OSError, WebSocketException, TimeoutError) as exc:
        LOGGER.warning("Qwen3-ASR websocket failed: %s", exc)
        await send_client_json(
            websocket,
            {
                "type": "error",
                "message": f"Qwen3-ASR 实时转写连接失败：{exc}",
                "provider": PROVIDER,
            },
        )
        await websocket.close(code=1011)
