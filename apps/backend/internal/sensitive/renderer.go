package sensitive

import (
	"bytes"
	"errors"
	"fmt"
	"image"
	"image/color"
	stddraw "image/draw"
	"image/png"
	"math"
	"os"
	"strings"

	"github.com/chai2010/webp"
	"golang.org/x/image/font"
	"golang.org/x/image/font/opentype"
	"golang.org/x/image/math/fixed"
)

var defaultFontCandidates = []string{
	"/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc",
	"/usr/share/fonts/truetype/wqy/wqy-zenhei.ttf",
	"/usr/share/fonts/opentype/unifont/unifont.otf",
	"/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
	"/Library/Fonts/Arial Unicode.ttf",
	"/System/Library/Fonts/Hiragino Sans GB.ttc",
	"/System/Library/Fonts/STHeiti Medium.ttc",
	"/System/Library/Fonts/STHeiti Light.ttc",
}

type Renderer struct {
	font *opentype.Font
}

type presetLayout struct {
	Width         int
	Padding       int
	TitleSize     float64
	BodySize      float64
	TagSize       float64
	WatermarkSize float64
	Quality       float32
}

type drawnLine struct {
	text string
	x    int
	y    int
	face font.Face
	fill color.Color
	chip *drawnChip
}

type drawnChip struct {
	rect           image.Rectangle
	fill           color.Color
	border         color.Color
	radius         int
	drawBackground bool
}

type watermarkTile struct {
	top      float64
	left     float64
	rotation float64
	opacity  float64
}

var defaultWatermarkTiles = []watermarkTile{
	{top: 0.09, left: 0.14, rotation: -18, opacity: 0.38},
	{top: 0.18, left: 0.81, rotation: -16, opacity: 0.34},
	{top: 0.34, left: 0.49, rotation: -20, opacity: 0.36},
	{top: 0.52, left: 0.10, rotation: -19, opacity: 0.38},
	{top: 0.58, left: 0.74, rotation: -17, opacity: 0.35},
	{top: 0.79, left: 0.24, rotation: -21, opacity: 0.38},
	{top: 0.89, left: 0.86, rotation: -15, opacity: 0.34},
}

func NewRenderer(fontCandidates []string) (*Renderer, error) {
	parsed, err := loadUsableFont(fontCandidates)
	if err != nil {
		return nil, err
	}

	return &Renderer{font: parsed}, nil
}

func (r *Renderer) Render(spec AssetSpec) (EncodedImage, error) {
	layout := resolveLayout(spec.Preset)
	titleFace, err := r.newFace(layout.TitleSize)
	if err != nil {
		return EncodedImage{}, err
	}
	defer closeFace(titleFace)

	bodyFace, err := r.newFace(layout.BodySize)
	if err != nil {
		return EncodedImage{}, err
	}
	defer closeFace(bodyFace)

	tagFace, err := r.newFace(layout.TagSize)
	if err != nil {
		return EncodedImage{}, err
	}
	defer closeFace(tagFace)

	watermarkFace, err := r.newFace(layout.WatermarkSize)
	if err != nil {
		return EncodedImage{}, err
	}
	defer closeFace(watermarkFace)

	if spec.Preset == PresetInline {
		layout.Width = resolveInlineWidth(layout, spec.Document, titleFace, bodyFace, tagFace)
	}

	lines, totalHeight := measureDocument(layout, spec.Document, titleFace, bodyFace, tagFace)
	canvas := image.NewRGBA(image.Rect(0, 0, layout.Width, totalHeight))
	background := color.RGBA{250, 252, 254, 255}
	if spec.Style.Transparent {
		background = color.RGBA{0, 0, 0, 0}
	}
	stddraw.Draw(canvas, canvas.Bounds(), image.NewUniform(background), image.Point{}, stddraw.Src)

	if !spec.Style.HideAccent {
		drawAccent(canvas, layout, spec.Preset)
	}
	drawWatermark(canvas, layout, watermarkFace, spec.Watermark, spec.Style)
	drawDocument(canvas, lines)
	if spec.Style.Transparent {
		canvas = trimTransparentCanvas(canvas)
	}

	format := spec.Format
	if format == "" {
		format = FormatWebP
	}
	return encodeImage(canvas, format, layout.Quality)
}

