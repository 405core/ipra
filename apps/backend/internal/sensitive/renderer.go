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

	lines, totalHeight := measureDocument(layout, spec.Document, titleFace, bodyFace, tagFace)
	canvas := image.NewRGBA(image.Rect(0, 0, layout.Width, totalHeight))
	stddraw.Draw(canvas, canvas.Bounds(), image.NewUniform(color.RGBA{250, 252, 254, 255}), image.Point{}, stddraw.Src)

	drawAccent(canvas, layout, spec.Preset)
	drawWatermark(canvas, layout, watermarkFace, spec.Watermark)
	drawDocument(canvas, lines)

	format := spec.Format
	if format == "" {
		format = FormatWebP
	}
	return encodeImage(canvas, format, layout.Quality)
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
			TagSize:       18,
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

func measureDocument(
	layout presetLayout,
	doc Document,
	titleFace font.Face,
	bodyFace font.Face,
	tagFace font.Face,
) ([]drawnLine, int) {
	lines := make([]drawnLine, 0, 64)
	x := layout.Padding
	y := layout.Padding + titleFace.Metrics().Ascent.Ceil()
	maxWidth := layout.Width - layout.Padding*2

	if eyebrow := strings.TrimSpace(doc.Eyebrow); eyebrow != "" {
		for _, wrapped := range wrapText(bodyFace, strings.ToUpper(eyebrow), maxWidth) {
			lines = append(lines, drawnLine{text: wrapped, x: x, y: y, face: bodyFace, fill: color.RGBA{70, 92, 100, 255}})
			y += bodyFace.Metrics().Height.Ceil()
		}
		y += 8
	}

	for _, wrapped := range wrapText(titleFace, strings.TrimSpace(doc.Title), maxWidth) {
		lines = append(lines, drawnLine{text: wrapped, x: x, y: y, face: titleFace, fill: color.RGBA{21, 37, 43, 255}})
		y += titleFace.Metrics().Height.Ceil()
	}

	if subtitle := strings.TrimSpace(doc.Subtitle); subtitle != "" {
		y += 4
		for _, wrapped := range wrapText(bodyFace, subtitle, maxWidth) {
			lines = append(lines, drawnLine{text: wrapped, x: x, y: y, face: bodyFace, fill: color.RGBA{58, 78, 86, 255}})
			y += bodyFace.Metrics().Height.Ceil()
		}
	}

	if len(doc.Tags) > 0 {
		y += 14
		tagLine := strings.Join(compactValues(doc.Tags), "    ")
		for _, wrapped := range wrapText(tagFace, tagLine, maxWidth) {
			lines = append(lines, drawnLine{text: wrapped, x: x, y: y, face: tagFace, fill: color.RGBA{10, 83, 101, 255}})
			y += tagFace.Metrics().Height.Ceil()
		}
	}

	for _, section := range doc.Sections {
		if heading := strings.TrimSpace(section.Heading); heading != "" {
			y += 18
			for _, wrapped := range wrapText(bodyFace, heading, maxWidth) {
				lines = append(lines, drawnLine{text: wrapped, x: x, y: y, face: bodyFace, fill: color.RGBA{21, 37, 43, 255}})
				y += bodyFace.Metrics().Height.Ceil()
			}
		}

		for _, rawLine := range compactValues(section.Lines) {
			y += 4
			for _, wrapped := range wrapText(bodyFace, rawLine, maxWidth) {
				lines = append(lines, drawnLine{text: wrapped, x: x, y: y, face: bodyFace, fill: color.RGBA{30, 48, 56, 255}})
				y += bodyFace.Metrics().Height.Ceil()
			}
		}
	}

	if len(doc.Footer) > 0 {
		y += 18
		for _, rawLine := range compactValues(doc.Footer) {
			for _, wrapped := range wrapText(bodyFace, rawLine, maxWidth) {
				lines = append(lines, drawnLine{text: wrapped, x: x, y: y, face: bodyFace, fill: color.RGBA{76, 95, 102, 255}})
				y += bodyFace.Metrics().Height.Ceil()
			}
		}
	}

	return lines, y + layout.Padding
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

func drawWatermark(dst *image.RGBA, layout presetLayout, face font.Face, wm WatermarkContext) {
	display := BuildDisplayWatermarkContext(wm)
	text := BuildWatermarkText(display)
	if strings.TrimSpace(text) == "" {
		return
	}

	for _, tile := range defaultWatermarkTiles {
		stamp := newWatermarkStamp(face, text, tile.opacity)
		centerX := int(math.Round(float64(dst.Bounds().Dx()) * tile.left))
		centerY := int(math.Round(float64(dst.Bounds().Dy()) * tile.top))
		drawRotatedStamp(dst, stamp, centerX, centerY, tile.rotation)
	}
}

func newWatermarkStamp(face font.Face, text string, opacity float64) *image.RGBA {
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
		drawString(dst, line.face, line.fill, line.x, line.y, line.text)
	}
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
