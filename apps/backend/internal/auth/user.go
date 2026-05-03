package auth

import (
	"strings"

	"golang.org/x/crypto/bcrypt"
)

const (
	RoleAdmin     = "admin"
	RoleInspector = "inspector"

	StatusDisabled int16 = 0
	StatusActive   int16 = 1
)

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
