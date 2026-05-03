# 数据库结构

## 概览

- 当前后端使用 **PostgreSQL**。
- 当前业务数据库表共 **3 张**：`system_user`、`import_batch_log`、`passenger_profile`。
- 数据库结构由 DBA / 运维手工维护，后端启动时**不会**自动建表、删表或补测试数据。
- 标准建表 SQL 统一见 [schema.sql](/home/zheye/project/xsheng/ipra/docs/database/schema.sql:1)。
- 需求讨论中如果出现 `sys_user`，当前仓库统一落地为 `system_user`，避免和现有登录鉴权实现产生双表分叉。

## 表清单

| 表名 | 作用 |
| --- | --- |
| `system_user` | 系统操作员账号表，用于登录认证、基础权限控制、人员身份标识和工号/警号水印关联。 |
| `import_batch_log` | 离线画像文件导入批次日志表，用于记录导入进度、成功/失败汇总和错误明细。 |
| `passenger_profile` | 旅客全息画像宽表，用于按证件快速检索并承载供大模型使用的多维画像数据。 |

## system_user

### 表作用

`system_user` 用于保存系统登录账号信息。  
当前前后端认证、登录态校验、角色跳转都依赖这张表。

### 字段说明

| 字段名 | 类型 | 约束 | 作用 |
| --- | --- | --- | --- |
| `id` | `BIGINT` | 主键，自增 | 用户主键。 |
| `username` | `VARCHAR(64)` | `UNIQUE`，`NOT NULL` | 登录账号，登录接口使用该字段认证。 |
| `password_hash` | `VARCHAR(255)` | `NOT NULL` | Bcrypt 加密后的密码，不保存明文密码。 |
| `real_name` | `VARCHAR(64)` | `NOT NULL` | 操作员真实姓名，用于前端展示和业务识别。 |
| `badge_number` | `VARCHAR(64)` | `UNIQUE`，`NOT NULL` | 警号/工号，用于人员唯一标识，也用于前端和视频回放数字水印关联。 |
| `role_code` | `VARCHAR(32)` | `NOT NULL` | 角色代码，用于基础权限控制。当前已使用值：`admin`、`inspector`。 |
| `status` | `SMALLINT` | `NOT NULL`，默认 `1` | 账号状态。`1` 表示启用，`0` 表示停用。用于逻辑停用账号，不做物理删除。 |
| `created_at` | `TIMESTAMP` | `NOT NULL` | 账号创建时间。 |
| `updated_at` | `TIMESTAMP` | `NOT NULL` | 账号最后更新时间。 |

### 当前数据约定

- `username` 用于登录。
- `role_code` 决定前端路由和基础权限：
  - `admin`：管理员入口
  - `inspector`：检查员工作台入口
- `status = 0` 的账号不允许登录。

### 联调账号约定

| 用户名 | 密码 | 角色 | 警号/工号 | 说明 |
| --- | --- | --- | --- | --- |
| `admin` | `123` | `admin` | `100001` | 管理员测试账号 |
| `user` | `123` | `inspector` | `100002` | 检查员测试账号 |

- 上述账号不再由后端启动自动补齐；如环境缺失，需要由 DBA / 运维手工创建。

## import_batch_log

### 表作用

`import_batch_log` 用于记录本地 Excel / CSV 文件的离线批量导入过程，支撑导入任务追踪、失败排查、审计留痕和后续画像回溯。

### 字段说明

| 字段名 | 类型 | 约束 | 作用 |
| --- | --- | --- | --- |
| `id` | `BIGINT` | 主键，自增 | 批次日志主键。 |
| `batch_no` | `VARCHAR(64)` | `UNIQUE`，`NOT NULL` | 批次流水号，用于前后端追踪单次导入任务。 |
| `operator_id` | `BIGINT` | `NOT NULL`，外键 -> `system_user.id` | 发起导入的操作员。 |
| `file_name` | `VARCHAR(255)` | `NOT NULL` | 原始导入文件名。 |
| `import_type` | `VARCHAR(32)` | `NOT NULL` | 导入类型，例如 `BASE_PROFILE`、`HIGH_RISK`。 |
| `status` | `VARCHAR(32)` | `NOT NULL`，索引 | 导入状态。当前约定值：`queued`、`parsing`、`success`、`partial_failed`、`failed`。 |
| `total_rows` | `INT` | `NOT NULL`，默认 `0` | 文件总行数。 |
| `success_count` | `INT` | `NOT NULL`，默认 `0` | 成功写入的记录数。 |
| `failed_count` | `INT` | `NOT NULL`，默认 `0` | 失败记录数。 |
| `error_details` | `JSONB` | 可空 | 记录失败行明细，例如行号、错误码、原因和原始数据。 |
| `started_at` | `TIMESTAMP WITH TIME ZONE` | 可空 | 开始解析/写入时间。 |
| `finished_at` | `TIMESTAMP WITH TIME ZONE` | 可空 | 导入任务结束时间。 |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | `NOT NULL` | 日志创建时间。 |

