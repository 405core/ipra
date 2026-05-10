package main

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"ipra/backend/internal/config"
)

type tableInfo struct {
	TableName string
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

	var tables []tableInfo
	if err := db.Raw(
		`SELECT table_name
		FROM information_schema.tables
		WHERE table_schema = current_schema()
		  AND table_type = 'BASE TABLE'
		ORDER BY table_name`,
	).Scan(&tables).Error; err != nil {
		log.Fatalf("query tables: %v", err)
	}

	fmt.Println("--- tables ---")
	for _, table := range tables {
		fmt.Println(table.TableName)
	}

	var users []map[string]any
	if err := db.Table(`"system_user"`).
		Select(`"id", "work_id", "name", "role", "status"`).
		Order(`"id"`).
		Limit(10).
		Find(&users).Error; err != nil {
		log.Fatalf("query users: %v", err)
	}

	fmt.Println("--- users ---")
	for _, user := range users {
		fmt.Println(user)
	}
}
