package profile

import (
	"archive/zip"
	"bytes"
	"encoding/csv"
	"encoding/xml"
	"errors"
	"fmt"
	"io"
	"path/filepath"
	"slices"
	"strconv"
	"strings"
	"time"
	"unicode"
)

type worksheetXML struct {
	Rows []worksheetRowXML `xml:"sheetData>row"`
}

type worksheetRowXML struct {
	Cells []worksheetCellXML `xml:"c"`
}

type worksheetCellXML struct {
	Ref    string              `xml:"r,attr"`
	Type   string              `xml:"t,attr"`
	Value  string              `xml:"v"`
	Inline sharedStringItemXML `xml:"is"`
}

type sharedStringsXML struct {
	Items []sharedStringItemXML `xml:"si"`
}

type sharedStringItemXML struct {
	Text string               `xml:"t"`
	Runs []sharedStringRunXML `xml:"r"`
}

type sharedStringRunXML struct {
	Text string `xml:"t"`
}

func parseSpreadsheet(filename string, data []byte) ([][]string, error) {
	switch strings.ToLower(filepath.Ext(filename)) {
	case ".csv":
		return parseCSVData(data)
	case ".xlsx":
		return parseXLSXData(data)
	default:
		return nil, fmt.Errorf("仅支持 CSV 或 XLSX 文件")
	}
}

func parseCSVData(data []byte) ([][]string, error) {
	reader := csv.NewReader(bytes.NewReader(data))
	reader.FieldsPerRecord = -1
	reader.TrimLeadingSpace = true

	rows, err := reader.ReadAll()
	if err != nil {
		return nil, fmt.Errorf("解析 CSV 失败: %w", err)
	}

	normalized := make([][]string, 0, len(rows))
	for _, row := range rows {
		normalized = append(normalized, normalizeRow(row))
	}

	return normalized, nil
}

func parseXLSXData(data []byte) ([][]string, error) {
	reader, err := zip.NewReader(bytes.NewReader(data), int64(len(data)))
	if err != nil {
		return nil, fmt.Errorf("解析 XLSX 失败: %w", err)
	}

	files := make(map[string]*zip.File, len(reader.File))
	worksheetNames := make([]string, 0)
	for _, file := range reader.File {
		files[file.Name] = file
		if strings.HasPrefix(file.Name, "xl/worksheets/sheet") && strings.HasSuffix(file.Name, ".xml") {
			worksheetNames = append(worksheetNames, file.Name)
		}
	}

	slices.Sort(worksheetNames)
	if len(worksheetNames) == 0 {
		return nil, errors.New("XLSX 中未找到工作表")
	}

	sharedStrings := make([]string, 0)
	if file, ok := files["xl/sharedStrings.xml"]; ok {
		sharedStrings, err = parseSharedStrings(file)
		if err != nil {
			return nil, err
		}
	}

	rows, err := parseWorksheet(worksheetNames[0], files, sharedStrings)
	if err != nil {
		return nil, err
	}

	return rows, nil
}

func parseSharedStrings(file *zip.File) ([]string, error) {
	reader, err := file.Open()
	if err != nil {
		return nil, fmt.Errorf("读取 shared strings 失败: %w", err)
	}
	defer reader.Close()

	payload, err := io.ReadAll(reader)
	if err != nil {
		return nil, fmt.Errorf("读取 shared strings 失败: %w", err)
	}

	var table sharedStringsXML
	if err := xml.Unmarshal(payload, &table); err != nil {
		return nil, fmt.Errorf("解析 shared strings 失败: %w", err)
	}

	values := make([]string, 0, len(table.Items))
	for _, item := range table.Items {
		values = append(values, strings.TrimSpace(item.value()))
	}

	return values, nil
}

