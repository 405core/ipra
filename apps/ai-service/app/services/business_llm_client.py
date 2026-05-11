from __future__ import annotations

import json
import os
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from config import REPO_ROOT, resolve_path
from schemas.inquiry import (
    FirstRoundStrategyRequest,
    FirstRoundStrategyResponse,
    FollowupGuidanceRequest,
    FollowupGuidanceResponse,
    FollowupQuestion,
)
from services.memory_utils import (
    build_first_round_memory_updates,
    build_followup_memory_updates,
    collect_memory_references,
)


PROMPT_DIR = Path(__file__).resolve().parents[1] / "prompts"
DEFAULT_LOCAL_MODEL_PATH = REPO_ROOT / "models" / "business-llm" / "modelscope" / "Qwen2.5-3B-Instruct"
DEFAULT_LOCAL_CACHE_DIR = REPO_ROOT / "models" / "business-llm" / "huggingface"
DEFAULT_LOCAL_MODEL_NAME = "Qwen2.5-3B-Instruct"
_LOCAL_RUNNERS: dict[tuple[str, str, str], "_TransformersLocalRunner"] = {}


@dataclass(frozen=True)
class BusinessLlmSettings:
    provider: str
    model: str
    model_path: Path
    timeout_seconds: int
    max_new_tokens: int
    torch_dtype: str
    device_map: str


def load_business_llm_settings() -> BusinessLlmSettings:
    provider = os.getenv("BUSINESS_LLM_PROVIDER", "transformers_local").strip() or "transformers_local"
    model_path = resolve_path(os.getenv("BUSINESS_LLM_MODEL_PATH"), DEFAULT_LOCAL_MODEL_PATH)
    model_name = os.getenv("BUSINESS_LLM_MODEL", "").strip()
    if not model_name:
        model_name = "mock-business-llm" if provider == "mock" else DEFAULT_LOCAL_MODEL_NAME

    return BusinessLlmSettings(
        provider=provider,
        model=model_name,
        model_path=model_path,
        timeout_seconds=_read_positive_int("BUSINESS_LLM_TIMEOUT_SECONDS", 300),
        max_new_tokens=_read_positive_int("BUSINESS_LLM_MAX_NEW_TOKENS", 768),
        torch_dtype=os.getenv("BUSINESS_LLM_TORCH_DTYPE", "auto").strip() or "auto",
        device_map=os.getenv("BUSINESS_LLM_DEVICE_MAP", "auto").strip() or "auto",
    )


class BusinessLlmError(RuntimeError):
    pass


