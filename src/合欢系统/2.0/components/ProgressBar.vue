<template>
  <div class="progress-bar">
    <div class="progress-fill" :class="color" :style="{ width: pct + '%' }"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  value: number;
  max?: number;
  color?: string;
}>(), {
  max: 100,
});

const pct = computed(() => Math.min(100, Math.max(0, (props.value / props.max) * 100)));
</script>
