package main

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"ipra/backend/internal/config"
)

type columnInfo struct {
	ColumnName string
	DataType   string
}

type userRow struct {
	ID     uint64
	WorkID string
	Name   string
	Role   string
	Status string
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
		`SELECT column_name, data_type
		FROM information_schema.columns
		WHERE table_schema = current_schema()
		  AND table_name = 'system_user'
		ORDER BY ordinal_position`,
	).Scan(&columns).Error; err != nil {
		log.Fatalf("query columns: %v", err)
	}

	for _, column := range columns {
		fmt.Printf("%s %s\n", column.ColumnName, column.DataType)
	}

	fmt.Println("--- rows ---")

	var rows []userRow
	if err := db.Raw(
		`SELECT id, work_id, name, role, status
		FROM system_user
		ORDER BY id
		LIMIT 10`,
	).Scan(&rows).Error; err != nil {
		log.Fatalf("query rows: %v", err)
	}

	for _, row := range rows {
		fmt.Printf("%d\t%s\t%s\t%s\t%s\n", row.ID, row.WorkID, row.Name, row.Role, row.Status)
	}
}
