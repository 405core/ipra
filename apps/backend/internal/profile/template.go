package profile

import (
	"archive/zip"
	"bytes"
	"encoding/xml"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

const (
	baseProfileTemplateFilename = "ipra-passenger-profile-template.xlsx"
	highRiskTemplateFilename    = "ipra-high-risk-watchlist-template.xlsx"
	xlsxContentType             = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
)

func RegisterRoutes(r gin.IRouter) {
	r.GET("/api/import-templates/passenger-profile.xlsx", handleImportTemplate)
	r.GET("/api/import-templates/high-risk-watchlist.xlsx", handleHighRiskTemplate)
}

func handleImportTemplate(c *gin.Context) {
	rows := [][]string{
		{"证件号码", "姓名", "证件类型", "签发地区", "国籍", "性别", "出生日期", "联系电话", "订票编码", "航班号", "出发地", "目的地", "出行目的", "近年出入境次数", "职业", "工作单位", "风险标签", "违法犯罪记录", "备注"},
		{"E92834102", "张伟", "护照", "CN", "中国", "男", "1990-04-12", "13800138000", "CX880-LAX", "CX880", "香港", "洛杉矶", "旅游", "5", "自由职业", "无固定单位", "异常行程,重点关注", "无", "示例数据，可删除"},
	}
	serveTemplateWorkbook(c, baseProfileTemplateFilename, "基础画像模板", rows)
}

func handleHighRiskTemplate(c *gin.Context) {
	rows := [][]string{
		{"证件号码", "姓名", "高风险原因"},
		{"E92834102", "张伟", "跨境赌博关联，需重点核验出行目的"},
	}
	serveTemplateWorkbook(c, highRiskTemplateFilename, "高风险名单模板", rows)
}

func serveTemplateWorkbook(c *gin.Context, filename string, sheetName string, rows [][]string) {
	data, err := buildWorkbook(sheetName, rows)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "读取导入模板失败"})
		return
	}

	c.Header("Content-Type", xlsxContentType)
	c.Header("Content-Disposition", `attachment; filename="`+filename+`"`)
	c.Data(http.StatusOK, xlsxContentType, data)
}

func buildWorkbook(sheetName string, rows [][]string) ([]byte, error) {
	var buffer bytes.Buffer
	zipWriter := zip.NewWriter(&buffer)

	files := map[string]string{
		"[Content_Types].xml": buildContentTypesXML(),
		"_rels/.rels":         buildRootRelsXML(),
		"xl/workbook.xml":     buildWorkbookXML(sheetName),
		"xl/_rels/workbook.xml.rels": buildWorkbookRelsXML(),
		"xl/worksheets/sheet1.xml":   buildWorksheetXML(rows),
	}

	for name, content := range files {
		writer, err := zipWriter.Create(name)
		if err != nil {
			return nil, err
		}
		if _, err := writer.Write([]byte(content)); err != nil {
			return nil, err
		}
	}

	if err := zipWriter.Close(); err != nil {
		return nil, err
	}

	return buffer.Bytes(), nil
}

func buildContentTypesXML() string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>`
}

func buildRootRelsXML() string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`
}

func buildWorkbookXML(sheetName string) string {
	return fmt.Sprintf(`<?xml version="1.0" encoding="UTF-8"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
 xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="%s" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>`, xmlEscape(sheetName))
}

func buildWorkbookRelsXML() string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
</Relationships>`
}

func buildWorksheetXML(rows [][]string) string {
	var builder strings.Builder
	builder.WriteString(`<?xml version="1.0" encoding="UTF-8"?>`)
	builder.WriteString(`<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>`)

	for rowIndex, row := range rows {
		builder.WriteString(fmt.Sprintf(`<row r="%d">`, rowIndex+1))
		for colIndex, value := range row {
			ref := fmt.Sprintf("%s%d", excelColumnName(colIndex+1), rowIndex+1)
			builder.WriteString(fmt.Sprintf(
				`<c r="%s" t="inlineStr"><is><t xml:space="preserve">%s</t></is></c>`,
				ref,
				xmlEscape(value),
			))
		}
		builder.WriteString(`</row>`)
	}

	builder.WriteString(`</sheetData></worksheet>`)
	return builder.String()
}

func excelColumnName(index int) string {
	if index <= 0 {
		return "A"
	}

	var result []byte
	for index > 0 {
		index--
		result = append([]byte{byte('A' + (index % 26))}, result...)
		index /= 26
	}
	return string(result)
}

func xmlEscape(value string) string {
	var buffer bytes.Buffer
	if err := xml.EscapeText(&buffer, []byte(value)); err != nil {
		return value
	}
	return buffer.String()
}
