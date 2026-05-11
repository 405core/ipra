package database

import (
	"encoding/json"
	"time"
)

type SystemUser struct {
	ID           uint64    `gorm:"column:id;type:bigint;primaryKey;autoIncrement;comment:主键"`
	PasswordHash string    `gorm:"column:password_hash;type:varchar(255);not null;comment:Bcrypt加密后的密码"`
	WorkID       string    `gorm:"column:work_id;type:varchar(64);uniqueIndex:uk_system_user_work_id;not null;comment:工号，用于登录和水印"`
	Status       string    `gorm:"column:status;type:varchar(32);not null;default:active;comment:账号状态（active:启用, disabled:停用）"`
	CreatedAt    time.Time `gorm:"column:created_at;type:timestamp;not null;autoCreateTime;comment:账号创建时间"`
	UpdatedAt    time.Time `gorm:"column:updated_at;type:timestamp;not null;autoUpdateTime;comment:账号最后更新时间"`
	Name         string    `gorm:"column:name;type:varchar(64);not null;comment:姓名"`
	Role         string    `gorm:"column:role;type:varchar(32);not null;comment:角色代码（admin、user）"`
}

func (SystemUser) TableName() string {
	return "system_user"
}

type ImportBatchLog struct {
	ID           uint64          `gorm:"column:id;type:bigint;primaryKey;autoIncrement;comment:主键"`
	BatchNo      string          `gorm:"column:batch_no;type:varchar(64);uniqueIndex:uk_import_batch_log_batch_no;not null;comment:批次流水号"`
	OperatorID   uint64          `gorm:"column:operator_id;type:bigint;not null;comment:操作人 system_user.id"`
	Operator     *SystemUser     `gorm:"foreignKey:OperatorID;references:ID;constraint:OnUpdate:RESTRICT,OnDelete:RESTRICT;"`
	FileName     string          `gorm:"column:file_name;type:varchar(255);not null;comment:导入文件名"`
	ImportType   string          `gorm:"column:import_type;type:varchar(32);not null;comment:导入类型（如 BASE_PROFILE、HIGH_RISK）"`
	Status       string          `gorm:"column:status;type:varchar(32);index:idx_import_batch_log_status;not null;comment:导入状态（queued、parsing、success、partial_failed、failed）"`
	TotalRows    int             `gorm:"column:total_rows;type:int;not null;default:0;comment:导入文件总行数"`
	SuccessCount int             `gorm:"column:success_count;type:int;not null;default:0;comment:成功写入行数"`
	FailedCount  int             `gorm:"column:failed_count;type:int;not null;default:0;comment:失败行数"`
	ErrorDetails json.RawMessage `gorm:"column:error_details;type:jsonb;comment:导入失败明细，按 JSON 数组记录行号、错误码和原始数据"`
	StartedAt    *time.Time      `gorm:"column:started_at;type:timestamptz;comment:开始处理时间"`
	FinishedAt   *time.Time      `gorm:"column:finished_at;type:timestamptz;comment:处理完成时间"`
	CreatedAt    time.Time       `gorm:"column:created_at;type:timestamptz;not null;default:CURRENT_TIMESTAMP;autoCreateTime;comment:记录创建时间"`
}

func (ImportBatchLog) TableName() string {
	return "import_batch_log"
}

type PassengerProfile struct {
	ID          uint64          `gorm:"column:id;type:bigint;primaryKey;autoIncrement;comment:主键"`
	DocumentNum string          `gorm:"column:document_num;type:varchar(64);uniqueIndex:idx_uniq_passenger_doc;not null;comment:证件号码，现场扫描和检索的核心字段"`
	FullName    string          `gorm:"column:full_name;type:varchar(128);not null;comment:统一全名展示字段"`
	ProfileData json.RawMessage `gorm:"column:profile_data;type:jsonb;comment:旅客基础画像 JSON，覆盖个人基本信息、行程、历史出行、职业背景、违法犯罪记录等维度"`
	CreatedAt   time.Time       `gorm:"column:created_at;type:timestamptz;not null;default:CURRENT_TIMESTAMP;autoCreateTime;comment:记录创建时间"`
	UpdatedAt   time.Time       `gorm:"column:updated_at;type:timestamptz;not null;default:CURRENT_TIMESTAMP;autoUpdateTime;comment:记录更新时间"`
}