func trimTransparentCanvas(src *image.RGBA) *image.RGBA {
	bounds := src.Bounds()
	minX := bounds.Max.X
	minY := bounds.Max.Y
	maxX := bounds.Min.X
	maxY := bounds.Min.Y

	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			if src.RGBAAt(x, y).A == 0 {
				continue
			}
			if x < minX {
				minX = x
			}
			if y < minY {
				minY = y
			}
			if x > maxX {
				maxX = x
			}
			if y > maxY {
				maxY = y
			}
		}
	}

	if minX > maxX || minY > maxY {
		return src
	}

	padding := 2
	minX = maxInt(bounds.Min.X, minX-padding)
	minY = maxInt(bounds.Min.Y, minY-padding)
	maxX = minInt(bounds.Max.X-1, maxX+padding)
	maxY = minInt(bounds.Max.Y-1, maxY+padding)

	dstBounds := image.Rect(0, 0, maxX-minX+1, maxY-minY+1)
	dst := image.NewRGBA(dstBounds)
	stddraw.Draw(dst, dstBounds, src, image.Point{X: minX, Y: minY}, stddraw.Src)
	return dst
}

func (r *Renderer) newFace(size float64) (font.Face, error) {
	return opentype.NewFace(r.font, &opentype.FaceOptions{
		Size:    size,
		DPI:     72,
		Hinting: font.HintingNone,
	})
}

func resolveLayout(preset RenderPreset) presetLayout {
	switch preset {
	case PresetInline:
		return presetLayout{
			Width:         720,
			Padding:       0,
			TitleSize:     24,
			BodySize:      18,
			TagSize:       16,
			WatermarkSize: 14,
			Quality:       80,
		}
	case PresetCompactList:
		return presetLayout{
			Width:         1320,
			Padding:       28,
			TitleSize:     26,
			BodySize:      18,
			TagSize:       15,
			WatermarkSize: 15,
			Quality:       80,
		}
	case PresetDialog:
		return presetLayout{
			Width:         1480,
			Padding:       48,
			TitleSize:     32,
			BodySize:      22,
			TagSize:       18,
			WatermarkSize: 20,
			Quality:       85,
		}
	case PresetDetail:
		return presetLayout{
			Width:         1320,
			Padding:       42,
			TitleSize:     30,
			BodySize:      21,
			TagSize:       24,
			WatermarkSize: 18,
			Quality:       83,
		}
	default:
		return presetLayout{
			Width:         1080,
			Padding:       34,
			TitleSize:     30,
			BodySize:      22,
			TagSize:       18,
			WatermarkSize: 16,
			Quality:       82,
		}
	}
}

func resolveInlineWidth(
	layout presetLayout,
	doc Document,
	titleFace font.Face,
	bodyFace font.Face,
	tagFace font.Face,
) int {
	const minWidth = 48

	contentWidth := measureInlineContentWidth(doc, titleFace, bodyFace, tagFace)
	if contentWidth <= 0 {
		return minWidth
	}

	return maxInt(minWidth, minInt(contentWidth, layout.Width))
}

func measureInlineContentWidth(
	doc Document,
	titleFace font.Face,
	bodyFace font.Face,
	tagFace font.Face,
) int {
	maxWidth := 0

	updateWidth := func(value int) {
		if value > maxWidth {
			maxWidth = value
		}
	}

	if eyebrow := strings.TrimSpace(doc.Eyebrow); eyebrow != "" {
		updateWidth(textWidth(bodyFace, strings.ToUpper(eyebrow)))
	}

	if title := strings.TrimSpace(doc.Title); title != "" {
		updateWidth(textWidth(titleFace, title))
	}

	if subtitle := strings.TrimSpace(doc.Subtitle); subtitle != "" {
		updateWidth(textWidth(bodyFace, subtitle))
	}

	for _, section := range doc.Sections {
		if heading := strings.TrimSpace(section.Heading); heading != "" {
			updateWidth(textWidth(bodyFace, heading))
		}
		for _, line := range compactValues(section.Lines) {
			updateWidth(textWidth(bodyFace, line))
		}
	}

	for _, line := range compactValues(doc.Footer) {
		updateWidth(textWidth(bodyFace, line))
	}

	updateWidth(measureInlineTagWidth(doc.Tags, nil, tagFace))
	updateWidth(measureInlineTagWidth(nil, doc.TagItems, tagFace))
	updateWidth(measureInlineTagWidth(nil, doc.MetaItems, tagFace))
	updateWidth(measureInlineTagWidth(nil, doc.FooterTags, tagFace))
	updateWidth(measureInlineFactWidth(doc.FactItems, bodyFace))

	return maxWidth
}

