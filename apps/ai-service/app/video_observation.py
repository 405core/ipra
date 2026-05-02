from __future__ import annotations

import math
from dataclasses import dataclass
from pathlib import Path
from statistics import median
from typing import Any

import cv2
import numpy as np

from config import configure_runtime, load_settings, suppress_native_stderr


class VideoObservationError(RuntimeError):
    """Raised when pure-video observation cannot be executed."""


@dataclass(frozen=True)
class AnalyzeOptions:
    sample_fps: float = 5.0
    start_seconds: float = 0.0
    duration_seconds: float | None = None
    max_width: int = 960
    include_frames: bool = False


def analyze_video_file(video_path: str | Path, options: AnalyzeOptions | None = None) -> dict[str, Any]:
    analyzer = VideoObservationAnalyzer(options or AnalyzeOptions())
    try:
        return analyzer.analyze(video_path)
    finally:
        analyzer.close()


class VideoObservationAnalyzer:
    """MediaPipe-based pure-video observation for interview clips.

    This module intentionally does not do ASR. It extracts observable visual
    events from video frames and leaves final risk judgement to the fusion layer.
    """

    def __init__(self, options: AnalyzeOptions) -> None:
        if options.sample_fps <= 0:
            raise ValueError("sample_fps must be greater than 0")
        if options.start_seconds < 0:
            raise ValueError("start_seconds must be greater than or equal to 0")
        if options.duration_seconds is not None and options.duration_seconds <= 0:
            raise ValueError("duration_seconds must be greater than 0")

        self.options = options
        configure_runtime(load_settings())
        with suppress_native_stderr():
            self.mp = self._load_mediapipe()
            self.face_mesh = self.mp.solutions.face_mesh.FaceMesh(
                static_image_mode=False,
                max_num_faces=1,
                refine_landmarks=True,
                min_detection_confidence=0.5,
                min_tracking_confidence=0.5,
            )
            self.hands = self.mp.solutions.hands.Hands(
                static_image_mode=False,
                max_num_hands=2,
                model_complexity=1,
                min_detection_confidence=0.5,
                min_tracking_confidence=0.5,
            )
            self.pose = self.mp.solutions.pose.Pose(
                static_image_mode=False,
                model_complexity=1,
                smooth_landmarks=True,
                min_detection_confidence=0.5,
                min_tracking_confidence=0.5,
            )
        self.previous_hand_centers: list[tuple[float, float]] = []
        self.previous_time: float | None = None

    def close(self) -> None:
        with suppress_native_stderr():
            for solution in [getattr(self, "face_mesh", None), getattr(self, "hands", None), getattr(self, "pose", None)]:
                if solution is not None:
                    solution.close()

    def analyze(self, video_path: str | Path) -> dict[str, Any]:
        path = Path(video_path).resolve()
        if not path.is_file():
            raise FileNotFoundError(f"Video file does not exist: {path}")

        capture = cv2.VideoCapture(str(path))
        if not capture.isOpened():
            raise VideoObservationError(f"Cannot open video file: {path}")

        try:
            source_fps = capture.get(cv2.CAP_PROP_FPS) or 0
            frame_count = int(capture.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
            duration = frame_count / source_fps if source_fps > 0 and frame_count > 0 else None
            frames = self._collect_frames(capture, source_fps)
        finally:
            capture.release()

        baselines = _compute_baselines(frames)
        _derive_frame_scores(frames, baselines)
        event_groups = _build_events(frames, self.options.sample_fps)
        timeline_events = sorted(
            [event for events in event_groups.values() for event in events],
            key=lambda item: (item["startSeconds"], item["endSeconds"], item["type"]),
        )

        result: dict[str, Any] = {
            "videoPath": str(path),
            "analyzer": {
                "provider": "mediapipe.solutions",
                "sampleFps": self.options.sample_fps,
                "startSeconds": self.options.start_seconds,
                "durationSeconds": self.options.duration_seconds,
                "endSeconds": _analysis_end_seconds(
                    self.options.start_seconds,
                    self.options.duration_seconds,
                    duration,
                ),
                "framesAnalyzed": len(frames),
                "sourceFps": round(source_fps, 3) if source_fps else None,
                "sourceDurationSeconds": round(duration, 3) if duration else None,
            },
            "timelineEvents": timeline_events,
            "summary": _build_summary(event_groups, frames),
        }

        if self.options.include_frames:
            result["frames"] = [_compact_frame(frame) for frame in frames]

        return result

    def _collect_frames(self, capture: cv2.VideoCapture, source_fps: float) -> list[dict[str, Any]]:
        frames: list[dict[str, Any]] = []
        frame_index = 0
        next_sample_time = self.options.start_seconds
        end_time = (
            self.options.start_seconds + self.options.duration_seconds
            if self.options.duration_seconds is not None
            else None
        )
        step_seconds = 1.0 / self.options.sample_fps

        while True:
            ok, frame_bgr = capture.read()
            if not ok:
                break

            current_time = frame_index / source_fps if source_fps > 0 else len(frames) * step_seconds
            frame_index += 1

            if current_time + 1e-6 < self.options.start_seconds:
                continue
            if end_time is not None and current_time > end_time + 1e-6:
                break
            if current_time + 1e-6 < next_sample_time:
                continue

            while next_sample_time <= current_time + 1e-6:
                next_sample_time += step_seconds

            frame_bgr = _resize_if_needed(frame_bgr, self.options.max_width)
            frame_rgb = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2RGB)
            frames.append(self._analyze_frame(frame_rgb, current_time))

        return frames

    def _analyze_frame(self, frame_rgb: np.ndarray, timestamp: float) -> dict[str, Any]:
        with suppress_native_stderr():
            face_result = self.face_mesh.process(frame_rgb)
            hands_result = self.hands.process(frame_rgb)
            pose_result = self.pose.process(frame_rgb)

        face = _extract_face(face_result)
        hands = self._extract_hands(hands_result, face, timestamp)
        pose = _extract_pose(pose_result)

        return {
            "timeSeconds": round(timestamp, 3),
            "time": _format_time(timestamp),
            "face": face,
            "hands": hands,
            "pose": pose,
        }

    def _extract_hands(self, hands_result: Any, face: dict[str, Any], timestamp: float) -> dict[str, Any]:
        centers: list[tuple[float, float]] = []
        boxes: list[dict[str, float]] = []

        if hands_result.multi_hand_landmarks:
            for hand_landmarks in hands_result.multi_hand_landmarks:
                points = [(landmark.x, landmark.y) for landmark in hand_landmarks.landmark]
                xs = [point[0] for point in points]
                ys = [point[1] for point in points]
                center = (sum(xs) / len(xs), sum(ys) / len(ys))
                centers.append(center)
                boxes.append(
                    {
                        "minX": round(min(xs), 4),
                        "minY": round(min(ys), 4),
                        "maxX": round(max(xs), 4),
                        "maxY": round(max(ys), 4),
                    }
                )

        motion_score = self._hand_motion_score(centers, timestamp)
        near_face = _hands_near_face(centers, face.get("bbox"))

        self.previous_hand_centers = centers
        self.previous_time = timestamp

        return {
            "present": bool(centers),
            "count": len(centers),
            "centers": [_point(center) for center in centers],
            "boxes": boxes,
            "motionScore": round(motion_score, 4),
            "nearFace": near_face,
        }

    def _hand_motion_score(self, centers: list[tuple[float, float]], timestamp: float) -> float:
        if not centers or not self.previous_hand_centers or self.previous_time is None:
            return 0.0

        elapsed = max(timestamp - self.previous_time, 1e-6)
        distances: list[float] = []
        for center in centers:
            nearest = min(_distance(center, previous) for previous in self.previous_hand_centers)
            distances.append(nearest / elapsed)

        return float(sum(distances) / len(distances)) if distances else 0.0

    @staticmethod
    def _load_mediapipe() -> Any:
        try:
            import mediapipe as mp  # type: ignore
        except ImportError as exc:
            raise VideoObservationError(
                "MediaPipe is required for pure-video observation. "
                "Install it in the ai-service virtualenv, for example: "
                "apps\\ai-service\\.venv\\Scripts\\python.exe -m pip install mediapipe==0.10.21."
            ) from exc

        if not hasattr(mp, "solutions"):
            raise VideoObservationError(
                "The installed MediaPipe package does not expose mp.solutions. "
                "Use the legacy MediaPipe package for this analyzer: "
                "apps\\ai-service\\.venv\\Scripts\\python.exe -m pip install --force-reinstall mediapipe==0.10.21"
            )

        return mp


