from __future__ import annotations

import importlib
import importlib.util
import json
import os
import sys
from pathlib import Path

APP_DIR = Path(__file__).resolve().parents[1]
if str(APP_DIR) not in sys.path:
    sys.path.insert(0, str(APP_DIR))

from config import REPO_ROOT, configure_runtime, load_settings, resolve_path


REQUIRED_PACKAGES = [
    "torch",
    "transformers",
    "accelerate",
    "huggingface_hub",
    "safetensors",
    "cv2",
    "moviepy",
    "imageio",
    "einops",
    "timm",
    "h5py",
    "ipdb",
    "fastapi",
    "uvicorn",
    "pydantic",
    "multipart",
]

MODEL_FILES = [
    "config.json",
    "generation_config.json",
    "model.safetensors",
    "tokenizer.json",
    "tokenizer_config.json",
    "vocab.json",
    "merges.txt",
]

BUSINESS_LLM_FILES = [
    "config.json",
    "generation_config.json",
    "tokenizer.json",
    "tokenizer_config.json",
    "model.safetensors.index.json",
]


def has_module(name: str) -> bool:
    return importlib.util.find_spec(name) is not None


def print_item(label: str, ok: bool, detail: str = "") -> None:
    status = "OK" if ok else "MISSING"
    suffix = f" - {detail}" if detail else ""
    print(f"[{status}] {label}{suffix}")


def check_numpy() -> bool:
    if not has_module("numpy"):
        print_item("python package numpy >=1.26,<2", False)
        return False

    try:
        numpy = importlib.import_module("numpy")
        version = getattr(numpy, "__version__", "unknown")
        compatible = int(str(version).split(".", 1)[0]) < 2
        print_item("python package numpy >=1.26,<2", compatible, f"version={version}")
        return compatible
    except Exception as exc:
        print_item("python package numpy >=1.26,<2", False, str(exc))
        return False


def main() -> int:
    settings = configure_runtime(load_settings())

    print("IPRA AI-Service environment check")
    print(f"python: {sys.version.split()[0]} ({sys.executable})")
    print(f"model:  {settings.model_path}")
    print(f"vendor: {settings.vendor_root}")
    print(f"HF_HOME:{settings.hf_home}")
    print(f"HF offline mode: {settings.hf_offline}")
    business_provider = os.getenv("BUSINESS_LLM_PROVIDER", "transformers_local") or "transformers_local"
    print(f"business LLM provider: {business_provider}")
    print()

    ok = True
    python_ok = sys.version_info[:2] == (3, 12)
    print_item("Python 3.12", python_ok, "HumanOmni inference runtime")
    ok = ok and python_ok

    vendor_ok = (settings.vendor_root / "humanomni").is_dir() and (
        settings.vendor_root / "inference.py"
    ).is_file()
    print_item("official HumanOmni source", vendor_ok, str(settings.vendor_root))
    ok = ok and vendor_ok

    model_ok = settings.model_path.is_dir()
    print_item("HumanOmni checkpoint directory", model_ok, str(settings.model_path))
    ok = ok and model_ok

    if model_ok:
        for file_name in MODEL_FILES:
            exists = (settings.model_path / file_name).is_file()
            print_item(f"checkpoint file {file_name}", exists)
            ok = ok and exists

        config_path = settings.model_path / "config.json"
        try:
            config = json.loads(config_path.read_text(encoding="utf-8"))
            architecture_ok = "HumanOmniQwen2ForCausalLM" in config.get("architectures", [])
            print_item("architecture HumanOmniQwen2ForCausalLM", architecture_ok)
            print(f"vision tower: {config.get('mm_vision_tower')}")
            print(f"audio tower:  {config.get('mm_audio_tower')}")
            ok = ok and architecture_ok
        except Exception as exc:
            print_item("read model config", False, str(exc))
            ok = False

    if business_provider == "transformers_local":
        business_model_path = resolve_path(
            os.getenv("BUSINESS_LLM_MODEL_PATH"),
            REPO_ROOT / "models" / "business-llm" / "modelscope" / "Qwen2.5-3B-Instruct",
        )
        business_model_ok = business_model_path.is_dir()
        print_item("business LLM checkpoint directory", business_model_ok, str(business_model_path))
        ok = ok and business_model_ok
        if business_model_ok:
            for file_name in BUSINESS_LLM_FILES:
                exists = (business_model_path / file_name).is_file()
                print_item(f"business LLM file {file_name}", exists)
                ok = ok and exists
            safetensors_count = len(list(business_model_path.glob("*.safetensors")))
            print_item("business LLM safetensors shards", safetensors_count > 0, str(safetensors_count))
            ok = ok and safetensors_count > 0
    elif business_provider == "openai_compatible":
        business_base_url = os.getenv("BUSINESS_LLM_BASE_URL", "").strip()
        business_model = os.getenv("BUSINESS_LLM_MODEL", "").strip()
        print_item("business LLM base URL", bool(business_base_url), business_base_url or "missing")
        print_item("business LLM model", bool(business_model), business_model or "missing")
        api_key_present = bool(os.getenv("BUSINESS_LLM_API_KEY", "").strip())
        print_item("business LLM API key", True, "set" if api_key_present else "empty; allowed for internal deployments")
        httpx_present = has_module("httpx")
        print_item("python package httpx", httpx_present, "required for OpenAI-compatible business LLM")
        ok = ok and bool(business_base_url) and bool(business_model) and httpx_present
    elif business_provider == "mock":
        print_item("business LLM mock provider", True, "schema-only first-round tests; follow-up requires real business LLM")
    else:
        print_item("business LLM provider", False, "expected transformers_local, openai_compatible, or mock")
        ok = False

    for package in REQUIRED_PACKAGES:
        present = has_module(package)
        print_item(f"python package {package}", present)
        ok = ok and present

    ok = ok and check_numpy()

    if has_module("torch"):
        import torch

        cuda_ok = torch.cuda.is_available()
        print_item("torch CUDA available", cuda_ok)
        if cuda_ok:
            print(f"cuda device: {torch.cuda.get_device_name(0)}")
        ok = ok and cuda_ok

    print()
    if ok:
        print("Environment looks ready for HumanOmni inference and business LLM API smoke tests.")
        return 0

    print("Environment is not ready yet. Use Python 3.12, install requirements, and download dependency models before inference.")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
