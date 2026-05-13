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
    risk_category VARCHAR(64) NOT NULL DEFAULT '',
    risk_reason TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_uniq_watchlist_doc
    ON high_risk_watchlist(document_num);

COMMENT ON TABLE high_risk_watchlist IS '高风险名单表';
COMMENT ON COLUMN high_risk_watchlist.id IS '主键';
COMMENT ON COLUMN high_risk_watchlist.document_num IS '证件号码，用于和基础画像做证件级关联';
COMMENT ON COLUMN high_risk_watchlist.risk_category IS '风险类别代码（cross_border_gambling、cross_border_fraud、illegal_work、suspicious_purpose），空值表示导入未提供风险类别';
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

CREATE TABLE IF NOT EXISTS inquiry_archive (
    id BIGSERIAL PRIMARY KEY,
    archive_code VARCHAR(64) NOT NULL UNIQUE,
    session_id VARCHAR(128) NOT NULL UNIQUE,
    passenger_profile_id BIGINT REFERENCES passenger_profile(id) ON DELETE SET NULL,
    passenger_document_num VARCHAR(64) NOT NULL DEFAULT '',
    passenger_name VARCHAR(128) NOT NULL DEFAULT '',
    passenger_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
    operator_id BIGINT REFERENCES "system_user"(id) ON DELETE SET NULL,
    operator_work_id VARCHAR(64) NOT NULL DEFAULT '',
    operator_name VARCHAR(64) NOT NULL DEFAULT '',
    final_judgement VARCHAR(32) NOT NULL,
    judgement_reason TEXT NOT NULL,
    judgement_briefing JSONB NOT NULL DEFAULT '{}'::jsonb,
    multimodal_assessment JSONB NOT NULL DEFAULT '{}'::jsonb,
    round_count INT NOT NULL DEFAULT 0,
    total_duration_seconds INT NOT NULL DEFAULT 0,
    transcript_count INT NOT NULL DEFAULT 0,
    status VARCHAR(32) NOT NULL DEFAULT 'archived',
    archived_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_inquiry_archive_final_judgement
        CHECK (final_judgement IN ('concealment', 'falseStatement', 'clear')),
    CONSTRAINT chk_inquiry_archive_status
        CHECK (status IN ('archived', 'voided')),
    CONSTRAINT chk_inquiry_archive_reason_len
        CHECK (char_length(trim(judgement_reason)) >= 20),
    CONSTRAINT chk_inquiry_archive_round_count
        CHECK (round_count >= 0),
    CONSTRAINT chk_inquiry_archive_total_duration
        CHECK (total_duration_seconds >= 0),
    CONSTRAINT chk_inquiry_archive_transcript_count
        CHECK (transcript_count >= 0)
);

CREATE INDEX IF NOT EXISTS idx_inquiry_archive_document_num
    ON inquiry_archive(passenger_document_num);

CREATE INDEX IF NOT EXISTS idx_inquiry_archive_operator_id
    ON inquiry_archive(operator_id);

CREATE INDEX IF NOT EXISTS idx_inquiry_archive_archived_at
    ON inquiry_archive(archived_at DESC);

CREATE INDEX IF NOT EXISTS idx_inquiry_archive_final_judgement
    ON inquiry_archive(final_judgement);

COMMENT ON TABLE inquiry_archive IS '辅助问询第三阶段归档主表';
COMMENT ON COLUMN inquiry_archive.id IS '主键';
COMMENT ON COLUMN inquiry_archive.archive_code IS '归档编号，前端完成态展示和后续检索使用';
COMMENT ON COLUMN inquiry_archive.session_id IS '问询会话 ID，对应前端和 AI-Service 的 sessionId';
COMMENT ON COLUMN inquiry_archive.passenger_profile_id IS '旅客画像 ID，对应 passenger_profile.id，允许为空以保留归档记录';
COMMENT ON COLUMN inquiry_archive.passenger_document_num IS '归档时旅客证件号码快照';
COMMENT ON COLUMN inquiry_archive.passenger_name IS '归档时旅客姓名快照';
COMMENT ON COLUMN inquiry_archive.passenger_snapshot IS '归档时旅客画像、行程、高风险标记等完整快照 JSON';
COMMENT ON COLUMN inquiry_archive.operator_id IS '归档操作人，对应 system_user.id，允许为空以保留历史归档';
COMMENT ON COLUMN inquiry_archive.operator_work_id IS '归档操作人工号快照';
COMMENT ON COLUMN inquiry_archive.operator_name IS '归档操作人姓名快照';
COMMENT ON COLUMN inquiry_archive.final_judgement IS '最终判定（concealment、falseStatement、clear）';
COMMENT ON COLUMN inquiry_archive.judgement_reason IS '检查员最终判定详细理由，至少 20 字';
COMMENT ON COLUMN inquiry_archive.judgement_briefing IS '第三阶段归档前系统摘要 JSON';
COMMENT ON COLUMN inquiry_archive.multimodal_assessment IS '多模态综合研判 JSON，包含风险提示、证据摘要和限制说明';
COMMENT ON COLUMN inquiry_archive.round_count IS '已归档问询轮次数';
COMMENT ON COLUMN inquiry_archive.total_duration_seconds IS '已归档采样总时长，单位秒';
COMMENT ON COLUMN inquiry_archive.transcript_count IS '已归档转写条数';
COMMENT ON COLUMN inquiry_archive.status IS '归档状态（archived:已归档, voided:已作废）';
COMMENT ON COLUMN inquiry_archive.archived_at IS '归档完成时间';
COMMENT ON COLUMN inquiry_archive.created_at IS '记录创建时间';
COMMENT ON COLUMN inquiry_archive.updated_at IS '记录更新时间';

