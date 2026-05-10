package main

import (
	"bufio"
	"context"
	"database/sql"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"
)

func main() {
	envPath := filepath.Clean(".env.local")
	dsn, err := readDSN(envPath)
	if err != nil {
		fail(err)
	}

	db, err := sql.Open("pgx", dsn)
	if err != nil {
		fail(err)
	}
	defer db.Close()

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := db.PingContext(ctx); err != nil {
		fail(fmt.Errorf("ping database: %w", err))
	}
	fmt.Println("database ping ok")

	if len(os.Args) > 1 && os.Args[1] == "version" {
		var version string
		if err := db.QueryRowContext(ctx, "SELECT version()").Scan(&version); err != nil {
			fail(fmt.Errorf("query version: %w", err))
		}
		fmt.Println(version)
		return
	}

	tx, err := db.BeginTx(ctx, nil)
	if err != nil {
		fail(fmt.Errorf("begin tx: %w", err))
	}
	defer tx.Rollback()

	dropStatements := []string{
		"DROP TABLE IF EXISTS high_risk_watchlist CASCADE",
		"DROP TABLE IF EXISTS passenger_profile CASCADE",
	}
	for _, statement := range dropStatements {
		if _, err := tx.ExecContext(ctx, statement); err != nil {
			fail(fmt.Errorf("exec %q: %w", statement, err))
		}
	}

	for _, statement := range schemaStatements() {
		if _, err := tx.ExecContext(ctx, statement); err != nil {
			fail(fmt.Errorf("exec schema statement %q: %w", statement, err))
		}
	}

	if err := tx.Commit(); err != nil {
		fail(fmt.Errorf("commit tx: %w", err))
	}

	fmt.Println("schema applied successfully")

	verifyRows, err := db.QueryContext(ctx, `
		SELECT table_name
		FROM information_schema.tables
		WHERE table_schema = 'public'
		  AND table_name IN ('system_user', 'import_batch_log', 'passenger_profile', 'high_risk_watchlist')
		ORDER BY table_name
	`)
	if err != nil {
		fail(fmt.Errorf("verify tables: %w", err))
	}
	defer verifyRows.Close()

	fmt.Println("tables:")
	for verifyRows.Next() {
		var tableName string
		if err := verifyRows.Scan(&tableName); err != nil {
			fail(fmt.Errorf("scan table name: %w", err))
		}
		fmt.Printf("- %s\n", tableName)
	}
	if err := verifyRows.Err(); err != nil {
		fail(fmt.Errorf("iterate table names: %w", err))
	}
}

func readDSN(envPath string) (string, error) {
	file, err := os.Open(envPath)
	if err != nil {
		return "", fmt.Errorf("open env file: %w", err)
	}
	defer file.Close()

	values := map[string]string{}
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		key, value, found := strings.Cut(line, "=")
		if !found {
			continue
		}
		values[strings.TrimSpace(key)] = strings.TrimSpace(value)
	}
	if err := scanner.Err(); err != nil {
		return "", fmt.Errorf("scan env file: %w", err)
	}

	if url := values["DATABASE_URL"]; url != "" {
		return url, nil
	}

	required := []string{"DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWORD", "DB_NAME"}
	for _, key := range required {
		if strings.TrimSpace(values[key]) == "" {
			return "", fmt.Errorf("missing %s in %s", key, envPath)
		}
	}

	sslMode := values["DB_SSLMODE"]
	if sslMode == "" {
		sslMode = "disable"
	}

	return fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		values["DB_HOST"],
		values["DB_PORT"],
		values["DB_USER"],
		values["DB_PASSWORD"],
		values["DB_NAME"],
		sslMode,
	), nil
}

func schemaStatements() []string {
	return []string{
		`CREATE TABLE IF NOT EXISTS passenger_profile (
			id BIGSERIAL PRIMARY KEY,
			document_num VARCHAR(64) NOT NULL,
			full_name VARCHAR(128) NOT NULL,
			profile_data JSONB,
			created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE UNIQUE INDEX IF NOT EXISTS idx_uniq_passenger_doc
			ON passenger_profile(document_num)`,
		`COMMENT ON TABLE passenger_profile IS '旅客全息画像主表（精简结构）'`,
		`COMMENT ON COLUMN passenger_profile.document_num IS '证件号码，现场扫描和检索的核心字段'`,
		`COMMENT ON COLUMN passenger_profile.full_name IS '统一全名展示字段'`,
		`COMMENT ON COLUMN passenger_profile.profile_data IS '旅客基础画像 JSON，覆盖个人基本信息、行程、历史出行、职业背景、违法犯罪记录等维度'`,
		`CREATE TABLE IF NOT EXISTS high_risk_watchlist (
			id BIGSERIAL PRIMARY KEY,
			document_num VARCHAR(64) NOT NULL,
			risk_reason TEXT NOT NULL DEFAULT '',
			created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE UNIQUE INDEX IF NOT EXISTS idx_uniq_watchlist_doc
			ON high_risk_watchlist(document_num)`,
		`COMMENT ON TABLE high_risk_watchlist IS '高风险名单表'`,
		`COMMENT ON COLUMN high_risk_watchlist.document_num IS '证件号码，用于和旅客画像做证件级关联'`,
		`COMMENT ON COLUMN high_risk_watchlist.risk_reason IS '高风险原因或名单说明'`,
	}
}

func fail(err error) {
	fmt.Fprintln(os.Stderr, err)
	os.Exit(1)
}
