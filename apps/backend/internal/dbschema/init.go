package dbschema

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"ipra/backend/internal/config"

	_ "github.com/jackc/pgx/v5/stdlib"
)

func InitFromEnv(ctx context.Context) error {
	cfg, err := config.Load()
	if err != nil {
		return fmt.Errorf("load config: %w", err)
	}

	schemaPath, err := resolveSchemaPath()
	if err != nil {
		return err
	}

	sqlText, err := os.ReadFile(schemaPath)
	if err != nil {
		return fmt.Errorf("read schema %s: %w", schemaPath, err)
	}

	db, err := sql.Open("pgx", cfg.Database.DSN())
	if err != nil {
		return fmt.Errorf("open database: %w", err)
	}
	defer db.Close()

	if err := db.PingContext(ctx); err != nil {
		return fmt.Errorf("ping database: %w", err)
	}

	statements := splitSQLStatements(string(sqlText))
	for index, statement := range statements {
		if _, err := db.ExecContext(ctx, statement); err != nil {
			return fmt.Errorf("execute schema statement %d: %w", index+1, err)
		}
	}

	return nil
}

func resolveSchemaPath() (string, error) {
	paths := []string{
		filepath.Join("..", "..", "docs", "database", "schema.sql"),
		filepath.Join("docs", "database", "schema.sql"),
		filepath.Join("..", "docs", "database", "schema.sql"),
	}
	for _, path := range paths {
		clean := filepath.Clean(path)
		if info, err := os.Stat(clean); err == nil && !info.IsDir() {
			return clean, nil
		}
	}
	return "", fmt.Errorf("docs/database/schema.sql not found from current working directory")
}

func splitSQLStatements(sqlText string) []string {
	statements := make([]string, 0, 32)
	var builder strings.Builder
	inSingleQuote := false
	inDoubleQuote := false
	inLineComment := false
	inBlockComment := false
	escape := false

	for index := 0; index < len(sqlText); index++ {
		char := sqlText[index]
		next := byte(0)
		if index+1 < len(sqlText) {
			next = sqlText[index+1]
		}

		if inLineComment {
			builder.WriteByte(char)
			if char == '\n' {
				inLineComment = false
			}
			continue
		}
		if inBlockComment {
			builder.WriteByte(char)
			if char == '*' && next == '/' {
				builder.WriteByte(next)
				index++
				inBlockComment = false
			}
			continue
		}

		if !inSingleQuote && !inDoubleQuote {
			if char == '-' && next == '-' {
				builder.WriteByte(char)
				builder.WriteByte(next)
				index++
				inLineComment = true
				continue
			}
			if char == '/' && next == '*' {
				builder.WriteByte(char)
				builder.WriteByte(next)
				index++
				inBlockComment = true
				continue
			}
		}

		if char == '\'' && !inDoubleQuote && !escape {
			inSingleQuote = !inSingleQuote
		} else if char == '"' && !inSingleQuote && !escape {
			inDoubleQuote = !inDoubleQuote
		}

		if char == ';' && !inSingleQuote && !inDoubleQuote {
			appendStatement(&statements, builder.String())
			builder.Reset()
			escape = false
			continue
		}

		builder.WriteByte(char)
		escape = char == '\\' && !escape
		if char != '\\' {
			escape = false
		}
	}

	appendStatement(&statements, builder.String())
	return statements
}

func appendStatement(statements *[]string, value string) {
	statement := strings.TrimSpace(value)
	if statement == "" {
		return
	}
	*statements = append(*statements, statement)
}
