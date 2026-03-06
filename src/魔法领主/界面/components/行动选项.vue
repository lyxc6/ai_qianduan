<template>
  <div class="action-options-container">
    <div class="action-option-container" id="action-option-container-one" @click="handleClick(actionOptions.选项一)">
      <span class="action-option-text">{{ actionOptions.选项一 || '' }}</span>
    </div>
    <div class="action-option-container" id="action-option-container-two" @click="handleClick(actionOptions.选项二)">
      <span class="action-option-text">{{ actionOptions.选项二 || '' }}</span>
    </div>
    <div class="action-option-container" id="action-option-container-three" @click="handleClick(actionOptions.选项三)">
      <span class="action-option-text">{{ actionOptions.选项三 || '' }}</span>
    </div>
    <div class="action-option-container" id="action-option-container-four" @click="handleClick(actionOptions.选项四)">
      <span class="action-option-text">{{ actionOptions.选项四 || '' }}</span>
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

const actionOptions = computed(() => props.statData?.行动选项 || {});

function handleClick(text?: string) {
  if (text && text.trim()) {
    emit('send', text);
  }
}
</script>

<style lang="scss">
.action-options-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  padding: 0.25rem;
  min-height: 100%;
}

.action-option-container {
  flex: 1;
  min-height: 0;
  background: linear-gradient(135deg, rgba(30, 18, 60, 0.8) 0%, rgba(20, 12, 40, 0.9) 100%);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.625rem 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(167, 139, 250, 0.1);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  font-family: var(--font-serif);
  font-size: 0.85rem;
  color: var(--text-primary);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow-y: auto;

  &:hover {
    background: linear-gradient(135deg, rgba(40, 24, 80, 0.9) 0%, rgba(30, 18, 60, 0.95) 100%);
    border-color: var(--user-color-primary);
    transform: translateX(4px);
    box-shadow:
      0 4px 12px rgba(167, 139, 250, 0.2),
      inset 0 1px 0 rgba(167, 139, 250, 0.2);
  }

  &:active {
    transform: translateX(2px);
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 2px;

    &:hover {
      background: var(--user-color-primary);
    }
  }
}

.action-option-text {
  line-height: 1.4;
  word-break: break-all;
}
</style>
