from __future__ import annotations

from schemas.inquiry import (
    FirstRoundStrategyRequest,
    FirstRoundStrategyResponse,
    GeneratedQuestion,
    InquiryStrategy,
    LlmRuntimeInfo,
    RiskAssessment,
)
from services.memory_utils import (
    build_first_round_memory_updates,
    collect_memory_references,
    memory_reference_text,
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

RISK_CASE_LABELS = {
    "cross_border_gambling": "跨境赌博",
    "cross_border_fraud": "跨境电诈",
    "illegal_work": "非法务工",
    "suspicious_purpose": "出境目的存疑",
    "unknown": "出境目的存疑",
}

RISK_CASE_QUESTION_BANKS = {
    "cross_border_gambling": [
        (
            "出境目的-境外活动安排",
            "请您按到达后的时间顺序说明第一天和第二天的具体安排，包括会去哪些地点、由谁安排。",
            "通过时间线核验申报目的、境外活动安排和可能的组织人之间是否一致。",
            ["到达后安排", "活动地点", "安排人或联系人"],
        ),
        (
            "资金来源-费用承担",
            "这次机票、住宿和境外活动费用分别由谁承担，支付方式和时间大致是什么？",
            "核验资金来源、代付或借贷关系是否与画像和行程相匹配。",
            ["付款记录", "费用承担人", "借贷或代付说明"],
        ),
        (
            "同行关系-接待安排",
            "这次是否有人同行或在境外接待您，对方和您的关系以及负责哪些安排？",
            "核验同行、接待或统一安排线索，不直接定性具体活动。",
            ["同行人", "接待人", "关系说明"],
        ),
        (
            "住宿与返程边界",
            "请说明住宿预订来源、预计停留时间和返程安排是否已经确认。",
            "核验停留边界和住宿链条是否清晰。",
            ["酒店订单", "停留天数", "返程票"],
        ),
    ],
    "cross_border_fraud": [
        (
            "邀约来源-境外联系人",
            "请您说明这次出境是谁邀请或联系的，对方通过什么渠道联系您，到达后由谁接应。",
            "核验招聘、邀约或接待链条是否清晰可信。",
            ["聊天记录", "联系人身份", "接送安排"],
        ),
        (
            "工作内容-材料证明",
            "如果到境外后有培训、商务或工作相关安排，请说明具体内容、地点和证明材料来源。",
            "核验境外安排真实性，区分旅游、商务、培训或工作等目的。",
            ["邀请函", "活动安排", "地点证明"],
        ),
        (
            "设备携带-账号用途",
            "这次是否携带多部手机、银行卡、电脑或其他设备，各自用途是什么？",
            "核验设备、账号和银行卡用途是否与申报目的匹配。",
            ["设备清单", "银行卡用途", "账号用途说明"],
        ),
        (
            "住宿与接送安排",
            "您到达后的住宿、交通和日常安排由谁负责，是否已有订单或联系人信息？",
            "核验住宿接送链条和境外联系人边界。",
            ["住宿订单", "接送人", "联系人信息"],
        ),
    ],
    "illegal_work": [
        (
            "签证资格-停留目的",
            "请说明本次签证或通行条件对应的停留目的，以及境外期间每天的大致安排。",
            "核验签证条件、停留目的和实际安排之间是否一致。",
            ["签证类型", "停留目的", "每日安排"],
        ),
        (
            "境外雇主-岗位薪酬",
            "境外是否有单位、中介或个人为您安排固定事项，是否涉及岗位、报酬或食宿承诺？",
            "核验是否存在雇佣、中介或薪酬承诺线索，但不直接定性非法务工。",
            ["雇主或中介", "岗位说明", "薪酬或食宿承诺"],
        ),
        (
            "合同邀请-材料来源",
            "是否有邀请函、合同、培训通知或其他安排材料，材料是谁提供的？",
            "核验境外安排材料的来源和真实性。",
            ["邀请函", "合同", "材料提供人"],
        ),
        (
            "费用承担-返程边界",
            "本次出行费用由谁承担，返程时间是否会受境外安排影响？",
            "核验费用链条和返程边界是否稳定。",
            ["费用承担人", "付款记录", "返程票"],
        ),
    ],
    "suspicious_purpose": DEFAULT_QUESTION_BANK,
    "unknown": DEFAULT_QUESTION_BANK,
}


def build_mock_first_round_strategy(
    request: FirstRoundStrategyRequest,
    runtime: dict[str, str],
    prompt: str,
) -> FirstRoundStrategyResponse:
    memory_references = collect_memory_references(request.memory_context)
    reasons = _collect_risk_reasons(request)
    reasons.extend(memory_reference_text(request.memory_context))
    reasons = _dedupe(reasons)
    level = _risk_level(reasons)
    focus_areas = _focus_areas(reasons)
    question_count = request.constraints.question_count
    question_bank = _question_bank_for_case(request)
    questions = [
        GeneratedQuestion(
            questionId=f"q{index}",
            priority=index,
            question=question,
            purpose=purpose,
            expectedEvidence=evidence,
        )
        for index, (_area, question, purpose, evidence) in enumerate(question_bank[:question_count], start=1)
    ]

    if reasons:
        summary = _summary_prefix(request) + "基础画像中存在需要进一步核验的要素：" + "；".join(reasons) + "。"
    else:
        summary = _summary_prefix(request) + "当前基础画像未显示明显异常，但仍需通过首轮开放式问题建立完整叙述。"

    memory_updates = build_first_round_memory_updates(
        session_id=request.session_id,
        passenger_id=request.passenger_profile.passenger_id,
        summary=summary,
        focus_areas=focus_areas,
    )

    return FirstRoundStrategyResponse(
        sessionId=request.session_id,
        llm=LlmRuntimeInfo(provider=runtime["provider"], model=runtime["model"]),
        riskAssessment=RiskAssessment(level=level, summary=summary, reasons=reasons),
        strategy=InquiryStrategy(
            goal=_strategy_goal(request),
            focusAreas=focus_areas,
        ),
        questions=questions,
        memoryReferences=memory_references,
        memoryUpdates=memory_updates,
        operatorNote=(
            "本轮建议以开放式、事实核验型问题为主，语气保持中性专业；"
            "系统输出用于辅助工作人员形成问询思路，不直接构成风险结论。"
        ),
    )


def _collect_risk_reasons(request: FirstRoundStrategyRequest) -> list[str]:
    reasons: list[str] = []
    profile = request.passenger_profile
    trip = request.trip_profile
    risk_context = request.risk_case_context
    risk_label = _risk_case_label(request)

    if risk_context.source == "watchlist":
        reasons.append(f"名单线索触发：{risk_label}")
    elif risk_context.source == "officer":
        reasons.append(f"工作人员人工判断触发：{risk_label}")
    elif _risk_case_category(request) != "suspicious_purpose":
        reasons.append(f"预设风险方向：{risk_label}")
    if risk_context.reason:
        reasons.append(f"触发原因：{risk_context.reason}")
    if risk_context.risk_tags:
        reasons.extend(risk_context.risk_tags[:3])
    if risk_context.officer_note:
        reasons.append(f"现场备注：{risk_context.officer_note}")

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
    if any(token in text for token in ["跨境赌博", "博彩", "娱乐场", "代付"]):
        areas = ["资金来源-境外活动安排", "同行/组织人关系", "住宿与返程边界", "目的陈述-材料链"]
    elif any(token in text for token in ["跨境电诈", "电诈", "招聘", "设备", "银行卡", "账号"]):
        areas = ["邀约来源-境外联系人", "设备/银行卡用途", "住宿与接送安排", "工作内容真实性"]
    elif any(token in text for token in ["非法务工", "务工", "雇主", "岗位", "薪酬", "合同"]):
        areas = ["工作资质-雇佣关系", "岗位薪酬承诺", "合同/邀请材料", "返程边界"]
    if any(token in text for token in ["住宿", "接待", "地址"]):
        areas.append("住宿与接待关系")
    if any(token in text for token in ["同行", "朋友", "垫付"]):
        areas.append("同行或资助关系")
    return _dedupe(areas)


def _question_bank_for_case(request: FirstRoundStrategyRequest) -> list[tuple[str, str, str, list[str]]]:
    return RISK_CASE_QUESTION_BANKS.get(_risk_case_category(request), DEFAULT_QUESTION_BANK)


def _risk_case_category(request: FirstRoundStrategyRequest) -> str:
    category = (request.risk_case_context.category or "unknown").strip()
    if category in RISK_CASE_QUESTION_BANKS and category != "unknown":
        return category
    return "suspicious_purpose"


def _risk_case_label(request: FirstRoundStrategyRequest) -> str:
    label = (request.risk_case_context.label or "").strip()
    if label:
        return label
    return RISK_CASE_LABELS.get(_risk_case_category(request), "出境目的存疑")


def _summary_prefix(request: FirstRoundStrategyRequest) -> str:
    risk_context = request.risk_case_context
    label = _risk_case_label(request)
    if risk_context.source == "watchlist":
        return f"当前为名单线索触发的{label}方向预评估，不构成最终风险结论。"
    if risk_context.source == "officer":
        return f"当前为工作人员人工判断触发的{label}方向预评估，不构成最终风险结论。"
    return f"当前按{label}方向进行现场辅助预评估，不构成最终风险结论。"


def _strategy_goal(request: FirstRoundStrategyRequest) -> str:
    label = _risk_case_label(request)
    return f"围绕{label}方向初步试探旅客真实出境目的，发现画像、行程、资金、住宿、联系人和返程安排之间可能存在的前后不一致点。"


def _dedupe(values: list[str]) -> list[str]:
    result: list[str] = []
    for value in values:
        cleaned = value.strip()
        if cleaned and cleaned not in result:
            result.append(cleaned)
    return result