def _extract_face(face_result: Any) -> dict[str, Any]:
    if not face_result.multi_face_landmarks:
        return {"present": False}

    landmarks = face_result.multi_face_landmarks[0].landmark
    blendshapes: dict[str, float] = {}
    bbox = _landmark_bbox(landmarks)
    face_width = max(bbox["maxX"] - bbox["minX"], 1e-6)
    face_height = max(bbox["maxY"] - bbox["minY"], 1e-6)
    center_x = (bbox["minX"] + bbox["maxX"]) / 2
    center_y = (bbox["minY"] + bbox["maxY"]) / 2

    nose = landmarks[1]
    yaw_proxy = (nose.x - center_x) / face_width
    pitch_proxy = (nose.y - center_y) / face_height

    brow_eye_gap = _brow_eye_gap(landmarks, face_height)
    inner_brow_gap = abs(landmarks[336].x - landmarks[107].x) / face_width
    gaze = _gaze_direction(landmarks, blendshapes)

    return {
        "present": True,
        "bbox": {key: round(value, 4) for key, value in bbox.items()},
        "yawProxy": round(yaw_proxy, 4),
        "pitchProxy": round(pitch_proxy, 4),
        "browEyeGap": round(brow_eye_gap, 4) if brow_eye_gap is not None else None,
        "innerBrowGap": round(inner_brow_gap, 4),
        "blendshapes": {key: round(value, 4) for key, value in blendshapes.items() if value >= 0.05},
        "gazeDirection": gaze["direction"],
        "gazeConfidence": gaze["confidence"],
        "gazeEvidence": gaze["evidence"],
    }


