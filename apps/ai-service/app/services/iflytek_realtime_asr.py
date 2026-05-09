from __future__ import annotations

import asyncio
import base64
from dataclasses import dataclass
from datetime import datetime, timezone, timedelta
import hashlib
import hmac
import json
import os
from typing import TYPE_CHECKING
from typing import Any
from urllib.parse import quote
from urllib.parse import urlencode
from uuid import uuid4

if TYPE_CHECKING:
    from fastapi import WebSocket


DEFAULT_RTASR_URL = "wss://office-api-ast-dx.iflyaisol.com/ast/communicate/v1"


class IflytekRealtimeAsrError(RuntimeError):
    pass


@dataclass(frozen=True)
class IflytekRealtimeAsrSettings:
    app_id: str
    api_key: str
    api_secret: str
    url: str = DEFAULT_RTASR_URL
    language: str = "autodialect"
    samplerate: int = 16000
    audio_encode: str = "pcm_s16le"


def load_iflytek_realtime_asr_settings() -> IflytekRealtimeAsrSettings:
    settings = IflytekRealtimeAsrSettings(
        app_id=os.getenv("IFLYTEK_RTASR_APP_ID", "").strip(),
        api_key=os.getenv("IFLYTEK_RTASR_API_KEY", "").strip(),
        api_secret=os.getenv("IFLYTEK_RTASR_API_SECRET", "").strip(),
        url=os.getenv("IFLYTEK_RTASR_URL", DEFAULT_RTASR_URL).strip()
        or DEFAULT_RTASR_URL,
        language=os.getenv("IFLYTEK_RTASR_LANGUAGE", "autodialect").strip()
        or "autodialect",
    )

    missing = [
        name
        for name, value in (
            ("IFLYTEK_RTASR_APP_ID", settings.app_id),
            ("IFLYTEK_RTASR_API_KEY", settings.api_key),
            ("IFLYTEK_RTASR_API_SECRET", settings.api_secret),
        )
        if not value
    ]
    if missing:
        raise IflytekRealtimeAsrError(
            f"missing iflytek realtime ASR env: {', '.join(missing)}"
        )

    return settings


def create_utc_timestamp() -> str:
    utc8 = timezone(timedelta(hours=8))
    return datetime.now(utc8).strftime("%Y-%m-%dT%H:%M:%S%z")


def create_signature(params: dict[str, str], api_secret: str) -> str:
    canonical = "&".join(
        f"{quote(str(key), safe='')}={quote(str(value), safe='')}"
        for key, value in sorted(params.items(), key=lambda item: item[0])
    )
    digest = hmac.new(
        api_secret.encode("utf-8"),
        canonical.encode("utf-8"),
        hashlib.sha1,
    ).digest()
    return base64.b64encode(digest).decode("utf-8")


def build_iflytek_realtime_asr_url(
    settings: IflytekRealtimeAsrSettings,
    session_id: str | None = None,
) -> str:
    params = {
        "accessKeyId": settings.api_key,
        "appId": settings.app_id,
        "audio_encode": settings.audio_encode,
        "lang": settings.language,
        "samplerate": str(settings.samplerate),
        "utc": create_utc_timestamp(),
        "uuid": session_id or uuid4().hex,
    }
    params["signature"] = create_signature(params, settings.api_secret)
    return f"{settings.url}?{urlencode(params)}"


def parse_iflytek_payload(raw_message: str | bytes) -> dict[str, Any] | None:
    if isinstance(raw_message, bytes):
        raw_message = raw_message.decode("utf-8", errors="ignore")

    try:
        payload = json.loads(raw_message)
    except json.JSONDecodeError:
        return None

    if isinstance(payload.get("data"), str):
        try:
            payload["data"] = json.loads(payload["data"])
        except json.JSONDecodeError:
            pass

    return payload


