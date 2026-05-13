---
title: AI 服务开发
description: 归档 AI-Service、HumanOmni、业务 LLM 接口和 D.LLM 模块开发说明。
order: 4
---

# AI 服务开发

本栏目用于归档 D.LLM 模块中 AI-Service 的开发说明、模型推理验证、业务 LLM 接口设计和后续联调文档。

## 当前文档

- [AI-Service 架构说明和示例说明](./ai-service-architecture-and-examples.md)：说明当前双接口架构、HumanOmni 的职责边界、前端动作 JSON 的接入方式、本地业务 LLM 和测试命令。
- [AI-Service 接口对接文档](./api-integration-guide.md)：面向前端和后端联调，说明视频上传、首轮策略、后续追问、动作 JSON 和 ASR 预留字段。
- [智能体记忆实现说明](./agent-memory.md)：归档智能体记忆层的定位、数据结构、接口流程、数据库落点、前端展示和验证方式。
- [DeepSeek V3.2 服务器部署适配](./deepseek-v32-deployment.md)：说明服务器部署时如何通过 OpenAI-compatible provider 调用 DeepSeek V3.2 全精度模型服务。
- [四类出境风险 LLM 问询规则](./llm-risk-case-inquiry-rules.md)：说明跨境赌博、跨境电诈、非法务工、出境目的存疑四类风险方向的 prompt 规则和 `riskCaseContext` 对接方式。
