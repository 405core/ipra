## Why

采购需求书在 3.2 和 3.3 中明确要求系统实现“数据不落地、不外流”、禁止复制粘贴和导出，并对所有前端展示内容强制叠加可溯源水印。当前系统仍以 DOM 文本方式展示大量服务端业务数据，前端可直接读取原始字段，无法满足高敏场景下的防泄露要求。

## What Changes

- 新增服务端敏感数据图像化呈现能力：所有由服务端返回并展示给用户或管理员的业务数据，不再以原始文本 DOM 渲染，而改为由服务端生成带强制数字水印的图片后返回前端展示。
- 新增敏感数据分级渲染规则：按钮、输入框、筛选器、分页等本地交互控件保留 DOM；旅客画像、检索结果、日志记录、审计详情、辅助问询返回结果等服务端数据内容改为图片化展示。
- 新增图片压缩与分层传输能力：按列表、详情、弹窗等场景输出不同尺寸和压缩等级的 WebP/PNG 资源，控制带宽和渲染成本。
- 新增前端 DLP 交互限制：禁用复制、剪切、粘贴、右键、文本选中、拖拽、打印及常见快捷键，并对拦截事件记录审计日志。
- 新增敏感图片响应约束：敏感图片接口默认无缓存、短时有效、按会话和操作员动态嵌入水印，支持泄露溯源。
- **BREAKING**：现有依赖前端获取原始服务端文本数据后再进行本地过滤、拼装、复制或详情渲染的页面逻辑，需要改为基于服务端查询和图片渲染结果工作。

## Capabilities

### New Capabilities
- `watermarked-image-data-rendering`: 定义服务端业务数据必须由服务端渲染为带内嵌水印的图片后再交付前端展示的规则，以及图片压缩、缓存和传输要求。
- `interaction-dlp-controls`: 定义前端对复制、剪贴板、打印、右键、拖拽等高风险交互的禁止规则，以及对应的审计留痕要求。

### Modified Capabilities
- None.

## Impact

- Affected code:
  - `apps/frontend/src/views/UserHomeView.vue`
  - `apps/frontend/src/views/UserAuditView.vue`
  - `apps/frontend/src/views/ManagementView.vue`
  - `apps/frontend/src/views/UserAskView.vue`
  - `apps/frontend/src/app/profile-service.ts`
  - `apps/frontend/src/app/admin-service.ts`
  - `apps/frontend/src/app/audit-service.ts`
  - backend profile, audit, auth, inquiry handlers and new image rendering endpoints
- Affected APIs:
  - search/list/detail style APIs will need image-oriented response shapes or companion image endpoints
  - new sensitive image delivery endpoints and watermark context handling
  - new audit events for blocked copy/print/clipboard operations
- Dependencies / systems:
  - server-side image rendering library or canvas pipeline
  - image compression/encoding support for WebP/PNG
  - watermark context sourced from authenticated session and request metadata
  - browser-side DLP interception and no-store response policy
