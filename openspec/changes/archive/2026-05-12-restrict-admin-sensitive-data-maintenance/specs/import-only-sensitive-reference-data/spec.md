## ADDED Requirements

### Requirement: Sensitive reference data SHALL be maintained by import only
The system SHALL treat `基础画像` and `高风险名单` as import-managed sensitive reference data. Administrators MUST maintain these datasets only through procurement-provided Excel or CSV file import flows, and the management console MUST NOT provide online create, edit, or delete operations for these datasets.

#### Scenario: Management console shows import-managed datasets as read-only
- **WHEN** an administrator opens the `基础画像` or `高风险名单` section in the management console
- **THEN** the page SHALL allow protected viewing, querying, filtering, and import-related operations
- **AND** the page SHALL NOT display online create, edit, or delete actions for these datasets

#### Scenario: Existing imported records remain queryable
- **WHEN** an administrator searches or filters imported `基础画像` or `高风险名单`
- **THEN** the system SHALL continue to return protected search and list results
- **AND** the administrator SHALL still be able to use these records for downstream业务流程

### Requirement: Online maintenance endpoints SHALL be unavailable for sensitive reference data
The system SHALL reject online single-record maintenance requests for `基础画像` and `高风险名单`, including single-record plain detail retrieval for editing, create, update, and delete operations.

#### Scenario: Backend rejects profile online maintenance
- **WHEN** a client requests single-record plain detail retrieval, create, update, or delete for `基础画像`
- **THEN** the backend SHALL reject the request
- **AND** the response SHALL clearly indicate that `基础画像` only supports maintenance through import

#### Scenario: Backend rejects watchlist online maintenance
- **WHEN** a client requests single-record plain detail retrieval, create, update, or delete for `高风险名单`
- **THEN** the backend SHALL reject the request
- **AND** the response SHALL clearly indicate that `高风险名单` only supports maintenance through import
