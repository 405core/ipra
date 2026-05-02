from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime
from pathlib import Path

APP_DIR = Path(__file__).resolve().parents[1] / "app"
if str(APP_DIR) not in sys.path:
    sys.path.insert(0, str(APP_DIR))

from config import AI_SERVICE_ROOT, suppress_native_stderr
from video_observation import AnalyzeOptions, VideoObservationError, analyze_video_file


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Analyze pure-video facial, gaze, head, hand, and posture events."
    )
    parser.add_argument("--video-path", required=True, help="Path to the mp4 video file.")
    parser.add_argument("--sample-fps", type=float, default=5.0, help="Frame sampling rate for observation.")
    parser.add_argument("--start-seconds", type=float, default=0.0, help="Start time in seconds.")
    parser.add_argument("--duration-seconds", type=float, default=None, help="Optional duration in seconds.")
    parser.add_argument("--max-width", type=int, default=960, help="Resize frames wider than this before analysis.")
    parser.add_argument("--include-frames", action="store_true", help="Include compact per-frame signals in JSON.")
    parser.add_argument(
        "--output-dir",
        default=str(AI_SERVICE_ROOT / "observations-runs"),
        help="Directory for JSON reports.",
    )
    parser.add_argument("--output-path", default=None, help="Optional explicit JSON output path.")
    return parser.parse_args()


def resolve_output_path(args: argparse.Namespace) -> Path:
    if args.output_path:
        return Path(args.output_path).resolve()

    output_dir = Path(args.output_dir).resolve()
    output_dir.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    return output_dir / f"video-observations-{timestamp}.json"


def main() -> int:
    args = parse_args()
    video_path = Path(args.video_path).resolve()
    output_path = resolve_output_path(args)
    options = AnalyzeOptions(
        sample_fps=args.sample_fps,
        start_seconds=args.start_seconds,
        duration_seconds=args.duration_seconds,
        max_width=args.max_width,
        include_frames=args.include_frames,
    )

    with suppress_native_stderr():
        try:
            result = analyze_video_file(video_path, options)
        except VideoObservationError as exc:
            print(f"Video observation failed: {exc}")
            return 2

        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")

        print("=== Pure Video Observation Summary ===")
        print(f"Video: {video_path}")
        print(f"Frames analyzed: {result['analyzer']['framesAnalyzed']}")
        print(f"Observed signals: {', '.join(result['summary']['observedSignals']) or 'none'}")
        print(f"JSON report: {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
