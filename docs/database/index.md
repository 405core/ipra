# 数据库结构

## 概览

- 当前后端使用 **PostgreSQL**。
- 当前核心业务表共 **4 张**：`system_user`、`import_batch_log`、`passenger_profile`、`high_risk_watchlist`。
- 数据库结构由 DBA / 运维手工维护，后端启动时**不会**自动建表、删表或补测试数据。
- 标准建表 SQL 统一见 [schema.sql](/home/zheye/project/xsheng/ipra/docs/database/schema.sql:1)。

## 设计原则

- 基础画像和高风险名单分表存储，不混写。
- `passenger_profile` 只保存旅客基础画像。
- `high_risk_watchlist` 只保存高风险名单事实。
- 查询时由服务层同时读取两张表并合并结果，以满足“展示画像 + 高风险预警”的需求。
- 画像维度较多，但不拆成多张明细表；除证件主键和姓名外，其余画像内容统一放在 `profile_data JSONB`。

## 表清单

| 表名 | 作用 |
| --- | --- |
| `system_user` | 系统操作员账号表，用于登录认证、基础权限控制、人员身份标识和工号/警号水印关联。 |
| `import_batch_log` | 离线导入批次日志表，用于记录导入进度、成功/失败汇总和错误明细。 |
| `passenger_profile` | 旅客基础画像表，用于按证件快速检索并承载供大模型使用的全息画像 JSON。 |
| `high_risk_watchlist` | 高风险名单表，用于证件命中预警和名单来源追溯。 |

## system_user

`system_user` 用于保存系统登录账号信息。当前前后端认证、登录态校验、角色跳转都依赖这张表。

## import_batch_log

`import_batch_log` 用于记录本地 Excel / CSV 文件的离线导入过程，支撑任务追踪、失败排查、审计留痕和数据回溯。

关键字段：

- `batch_no`：批次流水号
- `import_type`：`BASE_PROFILE` 或 `HIGH_RISK`
- `status`：`parsing`、`success`、`partial_failed`、`failed`
- `error_details`：失败行明细 JSON

推荐错误结构示例：

```json
[
  {
    "rowNo": 12,
    "errorCode": "INVALID_ROW",
    "message": "证件号码不能为空",
    "rawData": {
      "姓名": "张三"
    }
  }
]
```

## passenger_profile

`passenger_profile` 是旅客基础画像主表。

字段：

| 字段名 | 类型 | 约束 | 作用 |
| --- | --- | --- | --- |
| `id` | `BIGINT` | 主键，自增 | 画像主键。 |
| `document_num` | `VARCHAR(64)` | `NOT NULL`，唯一索引 | 证件号码。 |
| `full_name` | `VARCHAR(128)` | `NOT NULL` | 统一全名展示字段。 |
| `profile_data` | `JSONB` | 可空 | 旅客基础画像 JSON。 |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | `NOT NULL` | 记录创建时间。 |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | `NOT NULL` | 记录更新时间。 |

`profile_data` 至少覆盖以下维度，以对应需求书 `2.1.2`：

- `basicInfo`：个人基本信息
- `documentInfo`：证件补充信息
- `tripInfo`：订票与当前行程信息
- `travelHistory`：历史出行记录
- `occupation`：职业背景
- `crimeRecords`：违法犯罪记录

## high_risk_watchlist

`high_risk_watchlist` 是高风险名单事实表。

字段：

| 字段名 | 类型 | 约束 | 作用 |
| --- | --- | --- | --- |
| `id` | `BIGINT` | 主键，自增 | 名单主键。 |
| `document_num` | `VARCHAR(64)` | `NOT NULL`，唯一索引 | 证件号码。 |
| `risk_reason` | `TEXT` | `NOT NULL`，默认空字符串 | 高风险原因或名单说明。 |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | `NOT NULL` | 记录创建时间。 |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | `NOT NULL` | 记录更新时间。 |

这是一个刻意保持极简的名单表。当前需求只要求：

- 支持导入高风险人员名单
- 证件匹配时触发显著预警

因此不额外拆分风险等级、状态、生效时间等字段；后续若采购方明确提出再增加。

## 导入模板

当前仓库提供两个独立模板下载地址：

- `/api/import-templates/passenger-profile.xlsx`
- `/api/import-templates/high-risk-watchlist.xlsx`

模板策略：

- 基础画像：单 sheet 模板，覆盖需求书要求的主要画像字段
- 高风险名单：单 sheet 模板，只要求证件号码，支持可选填写高风险原因

这样更符合当前实现，也比多 sheet 模板更简单直接。

## 查询说明

两张业务表需要联合使用，但不要求数据库层一定写 `JOIN`。

当前推荐做法是：

1. 先查 `passenger_profile`
2. 再查 `high_risk_watchlist`
3. 服务层按 `document_num` 合并结果
4. 若命中名单，则返回 `isHighRisk = true`
5. 若“名单有、画像没有”，也返回一条可预警结果，并提示暂无基础画像

## 维护说明

- `import_batch_log`、`passenger_profile`、`high_risk_watchlist` 均依赖 `system_user` 作为操作人来源表。
- `passenger_profile` 与 `high_risk_watchlist` 的核心检索键均为 `document_num`。
- 新环境建库或结构变更时，应优先更新并执行 [schema.sql](/home/zheye/project/xsheng/ipra/docs/database/schema.sql:1)，而不是依赖后端启动时自动迁移。
