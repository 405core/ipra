package auth

import (
	"strings"

	"golang.org/x/crypto/bcrypt"
)

const (
	RoleAdmin = "admin"
	RoleUser  = "user"

	StatusDisabled = "disabled"
	StatusActive   = "active"
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

func NormalizeWorkID(value string) string {
	return strings.ToLower(strings.TrimSpace(value))
}

func NormalizeRole(value string) string {
	switch strings.ToLower(strings.TrimSpace(value)) {
	case RoleAdmin:
		return RoleAdmin
	case "inspector", RoleUser:
		return RoleUser
	default:
		return strings.ToLower(strings.TrimSpace(value))
	}
}

func NormalizeStatus(value string) string {
	switch strings.ToLower(strings.TrimSpace(value)) {
	case "", "1", "active":
		return StatusActive
	case "0", "disabled":
		return StatusDisabled
	default:
		return strings.ToLower(strings.TrimSpace(value))
	}
}
