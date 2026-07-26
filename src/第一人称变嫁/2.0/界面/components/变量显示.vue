<template>
  <div class="variable-display">
    <div class="info-section">
      <div class="section-title">原始变量数据</div>
      <pre>{{ formattedData }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  statData: Record<string, any>;
}

const props = defineProps<Props>();

const formattedData = computed(() => {
  try {
    return JSON.stringify(props.statData, null, 2);
  } catch (error) {
    return '无法格式化数据';
  }
});
</script>