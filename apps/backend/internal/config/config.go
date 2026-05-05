package config

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

type Config struct {
	AppEnv   string
	Port     string
	Database DatabaseConfig
	Auth     AuthConfig
}

type DatabaseConfig struct {
	URL      string
	Host     string
	Port     string
	User     string
	Password string
	Name     string
	SSLMode  string
}

type AuthConfig struct {
	JWTSecret string
}

func Load() (Config, error) {
	initialEnv := snapshotEnvKeys()
	appEnv := firstNonEmpty(os.Getenv("APP_ENV"), "local")

	if err := loadEnvFiles(initialEnv, appEnv); err != nil {
		return Config{}, err
	}

	cfg := Config{
		AppEnv: firstNonEmpty(os.Getenv("APP_ENV"), "local"),
		Port:   firstNonEmpty(os.Getenv("PORT"), "8080"),
		Database: DatabaseConfig{
			URL:      os.Getenv("DATABASE_URL"),
			Host:     os.Getenv("DB_HOST"),
			Port:     firstNonEmpty(os.Getenv("DB_PORT"), "5432"),
			User:     os.Getenv("DB_USER"),
			Password: os.Getenv("DB_PASSWORD"),
			Name:     os.Getenv("DB_NAME"),
			SSLMode:  firstNonEmpty(os.Getenv("DB_SSLMODE"), "disable"),
		},
		Auth: AuthConfig{
			JWTSecret: firstNonEmpty(os.Getenv("JWT_SECRET"), "ipra-local-secret"),
		},
	}

	if err := cfg.Validate(); err != nil {
		return Config{}, err
	}

	return cfg, nil
}

func (c Config) Validate() error {
	if c.Database.URL != "" {
		return nil
	}

	missing := make([]string, 0, 4)
	if c.Database.Host == "" {
		missing = append(missing, "DB_HOST")
	}
	if c.Database.User == "" {
		missing = append(missing, "DB_USER")
	}
	if c.Database.Password == "" {
		missing = append(missing, "DB_PASSWORD")
	}
	if c.Database.Name == "" {
		missing = append(missing, "DB_NAME")
	}

	if len(missing) > 0 {
		return fmt.Errorf("missing required environment variables: %s", strings.Join(missing, ", "))
	}

	return nil
}

func (d DatabaseConfig) DSN() string {
	if d.URL != "" {
		return d.URL
	}

	return fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
		d.Host,
		d.User,
		d.Password,
		d.Name,
		d.Port,
		d.SSLMode,
	)
}

func loadEnvFiles(initialEnv map[string]struct{}, appEnv string) error {
	filename := envFileFor(appEnv)

	for _, path := range candidateEnvPaths(filename) {
		info, err := os.Stat(path)
		if err != nil {
			if os.IsNotExist(err) {
				continue
			}
			return fmt.Errorf("stat %s: %w", path, err)
		}
		if info.IsDir() {
			continue
		}

		return loadEnvFile(path, initialEnv)
	}

	return nil
}

func envFileFor(appEnv string) string {
	switch strings.ToLower(strings.TrimSpace(appEnv)) {
	case "", "local", "dev", "development":
		return ".env.local"
	case "prod", "production":
		return ".env.prod"
	default:
		return fmt.Sprintf(".env.%s", appEnv)
	}
}

func candidateEnvPaths(filename string) []string {
	seen := make(map[string]struct{}, 2)
	paths := make([]string, 0, 2)

	for _, path := range []string{
		filename,
		filepath.Join("apps", "backend", filename),
	} {
		clean := filepath.Clean(path)
		if _, ok := seen[clean]; ok {
			continue
		}
		seen[clean] = struct{}{}
		paths = append(paths, clean)
	}

	return paths
}

func loadEnvFile(path string, initialEnv map[string]struct{}) error {
	data, err := os.ReadFile(path)
	if err != nil {
		if os.IsNotExist(err) {
			return nil
		}
		return fmt.Errorf("read %s: %w", path, err)
	}

	lines := strings.Split(string(data), "\n")
	for idx, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}

		line = strings.TrimPrefix(line, "export ")
		key, value, ok := strings.Cut(line, "=")
		if !ok {
			return fmt.Errorf("%s:%d: invalid env line", path, idx+1)
		}

		key = strings.TrimSpace(key)
		value = trimEnvValue(strings.TrimSpace(value))
		if key == "" {
			return fmt.Errorf("%s:%d: empty env key", path, idx+1)
		}
		if _, exists := initialEnv[key]; exists {
			continue
		}

		if err := os.Setenv(key, value); err != nil {
			return fmt.Errorf("set %s from %s: %w", key, path, err)
		}
	}

	return nil
}

func snapshotEnvKeys() map[string]struct{} {
	keys := make(map[string]struct{})
	for _, entry := range os.Environ() {
		key, _, ok := strings.Cut(entry, "=")
		if ok {
			keys[key] = struct{}{}
		}
	}
	return keys
}

func trimEnvValue(value string) string {
	if len(value) >= 2 {
		if value[0] == '"' && value[len(value)-1] == '"' {
			return value[1 : len(value)-1]
		}
		if value[0] == '\'' && value[len(value)-1] == '\'' {
			return value[1 : len(value)-1]
		}
	}
	return value
}

func firstNonEmpty(value string, fallback string) string {
	if value != "" {
		return value
	}
	return fallback
}