func parseWorksheet(name string, files map[string]*zip.File, sharedStrings []string) ([][]string, error) {
	file, ok := files[name]
	if !ok {
		return nil, errors.New("XLSX 工作表不存在")
	}

	reader, err := file.Open()
	if err != nil {
		return nil, fmt.Errorf("读取工作表失败: %w", err)
	}
	defer reader.Close()

	payload, err := io.ReadAll(reader)
	if err != nil {
		return nil, fmt.Errorf("读取工作表失败: %w", err)
	}

	var worksheet worksheetXML
	if err := xml.Unmarshal(payload, &worksheet); err != nil {
		return nil, fmt.Errorf("解析工作表失败: %w", err)
	}

	rows := make([][]string, 0, len(worksheet.Rows))
	for _, row := range worksheet.Rows {
		if len(row.Cells) == 0 {
			rows = append(rows, nil)
			continue
		}

		indexedValues := make(map[int]string, len(row.Cells))
		maxColumnIndex := 0
		for idx, cell := range row.Cells {
			columnIndex := columnIndexFromRef(cell.Ref)
			if columnIndex < 0 {
				columnIndex = idx
			}
			if columnIndex > maxColumnIndex {
				maxColumnIndex = columnIndex
			}
			indexedValues[columnIndex] = readWorksheetCell(cell, sharedStrings)
		}

		rowValues := make([]string, maxColumnIndex+1)
		for idx := range rowValues {
			rowValues[idx] = strings.TrimSpace(indexedValues[idx])
		}
		rows = append(rows, trimTrailingEmptyColumns(rowValues))
	}

	return rows, nil
}

func splitSpreadsheetRows(rows [][]string) ([]string, [][]string) {
	for idx, row := range rows {
		normalized := normalizeRow(row)
		if !isEmptyRow(normalized) {
			headers := normalized
			dataRows := make([][]string, 0, len(rows)-idx-1)
			for _, candidate := range rows[idx+1:] {
				nextRow := normalizeRow(candidate)
				if isEmptyRow(nextRow) {
					continue
				}
				dataRows = append(dataRows, nextRow)
			}
			return headers, dataRows
		}
	}

	return nil, nil
}

func rowToValueMap(headers []string, row []string) map[string]string {
	values := make(map[string]string, len(headers))
	for idx, header := range headers {
		normalizedHeader := normalizeHeaderKey(header)
		if normalizedHeader == "" {
			continue
		}

		value := ""
		if idx < len(row) {
			value = strings.TrimSpace(row[idx])
		}
		values[normalizedHeader] = value
	}
	return values
}

