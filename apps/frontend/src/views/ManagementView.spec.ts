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

const archiveServiceMocks = vi.hoisted(() => ({
  fetchArchiveVideoBlob: vi.fn(),
  getInquiryArchive: vi.fn(),
  listInquiryArchives: vi.fn(),
}));

vi.mock('../app/archive-service', () => archiveServiceMocks);

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
    archiveServiceMocks.listInquiryArchives.mockResolvedValue({ items: [], total: 0 });
    archiveServiceMocks.getInquiryArchive.mockResolvedValue(null);
    archiveServiceMocks.fetchArchiveVideoBlob.mockResolvedValue(new Blob(['video']));
    Object.defineProperty(URL, 'createObjectURL', {
      value: vi.fn(() => 'blob:archive-video'),
      configurable: true,
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      value: vi.fn(),
      configurable: true,
    });
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

  it('shows inquiry archive records and opens archive detail with video', async () => {
    archiveServiceMocks.listInquiryArchives.mockResolvedValue({
      items: [
        {
          id: 1,
          archiveCode: 'IPRA-ASK-20260511-0001',
          sessionId: 'inq-1',
          passengerDocumentNum: '440582199402155270',
          passengerName: '测试旅客',
          operatorWorkId: 'admin',
          operatorName: '管理员',
          finalJudgement: 'clear',
          roundCount: 1,
          totalDurationSeconds: 8,
          transcriptCount: 1,
          videoCount: 1,
          status: 'archived',
          archivedAt: '2026-05-11T08:00:00Z',
        },
      ],
      total: 1,
    });
    archiveServiceMocks.getInquiryArchive.mockResolvedValue({
      id: 1,
      archiveCode: 'IPRA-ASK-20260511-0001',
      sessionId: 'inq-1',
      passengerDocumentNum: '440582199402155270',
      passengerName: '测试旅客',
      operatorWorkId: 'admin',
      operatorName: '管理员',
      finalJudgement: 'clear',
      judgementReason: '该旅客回答与采样摘要基本一致，未发现明显异常风险。',
      judgementBriefing: { operatorNote: '无异常' },
      passengerSnapshot: { profile: { fullName: '测试旅客' } },
      roundCount: 1,
      totalDurationSeconds: 8,
      transcriptCount: 1,
      status: 'archived',
      archivedAt: '2026-05-11T08:00:00Z',
      createdAt: '2026-05-11T08:00:00Z',
      updatedAt: '2026-05-11T08:00:00Z',
      videos: [
        {
          id: 9,
          archiveId: 1,
          archiveRoundId: 2,
          videoKind: 'round_clip',
          sessionId: 'inq-1',
          windowId: 'window-1',
          questionId: 'q-1',
          videoUrl: 'minio://ipra-videos/humanomni-windows/round-1.mp4',
          minioBucket: 'ipra-videos',
          minioObjectKey: 'humanomni-windows/round-1.mp4',
          fileName: 'round-1.mp4',
          contentType: 'video/mp4',
          sizeBytes: 4,
          modal: 'video_audio',
          humanOmniModel: 'HumanOmni',
          humanOmniRawSummary: '对象表述平稳。',
          createdAt: '2026-05-11T08:00:00Z',
        },
      ],
      rounds: [
        {
          id: 2,
          archiveId: 1,
          roundNo: 1,
          roundClientId: 'round-1',
          title: '第 1 轮',
          focus: '目的核验',
          strategyNote: '保持中性',
          questions: [{ prompt: '请说明目的' }],
          transcripts: [{ text: '旅游' }],
          answerText: '旅游',
          roundSummary: '对象表述平稳。',
          humanOmniSummary: '对象表述平稳。',
          actionObservations: [],
          riskHints: ['暂无明显风险'],
          durationSeconds: 8,
          createdAt: '2026-05-11T08:00:00Z',
          videos: [
            {
              id: 9,
              archiveId: 1,
              archiveRoundId: 2,
              videoKind: 'round_clip',
              sessionId: 'inq-1',
              videoUrl: 'minio://ipra-videos/humanomni-windows/round-1.mp4',
              minioBucket: 'ipra-videos',
              minioObjectKey: 'humanomni-windows/round-1.mp4',
              fileName: 'round-1.mp4',
              contentType: 'video/mp4',
              sizeBytes: 4,
              modal: 'video_audio',
              humanOmniModel: 'HumanOmni',
              humanOmniRawSummary: '对象表述平稳。',
              createdAt: '2026-05-11T08:00:00Z',
            },
          ],
        },
      ],
    });

    wrapper = mount(ManagementView);
    await flushPromises();
    await nextTick();

    await findButton(wrapper, '问询归档').trigger('click');
    await nextTick();

    expect(wrapper.text()).toContain('IPRA-ASK-20260511-0001');
    await findButton(wrapper, '查看详情').trigger('click');
    await flushPromises();
    await nextTick();

    expect(archiveServiceMocks.getInquiryArchive).toHaveBeenCalledWith(1);
    expect(archiveServiceMocks.fetchArchiveVideoBlob).toHaveBeenCalledWith(9);
    expect(document.body.textContent).toContain('详细理由');
    expect(document.body.querySelector('video')?.getAttribute('src')).toBe(
      'blob:archive-video',
    );
  });
});
