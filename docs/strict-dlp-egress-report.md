# 严格去明文收口核查报告

更新时间：2026-05-12

## 本次已收口

- 用户端数据检索页面仅通过 `/api/passenger-profiles/protected` 获取检索展示内容
- 用户端辅助问询初始化已切换为后端驱动，前端不再提交完整旅客画像、行程画像和已知事实
- 用户端辅助问询记忆展示仅保留受保护记忆资产，不再额外请求明文记忆上下文
- 用户端归档提交不再把 `minioBucket`、`minioObjectKey`、`videoUrl`、`storedPath` 回传到浏览器侧业务载荷
- 管理端审计日志展示继续使用受保护列表与受保护详情
- 管理端归档视频播放继续走后端代理流 `/api/admin/inquiry-archives/videos/:id/stream`
- 旧 plain inquiry 接口已增加弃用标记，避免继续作为受保护页面依赖

## 保留的明文例外

- `/api/login`
- `/api/auth/me`
- `/api/inquiry/settings`
- `/api/admin/settings/inquiry`
- 空白模板下载
- 用户主动输入并提交的表单值

## 当前实现边界

- 管理端基础画像、高风险名单、管理用户的展示链路已走 protected list，但编辑态仍按最小明文字段加载与提交
- 归档列表与详情当前已经从类型层收紧，前端不再依赖被禁止的 MinIO 定位字段
- OCR 与导入摘要仍保留必要状态提示，但后续仍应继续把更细粒度的失败明细和识别回显补成受保护详情

## 自动化核查

- 脚本：`scripts/check-strict-dlp-egress.sh`
- 已检查：
  - 受保护页面和服务中是否残留被禁止的 plain sensitive API 调用
  - 是否残留 `minioBucket` / `minioObjectKey` / `videoUrl` / `storedPath`
  - 是否继续使用浏览器持久化存储保存敏感业务文本
  - 关键 protected service 调用是否存在

## 残余风险

- 管理端归档列表与详情目前仍是“去字段暴露”方案，后续最好进一步补成真正的 protected archive row / protected archive detail 资产
- OCR 返回结构仍保留识别结果码和必要流程字段，若采购口径要求更严，应继续把成功识别回显改为 protected OCR 卡片
- 导入结果当前仍以摘要方式提示成功/失败，若后续要查看行级失败详情，应统一切到 protected detail 方案