def _extract_pose(pose_result: Any) -> dict[str, Any]:
    if not pose_result.pose_landmarks:
        return {"present": False}

    landmarks = pose_result.pose_landmarks.landmark
    required = [11, 12, 23, 24]
    if any(getattr(landmarks[index], "visibility", 1.0) < 0.4 for index in required):
        return {"present": False}

    left_shoulder = landmarks[11]
    right_shoulder = landmarks[12]
    left_hip = landmarks[23]
    right_hip = landmarks[24]

    shoulder_mid = ((left_shoulder.x + right_shoulder.x) / 2, (left_shoulder.y + right_shoulder.y) / 2)
    hip_mid = ((left_hip.x + right_hip.x) / 2, (left_hip.y + right_hip.y) / 2)
    torso_center = ((shoulder_mid[0] + hip_mid[0]) / 2, (shoulder_mid[1] + hip_mid[1]) / 2)
    shoulder_slope = abs(left_shoulder.y - right_shoulder.y)

    return {
        "present": True,
        "shoulderMid": _point(shoulder_mid),
        "hipMid": _point(hip_mid),
        "torsoCenter": _point(torso_center),
        "shoulderSlope": round(shoulder_slope, 4),
    }


def _compute_baselines(frames: list[dict[str, Any]]) -> dict[str, Any]:
    face_frames = [frame["face"] for frame in frames if frame["face"].get("present")][: max(5, min(12, len(frames)))]
    pose_frames = [frame["pose"] for frame in frames if frame["pose"].get("present")][: max(5, min(12, len(frames)))]

    baselines: dict[str, Any] = {}
    if face_frames:
        baselines["face"] = {
            "yawProxy": _safe_median(face.get("yawProxy") for face in face_frames),
            "pitchProxy": _safe_median(face.get("pitchProxy") for face in face_frames),
            "browEyeGap": _safe_median(face.get("browEyeGap") for face in face_frames),
            "innerBrowGap": _safe_median(face.get("innerBrowGap") for face in face_frames),
        }

    if pose_frames:
        torso_x = _safe_median(pose.get("torsoCenter", {}).get("x") for pose in pose_frames)
        torso_y = _safe_median(pose.get("torsoCenter", {}).get("y") for pose in pose_frames)
        baselines["pose"] = {
            "torsoCenter": {"x": torso_x, "y": torso_y} if torso_x is not None and torso_y is not None else None,
            "shoulderSlope": _safe_median(pose.get("shoulderSlope") for pose in pose_frames),
        }

    return baselines


