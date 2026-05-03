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

	rows, err := parseSpreadsheet("profiles.xlsx", buffer.Bytes())
	if err != nil {
		t.Fatalf("parseSpreadsheet returned error: %v", err)
	}

	if got, want := rows[1][2], "ZHANG WEI"; got != want {
		t.Fatalf("full_name = %q, want %q", got, want)
	}
}

func TestBuildProfileRecord(t *testing.T) {
	row := map[string]string{
		normalizeHeaderKey("document_type"):    "passport",
		normalizeHeaderKey("document_num"):     "E92834102",
		normalizeHeaderKey("full_name"):        "ZHANG WEI",
		normalizeHeaderKey("gender"):           "男",
		normalizeHeaderKey("birth_date"):       "1990-04-12",
		normalizeHeaderKey("pnr"):              "CX880-LAX",
		normalizeHeaderKey("destination"):      "LAX",
		normalizeHeaderKey("monthly_income"):   "不稳定",
		normalizeHeaderKey("risk_tags"):        "名单重合,异常行程",
		normalizeHeaderKey("watchlist_source"): "采购方高风险名单",
		normalizeHeaderKey("case_type"):        "跨境赌博关联",
		normalizeHeaderKey("issuing_region"):   "cn",
	}

	record, err := buildProfileRecord(row, importTypeHighRisk)
	if err != nil {
		t.Fatalf("buildProfileRecord returned error: %v", err)
	}

	if got, want := record.DocumentType, "PASSPORT"; got != want {
		t.Fatalf("DocumentType = %q, want %q", got, want)
	}
	if !record.IsHighRisk {
		t.Fatalf("IsHighRisk = false, want true")
	}

	tripInfo, ok := record.DimensionData["tripInfo"].(map[string]any)
	if !ok {
		t.Fatalf("tripInfo missing from dimension data")
	}
	if got, want := tripInfo["pnr"], "CX880-LAX"; got != want {
		t.Fatalf("tripInfo.pnr = %v, want %q", got, want)
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
