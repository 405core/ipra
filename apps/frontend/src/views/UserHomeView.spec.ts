/* @vitest-environment jsdom */

import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import UserHomeView from './UserHomeView.vue';

const profileServiceMocks = vi.hoisted(() => ({
  recognizeIDCard: vi.fn(),
  searchPassengerProfiles: vi.fn(),
}));

vi.mock('../app/profile-service', () => profileServiceMocks);

vi.mock('../app/touch-input', () => ({
  openTouchInput: vi.fn(),
}));

const routerMocks = vi.hoisted(() => ({
  push: vi.fn(),
}));

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: routerMocks.push,
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

function createPassengerProfile() {
  return {
    id: 10,
    fullName: '黎泽宝',
    documentNum: '440582199402155270',
    isHighRisk: false,
    updatedAt: '2026-05-11T08:00:00Z',
    profileData: {
      basicInfo: {
        documentType: 'PASSPORT',
        gender: 'male',
        nationality: '中国',
        birthDate: '1990-04-12',
      },
      tripInfo: {
        pnr: 'CZ3101',
        flightNo: 'CZ3101',
        destination: 'BKK',
      },
      occupation: {
        occupation: '外贸业务员',
      },
      riskInfo: {
        riskTags: ['资金核验'],
      },
    },
  };
}

describe('UserHomeView assistant inquiry entry', () => {
  let wrapper: VueWrapper | null = null;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(
      () => undefined,
    );
    profileServiceMocks.searchPassengerProfiles.mockResolvedValue([
      createPassengerProfile(),
    ]);
  });

  afterEach(() => {
    wrapper?.unmount();
    wrapper = null;
    vi.restoreAllMocks();
  });

  it('passes the selected document number when starting assistant inquiry', async () => {
    wrapper = mount(UserHomeView);

    await wrapper.find('#passenger-query').setValue('440582199402155270');
    await wrapper.find('form.surface-card--search').trigger('submit');
    await flushPromises();
    await nextTick();

    await findButton(wrapper, '发起辅助问询').trigger('click');

    expect(routerMocks.push).toHaveBeenCalledWith({
      name: 'home-ask',
      query: {
        documentNum: '440582199402155270',
      },
    });
  });
});