### 设计约定

- `error_details` 采用 JSON 数组保存失败明细，避免为导入错误单独拆分明细表。
- 推荐结构示例：

```json
[
  {
    "rowNo": 12,
    "errorCode": "MISSING_DOCUMENT_NUM",
    "message": "证件号码不能为空",
    "rawData": {
      "name": "张三"
    }
  }
]
```

## passenger_profile

### 表作用

`passenger_profile` 是旅客全息画像主表。它把“证件号快速匹配”所依赖的稳定字段独立成列和索引，把不同国家证件差异字段、以及供大模型读取的多维画像内容沉淀到 `JSONB` 中。

### 字段说明

| 字段名 | 类型 | 约束 | 作用 |
| --- | --- | --- | --- |
| `id` | `BIGINT` | 主键，自增 | 画像主键。 |
| `document_type` | `VARCHAR(32)` | `NOT NULL`，复合唯一索引 | 证件类型，如 `ID_CARD`、`PASSPORT`。 |
| `document_num` | `VARCHAR(64)` | `NOT NULL`，复合唯一索引 | 证件号码，现场扫描和手动输入的核心检索字段。 |
| `issuing_region` | `VARCHAR(64)` | `NOT NULL`，默认 `CN`，复合唯一索引 | 证件签发国家/地区。 |
| `full_name` | `VARCHAR(128)` | `NOT NULL` | 统一全名展示字段。 |
| `gender` | `SMALLINT` | 可空 | 性别。`1` 男，`2` 女，`0` 未知。 |
| `birth_date` | `DATE` | 可空 | 出生日期。 |
| `is_high_risk` | `BOOLEAN` | `NOT NULL`，默认 `FALSE` | 是否高风险人员，前端用于显著预警。 |
| `identity_details` | `JSONB` | 可空 | 存放证件类型专属字段，如身份证住址、民族、护照有效期等。 |
| `dimension_data` | `JSONB` | 可空 | 存放个人基本信息、订票/行程、历史出行、职业背景、违法犯罪记录等全量维度数据。 |
| `latest_batch_id` | `BIGINT` | 可空，外键 -> `import_batch_log.id` | 最近一次更新该画像的导入批次。 |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | `NOT NULL` | 画像创建时间。 |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | `NOT NULL` | 画像最后更新时间。 |

### 设计约定

- 通过 `(document_type, document_num, issuing_region)` 建立复合唯一索引，既防止重复导入，也支撑证件号快速匹配。
- 稳定、高频过滤字段列化存储；变化大、国家差异强或供大模型直接消费的数据统一放入 `JSONB`。
- `latest_batch_id` 用于追溯当前画像最近一次来源批次，便于审计和问题排查。

## 维护说明

- `import_batch_log` 与 `passenger_profile` 均依赖 `system_user` 作为操作人来源表。
- `passenger_profile` 的核心检索键为 `(document_type, document_num, issuing_region)` 复合唯一索引。
- `error_details`、`identity_details`、`dimension_data` 三个字段统一采用 `JSONB`，用于兼顾解析性能与结构灵活性。
- 新环境建库或结构变更时，应优先更新并执行 [schema.sql](/home/zheye/project/xsheng/ipra/docs/database/schema.sql:1)，而不是依赖后端启动时自动迁移。
- 后续如果新增业务表，请同步更新本页。
- 如果修改认证字段、角色编码或状态定义，也应同步更新本页，避免前后端字段认知不一致。
