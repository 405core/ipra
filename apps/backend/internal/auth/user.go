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
	BadgeNumber  string `gorm:"size:64;uniqueIndex;not null"`
	DisplayName  string `gorm:"size:128;not null"`
	Role         string `gorm:"size:32;not null"`
	PasswordHash string `gorm:"size:255;not null"`
}

type seedUser struct {
	BadgeNumber string
	DisplayName string
	Password    string
	Role        string
}

var defaultSeedUsers = []seedUser{
	{
		BadgeNumber: "admin001",
		DisplayName: "系统管理员",
		Password:    "Admin123!",
		Role:        RoleAdmin,
	},
	{
		BadgeNumber: "staff001",
		DisplayName: "普通员工",
		Password:    "Staff123!",
		Role:        RoleEmployee,
	},
}

func AutoMigrate(db *gorm.DB) error {
	return db.AutoMigrate(&User{})
}

func SeedUsers(db *gorm.DB) error {
	for _, seed := range defaultSeedUsers {
		var existing User
		err := db.Where("badge_number = ?", seed.BadgeNumber).First(&existing).Error
		if err == nil {
			continue
		}
		if !errors.Is(err, gorm.ErrRecordNotFound) {
			return fmt.Errorf("find seed user %s: %w", seed.BadgeNumber, err)
		}

		passwordHash, err := HashPassword(seed.Password)
		if err != nil {
			return fmt.Errorf("hash password for %s: %w", seed.BadgeNumber, err)
		}

		if err := db.Create(&User{
			BadgeNumber:  seed.BadgeNumber,
			DisplayName:  seed.DisplayName,
			Role:         seed.Role,
			PasswordHash: passwordHash,
		}).Error; err != nil {
			return fmt.Errorf("create seed user %s: %w", seed.BadgeNumber, err)
		}
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

func NormalizeBadgeNumber(value string) string {
	return strings.TrimSpace(value)
}