func buildProfileRecord(row map[string]string, importType string) (profileRecord, error) {
	usedKeys := make(map[string]struct{})

	documentType := normalizeDocumentType(readAlias(row, usedKeys,
		"document_type", "证件类型", "证件类别",
	))
	if documentType == "" {
		return profileRecord{}, errors.New("证件类型不能为空")
	}

	documentNum := strings.TrimSpace(readAlias(row, usedKeys,
		"document_num", "document_id", "passport_no", "证件号码", "证件号", "护照号", "身份证号",
	))
	if documentNum == "" {
		return profileRecord{}, errors.New("证件号码不能为空")
	}

	fullName := strings.TrimSpace(readAlias(row, usedKeys,
		"full_name", "name", "姓名",
	))
	if fullName == "" {
		return profileRecord{}, errors.New("姓名不能为空")
	}

	issuingRegion := strings.TrimSpace(readAlias(row, usedKeys,
		"issuing_region", "issuing_country", "country_code", "签发地区", "签发国家", "签发区域",
	))
	if issuingRegion == "" {
		issuingRegion = "CN"
	}

	genderValue := strings.TrimSpace(readAlias(row, usedKeys,
		"gender", "sex", "性别",
	))
	gender, err := parseGender(genderValue)
	if err != nil {
		return profileRecord{}, err
	}

	birthDateValue := strings.TrimSpace(readAlias(row, usedKeys,
		"birth_date", "birthday", "出生日期", "出生年月日",
	))
	birthDate, err := parseDateValue(birthDateValue)
	if err != nil {
		return profileRecord{}, fmt.Errorf("出生日期格式无效")
	}

	identityDetails := compactMap(map[string]any{
		"address":          strings.TrimSpace(readAlias(row, usedKeys, "address", "住址", "地址")),
		"ethnicity":        strings.TrimSpace(readAlias(row, usedKeys, "ethnicity", "民族")),
		"issuingAuthority": strings.TrimSpace(readAlias(row, usedKeys, "issuing_authority", "签发机关")),
		"expiryDate":       strings.TrimSpace(readAlias(row, usedKeys, "expiry_date", "证件有效期", "护照有效期")),
		"visaNumber":       strings.TrimSpace(readAlias(row, usedKeys, "visa_number", "签证号")),
		"visaType":         strings.TrimSpace(readAlias(row, usedKeys, "visa_type", "签证类型")),
		"photoIndex":       strings.TrimSpace(readAlias(row, usedKeys, "photo_index", "证件照片索引")),
	})

	basicInfo := compactMap(map[string]any{
		"nationality":      strings.TrimSpace(readAlias(row, usedKeys, "nationality", "国籍", "国家地区")),
		"residence":        strings.TrimSpace(readAlias(row, usedKeys, "residence", "常住地", "居住地")),
		"phone":            strings.TrimSpace(readAlias(row, usedKeys, "phone", "手机号", "联系电话")),
		"maritalStatus":    strings.TrimSpace(readAlias(row, usedKeys, "marital_status", "婚姻状态")),
		"education":        strings.TrimSpace(readAlias(row, usedKeys, "education", "教育背景", "学历")),
		"familyRelation":   strings.TrimSpace(readAlias(row, usedKeys, "family_relation", "家庭关系")),
		"emergencyContact": strings.TrimSpace(readAlias(row, usedKeys, "emergency_contact", "紧急联系人")),
	})

	tripInfo := compactMap(map[string]any{
		"pnr":                strings.TrimSpace(readAlias(row, usedKeys, "pnr", "订票编码", "票号")),
		"route":              strings.TrimSpace(readAlias(row, usedKeys, "route", "航线", "行程")),
		"flightNo":           strings.TrimSpace(readAlias(row, usedKeys, "flight_no", "flight", "航班号")),
		"origin":             strings.TrimSpace(readAlias(row, usedKeys, "origin", "出发地")),
		"destination":        strings.TrimSpace(readAlias(row, usedKeys, "destination", "目的地")),
		"departureDate":      normalizeDateString(readAlias(row, usedKeys, "departure_date", "出发日期")),
		"stayDays":           parseOptionalInteger(readAlias(row, usedKeys, "stay_days", "停留天数")),
		"purposeDeclared":    strings.TrimSpace(readAlias(row, usedKeys, "purpose_declared", "申报出境目的", "出行目的")),
		"returnTicketStatus": strings.TrimSpace(readAlias(row, usedKeys, "return_ticket_status", "返程票状态")),
		"accommodation":      strings.TrimSpace(readAlias(row, usedKeys, "accommodation", "住宿安排")),
		"companions":         splitListValue(readAlias(row, usedKeys, "companions", "同行人员")),
		"bookingChannel":     strings.TrimSpace(readAlias(row, usedKeys, "booking_channel", "订票渠道")),
		"seat":               strings.TrimSpace(readAlias(row, usedKeys, "seat", "座位")),
	})

	travelHistory := compactMap(map[string]any{
		"recentExitEntryCount":   parseOptionalInteger(readAlias(row, usedKeys, "recent_exit_entry_count", "近年出入境次数")),
		"recentDestinations":     splitListValue(readAlias(row, usedKeys, "recent_destinations", "主要去往国家地区")),
		"lastDepartureDate":      normalizeDateString(readAlias(row, usedKeys, "last_departure_date", "最近一次出境时间")),
		"abnormalOverstayRecord": strings.TrimSpace(readAlias(row, usedKeys, "abnormal_overstay_record", "异常滞留记录")),
		"visaRefusalRecord":      strings.TrimSpace(readAlias(row, usedKeys, "visa_refusal_record", "拒签遣返劝返记录")),
		"travelHistorySummary":   strings.TrimSpace(readAlias(row, usedKeys, "travel_history_summary", "历史出行摘要")),
	})

	occupation := compactMap(map[string]any{
		"occupation":    strings.TrimSpace(readAlias(row, usedKeys, "occupation", "职业")),
		"company":       strings.TrimSpace(readAlias(row, usedKeys, "company", "工作单位")),
		"industry":      strings.TrimSpace(readAlias(row, usedKeys, "industry", "行业")),
		"position":      strings.TrimSpace(readAlias(row, usedKeys, "position", "岗位")),
		"monthlyIncome": strings.TrimSpace(readAlias(row, usedKeys, "monthly_income", "月收入")),
		"fundingSource": strings.TrimSpace(readAlias(row, usedKeys, "funding_source", "资金来源")),
		"assetProof":    strings.TrimSpace(readAlias(row, usedKeys, "asset_proof", "资产证明摘要")),
	})

	riskTags := splitListValue(readAlias(row, usedKeys, "risk_tags", "风险标签"))
	riskRecord := compactMap(map[string]any{
		"type":         strings.TrimSpace(readAlias(row, usedKeys, "case_type", "涉案类型", "违法犯罪类型")),
		"occurredAt":   normalizeDateString(readAlias(row, usedKeys, "case_time", "涉案时间")),
		"status":       strings.TrimSpace(readAlias(row, usedKeys, "case_status", "处理状态")),
		"controlLevel": strings.TrimSpace(readAlias(row, usedKeys, "control_level", "管控级别")),
		"source":       strings.TrimSpace(readAlias(row, usedKeys, "watchlist_source", "名单来源")),
		"note":         strings.TrimSpace(readAlias(row, usedKeys, "remark", "备注说明", "summary", "画像摘要")),
	})

	highRiskValue := strings.TrimSpace(readAlias(row, usedKeys,
		"is_high_risk", "high_risk", "risk_flag", "是否高风险",
	))
	isHighRisk := importType == importTypeHighRisk
	if highRiskValue != "" {
		parsedHighRisk, parseErr := parseBoolValue(highRiskValue)
		if parseErr != nil {
			return profileRecord{}, parseErr
		}
		isHighRisk = parsedHighRisk || isHighRisk
	}

	riskRecords := make([]map[string]any, 0, 1)
	if len(riskRecord) > 0 {
		if _, exists := riskRecord["source"]; !exists && importType == importTypeHighRisk {
			riskRecord["source"] = "高风险名单导入"
		}
		riskRecords = append(riskRecords, riskRecord)
	}
	if importType == importTypeHighRisk && len(riskRecords) == 0 {
		riskRecords = append(riskRecords, map[string]any{
			"type":   "高风险名单",
			"source": "高风险名单导入",
		})
	}

	additionalFields := collectAdditionalFields(row, usedKeys)

	dimensionData := compactMap(map[string]any{
		"basicInfo":        basicInfo,
		"tripInfo":         tripInfo,
		"travelHistory":    travelHistory,
		"occupation":       occupation,
		"riskTags":         riskTags,
		"riskRecords":      riskRecords,
		"additionalFields": additionalFields,
	})

	return profileRecord{
		DocumentType:    documentType,
		DocumentNum:     documentNum,
		IssuingRegion:   strings.ToUpper(issuingRegion),
		FullName:        fullName,
		Gender:          gender,
		BirthDate:       birthDate,
		IsHighRisk:      isHighRisk,
		IdentityDetails: identityDetails,
		DimensionData:   dimensionData,
	}, nil
}