func (PassengerProfile) TableName() string {
	return "passenger_profile"
}

type HighRiskWatchlist struct {
	ID          uint64    `gorm:"column:id;type:bigint;primaryKey;autoIncrement;comment:主键"`
	DocumentNum string    `gorm:"column:document_num;type:varchar(64);uniqueIndex:idx_uniq_watchlist_doc;not null;comment:证件号码"`
	RiskReason  string    `gorm:"column:risk_reason;type:text;not null;default:'';comment:高风险原因或名单说明"`
	CreatedAt   time.Time `gorm:"column:created_at;type:timestamptz;not null;default:CURRENT_TIMESTAMP;autoCreateTime;comment:记录创建时间"`
	UpdatedAt   time.Time `gorm:"column:updated_at;type:timestamptz;not null;default:CURRENT_TIMESTAMP;autoUpdateTime;comment:记录更新时间"`
}

func (HighRiskWatchlist) TableName() string {
	return "high_risk_watchlist"
}

type AgentMemoryItem struct {
	ID          uint64          `gorm:"column:id;type:bigint;primaryKey;autoIncrement;comment:主键"`
	ScopeType   string          `gorm:"column:scope_type;type:varchar(32);index:idx_agent_memory_scope;not null;comment:记忆作用域类型（session、passenger、rule）"`
	ScopeID     string          `gorm:"column:scope_id;type:varchar(128);index:idx_agent_memory_scope;not null;comment:记忆作用域标识"`
	MemoryType  string          `gorm:"column:memory_type;type:varchar(32);not null;comment:记忆类型（fact、gap、inconsistency、evidence、procedure）"`
	Title       string          `gorm:"column:title;type:varchar(128);not null;default:'';comment:记忆标题"`
	Content     string          `gorm:"column:content;type:text;not null;comment:记忆正文"`
	Evidence    json.RawMessage `gorm:"column:evidence;type:jsonb;comment:记忆来源证据"`
	Confidence  *float64        `gorm:"column:confidence;type:numeric(4,3);comment:置信度，范围 0-1"`
	Source      string          `gorm:"column:source;type:varchar(64);not null;default:'';comment:记忆来源"`
	Status      string          `gorm:"column:status;type:varchar(32);index:idx_agent_memory_status;not null;default:'active';comment:状态（active、inactive）"`
	ContentHash string          `gorm:"column:content_hash;type:char(64);uniqueIndex:idx_uniq_agent_memory_content;not null;comment:记忆内容哈希"`
	CreatedByID *uint64         `gorm:"column:created_by_id;type:bigint;comment:创建操作人 system_user.id"`
	UpdatedByID *uint64         `gorm:"column:updated_by_id;type:bigint;comment:最后更新操作人 system_user.id"`
	ExpiresAt   *time.Time      `gorm:"column:expires_at;type:timestamptz;index:idx_agent_memory_expires_at;comment:过期时间，空值表示不过期"`
	CreatedAt   time.Time       `gorm:"column:created_at;type:timestamptz;not null;default:CURRENT_TIMESTAMP;autoCreateTime;comment:记录创建时间"`
	UpdatedAt   time.Time       `gorm:"column:updated_at;type:timestamptz;not null;default:CURRENT_TIMESTAMP;autoUpdateTime;comment:记录更新时间"`
}

func (AgentMemoryItem) TableName() string {
	return "agent_memory_item"
}

