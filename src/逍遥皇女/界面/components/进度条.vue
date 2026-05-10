<template>
  <div class="progress-bar-container">
    <div class="progress-label" v-if="label">
      <span class="label-text">{{ label }}</span>
      <span class="label-value">{{ displayValue }}{{ unit }}</span>
    </div>
    <div class="progress-track">
      <div class="progress-fill" :style="{ width: normalizedPercent + '%', backgroundColor: color }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  value?: number;
  max?: number;
  label?: string;
  unit?: string;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  max: 100,
  unit: '',
  color: 'var(--user-color-primary)',
});

const normalizedPercent = computed(() => {
  if (props.max === 0) return 0;
  const percent = (props.value / props.max) * 100;
  return Math.min(100, Math.max(0, percent));
});

const displayValue = computed(() => {
  if (props.max === 100) {
    return props.value;
  }
  return props.value;
});
</script>

<style scoped>
.progress-bar-container {
  width: 100%;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
  font-size: 0.65rem;
}

.label-text {
  color: var(--text-secondary);
}

.label-value {
  color: var(--text-primary);
  font-weight: 500;
}

.progress-track {
  width: 100%;
  height: 6px;
  background: var(--warm-bg-dark);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}
</style>
