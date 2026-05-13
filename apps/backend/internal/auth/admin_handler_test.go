package auth

import "testing"

func TestParseAdminUserStatusFilter(t *testing.T) {
	if got := parseAdminUserStatusFilter(""); got != "" {
		t.Fatalf("empty status filter = %q, want empty string", got)
	}

	if got := parseAdminUserStatusFilter("active"); got != StatusActive {
		t.Fatalf("active status filter = %q, want %q", got, StatusActive)
	}

	if got := parseAdminUserStatusFilter("disabled"); got != StatusDisabled {
		t.Fatalf("disabled status filter = %q, want %q", got, StatusDisabled)
	}
}