type InquiryArchive struct {
	ID                   uint64          `json:"id" gorm:"column:id;type:bigint;primaryKey;autoIncrement;comment:主键"`
	ArchiveCode          string          `json:"archiveCode" gorm:"column:archive_code;type:varchar(64);uniqueIndex;not null;comment:归档编号"`
	SessionID            string          `json:"sessionId" gorm:"column:session_id;type:varchar(128);uniqueIndex;not null;comment:问询会话 ID"`
	PassengerProfileID   *uint64         `json:"passengerProfileId,omitempty" gorm:"column:passenger_profile_id;type:bigint;comment:旅客画像 ID"`
	PassengerDocumentNum string          `json:"passengerDocumentNum" gorm:"column:passenger_document_num;type:varchar(64);index:idx_inquiry_archive_document_num;not null;default:'';comment:旅客证件号码快照"`
	PassengerName        string          `json:"passengerName" gorm:"column:passenger_name;type:varchar(128);not null;default:'';comment:旅客姓名快照"`
	PassengerSnapshot    json.RawMessage `json:"passengerSnapshot,omitempty" gorm:"column:passenger_snapshot;type:jsonb;not null;default:'{}';comment:旅客画像快照 JSON"`
	OperatorID           *uint64         `json:"operatorId,omitempty" gorm:"column:operator_id;type:bigint;index:idx_inquiry_archive_operator_id;comment:归档操作人 system_user.id"`
	OperatorWorkID       string          `json:"operatorWorkId" gorm:"column:operator_work_id;type:varchar(64);not null;default:'';comment:归档操作人工号快照"`
	OperatorName         string          `json:"operatorName" gorm:"column:operator_name;type:varchar(64);not null;default:'';comment:归档操作人姓名快照"`
	FinalJudgement       string          `json:"finalJudgement" gorm:"column:final_judgement;type:varchar(32);index:idx_inquiry_archive_final_judgement;not null;comment:最终判定"`
	JudgementReason      string          `json:"judgementReason" gorm:"column:judgement_reason;type:text;not null;comment:最终判定详细理由"`
	JudgementBriefing    json.RawMessage `json:"judgementBriefing,omitempty" gorm:"column:judgement_briefing;type:jsonb;not null;default:'{}';comment:第三阶段系统摘要 JSON"`
	MultimodalAssessment json.RawMessage `json:"multimodalAssessment,omitempty" gorm:"column:multimodal_assessment;type:jsonb;not null;default:'{}';comment:多模态综合研判 JSON"`
	RoundCount           int             `json:"roundCount" gorm:"column:round_count;type:int;not null;default:0;comment:归档问询轮次数"`
	TotalDurationSeconds int             `json:"totalDurationSeconds" gorm:"column:total_duration_seconds;type:int;not null;default:0;comment:采样总时长，单位秒"`
	TranscriptCount      int             `json:"transcriptCount" gorm:"column:transcript_count;type:int;not null;default:0;comment:转写条数"`
	Status               string          `json:"status" gorm:"column:status;type:varchar(32);not null;default:'archived';comment:归档状态"`
	ArchivedAt           time.Time       `json:"archivedAt" gorm:"column:archived_at;type:timestamptz;index:idx_inquiry_archive_archived_at;not null;default:CURRENT_TIMESTAMP;comment:归档完成时间"`
	CreatedAt            time.Time       `json:"createdAt" gorm:"column:created_at;type:timestamptz;not null;default:CURRENT_TIMESTAMP;autoCreateTime;comment:记录创建时间"`
	UpdatedAt            time.Time       `json:"updatedAt" gorm:"column:updated_at;type:timestamptz;not null;default:CURRENT_TIMESTAMP;autoUpdateTime;comment:记录更新时间"`
}

func (InquiryArchive) TableName() string {
	return "inquiry_archive"
}

