from __future__ import annotations

import unittest
from unittest.mock import patch
from urllib.parse import parse_qs, urlparse

from services.iflytek_realtime_asr import (
    IflytekRealtimeAsrSettings,
    build_iflytek_realtime_asr_url,
    create_signature,
    extract_iflytek_transcript_event,
)


class IflytekRealtimeAsrTest(unittest.TestCase):
    def test_create_signature_uses_sorted_parameters(self) -> None:
        signature = create_signature(
            {
                "uuid": "demo",
                "appId": "app-id",
                "accessKeyId": "key",
            },
            "secret",
        )

        self.assertEqual(signature, "lMHNPvaEcEUnaG/1QFWH7d+/57E=")

    def test_build_url_contains_signature_and_runtime_params(self) -> None:
        settings = IflytekRealtimeAsrSettings(
            app_id="app-id",
            api_key="key",
            api_secret="secret",
        )

        with patch(
            "services.iflytek_realtime_asr.create_utc_timestamp",
            return_value="2026-05-09T20:00:00+0800",
        ):
            url = build_iflytek_realtime_asr_url(settings, session_id="session-1")

        query = parse_qs(urlparse(url).query)
        self.assertEqual(query["appId"], ["app-id"])
        self.assertEqual(query["accessKeyId"], ["key"])
        self.assertEqual(query["uuid"], ["session-1"])
        self.assertEqual(query["audio_encode"], ["pcm_s16le"])
        self.assertEqual(query["samplerate"], ["16000"])
        self.assertIn("signature", query)

    def test_extract_transcript_from_iflytek_result_payload(self) -> None:
        event = extract_iflytek_transcript_event(
            {
                "code": 0,
                "data": {
                    "ls": False,
                    "cn": {
                        "st": {
                            "bg": "160",
                            "ed": "560",
                            "type": "1",
                            "rt": [
                                {
                                    "ws": [
                                        {"cw": [{"w": "随便"}]},
                                        {"cw": [{"w": "走进"}]},
                                        {"cw": [{"w": "一个"}]},
                                        {"cw": [{"w": "三线城市"}]},
                                    ]
                                }
                            ],
                        }
                    },
                },
            }
        )

        self.assertEqual(event["text"], "随便走进一个三线城市")
        self.assertEqual(event["segmentId"], 160)
        self.assertFalse(event["isFinal"])


if __name__ == "__main__":
    unittest.main()