def _derive_frame_scores(frames: list[dict[str, Any]], baselines: dict[str, Any]) -> None:
    face_baseline = baselines.get("face") or {}
    pose_baseline = baselines.get("pose") or {}

    for frame in frames:
        face = frame["face"]
        if face.get("present"):
            face["frownScore"] = round(_frown_score(face, face_baseline), 4)
            face["yawDelta"] = _rounded_delta(face.get("yawProxy"), face_baseline.get("yawProxy"))
            face["pitchDelta"] = _rounded_delta(face.get("pitchProxy"), face_baseline.get("pitchProxy"))

        pose = frame["pose"]
        if pose.get("present"):
            pose["postureShiftScore"] = round(_posture_shift_score(pose, pose_baseline), 4)
            pose["shoulderSlopeDelta"] = _rounded_delta(
                pose.get("shoulderSlope"), pose_baseline.get("shoulderSlope")
            )


def _build_events(frames: list[dict[str, Any]], sample_fps: float) -> dict[str, list[dict[str, Any]]]:
    event_groups: dict[str, list[dict[str, Any]]] = {
        "facialEvents": [],
        "gazeEvents": [],
        "headEvents": [],
        "handEvents": [],
        "poseEvents": [],
    }

    _add_segments(
        event_groups["facialEvents"],
        frames,
        event_type="frown_candidate",
        source="mediapipe.solutions.face_mesh",
        predicate=lambda frame: frame["face"].get("frownScore", 0) >= 0.2,
        score=lambda frame: frame["face"].get("frownScore", 0),
        description="眉眼距离或眉间距离相对基线下降，疑似皱眉或面部紧张。",
        sample_fps=sample_fps,
    )
    _add_segments(
        event_groups["gazeEvents"],
        frames,
        event_type="gaze_away_candidate",
        source="mediapipe.solutions.face_mesh",
        predicate=lambda frame: frame["face"].get("gazeDirection") not in {None, "center", "unknown"},
        score=lambda frame: frame["face"].get("gazeConfidence", 0.55),
        description="虹膜位置偏离眼部中心，疑似出现视线偏移或回避。",
        sample_fps=sample_fps,
    )
    _add_segments(
        event_groups["headEvents"],
        frames,
        event_type="head_turn_candidate",
        source="mediapipe.solutions.face_mesh",
        predicate=lambda frame: abs(frame["face"].get("yawDelta") or 0) >= 0.12,
        score=lambda frame: min(abs(frame["face"].get("yawDelta") or 0) * 3.0, 1.0),
        description="鼻尖相对人脸中心的横向位置变化较大，疑似转头或左右偏头。",
        sample_fps=sample_fps,
    )
    _add_segments(
        event_groups["headEvents"],
        frames,
        event_type="head_down_candidate",
        source="mediapipe.solutions.face_mesh",
        predicate=lambda frame: (frame["face"].get("pitchDelta") or 0) >= 0.08,
        score=lambda frame: min(abs(frame["face"].get("pitchDelta") or 0) * 4.0, 1.0),
        description="鼻尖相对人脸中心的纵向位置下移，疑似低头。",
        sample_fps=sample_fps,
    )
    head_shake = _detect_head_shake(frames)
    if head_shake:
        event_groups["headEvents"].append(head_shake)

    _add_segments(
        event_groups["handEvents"],
        frames,
        event_type="hand_motion",
        source="mediapipe.hands",
        predicate=lambda frame: frame["hands"].get("motionScore", 0) >= 0.3,
        score=lambda frame: min(frame["hands"].get("motionScore", 0), 1.0),
        description="手部关键点中心在相邻采样帧之间移动明显。",
        sample_fps=sample_fps,
    )
    _add_segments(
        event_groups["handEvents"],
        frames,
        event_type="hand_near_face",
        source="mediapipe.hands",
        predicate=lambda frame: bool(frame["hands"].get("nearFace")),
        score=lambda frame: 0.68,
        description="手部位置进入人脸附近区域，可能存在摸脸、遮挡或紧张性动作。",
        sample_fps=sample_fps,
    )
    _add_segments(
        event_groups["poseEvents"],
        frames,
        event_type="posture_change",
        source="mediapipe.pose",
        predicate=lambda frame: frame["pose"].get("postureShiftScore", 0) >= 0.08
        or abs(frame["pose"].get("shoulderSlopeDelta") or 0) >= 0.05,
        score=lambda frame: min(
            max(
                frame["pose"].get("postureShiftScore", 0),
                abs(frame["pose"].get("shoulderSlopeDelta") or 0) * 4.0,
            ),
            1.0,
        ),
        description="肩部或躯干中心相对基线出现变化，疑似坐姿变化或身体移动。",
        sample_fps=sample_fps,
    )

    for events in event_groups.values():
        events.sort(key=lambda item: (item["startSeconds"], item["endSeconds"], item["type"]))

    return event_groups


