package profile

import (
	"embed"
	"net/http"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

const (
	baseProfileTemplateFilename = "ipra-passenger-profile-template.xlsx"
	highRiskTemplateFilename    = "ipra-high-risk-watchlist-template.xlsx"
	spreadsheetContentType      = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
)

//go:embed templates/ipra-passenger-profile-template.xlsx templates/ipra-high-risk-watchlist-template.xlsx
var templateFiles embed.FS

func RegisterRoutes(r gin.IRouter) {
	r.GET("/api/import-templates/passenger-profile.xlsx", func(c *gin.Context) {
		handleImportTemplate(c, baseProfileTemplateFilename)
	})
	r.GET("/api/import-templates/high-risk-watchlist.xlsx", func(c *gin.Context) {
		handleImportTemplate(c, highRiskTemplateFilename)
	})
}

func handleImportTemplate(c *gin.Context, filename string) {
	data, err := templateFiles.ReadFile(filepath.ToSlash("templates/" + filename))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "读取导入模板失败"})
		return
	}

	c.Header("Content-Type", spreadsheetContentType)
	c.Header("Content-Disposition", `attachment; filename="`+filename+`"`)
	c.Data(http.StatusOK, spreadsheetContentType, data)
}
