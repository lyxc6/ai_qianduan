<template>
  <div class="flex flex-col gap-2 p-1">
    <div
      v-for="(option, index) in options"
      :key="index"
      class="flex-1 min-h-0 rounded-lg px-3.5 py-2.5 cursor-pointer transition-all duration-300 flex items-start justify-start font-serif text-[0.85rem] text-primary relative overflow-y-auto"
      style="background: linear-gradient(135deg, rgba(30, 18, 60, 0.8) 0%, rgba(20, 12, 40, 0.9) 100%); border: 1px solid var(--border-color); box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(167, 139, 250, 0.1);"
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
