from __future__ import annotations

from typing import Literal

from pydantic import Field

from schemas.inquiry import ApiModel, HumanOmniWindowSummary


class UploadedWindowFile(ApiModel):
    filename: str
    stored_path: str = Field(alias="storedPath")
    content_type: str | None = Field(default=None, alias="contentType")
    size_bytes: int = Field(alias="sizeBytes")


class HumanOmniSummaryResult(ApiModel):
    model_name: str = Field(default="HumanOmni0.5", alias="modelName")
    raw_summary: str = Field(default="", alias="rawSummary")
    elapsed_seconds: float = Field(default=0.0, alias="elapsedSeconds")
    error: str | None = None


class HumanOmniSummarizeWindowResponse(ApiModel):
    ok: bool
    session_id: str = Field(alias="sessionId")
    question_id: str | None = Field(default=None, alias="questionId")
    window_id: str = Field(alias="windowId")
    start_seconds: float | None = Field(default=None, alias="startSeconds")
    end_seconds: float | None = Field(default=None, alias="endSeconds")
    modal: Literal["video", "video_audio", "audio"]
    uploaded_file: UploadedWindowFile = Field(alias="uploadedFile")
    humanomni: HumanOmniSummaryResult = Field(alias="humanOmni")
    humanomni_window: HumanOmniWindowSummary = Field(alias="humanOmniWindow")

