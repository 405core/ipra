package auth

import (
	"errors"
	"fmt"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

const (
	RoleAdmin     = "admin"
	RoleInspector = "inspector"

	StatusDisabled int16 = 0
	StatusActive   int16 = 1
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

type seedSystemUser struct {
	Username    string
	Password    string
	RealName    string
	BadgeNumber string
	RoleCode    string
	Status      int16
}

var defaultSeedUsers = []seedSystemUser{
	{
		Username:    "admin",
		Password:    "123",
		RealName:    "系统管理员",
		BadgeNumber: "100001",
		RoleCode:    RoleAdmin,
		Status:      StatusActive,
	},
	{
		Username:    "user",
		Password:    "123",
		RealName:    "现场检查员",
		BadgeNumber: "100002",
		RoleCode:    RoleInspector,
		Status:      StatusActive,
	},
}

func AutoMigrate(db *gorm.DB) error {
	if err := dropLegacyUserTables(db); err != nil {
		return err
	}
	if err := db.AutoMigrate(&SystemUser{}); err != nil {
		return fmt.Errorf("auto migrate system_user: %w", err)
	}
	if err := applySystemUserComments(db); err != nil {
		return err
	}
	return nil
}

func SeedUsers(db *gorm.DB) error {
	for _, seed := range defaultSeedUsers {
		if err := upsertSeedUser(db, seed); err != nil {
			return err
		}
	}

	return nil
}

func upsertSeedUser(db *gorm.DB, seed seedSystemUser) error {
	passwordHash, err := HashPassword(seed.Password)
	if err != nil {
		return fmt.Errorf("hash password for %s: %w", seed.Username, err)
	}

	normalizedUsername := NormalizeUsername(seed.Username)

	var existing SystemUser
	err = db.Where("username = ?", normalizedUsername).First(&existing).Error
	if err == nil {
		existing.Username = normalizedUsername
		existing.PasswordHash = passwordHash
		existing.RealName = seed.RealName
		existing.BadgeNumber = seed.BadgeNumber
		existing.RoleCode = seed.RoleCode
		existing.Status = seed.Status

		if err := db.Save(&existing).Error; err != nil {
			return fmt.Errorf("update seed user %s: %w", normalizedUsername, err)
		}

		return nil
	}

	if !errors.Is(err, gorm.ErrRecordNotFound) {
		return fmt.Errorf("find seed user %s: %w", normalizedUsername, err)
	}

	if err := db.Create(&SystemUser{
		Username:     normalizedUsername,
		PasswordHash: passwordHash,
		RealName:     seed.RealName,
		BadgeNumber:  seed.BadgeNumber,
		RoleCode:     seed.RoleCode,
		Status:       seed.Status,
	}).Error; err != nil {
		return fmt.Errorf("create seed user %s: %w", normalizedUsername, err)
	}

	return nil
}

func dropLegacyUserTables(db *gorm.DB) error {
	queries := []string{
		`DROP TABLE IF EXISTS "user" CASCADE`,
		`DROP TABLE IF EXISTS users CASCADE`,
	}

	for _, query := range queries {
		if err := db.Exec(query).Error; err != nil {
			return fmt.Errorf("drop legacy auth table with query %q: %w", query, err)
		}
	}

	return nil
}

func applySystemUserComments(db *gorm.DB) error {
	if err := db.Exec(
		`COMMENT ON TABLE "system_user" IS '系统操作员账号表'`,
	).Error; err != nil {
		return fmt.Errorf("comment system_user table: %w", err)
	}

	columnComments := map[string]string{
		"id":            "主键",
		"username":      "登录账号",
		"password_hash": "Bcrypt加密后的密码",
		"real_name":     "操作员真实姓名",
		"badge_number":  "警号/工号，用于前端和视频回放生成防泄密数字水印",
		"role_code":     "角色代码（如 admin、inspector），用于基础权限控制",
		"status":        "账号状态（1:启用, 0:停用），不使用物理删除以保障历史审计日志不产生死链",
		"created_at":    "账号创建时间",
		"updated_at":    "账号最后更新时间",
	}

	for column, comment := range columnComments {
		query := fmt.Sprintf(
			`COMMENT ON COLUMN "system_user"."%s" IS '%s'`,
			column,
			escapeSQLLiteral(comment),
		)
		if err := db.Exec(query).Error; err != nil {
			return fmt.Errorf("comment system_user.%s: %w", column, err)
		}
	}

	return nil
}

func escapeSQLLiteral(value string) string {
	return strings.ReplaceAll(value, "'", "''")
}

func HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(hash), nil
}

func VerifyPassword(hash string, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
}

func NormalizeUsername(value string) string {
	return strings.ToLower(strings.TrimSpace(value))
}
