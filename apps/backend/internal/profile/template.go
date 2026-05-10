package profile

import (
	"embed"
	"net/http"

	"github.com/gin-gonic/gin"
)

const ImportTemplateFilename = "ipra-passenger-profile-template.xlsx"

//go:embed templates/ipra-passenger-profile-template.xlsx
var templateFiles embed.FS

func RegisterRoutes(r gin.IRouter) {
	r.GET("/api/import-templates/passenger-profile.xlsx", handleImportTemplate)
}

func handleImportTemplate(c *gin.Context) {
	data, err := templateFiles.ReadFile("templates/" + ImportTemplateFilename)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "读取导入模板失败"})
		return
	}

	c.Header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	c.Header("Content-Disposition", `attachment; filename="`+ImportTemplateFilename+`"`)
	c.Data(http.StatusOK, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", data)
}
