<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { clearAuthSession, loadAuthSession } from '../auth';

const router = useRouter();
const session = loadAuthSession();

const name = computed(() => session?.user.name || '普通员工');
const workId = computed(() => session?.user.workId || '-');

async function logout() {
  clearAuthSession();
  await router.push('/login');
}
</script>

<template>
  <main class="placeholder-page">
    <section class="placeholder-card">
      <p class="placeholder-eyebrow">EMPLOYEE PORTAL</p>
      <h1>普通员工页面</h1>
      <p class="placeholder-copy">
        当前为普通员工登录态。后续业务页面还未实现，这里先作为系统主页占位。
      </p>
      <div class="placeholder-meta">
        <span>身份：普通员工</span>
        <span>姓名：{{ name }}</span>
        <span>工号：{{ workId }}</span>
      </div>
      <button class="placeholder-action" type="button" @click="logout">
        退出登录
      </button>
    </section>
  </main>
</template>

<style scoped lang="scss">
.placeholder-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background:
    radial-gradient(circle at top left, rgba(13, 114, 138, 0.15), transparent 28%),
    #f3f8fb;
}

.placeholder-card {
  width: min(720px, 100%);
  padding: 40px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(191, 208, 216, 0.92);
  box-shadow: 0 24px 48px rgba(18, 33, 38, 0.08);
}

.placeholder-eyebrow {
  margin: 0 0 12px;
  color: #0d728a;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.22em;
}

.placeholder-card h1 {
  margin: 0;
  color: #122126;
  font-size: clamp(2rem, 2vw + 1rem, 3rem);
}

.placeholder-copy {
  margin: 18px 0 0;
  color: #52656d;
  line-height: 1.8;
}

.placeholder-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.placeholder-meta span {
  padding: 10px 14px;
  border-radius: 999px;
  background: #eef5f8;
  color: #52656d;
  font-size: 0.92rem;
  font-weight: 600;
}

.placeholder-action {
  margin-top: 28px;
  min-height: 52px;
  padding: 0 20px;
  border-radius: 16px;
  background: linear-gradient(135deg, #0d728a, #12a0c1);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
}
</style>
