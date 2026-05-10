from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable
from xml.sax.saxutils import escape
from zipfile import ZIP_DEFLATED, ZipFile

BASE_OUTPUT_PATH = Path(__file__).with_name("ipra-passenger-profile-template.xlsx")
HIGH_RISK_OUTPUT_PATH = Path(__file__).with_name("ipra-high-risk-watchlist-template.xlsx")

HEADER_STYLE = 1
REQUIRED_HEADER_STYLE = 2
BODY_STYLE = 3


@dataclass(frozen=True)
class ValidationSpec:
    column_index: int
    values: list[str]
    start_row: int = 2
    end_row: int = 500


@dataclass(frozen=True)
class SheetSpec:
    name: str
    rows: list[list[str]]
    required_columns: set[int]
    column_widths: list[float]
    freeze_header: bool = True
    validations: list[ValidationSpec] = field(default_factory=list)
    enable_filter: bool = True


def build_base_profile_sheet() -> SheetSpec:
    return SheetSpec(
        name="基础画像",
        rows=[
            [
                "证件号码",
                "姓名",
                "国籍",
                "性别",
                "出生日期",
                "联系电话",
                "常住地",
                "教育背景",
                "职业",
                "工作单位",
                "收入来源",
                "订票编码（PNR）",
                "航班号",
                "出发地",
                "目的地",
                "出发日期",
                "出行目的",
                "历史出行摘要",
                "违法犯罪记录类型",
                "违法犯罪记录说明",
                "备注",
            ],
            [
                "E92834102",
                "张伟",
                "中国",
                "男",
                "1990-06-18",
                "13800138000",
                "上海",
                "本科",
                "自由职业",
                "无固定单位",
                "项目收入",
                "CX880-LAX",
                "CX880",
                "香港",
                "洛杉矶",
                "2026-05-06",
                "旅游",
                "近三个月存在澳门短频快往返记录",
                "",
                "",
                "示例数据",
            ],
        ],
        required_columns={0, 1},
        column_widths=[18, 14, 12, 10, 14, 16, 14, 14, 14, 18, 16, 18, 12, 12, 12, 14, 14, 24, 20, 24, 18],
        validations=[
            ValidationSpec(3, ["男", "女", "未知"]),
        ],
    )


def build_high_risk_sheet() -> SheetSpec:
    return SheetSpec(
        name="高风险名单",
        rows=[
            [
                "证件号码",
                "高风险原因",
            ],
            [
                "E92834102",
                "疑似跨境赌博关联，需重点核验出行目的和资金来源",
            ],
        ],
        required_columns={0},
        column_widths=[18, 48],
    )


def excel_column_name(index: int) -> str:
    result = []
    while index > 0:
        index, remainder = divmod(index - 1, 26)
        result.append(chr(ord("A") + remainder))
    return "".join(reversed(result))


def cell_xml(ref: str, value: str, style_id: int) -> str:
    return (
        f'<c r="{ref}" s="{style_id}" t="inlineStr">'
        f'<is><t xml:space="preserve">{escape(value)}</t></is>'
        f"</c>"
    )


def cols_xml(widths: Iterable[float]) -> str:
    cols = "".join(
        f'<col min="{index}" max="{index}" width="{width:.2f}" customWidth="1"/>'
        for index, width in enumerate(widths, start=1)
    )
    return f"<cols>{cols}</cols>"


def sheet_view_xml(freeze_header: bool) -> str:
    if not freeze_header:
        return '<sheetViews><sheetView workbookViewId="0"/></sheetViews>'

    return (
        '<sheetViews><sheetView workbookViewId="0">'
        '<pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/>'
        '<selection pane="bottomLeft" activeCell="A2" sqref="A2"/>'
        "</sheetView></sheetViews>"
    )


def auto_filter_xml(spec: SheetSpec) -> str:
    if not spec.enable_filter:
        return ""
    last_column = excel_column_name(len(spec.rows[0]))
    return f'<autoFilter ref="A1:{last_column}1"/>'


def validation_xml(spec: SheetSpec) -> str:
    if not spec.validations:
        return ""

    entries = []
    for validation in spec.validations:
        column = excel_column_name(validation.column_index + 1)
        formula = ",".join(validation.values)
        entries.append(
            '<dataValidation type="list" allowBlank="1" showInputMessage="1" showErrorMessage="1" '
            f'sqref="{column}{validation.start_row}:{column}{validation.end_row}">'
            f'<formula1>"{escape(formula)}"</formula1>'
            "</dataValidation>"
        )

    return f'<dataValidations count="{len(entries)}">{"".join(entries)}</dataValidations>'


def worksheet_xml(spec: SheetSpec) -> str:
    row_xml = []
    last_column = excel_column_name(len(spec.rows[0]))
    last_cell = f"{last_column}{max(len(spec.rows), 1)}"

    for row_index, row in enumerate(spec.rows, start=1):
        cells = []
        for column_index, value in enumerate(row, start=1):
            if row_index == 1:
                style_id = REQUIRED_HEADER_STYLE if column_index - 1 in spec.required_columns else HEADER_STYLE
            else:
                style_id = BODY_STYLE
            cells.append(cell_xml(f"{excel_column_name(column_index)}{row_index}", value, style_id))

        if row_index == 1:
            row_xml.append(f'<row r="{row_index}" ht="26" customHeight="1">{"".join(cells)}</row>')
        else:
            row_xml.append(f'<row r="{row_index}" ht="22" customHeight="1">{"".join(cells)}</row>')

    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        f'<dimension ref="A1:{last_cell}"/>'
        f"{sheet_view_xml(spec.freeze_header)}"
        '<sheetFormatPr defaultRowHeight="18"/>'
        f"{cols_xml(spec.column_widths)}"
        f'<sheetData>{"".join(row_xml)}</sheetData>'
        f"{auto_filter_xml(spec)}"
        f"{validation_xml(spec)}"
        '<pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/>'
        "</worksheet>"
    )