class BusinessLlmClient:
    def __init__(self, settings: BusinessLlmSettings | None = None) -> None:
        self.settings = settings or load_business_llm_settings()

    @property
    def runtime(self) -> dict[str, str]:
        runtime = {"provider": self.settings.provider, "model": self.settings.model}
        if self.settings.provider == "transformers_local":
            runtime["modelPath"] = str(self.settings.model_path)
        return runtime

    def generate_first_round_strategy(
        self,
        request: FirstRoundStrategyRequest,
        prompt: str,
    ) -> FirstRoundStrategyResponse:
        if self.settings.provider == "mock":
            from services.first_round_strategy import build_mock_first_round_strategy

            return build_mock_first_round_strategy(request, self.runtime, prompt)
        if self.settings.provider == "transformers_local":
            return self._generate_first_round_strategy_with_local_model(request, prompt)
        raise NotImplementedError("Supported BUSINESS_LLM_PROVIDER values: mock, transformers_local.")

    def generate_followup_guidance(
        self,
        request: FollowupGuidanceRequest,
        prompt: str,
    ) -> FollowupGuidanceResponse:
        if self.settings.provider == "mock":
            raise BusinessLlmError(
                "Followup guidance must use the business LLM. "
                "Set BUSINESS_LLM_PROVIDER=transformers_local for /v1/inquiry/followup-guidance."
            )
        if self.settings.provider == "transformers_local":
            return self._generate_followup_guidance_with_local_model(request, prompt)
        raise NotImplementedError("Supported followup BUSINESS_LLM_PROVIDER value: transformers_local.")

    def _generate_first_round_strategy_with_local_model(
        self,
        request: FirstRoundStrategyRequest,
        prompt: str,
    ) -> FirstRoundStrategyResponse:
        content = self._runner().generate_json_text(
            system_prompt=_system_prompt(),
            user_prompt=_first_round_user_prompt(prompt, request),
            max_new_tokens=self.settings.max_new_tokens,
        )
        data = _parse_json_object(content)
        data["sessionId"] = request.session_id
        data["llm"] = self.runtime
        data["memoryReferences"] = [
            reference.model_dump(by_alias=True)
            for reference in collect_memory_references(request.memory_context)
        ]
        data["memoryUpdates"] = [
            update.model_dump(by_alias=True)
            for update in build_first_round_memory_updates(
                session_id=request.session_id,
                passenger_id=request.passenger_profile.passenger_id,
                summary=str(data.get("riskAssessment", {}).get("summary", "")),
                focus_areas=list(data.get("strategy", {}).get("focusAreas", [])),
            )
        ]
        try:
            return FirstRoundStrategyResponse.model_validate(data)
        except Exception as exc:
            raise BusinessLlmError(
                f"transformers_local first-round response does not match schema: {exc}; raw={content}"
            ) from exc

    def _generate_followup_guidance_with_local_model(
        self,
        request: FollowupGuidanceRequest,
        prompt: str,
    ) -> FollowupGuidanceResponse:
        content = self._runner().generate_json_text(
            system_prompt=_system_prompt(),
            user_prompt=_followup_user_prompt(prompt, request),
            max_new_tokens=self.settings.max_new_tokens,
        )
        data = _parse_json_object(content)
        data["sessionId"] = request.session_id
        data["roundNo"] = request.round_no
        data["llm"] = self.runtime
        data["followupGuidance"] = _normalize_followup_guidance_count(
            data.get("followupGuidance"),
            request.constraints.question_count,
        )
        data["followupGuidance"] = _rewrite_repeated_followup_questions(
            data["followupGuidance"],
            request,
        )
        data["followupGuidance"] = _dedupe_followup_questions(
            data["followupGuidance"],
            request,
        )
        risk_hints = data.get("multimodalAssessment", {}).get("riskHints", [])
        latest_answer = request.qa_history[-1].answer_text if request.qa_history else ""
        data["memoryReferences"] = [
            reference.model_dump(by_alias=True)
            for reference in collect_memory_references(request.memory_context)
        ]
        data["memoryUpdates"] = [
            update.model_dump(by_alias=True)
            for update in build_followup_memory_updates(
                session_id=request.session_id,
                passenger_id=request.passenger_profile.passenger_id,
                round_no=request.round_no,
                latest_answer=latest_answer,
                risk_hints=list(risk_hints) if isinstance(risk_hints, list) else [],
            )
        ]
        try:
            return FollowupGuidanceResponse.model_validate(data)
        except Exception as exc:
            raise BusinessLlmError(
                f"transformers_local followup response does not match schema: {exc}; raw={content}"
            ) from exc

    def _runner(self) -> "_TransformersLocalRunner":
        if not self.settings.model_path.is_dir():
            raise BusinessLlmError(f"BUSINESS_LLM_MODEL_PATH does not exist: {self.settings.model_path}")

        key = (
            str(self.settings.model_path),
            self.settings.torch_dtype,
            self.settings.device_map,
        )
        if key not in _LOCAL_RUNNERS:
            _LOCAL_RUNNERS[key] = _TransformersLocalRunner(
                model_path=self.settings.model_path,
                torch_dtype=self.settings.torch_dtype,
                device_map=self.settings.device_map,
            )
        return _LOCAL_RUNNERS[key]


