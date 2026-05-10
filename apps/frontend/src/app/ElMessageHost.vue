<script setup lang="ts">
import { elMessageState, remove } from './el-message';
</script>

<template>
  <teleport to="body">
    <div class="el-message-host" aria-live="polite" aria-atomic="true">
      <transition-group name="el-message-list">
        <section
          v-for="item in elMessageState.items"
          :key="item.id"
          class="el-message"
          :class="`is-${item.type}`"
        >
          <span class="el-message__dot" aria-hidden="true"></span>
          <span class="el-message__text">{{ item.message }}</span>
          <button type="button" class="el-message__close" @click="remove(item.id)">关闭</button>
        </section>
      </transition-group>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.el-message-host {
  position: fixed;
  top: 18px;
  left: 50%;
  z-index: 3200;
  display: grid;
  gap: 10px;
  width: min(92vw, 420px);
  transform: translateX(-50%);
  pointer-events: none;
}

.el-message {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 48px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid rgba(214, 219, 228, 0.9);
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 12px 28px rgba(18, 33, 38, 0.12);
  color: #33424a;
  pointer-events: auto;
}

.el-message__dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  flex: 0 0 auto;
}

.el-message__text {
  flex: 1 1 auto;
  line-height: 1.5;
}

.el-message__close {
  flex: 0 0 auto;
  border: 0;
  background: transparent;
  color: #69767d;
  cursor: pointer;
}

.el-message.is-success {
  border-color: rgba(109, 197, 142, 0.45);
}

.el-message.is-success .el-message__dot {
  background: #36a968;
}

.el-message.is-warning {
  border-color: rgba(234, 186, 91, 0.5);
}

.el-message.is-warning .el-message__dot {
  background: #d79014;
}

.el-message.is-error {
  border-color: rgba(224, 114, 114, 0.48);
}

.el-message.is-error .el-message__dot {
  background: #cf4343;
}

.el-message.is-info .el-message__dot {
  background: #4f8ec9;
}

.el-message-list-enter-active,
.el-message-list-leave-active {
  transition: all 0.18s ease;
}

.el-message-list-enter-from,
.el-message-list-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
