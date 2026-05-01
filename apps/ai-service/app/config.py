from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[3]
AI_SERVICE_ROOT = REPO_ROOT / "apps" / "ai-service"
VENDOR_ROOT = AI_SERVICE_ROOT / "vendor" / "HumanOmni-official" / "HumanOmni-main"
COMPAT_ROOT = AI_SERVICE_ROOT / "app" / "compat"
DEFAULT_MODEL_PATH = REPO_ROOT / "models" / "humanomni0.5" / "iic" / "HumanOmni-0___5B"
DEFAULT_HF_HOME = REPO_ROOT / "models" / "humanomni0.5" / "huggingface"


@dataclass(frozen=True)
class Settings:
    model_path: Path
    hf_home: Path
    vendor_root: Path
    compat_root: Path
    cuda_visible_devices: str


def resolve_path(value: str | None, fallback: Path) -> Path:
    if not value:
        return fallback

    path = Path(value)
    if not path.is_absolute():
        path = AI_SERVICE_ROOT / path
    return path.resolve()


def load_settings() -> Settings:
    return Settings(
        model_path=resolve_path(os.getenv("HUMANOMNI_MODEL_PATH"), DEFAULT_MODEL_PATH),
        hf_home=resolve_path(os.getenv("HF_HOME"), DEFAULT_HF_HOME),
        vendor_root=VENDOR_ROOT,
        compat_root=COMPAT_ROOT,
        cuda_visible_devices=os.getenv("CUDA_VISIBLE_DEVICES", "0"),
    )


def configure_runtime(settings: Settings | None = None) -> Settings:
    settings = settings or load_settings()
    os.environ.setdefault("CUDA_VISIBLE_DEVICES", settings.cuda_visible_devices)
    os.environ.setdefault("HF_HOME", str(settings.hf_home))
    os.environ.setdefault("TRANSFORMERS_CACHE", str(settings.hf_home / "hub"))
    os.environ.setdefault("HF_HUB_DISABLE_SYMLINKS_WARNING", "1")
    settings.hf_home.mkdir(parents=True, exist_ok=True)
    return settings
