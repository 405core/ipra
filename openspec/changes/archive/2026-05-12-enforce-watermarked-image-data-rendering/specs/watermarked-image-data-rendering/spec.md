## ADDED Requirements

### Requirement: Service-returned business data must be rendered as server-generated images
The system MUST render all business data returned from backend services as server-generated images before it is displayed in user-facing or administrator-facing pages. Frontend pages MUST NOT receive the corresponding sensitive content as plain text for display rendering.

#### Scenario: User search results are displayed as image cards
- **WHEN** a user searches passenger data in the data retrieval page
- **THEN** the backend MUST return image-rendered result cards or image endpoints for each matched record
- **AND** the frontend MUST display those result cards without reconstructing the sensitive text from raw response fields

#### Scenario: Admin business lists are displayed as image rows
- **WHEN** an administrator opens business data pages such as passenger profiles, watchlists, users, or audit logs
- **THEN** the backend MUST provide image-rendered rows or cards for the returned records
- **AND** the frontend MUST keep only minimal non-sensitive control metadata such as record identifiers, pagination data, and action availability

### Requirement: Sensitive detail views must use watermarked image content
The system MUST render sensitive detail content, including passenger detail views, audit log details, inquiry strategy outputs, inquiry conclusions, and similar server-returned content, as watermarked images rather than plain DOM text.

#### Scenario: Audit log detail is opened
- **WHEN** a user or administrator opens an audit log detail dialog
- **THEN** the detail body MUST be displayed as one or more server-generated watermarked images
- **AND** the frontend MUST NOT expose the same detail payload as raw text for rendering

#### Scenario: Inquiry result content is shown
- **WHEN** the system shows server-generated inquiry strategy, follow-up guidance, summary, or conclusion data
- **THEN** those content blocks MUST be rendered from backend-generated images
- **AND** only interaction controls such as next-step buttons or stage switches may remain as DOM controls

### Requirement: All sensitive images must embed traceable dynamic watermarks
The system MUST embed non-removable dynamic digital watermarks directly into the pixels of every sensitive image asset. The watermark MUST include operator identity and request context sufficient for leak traceability.

#### Scenario: Sensitive image is requested by an authenticated operator
- **WHEN** the backend renders a sensitive image for an authenticated request
- **THEN** the generated image MUST include embedded watermark content containing at least operator work ID, operator name, timestamp, client IP, and request or session identifier
- **AND** the watermark MUST be repeated or tiled so that partial screenshots still retain traceable information

### Requirement: Sensitive image delivery must minimize network overhead
The system MUST compress sensitive images according to display context and MUST avoid whole-page image rendering for routine list and detail interactions.

#### Scenario: List page requests record images
- **WHEN** the frontend requests sensitive images for a list or grid view
- **THEN** the backend MUST return list-optimized compressed images sized for the target display context
- **AND** the backend MUST prefer efficient image formats such as WebP unless readability or compatibility requires another format

#### Scenario: Detail dialog requests high-readability content
- **WHEN** the frontend requests sensitive images for a detail view or dialog
- **THEN** the backend MUST return detail-optimized images with higher readability settings than list mode
- **AND** the backend MUST still apply compression and size controls appropriate for the display target

### Requirement: Sensitive image responses must not persist in browser storage
The system MUST deliver sensitive images with anti-cache controls and MUST NOT persist them in browser storage mechanisms intended for reuse across sessions.

#### Scenario: Browser receives a sensitive image response
- **WHEN** a frontend client downloads a sensitive image
- **THEN** the response MUST instruct clients not to store the resource persistently
- **AND** the frontend MUST NOT write the image or its underlying sensitive payload into localStorage, sessionStorage, IndexedDB, or equivalent browser persistence layers

### Requirement: Querying and filtering sensitive records must be backend-driven
The system MUST execute filtering, searching, and pagination for sensitive business data on the backend instead of relying on frontend-held full sensitive datasets.

#### Scenario: Operator changes a search or filter condition
- **WHEN** an operator updates a query, filter, or page selection for a sensitive dataset
- **THEN** the frontend MUST submit the filter criteria to the backend
- **AND** the backend MUST respond with only the requested page of image-rendered sensitive records and minimal control metadata
