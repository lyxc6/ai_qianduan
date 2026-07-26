<template>
  <div class="rounded-lg p-3 font-mono text-sm whitespace-pre-wrap break-all overflow-y-auto" style="background: var(--warm-bg-medium); max-height: 300px;">
    <div class="rounded-lg p-3" style="background: var(--warm-bg-light); border-left: 3px solid var(--user-color-primary);">
      <div class="font-title text-[0.85rem] text-title font-bold mb-2">原始变量数据</div>
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
