<template>
  <div class="info-item">
    <div class="info-label">{{ label }}</div>
    <div class="info-value" :style="valueStyle">
      <slot>
        {{ displayValue }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  label?: string;
  value?: string | number | boolean | undefined;
  color?: string;
  isSecret?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  value: undefined,
  color: '',
  isSecret: false,
});

const displayValue = computed(() => {
  if (props.value === undefined || props.value === null) {
    return '不存在';
  }
  if (typeof props.value === 'boolean') {
    return props.value ? '是' : '否';
  }
  return props.value;
});

const valueStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.color) {
    style.color = props.color;
  }
  if (props.isSecret) {
    style.color = '#c62828';
    style.fontSize = '0.65rem';
  }
  return style;
});
</script>

<style scoped>
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.15rem 0;
  font-size: 0.65rem;
}

.info-label {
  color: var(--text-secondary);
  flex-shrink: 0;
  min-width: 60px;
}

.info-value {
  color: var(--text-primary);
  text-align: right;
  flex: 1;
  margin-left: 0.5rem;
  word-break: break-all;
}
</style>
