from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field


class ApiModel(BaseModel):
    model_config = ConfigDict(populate_by_name=True, extra="allow")


class PassengerProfile(ApiModel):
    passenger_id: str | None = Field(default=None, alias="passengerId")
    name: str | None = None
    age: int | None = None
    gender: str | None = None
    nationality: str | None = None
    occupation: str | None = None
    monthly_income: str | None = Field(default=None, alias="monthlyIncome")
    travel_history: list[str] = Field(default_factory=list, alias="travelHistory")
    documents: dict[str, Any] = Field(default_factory=dict)


class TripProfile(ApiModel):
    destination: str | None = None
    purpose_declared: str | None = Field(default=None, alias="purposeDeclared")
    stay_days: int | None = Field(default=None, alias="stayDays")
    ticket_type: str | None = Field(default=None, alias="ticketType")
    return_ticket_status: str | None = Field(default=None, alias="returnTicketStatus")
    companions: list[str] = Field(default_factory=list)
    accommodation: str | None = None
    funding_source: str | None = Field(default=None, alias="fundingSource")


class OutputConstraints(ApiModel):
    question_count: int = Field(default=6, ge=1, le=12, alias="questionCount")
    tone: str = "中性、专业、非指控"
    language: str = "zh-CN"


class RiskAssessment(ApiModel):
    level: Literal["low", "medium", "high", "unknown"] = "unknown"
    summary: str
    reasons: list[str] = Field(default_factory=list)


class InquiryStrategy(ApiModel):
    goal: str
    focus_areas: list[str] = Field(default_factory=list, alias="focusAreas")


class GeneratedQuestion(ApiModel):
    question_id: str = Field(alias="questionId")
    priority: int
    question: str
    purpose: str
    expected_evidence: list[str] = Field(default_factory=list, alias="expectedEvidence")


class LlmRuntimeInfo(ApiModel):
    provider: str = "mock"
    model: str = "mock-business-llm"


class FirstRoundStrategyRequest(ApiModel):
    session_id: str = Field(alias="sessionId")
    passenger_profile: PassengerProfile = Field(alias="passengerProfile")
    trip_profile: TripProfile = Field(default_factory=TripProfile, alias="tripProfile")
    known_facts: list[str] = Field(default_factory=list, alias="knownFacts")
    constraints: OutputConstraints = Field(default_factory=OutputConstraints)


class FirstRoundStrategyResponse(ApiModel):
    session_id: str = Field(alias="sessionId")
    llm: LlmRuntimeInfo
    risk_assessment: RiskAssessment = Field(alias="riskAssessment")
    strategy: InquiryStrategy
    questions: list[GeneratedQuestion]
    operator_note: str = Field(alias="operatorNote")


class QuestionAnswer(ApiModel):
    question_id: str | None = Field(default=None, alias="questionId")
    round_no: int | None = Field(default=None, alias="roundNo")
    question: str
    answer_text: str = Field(alias="answerText")
    answer_start_seconds: float | None = Field(default=None, alias="answerStartSeconds")
    answer_end_seconds: float | None = Field(default=None, alias="answerEndSeconds")


class HumanOmniWindowSummary(ApiModel):
    window_id: str | None = Field(default=None, alias="windowId")
    question_id: str | None = Field(default=None, alias="questionId")
    start_seconds: float | None = Field(default=None, alias="startSeconds")
    end_seconds: float | None = Field(default=None, alias="endSeconds")
    modal: Literal["video", "video_audio", "audio"] | str = "video_audio"
    raw_summary: str = Field(alias="rawSummary")
    model_name: str | None = Field(default="HumanOmni0.5", alias="modelName")


class ActionObservation(ApiModel):
    observation_id: str | None = Field(default=None, alias="observationId")
    type: str
    label: str | None = None
    description: str
    start_seconds: float | None = Field(default=None, alias="startSeconds")
    end_seconds: float | None = Field(default=None, alias="endSeconds")
    time_range: str | None = Field(default=None, alias="timeRange")
    confidence: float | None = Field(default=None, ge=0, le=1)
    source: str | None = "frontend"
    evidence: dict[str, Any] | list[Any] | str | None = None


class AsrPayload(ApiModel):
    status: str = "not_connected"
    provider: str | None = None
    model: str | None = None
    language: str | None = None
    text: str = ""
    segments: list[dict[str, Any]] = Field(default_factory=list)
    words: list[dict[str, Any]] = Field(default_factory=list)


class MultimodalAssessment(ApiModel):
    summary: str
    risk_hints: list[str] = Field(default_factory=list, alias="riskHints")
    evidence: list[str] = Field(default_factory=list)
    limitations: list[str] = Field(default_factory=list)


class FollowupQuestion(ApiModel):
    priority: int
    question: str
    reason: str
    operator_tip: str = Field(alias="operatorTip")
    focus_area: str = Field(alias="focusArea")


class FollowupGuidanceRequest(ApiModel):
    session_id: str = Field(alias="sessionId")
    round_no: int = Field(default=2, ge=2, alias="roundNo")
    passenger_profile: PassengerProfile = Field(alias="passengerProfile")
    trip_profile: TripProfile = Field(default_factory=TripProfile, alias="tripProfile")
    qa_history: list[QuestionAnswer] = Field(default_factory=list, alias="qaHistory")
    humanomni_windows: list[HumanOmniWindowSummary] = Field(default_factory=list, alias="humanOmniWindows")
    action_observations: list[ActionObservation] = Field(default_factory=list, alias="actionObservations")
    asr: AsrPayload | None = None
    constraints: OutputConstraints = Field(default_factory=lambda: OutputConstraints(questionCount=3))


class FollowupGuidanceResponse(ApiModel):
    session_id: str = Field(alias="sessionId")
    round_no: int = Field(alias="roundNo")
    llm: LlmRuntimeInfo
    multimodal_assessment: MultimodalAssessment = Field(alias="multimodalAssessment")
    followup_guidance: list[FollowupQuestion] = Field(alias="followupGuidance")
    operator_note: str = Field(alias="operatorNote")
    warnings: list[str] = Field(default_factory=list)