class _TransformersLocalRunner:
    def __init__(self, *, model_path: Path, torch_dtype: str, device_map: str) -> None:
        self.model_path = model_path
        self.torch_dtype = torch_dtype
        self.device_map = device_map
        self._tokenizer = None
        self._model = None

    def generate_json_text(self, *, system_prompt: str, user_prompt: str, max_new_tokens: int) -> str:
        self._ensure_loaded()
        tokenizer = self._tokenizer
        model = self._model
        if tokenizer is None or model is None:
            raise BusinessLlmError("Local Transformers model is not loaded.")

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ]
        text = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
        inputs = tokenizer([text], return_tensors="pt").to(model.device)

        import torch

        with torch.inference_mode():
            generated_ids = model.generate(
                **inputs,
                max_new_tokens=max_new_tokens,
                do_sample=False,
                pad_token_id=tokenizer.eos_token_id,
            )

        output_ids = generated_ids[0][inputs.input_ids.shape[-1] :]
        return tokenizer.decode(output_ids, skip_special_tokens=True).strip()

    def _ensure_loaded(self) -> None:
        if self._tokenizer is not None and self._model is not None:
            return

        DEFAULT_LOCAL_CACHE_DIR.mkdir(parents=True, exist_ok=True)
        os.environ.setdefault("HF_HUB_DISABLE_SYMLINKS_WARNING", "1")

        import torch
        from transformers import AutoModelForCausalLM, AutoTokenizer

        dtype = self._resolve_torch_dtype(torch)
        self._tokenizer = AutoTokenizer.from_pretrained(
            str(self.model_path),
            cache_dir=str(DEFAULT_LOCAL_CACHE_DIR),
            local_files_only=True,
            trust_remote_code=True,
        )
        self._model = AutoModelForCausalLM.from_pretrained(
            str(self.model_path),
            cache_dir=str(DEFAULT_LOCAL_CACHE_DIR),
            torch_dtype=dtype,
            device_map=self.device_map,
            local_files_only=True,
            trust_remote_code=True,
        )
        self._model.generation_config.do_sample = False
        self._model.generation_config.temperature = None
        self._model.generation_config.top_p = None
        self._model.generation_config.top_k = None
        self._model.eval()

    def _resolve_torch_dtype(self, torch_module):
        value = self.torch_dtype.lower()
        if value == "auto":
            return torch_module.float16 if torch_module.cuda.is_available() else torch_module.float32
        if value in {"float16", "fp16"}:
            return torch_module.float16
        if value in {"bfloat16", "bf16"}:
            return torch_module.bfloat16
        if value in {"float32", "fp32"}:
            return torch_module.float32
        raise BusinessLlmError("BUSINESS_LLM_TORCH_DTYPE must be one of: auto, float16, bfloat16, float32")


def load_prompt(name: str) -> str:
    path = PROMPT_DIR / name
    return path.read_text(encoding="utf-8")


def public_runtime(runtime: dict[str, Any]) -> dict[str, str]:
    return {
        "provider": str(runtime.get("provider") or "transformers_local"),
        "model": str(runtime.get("model") or DEFAULT_LOCAL_MODEL_NAME),
    }


def _read_positive_int(name: str, fallback: int) -> int:
    raw_value = os.getenv(name, str(fallback)).strip() or str(fallback)
    try:
        value = int(raw_value)
    except ValueError as exc:
        raise ValueError(f"{name} must be an integer") from exc
    if value <= 0:
        raise ValueError(f"{name} must be greater than 0")
    return value


def _system_prompt() -> str:
    return (
        "你是智能旅客风险评估与辅助问询系统中的业务 LLM。"
        "你必须只输出一个严格 JSON 对象，不能输出 Markdown、解释文字或代码块。"
        "所有追问话术必须中性、专业、非指控。"
        "动作、情绪和多模态观察只能作为追问参考，不能单独构成风险结论。"
    )


def _first_round_user_prompt(prompt: str, request: FirstRoundStrategyRequest) -> str:
    return (
        f"{prompt}\n\n"
        "请根据输入生成首轮问询策略。只返回 JSON 对象。\n"
        "首轮必须先体现预评估与逻辑研判，再输出能试探真实出境目的、暴露前后不一致或隐瞒意图的中性问题。\n"
        "问题应采用情境化提问、时间线回溯、细节补全、对照确认或开放式复述，不得虚构证据或诱导特定答案。\n"
        "memoryContext 中的记忆只能作为追问上下文和事实核验线索，不得单独构成风险结论。\n"
        "不要输出 llm、memoryReferences 或 memoryUpdates，这些字段由服务端补齐。\n"
        "JSON 结构必须为：\n"
        "{\n"
        '  "sessionId": "...",\n'
        '  "riskAssessment": {"level": "low|medium|high|unknown", "summary": "...", "reasons": ["..."]},\n'
        '  "strategy": {"goal": "...", "focusAreas": ["..."]},\n'
        '  "questions": [{"questionId": "q1", "priority": 1, "question": "...", "purpose": "...", "expectedEvidence": ["..."]}],\n'
        '  "operatorNote": "..."\n'
        "}\n\n"
        f"输入 JSON：\n{_to_json(request.model_dump(by_alias=True))}"
    )