type InquiryArchiveRound struct {
	ID                 uint64          `json:"id" gorm:"column:id;type:bigint;primaryKey;autoIncrement;comment:主键"`
	ArchiveID          uint64          `json:"archiveId" gorm:"column:archive_id;type:bigint;index:idx_inquiry_archive_round_archive_id;not null;comment:归档主表 ID"`
	RoundNo            int             `json:"roundNo" gorm:"column:round_no;type:int;not null;comment:问询轮次序号"`
	RoundClientID      string          `json:"roundClientId" gorm:"column:round_client_id;type:varchar(128);not null;default:'';comment:前端轮次 ID"`
	Title              string          `json:"title" gorm:"column:title;type:varchar(255);not null;default:'';comment:轮次标题"`
	Focus              string          `json:"focus" gorm:"column:focus;type:text;not null;default:'';comment:本轮关注重点"`
	StrategyNote       string          `json:"strategyNote" gorm:"column:strategy_note;type:text;not null;default:'';comment:本轮策略说明"`
	Questions          json.RawMessage `json:"questions,omitempty" gorm:"column:questions;type:jsonb;not null;default:'[]';comment:本轮问题清单 JSON"`
	Transcripts        json.RawMessage `json:"transcripts,omitempty" gorm:"column:transcripts;type:jsonb;not null;default:'[]';comment:本轮转写明细 JSON"`
	AnswerText         string          `json:"answerText" gorm:"column:answer_text;type:text;not null;default:'';comment:本轮旅客回答汇总文本"`
	RoundSummary       string          `json:"roundSummary" gorm:"column:round_summary;type:text;not null;default:'';comment:本轮摘要"`
	HumanOmniSummary   string          `json:"humanOmniSummary" gorm:"column:humanomni_summary;type:text;not null;default:'';comment:HumanOmni 原始摘要"`
	ActionObservations json.RawMessage `json:"actionObservations,omitempty" gorm:"column:action_observations;type:jsonb;not null;default:'[]';comment:实时观察事件 JSON"`
	RiskHints          json.RawMessage `json:"riskHints,omitempty" gorm:"column:risk_hints;type:jsonb;not null;default:'[]';comment:本轮风险提示 JSON"`
	DurationSeconds    int             `json:"durationSeconds" gorm:"column:duration_seconds;type:int;not null;default:0;comment:本轮采样时长，单位秒"`
	StartedAt          *time.Time      `json:"startedAt,omitempty" gorm:"column:started_at;type:timestamptz;comment:本轮开始时间"`
	EndedAt            *time.Time      `json:"endedAt,omitempty" gorm:"column:ended_at;type:timestamptz;comment:本轮结束时间"`
	CreatedAt          time.Time       `json:"createdAt" gorm:"column:created_at;type:timestamptz;not null;default:CURRENT_TIMESTAMP;autoCreateTime;comment:记录创建时间"`
}

func (InquiryArchiveRound) TableName() string {
	return "inquiry_archive_round"
}

type InquiryArchiveVideo struct {
	ID                  uint64          `json:"id" gorm:"column:id;type:bigint;primaryKey;autoIncrement;comment:主键"`
	ArchiveID           uint64          `json:"archiveId" gorm:"column:archive_id;type:bigint;index:idx_inquiry_archive_video_archive_id;not null;comment:归档主表 ID"`
	ArchiveRoundID      *uint64         `json:"archiveRoundId,omitempty" gorm:"column:archive_round_id;type:bigint;index:idx_inquiry_archive_video_round_id;comment:归档轮次 ID"`
	VideoKind           string          `json:"videoKind" gorm:"column:video_kind;type:varchar(32);not null;default:'round_clip';comment:视频类型"`
	SessionID           string          `json:"sessionId" gorm:"column:session_id;type:varchar(128);index:idx_inquiry_archive_video_session_id;not null;comment:问询会话 ID"`
	WindowID            *string         `json:"windowId,omitempty" gorm:"column:window_id;type:varchar(160);comment:HumanOmni 窗口 ID"`
	QuestionID          *string         `json:"questionId,omitempty" gorm:"column:question_id;type:varchar(160);comment:关联问题 ID"`
	VideoURL            string          `json:"videoUrl" gorm:"column:video_url;type:text;not null;comment:视频访问地址"`
	MinIOBucket         string          `json:"minioBucket" gorm:"column:minio_bucket;type:varchar(128);not null;comment:MinIO bucket 名称"`
	MinIOObjectKey      string          `json:"minioObjectKey" gorm:"column:minio_object_key;type:text;not null;comment:MinIO object key"`
	FileName            string          `json:"fileName" gorm:"column:file_name;type:varchar(255);not null;default:'';comment:原始上传文件名"`
	ContentType         string          `json:"contentType" gorm:"column:content_type;type:varchar(128);not null;default:'';comment:文件 MIME 类型"`
	SizeBytes           int64           `json:"sizeBytes" gorm:"column:size_bytes;type:bigint;not null;default:0;comment:文件大小，单位字节"`
	Modal               string          `json:"modal" gorm:"column:modal;type:varchar(32);not null;default:'video_audio';comment:媒体类型"`
	StartSeconds        *float64        `json:"startSeconds,omitempty" gorm:"column:start_seconds;type:numeric(10,3);comment:片段开始秒数"`
	EndSeconds          *float64        `json:"endSeconds,omitempty" gorm:"column:end_seconds;type:numeric(10,3);comment:片段结束秒数"`
	HumanOmniModel      string          `json:"humanOmniModel" gorm:"column:humanomni_model;type:varchar(128);not null;default:'';comment:HumanOmni 模型名"`
	HumanOmniRawSummary string          `json:"humanOmniRawSummary" gorm:"column:humanomni_raw_summary;type:text;not null;default:'';comment:HumanOmni 原始摘要"`
	UploadPayload       json.RawMessage `json:"uploadPayload,omitempty" gorm:"column:upload_payload;type:jsonb;not null;default:'{}';comment:上传元数据 JSON"`
	CreatedAt           time.Time       `json:"createdAt" gorm:"column:created_at;type:timestamptz;not null;default:CURRENT_TIMESTAMP;autoCreateTime;comment:记录创建时间"`
}

