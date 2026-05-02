from __future__ import annotations

import importlib
import importlib.util
import json
import sys
from pathlib import Path

APP_DIR = Path(__file__).resolve().parents[1]
if str(APP_DIR) not in sys.path:
    sys.path.insert(0, str(APP_DIR))

from config import configure_runtime, load_settings


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


def has_module(name: str) -> bool:
    return importlib.util.find_spec(name) is not None


def print_item(label: str, ok: bool, detail: str = "") -> None:
    status = "OK" if ok else "MISSING"
    suffix = f" - {detail}" if detail else ""
    print(f"[{status}] {label}{suffix}")


def check_mediapipe() -> bool:
    if not has_module("mediapipe"):
        print_item("python package mediapipe==0.10.21", False, "same-env pure-video observation")
        return False

    try:
        mediapipe = importlib.import_module("mediapipe")
        version = getattr(mediapipe, "__version__", "unknown")
        has_solutions = hasattr(mediapipe, "solutions")
        print_item(
            "python package mediapipe legacy solutions",
            has_solutions,
            f"version={version}; expected 0.10.21 or another build exposing mp.solutions",
        )
        return bool(has_solutions)
    except Exception as exc:
        print_item("python package mediapipe legacy solutions", False, str(exc))
        return False


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

    print("IPRA HumanOmni environment check")
    print(f"python: {sys.version.split()[0]} ({sys.executable})")
    print(f"model:  {settings.model_path}")
    print(f"vendor: {settings.vendor_root}")
    print(f"HF_HOME:{settings.hf_home}")
    print(f"HF offline mode: {settings.hf_offline}")
    print()

    ok = True
    python_ok = sys.version_info[:2] == (3, 12)
    print_item("Python 3.12", python_ok, "统一 HumanOmni、MediaPipe 和后续 ASR 的部署环境")
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
            print_item(
                "architecture HumanOmniQwen2ForCausalLM",
                "HumanOmniQwen2ForCausalLM" in config.get("architectures", []),
            )
            print(f"vision tower: {config.get('mm_vision_tower')}")
            print(f"audio tower:  {config.get('mm_audio_tower')}")
        except Exception as exc:
            print_item("read model config", False, str(exc))
            ok = False

    for package in REQUIRED_PACKAGES:
        present = has_module(package)
        print_item(f"python package {package}", present)
        ok = ok and present

    numpy_ok = check_numpy()
    ok = ok and numpy_ok

    mediapipe_ok = check_mediapipe()
    ok = ok and mediapipe_ok

    if has_module("torch"):
        import torch

        cuda_ok = torch.cuda.is_available()
        print_item("torch CUDA available", cuda_ok)
        if cuda_ok:
            print(f"cuda device: {torch.cuda.get_device_name(0)}")
        ok = ok and cuda_ok

    print()
    if ok:
        print("Environment looks ready for same-env HumanOmni + MediaPipe inference.")
        return 0

    print("Environment is not ready yet. Use Python 3.12, install requirements, and download dependency models before inference.")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