CREATE TABLE IF NOT EXISTS inquiry_archive_round (
    id BIGSERIAL PRIMARY KEY,
    archive_id BIGINT NOT NULL REFERENCES inquiry_archive(id) ON DELETE CASCADE,
    round_no INT NOT NULL,
    round_client_id VARCHAR(128) NOT NULL DEFAULT '',
    title VARCHAR(255) NOT NULL DEFAULT '',
    focus TEXT NOT NULL DEFAULT '',
    strategy_note TEXT NOT NULL DEFAULT '',
    questions JSONB NOT NULL DEFAULT '[]'::jsonb,
    transcripts JSONB NOT NULL DEFAULT '[]'::jsonb,
    answer_text TEXT NOT NULL DEFAULT '',
    round_summary TEXT NOT NULL DEFAULT '',
    humanomni_summary TEXT NOT NULL DEFAULT '',
    action_observations JSONB NOT NULL DEFAULT '[]'::jsonb,
    risk_hints JSONB NOT NULL DEFAULT '[]'::jsonb,
    duration_seconds INT NOT NULL DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_inquiry_archive_round_no
        CHECK (round_no > 0),
    CONSTRAINT chk_inquiry_archive_round_duration
        CHECK (duration_seconds >= 0),
    CONSTRAINT uq_inquiry_archive_round
        UNIQUE (archive_id, round_no)
);

CREATE INDEX IF NOT EXISTS idx_inquiry_archive_round_archive_id
    ON inquiry_archive_round(archive_id);

COMMENT ON TABLE inquiry_archive_round IS '辅助问询归档轮次明细表';
COMMENT ON COLUMN inquiry_archive_round.id IS '主键';
COMMENT ON COLUMN inquiry_archive_round.archive_id IS '归档主表 ID，对应 inquiry_archive.id';
COMMENT ON COLUMN inquiry_archive_round.round_no IS '问询轮次序号';
COMMENT ON COLUMN inquiry_archive_round.round_client_id IS '前端轮次 ID，用于和界面状态、视频窗口关联';
COMMENT ON COLUMN inquiry_archive_round.title IS '轮次标题';
COMMENT ON COLUMN inquiry_archive_round.focus IS '本轮关注重点';
COMMENT ON COLUMN inquiry_archive_round.strategy_note IS '本轮策略说明';
COMMENT ON COLUMN inquiry_archive_round.questions IS '本轮问题清单 JSON';
COMMENT ON COLUMN inquiry_archive_round.transcripts IS '本轮转写明细 JSON';
COMMENT ON COLUMN inquiry_archive_round.answer_text IS '本轮旅客回答汇总文本';
COMMENT ON COLUMN inquiry_archive_round.round_summary IS '本轮摘要';
COMMENT ON COLUMN inquiry_archive_round.humanomni_summary IS 'HumanOmni 对本轮音视频窗口生成的原始摘要';
COMMENT ON COLUMN inquiry_archive_round.action_observations IS '本轮实时动作、表情、视线等观察事件 JSON';
COMMENT ON COLUMN inquiry_archive_round.risk_hints IS '本轮风险提示 JSON';
COMMENT ON COLUMN inquiry_archive_round.duration_seconds IS '本轮采样时长，单位秒';
COMMENT ON COLUMN inquiry_archive_round.started_at IS '本轮开始时间，前端或后端可选写入';
COMMENT ON COLUMN inquiry_archive_round.ended_at IS '本轮结束时间，前端或后端可选写入';
COMMENT ON COLUMN inquiry_archive_round.created_at IS '记录创建时间';

