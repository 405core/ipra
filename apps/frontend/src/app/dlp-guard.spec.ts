/* @vitest-environment jsdom */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { disableDlpGuard, enableDlpGuard } from './dlp-guard';

const auditMocks = vi.hoisted(() => ({
  recordAuditEvent: vi.fn().mockResolvedValue({ message: 'ok' }),
}));

vi.mock('./audit-service', () => auditMocks);

describe('dlp-guard', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    auditMocks.recordAuditEvent.mockClear();
  });

  afterEach(() => {
    disableDlpGuard();
  });

  it('blocks copy on non-control content', async () => {
    enableDlpGuard('/admin/home');

    const target = document.createElement('div');
    target.textContent = 'sensitive';
    document.body.appendChild(target);

    const event = new Event('copy', { bubbles: true, cancelable: true });
    target.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });

  it('keeps button interactions operable', () => {
    enableDlpGuard('/admin/home');

    const button = document.createElement('button');
    let clicked = 0;
    button.addEventListener('click', () => {
      clicked += 1;
    });
    document.body.appendChild(button);

    button.click();

    expect(clicked).toBe(1);
  });

  it('does not block copy inside input controls', () => {
    enableDlpGuard('/admin/home');

    const input = document.createElement('input');
    input.value = 'allowed';
    document.body.appendChild(input);

    const event = new Event('copy', { bubbles: true, cancelable: true });
    input.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
  });
});
