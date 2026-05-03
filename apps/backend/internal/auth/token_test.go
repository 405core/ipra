package auth

import (
	"testing"
	"time"
)

func TestTokenManagerSignAndParse(t *testing.T) {
	manager := NewTokenManager("test-secret", time.Hour)

	token, err := manager.Sign(SystemUser{
		ID:          7,
		Username:    "user",
		RealName:    "现场检查员",
		BadgeNumber: "100002",
		RoleCode:    RoleInspector,
		Status:      StatusActive,
	})
	if err != nil {
		t.Fatalf("Sign() error = %v", err)
	}

	claims, err := manager.Parse(token)
	if err != nil {
		t.Fatalf("Parse() error = %v", err)
	}

	if claims.UserID != 7 {
		t.Fatalf("UserID = %d, want %d", claims.UserID, 7)
	}
	if claims.RoleCode != RoleInspector {
		t.Fatalf("RoleCode = %q, want %q", claims.RoleCode, RoleInspector)
	}
	if claims.Username != "user" {
		t.Fatalf("Username = %q, want %q", claims.Username, "user")
	}
	if claims.BadgeNumber != "100002" {
		t.Fatalf("BadgeNumber = %q, want %q", claims.BadgeNumber, "100002")
	}
	if claims.Status != StatusActive {
		t.Fatalf("Status = %d, want %d", claims.Status, StatusActive)
	}
}

func TestTokenManagerRejectsExpiredTokens(t *testing.T) {
	manager := NewTokenManager("test-secret", -time.Second)

	token, err := manager.Sign(SystemUser{
		ID:          1,
		Username:    "admin",
		RealName:    "系统管理员",
		BadgeNumber: "100001",
		RoleCode:    RoleAdmin,
		Status:      StatusActive,
	})
	if err != nil {
		t.Fatalf("Sign() error = %v", err)
	}

	if _, err := manager.Parse(token); err == nil {
		t.Fatal("Parse() error = nil, want expired token error")
	}
}