def _add_segments(
    events: list[dict[str, Any]],
    frames: list[dict[str, Any]],
    *,
    event_type: str,
    source: str,
    predicate: Any,
    score: Any,
    description: str,
    sample_fps: float,
) -> None:
    segment: list[dict[str, Any]] = []

    def flush() -> None:
        if not segment:
            return

        min_frames = 1 if sample_fps <= 2 else 2
        if len(segment) < min_frames:
            segment.clear()
            return

        scores = [float(score(frame) or 0) for frame in segment]
        start = float(segment[0]["timeSeconds"])
        end = float(segment[-1]["timeSeconds"]) + 1.0 / sample_fps
        confidence = _confidence(sum(scores) / len(scores))
        events.append(
            {
                "type": event_type,
                "source": source,
                "startSeconds": round(start, 3),
                "endSeconds": round(end, 3),
                "startTime": _format_time(start),
                "endTime": _format_time(end),
                "confidence": confidence,
                "description": description,
                "evidence": {
                    "frames": len(segment),
                    "averageScore": round(sum(scores) / len(scores), 4),
                    "maxScore": round(max(scores), 4),
                },
            }
        )
        segment.clear()

    for frame in frames:
        if predicate(frame):
            segment.append(frame)
        else:
            flush()
    flush()


def _detect_head_shake(frames: list[dict[str, Any]]) -> dict[str, Any] | None:
    values = [
        (float(frame["timeSeconds"]), float(frame["face"]["yawDelta"]))
        for frame in frames
        if frame["face"].get("present") and frame["face"].get("yawDelta") is not None
    ]
    significant = [(time, value) for time, value in values if abs(value) >= 0.04]
    if len(significant) < 4:
        return None

    signs: list[int] = []
    for _, value in significant:
        sign = 1 if value > 0 else -1
        if not signs or signs[-1] != sign:
            signs.append(sign)

    amplitude = max(value for _, value in significant) - min(value for _, value in significant)
    sign_changes = max(len(signs) - 1, 0)
    if amplitude < 0.18 or sign_changes < 2:
        return None

    start = significant[0][0]
    end = significant[-1][0]
    return {
        "type": "head_shake_candidate",
        "source": "mediapipe.solutions.face_mesh",
        "startSeconds": round(start, 3),
        "endSeconds": round(end, 3),
        "startTime": _format_time(start),
        "endTime": _format_time(end),
        "confidence": _confidence(0.45 + amplitude + sign_changes * 0.08),
        "description": "头部横向偏移出现多次方向变化，疑似摇头。",
        "evidence": {
            "yawAmplitude": round(amplitude, 4),
            "directionChanges": sign_changes,
            "samples": len(significant),
        },
    }


def _build_summary(event_groups: dict[str, list[dict[str, Any]]], frames: list[dict[str, Any]]) -> dict[str, Any]:
    counts = {name: len(events) for name, events in event_groups.items()}
    observed = sorted({event["type"] for events in event_groups.values() for event in events})
    face_frames = sum(1 for frame in frames if frame["face"].get("present"))
    hand_frames = sum(1 for frame in frames if frame["hands"].get("present"))
    pose_frames = sum(1 for frame in frames if frame["pose"].get("present"))

    return {
        "eventCounts": counts,
        "observedSignals": observed,
        "coverage": {
            "faceFrames": face_frames,
            "handFrames": hand_frames,
            "poseFrames": pose_frames,
            "totalFrames": len(frames),
        },
        "limitations": [
            "当前为纯视频模式，不分析语音内容和语义一致性。",
            "微表情和视线结果基于关键点与启发式规则，属于候选观察线索，不应单独作为风险结论。",
            "光照、遮挡、摄像头角度和人脸尺寸会影响置信度。",
        ],
    }


