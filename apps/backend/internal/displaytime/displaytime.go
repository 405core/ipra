package displaytime

import "time"

const chinaTimeZoneName = "Asia/Shanghai"

var chinaLocation = loadChinaLocation()

func loadChinaLocation() *time.Location {
	location, err := time.LoadLocation(chinaTimeZoneName)
	if err == nil {
		return location
	}

	return time.FixedZone("UTC+8", 8*60*60)
}

func Format(value time.Time, layout string) string {
	if value.IsZero() {
		return "-"
	}

	return value.In(chinaLocation).Format(layout)
}
