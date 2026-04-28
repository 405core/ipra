package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// 1. 数据库 DSN (对应你 docker ps 里的配置)
	dsn := "host=localhost user=user password=password dbname=ipradb port=5432 sslmode=disable"
	_, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		println("数据库连接失败，请检查 Docker 是否运行:", err.Error())
	}

	// 2. 初始化 Gin
	r := gin.Default()

	// 3. 定义一个测试接口 (对应前端的 /api 代理)
	r.GET("/api/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
			"status":  "Go 后端已就绪",
		})
	})

	// 4. 启动监听 8080 端口
	r.Run(":8080")
}