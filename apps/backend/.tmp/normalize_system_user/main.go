package main

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"ipra/backend/internal/auth"
	"ipra/backend/internal/config"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("load config: %v", err)
	}

	db, err := gorm.Open(postgres.Open(cfg.Database.DSN()), &gorm.Config{})
	if err != nil {
		log.Fatalf("connect database: %v", err)
	}

	passwordHash, err := auth.HashPassword("123")
	if err != nil {
		log.Fatalf("hash password: %v", err)
	}

	updates := []struct {
		id     int
		values map[string]any
	}{
		{
			id: 9,
			values: map[string]any{
				"work_id":       "admin",
				"name":          "系统管理员",
				"role":          "admin",
				"status":        "active",
				"password_hash": passwordHash,
			},
		},
		{
			id: 10,
			values: map[string]any{
				"work_id":       "user",
				"name":          "员工",
				"role":          "user",
				"status":        "active",
				"password_hash": passwordHash,
			},
		},
		{
			id: 1,
			values: map[string]any{
				"role":   "admin",
				"status": "active",
			},
		},
		{
			id: 2,
			values: map[string]any{
				"name":   "员工",
				"role":   "user",
				"status": "active",
			},
		},
	}

	for _, update := range updates {
		if err := db.Table("system_user").Where("id = ?", update.id).Updates(update.values).Error; err != nil {
			log.Fatalf("exec update: %v", err)
		}
	}
}