def _followup_user_prompt(prompt: str, request: FollowupGuidanceRequest) -> str:
    question_count = request.constraints.question_count
    return (
        f"{prompt}\n\n"
        "请根据输入生成后续追问指引。只返回 JSON 对象。\n"
        "必须融合基础画像、问答历史、HumanOmni 音视频摘要、动作采样 JSON 与可选 ASR 文本，给出语义线索和视频/动作线索共同支持的异常提示。\n"
        "如果 ASR 缺失或视频窗口不足，必须在 limitations 或 warnings 中说明证据限制。\n"
        "生成追问前先判断 qaHistory 中每个主题是否已明确回答；已明确回答且没有矛盾的主题不得原样重复提问，只能围绕具体矛盾、证据缺口或语义不清进行更窄澄清。\n"
        f"followupGuidance 必须恰好包含 {question_count} 条追问建议，priority 从 1 到 {question_count}，不要少于或多于该数量。\n"
        "memoryContext 中的记忆只能作为追问上下文和事实核验线索，不得单独构成风险结论。\n"
        "不要输出 llm、memoryReferences 或 memoryUpdates，这些字段由服务端补齐。\n"
        "JSON 结构必须为：\n"
        "{\n"
        '  "sessionId": "...",\n'
        '  "roundNo": 2,\n'
        '  "multimodalAssessment": {"summary": "...", "riskHints": ["..."], "evidence": ["..."], "limitations": ["..."]},\n'
        '  "followupGuidance": [{"priority": 1, "question": "...", "reason": "...", "operatorTip": "...", "focusArea": "..."}],\n'
        '  "operatorNote": "...",\n'
        '  "warnings": ["..."]\n'
        "}\n\n"
        f"输入 JSON：\n{_to_json(request.model_dump(by_alias=True))}"
    )


def _normalize_followup_guidance_count(value: Any, question_count: int) -> list[dict[str, Any]]:
    items = value if isinstance(value, list) else []
    normalized: list[dict[str, Any]] = []
    for item in items:
        if isinstance(item, dict):
            normalized.append(dict(item))

    fallback_bank = [
        {
            "question": "请您进一步说明这次出境的具体行程安排，包括主要地点和时间顺序。",
            "reason": "补充行程细节，核验申报目的与实际安排是否一致。",
            "operatorTip": "保持中性核验，鼓励旅客按时间顺序说明。",
            "focusArea": "行程细节",
        },
        {
            "question": "请问这次行程费用的具体来源和支付方式是什么？",
            "reason": "核验资金来源、支付方式与旅客基础画像是否匹配。",
            "operatorTip": "围绕事实核验，不直接质疑资金真实性。",
            "focusArea": "资金来源",
        },
        {
            "question": "您到达后住宿和联系人是否已经确定，是否方便说明具体安排？",
            "reason": "核验住宿安排、境外联系人和停留计划是否清晰。",
            "operatorTip": "如旅客回答不确定，可继续追问预订凭证或联系人关系。",
            "focusArea": "住宿与联系人",
        },
        {
            "question": "请问目前返程时间或返程票是否已经确定？",
            "reason": "核验停留边界和返程计划是否明确。",
            "operatorTip": "不要直接推定逾期停留，只确认现有安排。",
            "focusArea": "返程计划",
        },
    ]

    while len(normalized) < question_count:
        fallback = fallback_bank[len(normalized) % len(fallback_bank)]
        normalized.append(dict(fallback))

    result = normalized[:question_count]
    for index, item in enumerate(result, start=1):
        item["priority"] = index
        item.setdefault("question", fallback_bank[(index - 1) % len(fallback_bank)]["question"])
        item.setdefault("reason", fallback_bank[(index - 1) % len(fallback_bank)]["reason"])
        item.setdefault("operatorTip", fallback_bank[(index - 1) % len(fallback_bank)]["operatorTip"])
        item.setdefault("focusArea", fallback_bank[(index - 1) % len(fallback_bank)]["focusArea"])

    return [FollowupQuestion.model_validate(item).model_dump(by_alias=True) for item in result]