func measureInlineTagWidth(tags []string, items []TagItem, face font.Face) int {
	const (
		paddingX = 14
		gapX     = 10
	)

	width := 0
	appendTag := func(text string) {
		text = strings.TrimSpace(text)
		if text == "" {
			return
		}
		if width > 0 {
			width += gapX
		}
		width += textWidth(face, text) + paddingX*2
	}

	for _, tag := range compactValues(tags) {
		appendTag(tag)
	}
	for _, item := range items {
		appendTag(item.Text)
	}

	return width
}

func measureInlineFactWidth(facts []FactItem, face font.Face) int {
	const (
		paddingX = 12
		labelGap = 10
		gapX     = 10
	)

	width := 0
	for _, fact := range facts {
		label := strings.TrimSpace(fact.Label)
		value := strings.TrimSpace(fact.Value)
		if label == "" || value == "" {
			continue
		}
		if width > 0 {
			width += gapX
		}
		width += textWidth(face, label) + textWidth(face, value) + paddingX*2 + labelGap
	}

	return width
}

func measureDocument(
	layout presetLayout,
	doc Document,
	titleFace font.Face,
	bodyFace font.Face,
	tagFace font.Face,
) ([]drawnLine, int) {
	lines := make([]drawnLine, 0, 64)
	x := layout.Padding
	maxWidth := layout.Width - layout.Padding*2
	y := layout.Padding
	if layout.Padding == 0 {
		y = 0
	}

	if eyebrow := strings.TrimSpace(doc.Eyebrow); eyebrow != "" {
		lines, y = appendWrappedText(
			lines,
			bodyFace,
			color.RGBA{70, 92, 100, 255},
			x,
			y,
			maxWidth,
			strings.ToUpper(eyebrow),
		)
		y += 8
	}

	lines, y = appendWrappedText(
		lines,
		titleFace,
		color.RGBA{21, 37, 43, 255},
		x,
		y,
		maxWidth,
		strings.TrimSpace(doc.Title),
	)

	if subtitle := strings.TrimSpace(doc.Subtitle); subtitle != "" {
		y += 4
		lines, y = appendWrappedText(
			lines,
			bodyFace,
			color.RGBA{58, 78, 86, 255},
			x,
			y,
			maxWidth,
			subtitle,
		)
	}

	if len(doc.Tags) > 0 {
		y += resolveBlockSpacing(layout, 14, 10)
		lines, y = appendTags(lines, tagFace, x, y, maxWidth, doc.Tags)
	}

	if len(doc.TagItems) > 0 {
		y += resolveBlockSpacing(layout, 14, 10)
		lines, y = appendStructuredTagItems(lines, tagFace, x, y, maxWidth, doc.TagItems)
	}

	if len(doc.FactItems) > 0 {
		y += resolveBlockSpacing(layout, 14, 10)
		lines, y = appendFactItems(lines, bodyFace, x, y, maxWidth, doc.FactItems)
	}

	if len(doc.MetaItems) > 0 {
		y += resolveBlockSpacing(layout, 14, 10)
		lines, y = appendStructuredTagItems(lines, tagFace, x, y, maxWidth, doc.MetaItems)
	}

	for _, section := range doc.Sections {
		sectionLines := compactValues(section.Lines)
		if strings.TrimSpace(section.Heading) == "" && len(sectionLines) == 0 {
			continue
		}

		if heading := strings.TrimSpace(section.Heading); heading != "" {
			y += resolveBlockSpacing(layout, 18, 12)
			lines, y = appendWrappedText(
				lines,
				bodyFace,
				color.RGBA{21, 37, 43, 255},
				x,
				y,
				maxWidth,
				heading,
			)
		}

		for _, rawLine := range sectionLines {
			y += resolveBlockSpacing(layout, 4, 2)
			lines, y = appendWrappedText(
				lines,
				bodyFace,
				color.RGBA{30, 48, 56, 255},
				x,
				y,
				maxWidth,
				rawLine,
			)
		}
	}

	if len(doc.Footer) > 0 {
		y += resolveBlockSpacing(layout, 18, 12)
		for _, rawLine := range compactValues(doc.Footer) {
			lines, y = appendWrappedText(
				lines,
				bodyFace,
				color.RGBA{76, 95, 102, 255},
				x,
				y,
				maxWidth,
				rawLine,
			)
		}
	}

	if len(doc.FooterTags) > 0 {
		y += resolveBlockSpacing(layout, 14, 10)
		lines, y = appendStructuredTagItems(lines, tagFace, x, y, maxWidth, doc.FooterTags)
	}

	if layout.Padding == 0 {
		return lines, y
	}
	return lines, y + layout.Padding
}

