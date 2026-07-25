<template>
  <div class="flex flex-col gap-2 p-1">
    <div
      v-for="(option, index) in options"
      :key="index"
      class="action-btn flex-1 min-h-0 rounded-lg px-3 py-3 sm:px-3.5 sm:py-2.5 cursor-pointer transition-all duration-300 flex items-start justify-start font-serif text-sm sm:text-[0.85rem] text-primary relative overflow-y-auto min-h-[44px]"
      style="background: var(--theme-button-bg); border: var(--theme-button-border); box-shadow: var(--theme-button-shadow); border-left: 3px solid transparent;"
      @click="handleClick(option)"
    >
      <span class="leading-relaxed break-all">{{ option || '' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  statData: {
    行动选项?: {
      选项一?: string;
      选项二?: string;
      选项三?: string;
      选项四?: string;
    };
  };
}

const props = defineProps<Props>();
const emit = defineEmits<{
  send: [text: string];
}>();

const options = computed(() => {
  const opts = props.statData?.行动选项 || {};
  return [opts.选项一, opts.选项二, opts.选项三, opts.选项四].filter(Boolean);
});

function handleClick(text?: string) {
  if (text && text.trim()) {
    emit('send', text);
  }
}
</script>

<style scoped>
.action-btn:hover {
  border-left-color: var(--theme-label-accent) !important;
  transform: translateX(2px);
}
</style>
