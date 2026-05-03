from __future__ import annotations

from schemas.inquiry import (
    FirstRoundStrategyRequest,
    FirstRoundStrategyResponse,
    GeneratedQuestion,
    InquiryStrategy,
    LlmRuntimeInfo,
    RiskAssessment,
)


DEFAULT_QUESTION_BANK = [
    (
        "出境目的",
        "请您简要说明这次出境的主要目的，以及到达后最先要处理的事情。",
        "建立旅客对出境目的的基础叙述，用于后续和行程、材料、答复进行一致性比对。",
        ["出境目的", "到达后安排", "叙述完整性"],
    ),
    (
        "行程安排",
        "请您说明这次预计停留几天，主要会去哪些城市或地点。",
        "核验停留周期和行程细节是否与申报目的相匹配。",
        ["停留天数", "具体地点", "行程合理性"],
    ),
    (
        "住宿安排",
        "您在境外期间主要住在哪里，住宿是自己预订还是由他人安排？",
        "核验住宿来源、联系人和行程真实性。",
        ["住宿地址", "预订方式", "联系人"],
    ),
    (
        "资金来源",
        "这次行程的机票、住宿和日常费用主要由谁承担？",
        "核验资金来源是否与职业、收入和同行关系一致。",
        ["费用承担人", "支付方式", "收入匹配度"],
    ),
    (
        "返程计划",
        "请您说明目前的返程安排，是否已经确定返程时间或返程票。",
        "核验是否存在返程安排不清晰或停留计划不稳定的情况。",
        ["返程时间", "返程票", "后续安排"],
    ),
    (
        "同行关系",
        "这次是否有同行人员，或境外是否有人接待您？",
        "核验同行关系、接待关系和申报信息是否一致。",
        ["同行人员", "接待人", "关系说明"],
    ),
]


def build_mock_first_round_strategy(
    request: FirstRoundStrategyRequest,
    runtime: dict[str, str],
    prompt: str,
) -> FirstRoundStrategyResponse:
    reasons = _collect_risk_reasons(request)
    level = _risk_level(reasons)
    focus_areas = _focus_areas(reasons)
    question_count = request.constraints.question_count
    questions = [
        GeneratedQuestion(
            questionId=f"q{index}",
            priority=index,
            question=question,
            purpose=purpose,
            expectedEvidence=evidence,
        )
        for index, (_area, question, purpose, evidence) in enumerate(DEFAULT_QUESTION_BANK[:question_count], start=1)
    ]

    if reasons:
        summary = "基础画像中存在需要进一步核验的要素：" + "；".join(reasons) + "。"
    else:
        summary = "当前基础画像未显示明显异常，但仍需通过首轮开放式问题建立完整叙述。"

    return FirstRoundStrategyResponse(
        sessionId=request.session_id,
        llm=LlmRuntimeInfo(provider=runtime["provider"], model=runtime["model"]),
        riskAssessment=RiskAssessment(level=level, summary=summary, reasons=reasons),
        strategy=InquiryStrategy(
            goal="初步试探旅客真实出境目的，发现画像、行程和答复之间可能存在的前后不一致点。",
            focusAreas=focus_areas,
        ),
        questions=questions,
        operatorNote=(
            "本轮建议以开放式、事实核验型问题为主，语气保持中性专业；"
            "系统输出用于辅助工作人员形成问询思路，不直接构成风险结论。"
        ),
    )


def _collect_risk_reasons(request: FirstRoundStrategyRequest) -> list[str]:
    reasons: list[str] = []
    profile = request.passenger_profile
    trip = request.trip_profile

    if request.known_facts:
        reasons.extend(request.known_facts[:4])
    if trip.stay_days and trip.stay_days >= 15:
        reasons.append("申报停留时间较长，需要核验具体行程和返程安排")
    if trip.ticket_type and "单程" in trip.ticket_type:
        reasons.append("票务信息显示为单程或返程安排不明确")
    if trip.return_ticket_status and any(token in trip.return_ticket_status for token in ["无", "未", "不明确"]):
        reasons.append("返程票状态不明确")
    if profile.monthly_income and any(token in profile.monthly_income for token in ["不稳定", "无", "较低"]):
        reasons.append("收入或资金能力需要与行程费用交叉核验")
    if not trip.purpose_declared:
        reasons.append("出境目的字段缺失，需要首轮建立基础叙述")

    return _dedupe(reasons)


def _risk_level(reasons: list[str]) -> str:
    if len(reasons) >= 4:
        return "high"
    if reasons:
        return "medium"
    return "low"


def _focus_areas(reasons: list[str]) -> list[str]:
    areas = ["出境目的", "行程安排", "资金来源", "返程计划"]
    text = " ".join(reasons)
    if any(token in text for token in ["住宿", "接待", "地址"]):
        areas.append("住宿与接待关系")
    if any(token in text for token in ["同行", "朋友", "垫付"]):
        areas.append("同行或资助关系")
    return _dedupe(areas)


def _dedupe(values: list[str]) -> list[str]:
    result: list[str] = []
    for value in values:
        cleaned = value.strip()
        if cleaned and cleaned not in result:
            result.append(cleaned)
    return result

