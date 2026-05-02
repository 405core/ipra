from __future__ import annotations

import argparse
import sys
from pathlib import Path

APP_DIR = Path(__file__).resolve().parents[1] / "app"
if str(APP_DIR) not in sys.path:
    sys.path.insert(0, str(APP_DIR))

from config import configure_runtime, is_truthy, load_settings


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
    parser.add_argument(
        "--start-seconds",
        type=float,
        default=None,
        help="Optional start time for clipping the video/audio before inference.",
    )
    parser.add_argument(
        "--duration-seconds",
        type=float,
        default=None,
        help="Optional clip duration. Use with --start-seconds for 2s/5s/10s windows.",
    )
    parser.add_argument(
        "--num-frames",
        type=int,
        default=None,
        help="Override HumanOmni video frame sampling count, e.g. 16 or 32.",
    )
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
    if args.duration_seconds is not None and args.duration_seconds <= 0:
        raise ValueError("--duration-seconds must be greater than 0")
    if args.num_frames is not None and args.num_frames <= 0:
        raise ValueError("--num-frames must be greater than 0")

    clip_start = args.start_seconds
    clip_end = None
    if args.duration_seconds is not None:
        clip_start = 0.0 if clip_start is None else clip_start
        clip_end = clip_start + args.duration_seconds

    import torch
    from transformers import BertTokenizer
    from humanomni import model_init, mm_infer
    from humanomni.utils import disable_torch_init

    if not torch.cuda.is_available():
        raise RuntimeError("HumanOmni inference requires CUDA because the official code calls .cuda().")

    print(f"Loading HumanOmni model from {model_path}")
    disable_torch_init()
    bert_tokenizer = BertTokenizer.from_pretrained(
        "bert-base-uncased",
        local_files_only=is_truthy(settings.hf_offline),
    )
    model, processor, tokenizer = model_init(str(model_path))

    print(f"Preprocessing {args.modal} input from {video_path}")
    video_kwargs = {}
    if clip_start is not None and clip_end is not None:
        video_kwargs.update({"s": clip_start, "e": clip_end})
    if args.num_frames is not None:
        video_kwargs["num_frames"] = args.num_frames

    video_tensor = processor["video"](str(video_path), **video_kwargs)
    audio = None
    if args.modal in {"video_audio", "audio"}:
        audio_kwargs = {}
        if clip_start is not None and clip_end is not None:
            audio_kwargs.update({"s": clip_start, "e": clip_end})
        audio = processor["audio"](str(video_path), **audio_kwargs)[0]

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