func resolveBlockSpacing(layout presetLayout, regular int, compact int) int {
	if layout.Width >= 1200 && layout.TitleSize <= 26 && layout.BodySize <= 18 {
		return compact
	}
	return regular
}

func appendWrappedText(
	lines []drawnLine,
	face font.Face,
	fill color.Color,
	x int,
	top int,
	maxWidth int,
	value string,
) ([]drawnLine, int) {
	wrapped := wrapText(face, value, maxWidth)
	if len(wrapped) == 0 {
		return lines, top
	}

	lineHeight := face.Metrics().Height.Ceil()
	baseline := top + face.Metrics().Ascent.Ceil()
	for _, wrappedLine := range wrapped {
		lines = append(lines, drawnLine{
			text: wrappedLine,
			x:    x,
			y:    baseline,
			face: face,
			fill: fill,
		})
		baseline += lineHeight
	}

	return lines, top + lineHeight*len(wrapped)
}

func appendTags(
	lines []drawnLine,
	face font.Face,
	x int,
	top int,
	maxWidth int,
	tags []string,
) ([]drawnLine, int) {
	cleaned := compactValues(tags)
	if len(cleaned) == 0 {
		return lines, top
	}

	items := make([]tagLayoutItem, 0, len(cleaned))
	for _, tag := range cleaned {
		items = append(items, tagLayoutItem{
			Text: tag,
			Tone: inferTagTone(tag),
		})
	}
	return appendTagLayout(lines, face, x, top, maxWidth, items)
}

type tagLayoutItem struct {
	Text string
	Tone TagTone
}

func appendStructuredTagItems(
	lines []drawnLine,
	face font.Face,
	x int,
	top int,
	maxWidth int,
	tags []TagItem,
) ([]drawnLine, int) {
	items := make([]tagLayoutItem, 0, len(tags))
	for _, tag := range tags {
		if strings.TrimSpace(tag.Text) == "" {
			continue
		}
		items = append(items, tagLayoutItem{
			Text: strings.TrimSpace(tag.Text),
			Tone: tag.Tone,
		})
	}
	if len(items) == 0 {
		return lines, top
	}
	return appendTagLayout(lines, face, x, top, maxWidth, items)
}

func appendTagLayout(
	lines []drawnLine,
	face font.Face,
	x int,
	top int,
	maxWidth int,
	items []tagLayoutItem,
) ([]drawnLine, int) {
	if len(items) == 0 {
		return lines, top
	}

	const (
		paddingX      = 14
		paddingTop    = 6
		paddingBottom = 6
		gapX          = 10
		gapY          = 10
		lineGap       = 4
		maxRadius     = 14
	)

	lineHeight := face.Metrics().Height.Ceil()
	ascent := face.Metrics().Ascent.Ceil()
	cursorX := x
	cursorY := top
	rowHeight := 0
	maxX := x + maxWidth

	for _, item := range items {
		wrapped := wrapSingleLine(face, item.Text, maxWidth-paddingX*2)
		if len(wrapped) == 0 {
			continue
		}

		boxTextWidth := 0
		for _, wrappedLine := range wrapped {
			boxTextWidth = maxInt(boxTextWidth, textWidth(face, wrappedLine))
		}

		boxWidth := minInt(maxWidth, boxTextWidth+paddingX*2)
		boxHeight := paddingTop + paddingBottom + lineHeight*len(wrapped)
		if len(wrapped) > 1 {
			boxHeight += lineGap * (len(wrapped) - 1)
		}

		if cursorX > x && cursorX+boxWidth > maxX {
			cursorY += rowHeight + gapY
			cursorX = x
			rowHeight = 0
		}

		textColor, backgroundColor, borderColor := resolveTagPalette(item.Tone)
		rect := image.Rect(cursorX, cursorY, cursorX+boxWidth, cursorY+boxHeight)
		baseline := cursorY + paddingTop + ascent
		for index, wrappedLine := range wrapped {
			line := drawnLine{
				text: wrappedLine,
				x:    cursorX + paddingX,
				y:    baseline + index*(lineHeight+lineGap),
				face: face,
				fill: textColor,
			}
			if index == 0 {
				line.chip = &drawnChip{
					rect:           rect,
					fill:           backgroundColor,
					border:         borderColor,
					radius:         minInt(maxRadius, boxHeight/2),
					drawBackground: true,
				}
			}
			lines = append(lines, line)
		}

		rowHeight = maxInt(rowHeight, boxHeight)
		cursorX += boxWidth + gapX
	}

	return lines, cursorY + rowHeight
}

