package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"ipra/backend/internal/audit"
	"ipra/backend/internal/auth"
	"ipra/backend/internal/config"
	"ipra/backend/internal/inquiry"
	"ipra/backend/internal/memory"
	"ipra/backend/internal/profile"
	"ipra/backend/internal/settings"
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

	auditRecorder := audit.NewRecorder(db)
	if err := auditRecorder.EnsureSchema(context.Background()); err != nil {
		log.Fatalf("ensure audit schema: %v", err)
	}

	tokenManager := auth.NewTokenManager(cfg.Auth.JWTSecret, 24*time.Hour)
	authHandler := auth.NewHandler(db, tokenManager, auditRecorder)
	profileHandler := profile.NewHandler(db, cfg.OCR)
	inquiryHandler := inquiry.NewHandler()
	memoryHandler := memory.NewHandler(memory.NewGormStore(db))
	settingsStore := settings.NewGormStore(db)
	if err := settingsStore.EnsureSchema(context.Background()); err != nil {
		log.Fatalf("ensure settings schema: %v", err)
	}
	settingsHandler := settings.NewHandler(settingsStore)
	auditHandler := audit.NewHandler(auditRecorder, authHandler.AuthMiddleware(), authHandler.ResolveAuditIdentity)

	r := newRouter(authHandler, profileHandler, inquiryHandler, memoryHandler, settingsHandler, auditHandler, auditRecorder)

	addr := ":" + cfg.Port
	log.Printf("backend listening on %s (%s)", addr, cfg.AppEnv)
	if err := r.Run(addr); err != nil {
		log.Fatalf("start server: %v", err)
	}
}

func newRouter(
	authHandler *auth.Handler,
	profileHandler *profile.Handler,
	inquiryHandler *inquiry.Handler,
	memoryHandler *memory.Handler,
	settingsHandler *settings.Handler,
	auditHandler *audit.Handler,
	auditRecorder *audit.Recorder,
) *gin.Engine {
	r := gin.Default()

	r.GET("/api/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
			"status":  "Go 后端已就绪",
		})
	})

	if auditRecorder != nil && authHandler != nil {
		r.Use(auditRecorder.RequestMiddleware(authHandler.ResolveAuditIdentity))
	}

	if inquiryHandler != nil {
		inquiryHandler.Register(r)
	}

	if authHandler != nil {
		authHandler.Register(r)
		authHandler.RegisterAdminRoutes(r)
		if memoryHandler != nil {
			memoryHandler.Register(r, authHandler.AuthMiddleware())
			memoryHandler.RegisterAdminRoutes(r, authHandler.AuthMiddleware())
		}
		if settingsHandler != nil {
			settingsHandler.Register(r, authHandler.AuthMiddleware())
		}
		if profileHandler != nil {
			profileHandler.Register(r, authHandler.AuthMiddleware())
		}
	}
	if auditHandler != nil {
		auditHandler.Register(r)
	}

	return r
}