CREATE TABLE IF NOT EXISTS inquiry_archive_video (
    id BIGSERIAL PRIMARY KEY,
    archive_id BIGINT NOT NULL REFERENCES inquiry_archive(id) ON DELETE CASCADE,
    archive_round_id BIGINT REFERENCES inquiry_archive_round(id) ON DELETE CASCADE,
    video_kind VARCHAR(32) NOT NULL DEFAULT 'round_clip',
    session_id VARCHAR(128) NOT NULL,
    window_id VARCHAR(160),
    question_id VARCHAR(160),
    video_url TEXT NOT NULL,
    minio_bucket VARCHAR(128) NOT NULL,
    minio_object_key TEXT NOT NULL,
    file_name VARCHAR(255) NOT NULL DEFAULT '',
    content_type VARCHAR(128) NOT NULL DEFAULT '',
    size_bytes BIGINT NOT NULL DEFAULT 0,
    modal VARCHAR(32) NOT NULL DEFAULT 'video_audio',
    start_seconds NUMERIC(10,3),
    end_seconds NUMERIC(10,3),
    humanomni_model VARCHAR(128) NOT NULL DEFAULT '',
    humanomni_raw_summary TEXT NOT NULL DEFAULT '',
    upload_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_inquiry_archive_video_kind
        CHECK (video_kind IN ('round_clip', 'full_session', 'evidence')),
    CONSTRAINT chk_inquiry_archive_video_modal
        CHECK (modal IN ('video', 'video_audio', 'audio')),
    CONSTRAINT chk_inquiry_archive_video_size
        CHECK (size_bytes >= 0),
    CONSTRAINT chk_inquiry_archive_video_time
        CHECK (
            start_seconds IS NULL
            OR end_seconds IS NULL
            OR end_seconds >= start_seconds
        )
);

CREATE INDEX IF NOT EXISTS idx_inquiry_archive_video_archive_id
    ON inquiry_archive_video(archive_id);

CREATE INDEX IF NOT EXISTS idx_inquiry_archive_video_round_id
    ON inquiry_archive_video(archive_round_id);

CREATE INDEX IF NOT EXISTS idx_inquiry_archive_video_session_id
    ON inquiry_archive_video(session_id);

CREATE UNIQUE INDEX IF NOT EXISTS idx_uniq_inquiry_archive_video_window
    ON inquiry_archive_video(window_id)
    WHERE window_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_uniq_inquiry_archive_video_object
    ON inquiry_archive_video(minio_bucket, minio_object_key);

COMMENT ON TABLE inquiry_archive_video IS '辅助问询归档视频对象表，记录 MinIO 对象与数据库归档的绑定关系';
COMMENT ON COLUMN inquiry_archive_video.id IS '主键';
COMMENT ON COLUMN inquiry_archive_video.archive_id IS '归档主表 ID，对应 inquiry_archive.id';
COMMENT ON COLUMN inquiry_archive_video.archive_round_id IS '归档轮次 ID，对应 inquiry_archive_round.id';
COMMENT ON COLUMN inquiry_archive_video.video_kind IS '视频类型（round_clip:轮次片段, full_session:完整会话, evidence:证据片段）';
COMMENT ON COLUMN inquiry_archive_video.session_id IS '问询会话 ID，对应前端和 AI-Service 的 sessionId';
COMMENT ON COLUMN inquiry_archive_video.window_id IS 'HumanOmni 窗口 ID';
COMMENT ON COLUMN inquiry_archive_video.question_id IS '关联问题 ID';
COMMENT ON COLUMN inquiry_archive_video.video_url IS '数据库留存的视频访问地址，可存 MinIO URL、minio:// URI 或预签名地址';
COMMENT ON COLUMN inquiry_archive_video.minio_bucket IS 'MinIO bucket 名称';
COMMENT ON COLUMN inquiry_archive_video.minio_object_key IS 'MinIO object key';
COMMENT ON COLUMN inquiry_archive_video.file_name IS '原始上传文件名';
COMMENT ON COLUMN inquiry_archive_video.content_type IS '文件 MIME 类型';
COMMENT ON COLUMN inquiry_archive_video.size_bytes IS '文件大小，单位字节';
COMMENT ON COLUMN inquiry_archive_video.modal IS '媒体类型（video、video_audio、audio）';
COMMENT ON COLUMN inquiry_archive_video.start_seconds IS '该片段在本轮采样中的开始秒数';
COMMENT ON COLUMN inquiry_archive_video.end_seconds IS '该片段在本轮采样中的结束秒数';
COMMENT ON COLUMN inquiry_archive_video.humanomni_model IS '生成摘要的 HumanOmni 模型名';
COMMENT ON COLUMN inquiry_archive_video.humanomni_raw_summary IS 'HumanOmni 原始摘要';
COMMENT ON COLUMN inquiry_archive_video.upload_payload IS '上传接口返回值或补充元数据 JSON';
COMMENT ON COLUMN inquiry_archive_video.created_at IS '记录创建时间';

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
