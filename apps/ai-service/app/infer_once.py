from __future__ import annotations

import argparse
import sys
from pathlib import Path

from config import configure_runtime, load_settings


def add_import_paths(settings) -> None:
    # compat first: if the native decord wheel is unavailable on Windows, our
    # small fallback package satisfies the subset of API HumanOmni uses.
    for path in [settings.compat_root, settings.vendor_root]:
        path_text = str(path)
        if path_text not in sys.path:
            sys.path.insert(0, path_text)


def parse_args() -> argparse.Namespace:
    settings = load_settings()
    parser = argparse.ArgumentParser(description="Run one HumanOmni inference.")
    parser.add_argument("--modal", choices=["video", "video_audio", "audio"], default="video")
    parser.add_argument("--model-path", default=str(settings.model_path))
    parser.add_argument("--video-path", required=True)
    parser.add_argument(
        "--instruct",
        default="Describe the visible person, speech content, and emotional state in this video.",
    )
    parser.add_argument("--max-new-tokens", type=int, default=256)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    settings = configure_runtime(load_settings())
    add_import_paths(settings)

    model_path = Path(args.model_path).resolve()
    video_path = Path(args.video_path).resolve()

    if not model_path.is_dir():
        raise FileNotFoundError(f"Model path does not exist: {model_path}")
    if not video_path.is_file():
        raise FileNotFoundError(f"Video path does not exist: {video_path}")

    import torch
    from transformers import BertTokenizer
    from humanomni import model_init, mm_infer
    from humanomni.utils import disable_torch_init

    if not torch.cuda.is_available():
        raise RuntimeError("HumanOmni inference requires CUDA because the official code calls .cuda().")

    print(f"Loading HumanOmni model from {model_path}")
    disable_torch_init()
    bert_tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
    model, processor, tokenizer = model_init(str(model_path))

    print(f"Preprocessing {args.modal} input from {video_path}")
    video_tensor = processor["video"](str(video_path))
    audio = None
    if args.modal in {"video_audio", "audio"}:
        audio = processor["audio"](str(video_path))[0]

    print("Running inference ...")
    output = mm_infer(
        video_tensor,
        args.instruct,
        model=model,
        tokenizer=tokenizer,
        modal=args.modal,
        question=args.instruct,
        bert_tokeni=bert_tokenizer,
        do_sample=False,
        max_new_tokens=args.max_new_tokens,
        audio=audio,
    )
    print()
    print("=== HumanOmni Output ===")
    print(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
