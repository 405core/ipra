from __future__ import annotations

import unittest
from urllib.parse import parse_qs, urlparse

from services.qwen3_realtime_asr import (
    Qwen3RealtimeAsrSettings,
    build_qwen3_realtime_asr_url,
    extract_qwen3_message_event,
)


class Qwen3RealtimeAsrTest(unittest.TestCase):
    def test_build_url_contains_streaming_parameters(self) -> None:
        settings = Qwen3RealtimeAsrSettings(
            url="ws://example.test/ws/asr",
            sample_rate=16000,
            language="Chinese",
            partial_interval_sec=2,
            min_audio_sec=1,
            max_window_sec=30,
        )

        url = build_qwen3_realtime_asr_url(settings)

        parsed = urlparse(url)
        query = parse_qs(parsed.query)
        self.assertEqual(parsed.scheme, "ws")
        self.assertEqual(parsed.netloc, "example.test")
        self.assertEqual(parsed.path, "/ws/asr")
        self.assertEqual(query["sample_rate"], ["16000"])
        self.assertEqual(query["language"], ["Chinese"])
        self.assertEqual(query["partial_interval_sec"], ["2"])
        self.assertEqual(query["min_audio_sec"], ["1"])
        self.assertEqual(query["max_window_sec"], ["30"])

    def test_extract_plain_text_transcript_event(self) -> None:
        event = extract_qwen3_message_event("旅客说他去洛杉矶参加会议")

        self.assertEqual(event["type"], "transcript")
        self.assertEqual(event["provider"], "qwen3-asr")
        self.assertEqual(event["model"], "qwen3-asr")
        self.assertEqual(event["text"], "旅客说他去洛杉矶参加会议")
        self.assertFalse(event["isFinal"])

    def test_extract_json_transcript_from_common_fields(self) -> None:
        cases = [
            ('{"text":"第一段文本","is_final":true}', "第一段文本", True),
            ('{"transcript":"第二段文本","final":false}', "第二段文本", False),
            ('{"result":"第三段文本"}', "第三段文本", False),
            ('{"data":{"text":"第四段文本"},"segment_id":42}', "第四段文本", False),
        ]

        for raw_message, expected_text, expected_final in cases:
            with self.subTest(raw_message=raw_message):
                event = extract_qwen3_message_event(raw_message)

                self.assertEqual(event["type"], "transcript")
                self.assertEqual(event["text"], expected_text)
                self.assertEqual(event["isFinal"], expected_final)

    def test_extract_error_event(self) -> None:
        event = extract_qwen3_message_event(
            '{"error":"模型服务不可用","code":500}'
        )

        self.assertEqual(event["type"], "error")
        self.assertEqual(event["provider"], "qwen3-asr")
        self.assertEqual(event["message"], "模型服务不可用")

    def test_ignores_status_message_without_transcript(self) -> None:
        event = extract_qwen3_message_event(
            '{"status":"connected","message":"ready"}'
        )

        self.assertIsNone(event)


if __name__ == "__main__":
    unittest.main()
