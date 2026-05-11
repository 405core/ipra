<template>
  <section class="audit-placeholder">
    <section class="audit-placeholder__card">
      <h2>日志审计</h2>
      <p>员工操作日志页面预留中，后续在这里接入日志查询与审计能力。</p>
    </section>
  </section>
</template>

<style scoped lang="scss">
.audit-placeholder {
  min-height: calc(100vh - 146px);
  display: grid;
  align-content: center;
}

.audit-placeholder__card {
  width: min(960px, 100%);
  margin: 0 auto;
  padding: 28px 30px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(157, 189, 202, 0.36);
  box-shadow: 0 22px 46px rgba(14, 40, 48, 0.08);
}

.audit-placeholder__card h2 {
  margin: 0;
  color: #15252b;
  font-size: clamp(1.35rem, 1.1rem + 0.6vw, 1.8rem);
}

.audit-placeholder__card p {
  margin: 12px 0 0;
  color: #5b7179;
  line-height: 1.7;
}

@media (max-width: 719px) {
  .audit-placeholder {
    min-height: auto;
    align-content: start;
  }

  .audit-placeholder__card {
    padding: 22px 20px;
    border-radius: 24px;
  }
}
</style>
