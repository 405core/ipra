package profile

import (
	"embed"
	"net/http"

	"github.com/gin-gonic/gin"
)

const (
	baseProfileTemplateFilename = "ipra-passenger-profile-template.xlsx"
	highRiskTemplateFilename    = "ipra-high-risk-watchlist-template.xlsx"
	xlsxContentType             = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
)

//go:embed templates/ipra-passenger-profile-template.xlsx templates/ipra-high-risk-watchlist-template.xlsx
var templateFiles embed.FS

func registerTemplateRoutes(r gin.IRouter) {
	r.GET("/passenger-profile.xlsx", handleBaseProfileTemplate)
	r.GET("/high-risk-watchlist.xlsx", handleHighRiskTemplate)
}

func handleBaseProfileTemplate(c *gin.Context) {
	serveEmbeddedTemplate(c, "templates/"+baseProfileTemplateFilename, baseProfileTemplateFilename)
}

func handleHighRiskTemplate(c *gin.Context) {
	serveEmbeddedTemplate(c, "templates/"+highRiskTemplateFilename, highRiskTemplateFilename)
}

func serveEmbeddedTemplate(c *gin.Context, assetPath string, filename string) {
	data, err := templateFiles.ReadFile(assetPath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "读取导入模板失败"})
		return
	}

	c.Header("Content-Type", xlsxContentType)
	c.Header("Content-Disposition", `attachment; filename="`+filename+`"`)
	c.Header("Cache-Control", "no-store, no-cache, must-revalidate")
	c.Header("Pragma", "no-cache")
	c.Header("X-Content-Type-Options", "nosniff")
	c.Data(http.StatusOK, xlsxContentType, data)
}
