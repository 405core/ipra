package profile

import (
	"archive/zip"
	"bytes"
	"testing"
)

func TestParseCSVData(t *testing.T) {
	rows, err := parseSpreadsheet("profiles.csv", []byte("document_type,document_num,full_name\nPASSPORT,E12345678,ZHANG WEI\n"))
	if err != nil {
		t.Fatalf("parseSpreadsheet returned error: %v", err)
	}

	if got, want := len(rows), 2; got != want {
		t.Fatalf("len(rows) = %d, want %d", got, want)
	}
	if rows[1][1] != "E12345678" {
		t.Fatalf("document_num = %q, want %q", rows[1][1], "E12345678")
	}
}

func TestParseXLSXData(t *testing.T) {
	var buffer bytes.Buffer
	zipWriter := zip.NewWriter(&buffer)

	writeZipFile(t, zipWriter, "xl/workbook.xml", `<?xml version="1.0" encoding="UTF-8"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="基础画像模板" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>`)
	writeZipFile(t, zipWriter, "xl/_rels/workbook.xml.rels", `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
</Relationships>`)
	writeZipFile(t, zipWriter, "xl/sharedStrings.xml", `<?xml version="1.0" encoding="UTF-8"?>
<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="6" uniqueCount="6">
  <si><t>document_type</t></si>
  <si><t>document_num</t></si>
  <si><t>full_name</t></si>
  <si><t>PASSPORT</t></si>
  <si><t>E92834102</t></si>
  <si><t>ZHANG WEI</t></si>
</sst>`)
	writeZipFile(t, zipWriter, "xl/worksheets/sheet1.xml", `<?xml version="1.0" encoding="UTF-8"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetData>
    <row r="1">
      <c r="A1" t="s"><v>0</v></c>
      <c r="B1" t="s"><v>1</v></c>
      <c r="C1" t="s"><v>2</v></c>
    </row>
    <row r="2">
      <c r="A2" t="s"><v>3</v></c>
      <c r="B2" t="s"><v>4</v></c>
      <c r="C2" t="s"><v>5</v></c>
    </row>
  </sheetData>
</worksheet>`)

	if err := zipWriter.Close(); err != nil {
		t.Fatalf("Close() error = %v", err)
	}

	parsed, err := parseSpreadsheetWithMetadata("profiles.xlsx", buffer.Bytes())
	if err != nil {
		t.Fatalf("parseSpreadsheetWithMetadata returned error: %v", err)
	}

	if got, want := parsed.WorksheetName, "基础画像模板"; got != want {
		t.Fatalf("WorksheetName = %q, want %q", got, want)
	}
	if got, want := parsed.Rows[1][2], "ZHANG WEI"; got != want {
		t.Fatalf("full_name = %q, want %q", got, want)
	}
}

func TestBuildProfileRecord(t *testing.T) {
	row := map[string]string{
		normalizeHeaderKey("document_type"):  "passport",
		normalizeHeaderKey("document_num"):   "E92834102",
		normalizeHeaderKey("full_name"):      "ZHANG WEI",
		normalizeHeaderKey("gender"):         "男",
		normalizeHeaderKey("birth_date"):     "1990-04-12",
		normalizeHeaderKey("pnr"):            "CX880-LAX",
		normalizeHeaderKey("destination"):    "LAX",
		normalizeHeaderKey("monthly_income"): "不稳定",
		normalizeHeaderKey("risk_tags"):      "名单重合,异常行程",
		normalizeHeaderKey("case_type"):      "跨境赌博关联",
		normalizeHeaderKey("issuing_region"): "cn",
	}

	record, err := buildProfileRecord(row, importTypeBaseProfile)
	if err != nil {
		t.Fatalf("buildProfileRecord returned error: %v", err)
	}

	if got, want := record.DocumentNum, "E92834102"; got != want {
		t.Fatalf("DocumentNum = %q, want %q", got, want)
	}
	if got, want := record.FullName, "ZHANG WEI"; got != want {
		t.Fatalf("FullName = %q, want %q", got, want)
	}

	tripInfo, ok := record.ProfileData["tripInfo"].(map[string]any)
	if !ok {
		t.Fatalf("tripInfo missing from profile data")
	}
	if got, want := tripInfo["pnr"], "CX880-LAX"; got != want {
		t.Fatalf("tripInfo.pnr = %v, want %q", got, want)
	}
}

func TestBuildHighRiskProfileRecordWithRiskCategory(t *testing.T) {
	row := map[string]string{
		normalizeHeaderKey("document_num"): "E92834102",
		normalizeHeaderKey("风险类别"):         "跨境电诈",
		normalizeHeaderKey("高风险原因"):        "多次命中涉诈重点关注名单",
	}

	record, err := buildProfileRecord(row, importTypeHighRisk)
	if err != nil {
		t.Fatalf("buildProfileRecord returned error: %v", err)
	}

	if got, want := record.DocumentNum, "E92834102"; got != want {
		t.Fatalf("DocumentNum = %q, want %q", got, want)
	}
	if got, want := record.RiskCategory, "cross_border_fraud"; got != want {
		t.Fatalf("RiskCategory = %q, want %q", got, want)
	}
	if got, want := record.RiskReason, "多次命中涉诈重点关注名单"; got != want {
		t.Fatalf("RiskReason = %q, want %q", got, want)
	}
}

