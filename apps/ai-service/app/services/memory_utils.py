from __future__ import annotations

from schemas.inquiry import MemoryContext, MemoryReference, MemoryUpdate


def collect_memory_references(memory_context: MemoryContext | None, limit: int = 6) -> list[MemoryReference]:
    if memory_context is None:
        return []

    references: list[MemoryReference] = []
    for item in (
        memory_context.session_memories
        + memory_context.passenger_memories
        + memory_context.rule_memories
    ):
        references.append(
            MemoryReference(
                scopeType=item.scope_type,
                scopeId=item.scope_id,
                memoryType=item.memory_type,
                title=item.title,
                content=item.content,
                source=item.source,
            )
        )
    return references[:limit]


def memory_reference_text(memory_context: MemoryContext | None) -> list[str]:
    return [
        f"{reference.title}：{reference.content}"
        for reference in collect_memory_references(memory_context, limit=4)
    ]


def build_session_memory_update(
    *,
    session_id: str,
    memory_type: str,
    title: str,
    content: str,
    confidence: float = 0.74,
) -> MemoryUpdate:
    return MemoryUpdate(
        scopeType="session",
        scopeId=session_id,
        memoryType=memory_type,
        title=title,
        content=content,
        evidence={"source": "ai-service"},
        confidence=confidence,
        source="ai-service",
    )


def build_passenger_memory_update(
    *,
    passenger_id: str | None,
    memory_type: str,
    title: str,
    content: str,
    confidence: float = 0.68,
) -> MemoryUpdate | None:
    if not passenger_id:
        return None
    return MemoryUpdate(
        scopeType="passenger",
        scopeId=passenger_id,
        memoryType=memory_type,
        title=title,
        content=content,
        evidence={"source": "ai-service"},
        confidence=confidence,
        source="ai-service",
    )


def build_first_round_memory_updates(
    *,
    session_id: str,
    passenger_id: str | None,
    summary: str,
    focus_areas: list[str],
) -> list[MemoryUpdate]:
    updates = [
        build_session_memory_update(
            session_id=session_id,
            memory_type="fact",
            title="首轮策略已生成",
            content=summary[:180] or "系统已生成首轮问询策略。",
            confidence=0.72,
        )
    ]
    passenger_update = build_passenger_memory_update(
        passenger_id=passenger_id,
        memory_type="gap",
        title="首轮需核验要点",
        content="；".join(focus_areas[:5]) or "需核验出境目的、行程安排和返程计划。",
        confidence=0.66,
    )
    if passenger_update is not None:
        updates.append(passenger_update)
    return updates


def build_followup_memory_updates(
    *,
    session_id: str,
    passenger_id: str | None,
    round_no: int,
    latest_answer: str,
    risk_hints: list[str],
) -> list[MemoryUpdate]:
    updates = [
        build_session_memory_update(
            session_id=session_id,
            memory_type="fact" if latest_answer else "gap",
            title=f"第 {max(1, round_no - 1)} 轮答复摘要",
            content=(
                f"最近一轮答复记录为：{latest_answer[:120]}"
                if latest_answer
                else "当前未接入 ASR，答复摘要将在接入实时转写或人工记录后生成。"
            ),
            confidence=0.78 if latest_answer else 0.62,
        )
    ]
    if risk_hints:
        passenger_update = build_passenger_memory_update(
            passenger_id=passenger_id,
            memory_type="gap",
            title="后续待核验方向",
            content="；".join(risk_hints[:3]),
            confidence=0.68,
        )
        if passenger_update is not None:
            updates.append(passenger_update)
    return updates
