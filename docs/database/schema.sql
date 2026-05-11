-- IPRA database schema
-- 用途：
-- 1. 供 DBA / 运维在新环境中手工初始化数据库
-- 2. 后端运行时不负责自动建表、不负责自动补测试数据

CREATE TABLE IF NOT EXISTS "system_user" (
    id BIGSERIAL PRIMARY KEY,
    password_hash VARCHAR(255) NOT NULL,
    work_id VARCHAR(64) NOT NULL UNIQUE,
    status VARCHAR(32) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(64) NOT NULL,
    role VARCHAR(32) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_system_user_work_id ON "system_user"(work_id);

COMMENT ON TABLE "system_user" IS '系统操作员账号表';
COMMENT ON COLUMN "system_user".id IS '主键';
COMMENT ON COLUMN "system_user".password_hash IS 'Bcrypt加密后的密码';
COMMENT ON COLUMN "system_user".work_id IS '工号，用于登录和前端水印';
COMMENT ON COLUMN "system_user".status IS '账号状态（active:启用, disabled:停用）';
COMMENT ON COLUMN "system_user".created_at IS '账号创建时间';
COMMENT ON COLUMN "system_user".updated_at IS '账号最后更新时间';
COMMENT ON COLUMN "system_user".name IS '用户姓名';
COMMENT ON COLUMN "system_user".role IS '角色代码（admin、user）';

CREATE TABLE IF NOT EXISTS import_batch_log (
    id BIGSERIAL PRIMARY KEY,
    batch_no VARCHAR(64) NOT NULL UNIQUE,
    operator_id BIGINT NOT NULL REFERENCES "system_user"(id),
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
    document_num VARCHAR(64) NOT NULL,
    full_name VARCHAR(128) NOT NULL,
    profile_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_uniq_passenger_doc
    ON passenger_profile(document_num);

COMMENT ON TABLE passenger_profile IS '旅客基础画像表';
COMMENT ON COLUMN passenger_profile.id IS '主键';
COMMENT ON COLUMN passenger_profile.document_num IS '证件号码，现场扫描和检索的核心字段';
COMMENT ON COLUMN passenger_profile.full_name IS '统一全名展示字段';
COMMENT ON COLUMN passenger_profile.profile_data IS '旅客基础画像 JSON，覆盖个人基本信息、行程、历史出行、职业背景、违法犯罪记录等维度';
COMMENT ON COLUMN passenger_profile.created_at IS '记录创建时间';
COMMENT ON COLUMN passenger_profile.updated_at IS '记录更新时间';

CREATE TABLE IF NOT EXISTS high_risk_watchlist (
    id BIGSERIAL PRIMARY KEY,
    document_num VARCHAR(64) NOT NULL,
    risk_reason TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_uniq_watchlist_doc
    ON high_risk_watchlist(document_num);

COMMENT ON TABLE high_risk_watchlist IS '高风险名单表';
COMMENT ON COLUMN high_risk_watchlist.id IS '主键';
COMMENT ON COLUMN high_risk_watchlist.document_num IS '证件号码，用于和基础画像做证件级关联';
COMMENT ON COLUMN high_risk_watchlist.risk_reason IS '高风险原因或名单说明';
COMMENT ON COLUMN high_risk_watchlist.created_at IS '记录创建时间';
COMMENT ON COLUMN high_risk_watchlist.updated_at IS '记录更新时间';

CREATE TABLE IF NOT EXISTS agent_memory_item (
    id BIGSERIAL PRIMARY KEY,
    scope_type VARCHAR(32) NOT NULL,
    scope_id VARCHAR(128) NOT NULL,
    memory_type VARCHAR(32) NOT NULL,
    title VARCHAR(128) NOT NULL DEFAULT '',
    content TEXT NOT NULL,
    evidence JSONB,
    confidence NUMERIC(4,3),
    source VARCHAR(64) NOT NULL DEFAULT '',
    status VARCHAR(32) NOT NULL DEFAULT 'active',
    content_hash CHAR(64) NOT NULL,
    created_by_id BIGINT REFERENCES "system_user"(id),
    updated_by_id BIGINT REFERENCES "system_user"(id),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_agent_memory_scope_type
        CHECK (scope_type IN ('session', 'passenger', 'rule')),
    CONSTRAINT chk_agent_memory_type
        CHECK (memory_type IN ('fact', 'gap', 'inconsistency', 'evidence', 'procedure')),
    CONSTRAINT chk_agent_memory_status
        CHECK (status IN ('active', 'inactive')),
    CONSTRAINT chk_agent_memory_confidence
        CHECK (confidence IS NULL OR (confidence >= 0 AND confidence <= 1))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_uniq_agent_memory_content
    ON agent_memory_item(scope_type, scope_id, memory_type, content_hash);

CREATE INDEX IF NOT EXISTS idx_agent_memory_scope
    ON agent_memory_item(scope_type, scope_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_agent_memory_status
    ON agent_memory_item(status);

CREATE INDEX IF NOT EXISTS idx_agent_memory_expires_at
    ON agent_memory_item(expires_at);

COMMENT ON TABLE agent_memory_item IS '智能体记忆条目表';
COMMENT ON COLUMN agent_memory_item.id IS '主键';
COMMENT ON COLUMN agent_memory_item.scope_type IS '记忆作用域类型（session、passenger、rule）';
COMMENT ON COLUMN agent_memory_item.scope_id IS '记忆作用域标识，例如问询会话 ID、旅客 ID 或规则集 ID';
COMMENT ON COLUMN agent_memory_item.memory_type IS '记忆类型（fact、gap、inconsistency、evidence、procedure）';
COMMENT ON COLUMN agent_memory_item.title IS '记忆标题，用于前端轻量展示';
COMMENT ON COLUMN agent_memory_item.content IS '记忆正文';
COMMENT ON COLUMN agent_memory_item.evidence IS '记忆来源证据 JSON';
COMMENT ON COLUMN agent_memory_item.confidence IS '置信度，范围 0-1';
COMMENT ON COLUMN agent_memory_item.source IS '记忆来源，例如 ai-service、operator、system-rule';
COMMENT ON COLUMN agent_memory_item.status IS '状态（active、inactive）';
COMMENT ON COLUMN agent_memory_item.content_hash IS '基于 scope、类型和正文计算的 SHA-256 哈希，用于幂等去重';
COMMENT ON COLUMN agent_memory_item.created_by_id IS '创建操作人，对应 system_user.id';
COMMENT ON COLUMN agent_memory_item.updated_by_id IS '最后更新操作人，对应 system_user.id';
COMMENT ON COLUMN agent_memory_item.expires_at IS '过期时间，空值表示不过期';
COMMENT ON COLUMN agent_memory_item.created_at IS '记录创建时间';
COMMENT ON COLUMN agent_memory_item.updated_at IS '记录更新时间';

CREATE TABLE IF NOT EXISTS system_setting (
    setting_key VARCHAR(128) PRIMARY KEY,
    setting_value TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    updated_by_id BIGINT REFERENCES "system_user"(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE system_setting IS '系统级配置表';
COMMENT ON COLUMN system_setting.setting_key IS '配置键';
COMMENT ON COLUMN system_setting.setting_value IS '配置值';
COMMENT ON COLUMN system_setting.description IS '配置说明';
COMMENT ON COLUMN system_setting.updated_by_id IS '最后更新操作人，对应 system_user.id';
COMMENT ON COLUMN system_setting.created_at IS '记录创建时间';
COMMENT ON COLUMN system_setting.updated_at IS '记录更新时间';

INSERT INTO system_setting (setting_key, setting_value, description)
VALUES ('inquiry.max_interaction_rounds', '3', '管理员设置的总交互轮次上限')
ON CONFLICT (setting_key) DO NOTHING;

-- 如需联调账号，请由 DBA / 运维手工插入，不再由后端启动自动补齐。