def extract_words_from_ws(ws_items: list[dict[str, Any]]) -> str:
    words: list[str] = []
    for ws_item in ws_items:
        for cw_item in ws_item.get("cw", []) or []:
            word = str(cw_item.get("w", "")).strip()
            if word:
                words.append(word)
    return "".join(words).strip()


def extract_iflytek_transcript_event(payload: dict[str, Any]) -> dict[str, Any] | None:
    data = payload.get("data")
    if not isinstance(data, dict):
        data = payload

    cn = data.get("cn") if isinstance(data.get("cn"), dict) else None
    st = cn.get("st") if isinstance(cn, dict) and isinstance(cn.get("st"), dict) else None
    if not isinstance(st, dict):
        return None

    rt_items = st.get("rt", []) or []
    text_parts: list[str] = []
    for rt_item in rt_items:
        if not isinstance(rt_item, dict):
            continue
        ws_items = rt_item.get("ws", []) or []
        if isinstance(ws_items, list):
            part = extract_words_from_ws(ws_items)
            if part:
                text_parts.append(part)

    text = "".join(text_parts).strip()
    if not text:
        return None

    segment_id = int(st.get("bg", 0) or 0)
    return {
        "type": "transcript",
        "provider": "iflytek-rtasr-llm",
        "model": "rtasr-llm",
        "text": text,
        "segmentId": segment_id,
        "startMs": int(st.get("bg", 0) or 0),
        "endMs": int(st.get("ed", 0) or 0),
        "isFinal": str(st.get("type", "")) == "0" or bool(data.get("ls")),
        "rawType": st.get("type"),
    }


async def send_client_json(websocket: WebSocket, payload: dict[str, Any]) -> None:
    await websocket.send_text(json.dumps(payload, ensure_ascii=False))


async def bridge_iflytek_realtime_asr(websocket: "WebSocket") -> None:
    from fastapi import WebSocketDisconnect

    await websocket.accept()

    try:
        import websockets
        from websockets.exceptions import WebSocketException
    except ImportError as exc:
        await send_client_json(
            websocket,
            {
                "type": "error",
                "message": "AI-Service 缺少 websockets 依赖，请安装 requirements.txt 后重启服务。",
                "provider": "iflytek-rtasr-llm",
            },
        )
        await websocket.close(code=1011)
        return

    try:
        settings = load_iflytek_realtime_asr_settings()
        vendor_url = build_iflytek_realtime_asr_url(settings)
    except IflytekRealtimeAsrError as exc:
        await send_client_json(
            websocket,
            {"type": "error", "message": str(exc), "provider": "iflytek-rtasr-llm"},
        )
        await websocket.close(code=1011)
        return

    try:
        async with websockets.connect(vendor_url, max_size=8 * 1024 * 1024) as vendor:
            await send_client_json(
                websocket,
                {
                    "type": "status",
                    "status": "connected",
                    "provider": "iflytek-rtasr-llm",
                    "sampleRate": settings.samplerate,
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
                                await vendor.send(json.dumps({"end": True}))
                                return
                except WebSocketDisconnect:
                    await vendor.close()

            async def forward_results() -> None:
                async for raw_message in vendor:
                    payload = parse_iflytek_payload(raw_message)
                    if not payload:
                        continue

                    if payload.get("code") not in (None, 0, "0"):
                        await send_client_json(
                            websocket,
                            {
                                "type": "error",
                                "message": payload.get("message") or payload.get("desc") or "讯飞转写失败",
                                "provider": "iflytek-rtasr-llm",
                            },
                        )
                        continue

                    transcript_event = extract_iflytek_transcript_event(payload)
                    if transcript_event:
                        await send_client_json(websocket, transcript_event)

            await asyncio.gather(forward_audio(), forward_results())
    except WebSocketDisconnect:
        return
    except (OSError, WebSocketException) as exc:
        await send_client_json(
            websocket,
            {
                "type": "error",
                "message": f"讯飞实时转写连接失败：{exc}",
                "provider": "iflytek-rtasr-llm",
            },
        )
        await websocket.close(code=1011)
