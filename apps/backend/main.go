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
	"ipra/backend/internal/sensitive"
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
	memoryStore := memory.NewGormStore(db)
	memoryHandler := memory.NewHandler(memoryStore)
	auditHandler := audit.NewHandler(auditRecorder, authHandler.AuthMiddleware(), authHandler.ResolveAuditIdentity)
	var sensitiveManager *sensitive.Manager
	if cfg.Sensitive.Enabled {
		manager, sensitiveErr := sensitive.NewManager(cfg.Sensitive.FontCandidates)
		if sensitiveErr != nil {
			log.Printf("sensitive image renderer disabled: %v", sensitiveErr)
		} else {
			sensitiveManager = manager
			profileHandler.SetSensitiveManager(manager)
			auditHandler.SetSensitiveManager(manager)
			authHandler.SetSensitiveManager(manager)
			inquiryHandler.SetSensitiveManager(manager)
		}
	}
	inquiryHandler.SetMemoryStore(memoryStore)
	inquiryHandler.SetAIServiceBaseURL(cfg.AIService.BaseURL)

	r := newRouter(authHandler, profileHandler, inquiryHandler, memoryHandler, auditHandler, auditRecorder, sensitiveManager)

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
	auditHandler *audit.Handler,
	auditRecorder *audit.Recorder,
	sensitiveManager *sensitive.Manager,
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
		if inquiryHandler != nil {
			inquiryHandler.RegisterProtected(r, authHandler.AuthMiddleware())
		}
		if profileHandler != nil {
			profileHandler.Register(r, authHandler.AuthMiddleware())
		}
	}
	if auditHandler != nil {
		auditHandler.Register(r)
	}
	if sensitiveManager != nil && authHandler != nil {
		assetGroup := r.Group("/api/sensitive-assets")
		assetGroup.Use(authHandler.AuthMiddleware())
		assetGroup.Use(func(c *gin.Context) {
			claims, ok := auth.ClaimsFromContext(c)
			if !ok {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
				return
			}
			c.Set("sensitiveAssetUserID", claims.UserID)
			c.Next()
		})
		assetGroup.GET("/:assetId", sensitiveManager.HandleAsset)
	}

	return r
}
