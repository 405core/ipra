from __future__ import annotations

import json
import os
import re
import urllib.error
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from schemas.inquiry import (
    FirstRoundStrategyRequest,
    FirstRoundStrategyResponse,
    FollowupGuidanceRequest,
    FollowupGuidanceResponse,
)


PROMPT_DIR = Path(__file__).resolve().parents[1] / "prompts"


@dataclass(frozen=True)
class BusinessLlmSettings:
    provider: str
    base_url: str
    api_key: str
    model: str
    timeout_seconds: int


def load_business_llm_settings() -> BusinessLlmSettings:
    provider = os.getenv("BUSINESS_LLM_PROVIDER", "mock").strip() or "mock"
    base_url = os.getenv("BUSINESS_LLM_BASE_URL", "").strip()
    if provider == "ollama" and not base_url:
        base_url = "http://127.0.0.1:11434"

    return BusinessLlmSettings(
        provider=provider,
        base_url=base_url,
        api_key=os.getenv("BUSINESS_LLM_API_KEY", "").strip(),
        model=os.getenv("BUSINESS_LLM_MODEL", "mock-business-llm").strip() or "mock-business-llm",
        timeout_seconds=_read_timeout_seconds(),
    )


class BusinessLlmError(RuntimeError):
    pass


class BusinessLlmClient:
    def __init__(self, settings: BusinessLlmSettings | None = None) -> None:
        self.settings = settings or load_business_llm_settings()

    @property
    def runtime(self) -> dict[str, str]:
        return {"provider": self.settings.provider, "model": self.settings.model}

    def generate_first_round_strategy(
        self,
        request: FirstRoundStrategyRequest,
        prompt: str,
    ) -> FirstRoundStrategyResponse:
        if self.settings.provider == "mock":
            from services.first_round_strategy import build_mock_first_round_strategy

            return build_mock_first_round_strategy(request, self.runtime, prompt)
        if self.settings.provider == "ollama":
            return self._generate_first_round_strategy_with_ollama(request, prompt)
        raise NotImplementedError("Supported BUSINESS_LLM_PROVIDER values: mock, ollama.")

    def generate_followup_guidance(
        self,
        request: FollowupGuidanceRequest,
        prompt: str,
    ) -> FollowupGuidanceResponse:
        if self.settings.provider == "mock":
            from services.followup_guidance import build_mock_followup_guidance

            return build_mock_followup_guidance(request, self.runtime, prompt)
        if self.settings.provider == "ollama":
            return self._generate_followup_guidance_with_ollama(request, prompt)
        raise NotImplementedError("Supported BUSINESS_LLM_PROVIDER values: mock, ollama.")

    def _generate_first_round_strategy_with_ollama(
        self,
        request: FirstRoundStrategyRequest,
        prompt: str,
    ) -> FirstRoundStrategyResponse:
        content = self._call_ollama_json(
            system_prompt=_system_prompt(),
            user_prompt=(
                f"{prompt}\n\n"
                "请根据输入生成首轮问询策略。必须只返回一个 JSON 对象，不要输出 Markdown。\n"
                "JSON 必须包含这些字段：sessionId、llm、riskAssessment、strategy、questions、operatorNote。\n"
                "questions 中每一项必须包含 questionId、priority、question、purpose、expectedEvidence。\n\n"
                f"输入 JSON：\n{_to_json(request.model_dump(by_alias=True))}"
            ),
        )
        data = _parse_json_object(content)
        data["sessionId"] = request.session_id
        data["llm"] = self.runtime
        try:
            return FirstRoundStrategyResponse.model_validate(data)
        except Exception as exc:
            raise BusinessLlmError(f"Ollama first-round response does not match schema: {exc}; raw={content}") from exc

    def _generate_followup_guidance_with_ollama(
        self,
        request: FollowupGuidanceRequest,
        prompt: str,
    ) -> FollowupGuidanceResponse:
        content = self._call_ollama_json(
            system_prompt=_system_prompt(),
            user_prompt=(
                f"{prompt}\n\n"
                "请根据输入生成后续追问指引。必须只返回一个 JSON 对象，不要输出 Markdown。\n"
                "JSON 必须包含这些字段：sessionId、roundNo、llm、multimodalAssessment、followupGuidance、operatorNote、warnings。\n"
                "followupGuidance 中每一项必须包含 priority、question、reason、operatorTip、focusArea。\n\n"
                f"输入 JSON：\n{_to_json(request.model_dump(by_alias=True))}"
            ),
        )
        data = _parse_json_object(content)
        data["sessionId"] = request.session_id
        data["roundNo"] = request.round_no
        data["llm"] = self.runtime
        try:
            return FollowupGuidanceResponse.model_validate(data)
        except Exception as exc:
            raise BusinessLlmError(f"Ollama followup response does not match schema: {exc}; raw={content}") from exc

    def _call_ollama_json(self, *, system_prompt: str, user_prompt: str) -> str:
        if not self.settings.base_url:
            raise BusinessLlmError("BUSINESS_LLM_BASE_URL is required when BUSINESS_LLM_PROVIDER=ollama.")
        if not self.settings.model:
            raise BusinessLlmError("BUSINESS_LLM_MODEL is required when BUSINESS_LLM_PROVIDER=ollama.")

        payload = {
            "model": self.settings.model,
            "stream": False,
            "format": "json",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            "options": {
                "temperature": 0.2,
            },
        }
        request = urllib.request.Request(
            self.settings.base_url.rstrip("/") + "/api/chat",
            data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(request, timeout=self.settings.timeout_seconds) as response:
                data = json.loads(response.read().decode("utf-8"))
        except urllib.error.URLError as exc:
            raise BusinessLlmError(f"Cannot call Ollama API: {exc}") from exc
        except json.JSONDecodeError as exc:
            raise BusinessLlmError(f"Cannot parse Ollama API response JSON: {exc}") from exc

        message = data.get("message") or {}
        content = message.get("content")
        if not isinstance(content, str) or not content.strip():
            raise BusinessLlmError(f"Ollama API response does not contain message.content: {data}")
        return content


def load_prompt(name: str) -> str:
    path = PROMPT_DIR / name
    return path.read_text(encoding="utf-8")


def public_runtime(runtime: dict[str, Any]) -> dict[str, str]:
    return {
        "provider": str(runtime.get("provider") or "mock"),
        "model": str(runtime.get("model") or "mock-business-llm"),
    }


def _read_timeout_seconds() -> int:
    raw_value = os.getenv("BUSINESS_LLM_TIMEOUT_SECONDS", "120").strip() or "120"
    try:
        timeout = int(raw_value)
    except ValueError as exc:
        raise ValueError("BUSINESS_LLM_TIMEOUT_SECONDS must be an integer") from exc
    if timeout <= 0:
        raise ValueError("BUSINESS_LLM_TIMEOUT_SECONDS must be greater than 0")
    return timeout


def _system_prompt() -> str:
    return (
        "你是智能旅客风险评估与辅助问询系统中的业务 LLM。"
        "你必须输出严格 JSON，不能输出 Markdown、解释文字或代码块。"
        "所有追问话术必须中性、专业、非指控。"
        "动作、情绪和多模态观察只能作为追问参考，不能单独构成风险结论。"
    )


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
