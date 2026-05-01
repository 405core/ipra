from __future__ import annotations

import importlib.util
import json
import sys
from pathlib import Path

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


def main() -> int:
    settings = configure_runtime(load_settings())

    print("IPRA HumanOmni environment check")
    print(f"python: {sys.version.split()[0]} ({sys.executable})")
    print(f"model:  {settings.model_path}")
    print(f"vendor: {settings.vendor_root}")
    print(f"HF_HOME:{settings.hf_home}")
    print()

    ok = True
    python_ok = sys.version_info >= (3, 10)
    print_item("Python >= 3.10", python_ok)
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
            print_item("architecture HumanOmniQwen2ForCausalLM", "HumanOmniQwen2ForCausalLM" in config.get("architectures", []))
            print(f"vision tower: {config.get('mm_vision_tower')}")
            print(f"audio tower:  {config.get('mm_audio_tower')}")
        except Exception as exc:
            print_item("read model config", False, str(exc))
            ok = False

    for package in REQUIRED_PACKAGES:
        present = has_module(package)
        print_item(f"python package {package}", present)
        ok = ok and present

    if has_module("torch"):
        import torch

        cuda_ok = torch.cuda.is_available()
        print_item("torch CUDA available", cuda_ok)
        if cuda_ok:
            print(f"cuda device: {torch.cuda.get_device_name(0)}")
        ok = ok and cuda_ok

    print()
    if ok:
        print("Environment looks ready for HumanOmni inference.")
        return 0

    print("Environment is not ready yet. Install requirements and download dependency models before inference.")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
