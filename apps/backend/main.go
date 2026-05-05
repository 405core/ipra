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
	"ipra/backend/internal/profile"
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

	tokenManager := auth.NewTokenManager(cfg.Auth.JWTSecret, 24*time.Hour)
	authHandler := auth.NewHandler(db, tokenManager)
	profileHandler := profile.NewHandler(db)

	r := newRouter(authHandler, profileHandler)

	addr := ":" + cfg.Port
	log.Printf("backend listening on %s (%s)", addr, cfg.AppEnv)
	if err := r.Run(addr); err != nil {
		log.Fatalf("start server: %v", err)
	}
}

func newRouter(authHandler *auth.Handler, profileHandler *profile.Handler) *gin.Engine {
	r := gin.Default()

	r.GET("/api/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
			"status":  "Go 后端已就绪",
		})
	})

	profile.RegisterRoutes(r)

	if authHandler != nil {
		authHandler.Register(r)
		if profileHandler != nil {
			profileHandler.Register(r, authHandler.AuthMiddleware())
		}
	}

	return r
}
