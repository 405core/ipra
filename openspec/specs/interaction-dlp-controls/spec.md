## ADDED Requirements

### Requirement: The frontend must block common copy and export interactions
The frontend MUST block common client-side leakage interactions for protected pages, including copy, cut, paste, print, text selection, right-click context menus, and drag-based extraction where technically possible.

#### Scenario: User attempts to copy content with keyboard shortcuts
- **WHEN** an authenticated operator presses a blocked shortcut such as Ctrl/Cmd+C or Ctrl/Cmd+P on a protected page
- **THEN** the frontend MUST prevent the browser action from completing
- **AND** the page MUST remain in the protected session context

#### Scenario: User attempts to open context menu or select text
- **WHEN** an authenticated operator attempts to right-click, drag sensitive content, or select protected text on a protected page
- **THEN** the frontend MUST prevent the interaction where browser capabilities allow

### Requirement: DLP interaction blocking must be audited
The system MUST record audit events whenever protected interaction controls block a high-risk client action related to data leakage or export attempts.

#### Scenario: Copy action is blocked
- **WHEN** the frontend blocks a copy or cut attempt on a protected page
- **THEN** the system MUST record an audit event identifying the action type, page context, operator identity, and result as blocked or denied

#### Scenario: Print action is blocked
- **WHEN** the frontend blocks a print attempt or equivalent browser export shortcut
- **THEN** the system MUST record a corresponding audit event for the denied action

### Requirement: Protected page controls must remain operable
The system MUST preserve normal operation of non-sensitive site controls even while DLP interaction blocking is active.

#### Scenario: Operator uses page controls on a protected page
- **WHEN** an authenticated operator clicks buttons, types in input fields, chooses filters, switches tabs, or navigates pagination controls
- **THEN** those controls MUST continue to work normally
- **AND** DLP protections MUST apply only to prohibited leakage interactions rather than disabling the application itself