def _rewrite_repeated_followup_questions(
    questions: list[dict[str, Any]],
    request: FollowupGuidanceRequest,
) -> list[dict[str, Any]]:
    latest_answer = request.qa_history[-1].answer_text if request.qa_history else ""
    if not latest_answer:
        return questions

    answered_topics = _answered_topics(latest_answer)
    if not answered_topics:
        return questions

    used_focus_areas = {str(item.get("focusArea") or "") for item in questions}
    rewritten: list[dict[str, Any]] = []
    for item in questions:
        next_item = dict(item)
        topic = _repeated_topic(next_item, answered_topics)
        if topic:
            replacement = _replacement_followup(topic, latest_answer, used_focus_areas)
            used_focus_areas.add(replacement["focusArea"])
            next_item.update(replacement)
        rewritten.append(next_item)

    for index, item in enumerate(rewritten, start=1):
        item["priority"] = index
    return [FollowupQuestion.model_validate(item).model_dump(by_alias=True) for item in rewritten]


def _dedupe_followup_questions(
    questions: list[dict[str, Any]],
    request: FollowupGuidanceRequest,
) -> list[dict[str, Any]]:
    expected_count = request.constraints.question_count
    latest_answer = request.qa_history[-1].answer_text if request.qa_history else ""
    answered_topics = _answered_topics(latest_answer)
    used_questions: set[str] = set()
    used_focus_areas: set[str] = set()
    result: list[dict[str, Any]] = []

    for item in questions:
        question_key = _question_dedupe_key(str(item.get("question") or ""))
        focus_area = str(item.get("focusArea") or "")
        if not question_key or question_key in used_questions:
            replacement = _next_unique_followup(
                used_questions,
                used_focus_areas,
                answered_topics,
            )
            result.append(replacement)
            used_questions.add(_question_dedupe_key(replacement["question"]))
            used_focus_areas.add(replacement["focusArea"])
            continue

        next_item = dict(item)
        result.append(next_item)
        used_questions.add(question_key)
        if focus_area:
            used_focus_areas.add(focus_area)

    while len(result) < expected_count:
        replacement = _next_unique_followup(
            used_questions,
            used_focus_areas,
            answered_topics,
        )
        result.append(replacement)
        used_questions.add(_question_dedupe_key(replacement["question"]))
        used_focus_areas.add(replacement["focusArea"])

    trimmed = result[:expected_count]
    for index, item in enumerate(trimmed, start=1):
        item["priority"] = index
    return [FollowupQuestion.model_validate(item).model_dump(by_alias=True) for item in trimmed]


def _question_dedupe_key(question: str) -> str:
    normalized = _normalize_chinese_text(question)
    return re.sub(r"[？?。！!，,；;：:、\"'“”‘’（）()]", "", normalized)


def _next_unique_followup(
    used_questions: set[str],
    used_focus_areas: set[str],
    answered_topics: set[str],
) -> dict[str, str]:
    for candidate in _followup_replacement_bank(answered_topics):
        key = _question_dedupe_key(candidate["question"])
        if key not in used_questions and candidate["focusArea"] not in used_focus_areas:
            return dict(candidate)

    for candidate in _followup_replacement_bank(answered_topics):
        key = _question_dedupe_key(candidate["question"])
        if key not in used_questions:
            return dict(candidate)

    fallback_index = len(used_questions) + 1
    return {
        "question": f"请您补充说明上一轮回答中仍未能提供材料佐证的第 {fallback_index} 个关键细节。",
        "reason": "避免重复提问，改为补齐上一轮答复中的证据缺口。",
        "operatorTip": "请工作人员结合现场材料选择具体细节继续核验。",
        "focusArea": f"证据缺口补充 {fallback_index}",
    }


