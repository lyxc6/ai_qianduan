<template>
  <div class="flex flex-col gap-2 p-1">
    <div class="rounded-lg p-3" style="background: var(--warm-bg-medium); border-left: 3px solid var(--user-color-primary);">
      <div class="font-title text-[0.85rem] text-title font-bold mb-2">当前视角</div>
      <div class="text-[0.75rem] text-primary">{{ actionOptions.当前视角 || '苏晚棠' }}</div>
    </div>

    <div class="rounded-lg p-3" style="background: var(--warm-bg-medium); border-left: 3px solid var(--user-color-primary);">
      <div class="font-title text-[0.85rem] text-title font-bold mb-2">行动选项</div>
      <div class="flex flex-col gap-2">
        <div
          v-if="actionOptions.选项一"
          class="action-btn rounded-lg px-3 py-3 cursor-pointer transition-all duration-300 flex items-start justify-start font-serif text-sm text-primary relative"
          style="background: linear-gradient(135deg, var(--warm-gradient-start) 0%, var(--warm-gradient-end) 100%); border: 1px solid var(--border-color); border-left: 3px solid transparent;"
          @click="sendAction(actionOptions.选项一)"
        >
          <span class="leading-relaxed break-all">{{ actionOptions.选项一 }}</span>
        </div>
        <div
          v-if="actionOptions.选项二"
          class="action-btn rounded-lg px-3 py-3 cursor-pointer transition-all duration-300 flex items-start justify-start font-serif text-sm text-primary relative"
          style="background: linear-gradient(135deg, var(--warm-gradient-start) 0%, var(--warm-gradient-end) 100%); border: 1px solid var(--border-color); border-left: 3px solid transparent;"
          @click="sendAction(actionOptions.选项二)"
        >
          <span class="leading-relaxed break-all">{{ actionOptions.选项二 }}</span>
        </div>
        <div
          v-if="actionOptions.选项三"
          class="action-btn rounded-lg px-3 py-3 cursor-pointer transition-all duration-300 flex items-start justify-start font-serif text-sm text-primary relative"
          style="background: linear-gradient(135deg, var(--warm-gradient-start) 0%, var(--warm-gradient-end) 100%); border: 1px solid var(--border-color); border-left: 3px solid transparent;"
          @click="sendAction(actionOptions.选项三)"
        >
          <span class="leading-relaxed break-all">{{ actionOptions.选项三 }}</span>
        </div>
        <div
          v-if="actionOptions.选项四"
          class="action-btn rounded-lg px-3 py-3 cursor-pointer transition-all duration-300 flex items-start justify-start font-serif text-sm text-primary relative"
          style="background: linear-gradient(135deg, var(--warm-gradient-start) 0%, var(--warm-gradient-end) 100%); border: 1px solid var(--border-color); border-left: 3px solid transparent;"
          @click="sendAction(actionOptions.选项四)"
        >
          <span class="leading-relaxed break-all">{{ actionOptions.选项四 }}</span>
        </div>
        <div class="text-[0.75rem] text-secondary" v-if="!hasOptions">暂无行动选项</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  statData: {
    行动选项?: {
      当前视角?: string;
      选项一?: string;
      选项二?: string;
      选项三?: string;
      选项四?: string;
    };
  };
  currentMessage?: any;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  send: [text: string];
}>();

const actionOptions = computed(() => props.statData?.行动选项 || {});
const hasOptions = computed(() => {
  const options = actionOptions.value;
  return options.选项一 || options.选项二 || options.选项三 || options.选项四;
});

function sendAction(text: string) {
  if (text) {
    emit('send', text);
  }
}
</script>

<style scoped>
.action-btn:hover {
  border-left-color: var(--user-color-primary) !important;
  transform: translateX(2px);
  background: linear-gradient(135deg, var(--warm-gradient-end) 0%, var(--warm-bg-light) 100%) !important;
  box-shadow: 0 4px 12px var(--warm-shadow);
}
</style>