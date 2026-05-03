# 数据库结构

## 概览

- 当前后端使用 **PostgreSQL**。
- 当前业务数据库表共 **1 张**：`system_user`。
- 旧的 `user` / `users` 表已经废弃，并在后端启动迁移中删除。
- 后端启动时会自动迁移表结构，并补齐测试账号：
  - `admin / 123`
  - `user / 123`

## 表清单

| 表名 | 作用 |
| --- | --- |
| `system_user` | 系统操作员账号表，用于登录认证、基础权限控制、人员身份标识和工号/警号水印关联。 |

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

### 当前测试账号

| 用户名 | 密码 | 角色 | 警号/工号 | 说明 |
| --- | --- | --- | --- | --- |
| `admin` | `123` | `admin` | `100001` | 管理员测试账号 |
| `user` | `123` | `inspector` | `100002` | 检查员测试账号 |

## 维护说明

- 后续如果新增业务表，请同步更新本页。
- 如果修改认证字段、角色编码或状态定义，也应同步更新本页，避免前后端字段认知不一致。
