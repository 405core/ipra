/* @vitest-environment jsdom */

import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import ManagementView from './ManagementView.vue';

const adminServiceMocks = vi.hoisted(() => ({
  createAdminProfile: vi.fn(),
  createAdminUser: vi.fn(),
  createAdminWatchlist: vi.fn(),
  deleteAdminProfile: vi.fn(),
  deleteAdminWatchlist: vi.fn(),
  getAdminInquirySettings: vi.fn(),
  listAdminAuditLogs: vi.fn(),
  listAdminProfiles: vi.fn(),
  listAdminUsers: vi.fn(),
  listAdminWatchlist: vi.fn(),
  updateAdminInquirySettings: vi.fn(),
  updateAdminProfile: vi.fn(),
  updateAdminUser: vi.fn(),
  updateAdminUserStatus: vi.fn(),
  updateAdminWatchlist: vi.fn(),
}));

vi.mock('../app/admin-service', () => adminServiceMocks);

vi.mock('../app/audit-service', () => ({
  recordAuditEvent: vi.fn(),
}));

vi.mock('../app/touch-input', () => ({
  openTouchInput: vi.fn(),
}));

vi.mock('../auth', () => ({
  clearAuthSession: vi.fn(),
  loadAuthSession: vi.fn(() => ({
    token: 'admin-token',
    user: {
      id: 1,
      workId: 'admin',
      name: '管理员',
      role: 'admin',
      status: 'active',
    },
  })),
  resolveRoleHome: vi.fn(() => '/home'),
  validateAuthSession: vi.fn(),
}));

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

function flushPromises() {
  return new Promise((resolve) => window.setTimeout(resolve, 0));
}

function findButton(wrapper: VueWrapper, label: string) {
  const button = wrapper
    .findAll('button')
    .find((item) => item.text().includes(label));

  expect(button, `button "${label}" should exist`).toBeTruthy();
  return button!;
}

describe('ManagementView settings tab', () => {
  let wrapper: VueWrapper | null = null;

  beforeEach(() => {
    vi.clearAllMocks();
    adminServiceMocks.listAdminProfiles.mockResolvedValue({ items: [], total: 0 });
    adminServiceMocks.listAdminWatchlist.mockResolvedValue({ items: [], total: 0 });
    adminServiceMocks.listAdminUsers.mockResolvedValue({ items: [], total: 0 });
    adminServiceMocks.listAdminAuditLogs.mockResolvedValue({ items: [], total: 0 });
    adminServiceMocks.getAdminInquirySettings.mockResolvedValue({
      maxRounds: 3,
      minRounds: 1,
      maxAllowedRounds: 10,
      updatedAt: '2026-05-11T08:00:00Z',
    });
    adminServiceMocks.updateAdminInquirySettings.mockResolvedValue({
      maxRounds: 5,
      minRounds: 1,
      maxAllowedRounds: 10,
      updatedAt: '2026-05-11T08:05:00Z',
    });
  });

  afterEach(() => {
    wrapper?.unmount();
    wrapper = null;
  });

  it('saves the inquiry round limit from the system settings tab', async () => {
    wrapper = mount(ManagementView);
    await flushPromises();
    await nextTick();

    await findButton(wrapper, '系统设置').trigger('click');
    await nextTick();

    const input = wrapper.find('input[type="number"]');
    expect(input.exists()).toBe(true);
    await input.setValue('5');
    await findButton(wrapper, '保存设置').trigger('click');
    await flushPromises();

    expect(adminServiceMocks.updateAdminInquirySettings).toHaveBeenCalledWith(5);
    expect(wrapper.text()).toContain('系统设置已保存');
  });
});
