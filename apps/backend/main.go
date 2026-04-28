package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
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

	if err := auth.AutoMigrate(db); err != nil {
		log.Fatalf("migrate auth tables: %v", err)
	}
	if err := auth.SeedUsers(db); err != nil {
		log.Fatalf("seed auth users: %v", err)
	}

	tokenManager := auth.NewTokenManager(cfg.Auth.JWTSecret, 24*time.Hour)
	authHandler := auth.NewHandler(db, tokenManager)

	r := newRouter(authHandler)

	addr := ":" + cfg.Port
	log.Printf("backend listening on %s (%s)", addr, cfg.AppEnv)
	if err := r.Run(addr); err != nil {
		log.Fatalf("start server: %v", err)
	}
}

func newRouter(authHandler *auth.Handler) *gin.Engine {
	r := gin.Default()

	r.GET("/api/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
			"status":  "Go 后端已就绪",
		})
	})

	if authHandler != nil {
		authHandler.Register(r)
	}

	return r
}
