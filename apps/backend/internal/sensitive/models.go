package sensitive

import (
	"sort"
	"strings"
	"time"
)

type RenderPreset string

const (
	PresetCompactList RenderPreset = "compact_list"
	PresetInline      RenderPreset = "inline"
	PresetList        RenderPreset = "list"
	PresetDetail      RenderPreset = "detail"
	PresetDialog      RenderPreset = "dialog"
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
	Style       RenderStyle
	Watermark   WatermarkContext
	CreatedAt   time.Time
	ExpiresAt   time.Time
}

type RenderStyle struct {
	Transparent bool
	HideAccent  bool
}

type AssetRef struct {
	ID      string `json:"id"`
	URL     string `json:"url"`
	Context string `json:"context"`
}

type FilterOption struct {
	Value string `json:"value"`
	Label string `json:"label"`
}

type FilterGroup struct {
	Key     string         `json:"key"`
	Label   string         `json:"label"`
	Options []FilterOption `json:"options"`
}

type FieldRef struct {
	Key   string   `json:"key"`
	Asset AssetRef `json:"asset"`
	Tone  TagTone  `json:"tone,omitempty"`
}

type FactRef struct {
	Key   string   `json:"key,omitempty"`
	Label string   `json:"label"`
	Asset AssetRef `json:"asset"`
}

type ListItem struct {
	ID          string   `json:"id"`
	Asset       AssetRef `json:"asset"`
	DetailAsset AssetRef `json:"detailAsset,omitempty"`
	Actions     []string `json:"actions,omitempty"`
	Kind        string   `json:"kind,omitempty"`
	Fields      []FieldRef `json:"fields,omitempty"`
	Chips       []FieldRef `json:"chips,omitempty"`
	Facts       []FactRef  `json:"facts,omitempty"`
	Meta        []FieldRef `json:"meta,omitempty"`
	Notes       []FieldRef `json:"notes,omitempty"`
	Flags       map[string]bool `json:"flags,omitempty"`
}

type ListResponse struct {
	Items    []ListItem     `json:"items"`
	Total    int64          `json:"total"`
	Page     int            `json:"page"`
	PageSize int            `json:"pageSize"`
	Filters  []FilterGroup  `json:"filters,omitempty"`
}

type DetailResponse struct {
	ID    string   `json:"id"`
	Asset AssetRef `json:"asset"`
}

func NormalizeFilterOptions(options []FilterOption) []FilterOption {
	seen := make(map[string]FilterOption, len(options))
	for _, option := range options {
		value := strings.TrimSpace(option.Value)
		label := strings.TrimSpace(option.Label)
		if value == "" || label == "" {
			continue
		}
		if _, exists := seen[value]; exists {
			continue
		}
		seen[value] = FilterOption{
			Value: value,
			Label: label,
		}
	}

	result := make([]FilterOption, 0, len(seen))
	for _, option := range seen {
		result = append(result, option)
	}

	sort.Slice(result, func(i, j int) bool {
		if result[i].Label == result[j].Label {
			return result[i].Value < result[j].Value
		}
		return result[i].Label < result[j].Label
	})

	return result
}
