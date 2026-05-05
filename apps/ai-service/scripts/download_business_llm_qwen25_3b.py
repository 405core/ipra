from __future__ import annotations

import argparse
import os
from pathlib import Path

from modelscope import snapshot_download


REPO_ROOT = Path(__file__).resolve().parents[3]
DEFAULT_MODEL_ID = "Qwen/Qwen2.5-3B-Instruct"
DEFAULT_TARGET_DIR = REPO_ROOT / "models" / "business-llm" / "modelscope" / "Qwen2.5-3B-Instruct"
DEFAULT_PROXY = "http://127.0.0.1:7897"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Download Qwen2.5-3B-Instruct from ModelScope.")
    parser.add_argument("--model-id", default=DEFAULT_MODEL_ID)
    parser.add_argument("--target-dir", default=str(DEFAULT_TARGET_DIR))
    parser.add_argument("--proxy", default=DEFAULT_PROXY)
    parser.add_argument("--max-workers", type=int, default=4)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    target_dir = Path(args.target_dir).resolve()
    target_dir.parent.mkdir(parents=True, exist_ok=True)

    if args.proxy:
        os.environ["HTTP_PROXY"] = args.proxy
        os.environ["HTTPS_PROXY"] = args.proxy

    print("=== Download Business LLM ===")
    print(f"model_id:   {args.model_id}")
    print(f"target_dir: {target_dir}")
    print(f"proxy:      {args.proxy or '(disabled)'}")
    print()

    downloaded_path = snapshot_download(
        args.model_id,
        local_dir=str(target_dir),
        max_workers=args.max_workers,
    )

    print()
    print("=== Download Finished ===")
    print(f"path: {downloaded_path}")
    print("important files:")
    for name in [
        "config.json",
        "generation_config.json",
        "tokenizer.json",
        "tokenizer_config.json",
    ]:
        path = target_dir / name
        print(f"  {'OK' if path.is_file() else 'MISSING'} {name}")

    safetensors = sorted(target_dir.glob("*.safetensors"))
    print(f"  safetensors files: {len(safetensors)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
