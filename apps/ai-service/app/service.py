from __future__ import annotations

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from pydantic import BaseModel

from schemas.humanomni import HumanOmniSummarizeWindowResponse
from schemas.inquiry import (
    FirstRoundStrategyRequest,
    FirstRoundStrategyResponse,
    FollowupGuidanceRequest,
    FollowupGuidanceResponse,
)
from services.business_llm_client import BusinessLlmClient, load_prompt
from services.business_llm_client import BusinessLlmError
from services.humanomni_window import summarize_uploaded_window


class HealthResponse(BaseModel):
    status: str
    service: str


app = FastAPI(title="IPRA AI Service", version="0.2.0")


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok", service="ipra-ai-service")


@app.post("/v1/humanomni/summarize-window", response_model=HumanOmniSummarizeWindowResponse)
async def humanomni_summarize_window(
    file: UploadFile = File(...),
    session_id: str = Form(..., alias="sessionId"),
    question_id: str | None = Form(default=None, alias="questionId"),
    window_id: str | None = Form(default=None, alias="windowId"),
    modal: str = Form(default="video_audio"),
    start_seconds: float | None = Form(default=None, alias="startSeconds"),
    end_seconds: float | None = Form(default=None, alias="endSeconds"),
    max_new_tokens: int = Form(default=128, alias="maxNewTokens"),
    num_frames: int | None = Form(default=None, alias="numFrames"),
    instruct: str | None = Form(default=None),
) -> HumanOmniSummarizeWindowResponse:
    try:
        return await summarize_uploaded_window(
            file=file,
            session_id=session_id,
            question_id=question_id,
            window_id=window_id,
            modal=modal,
            start_seconds=start_seconds,
            end_seconds=end_seconds,
            max_new_tokens=max_new_tokens,
            num_frames=num_frames,
            instruct=instruct,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@app.post("/v1/inquiry/first-round-strategy", response_model=FirstRoundStrategyResponse)
def first_round_strategy(request: FirstRoundStrategyRequest) -> FirstRoundStrategyResponse:
    try:
        client = BusinessLlmClient()
        prompt = load_prompt("first_round_strategy.zh.md")
        return client.generate_first_round_strategy(request, prompt)
    except NotImplementedError as exc:
        raise HTTPException(status_code=501, detail=str(exc)) from exc
    except BusinessLlmError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@app.post("/v1/inquiry/followup-guidance", response_model=FollowupGuidanceResponse)
def followup_guidance(request: FollowupGuidanceRequest) -> FollowupGuidanceResponse:
    try:
        client = BusinessLlmClient()
        prompt = load_prompt("followup_guidance.zh.md")
        return client.generate_followup_guidance(request, prompt)
    except NotImplementedError as exc:
        raise HTTPException(status_code=501, detail=str(exc)) from exc
    except BusinessLlmError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
