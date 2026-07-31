<template>
  <div class="flex flex-col gap-2 p-1">
    <div v-if="!hasOptions" class="empty-tip">暂无行动选项</div>
    <button
      v-for="(opt, i) in options"
      :key="i"
      type="button"
      class="action-row"
      @click="sendAction(opt)"
    >
      <span class="action-badge">{{ letters[i] }}</span>
      <span class="action-text">{{ opt }}</span>
    </button>
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

const letters = ['A', 'B', 'C', 'D'];

const actionOptions = computed(() => props.statData?.行动选项 || {});
const options = computed(() => {
  const opts = actionOptions.value;
  return [opts.选项一, opts.选项二, opts.选项三, opts.选项四].filter(
    (opt): opt is string => !!opt && String(opt).trim() !== '',
  );
});
const hasOptions = computed(() => options.value.length > 0);

function sendAction(text: string) {
  if (text) {
    emit('send', text);
  }
}
</script>

<style scoped>
.action-row {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  width: 100%;
  text-align: left;
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-left: 3px solid transparent;
  border-radius: 0.6rem;
  padding: 0.6rem 0.7rem;
  cursor: pointer;
  font-family: var(--font-serif);
  font-size: 0.8rem;
  color: var(--text-primary);
  line-height: 1.5;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.action-row:hover {
  transform: translateY(-1px);
  border-left-color: var(--char-color);
  border-color: var(--char-border);
  background: var(--char-bg);
  box-shadow: 0 4px 10px var(--shadow-soft);
}

.action-row:active {
  transform: translateY(0);
}

.action-badge {
  flex-shrink: 0;
  width: 1.3rem;
  height: 1.3rem;
  margin-top: 0.1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.35rem;
  background: linear-gradient(135deg, var(--char-grad-a), var(--char-grad-b));
  color: #fff;
  font-family: var(--font-title);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  transition: transform 0.2s ease;
}

.action-row:hover .action-badge {
  transform: scale(1.08);
}

.action-text {
  flex: 1;
  word-break: break-all;
}
</style>