func inferTagTone(tag string) TagTone {
	normalized := strings.ToLower(strings.TrimSpace(tag))
	switch {
	case strings.Contains(normalized, "高风险"), strings.Contains(normalized, "失败"), strings.Contains(normalized, "拒绝"):
		return TagToneAlert
	case strings.Contains(normalized, "未导入"):
		return TagToneWarning
	case strings.Contains(normalized, "成功"), strings.Contains(normalized, "启用"):
		return TagToneSuccess
	default:
		return TagToneAccent
	}
}

func resolveTagPalette(tone TagTone) (color.Color, color.Color, color.Color) {
	switch tone {
	case TagToneAlert:
		return color.RGBA{154, 61, 41, 255}, color.RGBA{251, 232, 227, 255}, color.RGBA{226, 183, 172, 255}
	case TagToneWarning:
		return color.RGBA{112, 83, 17, 255}, color.RGBA{251, 243, 219, 255}, color.RGBA{224, 206, 137, 255}
	case TagToneMuted:
		return color.RGBA{85, 101, 109, 255}, color.RGBA{233, 238, 240, 255}, color.RGBA{194, 205, 210, 255}
	case TagToneIdentity:
		return color.RGBA{122, 81, 66, 255}, color.RGBA{243, 231, 222, 235}, color.RGBA{220, 201, 191, 255}
	case TagToneSuccess:
		return color.RGBA{45, 139, 58, 255}, color.RGBA{228, 244, 231, 255}, color.RGBA{182, 216, 188, 255}
	case TagToneDefault:
		return color.RGBA{67, 100, 110, 255}, color.RGBA{255, 255, 255, 240}, color.RGBA{188, 203, 209, 255}
	default:
		return color.RGBA{9, 89, 108, 255}, color.RGBA{221, 239, 244, 255}, color.RGBA{168, 198, 208, 255}
	}
}

func appendFactItems(
	lines []drawnLine,
	face font.Face,
	x int,
	top int,
	maxWidth int,
	facts []FactItem,
) ([]drawnLine, int) {
	const (
		paddingX      = 12
		paddingTop    = 8
		paddingBottom = 8
		gapX          = 10
		gapY          = 10
		maxRadius     = 12
		labelGap      = 10
	)

	lineHeight := face.Metrics().Height.Ceil()
	ascent := face.Metrics().Ascent.Ceil()
	cursorX := x
	cursorY := top
	rowHeight := 0
	maxX := x + maxWidth

	for _, fact := range facts {
		label := strings.TrimSpace(fact.Label)
		value := strings.TrimSpace(fact.Value)
		if label == "" || value == "" {
			continue
		}

		text := label + " " + value
		boxWidth := minInt(maxWidth, textWidth(face, text)+paddingX*2+labelGap)
		boxHeight := paddingTop + paddingBottom + lineHeight

		if cursorX > x && cursorX+boxWidth > maxX {
			cursorY += rowHeight + gapY
			cursorX = x
			rowHeight = 0
		}

		rect := image.Rect(cursorX, cursorY, cursorX+boxWidth, cursorY+boxHeight)
		lines = append(lines,
			drawnLine{
				text: label,
				x:    cursorX + paddingX,
				y:    cursorY + paddingTop + ascent,
				face: face,
				fill: color.RGBA{140, 107, 93, 255},
				chip: &drawnChip{
					rect:           rect,
					fill:           color.RGBA{255, 253, 251, 255},
					border:         color.RGBA{214, 193, 180, 168},
					radius:         maxRadius,
					drawBackground: true,
				},
			},
			drawnLine{
				text: value,
				x:    cursorX + paddingX + textWidth(face, label) + labelGap,
				y:    cursorY + paddingTop + ascent,
				face: face,
				fill: color.RGBA{31, 40, 44, 255},
			},
		)

		rowHeight = maxInt(rowHeight, boxHeight)
		cursorX += boxWidth + gapX
	}

	return lines, cursorY + rowHeight
}

