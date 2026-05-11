import { recordAuditEvent } from './audit-service';

const blockedEventTypes = new Set([
  'copy',
  'cut',
  'paste',
  'contextmenu',
  'dragstart',
  'selectstart',
]);

const blockedShortcuts = new Map<string, string>([
  ['c', 'copy_shortcut'],
  ['p', 'print_shortcut'],
  ['s', 'save_shortcut'],
  ['a', 'select_all_shortcut'],
]);

let stopGuard: (() => void) | null = null;
let lastAuditAt = 0;

export function enableDlpGuard(pageContext: string) {
  disableDlpGuard();

  const handleEvent = (event: Event) => {
    const target = event.target;
    if (isAllowedControlTarget(target)) {
      return;
    }
    if (!blockedEventTypes.has(event.type)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    void auditBlocked(pageContext, event.type);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (!(event.ctrlKey || event.metaKey)) {
      return;
    }
    if (isAllowedControlTarget(event.target)) {
      return;
    }

    const key = event.key.toLowerCase();
    const action = blockedShortcuts.get(key);
    if (!action) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    void auditBlocked(pageContext, action);
  };

  const handleBeforePrint = () => {
    void auditBlocked(pageContext, 'beforeprint');
  };

  document.addEventListener('copy', handleEvent, true);
  document.addEventListener('cut', handleEvent, true);
  document.addEventListener('paste', handleEvent, true);
  document.addEventListener('contextmenu', handleEvent, true);
  document.addEventListener('dragstart', handleEvent, true);
  document.addEventListener('selectstart', handleEvent, true);
  document.addEventListener('keydown', handleKeydown, true);
  window.addEventListener('beforeprint', handleBeforePrint, true);

  stopGuard = () => {
    document.removeEventListener('copy', handleEvent, true);
    document.removeEventListener('cut', handleEvent, true);
    document.removeEventListener('paste', handleEvent, true);
    document.removeEventListener('contextmenu', handleEvent, true);
    document.removeEventListener('dragstart', handleEvent, true);
    document.removeEventListener('selectstart', handleEvent, true);
    document.removeEventListener('keydown', handleKeydown, true);
    window.removeEventListener('beforeprint', handleBeforePrint, true);
  };
}

export function disableDlpGuard() {
  stopGuard?.();
  stopGuard = null;
}

function isAllowedControlTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tag = target.tagName.toLowerCase();
  if (tag === 'input' || tag === 'textarea' || tag === 'button' || tag === 'select') {
    return true;
  }

  if (target.isContentEditable) {
    return true;
  }

  return Boolean(target.closest('[data-dlp-allow="true"]'));
}

async function auditBlocked(pageContext: string, action: string) {
  const now = Date.now();
  if (now - lastAuditAt < 300) {
    return;
  }
  lastAuditAt = now;

  try {
    await recordAuditEvent({
      action: `block_${action}`,
      resource: 'DLP防护',
      result: 'denied',
      path: pageContext,
      detail: {
        pageContext,
        action,
      },
    });
  } catch {
    // noop
  }
}
