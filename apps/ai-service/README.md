# IPRA AI-Service

本目录用于实现 D.LLM 模块中的本地 AI 能力，当前重点是同一时间窗口下的 HumanOmni0.5 整体观察、MediaPipe 细粒度视觉事件提取，以及为后续 ASR 接入预留统一 JSON 结构。

## 目录结构

```text
apps/ai-service/
  app/                         # 可复用服务代码
    config.py                  # 路径、模型缓存、离线模式和运行时配置
    service.py                 # FastAPI 服务骨架
    video_observation.py       # MediaPipe 纯视频观察逻辑
    startup/check_env.py       # 统一环境检查
    compat/decord/             # Windows decord 兼容层
  scripts/                     # 本地测试和调试入口
    humanomni_infer_once.py    # HumanOmni 单个窗口/文件推理
    humanomni_run_samples.py   # HumanOmni 样本批量测试
    mediapipe_analyze_once.py  # MediaPipe 单个窗口/文件观察
    analyze_window_once.py     # HumanOmni + MediaPipe 同窗口统一输出
  samples/                     # 测试视频
  test-runs/                   # HumanOmni 批量测试输出
  observations-runs/           # MediaPipe 单独观察输出
  window-runs/                 # 同窗口统一分析输出
  asr-runs/                    # 后续 ASR 单独转写输出
```

## 统一环境

为了便于部署，HumanOmni、MediaPipe 以及后续 ASR 默认使用同一个 Python 3.12 虚拟环境：`apps/ai-service/.venv`。不再把 HumanOmni 和 MediaPipe 分别放到两个环境中运行。

```powershell
cd D:\405project\ipra
py -3.12 -m venv apps\ai-service\.venv
& ".\apps\ai-service\.venv\Scripts\python.exe" -m pip install --upgrade pip
& ".\apps\ai-service\.venv\Scripts\python.exe" -m pip install --proxy http://127.0.0.1:7897 -r apps\ai-service\requirements.txt
```

检查环境：

```powershell
& ".\apps\ai-service\.venv\Scripts\python.exe" apps\ai-service\app\startup\check_env.py
```

环境检查会要求 Python 3.12、CUDA、HumanOmni 依赖、MediaPipe legacy `mp.solutions` 和本地模型文件都可用。

如果只想快速确认“统一环境是否达标”和“统一 JSON 是否包含 ASR 字段”，可以先跑轻量 smoke test。它不会加载 HumanOmni 大模型，也不会执行 MediaPipe 视频分析，只生成一份结构测试 JSON：

```powershell
& ".\apps\ai-service\.venv\Scripts\python.exe" apps\ai-service\scripts\check_runtime_and_schema.py
```

成功时会输出 `Environment: ok`、`ASR field present: True`，并在 `apps/ai-service/window-runs/` 下生成 `schema-smoke-runtime-asr-*.json`。

## 同窗口统一分析

推荐优先使用这个入口测试当前主流程。脚本会在同一个时间窗口内调用 HumanOmni 和 MediaPipe，并输出一个统一 JSON。

```powershell
& ".\apps\ai-service\.venv\Scripts\python.exe" apps\ai-service\scripts\analyze_window_once.py `
  --video-path apps\ai-service\samples\humanomni_test_03_gaze_avoidance_video.mp4 `
  --modal video `
  --start-seconds 4 `
  --duration-seconds 2 `
  --humanomni-num-frames 32 `
  --mediapipe-sample-fps 12
```

输出位置：

```text
apps/ai-service/window-runs/
```

统一 JSON 已预留 `asr` 字段。当前未接入 ASR 时，该字段会显示 `status: not_connected`；以后其他同学接入 ASR 后，可以通过 `--asr-json` 把同一窗口的语音转写结果合并进去。

```powershell
& ".\apps\ai-service\.venv\Scripts\python.exe" apps\ai-service\scripts\analyze_window_once.py `
  --video-path apps\ai-service\samples\humanomni_test_02_funding_stress_video_ad.mp4 `
  --modal video_audio `
  --start-seconds 0 `
  --duration-seconds 5 `
  --asr-json apps\ai-service\asr-runs\example-window-asr.json
```

预期 ASR JSON 结构：

```json
{
  "ok": true,
  "status": "provided",
  "provider": "reserved-asr-provider",
  "model": "reserved-asr-model",
  "language": "zh",
  "text": "旅客在该窗口内的回答文本",
  "segments": [
    {
      "startSeconds": 0.0,
      "endSeconds": 2.4,
      "text": "分段文本"
    }
  ],
  "words": []
}
```

## 单项测试入口

HumanOmni 单次推理：

```powershell
& ".\apps\ai-service\.venv\Scripts\python.exe" apps\ai-service\scripts\humanomni_infer_once.py `
  --modal video `
  --video-path apps\ai-service\samples\humanomni_test_03_gaze_avoidance_video.mp4 `
  --start-seconds 4 `
  --duration-seconds 2 `
  --num-frames 32
```

MediaPipe 单次观察：

```powershell
& ".\apps\ai-service\.venv\Scripts\python.exe" apps\ai-service\scripts\mediapipe_analyze_once.py `
  --video-path apps\ai-service\samples\humanomni_test_03_gaze_avoidance_video.mp4 `
  --start-seconds 4 `
  --duration-seconds 2 `
  --sample-fps 12
```

HumanOmni 样本批量测试：

```powershell
& ".\apps\ai-service\.venv\Scripts\python.exe" apps\ai-service\scripts\humanomni_run_samples.py `
  --pattern "*_ad.mp4" `
  --modal video_audio `
  --max-new-tokens 128
```
