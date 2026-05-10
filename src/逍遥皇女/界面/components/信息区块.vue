<template>
  <div class="info-section">
    <div class="section-title">{{ title }}</div>
    <div class="info-group">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
}

withDefaults(defineProps<Props>(), {
  title: '',
});
</script>

<style scoped>
.info-section {
  margin-bottom: 0.5rem;
}

.info-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-weight: bold;
  color: var(--text-title);
  font-size: 0.7rem;
  margin-bottom: 0.35rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid var(--border-color);
}

.info-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
</style>