func drawAccent(dst *image.RGBA, layout presetLayout, preset RenderPreset) {
	fill := color.RGBA{11, 114, 136, 255}
	if preset == PresetDialog {
		fill = color.RGBA{24, 119, 142, 255}
	}
	if preset == PresetDetail {
		fill = color.RGBA{18, 104, 124, 255}
	}
	bar := image.Rect(0, 0, 10, dst.Bounds().Dy())
	stddraw.Draw(dst, bar, image.NewUniform(fill), image.Point{}, stddraw.Src)

	header := image.Rect(0, 0, dst.Bounds().Dx(), 8)
	stddraw.Draw(dst, header, image.NewUniform(color.RGBA{223, 238, 244, 255}), image.Point{}, stddraw.Src)
}

func drawWatermark(dst *image.RGBA, layout presetLayout, face font.Face, wm WatermarkContext, style RenderStyle) {
	display := BuildDisplayWatermarkContext(wm)
	text := BuildWatermarkText(display)
	if strings.TrimSpace(text) == "" {
		return
	}

	for _, tile := range defaultWatermarkTiles {
		stamp := newWatermarkStamp(face, text, tile.opacity, style)
		centerX := int(math.Round(float64(dst.Bounds().Dx()) * tile.left))
		centerY := int(math.Round(float64(dst.Bounds().Dy()) * tile.top))
		drawRotatedStamp(dst, stamp, centerX, centerY, tile.rotation)
	}
}

func newWatermarkStamp(face font.Face, text string, opacity float64, style RenderStyle) *image.RGBA {
	lines := wrapSingleLine(face, strings.TrimSpace(text), 420)
	if len(lines) == 0 {
		return image.NewRGBA(image.Rect(0, 0, 1, 1))
	}

	maxWidth := 0
	for _, line := range lines {
		if width := textWidth(face, line); width > maxWidth {
			maxWidth = width
		}
	}

	paddingX := 18
	paddingTop := 12
	paddingBottom := 10
	lineHeight := face.Metrics().Height.Ceil()
	lineGap := 6
	height := paddingTop + paddingBottom + lineHeight*len(lines)
	if len(lines) > 1 {
		height += lineGap * (len(lines) - 1)
	}

	stamp := image.NewRGBA(image.Rect(0, 0, maxWidth+paddingX*2, height))
	shadowFill := color.RGBA{255, 255, 255, uint8(math.Round(82 * opacity))}
	textFill := color.RGBA{12, 34, 42, uint8(math.Round(51 * opacity))}
	if style.Transparent {
		shadowFill = color.RGBA{255, 255, 255, uint8(math.Round(62 * opacity))}
		textFill = color.RGBA{12, 34, 42, uint8(math.Round(40 * opacity))}
	}
	y := paddingTop + face.Metrics().Ascent.Ceil()

	for _, line := range lines {
		drawString(stamp, face, shadowFill, paddingX+1, y+1, line)
		drawString(stamp, face, textFill, paddingX, y, line)
		y += lineHeight + lineGap
	}

	return stamp
}

func drawRotatedStamp(dst *image.RGBA, stamp *image.RGBA, centerX int, centerY int, angleDeg float64) {
	if stamp.Bounds().Dx() == 0 || stamp.Bounds().Dy() == 0 {
		return
	}

	radians := angleDeg * math.Pi / 180
	sinAngle := math.Sin(radians)
	cosAngle := math.Cos(radians)
	halfWidth := float64(stamp.Bounds().Dx()) / 2
	halfHeight := float64(stamp.Bounds().Dy()) / 2
	extentX := math.Abs(halfWidth*cosAngle) + math.Abs(halfHeight*sinAngle)
	extentY := math.Abs(halfWidth*sinAngle) + math.Abs(halfHeight*cosAngle)
	minX := maxInt(0, int(math.Floor(float64(centerX)-extentX))-1)
	maxX := minInt(dst.Bounds().Dx()-1, int(math.Ceil(float64(centerX)+extentX))+1)
	minY := maxInt(0, int(math.Floor(float64(centerY)-extentY))-1)
	maxY := minInt(dst.Bounds().Dy()-1, int(math.Ceil(float64(centerY)+extentY))+1)

	for y := minY; y <= maxY; y++ {
		for x := minX; x <= maxX; x++ {
			relativeX := float64(x - centerX)
			relativeY := float64(y - centerY)
			sourceX := cosAngle*relativeX + sinAngle*relativeY + halfWidth
			sourceY := -sinAngle*relativeX + cosAngle*relativeY + halfHeight
			if sourceX < 0 || sourceY < 0 {
				continue
			}

			sampleX := int(math.Floor(sourceX))
			sampleY := int(math.Floor(sourceY))
			if sampleX < 0 || sampleY < 0 || sampleX >= stamp.Bounds().Dx() || sampleY >= stamp.Bounds().Dy() {
				continue
			}

			sourceColor := stamp.RGBAAt(sampleX, sampleY)
			if sourceColor.A == 0 {
				continue
			}

			blendPixel(dst, x, y, sourceColor)
		}
	}
}

