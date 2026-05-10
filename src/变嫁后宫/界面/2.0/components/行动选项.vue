<template>
  <div class="action-options-container">
    <div class="current-view-row">
      <span class="view-label">视角</span>
      <span class="view-separator">:</span>
      <span class="view-value">{{ actionOptions.当前视角 || '未设置' }}</span>
    </div>
    <div class="options-grid">
      <div class="action-option-btn" @click="handleClick(actionOptions.选项一)">
        <span class="option-text">{{ actionOptions.选项一 || '' }}</span>
      </div>
      <div class="action-option-btn" @click="handleClick(actionOptions.选项二)">
        <span class="option-text">{{ actionOptions.选项二 || '' }}</span>
      </div>
      <div class="action-option-btn" @click="handleClick(actionOptions.选项三)">
        <span class="option-text">{{ actionOptions.选项三 || '' }}</span>
      </div>
      <div class="action-option-btn" @click="handleClick(actionOptions.选项四)">
        <span class="option-text">{{ actionOptions.选项四 || '' }}</span>
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