def _compact_frame(frame: dict[str, Any]) -> dict[str, Any]:
    face = frame["face"]
    hands = frame["hands"]
    pose = frame["pose"]
    return {
        "timeSeconds": frame["timeSeconds"],
        "time": frame["time"],
        "facePresent": face.get("present", False),
        "gazeDirection": face.get("gazeDirection"),
        "frownScore": face.get("frownScore"),
        "yawDelta": face.get("yawDelta"),
        "pitchDelta": face.get("pitchDelta"),
        "handCount": hands.get("count", 0),
        "handMotionScore": hands.get("motionScore", 0),
        "handNearFace": hands.get("nearFace", False),
        "posePresent": pose.get("present", False),
        "postureShiftScore": pose.get("postureShiftScore"),
    }


def _resize_if_needed(frame_bgr: np.ndarray, max_width: int) -> np.ndarray:
    if max_width <= 0 or frame_bgr.shape[1] <= max_width:
        return frame_bgr

    ratio = max_width / frame_bgr.shape[1]
    target_size = (max_width, max(1, int(frame_bgr.shape[0] * ratio)))
    return cv2.resize(frame_bgr, target_size, interpolation=cv2.INTER_AREA)


def _analysis_end_seconds(start_seconds: float, duration_seconds: float | None, source_duration: float | None) -> float | None:
    if duration_seconds is not None:
        return round(start_seconds + duration_seconds, 3)
    if source_duration is not None:
        return round(source_duration, 3)
    return None


def _landmark_bbox(landmarks: Any) -> dict[str, float]:
    xs = [landmark.x for landmark in landmarks]
    ys = [landmark.y for landmark in landmarks]
    return {"minX": min(xs), "minY": min(ys), "maxX": max(xs), "maxY": max(ys)}


def _brow_eye_gap(landmarks: Any, face_height: float) -> float | None:
    try:
        left_gap = landmarks[159].y - landmarks[105].y
        right_gap = landmarks[386].y - landmarks[334].y
    except IndexError:
        return None

    return max((left_gap + right_gap) / 2 / max(face_height, 1e-6), 0.0)


def _face_blendshapes(face_result: Any) -> dict[str, float]:
    blendshape_groups = getattr(face_result, "face_blendshapes", None)
    if not blendshape_groups:
        return {}

    values: dict[str, float] = {}
    for category in blendshape_groups[0]:
        name = getattr(category, "category_name", "")
        score = float(getattr(category, "score", 0.0))
        if name:
            values[name] = score
    return values


def _gaze_direction(landmarks: Any, blendshapes: dict[str, float] | None = None) -> dict[str, Any]:
    if len(landmarks) < 478:
        blendshape_gaze = _gaze_from_blendshapes(blendshapes or {})
        if blendshape_gaze:
            return blendshape_gaze
        return {"direction": "unknown", "confidence": 0.0, "evidence": "iris landmarks unavailable"}

    left_iris = _mean_point(landmarks[468:473])
    right_iris = _mean_point(landmarks[473:478])
    left_h = _ratio(left_iris[0], landmarks[33].x, landmarks[133].x)
    right_h = _ratio(right_iris[0], landmarks[362].x, landmarks[263].x)
    left_v = _ratio(left_iris[1], landmarks[159].y, landmarks[145].y)
    right_v = _ratio(right_iris[1], landmarks[386].y, landmarks[374].y)

    horizontal = (left_h + right_h) / 2
    vertical = (left_v + right_v) / 2

    direction = "center"
    score = 0.52
    if vertical >= 0.62:
        direction = "down"
        score = min(0.95, 0.55 + (vertical - 0.62) * 2)
    elif vertical <= 0.34:
        direction = "up"
        score = min(0.95, 0.55 + (0.34 - vertical) * 2)
    elif horizontal <= 0.38:
        direction = "screen_left"
        score = min(0.95, 0.55 + (0.38 - horizontal) * 2)
    elif horizontal >= 0.62:
        direction = "screen_right"
        score = min(0.95, 0.55 + (horizontal - 0.62) * 2)

    return {
        "direction": direction,
        "confidence": round(score, 3),
        "evidence": {
            "horizontalRatio": round(horizontal, 4),
            "verticalRatio": round(vertical, 4),
        },
    }


