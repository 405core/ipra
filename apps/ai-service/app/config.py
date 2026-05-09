from __future__ import annotations

from contextlib import contextmanager
import logging
import os
import sys
import warnings
from dataclasses import dataclass
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[3]
AI_SERVICE_ROOT = REPO_ROOT / "apps" / "ai-service"
VENDOR_ROOT = AI_SERVICE_ROOT / "vendor" / "HumanOmni-official" / "HumanOmni-main"
COMPAT_ROOT = AI_SERVICE_ROOT / "app" / "compat"
DEFAULT_MODEL_PATH = REPO_ROOT / "models" / "humanomni0.5" / "iic" / "HumanOmni-0___5B"
DEFAULT_HF_HOME = REPO_ROOT / "models" / "humanomni0.5" / "huggingface"
TRUE_VALUES = {"1", "ON", "TRUE", "YES"}
DEFAULT_CORS_ORIGINS = (
    "http://localhost:4200",
    "http://127.0.0.1:4200",
    "http://localhost:4300",
    "http://127.0.0.1:4300",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
)


def load_local_env() -> None:
    for env_file in (AI_SERVICE_ROOT / ".env", AI_SERVICE_ROOT / ".env.local"):
        if not env_file.exists():
            continue

        for raw_line in env_file.read_text(encoding="utf-8").splitlines():
            line = raw_line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue

            key, value = line.split("=", 1)
            key = key.strip()
            if not key or key in os.environ:
                continue

            os.environ[key] = value.strip().strip('"').strip("'")


load_local_env()


@dataclass(frozen=True)
class Settings:
    model_path: Path
    hf_home: Path
    vendor_root: Path
    compat_root: Path
    cuda_visible_devices: str
    hf_offline: str


def resolve_path(value: str | None, fallback: Path) -> Path:
    if not value:
        return fallback

    path = Path(value)
    if not path.is_absolute():
        path = AI_SERVICE_ROOT / path
    return path.resolve()


def resolve_hf_offline() -> str:
    for name in ("HF_HUB_OFFLINE", "TRANSFORMERS_OFFLINE"):
        value = os.getenv(name)
        if value:
            return value
    return "1"


def is_truthy(value: str | None) -> bool:
    return str(value or "").strip().upper() in TRUE_VALUES


def get_cors_origins() -> list[str]:
    raw_value = os.getenv("AI_SERVICE_CORS_ORIGINS", "").strip()
    if not raw_value:
        return list(DEFAULT_CORS_ORIGINS)

    origins = [
        origin.strip()
        for origin in raw_value.replace("\n", ",").replace(";", ",").split(",")
        if origin.strip()
    ]
    return origins or list(DEFAULT_CORS_ORIGINS)


def configure_warning_output() -> None:
    if is_truthy(os.getenv("AI_SERVICE_VERBOSE_WARNINGS")):
        return

    os.environ.setdefault("TF_CPP_MIN_LOG_LEVEL", "2")
    os.environ.setdefault("TRANSFORMERS_VERBOSITY", "error")
    os.environ.setdefault("TRANSFORMERS_NO_ADVISORY_WARNINGS", "1")
    logging.getLogger("transformers").setLevel(logging.ERROR)
    logging.getLogger("transformers.modeling_utils").setLevel(logging.ERROR)
    logging.getLogger("transformers.generation.utils").setLevel(logging.ERROR)
    warnings.filterwarnings(
        "ignore",
        message=r"Importing from timm\.models\.layers is deprecated.*",
        category=FutureWarning,
    )


@contextmanager
def suppress_native_stderr():
    if is_truthy(os.getenv("AI_SERVICE_VERBOSE_WARNINGS")):
        yield
        return

    try:
        stderr_fd = sys.stderr.fileno()
    except (AttributeError, OSError):
        yield
        return

    sys.stderr.flush()
    saved_fd = os.dup(stderr_fd)
    try:
        with open(os.devnull, "w", encoding="utf-8") as devnull:
            os.dup2(devnull.fileno(), stderr_fd)
            yield
    finally:
        sys.stderr.flush()
        os.dup2(saved_fd, stderr_fd)
        os.close(saved_fd)


def load_settings() -> Settings:
    return Settings(
        model_path=resolve_path(os.getenv("HUMANOMNI_MODEL_PATH"), DEFAULT_MODEL_PATH),
        hf_home=resolve_path(os.getenv("HF_HOME"), DEFAULT_HF_HOME),
        vendor_root=VENDOR_ROOT,
        compat_root=COMPAT_ROOT,
        cuda_visible_devices=os.getenv("CUDA_VISIBLE_DEVICES", "0"),
        hf_offline=resolve_hf_offline(),
    )


def configure_runtime(settings: Settings | None = None) -> Settings:
    settings = settings or load_settings()
    configure_warning_output()
    os.environ.setdefault("CUDA_VISIBLE_DEVICES", settings.cuda_visible_devices)
    os.environ["HF_HOME"] = str(settings.hf_home)
    os.environ.setdefault("HF_HUB_OFFLINE", settings.hf_offline)
    os.environ.setdefault("TRANSFORMERS_OFFLINE", settings.hf_offline)
    os.environ.setdefault("HF_HUB_DISABLE_SYMLINKS_WARNING", "1")
    os.environ.setdefault("DO_NOT_TRACK", "1")
    os.environ.setdefault("GLOG_minloglevel", "2")
    settings.hf_home.mkdir(parents=True, exist_ok=True)
    return settings
