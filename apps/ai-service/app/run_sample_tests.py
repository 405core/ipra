from __future__ import annotations

import argparse
import json
import sys
import time
from datetime import datetime
from pathlib import Path

from config import AI_SERVICE_ROOT, configure_runtime, load_settings


DEFAULT_PROMPT = "Describe the person in the video. What is the person saying, and what visible emotional changes can you observe?"

PROMPTS_BY_KEYWORD = {
    "funding_stress": "Describe the person in the video. What is the person saying about funding, and what visible emotional changes can you observe?",
    "followup_context": "Describe the person in the video. What is the person saying about travel details, and what visible emotional changes can you observe?",
}


def add_import_paths(settings) -> None:
    for path in [settings.compat_root, settings.vendor_root]:
        path_text = str(path)
        if path_text not in sys.path:
            sys.path.insert(0, path_text)


def prompt_for(video_path: Path) -> str:
    lower_name = video_path.name.lower()
    for keyword, prompt in PROMPTS_BY_KEYWORD.items():
        if keyword in lower_name:
            return prompt
    return DEFAULT_PROMPT


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run HumanOmni sample video tests.")
    parser.add_argument(
        "--samples-dir",
        default=str(AI_SERVICE_ROOT / "samples"),
        help="Directory containing generated sample videos.",
    )
    parser.add_argument(
        "--pattern",
        default="*_ad.mp4",
        help="Glob pattern for test clips. Use *_ad.mp4 for clips with audio.",
    )
    parser.add_argument("--modal", choices=["video", "video_audio"], default="video_audio")
    parser.add_argument("--max-new-tokens", type=int, default=256)
    parser.add_argument(
        "--output-dir",
        default=str(AI_SERVICE_ROOT / "test-runs"),
        help="Directory for JSONL and Markdown test reports.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    settings = configure_runtime(load_settings())
    add_import_paths(settings)

    samples_dir = Path(args.samples_dir).resolve()
    output_dir = Path(args.output_dir).resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    videos = sorted(samples_dir.glob(args.pattern))
    if not videos:
        raise FileNotFoundError(f"No videos matched {args.pattern} in {samples_dir}")

    import torch
    from transformers import BertTokenizer
    from humanomni import mm_infer, model_init
    from humanomni.utils import disable_torch_init

    if not torch.cuda.is_available():
        raise RuntimeError("HumanOmni inference requires CUDA.")

    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    jsonl_path = output_dir / f"humanomni-{args.modal}-{timestamp}.jsonl"
    markdown_path = output_dir / f"humanomni-{args.modal}-{timestamp}.md"

    print(f"Loading HumanOmni model from {settings.model_path}")
    disable_torch_init()
    bert_tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
    model, processor, tokenizer = model_init(str(settings.model_path))

    results: list[dict] = []
    with jsonl_path.open("w", encoding="utf-8") as jsonl:
        for index, video_path in enumerate(videos, start=1):
            print(f"[{index}/{len(videos)}] Testing {video_path.name} as {args.modal}")
            started_at = time.perf_counter()
            prompt = prompt_for(video_path)

            record = {
                "file": str(video_path),
                "modal": args.modal,
                "prompt": prompt,
                "ok": False,
                "output": "",
                "elapsed_seconds": None,
                "error": None,
            }

            try:
                video_tensor = processor["video"](str(video_path))
                audio = None
                if args.modal == "video_audio":
                    audio = processor["audio"](str(video_path))[0]

                output = mm_infer(
                    video_tensor,
                    prompt,
                    model=model,
                    tokenizer=tokenizer,
                    modal=args.modal,
                    question=prompt,
                    bert_tokeni=bert_tokenizer,
                    do_sample=False,
                    max_new_tokens=args.max_new_tokens,
                    audio=audio,
                )
                record["ok"] = True
                record["output"] = output
            except Exception as exc:
                record["error"] = f"{type(exc).__name__}: {exc}"

            record["elapsed_seconds"] = round(time.perf_counter() - started_at, 2)
            results.append(record)
            jsonl.write(json.dumps(record, ensure_ascii=False) + "\n")
            jsonl.flush()

            if record["ok"]:
                print(record["output"])
            else:
                print(record["error"])
            print()

    markdown = [
        "# HumanOmni 样例测试报告",
        "",
        f"- 模态：`{args.modal}`",
        f"- 视频匹配：`{args.pattern}`",
        f"- 样例目录：`{samples_dir}`",
        f"- 生成时间：`{timestamp}`",
        "",
    ]

    for record in results:
        markdown.extend(
            [
                f"## {Path(record['file']).name}",
                "",
                f"- 状态：{'通过' if record['ok'] else '失败'}",
                f"- 耗时：`{record['elapsed_seconds']}s`",
                "",
                "### 模型输出",
                "",
                record["output"] if record["ok"] else record["error"] or "",
                "",
            ]
        )

    markdown_path.write_text("\n".join(markdown), encoding="utf-8")

    print(f"JSONL report: {jsonl_path}")
    print(f"Markdown report: {markdown_path}")
    return 0 if all(record["ok"] for record in results) else 1


if __name__ == "__main__":
    raise SystemExit(main())
