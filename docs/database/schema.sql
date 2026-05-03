-- IPRA database schema
-- 用途：
-- 1. 供 DBA / 运维在新环境中手工初始化数据库
-- 2. 后端运行时不负责自动建表、不负责自动补测试数据

CREATE TABLE IF NOT EXISTS system_user (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(64) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    real_name VARCHAR(64) NOT NULL,
    badge_number VARCHAR(64) NOT NULL UNIQUE,
    role_code VARCHAR(32) NOT NULL,
    status SMALLINT NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_system_user_username ON system_user(username);
CREATE INDEX IF NOT EXISTS idx_system_user_badge_number ON system_user(badge_number);

COMMENT ON TABLE system_user IS '系统操作员账号表';
COMMENT ON COLUMN system_user.id IS '主键';
COMMENT ON COLUMN system_user.username IS '登录账号';
COMMENT ON COLUMN system_user.password_hash IS 'Bcrypt加密后的密码';
COMMENT ON COLUMN system_user.real_name IS '操作员真实姓名';
COMMENT ON COLUMN system_user.badge_number IS '警号/工号，用于前端和视频回放生成防泄密数字水印';
COMMENT ON COLUMN system_user.role_code IS '角色代码（如 admin、inspector），用于基础权限控制';
COMMENT ON COLUMN system_user.status IS '账号状态（1:启用, 0:停用），不使用物理删除以保障历史审计链路完整';
COMMENT ON COLUMN system_user.created_at IS '账号创建时间';
COMMENT ON COLUMN system_user.updated_at IS '账号最后更新时间';

CREATE TABLE IF NOT EXISTS import_batch_log (
    id BIGSERIAL PRIMARY KEY,
    batch_no VARCHAR(64) NOT NULL UNIQUE,
    operator_id BIGINT NOT NULL REFERENCES system_user(id),
    file_name VARCHAR(255) NOT NULL,
    import_type VARCHAR(32) NOT NULL,
    status VARCHAR(32) NOT NULL,
    total_rows INT NOT NULL DEFAULT 0,
    success_count INT NOT NULL DEFAULT 0,
    failed_count INT NOT NULL DEFAULT 0,
    error_details JSONB,
    started_at TIMESTAMP WITH TIME ZONE,
    finished_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_import_batch_log_status ON import_batch_log(status);

COMMENT ON TABLE import_batch_log IS '离线文件批量导入管控与日志表';
COMMENT ON COLUMN import_batch_log.id IS '主键';
COMMENT ON COLUMN import_batch_log.batch_no IS '批次流水号';
COMMENT ON COLUMN import_batch_log.operator_id IS '导入操作人，对应 system_user.id';
COMMENT ON COLUMN import_batch_log.file_name IS '导入文件名';
COMMENT ON COLUMN import_batch_log.import_type IS '导入类型（如 BASE_PROFILE、HIGH_RISK）';
COMMENT ON COLUMN import_batch_log.status IS '导入状态（queued、parsing、success、partial_failed、failed）';
COMMENT ON COLUMN import_batch_log.total_rows IS '导入文件总行数';
COMMENT ON COLUMN import_batch_log.success_count IS '成功写入行数';
COMMENT ON COLUMN import_batch_log.failed_count IS '失败行数';
COMMENT ON COLUMN import_batch_log.error_details IS '以 JSON 数组形式存储导入失败的行号及原因，避免单独创建明细表';
COMMENT ON COLUMN import_batch_log.started_at IS '开始处理时间';
COMMENT ON COLUMN import_batch_log.finished_at IS '处理完成时间';
COMMENT ON COLUMN import_batch_log.created_at IS '记录创建时间';

CREATE TABLE IF NOT EXISTS passenger_profile (
    id BIGSERIAL PRIMARY KEY,
    document_type VARCHAR(32) NOT NULL,
    document_num VARCHAR(64) NOT NULL,
    issuing_region VARCHAR(64) NOT NULL DEFAULT 'CN',
    full_name VARCHAR(128) NOT NULL,
    gender SMALLINT,
    birth_date DATE,
    is_high_risk BOOLEAN NOT NULL DEFAULT FALSE,
    identity_details JSONB,
    dimension_data JSONB,
    latest_batch_id BIGINT REFERENCES import_batch_log(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_uniq_passenger_doc
    ON passenger_profile(document_type, document_num, issuing_region);

COMMENT ON TABLE passenger_profile IS '旅客全息画像主表（宽表结构）';
COMMENT ON COLUMN passenger_profile.id IS '主键';
COMMENT ON COLUMN passenger_profile.document_type IS '证件类型（如 ID_CARD、PASSPORT）';
COMMENT ON COLUMN passenger_profile.document_num IS '证件号码，现场扫描和检索的核心字段';
COMMENT ON COLUMN passenger_profile.issuing_region IS '签发国家或地区，用于和证件类型、证件号组成复合唯一键';
COMMENT ON COLUMN passenger_profile.full_name IS '统一全名展示字段';
COMMENT ON COLUMN passenger_profile.gender IS '性别（1:男, 2:女, 0:未知）';
COMMENT ON COLUMN passenger_profile.birth_date IS '出生日期';
COMMENT ON COLUMN passenger_profile.is_high_risk IS '高风险标识，供前端显著预警';
COMMENT ON COLUMN passenger_profile.identity_details IS '证件专属动态字段，如身份证住址、民族或护照有效期';
COMMENT ON COLUMN passenger_profile.dimension_data IS '存放导入的行程、案底、职业等多维全息画像，供大模型读取';
COMMENT ON COLUMN passenger_profile.latest_batch_id IS '最近一次写入该画像的导入批次 ID';
COMMENT ON COLUMN passenger_profile.created_at IS '记录创建时间';
COMMENT ON COLUMN passenger_profile.updated_at IS '记录更新时间';

-- 如需联调账号，请由 DBA / 运维手工插入，不再由后端启动自动补齐。
