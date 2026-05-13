package main

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"ipra/backend/internal/config"
	dbschema "ipra/backend/internal/database"
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

	var users []dbschema.SystemUser
	if err := db.Order("id ASC").Find(&users).Error; err != nil {
		log.Fatalf("query users: %v", err)
	}

	fmt.Printf("count=%d\n", len(users))
	for _, user := range users {
		fmt.Printf("id=%d work_id=%s name=%s role=%s status=%s\n", user.ID, user.WorkID, user.Name, user.Role, user.Status)
	}
}
