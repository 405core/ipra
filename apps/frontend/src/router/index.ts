import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import ManagementView from '../views/ManagementView.vue';
import UserAskView from '../views/UserAskView.vue';
import UserHomeView from '../views/UserHomeView.vue';
import UserLayoutView from '../views/UserLayoutView.vue';
import {
  loadAuthSession,
  resolveRoleHome,
  type UserRole,
  validateAuthSession,
} from '../auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        guestOnly: true,
      },
    },
    {
      path: '/home',
      component: UserLayoutView,
      redirect: { name: 'home-data' },
      meta: {
        requiresAuth: true,
        roles: ['employee'] satisfies UserRole[],
      },
      children: [
        {
          path: 'data',
          name: 'home-data',
          component: UserHomeView,
          meta: {
            title: '智能旅客风险评估系统',
          },
        },
        {
          path: 'ask',
          name: 'home-ask',
          component: UserAskView,
          meta: {
            title: '辅助问询工作台',
          },
        },
      ],
    },
    {
      path: '/system',
      redirect: { name: 'home-data' },
    },
    {
      path: '/system/home',
      redirect: { name: 'home-data' },
    },
    {
      path: '/system/ask',
      redirect: { name: 'home-ask' },
    },
    {
      path: '/system-home',
      redirect: { name: 'home-data' },
    },
    {
      path: '/system-ask',
      redirect: { name: 'home-ask' },
    },
    {
      path: '/management',
      name: 'management',
      component: ManagementView,
      meta: {
        requiresAuth: true,
        roles: ['admin'] satisfies UserRole[],
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => {
        const session = loadAuthSession();
        return session ? resolveRoleHome(session.user.role) : '/login';
      },
    },
  ],
});

router.beforeEach(async (to) => {
  const guestOnly = to.matched.some((record) => Boolean(record.meta.guestOnly));
  const requiresAuth = to.matched.some((record) => Boolean(record.meta.requiresAuth));

  const session =
    guestOnly || requiresAuth
      ? await validateAuthSession()
      : loadAuthSession();

  if (guestOnly && session) {
    return resolveRoleHome(session.user.role);
  }

  if (requiresAuth && !session) {
    return '/login';
  }

  const allowedRoles = to.meta.roles as UserRole[] | undefined;
  if (allowedRoles && session && !allowedRoles.includes(session.user.role)) {
    return resolveRoleHome(session.user.role);
  }

  return true;
});

export default router;
