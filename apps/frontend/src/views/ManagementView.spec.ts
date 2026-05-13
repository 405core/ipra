/* @vitest-environment jsdom */

import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import ManagementView from './ManagementView.vue';

const adminServiceMocks = vi.hoisted(() => ({
  createAdminUser: vi.fn(),
  getAdminInquirySettings: vi.fn(),
  listAdminAuditLogsProtected: vi.fn(),
  listAdminProfilesProtected: vi.fn(),
  listAdminUsersProtected: vi.fn(),
  listAdminWatchlistProtected: vi.fn(),
  updateAdminInquirySettings: vi.fn(),
  updateAdminUser: vi.fn(),
  updateAdminUserStatus: vi.fn(),
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
  logoutAuthSession: vi.fn(),
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

function createProtectedListItem(id: string) {
  return {
    id,
    asset: {
      id: `asset-${id}`,
      url: `/api/sensitive-assets/${id}`,
      context: 'admin',
    },
    fields: [
      {
        key: 'fullName',
        asset: {
          id: `field-${id}-fullName`,
          url: `/api/sensitive-assets/${id}-fullName`,
          context: `admin-${id}-fullName`,
        },
      },
      {
        key: 'documentNum',
        asset: {
          id: `field-${id}-documentNum`,
          url: `/api/sensitive-assets/${id}-documentNum`,
          context: `admin-${id}-documentNum`,
        },
      },
    ],
    chips: [
      {
        key: 'documentType',
        asset: {
          id: `chip-${id}-documentType`,
          url: `/api/sensitive-assets/${id}-documentType`,
          context: 'inline',
        },
      },
      {
        key: 'gender',
        asset: {
          id: `chip-${id}-gender`,
          url: `/api/sensitive-assets/${id}-gender`,
          context: 'inline',
        },
      },
      {
        key: 'role',
        asset: {
          id: `chip-${id}-role`,
          url: `/api/sensitive-assets/${id}-role`,
          context: 'inline',
        },
      },
      {
        key: 'status',
        asset: {
          id: `chip-${id}-status`,
          url: `/api/sensitive-assets/${id}-status`,
          context: 'inline',
        },
      },
    ],
    facts: [
      {
        key: 'nationality',
        label: '国籍',
        asset: {
          id: `fact-${id}-nationality`,
          url: `/api/sensitive-assets/${id}-fact-nationality`,
          context: 'inline',
        },
      },
    ],
    meta: [],
    notes: [],
    flags: {},
  };
}

describe('ManagementView settings tab', () => {
  let wrapper: VueWrapper | null = null;

  beforeEach(() => {
    vi.clearAllMocks();
    adminServiceMocks.listAdminProfilesProtected.mockResolvedValue({
      items: [createProtectedListItem('profile-1')],
      total: 1,
      page: 1,
      pageSize: 500,
      filters: [
        {
          key: 'documentType',
          label: '证件类型',
          options: [{ value: 'PASSPORT', label: '护照' }],
        },
        {
          key: 'nationality',
          label: '国籍',
          options: [{ value: '中国', label: '中国' }],
        },
        {
          key: 'gender',
          label: '性别',
          options: [{ value: 'male', label: '男' }],
        },
      ],
    });
    adminServiceMocks.listAdminWatchlistProtected.mockResolvedValue({
      items: [createProtectedListItem('watchlist-1')],
      total: 1,
      page: 1,
      pageSize: 500,
      filters: [],
    });
    adminServiceMocks.listAdminUsersProtected.mockResolvedValue({
      items: [createProtectedListItem('user-1')],
      total: 1,
      page: 1,
      pageSize: 500,
      filters: [
        {
          key: 'role',
          label: '角色',
          options: [{ value: 'admin', label: '管理员' }],
        },
        {
          key: 'status',
          label: '状态',
          options: [{ value: 'active', label: '启用' }],
        },
      ],
    });
    adminServiceMocks.listAdminAuditLogsProtected.mockResolvedValue({
      items: [createProtectedListItem('audit-1')],
      total: 1,
      page: 1,
      pageSize: 500,
      filters: [
        {
          key: 'result',
          label: '结果',
          options: [{ value: 'success', label: '成功' }],
        },
      ],
    });
    archiveServiceMocks.listInquiryArchives.mockResolvedValue({
      items: [],
      total: 0,
      filters: [],
    });
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

  it('keeps profiles and watchlist as import-managed read-only views', async () => {
    wrapper = mount(ManagementView);
    await flushPromises();
    await nextTick();

    expect(wrapper.text()).not.toContain('新增基础画像');
    expect(wrapper.text()).not.toContain('新增高风险名单');
    expect(wrapper.text()).not.toContain('继续编辑');
    expect(wrapper.text()).not.toContain('编辑');
    expect(wrapper.text()).not.toContain('删除');

    await findButton(wrapper, '高风险名单').trigger('click');
    await nextTick();

    expect(wrapper.text()).not.toContain('新增高风险名单');
    expect(wrapper.text()).not.toContain('编辑');
    expect(wrapper.text()).not.toContain('删除');
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
      filters: [
        {
          key: 'judgement',
          label: '判定',
          options: [{ value: 'clear', label: '无异常' }],
        },
      ],
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
    await flushPromises();
    await nextTick();

    expect(wrapper.text()).toContain('第 1 / 1 页，显示 1-1 条，共 1 条');
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

  it('passes profile filters to the backend query', async () => {
    wrapper = mount(ManagementView);
    await flushPromises();
    await nextTick();

    expect(adminServiceMocks.listAdminProfilesProtected).toHaveBeenLastCalledWith({
      query: '',
      documentType: '',
      nationality: '',
      gender: '',
    });

    await findButton(wrapper, '证件类型：全部证件类型').trigger('click');
    await nextTick();
    await findButton(wrapper, '护照').trigger('click');
    await flushPromises();

    expect(adminServiceMocks.listAdminProfilesProtected).toHaveBeenLastCalledWith({
      query: '',
      documentType: 'PASSPORT',
      nationality: '',
      gender: '',
    });
  });

  it('shows nationality filter options from backend filters', async () => {
    adminServiceMocks.listAdminProfilesProtected.mockResolvedValue({
      items: [createProtectedListItem('profile-1')],
      total: 1,
      page: 1,
      pageSize: 500,
      filters: [
        {
          key: 'nationality',
          label: '国籍',
          options: [{ value: '中国', label: '中国' }],
        },
      ],
    });

    wrapper = mount(ManagementView);
    await flushPromises();
    await nextTick();

    await findButton(wrapper, '国籍：全部国籍').trigger('click');
    await nextTick();

    expect(wrapper.text()).toContain('中国');
    expect(wrapper.text()).not.toContain('美国');
  });

  it('passes user filters to the backend query', async () => {
    wrapper = mount(ManagementView);
    await flushPromises();
    await nextTick();

    await findButton(wrapper, '管理用户').trigger('click');
    await flushPromises();
    await nextTick();

    expect(adminServiceMocks.listAdminUsersProtected).toHaveBeenLastCalledWith({
      query: '',
      role: '',
      status: '',
    });

    await findButton(wrapper, '角色：全部角色').trigger('click');
    await nextTick();
    await findButton(wrapper, '管理员').trigger('click');
    await flushPromises();

    expect(adminServiceMocks.listAdminUsersProtected).toHaveBeenLastCalledWith({
      query: '',
      role: 'admin',
      status: '',
    });
  });

  it('shows both admin and user records in management users list', async () => {
    adminServiceMocks.listAdminUsersProtected.mockResolvedValue({
      items: [createProtectedListItem('user-admin'), createProtectedListItem('user-staff')],
      total: 2,
      page: 1,
      pageSize: 500,
      filters: [
        {
          key: 'role',
          label: '角色',
          options: [
            { value: 'admin', label: '管理员' },
            { value: 'user', label: '员工' },
          ],
        },
        {
          key: 'status',
          label: '状态',
          options: [{ value: 'active', label: '启用' }],
        },
      ],
    });

    wrapper = mount(ManagementView);
    await flushPromises();
    await nextTick();

    await findButton(wrapper, '管理用户').trigger('click');
    await flushPromises();
    await nextTick();

    expect(wrapper.text()).toContain('第 1 / 1 页，显示 1-2 条，共 2 条');
    expect(adminServiceMocks.listAdminUsersProtected).toHaveBeenCalledWith({
      query: '',
      role: '',
      status: '',
    });
  });

  it('refreshes users list when re-entering the users tab', async () => {
    adminServiceMocks.listAdminUsersProtected
      .mockResolvedValueOnce({
        items: [createProtectedListItem('user-admin')],
        total: 1,
        page: 1,
        pageSize: 500,
        filters: [],
      })
      .mockResolvedValueOnce({
        items: [createProtectedListItem('user-admin'), createProtectedListItem('user-staff')],
        total: 2,
        page: 1,
        pageSize: 500,
        filters: [],
      });

    wrapper = mount(ManagementView);
    await flushPromises();
    await nextTick();

    await findButton(wrapper, '管理用户').trigger('click');
    await flushPromises();
    await nextTick();
    expect(wrapper.text()).toContain('共 1 条');

    await findButton(wrapper, '基础画像').trigger('click');
    await flushPromises();
    await nextTick();

    await findButton(wrapper, '管理用户').trigger('click');
    await flushPromises();
    await nextTick();

    expect(wrapper.text()).toContain('共 2 条');
    expect(adminServiceMocks.listAdminUsersProtected).toHaveBeenCalledTimes(2);
  });
});
