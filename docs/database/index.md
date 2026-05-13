# 数据库结构

## 概览

- 当前后端使用 **PostgreSQL**。
- 当前业务主表共 **4 张**：`system_user`、`import_batch_log`、`passenger_profile`、`high_risk_watchlist`。
- 数据库结构由 DBA / 运维手工维护，后端启动时不会自动建表或迁移。
- 当前活动建表 SQL 见 [schema.sql](/database/schema.sql)。
- 你提供的旧版 SQL 已单独保存在 [schema-legacy.sql](/database/schema-legacy.sql)。

## 表清单

| 表名 | 作用 |
| --- | --- |
| `system_user` | 系统账号表，用于登录认证、权限控制和水印信息。 |
| `import_batch_log` | 导入批次日志表，用于记录基础画像和高风险名单导入结果。 |
| `passenger_profile` | 旅客基础画像表。 |
| `high_risk_watchlist` | 高风险名单表。 |

## system_user

| 字段名 | 类型 | 说明 |
| --- | --- | --- |
| `id` | `BIGINT` | 主键。 |
| `password_hash` | `VARCHAR(255)` | Bcrypt 密码哈希。 |
| `work_id` | `VARCHAR(64)` | 登录工号，唯一。 |
| `status` | `VARCHAR(32)` | 账号状态，当前使用 `active` / `disabled`。 |
| `created_at` | `TIMESTAMP` | 创建时间。 |
| `updated_at` | `TIMESTAMP` | 更新时间。 |
| `name` | `VARCHAR(64)` | 姓名。 |
| `role` | `VARCHAR(32)` | 角色，当前使用 `admin` / `user`。 |

### 当前口径

- 登录字段是 `work_id`。
- 管理员入口是 `/admin/home`。
- 员工入口是 `/home`。
- 用户只允许停用，不做物理删除。

## import_batch_log

该表保留，用于记录两类导入：

- `BASE_PROFILE`
- `HIGH_RISK`

当前后端仍会写入：

- 批次号
- 操作人
- 文件名
- 导入状态
- 总行数、成功数、失败数
- 失败明细

## passenger_profile

| 字段名 | 类型 | 说明 |
| --- | --- | --- |
| `id` | `BIGINT` | 主键。 |
| `document_num` | `VARCHAR(64)` | 证件号码，唯一。 |
| `full_name` | `VARCHAR(128)` | 姓名。 |
| `profile_data` | `JSONB` | 基础画像 JSON，承载个人基本信息、行程、历史出行、职业背景、违法犯罪记录等。 |
| `created_at` | `TIMESTAMPTZ` | 创建时间。 |
| `updated_at` | `TIMESTAMPTZ` | 更新时间。 |

### 说明

- 基础画像单独存一张表。
- 高风险信息不再混在这张表里。
- 检索时以后端联合 `high_risk_watchlist` 判断是否高风险。

## high_risk_watchlist

| 字段名 | 类型 | 说明 |
| --- | --- | --- |
| `id` | `BIGINT` | 主键。 |
| `document_num` | `VARCHAR(64)` | 证件号码，唯一。 |
| `risk_category` | `VARCHAR(64)` | 风险类别代码。导入未提供时为空；导入提供但不属于明确映射时为 `suspicious_purpose`。 |
| `risk_reason` | `TEXT` | 高风险原因或名单说明。 |
| `created_at` | `TIMESTAMPTZ` | 创建时间。 |
| `updated_at` | `TIMESTAMPTZ` | 更新时间。 |

### 说明

- 高风险名单独立一张表。
- 即使某证件号还没有基础画像，也允许先导入高风险名单。
- 风险类别导入映射：`跨境赌博` -> `cross_border_gambling`，`跨境电诈` -> `cross_border_fraud`，`非法务工` -> `illegal_work`，其他非空值 -> `suspicious_purpose`。
- 员工检索时如果只命中高风险名单，也会给出高风险预警。

## 导入模板

当前系统提供两个模板下载接口：

- `/api/import-templates/passenger-profile.xlsx`
- `/api/import-templates/high-risk-watchlist.xlsx`

设计原则：

- 基础画像模板尽量少填，但不缺业务必需字段。
- 高风险名单模板只要求证件号码，高风险原因为选填。
- 不保留“来源”字段，避免增加填写负担。

## 维护说明

- 新环境建库或结构调整时，应以 [schema.sql](/database/schema.sql) 为准。
- 如果需要追溯旧结构，可参考 [schema-legacy.sql](/database/schema-legacy.sql)。
