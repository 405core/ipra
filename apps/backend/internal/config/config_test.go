package config

import (
	"os"
	"path/filepath"
	"testing"
)

var envKeys = []string{
	"APP_ENV",
	"PORT",
	"DATABASE_URL",
	"DB_HOST",
	"DB_PORT",
	"DB_USER",
	"DB_PASSWORD",
	"DB_NAME",
	"DB_SSLMODE",
	"JWT_SECRET",
}

func TestLoadUsesEnvFilesAndLocalOverrides(t *testing.T) {
	restoreEnv(t)
	chdirTemp(t)

	writeFile(t, ".env.local", `PORT=9000
DB_HOST=localhost
DB_PORT=5432
DB_USER=local-user
DB_PASSWORD=base-password
DB_NAME=local-db
DB_SSLMODE=disable
`)

	cfg, err := Load()
	if err != nil {
		t.Fatalf("Load() error = %v", err)
	}

	if cfg.AppEnv != "local" {
		t.Fatalf("AppEnv = %q, want %q", cfg.AppEnv, "local")
	}
	if cfg.Port != "9000" {
		t.Fatalf("Port = %q, want %q", cfg.Port, "9000")
	}
	if cfg.Database.Host != "localhost" {
		t.Fatalf("DB_HOST = %q, want %q", cfg.Database.Host, "localhost")
	}
	if cfg.Database.User != "local-user" {
		t.Fatalf("DB_USER = %q, want %q", cfg.Database.User, "local-user")
	}
	if cfg.Database.Name != "local-db" {
		t.Fatalf("DB_NAME = %q, want %q", cfg.Database.Name, "local-db")
	}
}

func TestLoadUsesEnvProdForProduction(t *testing.T) {
	restoreEnv(t)
	chdirTemp(t)

	writeFile(t, ".env.prod", `DATABASE_URL=postgres://from-file
PORT=8080
`)

	if err := os.Setenv("APP_ENV", "production"); err != nil {
		t.Fatalf("Setenv APP_ENV: %v", err)
	}

	cfg, err := Load()
	if err != nil {
		t.Fatalf("Load() error = %v", err)
	}

	if cfg.AppEnv != "production" {
		t.Fatalf("AppEnv = %q, want %q", cfg.AppEnv, "production")
	}
	if cfg.Port != "8080" {
		t.Fatalf("Port = %q, want %q", cfg.Port, "8080")
	}
	if cfg.Database.URL != "postgres://from-file" {
		t.Fatalf("DATABASE_URL = %q, want %q", cfg.Database.URL, "postgres://from-file")
	}
}

func TestLoadPrefersProcessEnvOverEnvFile(t *testing.T) {
	restoreEnv(t)
	chdirTemp(t)

	writeFile(t, ".env.prod", `DATABASE_URL=postgres://from-file
PORT=8080
`)

	if err := os.Setenv("APP_ENV", "prod"); err != nil {
		t.Fatalf("Setenv APP_ENV: %v", err)
	}
	if err := os.Setenv("DATABASE_URL", "postgres://from-process"); err != nil {
		t.Fatalf("Setenv DATABASE_URL: %v", err)
	}
	if err := os.Setenv("PORT", "7000"); err != nil {
		t.Fatalf("Setenv PORT: %v", err)
	}

	cfg, err := Load()
	if err != nil {
		t.Fatalf("Load() error = %v", err)
	}

	if cfg.Port != "7000" {
		t.Fatalf("Port = %q, want %q", cfg.Port, "7000")
	}
	if cfg.Database.URL != "postgres://from-process" {
		t.Fatalf("DATABASE_URL = %q, want %q", cfg.Database.URL, "postgres://from-process")
	}
}

func TestLoadFallsBackToBackendAppEnvFileWhenRunFromWorkspaceRoot(t *testing.T) {
	restoreEnv(t)
	chdirTemp(t)

	if err := os.MkdirAll(filepath.Join("apps", "backend"), 0o755); err != nil {
		t.Fatalf("MkdirAll apps/backend: %v", err)
	}

	writeFile(t, filepath.Join("apps", "backend", ".env.local"), `PORT=9100
DB_HOST=workspace-db
DB_PORT=5432
DB_USER=workspace-user
DB_PASSWORD=workspace-password
DB_NAME=workspace-name
DB_SSLMODE=disable
`)

	cfg, err := Load()
	if err != nil {
		t.Fatalf("Load() error = %v", err)
	}

	if cfg.Port != "9100" {
		t.Fatalf("Port = %q, want %q", cfg.Port, "9100")
	}
	if cfg.Database.Host != "workspace-db" {
		t.Fatalf("DB_HOST = %q, want %q", cfg.Database.Host, "workspace-db")
	}
	if cfg.Database.User != "workspace-user" {
		t.Fatalf("DB_USER = %q, want %q", cfg.Database.User, "workspace-user")
	}
	if cfg.Database.Name != "workspace-name" {
		t.Fatalf("DB_NAME = %q, want %q", cfg.Database.Name, "workspace-name")
	}
}

func TestLoadReturnsErrorWhenDatabaseConfigMissing(t *testing.T) {
	restoreEnv(t)
	chdirTemp(t)

	if _, err := Load(); err == nil {
		t.Fatal("Load() error = nil, want missing database config")
	}
}

func restoreEnv(t *testing.T) {
	t.Helper()

	snapshot := make(map[string]*string, len(envKeys))
	for _, key := range envKeys {
		if value, ok := os.LookupEnv(key); ok {
			valueCopy := value
			snapshot[key] = &valueCopy
		} else {
			snapshot[key] = nil
		}
		if err := os.Unsetenv(key); err != nil {
			t.Fatalf("Unsetenv %s: %v", key, err)
		}
	}

	t.Cleanup(func() {
		for _, key := range envKeys {
			if snapshot[key] == nil {
				_ = os.Unsetenv(key)
				continue
			}
			_ = os.Setenv(key, *snapshot[key])
		}
	})
}

func chdirTemp(t *testing.T) {
	t.Helper()

	oldWD, err := os.Getwd()
	if err != nil {
		t.Fatalf("Getwd: %v", err)
	}

	tmpDir := t.TempDir()
	if err := os.Chdir(tmpDir); err != nil {
		t.Fatalf("Chdir temp dir: %v", err)
	}

	t.Cleanup(func() {
		_ = os.Chdir(oldWD)
	})
}

func writeFile(t *testing.T, name string, content string) {
	t.Helper()

	path := filepath.Join(".", name)
	if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
		t.Fatalf("WriteFile %s: %v", path, err)
	}
}
