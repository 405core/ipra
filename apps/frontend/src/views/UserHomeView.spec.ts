/* @vitest-environment jsdom */

import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import UserHomeView from './UserHomeView.vue';

const profileServiceMocks = vi.hoisted(() => ({
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
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(
      () => undefined,
    );
    profileServiceMocks.searchPassengerProfilesProtected.mockResolvedValue({
      items: [createProtectedResult()],
      total: 1,
      page: 1,
      pageSize: 20,
    });
  });

  afterEach(() => {
    wrapper?.unmount();
    wrapper = null;
    vi.restoreAllMocks();
  });

  it('passes the selected document number when starting assistant inquiry', async () => {
    wrapper = mountView();

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