def workbook_xml(sheet_names: list[str]) -> str:
    sheets_xml = "".join(
        f'<sheet name="{escape(name)}" sheetId="{index}" r:id="rId{index}"/>'
        for index, name in enumerate(sheet_names, start=1)
    )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        f"<sheets>{sheets_xml}</sheets>"
        "</workbook>"
    )


def workbook_rels_xml(sheet_count: int) -> str:
    sheet_rels = "".join(
        f'<Relationship Id="rId{index}" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" '
        f'Target="worksheets/sheet{index}.xml"/>'
        for index in range(1, sheet_count + 1)
    )
    styles_id = sheet_count + 1
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        f"{sheet_rels}"
        f'<Relationship Id="rId{styles_id}" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" '
        'Target="styles.xml"/>'
        "</Relationships>"
    )


def styles_xml() -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        '<fonts count="2">'
        '<font><sz val="11"/><name val="Calibri"/><family val="2"/></font>'
        '<font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/><family val="2"/></font>'
        "</fonts>"
        '<fills count="4">'
        '<fill><patternFill patternType="none"/></fill>'
        '<fill><patternFill patternType="gray125"/></fill>'
        '<fill><patternFill patternType="solid"><fgColor rgb="FF1F4E78"/><bgColor indexed="64"/></patternFill></fill>'
        '<fill><patternFill patternType="solid"><fgColor rgb="FFC62828"/><bgColor indexed="64"/></patternFill></fill>'
        "</fills>"
        '<borders count="2">'
        '<border><left/><right/><top/><bottom/><diagonal/></border>'
        '<border><left style="thin"/><right style="thin"/><top style="thin"/><bottom style="thin"/><diagonal/></border>'
        "</borders>"
        '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'
        '<cellXfs count="4">'
        '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>'
        '<xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>'
        '<xf numFmtId="0" fontId="1" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>'
        '<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>'
        "</cellXfs>"
        '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>'
        "</styleSheet>"
    )


def content_types_xml(sheet_count: int) -> str:
    sheet_overrides = "".join(
        f'<Override PartName="/xl/worksheets/sheet{index}.xml" '
        'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
        for index in range(1, sheet_count + 1)
    )
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        '<Override PartName="/xl/workbook.xml" '
        'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
        f"{sheet_overrides}"
        '<Override PartName="/xl/styles.xml" '
        'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>'
        '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>'
        '<Override PartName="/docProps/app.xml" '
        'ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>'
        "</Types>"
    )


def root_rels_xml() -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" '
        'Target="xl/workbook.xml"/>'
        '<Relationship Id="rId2" '
        'Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" '
        'Target="docProps/core.xml"/>'
        '<Relationship Id="rId3" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" '
        'Target="docProps/app.xml"/>'
        "</Relationships>"
    )


def app_xml(sheet_names: list[str]) -> str:
    titles = "".join(f"<vt:lpstr>{escape(name)}</vt:lpstr>" for name in sheet_names)
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" '
        'xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">'
        '<Application>Codex</Application>'
        f"<TitlesOfParts><vt:vector size=\"{len(sheet_names)}\" baseType=\"lpstr\">{titles}</vt:vector></TitlesOfParts>"
        f"<HeadingPairs><vt:vector size=\"2\" baseType=\"variant\"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>{len(sheet_names)}</vt:i4></vt:variant></vt:vector></HeadingPairs>"
        "</Properties>"
    )


def core_xml() -> str:
    timestamp = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" '
        'xmlns:dc="http://purl.org/dc/elements/1.1/" '
        'xmlns:dcterms="http://purl.org/dc/terms/" '
        'xmlns:dcmitype="http://purl.org/dc/dcmitype/" '
        'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'
        "<dc:creator>Codex</dc:creator>"
        "<cp:lastModifiedBy>Codex</cp:lastModifiedBy>"
        f'<dcterms:created xsi:type="dcterms:W3CDTF">{timestamp}</dcterms:created>'
        f'<dcterms:modified xsi:type="dcterms:W3CDTF">{timestamp}</dcterms:modified>'
        "</cp:coreProperties>"
    )


def build_workbook(output_path: Path, sheets: list[SheetSpec]) -> None:
    sheet_names = [sheet.name for sheet in sheets]

    with ZipFile(output_path, "w", compression=ZIP_DEFLATED) as workbook:
        workbook.writestr("[Content_Types].xml", content_types_xml(len(sheets)))
        workbook.writestr("_rels/.rels", root_rels_xml())
        workbook.writestr("docProps/app.xml", app_xml(sheet_names))
        workbook.writestr("docProps/core.xml", core_xml())
        workbook.writestr("xl/workbook.xml", workbook_xml(sheet_names))
        workbook.writestr("xl/_rels/workbook.xml.rels", workbook_rels_xml(len(sheets)))
        workbook.writestr("xl/styles.xml", styles_xml())

        for index, sheet in enumerate(sheets, start=1):
            workbook.writestr(f"xl/worksheets/sheet{index}.xml", worksheet_xml(sheet))


if __name__ == "__main__":
    build_workbook(BASE_OUTPUT_PATH, [build_base_profile_sheet()])
    build_workbook(HIGH_RISK_OUTPUT_PATH, [build_high_risk_sheet()])
