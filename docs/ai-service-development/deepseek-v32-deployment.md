---
title: DeepSeek V3.2 服务器部署适配
description: 说明 AI-Service 如何通过 OpenAI-compatible provider 调用服务器上的 DeepSeek V3.2 全精度模型服务。
order: 5
---

# DeepSeek V3.2 服务器部署适配

## 定位

DeepSeek V3.2 全精度模型不直接加载到当前 AI-Service 进程中。推荐在服务器上使用 vLLM、SGLang、TGI 或其他兼容网关单独部署模型，并暴露 OpenAI-compatible Chat Completions API；AI-Service 继续负责 prompt 编排、JSON 解析、智能体记忆补齐、追问去重和业务接口输出。

这样本地开发仍可使用 `transformers_local` 的 Qwen2.5-3B，服务器部署只需修改 `.env`。

## 推荐拓扑

```text
Frontend
  -> Go Backend
  -> AI-Service
       -> DeepSeek V3.2 OpenAI-compatible service
       -> HumanOmni local inference
       -> Iflytek realtime ASR
```

AI-Service 对外接口不变：

- `POST /v1/inquiry/first-round-strategy`
- `POST /v1/inquiry/followup-guidance`

## AI-Service 配置

在 `apps/ai-service/.env` 或服务器环境变量中设置：

```env
BUSINESS_LLM_PROVIDER=openai_compatible
BUSINESS_LLM_MODEL=deepseek-ai/DeepSeek-V3.2
BUSINESS_LLM_BASE_URL=http://deepseek-server:8000/v1
BUSINESS_LLM_API_KEY=local-or-internal-token
BUSINESS_LLM_TIMEOUT_SECONDS=900
BUSINESS_LLM_MAX_NEW_TOKENS=1536
BUSINESS_LLM_TEMPERATURE=1.0
BUSINESS_LLM_TOP_P=0.95
```

说明：

- `BUSINESS_LLM_BASE_URL` 可以是 `/v1` 根地址，也可以直接是 `/v1/chat/completions`。
- `BUSINESS_LLM_API_KEY` 可为空，适用于可信内网；如果模型网关启用了鉴权，则填写内部 token。
- `BUSINESS_LLM_TIMEOUT_SECONDS` 建议比本地小模型更长，避免首轮策略或多模态追问在大模型冷启动时超时。

## 模型服务要求

模型服务需要兼容 OpenAI Chat Completions 格式：

```http
POST /v1/chat/completions
Content-Type: application/json
Authorization: Bearer <optional-token>
```

AI-Service 会发送：

```json
{
  "model": "deepseek-ai/DeepSeek-V3.2",
  "messages": [
    {"role": "system", "content": "..."},
    {"role": "user", "content": "..."}
  ],
  "max_tokens": 1536,
  "temperature": 1.0,
  "top_p": 0.95,
  "stream": false
}
```

模型服务需返回：

```json
{
  "choices": [
    {
      "message": {
        "content": "{\"sessionId\":\"...\"}"
      }
    }
  ]
}
```

`content` 中必须是业务 JSON 对象；AI-Service 会继续做 schema 校验和服务端字段补齐。

## 启动与验证

安装依赖：

```powershell
cd D:\405project\ipra
& ".\apps\ai-service\.venv\Scripts\python.exe" -m pip install -r apps\ai-service\requirements.txt
```

检查配置：

```powershell
cd D:\405project\ipra\apps\ai-service
$env:PYTHONPATH="app"
.\.venv\Scripts\python.exe app\startup\check_env.py
```

启动 AI-Service：

```powershell
cd D:\405project\ipra
& ".\apps\ai-service\.venv\Scripts\python.exe" -m uvicorn service:app --app-dir apps\ai-service\app --host 0.0.0.0 --port 9000
```

Smoke test：

```powershell
cd D:\405project\ipra
& ".\apps\ai-service\.venv\Scripts\python.exe" apps\ai-service\scripts\smoke_first_round_strategy.py --base-url http://127.0.0.1:9000
& ".\apps\ai-service\.venv\Scripts\python.exe" apps\ai-service\scripts\smoke_followup_guidance.py --base-url http://127.0.0.1:9000
```

## 故障排查

- `BUSINESS_LLM_BASE_URL is required`：未设置 `BUSINESS_LLM_BASE_URL`，或 `.env` 没有被 AI-Service 读取。
- `HTTP 404`：检查 base URL 是否多写或少写 `/v1`；AI-Service 会自动拼接 `/chat/completions`。
- `missing choices`：模型网关返回的不是 OpenAI-compatible Chat Completions 格式。
- `response JSON object is incomplete`：模型输出被截断，调大 `BUSINESS_LLM_MAX_NEW_TOKENS` 或模型服务的输出上限。
- `response does not match schema`：模型输出不是接口要求的业务 JSON，优先检查网关是否套了一层额外文本或系统 prompt 是否被替换。
