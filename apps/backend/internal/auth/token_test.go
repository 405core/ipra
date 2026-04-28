package auth

import (
	"testing"
	"time"
)

func TestTokenManagerSignAndParse(t *testing.T) {
	manager := NewTokenManager("test-secret", time.Hour)

	token, err := manager.Sign(User{
		ID:          7,
		BadgeNumber: "staff001",
		DisplayName: "普通员工",
		Role:        RoleEmployee,
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
	if claims.Role != RoleEmployee {
		t.Fatalf("Role = %q, want %q", claims.Role, RoleEmployee)
	}
	if claims.BadgeNumber != "staff001" {
		t.Fatalf("BadgeNumber = %q, want %q", claims.BadgeNumber, "staff001")
	}
}

func TestTokenManagerRejectsExpiredTokens(t *testing.T) {
	manager := NewTokenManager("test-secret", -time.Second)

	token, err := manager.Sign(User{
		ID:          1,
		BadgeNumber: "admin001",
		DisplayName: "系统管理员",
		Role:        RoleAdmin,
	})
	if err != nil {
		t.Fatalf("Sign() error = %v", err)
	}

	if _, err := manager.Parse(token); err == nil {
		t.Fatal("Parse() error = nil, want expired token error")
	}
}
