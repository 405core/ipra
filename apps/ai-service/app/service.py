from __future__ import annotations

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from video_observation import AnalyzeOptions, VideoObservationError, analyze_video_file


class HealthResponse(BaseModel):
    status: str
    service: str


class VideoObservationRequest(BaseModel):
    video_path: str
    sample_fps: float = 5.0
    start_seconds: float = 0.0
    duration_seconds: float | None = None
    max_width: int = 960
    include_frames: bool = False


app = FastAPI(title="IPRA AI Service", version="0.1.0")


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok", service="ipra-ai-service")


@app.post("/v1/analyze-video-observations")
def analyze_video_observations(request: VideoObservationRequest) -> dict:
    options = AnalyzeOptions(
        sample_fps=request.sample_fps,
        start_seconds=request.start_seconds,
        duration_seconds=request.duration_seconds,
        max_width=request.max_width,
        include_frames=request.include_frames,
    )

    try:
        return analyze_video_file(request.video_path, options)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except (ValueError, VideoObservationError) as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
