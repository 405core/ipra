## Why

《智能旅客风险评估与辅助问询系统采购需求书》在 3.1、3.2、3.3 中要求系统实现全链路留痕、数据不落地不外流、禁止复制导出，并对所有前端展示与输出内容强制叠加可溯源水印。当前系统虽然已经引入了受保护图片和前端 DLP 拦截，但后端仍通过普通 JSON、归档详情、视频元数据、辅助问询运行态等多条链路把敏感业务明文送到浏览器，尚未满足“严格去明文收口”的要求。

## What Changes

- 建立后端“数据出口分级与明文例外边界”，逐一审计并规范所有对前端提供数据的接口、流、下载、媒体播放和运行态返回，明确哪些必须彻底收口、哪些只允许保留最小必要明文。
- 新增强制规则：旅客画像、高风险名单、管理用户实名字段、审计日志、问询策略、追问内容、记忆内容、转写内容、归档文本内容、导入失败明细、OCR 识别结果、对象存储定位信息等，默认不得再以明文 JSON 或 DOM 文本形式交付浏览器。
- 将用户端、管理端、辅助问询端、归档端的敏感展示统一改造为“服务端带水印受保护资产”，并移除依赖前端持有完整敏感数组、本地筛选、本地详情拼装和本地缓存敏感状态的逻辑。
- 重构辅助问询运行链路：前端不再长期持有或重复回传完整明文旅客画像、记忆上下文、问答历史、AI 结果、转写文本和归档快照，流程推进改为基于后端持有的受保护会话状态完成。
- 重构问询归档链路：归档列表、归档详情、轮次文本、视频元数据和对象存储定位信息不再以明文字段返回前端，改为受保护详情块和不泄露内部路径的受控媒体访问句柄。
- 收口或下线仅供旧前端展示逻辑使用的明文业务接口，保留的明文接口仅限登录令牌、当前操作者最小身份信息、非敏感系统配置、空白模板下载和用户主动录入内容提交等必要边界。
- **BREAKING**：现有依赖普通列表接口、本地敏感数据缓存、本地过滤、本地详情拼装、前端归档组装、前端明文 OCR / 记忆 / 转写消费的逻辑必须整体迁移；相关接口返回结构将改为受保护资产引用、最小元数据或后端驱动句柄。

## Capabilities

### New Capabilities
- `sensitive-data-egress-policy`: 定义系统所有后端到前端数据出口的敏感分级、明文例外边界、禁止下发类型和强制收口规则。
- `protected-business-data-delivery`: 定义旅客画像、高风险名单、管理用户、审计日志、导入结果、OCR 结果等业务文本数据必须通过服务端受保护资产交付的规则。
- `protected-inquiry-runtime`: 定义辅助问询流程中旅客画像、AI 输出、记忆上下文、转写与轮次摘要不得以明文进入浏览器长期状态，并由后端受保护会话驱动流程推进。
- `watermarked-archive-media-delivery`: 定义问询归档文本、归档列表、归档详情、视频访问元数据与媒体播放的受保护交付规则，以及水印与存储路径隐藏要求。

### Modified Capabilities
- 无

## Impact

- 影响代码：
  - `apps/backend/internal/profile/*`
  - `apps/backend/internal/auth/*`
  - `apps/backend/internal/audit/*`
  - `apps/backend/internal/inquiry/*`
  - `apps/backend/internal/archive/*`
  - `apps/backend/internal/memory/*`
  - `apps/backend/internal/settings/*`
  - `apps/backend/internal/sensitive/*`
  - `apps/frontend/src/app/profile-service.ts`
  - `apps/frontend/src/app/admin-service.ts`
  - `apps/frontend/src/app/audit-service.ts`
  - `apps/frontend/src/app/inquiry-protected-service.ts`
  - `apps/frontend/src/app/archive-service.ts`
  - `apps/frontend/src/app/memory-service.ts`
  - `apps/frontend/src/app/ai-service.ts`
  - `apps/frontend/src/views/UserHomeView.vue`
  - `apps/frontend/src/views/UserAskView.vue`
  - `apps/frontend/src/views/UserAuditView.vue`
  - `apps/frontend/src/views/ManagementView.vue`
  - `apps/frontend/src/views/UserLayoutView.vue`
- 影响接口与数据出口：
  - `/api/passenger-profiles`
  - `/api/passenger-profiles/protected`
  - `/api/passenger-profiles/imports`
  - `/api/passenger-profiles/ocr/idcard`
  - `/api/admin/profiles`
  - `/api/admin/profiles/protected`
  - `/api/admin/watchlist`
  - `/api/admin/watchlist/protected`
  - `/api/admin/users`
  - `/api/admin/users/protected`
  - `/api/audit-logs`
  - `/api/audit-logs/protected`
  - `/api/inquiry/memory-context`
  - `/api/inquiry/memory-updates`
  - `/api/inquiry/protected/*`
  - `/api/inquiry/archives`
  - `/api/admin/inquiry-archives`
  - `/api/admin/inquiry-archives/:id`
  - `/api/admin/inquiry-archives/videos/:id/stream`
  - `/api/asr/transcribe`
  - 旧版 `/api/inquiry/sessions*` 明文接口
- 依赖与相关系统：
  - 服务端敏感渲染与水印框架
  - 路由级数据出口分类与审计补充
  - 后端驱动的辅助问询会话状态
  - 受保护归档媒体访问抽象层
  - 前端 DLP 守卫与受保护页面状态最小化
