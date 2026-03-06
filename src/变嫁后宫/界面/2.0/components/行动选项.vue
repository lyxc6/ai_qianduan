<template>
  <div class="action-options-container">
    <div class="action-option-container" id="action-option-view">
      <span class="action-option-text">{{ actionOptions.当前视角 || '' }}</span>
    </div>
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
      当前视角?: string;
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
}

.action-option-container {
  background: linear-gradient(135deg, var(--warm-gradient-start) 0%, var(--warm-gradient-end) 100%);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.625rem 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow:
    0 2px 6px var(--warm-shadow),
    inset 0 1px 0 var(--warm-inner-light);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 2.8rem;
  height: auto;
  font-family: var(--font-serif);
  font-size: 0.85rem;
  color: var(--text-primary);
  text-shadow: 0 1px 2px var(--warm-inner-light);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, var(--user-color-primary), var(--user-color-secondary));
    opacity: 0.8;
  }

  &:hover {
    background: linear-gradient(135deg, rgba(255, 210, 160, 0.9) 0%, rgba(255, 235, 195, 0.95) 100%);
    border-color: var(--user-color-primary);
    transform: translateX(2px);
    box-shadow:
      0 4px 12px var(--warm-shadow),
      inset 0 1px 0 var(--warm-inner-light);
  }

  &:active {
    transform: translateX(1px);
  }
}

.action-option-text {
  word-break: break-all;
  line-height: 1.4;
}
</style>