func readAlias(row map[string]string, usedKeys map[string]struct{}, aliases ...string) string {
	for _, alias := range aliases {
		normalizedAlias := normalizeHeaderKey(alias)
		if value, ok := row[normalizedAlias]; ok && strings.TrimSpace(value) != "" {
			usedKeys[normalizedAlias] = struct{}{}
			return value
		}
	}
	return ""
}

func collectAdditionalFields(row map[string]string, usedKeys map[string]struct{}) map[string]any {
	additional := make(map[string]any)
	for key, value := range row {
		if strings.TrimSpace(value) == "" {
			continue
		}
		if _, used := usedKeys[key]; used {
			continue
		}
		additional[key] = value
	}
	return additional
}

func normalizeRow(row []string) []string {
	normalized := make([]string, 0, len(row))
	for _, value := range row {
		normalized = append(normalized, strings.TrimSpace(strings.TrimPrefix(value, "\uFEFF")))
	}
	return trimTrailingEmptyColumns(normalized)
}

func trimTrailingEmptyColumns(row []string) []string {
	lastNonEmpty := len(row) - 1
	for lastNonEmpty >= 0 && strings.TrimSpace(row[lastNonEmpty]) == "" {
		lastNonEmpty--
	}
	if lastNonEmpty < 0 {
		return nil
	}
	return row[:lastNonEmpty+1]
}

func isEmptyRow(row []string) bool {
	for _, value := range row {
		if strings.TrimSpace(value) != "" {
			return false
		}
	}
	return true
}

func normalizeHeaderKey(value string) string {
	value = strings.TrimSpace(strings.TrimPrefix(value, "\uFEFF"))
	if value == "" {
		return ""
	}

	var builder strings.Builder
	lastUnderscore := false
	for _, r := range strings.ToLower(value) {
		switch {
		case unicode.IsLetter(r), unicode.IsDigit(r), unicode.In(r, unicode.Han):
			builder.WriteRune(r)
			lastUnderscore = false
		case lastUnderscore:
			continue
		default:
			builder.WriteByte('_')
			lastUnderscore = true
		}
	}

	return strings.Trim(builder.String(), "_")
}

func normalizeDocumentType(value string) string {
	normalized := strings.ToUpper(strings.TrimSpace(value))
	switch normalized {
	case "PASSPORT", "护照":
		return "PASSPORT"
	case "ID_CARD", "身份证", "IDENTITY_CARD":
		return "ID_CARD"
	case "HKMTP", "港澳通行证":
		return "HKMTP"
	default:
		return normalized
	}
}

