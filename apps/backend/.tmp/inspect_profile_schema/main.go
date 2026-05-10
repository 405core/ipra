package main

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"ipra/backend/internal/config"
)

type columnInfo struct {
	TableName  string
	ColumnName string
	DataType   string
}

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("load config: %v", err)
	}

	db, err := gorm.Open(postgres.Open(cfg.Database.DSN()), &gorm.Config{})
	if err != nil {
		log.Fatalf("connect database: %v", err)
	}

	var columns []columnInfo
	if err := db.Raw(
		`SELECT table_name, column_name, data_type
		FROM information_schema.columns
		WHERE table_schema = current_schema()
		  AND table_name IN ('passenger_profile', 'high_risk_watchlist')
		ORDER BY table_name, ordinal_position`,
	).Scan(&columns).Error; err != nil {
		log.Fatalf("query columns: %v", err)
	}

	currentTable := ""
	for _, column := range columns {
		if column.TableName != currentTable {
			currentTable = column.TableName
			fmt.Printf("--- %s ---\n", currentTable)
		}
		fmt.Printf("%s %s\n", column.ColumnName, column.DataType)
	}
}