def _followup_replacement_bank(answered_topics: set[str]) -> list[dict[str, str]]:
    bank: list[dict[str, str]] = []
    topic_order = ["purpose", "companions", "itinerary", "accommodation", "funding", "return"]
    for topic in topic_order:
        if topic in answered_topics:
            bank.append(_replacement_followup(topic, "", {f"{topic}-seed"}))

    bank.extend(
        [
            {
                "question": "请您按抵达后的时间顺序说明第一天的具体安排、地点和联系人。",
                "reason": "补齐行程时间线，核验出行目的与实际安排是否一致。",
                "operatorTip": "让旅客按时间顺序复述，减少笼统回答。",
                "focusArea": "行程时间线",
            },
            {
                "question": "您刚才提到的安排中，哪些已经确认，哪些还需要对方进一步确认？",
                "reason": "区分已确认事实和待确认安排，定位后续核验证据。",
                "operatorTip": "分别记录已确认和未确认事项。",
                "focusArea": "确认状态核验",
            },
            {
                "question": "是否方便说明本次行程中可以现场核验的材料，包括订单、联系人或付款记录？",
                "reason": "将口头陈述转为可核验证据，降低重复追问。",
                "operatorTip": "不要求旅客立即出示全部材料，先确认材料类型和来源。",
                "focusArea": "材料核验",
            },
        ]
    )
    return bank


def _answered_topics(answer_text: str) -> set[str]:
    normalized = _normalize_chinese_text(answer_text)
    topics: set[str] = set()
    if any(token in normalized for token in ["赌博", "赌场", "博彩", "处境", "出境", "旅游", "读博", "留学", "商务"]):
        topics.add("purpose")
    if any(
        token in normalized
        for token in ["同行", "一个人", "没有其他", "没有同行", "没人", "自己", "独自", "老婆", "妻子", "丈夫", "孩子", "家人", "父母", "女儿", "儿子"]
    ):
        topics.add("companions")
    if any(token in normalized for token in ["行程安排", "首先", "然后", "再去", "到达后", "景点", "放行李", "时间顺序"]):
        topics.add("itinerary")
    if any(token in normalized for token in ["酒店", "住宿", "住", "入住", "社区", "地址"]):
        topics.add("accommodation")
    if any(token in normalized for token in ["钱", "费用", "付款", "支付", "垫付", "承担", "资金"]):
        topics.add("funding")
    if any(token in normalized for token in ["返程", "回来", "回国", "机票", "回程"]):
        topics.add("return")
    return topics


def _repeated_topic(item: dict[str, Any], answered_topics: set[str]) -> str | None:
    question = _normalize_chinese_text(str(item.get("question") or ""))
    focus_area = _normalize_chinese_text(str(item.get("focusArea") or ""))
    combined = f"{focus_area} {question}"

    if "purpose" in answered_topics and any(token in combined for token in ["真实目的", "出境目的", "主要目的", "真实出行"]):
        if any(token in question for token in ["真实吗", "是不是真", "是否真实", "真实的出行目的吗"]):
            return "purpose"

    if "companions" in answered_topics and any(token in combined for token in ["同行", "同行人员", "联系方式"]):
        if any(token in question for token in ["是否", "有没有", "是否有", "提供更多", "提供一些", "具体信息", "联系方式", "一起"]):
            return "companions"

    if "itinerary" in answered_topics and any(token in combined for token in ["行程", "路线", "时间线", "主要地点", "地点和时间"]):
        if any(token in question for token in ["是否", "有没有", "提供更多", "提供一些", "具体信息", "具体安排", "行程安排", "时间顺序"]):
            return "itinerary"

    if "accommodation" in answered_topics and any(token in combined for token in ["住宿", "住处", "酒店", "入住"]):
        if any(token in question for token in ["是否", "有没有", "是否已经", "住在哪里", "具体安排", "具体信息", "提供一些"]):
            return "accommodation"

    if "funding" in answered_topics and any(token in combined for token in ["资金", "费用", "付款", "支付"]):
        if any(token in question for token in ["来源", "谁", "是否", "具体来源"]):
            return "funding"

    if "return" in answered_topics and any(token in combined for token in ["返程", "回程", "回国"]):
        if any(token in question for token in ["是否", "有没有", "是否已经", "什么时候"]):
            return "return"

    return None