func parseGender(value string) (*int16, error) {
	if strings.TrimSpace(value) == "" {
		return nil, nil
	}

	switch strings.ToLower(strings.TrimSpace(value)) {
	case "1", "男", "male", "m":
		gender := int16(1)
		return &gender, nil
	case "2", "女", "female", "f":
		gender := int16(2)
		return &gender, nil
	case "0", "未知", "unknown":
		gender := int16(0)
		return &gender, nil
	default:
		return nil, fmt.Errorf("性别格式无效")
	}
}

func parseDateValue(value string) (*time.Time, error) {
	trimmed := strings.TrimSpace(value)
	if trimmed == "" {
		return nil, nil
	}

	layouts := []string{
		"2006-01-02",
		"2006/01/02",
		"2006.01.02",
		"2006-1-2",
		"2006/1/2",
		"2006.1.2",
		"20060102",
	}
	for _, layout := range layouts {
		if parsed, err := time.ParseInLocation(layout, trimmed, time.UTC); err == nil {
			return &parsed, nil
		}
	}

	if serial, err := strconv.Atoi(trimmed); err == nil && serial >= 20000 && serial <= 60000 {
		base := time.Date(1899, 12, 30, 0, 0, 0, 0, time.UTC)
		parsed := base.AddDate(0, 0, serial)
		return &parsed, nil
	}

	return nil, errors.New("invalid date")
}

func normalizeDateString(value string) string {
	parsed, err := parseDateValue(value)
	if err != nil || parsed == nil {
		return strings.TrimSpace(value)
	}
	return parsed.Format("2006-01-02")
}

func parseOptionalInteger(value string) any {
	trimmed := strings.TrimSpace(value)
	if trimmed == "" {
		return nil
	}

	parsed, err := strconv.Atoi(trimmed)
	if err != nil {
		return trimmed
	}
	return parsed
}

func parseBoolValue(value string) (bool, error) {
	switch strings.ToLower(strings.TrimSpace(value)) {
	case "1", "true", "yes", "y", "是", "命中", "高风险":
		return true, nil
	case "0", "false", "no", "n", "否", "未命中", "低风险":
		return false, nil
	default:
		return false, fmt.Errorf("高风险标识格式无效")
	}
}

func splitListValue(value string) []string {
	trimmed := strings.TrimSpace(value)
	if trimmed == "" {
		return nil
	}

	parts := strings.FieldsFunc(trimmed, func(r rune) bool {
		switch r {
		case ',', '，', ';', '；', '|', '/', '、':
			return true
		default:
			return unicode.IsSpace(r)
		}
	})

	items := make([]string, 0, len(parts))
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part != "" {
			items = append(items, part)
		}
	}

	if len(items) == 0 {
		return nil
	}
	return items
}

func compactMap(input map[string]any) map[string]any {
	result := make(map[string]any)
	for key, value := range input {
		switch current := value.(type) {
		case string:
			if current != "" {
				result[key] = current
			}
		case []string:
			if len(current) > 0 {
				result[key] = current
			}
		case []map[string]any:
			if len(current) > 0 {
				result[key] = current
			}
		case map[string]any:
			if len(current) > 0 {
				result[key] = current
			}
		case nil:
		default:
			result[key] = current
		}
	}
	return result
}

func readWorksheetCell(cell worksheetCellXML, sharedStrings []string) string {
	switch cell.Type {
	case "s":
		index, err := strconv.Atoi(strings.TrimSpace(cell.Value))
		if err != nil || index < 0 || index >= len(sharedStrings) {
			return ""
		}
		return sharedStrings[index]
	case "inlineStr":
		return strings.TrimSpace(cell.Inline.value())
	default:
		return strings.TrimSpace(cell.Value)
	}
}

func columnIndexFromRef(ref string) int {
	if ref == "" {
		return -1
	}

	value := 0
	seenLetter := false
	for _, r := range ref {
		if r >= 'A' && r <= 'Z' {
			value = value*26 + int(r-'A'+1)
			seenLetter = true
			continue
		}
		if r >= 'a' && r <= 'z' {
			value = value*26 + int(r-'a'+1)
			seenLetter = true
			continue
		}
		break
	}

	if !seenLetter {
		return -1
	}
	return value - 1
}

func (item sharedStringItemXML) value() string {
	if item.Text != "" {
		return item.Text
	}

	var builder strings.Builder
	for _, run := range item.Runs {
		builder.WriteString(run.Text)
	}
	return builder.String()
}
