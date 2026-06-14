<template>
  <div class="stat-row">
    <span class="stat-label">{{ label }}</span>
    <span class="stat-value" :class="{ highlight }">{{ displayValue }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string;
  value: string | number | undefined;
  highlight?: boolean;
}>();

const displayValue = computed(() => {
  if (props.value === undefined || props.value === null || props.value === '') return '—';
  return String(props.value);
});
</script>
