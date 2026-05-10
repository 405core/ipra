package auth

import (
	"testing"
	"time"

	dbschema "ipra/backend/internal/database"
)

func TestTokenManagerSignAndParse(t *testing.T) {
	manager := NewTokenManager("test-secret", time.Hour)

	token, err := manager.Sign(dbschema.SystemUser{
		ID:     7,
		WorkID: "user",
		Name:   "员工",
		Role:   RoleUser,
		Status: StatusActive,
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
	if claims.Role != RoleUser {
		t.Fatalf("Role = %q, want %q", claims.Role, RoleUser)
	}
	if claims.WorkID != "user" {
		t.Fatalf("WorkID = %q, want %q", claims.WorkID, "user")
	}
	if claims.Name != "员工" {
		t.Fatalf("Name = %q, want %q", claims.Name, "员工")
	}
	if claims.Status != StatusActive {
		t.Fatalf("Status = %q, want %q", claims.Status, StatusActive)
	}
}

func TestTokenManagerRejectsExpiredTokens(t *testing.T) {
	manager := NewTokenManager("test-secret", -time.Second)

	token, err := manager.Sign(dbschema.SystemUser{
		ID:     1,
		WorkID: "admin",
		Name:   "系统管理员",
		Role:   RoleAdmin,
		Status: StatusActive,
	})
	if err != nil {
		t.Fatalf("Sign() error = %v", err)
	}

	if _, err := manager.Parse(token); err == nil {
		t.Fatal("Parse() error = nil, want expired token error")
	}
}
