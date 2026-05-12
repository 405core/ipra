#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "[check] strict dlp egress"

frontend_targets=(
  "apps/frontend/src/views/UserHomeView.vue"
  "apps/frontend/src/views/UserAskView.vue"
  "apps/frontend/src/views/UserAuditView.vue"
  "apps/frontend/src/views/ManagementView.vue"
  "apps/frontend/src/views/UserLayoutView.vue"
  "apps/frontend/src/app/profile-service.ts"
  "apps/frontend/src/app/archive-service.ts"
  "apps/frontend/src/app/inquiry-protected-service.ts"
  "apps/frontend/src/app/memory-service.ts"
  "apps/frontend/src/app/admin-service.ts"
  "apps/frontend/src/app/audit-service.ts"
)

blocked_patterns=(
  "searchPassengerProfiles\\("
  "fetchMemoryContext\\("
  "listAdminAuditLogs\\("
  "listAdminProfiles\\("
  "listAdminUsers\\("
  "listAdminWatchlist\\("
  "minioBucket"
  "minioObjectKey"
  "videoUrl"
  "storedPath"
  "localStorage"
  "sessionStorage"
  "IndexedDB"
)

status=0

for pattern in "${blocked_patterns[@]}"; do
  if rg -n "$pattern" "${frontend_targets[@]}" >/tmp/ipra_dlp_check.out 2>/dev/null; then
    echo "[fail] blocked pattern found: $pattern"
    cat /tmp/ipra_dlp_check.out
    status=1
  fi
done

required_patterns=(
  "searchPassengerProfilesProtected"
  "listProtectedAuditLogs|getProtectedAuditLogDetail"
  "listAdminProfilesProtected"
  "listAdminUsersProtected"
  "listAdminWatchlistProtected"
  "generateProtectedInquiryStrategy"
  "requestProtectedInquiryFollowup"
  "requestProtectedInquiryJudgement"
)

for pattern in "${required_patterns[@]}"; do
  if ! rg -n "$pattern" apps/frontend/src >/tmp/ipra_dlp_check.out 2>/dev/null; then
    echo "[fail] required protected pattern missing: $pattern"
    status=1
  fi
done

if [[ "$status" -eq 0 ]]; then
  echo "[ok] strict dlp egress checks passed"
fi

exit "$status"
