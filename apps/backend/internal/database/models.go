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
