<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { clearAuthSession, loadAuthSession } from '../auth';

const router = useRouter();
const session = loadAuthSession();

const realName = computed(() => session?.user.realName || '系统管理员');
const username = computed(() => session?.user.username || 'admin');
const badgeNumber = computed(() => session?.user.badgeNumber || '-');

async function logout() {
  clearAuthSession();
  await router.push('/login');
}
</script>

<template>
  <main class="placeholder-page">
    <section class="placeholder-card">
      <p class="placeholder-eyebrow">ADMIN CONSOLE</p>
      <h1>管理员页面</h1>
      <p class="placeholder-copy">
        当前为管理员登录态。管理功能页还未实现，这里先作为管理入口占位。
      </p>
      <div class="placeholder-meta">
        <span>身份：管理员</span>
        <span>姓名：{{ realName }}</span>
        <span>账号：{{ username }}</span>
        <span>警号/工号：{{ badgeNumber }}</span>
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
    radial-gradient(circle at top left, rgba(188, 58, 43, 0.12), transparent 28%),
    #f8f3f0;
}

.placeholder-card {
  width: min(720px, 100%);
  padding: 40px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(224, 196, 190, 0.92);
  box-shadow: 0 24px 48px rgba(42, 22, 18, 0.08);
}

.placeholder-eyebrow {
  margin: 0 0 12px;
  color: #bc3a2b;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.22em;
}

.placeholder-card h1 {
  margin: 0;
  color: #221613;
  font-size: clamp(2rem, 2vw + 1rem, 3rem);
}

.placeholder-copy {
  margin: 18px 0 0;
  color: #6f5a55;
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
  background: #f8ece7;
  color: #6f5a55;
  font-size: 0.92rem;
  font-weight: 600;
}

.placeholder-action {
  margin-top: 28px;
  min-height: 52px;
  padding: 0 20px;
  border-radius: 16px;
  background: linear-gradient(135deg, #bc3a2b, #e36a4d);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
}
</style>