func TestNormalizeRiskCategory(t *testing.T) {
	tests := []struct {
		name  string
		value string
		want  string
	}{
		{name: "empty stays empty", value: "", want: ""},
		{name: "gambling maps to code", value: "跨境赌博", want: "cross_border_gambling"},
		{name: "fraud maps to code", value: "跨境电诈", want: "cross_border_fraud"},
		{name: "illegal work maps to code", value: "非法务工", want: "illegal_work"},
		{name: "code stays code", value: "cross_border_fraud", want: "cross_border_fraud"},
		{name: "other non-empty falls back", value: "出境目的存疑", want: "suspicious_purpose"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := normalizeRiskCategory(tt.value); got != tt.want {
				t.Fatalf("normalizeRiskCategory(%q) = %q, want %q", tt.value, got, tt.want)
			}
		})
	}
}

func TestDetectImportType(t *testing.T) {
	tests := []struct {
		name    string
		headers []string
		want    string
		wantErr bool
	}{
		{
			name:    "base profile template",
			headers: []string{"证件号码", "姓名", "国籍", "航班号"},
			want:    importTypeBaseProfile,
		},
		{
			name:    "high risk template",
			headers: []string{"证件号码", "高风险原因"},
			want:    importTypeHighRisk,
		},
		{
			name:    "high risk template by risk category",
			headers: []string{"证件号码", "风险类别"},
			want:    importTypeHighRisk,
		},
		{
			name:    "high risk template with full name column",
			headers: []string{"证件号码", "姓名", "高风险原因"},
			want:    importTypeHighRisk,
		},
		{
			name:    "name only is ambiguous",
			headers: []string{"证件号码", "姓名"},
			wantErr: true,
		},
		{
			name:    "missing document column",
			headers: []string{"姓名", "高风险原因"},
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := detectImportType(tt.headers)
			if tt.wantErr {
				if err == nil {
					t.Fatalf("detectImportType(%v) error = nil, want error", tt.headers)
				}
				return
			}
			if err != nil {
				t.Fatalf("detectImportType(%v) error = %v", tt.headers, err)
			}
			if got != tt.want {
				t.Fatalf("detectImportType(%v) = %q, want %q", tt.headers, got, tt.want)
			}
		})
	}
}

func TestDetectImportTypeFromSpreadsheet(t *testing.T) {
	tests := []struct {
		name          string
		rows          [][]string
		worksheetName string
		want          string
	}{
		{
			name:          "detect by worksheet name",
			rows:          [][]string{{"证件号码"}, {"E92834102"}},
			worksheetName: highRiskTemplateTitle,
			want:          importTypeHighRisk,
		},
		{
			name:          "detect by title row",
			rows:          [][]string{{highRiskTemplateTitle}, {"证件号码"}, {"E92834102"}},
			worksheetName: "",
			want:          importTypeHighRisk,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := detectImportTypeFromSpreadsheet(tt.rows, tt.worksheetName)
			if err != nil {
				t.Fatalf("detectImportTypeFromSpreadsheet error = %v", err)
			}
			if got != tt.want {
				t.Fatalf("detectImportTypeFromSpreadsheet = %q, want %q", got, tt.want)
			}
		})
	}
}

func TestSplitSpreadsheetRowsSkipsTemplateTitle(t *testing.T) {
	headers, dataRows := splitSpreadsheetRows([][]string{
		{highRiskTemplateTitle},
		{"证件号码", "风险类别", "高风险原因"},
		{"E92834102", "跨境赌博", "跨境赌博关联"},
	})

	if got, want := len(headers), 3; got != want {
		t.Fatalf("len(headers) = %d, want %d", got, want)
	}
	if got, want := headers[1], "风险类别"; got != want {
		t.Fatalf("headers[1] = %q, want %q", got, want)
	}
	if got, want := dataRows[0][1], "跨境赌博"; got != want {
		t.Fatalf("dataRows[0][1] = %q, want %q", got, want)
	}
	if got, want := dataRows[0][0], "E92834102"; got != want {
		t.Fatalf("dataRows[0][0] = %q, want %q", got, want)
	}
}

func writeZipFile(t *testing.T, writer *zip.Writer, name string, content string) {
	t.Helper()

	fileWriter, err := writer.Create(name)
	if err != nil {
		t.Fatalf("Create(%s) error = %v", name, err)
	}

	if _, err := fileWriter.Write([]byte(content)); err != nil {
		t.Fatalf("Write(%s) error = %v", name, err)
	}
}
