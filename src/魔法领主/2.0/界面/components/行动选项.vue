<template>
  <div class="grid grid-cols-2 gap-1.5 rounded-lg p-1" style="background: var(--theme-bg-panel); border: var(--theme-content-panel-border);">
    <div
      v-for="(option, index) in options"
      :key="index"
      class="rune-btn flex min-h-[2.6rem] items-center gap-2 rounded-lg px-2.5 py-2"
      :class="{ confirming: confirmingIndex === index }"
      style="background: var(--theme-button-bg); border: var(--theme-button-border); box-shadow: var(--theme-button-shadow);"
      @click="handleClick(index, option)"
    >
      <span class="rune-num flex-shrink-0 text-[1rem] leading-none font-bold sm:text-[1.1rem]">{{ runes[index] }}</span>
      <span class="text-primary line-clamp-2 font-serif text-[0.78rem] leading-relaxed break-all sm:text-[0.82rem]">{{ option }}</span>
    </div>
    <div v-if="options.length === 0" class="text-secondary font-title col-span-2 flex items-center justify-center py-3 text-[0.85rem]">
      符文静默…等待命运指引
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const runes = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ'];

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

const confirmingIndex = ref<number | null>(null);

function handleClick(index: number, text?: string) {
  if (!text || !text.trim() || confirmingIndex.value !== null) return;

  confirmingIndex.value = index;
  setTimeout(() => {
    confirmingIndex.value = null;
    emit('send', text);
  }, 450);
}
</script>
