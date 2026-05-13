from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable
from xml.sax.saxutils import escape
from zipfile import ZIP_DEFLATED, ZipFile

HEADER_STYLE = 1
REQUIRED_HEADER_STYLE = 2
BODY_STYLE = 3


@dataclass(frozen=True)
class TemplateSpec:
    output_name: str
    sheet_name: str
    headers: list[str]
    sample_row: list[str]
    required_columns: set[int]
    column_widths: list[float]


def build_templates() -> list[TemplateSpec]:
    return [
        TemplateSpec(
            output_name="ipra-passenger-profile-template.xlsx",
            sheet_name="基础画像模板",
            headers=[
                "证件号码",
                "姓名",
                "证件类型",
                "签发地区",
                "国籍",
                "性别",
                "出生日期",
                "联系电话",
                "订票编码",
                "航班号",
                "出发地",
                "目的地",
                "出行目的",
                "近年出入境次数",
                "职业",
                "工作单位",
                "风险标签",
                "违法犯罪记录",
                "备注",
            ],
            sample_row=[
                "E92834102",
                "张伟",
                "护照",
                "CN",
                "中国",
                "男",
                "1990-04-12",
                "13800138000",
                "CX880-LAX",
                "CX880",
                "香港",
                "洛杉矶",
                "旅游",
                "5",
                "自由职业",
                "无固定单位",
                "异常行程,重点关注",
                "无",
                "示例数据，可删除",
            ],
            required_columns={0, 1},
            column_widths=[18, 14, 14, 12, 12, 10, 14, 16, 18, 14, 12, 12, 14, 14, 14, 18, 18, 18, 20],
        ),
        TemplateSpec(
            output_name="ipra-high-risk-watchlist-template.xlsx",
            sheet_name="高风险名单模板",
            headers=["证件号码", "风险类别", "高风险原因"],
            sample_row=["E92834102", "跨境赌博", "跨境赌博关联，需重点核验出行目的"],
            required_columns={0},
            column_widths=[18, 18, 34],
        ),
    ]


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


def worksheet_xml(spec: TemplateSpec) -> str:
    rows = [[spec.sheet_name], spec.headers, spec.sample_row]
    row_xml = []
    last_column = excel_column_name(len(spec.headers))

    for row_index, row in enumerate(rows, start=1):
        cells = []
        for column_index, value in enumerate(row, start=1):
            if row_index == 1:
                style_id = HEADER_STYLE
            elif row_index == 2:
                style_id = REQUIRED_HEADER_STYLE if column_index - 1 in spec.required_columns else HEADER_STYLE
            else:
                style_id = BODY_STYLE
            cells.append(cell_xml(f"{excel_column_name(column_index)}{row_index}", value, style_id))
        height = 28 if row_index == 1 else 26 if row_index == 2 else 22
        row_xml.append(f'<row r="{row_index}" ht="{height}" customHeight="1">{"".join(cells)}</row>')

    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
        f'<dimension ref="A1:{last_column}3"/>'
        '<sheetViews><sheetView workbookViewId="0"><pane ySplit="2" topLeftCell="A3" activePane="bottomLeft" state="frozen"/>'
        '<selection pane="bottomLeft" activeCell="A3" sqref="A3"/></sheetView></sheetViews>'
        '<sheetFormatPr defaultRowHeight="18"/>'
        f"{cols_xml(spec.column_widths)}"
        f'<sheetData>{"".join(row_xml)}</sheetData>'
        f'<mergeCells count="1"><mergeCell ref="A1:{last_column}1"/></mergeCells>'
        f'<autoFilter ref="A2:{last_column}2"/>'
        '<pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/>'
        "</worksheet>"
    )


def workbook_xml(sheet_name: str) -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        f'<sheets><sheet name="{escape(sheet_name)}" sheetId="1" r:id="rId1"/></sheets>'
        "</workbook>"
    )


def workbook_rels_xml() -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" '
        'Target="worksheets/sheet1.xml"/>'
        '<Relationship Id="rId2" '
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


def content_types_xml() -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        '<Override PartName="/xl/workbook.xml" '
        'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
        '<Override PartName="/xl/worksheets/sheet1.xml" '
        'ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
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


def app_xml(sheet_name: str) -> str:
    return (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" '
        'xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">'
        '<Application>Codex</Application>'
        f'<TitlesOfParts><vt:vector size="1" baseType="lpstr"><vt:lpstr>{escape(sheet_name)}</vt:lpstr></vt:vector></TitlesOfParts>'
        '<HeadingPairs><vt:vector size="2" baseType="variant"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>1</vt:i4></vt:variant></vt:vector></HeadingPairs>'
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


def build_workbook(spec: TemplateSpec, output_path: Path) -> None:
    with ZipFile(output_path, "w", compression=ZIP_DEFLATED) as workbook:
        workbook.writestr("[Content_Types].xml", content_types_xml())
        workbook.writestr("_rels/.rels", root_rels_xml())
        workbook.writestr("docProps/app.xml", app_xml(spec.sheet_name))
        workbook.writestr("docProps/core.xml", core_xml())
        workbook.writestr("xl/workbook.xml", workbook_xml(spec.sheet_name))
        workbook.writestr("xl/_rels/workbook.xml.rels", workbook_rels_xml())
        workbook.writestr("xl/styles.xml", styles_xml())
        workbook.writestr("xl/worksheets/sheet1.xml", worksheet_xml(spec))


if __name__ == "__main__":
    base_dir = Path(__file__).parent
    for spec in build_templates():
        build_workbook(spec, base_dir / spec.output_name)
