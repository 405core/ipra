## 1. Backend Rendering Foundation

- [x] 1.1 Introduce a backend image rendering module that can render structured business data into server-generated image cards and detail blocks
- [x] 1.2 Implement a reusable watermark generator that embeds operator work ID, operator name, timestamp, client IP, and request or session identifier directly into image pixels
- [x] 1.3 Add rendering presets for `list`, `detail`, and `dialog` contexts with separate size and quality policies
- [x] 1.4 Add image encoding support that prefers WebP and falls back to PNG only when readability or compatibility requires it
- [x] 1.5 Add common response helpers that set `Cache-Control: no-store` and related anti-cache headers for all sensitive image responses

## 2. Backend Sensitive Data APIs

- [x] 2.1 Add image-oriented response models and endpoints for user-side passenger search results and passenger detail content
- [x] 2.2 Add image-oriented response models and endpoints for user-side audit log list and audit log detail content
- [x] 2.3 Add image-oriented response models and endpoints for admin-side passenger profiles, watchlists, users, and audit logs
- [x] 2.4 Add image-oriented response models and endpoints for inquiry strategy, follow-up guidance, summaries, and conclusion blocks
- [x] 2.5 Refactor backend filtering and pagination so sensitive datasets are queried server-side and returned as image-rendered result pages instead of full plaintext arrays
- [x] 2.6 Ensure sensitive image endpoints expose only minimal non-sensitive control metadata such as record IDs, paging information, and action availability

## 3. Frontend DLP Controls

- [x] 3.1 Add a global protected-page DLP guard that blocks copy, cut, paste, context menu, drag start, print, and text selection where browser capabilities allow
- [x] 3.2 Add keyboard shortcut interception for high-risk actions such as Ctrl/Cmd+C, Ctrl/Cmd+P, Ctrl/Cmd+S, and Ctrl/Cmd+A on protected pages
- [x] 3.3 Add frontend audit event reporting for blocked DLP interactions with page context and action type
- [x] 3.4 Ensure protected page controls such as buttons, inputs, filters, tabs, and pagination remain operable while DLP blocking is active

## 4. Frontend Sensitive Image Presentation

- [x] 4.1 Create shared frontend components for rendering sensitive list images, detail images, loading placeholders, and error states
- [x] 4.2 Refactor `UserHomeView` to replace text-based server data rendering with backend-generated image cards while keeping search and action controls as DOM
- [x] 4.3 Refactor `UserAuditView` to replace audit list text rendering and detail dialog text rendering with backend-generated images
- [x] 4.4 Refactor `ManagementView` to replace admin-side profiles, watchlists, users, and audit content rendering with backend-generated images while preserving action controls
- [x] 4.5 Refactor `UserAskView` so server-returned inquiry strategy, follow-up guidance, summaries, and conclusion content are displayed as backend-generated images
- [x] 4.6 Remove frontend logic that depends on holding complete sensitive plaintext datasets for local filtering, sorting, or detail reconstruction

## 5. Performance, Validation, and Rollout

- [x] 5.1 Add lazy loading and per-context image request behavior so list pages load only the necessary first-screen sensitive images
- [x] 5.2 Add automated backend tests for watermark inclusion, anti-cache headers, and image response shape for sensitive endpoints
- [x] 5.3 Add frontend tests for DLP event blocking, protected control operability, and image-only sensitive content rendering paths
- [x] 5.4 Measure list and detail image payload sizes and tune WebP or PNG compression presets to keep routine traffic within acceptable limits
- [x] 5.5 Add migration switches or feature flags so old plaintext rendering paths can be disabled gradually and rolled back if necessary
- [x] 5.6 Validate the rollout against the procurement requirements for no-copy controls, no-export behavior, server-side rendering, watermark traceability, and audit coverage
