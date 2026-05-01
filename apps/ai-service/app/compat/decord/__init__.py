from __future__ import annotations

import numpy as np


def cpu(index: int = 0) -> int:
    return index


class _Batch:
    def __init__(self, frames: list[np.ndarray]):
        self._frames = frames

    def asnumpy(self) -> np.ndarray:
        return np.stack(self._frames, axis=0)


class VideoReader:
    """Small OpenCV-backed fallback for the decord API used by HumanOmni."""

    def __init__(self, path: str, ctx=None, num_threads: int = 1):
        import cv2

        self.path = path
        self._cv2 = cv2
        self._cap = cv2.VideoCapture(path)
        if not self._cap.isOpened():
            raise RuntimeError(f"Cannot open video: {path}")

        self._fps = self._cap.get(cv2.CAP_PROP_FPS) or 25.0
        self._frame_count = int(self._cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)

    def __len__(self) -> int:
        return self._frame_count

    def get_avg_fps(self) -> float:
        return float(self._fps)

    def get_batch(self, indices) -> _Batch:
        frames: list[np.ndarray] = []
        for index in indices:
            self._cap.set(self._cv2.CAP_PROP_POS_FRAMES, int(index))
            ok, frame = self._cap.read()
            if not ok:
                frame = np.zeros((224, 224, 3), dtype=np.uint8)
            else:
                frame = self._cv2.cvtColor(frame, self._cv2.COLOR_BGR2RGB)
            frames.append(frame)
        return _Batch(frames)


class AudioReader:
    """MoviePy-backed fallback for the tiny AudioReader surface used here."""

    def __init__(self, path: str, ctx=None, sample_rate: int = 16000):
        self.sample_rate = sample_rate
        try:
            from moviepy.editor import VideoFileClip

            clip = VideoFileClip(path)
            if clip.audio is None:
                self._array = np.zeros(sample_rate, dtype=np.float32)
            else:
                audio = clip.audio.to_soundarray(fps=sample_rate)
                if audio.ndim > 1:
                    audio = audio.mean(axis=1)
                self._array = audio.astype(np.float32)
            clip.close()
        except Exception:
            self._array = np.zeros(sample_rate, dtype=np.float32)