def _gaze_from_blendshapes(blendshapes: dict[str, float]) -> dict[str, Any] | None:
    if not blendshapes:
        return None

    down = _avg_blendshape(blendshapes, "eyeLookDownLeft", "eyeLookDownRight")
    up = _avg_blendshape(blendshapes, "eyeLookUpLeft", "eyeLookUpRight")
    left = max(blendshapes.get("eyeLookOutRight", 0.0), blendshapes.get("eyeLookInLeft", 0.0))
    right = max(blendshapes.get("eyeLookOutLeft", 0.0), blendshapes.get("eyeLookInRight", 0.0))
    candidates = {
        "down": down,
        "up": up,
        "screen_left": left,
        "screen_right": right,
    }
    direction, score = max(candidates.items(), key=lambda item: item[1])
    if score < 0.25:
        return {"direction": "center", "confidence": 0.52, "evidence": {"blendshapeMax": round(score, 4)}}

    return {
        "direction": direction,
        "confidence": round(min(0.95, 0.55 + score * 0.4), 3),
        "evidence": {key: round(value, 4) for key, value in candidates.items()},
    }


def _frown_score(face: dict[str, Any], baseline: dict[str, Any]) -> float:
    gap = face.get("browEyeGap")
    inner_gap = face.get("innerBrowGap")
    base_gap = baseline.get("browEyeGap")
    base_inner_gap = baseline.get("innerBrowGap")
    blendshapes = face.get("blendshapes") or {}

    scores: list[float] = []
    brow_down = _avg_blendshape(blendshapes, "browDownLeft", "browDownRight")
    if brow_down:
        scores.append(brow_down)
    if gap is not None and base_gap:
        scores.append(max((base_gap - gap) / max(base_gap, 1e-6), 0.0))
    if inner_gap is not None and base_inner_gap:
        scores.append(max((base_inner_gap - inner_gap) / max(base_inner_gap, 1e-6), 0.0) * 0.7)

    return max(scores) if scores else 0.0


def _avg_blendshape(blendshapes: dict[str, float], left_key: str, right_key: str) -> float:
    values = [blendshapes.get(left_key), blendshapes.get(right_key)]
    present = [float(value) for value in values if value is not None]
    return sum(present) / len(present) if present else 0.0


def _posture_shift_score(pose: dict[str, Any], baseline: dict[str, Any]) -> float:
    torso = pose.get("torsoCenter")
    base_torso = baseline.get("torsoCenter")
    if not torso or not base_torso:
        return 0.0

    return _distance((torso["x"], torso["y"]), (base_torso["x"], base_torso["y"]))


def _hands_near_face(centers: list[tuple[float, float]], face_bbox: dict[str, float] | None) -> bool:
    if not centers or not face_bbox:
        return False

    width = face_bbox["maxX"] - face_bbox["minX"]
    height = face_bbox["maxY"] - face_bbox["minY"]
    min_x = face_bbox["minX"] - width * 0.45
    max_x = face_bbox["maxX"] + width * 0.45
    min_y = face_bbox["minY"] - height * 0.35
    max_y = face_bbox["maxY"] + height * 0.65

    return any(min_x <= x <= max_x and min_y <= y <= max_y for x, y in centers)


def _safe_median(values: Any) -> float | None:
    numbers = [float(value) for value in values if value is not None and not math.isnan(float(value))]
    return round(float(median(numbers)), 4) if numbers else None


def _rounded_delta(value: float | None, baseline: float | None) -> float | None:
    if value is None or baseline is None:
        return None
    return round(float(value) - float(baseline), 4)


def _mean_point(landmarks: Any) -> tuple[float, float]:
    return (
        sum(landmark.x for landmark in landmarks) / len(landmarks),
        sum(landmark.y for landmark in landmarks) / len(landmarks),
    )


def _ratio(value: float, point_a: float, point_b: float) -> float:
    low = min(point_a, point_b)
    high = max(point_a, point_b)
    return (value - low) / max(high - low, 1e-6)


def _distance(left: tuple[float, float], right: tuple[float, float]) -> float:
    return math.sqrt((left[0] - right[0]) ** 2 + (left[1] - right[1]) ** 2)


def _point(point: tuple[float, float]) -> dict[str, float]:
    return {"x": round(point[0], 4), "y": round(point[1], 4)}


def _confidence(score: float) -> float:
    return round(max(0.35, min(0.95, 0.45 + score * 0.45)), 3)


def _format_time(seconds: float) -> str:
    minutes = int(seconds // 60)
    remaining = seconds - minutes * 60
    return f"{minutes:02d}:{remaining:05.2f}"