def _replacement_followup(
    topic: str,
    latest_answer: str,
    used_focus_areas: set[str],
) -> dict[str, str]:
    replacements = {
        "purpose": {
            "question": "我确认一下，您刚才提到的出行目的请按时间顺序说明：谁安排、到达后第一件事是什么、有哪些材料可以对应？",
            "reason": "旅客已说明出行目的，不再重复询问真实性，改为核验目的陈述的时间线和可验证材料。",
            "operatorTip": "先复述旅客原话再请其补充细节；如 ASR 可能误识别“读博/赌博”等词，应先核对原意。",
            "focusArea": "目的细节核验",
        },
        "companions": {
            "question": "您刚才已说明同行情况，请补充这次行程中是否有境外接待人或联络人，以及对方负责的具体事项。",
            "reason": "旅客已回答同行主题，不再泛问是否有同行，改为核验接待或联络安排的边界。",
            "operatorTip": "避免重复问“是否有同行”，重点记录联系人身份、关系和负责事项。",
            "focusArea": "联系人核验",
        },
        "itinerary": {
            "question": "您刚才已说明大致行程，请补充各地点的预计日期、停留时长，以及哪些安排已有订单或联系人可以核验。",
            "reason": "旅客已回答行程主题，不再重复泛问行程安排，改为核验时间线、地点边界和可验证材料。",
            "operatorTip": "先承接旅客原有时间顺序，再逐项核对地点、日期、停留时长和材料来源。",
            "focusArea": "行程细节核验",
        },
        "accommodation": {
            "question": "您刚才提到住宿安排，请补充酒店名称、入住日期、预订人或订单凭证来源。",
            "reason": "旅客已回答住宿主题，不再重复询问住在哪里，改为核验住宿凭证和预订链条。",
            "operatorTip": "请旅客提供可核验名称或凭证；没有凭证时记录原因。",
            "focusArea": "住宿凭证核验",
        },
        "funding": {
            "question": "您刚才提到费用安排，请补充付款人、付款时间、支付方式以及是否有对应记录。",
            "reason": "旅客已回答资金主题，不再泛问资金来源，改为核验付款链条和凭证缺口。",
            "operatorTip": "围绕付款事实核验，不直接质疑资金真实性。",
            "focusArea": "付款链条核验",
        },
        "return": {
            "question": "您刚才提到返程安排，请补充返程日期、订票状态或尚未确定的具体原因。",
            "reason": "旅客已回答返程主题，不再重复询问是否返程，改为核验返程边界和未确定原因。",
            "operatorTip": "区分已订票、计划订票和暂未确定三种状态。",
            "focusArea": "返程边界核验",
        },
    }
    replacement = dict(replacements[topic])
    if replacement["focusArea"] in used_focus_areas:
        replacement["focusArea"] = f"{replacement['focusArea']}（补充）"
    return replacement


def _normalize_chinese_text(value: str) -> str:
    return re.sub(r"\s+", "", value).lower()


def _to_json(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, indent=2)


def _parse_json_object(content: str) -> dict[str, Any]:
    cleaned = re.sub(r"<think>.*?</think>", "", content, flags=re.DOTALL | re.IGNORECASE).strip()
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned, flags=re.IGNORECASE)
        cleaned = re.sub(r"\s*```$", "", cleaned)

    try:
        parsed = json.loads(cleaned)
    except json.JSONDecodeError:
        parsed = json.loads(_extract_first_json_object(cleaned))

    if not isinstance(parsed, dict):
        raise BusinessLlmError("Business LLM response root must be a JSON object.")
    return parsed


def _extract_first_json_object(text: str) -> str:
    start = text.find("{")
    if start < 0:
        raise BusinessLlmError(f"Business LLM response does not contain a JSON object: {text}")

    depth = 0
    in_string = False
    escape = False
    for index in range(start, len(text)):
        char = text[index]
        if in_string:
            if escape:
                escape = False
            elif char == "\\":
                escape = True
            elif char == '"':
                in_string = False
            continue

        if char == '"':
            in_string = True
        elif char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0:
                return text[start : index + 1]

    raise BusinessLlmError(f"Business LLM response JSON object is incomplete: {text}")