func (InquiryArchiveVideo) TableName() string {
	return "inquiry_archive_video"
}

type SystemSetting struct {
	SettingKey   string      `gorm:"column:setting_key;type:varchar(128);primaryKey;comment:配置键"`
	SettingValue string      `gorm:"column:setting_value;type:text;not null;comment:配置值"`
	Description  string      `gorm:"column:description;type:text;not null;default:'';comment:配置说明"`
	UpdatedByID  *uint64     `gorm:"column:updated_by_id;type:bigint;comment:最后更新操作人 system_user.id"`
	UpdatedBy    *SystemUser `gorm:"foreignKey:UpdatedByID;references:ID;constraint:OnUpdate:RESTRICT,OnDelete:SET NULL;"`
	CreatedAt    time.Time   `gorm:"column:created_at;type:timestamptz;not null;default:CURRENT_TIMESTAMP;autoCreateTime;comment:记录创建时间"`
	UpdatedAt    time.Time   `gorm:"column:updated_at;type:timestamptz;not null;default:CURRENT_TIMESTAMP;autoUpdateTime;comment:记录更新时间"`
}

func (SystemSetting) TableName() string {
	return "system_setting"
}

type AuditLog struct {
	ID          uint64          `json:"id" gorm:"column:id;type:bigint;primaryKey;autoIncrement;comment:主键"`
	ActorUserID *uint64         `json:"actorUserId,omitempty" gorm:"column:actor_user_id;type:bigint;index:idx_audit_log_actor_user_id;comment:操作人 system_user.id"`
	ActorWorkID string          `json:"actorWorkId" gorm:"column:actor_work_id;type:varchar(64);index:idx_audit_log_actor_work_id;not null;default:'';comment:操作人工号"`
	ActorName   string          `json:"actorName" gorm:"column:actor_name;type:varchar(64);not null;default:'';comment:操作人姓名"`
	ActorRole   string          `json:"actorRole" gorm:"column:actor_role;type:varchar(32);not null;default:'';comment:操作人角色"`
	Action      string          `json:"action" gorm:"column:action;type:varchar(128);index:idx_audit_log_action;not null;comment:操作代码"`
	Resource    string          `json:"resource" gorm:"column:resource;type:varchar(128);index:idx_audit_log_resource;not null;default:'';comment:操作对象"`
	Result      string          `json:"result" gorm:"column:result;type:varchar(32);index:idx_audit_log_result;not null;comment:操作结果"`
	StatusCode  int             `json:"statusCode" gorm:"column:status_code;type:int;not null;default:0;comment:HTTP 状态码或业务状态码"`
	Method      string          `json:"method" gorm:"column:method;type:varchar(16);not null;default:'';comment:请求方法或事件类型"`
	Path        string          `json:"path" gorm:"column:path;type:varchar(255);not null;default:'';comment:请求路径或前端事件路径"`
	ClientIP    string          `json:"clientIp" gorm:"column:client_ip;type:varchar(64);not null;default:'';comment:客户端地址"`
	UserAgent   string          `json:"userAgent" gorm:"column:user_agent;type:varchar(255);not null;default:'';comment:客户端 User-Agent"`
	Detail      json.RawMessage `json:"detail,omitempty" gorm:"column:detail;type:jsonb;comment:补充审计明细 JSON"`
	CreatedAt   time.Time       `json:"createdAt" gorm:"column:created_at;type:timestamptz;not null;default:CURRENT_TIMESTAMP;index:idx_audit_log_created_at;autoCreateTime;comment:审计记录创建时间"`
}

func (AuditLog) TableName() string {
	return "audit_log"
}