func blendPixel(dst *image.RGBA, x int, y int, src color.RGBA) {
	index := dst.PixOffset(x, y)
	dstR := float64(dst.Pix[index]) / 255
	dstG := float64(dst.Pix[index+1]) / 255
	dstB := float64(dst.Pix[index+2]) / 255
	dstA := float64(dst.Pix[index+3]) / 255
	srcR := float64(src.R) / 255
	srcG := float64(src.G) / 255
	srcB := float64(src.B) / 255
	srcA := float64(src.A) / 255
	outA := srcA + dstA*(1-srcA)
	if outA <= 0 {
		return
	}

	outR := (srcR*srcA + dstR*dstA*(1-srcA)) / outA
	outG := (srcG*srcA + dstG*dstA*(1-srcA)) / outA
	outB := (srcB*srcA + dstB*dstA*(1-srcA)) / outA
	dst.Pix[index] = uint8(math.Round(outR * 255))
	dst.Pix[index+1] = uint8(math.Round(outG * 255))
	dst.Pix[index+2] = uint8(math.Round(outB * 255))
	dst.Pix[index+3] = uint8(math.Round(outA * 255))
}

func minInt(left int, right int) int {
	if left < right {
		return left
	}
	return right
}

func maxInt(left int, right int) int {
	if left > right {
		return left
	}
	return right
}

func drawDocument(dst *image.RGBA, lines []drawnLine) {
	for _, line := range lines {
		if line.chip != nil && line.chip.drawBackground {
			drawRoundedRect(dst, line.chip.rect, line.chip.radius, line.chip.fill, line.chip.border)
		}
		drawString(dst, line.face, line.fill, line.x, line.y, line.text)
	}
}

func drawRoundedRect(dst *image.RGBA, rect image.Rectangle, radius int, fill color.Color, border color.Color) {
	if rect.Dx() <= 0 || rect.Dy() <= 0 {
		return
	}

	fillRoundedRect(dst, rect, radius, border)
	inner := image.Rect(rect.Min.X+1, rect.Min.Y+1, rect.Max.X-1, rect.Max.Y-1)
	if inner.Dx() <= 0 || inner.Dy() <= 0 {
		return
	}

	fillRoundedRect(dst, inner, maxInt(radius-1, 0), fill)
}

func fillRoundedRect(dst *image.RGBA, rect image.Rectangle, radius int, fill color.Color) {
	if rect.Dx() <= 0 || rect.Dy() <= 0 {
		return
	}

	radius = maxInt(radius, 0)
	radius = minInt(radius, rect.Dx()/2)
	radius = minInt(radius, rect.Dy()/2)
	converted := color.RGBAModel.Convert(fill).(color.RGBA)

	for py := rect.Min.Y; py < rect.Max.Y; py++ {
		for px := rect.Min.X; px < rect.Max.X; px++ {
			if !pointInsideRoundedRect(px, py, rect, radius) {
				continue
			}
			blendPixel(dst, px, py, converted)
		}
	}
}

func pointInsideRoundedRect(px int, py int, rect image.Rectangle, radius int) bool {
	if radius <= 0 {
		return true
	}

	if px >= rect.Min.X+radius && px < rect.Max.X-radius {
		return true
	}
	if py >= rect.Min.Y+radius && py < rect.Max.Y-radius {
		return true
	}

	centerX := rect.Min.X + radius
	if px >= rect.Max.X-radius {
		centerX = rect.Max.X - radius - 1
	}
	centerY := rect.Min.Y + radius
	if py >= rect.Max.Y-radius {
		centerY = rect.Max.Y - radius - 1
	}

	dx := float64(px - centerX)
	dy := float64(py - centerY)
	return dx*dx+dy*dy <= float64(radius*radius)
}

