<template>
  <div class="action-options-container">
    <div class="action-row">
      <span class="action-label">视角</span>
      <span class="action-content">{{ actionOptions.当前视角 || '未设置' }}</span>
    </div>
    <div class="action-row" @click="handleClick(actionOptions.选项一)">
      <span class="action-text">{{ actionOptions.选项一 || '' }}</span>
    </div>
    <div class="action-row" @click="handleClick(actionOptions.选项二)">
      <span class="action-text">{{ actionOptions.选项二 || '' }}</span>
    </div>
    <div class="action-row" @click="handleClick(actionOptions.选项三)">
      <span class="action-text">{{ actionOptions.选项三 || '' }}</span>
    </div>
    <div class="action-row" @click="handleClick(actionOptions.选项四)">
      <span class="action-text">{{ actionOptions.选项四 || '' }}</span>
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
