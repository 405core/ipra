package database

import (
	"encoding/json"
	"time"
)

type SystemUser struct {
	ID           uint64    `gorm:"column:id;type:bigint;primaryKey;autoIncrement;comment:主键"`
	Username     string    `gorm:"column:username;type:varchar(64);uniqueIndex:uk_system_user_username;not null;comment:登录账号"`
	PasswordHash string    `gorm:"column:password_hash;type:varchar(255);not null;comment:Bcrypt加密后的密码"`
	RealName     string    `gorm:"column:real_name;type:varchar(64);not null;comment:操作员真实姓名"`
	BadgeNumber  string    `gorm:"column:badge_number;type:varchar(64);uniqueIndex:uk_system_user_badge_number;not null;comment:警号/工号，用于前端和视频回放生成防泄密数字水印"`
	RoleCode     string    `gorm:"column:role_code;type:varchar(32);not null;comment:角色代码，用于基础权限控制"`
	Status       int16     `gorm:"column:status;type:smallint;not null;default:1;comment:账号状态（1:启用, 0:停用），不使用物理删除以保障历史审计链路完整"`
	CreatedAt    time.Time `gorm:"column:created_at;type:timestamp;not null;autoCreateTime;comment:账号创建时间"`
	UpdatedAt    time.Time `gorm:"column:updated_at;type:timestamp;not null;autoUpdateTime;comment:账号最后更新时间"`
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
	ID              uint64          `gorm:"column:id;type:bigint;primaryKey;autoIncrement;comment:主键"`
	DocumentType    string          `gorm:"column:document_type;type:varchar(32);uniqueIndex:idx_uniq_passenger_doc,priority:1;not null;comment:证件类型（如 ID_CARD、PASSPORT）"`
	DocumentNum     string          `gorm:"column:document_num;type:varchar(64);uniqueIndex:idx_uniq_passenger_doc,priority:2;not null;comment:证件号码，现场扫描和检索的核心字段"`
	IssuingRegion   string          `gorm:"column:issuing_region;type:varchar(64);uniqueIndex:idx_uniq_passenger_doc,priority:3;not null;default:CN;comment:签发国家或地区"`
	FullName        string          `gorm:"column:full_name;type:varchar(128);not null;comment:统一全名展示字段"`
	Gender          *int16          `gorm:"column:gender;type:smallint;comment:性别（1:男, 2:女, 0:未知）"`
	BirthDate       *time.Time      `gorm:"column:birth_date;type:date;comment:出生日期"`
	IsHighRisk      bool            `gorm:"column:is_high_risk;type:boolean;not null;default:false;comment:高风险标识，供前端显著预警"`
	IdentityDetails json.RawMessage `gorm:"column:identity_details;type:jsonb;comment:证件专属动态字段，如身份证住址、民族或护照有效期"`
	DimensionData   json.RawMessage `gorm:"column:dimension_data;type:jsonb;comment:多维全息画像数据，含行程、历史出行、职业和违法犯罪记录等"`
	LatestBatchID   *uint64         `gorm:"column:latest_batch_id;type:bigint;comment:最近一次写入该画像的导入批次 ID"`
	LatestBatch     *ImportBatchLog `gorm:"foreignKey:LatestBatchID;references:ID;constraint:OnUpdate:RESTRICT,OnDelete:RESTRICT;"`
	CreatedAt       time.Time       `gorm:"column:created_at;type:timestamptz;not null;default:CURRENT_TIMESTAMP;autoCreateTime;comment:记录创建时间"`
	UpdatedAt       time.Time       `gorm:"column:updated_at;type:timestamptz;not null;default:CURRENT_TIMESTAMP;autoUpdateTime;comment:记录更新时间"`
}

func (PassengerProfile) TableName() string {
	return "passenger_profile"
}