func drawString(dst *image.RGBA, face font.Face, fill color.Color, x int, y int, value string) {
	if strings.TrimSpace(value) == "" {
		return
	}
	d := font.Drawer{
		Dst:  dst,
		Src:  image.NewUniform(fill),
		Face: face,
		Dot:  fixed.P(x, y),
	}
	d.DrawString(value)
}

func wrapText(face font.Face, value string, maxWidth int) []string {
	value = strings.TrimSpace(value)
	if value == "" {
		return nil
	}

	parts := strings.FieldsFunc(value, func(r rune) bool {
		return r == '\n' || r == '\r'
	})
	if len(parts) == 0 {
		parts = []string{value}
	}

	lines := make([]string, 0, len(parts))
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		lines = append(lines, wrapSingleLine(face, part, maxWidth)...)
	}
	return lines
}

func wrapSingleLine(face font.Face, value string, maxWidth int) []string {
	if textWidth(face, value) <= maxWidth {
		return []string{value}
	}

	runes := []rune(value)
	lines := make([]string, 0, len(runes)/12+1)
	var builder strings.Builder
	for _, r := range runes {
		candidate := builder.String() + string(r)
		if builder.Len() > 0 && textWidth(face, candidate) > maxWidth {
			lines = append(lines, strings.TrimSpace(builder.String()))
			builder.Reset()
		}
		builder.WriteRune(r)
	}
	if builder.Len() > 0 {
		lines = append(lines, strings.TrimSpace(builder.String()))
	}
	return compactValues(lines)
}

func textWidth(face font.Face, value string) int {
	d := &font.Drawer{Face: face}
	return d.MeasureString(value).Ceil()
}

func encodeImage(src image.Image, format RenderFormat, quality float32) (EncodedImage, error) {
	var buf bytes.Buffer
	switch format {
	case FormatPNG:
		if err := encodePNG(&buf, src); err != nil {
			return EncodedImage{}, err
		}
		return EncodedImage{
			ContentType: "image/png",
			Format:      FormatPNG,
			Width:       src.Bounds().Dx(),
			Height:      src.Bounds().Dy(),
			Bytes:       buf.Bytes(),
		}, nil
	default:
		if err := webp.Encode(&buf, src, &webp.Options{
			Lossless: false,
			Quality:  quality,
		}); err != nil {
			return EncodedImage{}, err
		}
		return EncodedImage{
			ContentType: "image/webp",
			Format:      FormatWebP,
			Width:       src.Bounds().Dx(),
			Height:      src.Bounds().Dy(),
			Bytes:       buf.Bytes(),
		}, nil
	}
}

func encodePNG(buf *bytes.Buffer, src image.Image) error {
	return png.Encode(buf, src)
}

func loadUsableFont(candidates []string) (*opentype.Font, error) {
	paths := candidates
	if len(paths) == 0 {
		paths = defaultFontCandidates
	}

	failures := make([]string, 0, len(paths))
	for _, candidate := range paths {
		candidate = strings.TrimSpace(candidate)
		if candidate == "" {
			continue
		}
		data, err := os.ReadFile(candidate)
		if err != nil {
			failures = append(failures, fmt.Sprintf("%s: %v", candidate, err))
			continue
		}

		parsed, err := parseFont(data)
		if err != nil {
			failures = append(failures, fmt.Sprintf("%s: %v", candidate, err))
			continue
		}
		return parsed, nil
	}

	if len(failures) == 0 {
		return nil, fmt.Errorf("no usable font found in %s", strings.Join(paths, ", "))
	}

	return nil, fmt.Errorf("no usable font found; attempted %s", strings.Join(failures, "; "))
}

func parseFont(data []byte) (*opentype.Font, error) {
	if collection, err := opentype.ParseCollection(data); err == nil {
		for index := 0; index < collection.NumFonts(); index++ {
			fontEntry, fontErr := collection.Font(index)
			if fontErr == nil {
				return fontEntry, nil
			}
		}
		return nil, errors.New("invalid font collection")
	}
	return opentype.Parse(data)
}

func compactValues(values []string) []string {
	result := make([]string, 0, len(values))
	for _, value := range values {
		if trimmed := strings.TrimSpace(value); trimmed != "" {
			result = append(result, trimmed)
		}
	}
	return result
}

func closeFace(face font.Face) {
	if face == nil {
		return
	}
	if closer, ok := face.(interface{ Close() error }); ok {
		_ = closer.Close()
	}
}
