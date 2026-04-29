package auth

import (
	"errors"
	"fmt"
	"strings"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

const (
	RoleAdmin    = "admin"
	RoleEmployee = "employee"
)

type User struct {
	ID           uint   `gorm:"primaryKey"`
	WorkID       string `gorm:"column:work_id;size:64;uniqueIndex;not null"`
	Name         string `gorm:"column:name;size:128;not null"`
	Role         string `gorm:"size:32;not null"`
	PasswordHash string `gorm:"size:255;not null"`
}

func (User) TableName() string {
	return "user"
}

type seedUser struct {
	WorkID   string
	Name     string
	Password string
	Role     string
}

var defaultSeedUsers = []seedUser{
	{
		WorkID:   "admin",
		Name:     "系统管理员",
		Password: "123",
		Role:     RoleAdmin,
	},
	{
		WorkID:   "user",
		Name:     "普通员工",
		Password: "123",
		Role:     RoleEmployee,
	},
}

func AutoMigrate(db *gorm.DB) error {
	if err := migrateUserTable(db); err != nil {
		return err
	}
	return db.AutoMigrate(&User{})
}

func SeedUsers(db *gorm.DB) error {
	for _, seed := range defaultSeedUsers {
		var existing User
		err := db.Where("work_id = ?", seed.WorkID).First(&existing).Error
		if err == nil {
			continue
		}
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			return fmt.Errorf("find seed user %s: %w", seed.WorkID, err)
		}

		passwordHash, err := HashPassword(seed.Password)
		if err != nil {
			return fmt.Errorf("hash password for %s: %w", seed.WorkID, err)
		}

		if err := db.Create(&User{
			WorkID:       seed.WorkID,
			Name:         seed.Name,
			Role:         seed.Role,
			PasswordHash: passwordHash,
		}).Error; err != nil {
			return fmt.Errorf("create seed user %s: %w", seed.WorkID, err)
		}
	}

	return nil
}

func migrateUserTable(db *gorm.DB) error {
	hasUsers, err := hasTable(db, "users")
	if err != nil {
		return fmt.Errorf("check users table: %w", err)
	}

	hasUser, err := hasTable(db, "user")
	if err != nil {
		return fmt.Errorf("check user table: %w", err)
	}

	if hasUsers && !hasUser {
		if err := db.Exec(`ALTER TABLE users RENAME TO "user"`).Error; err != nil {
			return fmt.Errorf(`rename table users to "user": %w`, err)
		}
	}

	if err := renameColumnIfExists(db, "user", "badge_number", "work_id"); err != nil {
		return err
	}
	if err := renameColumnIfExists(db, "user", "display_name", "name"); err != nil {
		return err
	}
	if err := renameIndexIfExists(db, "idx_users_badge_number", "idx_user_work_id"); err != nil {
		return err
	}
	if err := renameIndexIfExists(db, "idx_users_work_id", "idx_user_work_id"); err != nil {
		return err
	}

	return nil
}

func hasTable(db *gorm.DB, tableName string) (bool, error) {
	var exists bool
	err := db.Raw(
		`SELECT EXISTS (
			SELECT 1
			FROM information_schema.tables
			WHERE table_schema = current_schema()
			  AND table_name = ?
		)`,
		tableName,
	).Scan(&exists).Error
	return exists, err
}

func hasColumn(db *gorm.DB, tableName string, columnName string) (bool, error) {
	var exists bool
	err := db.Raw(
		`SELECT EXISTS (
			SELECT 1
			FROM information_schema.columns
			WHERE table_schema = current_schema()
			  AND table_name = ?
			  AND column_name = ?
		)`,
		tableName,
		columnName,
	).Scan(&exists).Error
	return exists, err
}

func hasIndex(db *gorm.DB, indexName string) (bool, error) {
	var exists bool
	err := db.Raw(
		`SELECT EXISTS (
			SELECT 1
			FROM pg_indexes
			WHERE schemaname = current_schema()
			  AND indexname = ?
		)`,
		indexName,
	).Scan(&exists).Error
	return exists, err
}

func renameColumnIfExists(db *gorm.DB, tableName string, oldColumn string, newColumn string) error {
	hasOldColumn, err := hasColumn(db, tableName, oldColumn)
	if err != nil {
		return fmt.Errorf("check %s.%s: %w", tableName, oldColumn, err)
	}
	if !hasOldColumn {
		return nil
	}

	hasNewColumn, err := hasColumn(db, tableName, newColumn)
	if err != nil {
		return fmt.Errorf("check %s.%s: %w", tableName, newColumn, err)
	}
	if hasNewColumn {
		return nil
	}

	query := fmt.Sprintf(`ALTER TABLE "%s" RENAME COLUMN %s TO %s`, tableName, oldColumn, newColumn)
	if err := db.Exec(query).Error; err != nil {
		return fmt.Errorf("rename %s.%s to %s: %w", tableName, oldColumn, newColumn, err)
	}

	return nil
}

func renameIndexIfExists(db *gorm.DB, oldIndex string, newIndex string) error {
	hasOldIndex, err := hasIndex(db, oldIndex)
	if err != nil {
		return fmt.Errorf("check index %s: %w", oldIndex, err)
	}
	if !hasOldIndex {
		return nil
	}

	hasNewIndex, err := hasIndex(db, newIndex)
	if err != nil {
		return fmt.Errorf("check index %s: %w", newIndex, err)
	}
	if hasNewIndex {
		return nil
	}

	query := fmt.Sprintf(`ALTER INDEX "%s" RENAME TO "%s"`, oldIndex, newIndex)
	if err := db.Exec(query).Error; err != nil {
		return fmt.Errorf("rename index %s to %s: %w", oldIndex, newIndex, err)
	}

	return nil
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

func NormalizeWorkID(value string) string {
	return strings.TrimSpace(value)
}
