# IPRA AI-Service

本目录用于实现 D.LLM 模块中的 Python AI 服务能力。当前主线已经调整为：

```text
旅客基础画像 -> 业务 LLM -> 首轮问询问题清单
画像/答复/HumanOmni 摘要/前端动作 JSON -> 业务 LLM -> 后续追问指引
```

HumanOmni0.5 只负责对音视频窗口生成摘要，不再要求它输出微表情、视线、手部动作等结构化 JSON。动作采样 JSON 由前端或其他同学实现后传入本服务。

## 目录结构

```text
apps/ai-service/
  app/
    service.py                    # FastAPI 服务入口
    config.py                     # HumanOmni 路径、HF 缓存和运行时配置
    schemas/                      # 两个业务接口的 Pydantic 请求/响应结构
    services/                     # Mock 业务 LLM 和问询生成逻辑
    prompts/                      # 业务 LLM prompt 模板
    startup/check_env.py          # HumanOmni 和 API 运行环境检查
    compat/decord/                # Windows decord 兼容层
    video_observation.py          # 历史视觉观察逻辑，当前主流程不再使用
  scripts/
    humanomni_infer_once.py       # HumanOmni 单次推理验证
    smoke_first_round_strategy.py # 首轮策略接口 smoke test
    smoke_followup_guidance.py    # 后续追问接口 smoke test
    mediapipe_analyze_once.py     # 历史调试脚本，当前主流程不再使用
    analyze_window_once.py        # 历史合并测试脚本，当前主流程不再使用
  samples/                        # 本地测试视频
  test-runs/                      # 测试输出
  window-runs/                    # 历史窗口分析输出
  vendor/HumanOmni-official/      # 官方 HumanOmni 源码归档
  .env.example
  requirements.txt
```

## 环境

建议使用 Python 3.12 虚拟环境：

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

业务 LLM 当前默认使用 mock 模式；如需使用本地 Qwen2.5-3B-Instruct，将 provider 改为 `transformers_local` 并配置模型目录。

```text
BUSINESS_LLM_PROVIDER=mock
BUSINESS_LLM_MODEL=mock-business-llm
BUSINESS_LLM_MODEL_PATH=../../models/business-llm/modelscope/Qwen2.5-3B-Instruct
BUSINESS_LLM_TIMEOUT_SECONDS=120
BUSINESS_LLM_MAX_NEW_TOKENS=768
BUSINESS_LLM_TORCH_DTYPE=auto
BUSINESS_LLM_DEVICE_MAP=auto
```

本地 Qwen2.5-3B-Instruct 配置示例：

```text
BUSINESS_LLM_PROVIDER=transformers_local
BUSINESS_LLM_MODEL=Qwen2.5-3B-Instruct
BUSINESS_LLM_MODEL_PATH=../../models/business-llm/modelscope/Qwen2.5-3B-Instruct
BUSINESS_LLM_TIMEOUT_SECONDS=300
BUSINESS_LLM_MAX_NEW_TOKENS=768
BUSINESS_LLM_TORCH_DTYPE=auto
BUSINESS_LLM_DEVICE_MAP=auto
```

## 启动服务

```powershell
cd D:\405project\ipra
& ".\apps\ai-service\.venv\Scripts\python.exe" -m uvicorn service:app --app-dir apps\ai-service\app --host 127.0.0.1 --port 9000
```

健康检查：

```http
GET /health
```

## 接口

### 0. HumanOmni 窗口摘要

```http
POST /v1/humanomni/summarize-window
Content-Type: multipart/form-data
```

用于接收前端截取好的 5-10 秒音视频片段，保存到本地上传目录，并同步调用 HumanOmni0.5 生成窗口摘要。该接口不做动作识别，动作、微表情、视线和手部动作仍由前端或其他模块以结构化 JSON 传入后续追问接口。

表单字段：

- `file`：必填，上传视频或音频片段，建议 mp4。
- `sessionId`：必填，会话 ID。
- `questionId`：可选，当前问题 ID。
- `windowId`：可选，不传则服务端生成。
- `modal`：可选，默认 `video_audio`。
- `startSeconds` / `endSeconds`：可选，原始问询时间线中的窗口时间。
- `maxNewTokens` / `numFrames` / `instruct`：可选，HumanOmni 推理参数。

响应中的 `humanOmniWindow` 可直接放入 `/v1/inquiry/followup-guidance` 的 `humanOmniWindows` 数组。

### 1. 首轮问询策略生成

```http
POST /v1/inquiry/first-round-strategy
```

用于在获取旅客基础画像后生成首轮问询问题清单。输出包含风险摘要、问询目标、问题清单、每题目的和工作人员提示。

本地 smoke test：

```powershell
& ".\apps\ai-service\.venv\Scripts\python.exe" apps\ai-service\scripts\smoke_first_round_strategy.py
```

如果服务已经启动，也可以通过 HTTP 测试：

```powershell
& ".\apps\ai-service\.venv\Scripts\python.exe" apps\ai-service\scripts\smoke_first_round_strategy.py --base-url http://127.0.0.1:9000
```

### 2. 后续追问指引生成

```http
POST /v1/inquiry/followup-guidance
```

用于接收旅客画像、问答历史、HumanOmni 摘要、前端动作采样 JSON 和可选 ASR 字段，生成后续轮次追问建议。

本地 smoke test：

```powershell
& ".\apps\ai-service\.venv\Scripts\python.exe" apps\ai-service\scripts\smoke_followup_guidance.py
```

如果服务已经启动，也可以通过 HTTP 测试：

```powershell
& ".\apps\ai-service\.venv\Scripts\python.exe" apps\ai-service\scripts\smoke_followup_guidance.py --base-url http://127.0.0.1:9000
```

## HumanOmni 单次推理

HumanOmni 仍保留单次推理入口，用于验证模型是否可用：

```powershell
& ".\apps\ai-service\.venv\Scripts\python.exe" apps\ai-service\scripts\humanomni_infer_once.py `
  --modal video_audio `
  --video-path apps\ai-service\samples\humanomni_test_02_funding_stress_video_ad.mp4 `
  --max-new-tokens 128
```

该能力只作为音视频摘要来源，业务判断由后续业务 LLM 接口完成。
