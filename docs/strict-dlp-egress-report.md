# 严格去明文收口核查报告

更新时间：2026-05-12

## 结论

本次已按《智能旅客风险评估与辅助问询系统采购需求书》的严格口径，完成后端到浏览器主要敏感展示链路的去明文收口。当前实现遵循以下原则：

- 浏览器只接收最小控制元数据、受保护图片资产或受控媒体播放句柄
- 旅客画像、审计日志、问询运行态、归档文本、导入失败明细、OCR 识别详情不再以普通明文 JSON 作为受保护页面的展示依赖
- 对仍保留的明文接口，范围已压缩到认证、当前用户最小会话信息、非敏感设置、模板下载与用户主动输入提交

## 路由分级结果

### A 类：强制明文例外

- `/api/login`
- `/api/auth/me`
- `/api/inquiry/settings`
- `/api/admin/settings/inquiry`
- `/api/import-templates/*`
- 用户主动提交的表单请求体

### B 类：最小控制元数据

- `/api/inquiry/archives`
  - 仅返回 `id`、`archiveCode`、`finalJudgement`、`archivedAt`
- `/api/inquiry/archive-videos`
  - 仅返回 `filename`、`contentType`、`sizeBytes`
- `/api/passenger-profiles/ocr/idcard`
  - 仅返回 `code`、`msg`、`taskNo`、最小 OCR 状态字段
  - OCR 成功时直接附带 protected 检索结果，不再下发证件信息明文
- `/api/admin/inquiry-archives/videos/:id/stream`
  - 仅作为后端控制播放路由，不暴露存储定位信息

### C 类：受保护业务内容

- `/api/passenger-profiles/protected`
- `/api/passenger-profiles/:id/protected`
- `/api/passenger-profiles/imports/:id/protected`
- `/api/admin/profiles/protected`
- `/api/admin/watchlist/protected`
- `/api/admin/users/protected`
- `/api/audit-logs/protected`
- `/api/audit-logs/:id/protected`
- `/api/inquiry/protected/strategy`
- `/api/inquiry/protected/sessions/:sessionId/rounds/:roundId/window-summary`
- `/api/inquiry/protected/sessions/:sessionId/followup`
- `/api/inquiry/protected/sessions/:sessionId/judgement`
- `/api/inquiry/protected/sessions/:sessionId/memory`
- `/api/admin/inquiry-archives`
- `/api/admin/inquiry-archives/:id`

### D 类：保留但明确弃用/受约束的旧明文路由

- `/api/inquiry/sessions`
- `/api/inquiry/sessions/:sessionId`
- `/api/inquiry/sessions/:sessionId/turns`
- `/api/asr/transcribe`

以上旧路由已增加弃用标记，不再作为受保护页面依赖。

## 后端收口结果

### 旅客检索与导入

- 用户端数据检索仅通过 protected 列表展示
- 导入接口返回已压缩为批次摘要；行级 `errorDetails` 与 `rawData` 只通过 protected detail 查看
- `getProtectedImportResult()` 已替代前端直接消费导入明文明细

### OCR

- OCR 上游完整 `info`/`validity` 不再作为前端展示契约下发
- 浏览器仅接收最小识别状态
- 识别人像面且证件号可用时，后端直接返回 protected 检索结果，避免前端持有证件号明文

### 受保护辅助问询

- 问询入口已从路由明文证件号切换到 `profileId`
- 用户端不再调用明文 `searchPassengerProfiles()`、`fetchMemoryContext()`
- `followup` 与 `judgement` 流程改为后端基于服务端会话推进
- 前端不再回传上一轮服务端生成的摘要、窗口摘要、记忆内容或长生命周期文本副本
- 问询页实时转写不再直接渲染到 DOM；展示改为受保护摘要块

### 归档与媒体交付

- 创建归档改为后端从 `ProtectedSession` 服务端会话快照组装
- 管理端归档列表返回 protected row 资产
- 管理端归档详情返回 `overviewAsset`、`judgementAsset`、`briefingAsset`、`passengerAsset` 与每轮 `detailAsset`
- 归档视频响应移除 `videoUrl`、`minioBucket`、`minioObjectKey`、`storedPath`
- 视频播放继续通过后端流式代理，并设置 `no-store`

## 前端状态最小化结果

### 已清理的长生命周期敏感状态

- 用户端不再保留明文旅客画像对象用于受保护展示
- 用户端不再保留明文记忆上下文
- 用户端不再保留 `judgementBriefing` 等服务端摘要副本
- 问询页本轮实时转写文本不再展示，上传成功后会主动清空本地转写、观察事件和窗口摘要缓存
- 管理端归档页不再用明文列表字段本地重建归档详情

### 仍允许的临时明文

- 当前正在输入的 `judgementReason`
- 当前采样过程中尚未提交的短生命周期语音转写缓冲
- 管理端编辑表单中正在修改的最小明文字段

## 自动化验证

已执行并通过：

- `./node_modules/.bin/vue-tsc --noEmit -p apps/frontend/tsconfig.app.json`
- `go test ./...`（`apps/backend`）
- `bash scripts/check-strict-dlp-egress.sh`
- `npx vitest run apps/frontend/src/views/UserAskView.spec.ts`

`scripts/check-strict-dlp-egress.sh` 当前覆盖：

- 受保护页面/服务中是否残留被禁止的 plain sensitive API 调用
- 是否残留 `minioBucket` / `minioObjectKey` / `videoUrl` / `storedPath`
- 是否残留浏览器持久化敏感存储引用
- 关键 protected service 调用是否存在

## 例外边界复核

当前保留的明文例外仅限：

- 登录和当前用户最小会话
- 非敏感系统设置
- 空白模板下载
- 用户主动输入与上传
- 管理端显式编辑时按记录最小加载的表单字段

未发现以下被禁止内容继续作为受保护展示依赖：

- 旅客画像明文列表
- 问询记忆明文上下文
- 问询追问/摘要明文展示载荷
- 归档文本明文详情
- MinIO 定位信息
- OCR 身份字段明文展示载荷

## 残余说明

从“后端到浏览器”的采购口径看，本次要求的严格去明文收口已完成。仍需注意：

- 操作系统级截图、外部拍照和浏览器开发者工具无法从前端层彻底禁止，本项目仍依赖水印与审计做溯源
- 管理端编辑链路按设计仍保留最小必要明文字段，这属于被允许的主动编辑例外，不属于只读展示链路泄露
