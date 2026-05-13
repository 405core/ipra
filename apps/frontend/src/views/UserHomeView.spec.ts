/* @vitest-environment jsdom */

import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import UserHomeView from './UserHomeView.vue';

const profileServiceMocks = vi.hoisted(() => ({
  getProfileRiskCategory: vi.fn(),
  recognizeIDCard: vi.fn(),
  searchPassengerProfilesProtected: vi.fn(),
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

function findBodyButton(label: string) {
  const button = Array.from(document.body.querySelectorAll('button')).find(
    (item) => item.textContent?.includes(label),
  );

  expect(button, `body button "${label}" should exist`).toBeTruthy();
  return button as HTMLButtonElement;
}

function createProtectedResult() {
  return {
    id: '10',
    asset: {
      id: 'asset-10',
      url: '/api/sensitive-assets/asset-10',
      context: 'home:data',
    },
    actions: ['open-ask'],
  };
}

const SensitiveAssetImageStub = {
  props: ['src', 'alt'],
  template: '<div class="sensitive-image-stub"></div>',
};

function mountView() {
  return mount(UserHomeView, {
    global: {
      stubs: {
        SensitiveAssetImage: SensitiveAssetImageStub,
      },
    },
  });
}

describe('UserHomeView assistant inquiry entry', () => {
  let wrapper: VueWrapper | null = null;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(
      () => undefined,
    );
    profileServiceMocks.searchPassengerProfilesProtected.mockResolvedValue({
      items: [createProtectedResult()],
      total: 1,
      page: 1,
      pageSize: 20,
    });
    profileServiceMocks.getProfileRiskCategory.mockResolvedValue({
      profileId: '10',
      riskCategory: 'cross_border_fraud',
    });
  });

  afterEach(() => {
    wrapper?.unmount();
    wrapper = null;
    vi.restoreAllMocks();
  });

  it('passes the selected profile id when starting assistant inquiry', async () => {
    wrapper = mountView();

    await wrapper.find('#passenger-query').setValue('440582199402155270');
    await wrapper.find('form.surface-card--search').trigger('submit');
    await flushPromises();
    await nextTick();

    await findButton(wrapper, '发起辅助问询').trigger('click');
    await flushPromises();

    expect(profileServiceMocks.getProfileRiskCategory).toHaveBeenCalledWith(
      '10',
    );
    expect(routerMocks.push).toHaveBeenCalledWith({
      name: 'home-ask',
      query: {
        profileId: '10',
        riskCategory: 'cross_border_fraud',
        riskCategorySource: 'watchlist',
      },
    });
  });

  it('asks the officer to choose a risk category when the database field is empty', async () => {
    profileServiceMocks.getProfileRiskCategory.mockResolvedValue({
      profileId: '10',
      riskCategory: '',
    });
    wrapper = mountView();

    await wrapper.find('#passenger-query').setValue('440582199402155270');
    await wrapper.find('form.surface-card--search').trigger('submit');
    await flushPromises();
    await nextTick();

    await findButton(wrapper, '发起辅助问询').trigger('click');
    await flushPromises();
    await nextTick();

    expect(document.body.textContent).toContain('选择辅助问询类型');

    findBodyButton('非法务工').click();
    await nextTick();

    expect(routerMocks.push).toHaveBeenCalledWith({
      name: 'home-ask',
      query: {
        profileId: '10',
        riskCategory: 'illegal_work',
        riskCategorySource: 'officer',
      },
    });
  });

  it('does not auto trigger OCR after camera start and only recognizes on confirm', async () => {
    vi.useFakeTimers();
    try {
      const getUserMedia = vi.fn().mockResolvedValue({
        getTracks: () => [{ stop: vi.fn() }],
      } as unknown as MediaStream);

      Object.defineProperty(window, 'isSecureContext', {
        configurable: true,
        value: true,
      });
      Object.defineProperty(navigator, 'mediaDevices', {
        configurable: true,
        value: {
          getUserMedia,
        },
      });

      profileServiceMocks.recognizeIDCard.mockResolvedValue({
        code: 200,
        msg: 'ok',
        data: {
          result: 1,
        },
      });

      wrapper = mountView();

      const video = wrapper.find('video').element as HTMLVideoElement;
      Object.defineProperty(video, 'videoWidth', {
        configurable: true,
        value: 1280,
      });
      Object.defineProperty(video, 'videoHeight', {
        configurable: true,
        value: 720,
      });

      const canvas = wrapper.find('canvas').element as HTMLCanvasElement;
      vi.spyOn(canvas, 'getContext').mockReturnValue({
        drawImage: vi.fn(),
      } as unknown as CanvasRenderingContext2D);
      vi.spyOn(canvas, 'toDataURL').mockReturnValue(
        'data:image/jpeg;base64,test-frame',
      );

      await findButton(wrapper, '开启').trigger('click');
      await Promise.resolve();
      await nextTick();

      await vi.advanceTimersByTimeAsync(5000);

      expect(getUserMedia).toHaveBeenCalledTimes(1);
      expect(profileServiceMocks.recognizeIDCard).not.toHaveBeenCalled();

      await findButton(wrapper, '确定').trigger('click');
      await Promise.resolve();
      await nextTick();

      expect(profileServiceMocks.recognizeIDCard).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });
});
