from __future__ import annotations

from schemas.inquiry import (
    FollowupGuidanceRequest,
    FollowupGuidanceResponse,
    FollowupQuestion,
    LlmRuntimeInfo,
    MultimodalAssessment,
)


FOLLOWUP_BANK = [
    (
        "行程细节",
        "您刚才提到的行程安排能否再具体说明一下，例如每天大致去哪里、由谁安排？",
        "补齐行程细节，核验申报目的和实际安排是否一致。",
    ),
    (
        "资金来源",
        "这次行程费用的具体支付方式是什么，付款时间和付款人是否方便说明？",
        "核验资金来源、支付方式和旅客画像之间是否匹配。",
    ),
    (
        "住宿与联系人",
        "您到达后住处的地址或预订信息是否已经确定，境外是否有人接待？",
        "核验住宿安排和境外联系人信息是否清晰。",
    ),
    (
        "返程计划",
        "您预计什么时候返回，目前返程票或后续安排是否已经确定？",
        "核验停留边界和返程意愿是否明确。",
    ),
]


def build_mock_followup_guidance(
    request: FollowupGuidanceRequest,
    runtime: dict[str, str],
    prompt: str,
) -> FollowupGuidanceResponse:
    humanomni_evidence = _humanomni_evidence(request)
    action_evidence = _action_evidence(request)
    answer_evidence = _answer_evidence(request)
    risk_hints = _risk_hints(request, action_evidence, humanomni_evidence)
    question_count = request.constraints.question_count

    evidence = answer_evidence + humanomni_evidence + action_evidence
    if evidence:
        summary = "已结合问答历史、HumanOmni 摘要和外部动作采样形成后续追问参考。"
    else:
        summary = "当前缺少可用的问答、HumanOmni 或动作采样信息，建议先补齐基础答复。"

    followups = [
        FollowupQuestion(
            priority=index,
            question=question,
            reason=reason,
            operatorTip="保持中性核验，不直接使用表情或动作对旅客作出定性判断。",
            focusArea=focus_area,
        )
        for index, (focus_area, question, reason) in enumerate(FOLLOWUP_BANK[:question_count], start=1)
    ]

    return FollowupGuidanceResponse(
        sessionId=request.session_id,
        roundNo=request.round_no,
        llm=LlmRuntimeInfo(provider=runtime["provider"], model=runtime["model"]),
        multimodalAssessment=MultimodalAssessment(
            summary=summary,
            riskHints=risk_hints,
            evidence=evidence[:12],
            limitations=[
                "HumanOmni 当前仅作为音视频窗口摘要来源，不输出结构化动作识别结论。",
                "动作、微表情、视线等结构化数据来自外部采样 JSON，需要结合上下文复核。",
                "ASR 文本为可选输入；未接入时不能进行完整语义一致性判断。",
            ],
        ),
        followupGuidance=followups,
        operatorNote=(
            "建议优先围绕画像与答复中缺失或不一致的事实点继续追问；"
            "动作和情绪线索只能作为选择追问方向的参考。"
        ),
        warnings=[
            "多模态观察结果不单独构成风险结论。",
            "最终处置应由工作人员结合证件、行程材料和现场问询情况确认。",
        ],
    )


def _answer_evidence(request: FollowupGuidanceRequest) -> list[str]:
    if not request.qa_history:
        return []

    latest = request.qa_history[-1]
    return [f"最近一轮答复：{latest.answer_text}"]


def _humanomni_evidence(request: FollowupGuidanceRequest) -> list[str]:
    evidence: list[str] = []
    for window in request.humanomni_windows[:4]:
        time_range = _time_range(window.start_seconds, window.end_seconds)
        prefix = f"HumanOmni 窗口 {time_range}" if time_range else "HumanOmni 窗口"
        evidence.append(f"{prefix} 摘要：{window.raw_summary}")
    return evidence


def _action_evidence(request: FollowupGuidanceRequest) -> list[str]:
    evidence: list[str] = []
    for observation in request.action_observations[:6]:
        label = observation.label or observation.type
        time_range = observation.time_range or _time_range(observation.start_seconds, observation.end_seconds)
        confidence = f"，置信度 {observation.confidence:.2f}" if observation.confidence is not None else ""
        if time_range:
            evidence.append(f"动作采样 {time_range}：{label}，{observation.description}{confidence}")
        else:
            evidence.append(f"动作采样：{label}，{observation.description}{confidence}")
    return evidence


def _risk_hints(
    request: FollowupGuidanceRequest,
    action_evidence: list[str],
    humanomni_evidence: list[str],
) -> list[str]:
    hints: list[str] = []
    latest_answer = request.qa_history[-1].answer_text if request.qa_history else ""
    trip = request.trip_profile

    if trip.stay_days and trip.stay_days >= 15:
        hints.append("停留周期较长，建议继续核验具体行程和返程安排")
    if any(token in latest_answer for token in ["朋友", "帮", "垫付", "借"]):
        hints.append("答复涉及他人资助或协助，建议核验资助人身份、关系和支付方式")
    if any(token in latest_answer for token in ["不确定", "可能", "大概", "还没"]):
        hints.append("答复中存在不确定表述，建议追问具体时间、地点或证明材料")
    if action_evidence:
        hints.append("外部动作采样提供了候选异常线索，建议作为追问方向参考")
    if humanomni_evidence:
        hints.append("HumanOmni 已提供窗口级音视频摘要，可与答复文本交叉查看")

    if not hints:
        hints.append("当前未形成明显异常提示，建议围绕事实完整性继续核验")
    return hints


def _time_range(start: float | None, end: float | None) -> str:
    if start is None or end is None:
        return ""
    return f"{start:.2f}-{end:.2f}s"

