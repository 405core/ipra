/* @vitest-environment jsdom */

import { defineComponent, nextTick } from 'vue';
import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createMemoryHistory, createRouter } from 'vue-router';
import { clearAuthSession, saveAuthSession, type AuthSession } from '../auth';
import App from './App.vue';
import { formatWatermarkTimestamp } from './watermark';

describe('App', () => {
  const mountedWrappers: VueWrapper[] = [];
  const securedView = defineComponent({
    data() {
      return {
        clickCount: 0,
      };
    },
    template: `
      <section>
        <button type="button" data-testid="secured-action" @click="clickCount += 1">
          Action {{ clickCount }}
        </button>
      </section>
    `,
  });

  const loginView = defineComponent({
    template: '<section>login</section>',
  });

  const testSession: AuthSession = {
    token: 'test-token',
    user: {
      id: 7,
      username: 'inspector.demo',
      realName: '张测试',
      badgeNumber: 'A-2048',
      roleCode: 'inspector',
      status: 1,
    },
  };

  async function mountAt(path: string) {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: '/login',
          name: 'login',
          component: loginView,
          meta: {
            watermark: false,
            title: '登录',
          },
        },
        {
          path: '/management',
          name: 'management',
          component: securedView,
          meta: {
            watermark: true,
            title: '管理总台',
          },
        },
      ],
    });

    await router.push(path);
    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    await nextTick();
    mountedWrappers.push(wrapper);

    return wrapper;
  }

  beforeEach(() => {
    vi.useFakeTimers();
    clearAuthSession();
  });

  afterEach(() => {
    while (mountedWrappers.length) {
      mountedWrappers.pop()?.unmount();
    }
    vi.useRealTimers();
    clearAuthSession();
  });

  it('shows the global watermark on authenticated routes', async () => {
    const currentTime = new Date('2026-05-06T01:02:03Z');
    vi.setSystemTime(currentTime);
    saveAuthSession(testSession);

    const wrapper = await mountAt('/management');

    expect(wrapper.get('[data-testid="global-watermark"]').text()).toContain('张测试');
    expect(wrapper.get('[data-testid="global-watermark"]').text()).toContain('A-2048');
    expect(wrapper.get('[data-testid="global-watermark"]').text()).toContain(
      formatWatermarkTimestamp(currentTime.getTime())
    );
  });

  it('hides the global watermark on the login route', async () => {
    saveAuthSession(testSession);

    const wrapper = await mountAt('/login');

    expect(wrapper.find('[data-testid="global-watermark"]').exists()).toBe(false);
  });

  it('refreshes the timestamp every second', async () => {
    const initialTime = new Date('2026-05-06T01:02:03Z');
    const nextTime = new Date('2026-05-06T01:02:04Z');
    vi.setSystemTime(initialTime);
    saveAuthSession(testSession);

    const wrapper = await mountAt('/management');
    const beforeText = wrapper.get('[data-testid="global-watermark"]').text();

    vi.advanceTimersByTime(1000);
    await nextTick();

    const afterText = wrapper.get('[data-testid="global-watermark"]').text();

    expect(beforeText).toContain(formatWatermarkTimestamp(initialTime.getTime()));
    expect(afterText).toContain(formatWatermarkTimestamp(nextTime.getTime()));
    expect(afterText).not.toContain(formatWatermarkTimestamp(initialTime.getTime()));
  });

  it('keeps the overlay click-through for underlying actions', async () => {
    saveAuthSession(testSession);

    const wrapper = await mountAt('/management');

    await wrapper.get('[data-testid="secured-action"]').trigger('click');

    expect(wrapper.get('[data-testid="secured-action"]').text()).toContain('Action 1');
    expect(wrapper.get('[data-testid="global-watermark"]').attributes('style')).toContain(
      'pointer-events: none;'
    );
  });
});
