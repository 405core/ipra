package sensitive

import "time"

type RenderPreset string

const (
	PresetList   RenderPreset = "list"
	PresetDetail RenderPreset = "detail"
	PresetDialog RenderPreset = "dialog"
)

type RenderFormat string

const (
	FormatWebP RenderFormat = "webp"
	FormatPNG  RenderFormat = "png"
)

type WatermarkContext struct {
	WorkID    string
	Name      string
	Role      string
	ClientIP  string
	RequestID string
	Page      string
	Timestamp time.Time
}

type Section struct {
	Heading string
	Lines   []string
}

type TagTone string

const (
	TagToneDefault  TagTone = "default"
	TagToneAccent   TagTone = "accent"
	TagToneMuted    TagTone = "muted"
	TagToneAlert    TagTone = "alert"
	TagToneWarning  TagTone = "warning"
	TagToneSuccess  TagTone = "success"
	TagToneIdentity TagTone = "identity"
)

type TagItem struct {
	Text string
	Tone TagTone
}

type FactItem struct {
	Label string
	Value string
}

type Document struct {
	Eyebrow    string
	Title      string
	Subtitle   string
	Tags       []string
	TagItems   []TagItem
	FactItems  []FactItem
	MetaItems  []TagItem
	FooterTags []TagItem
	Sections   []Section
	Footer     []string
}

type EncodedImage struct {
	ContentType string
	Format      RenderFormat
	Width       int
	Height      int
	Bytes       []byte
}

type AssetSpec struct {
	OwnerUserID uint64
	Document    Document
	Preset      RenderPreset
	Format      RenderFormat
	Watermark   WatermarkContext
	CreatedAt   time.Time
	ExpiresAt   time.Time
}

type AssetRef struct {
	ID      string `json:"id"`
	URL     string `json:"url"`
	Context string `json:"context"`
}

type ListItem struct {
	ID          string   `json:"id"`
	Asset       AssetRef `json:"asset"`
	DetailAsset AssetRef `json:"detailAsset,omitempty"`
	Actions     []string `json:"actions,omitempty"`
}

type ListResponse struct {
	Items    []ListItem `json:"items"`
	Total    int64      `json:"total"`
	Page     int        `json:"page"`
	PageSize int        `json:"pageSize"`
}

type DetailResponse struct {
	ID    string   `json:"id"`
	Asset AssetRef `json:"asset"`
}
