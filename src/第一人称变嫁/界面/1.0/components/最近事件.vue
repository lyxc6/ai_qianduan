<template>
  <div class="events-container">
    <div v-if="!events || events.length === 0" class="no-events">
      <span>暂无事件记录</span>
    </div>
    <div v-else class="events-list">
      <div v-for="(event, index) in events" :key="index" class="event-entry">
        <div class="event-time">{{ parseEvent(event).时间 || '无' }}</div>
        <div class="event-location">{{ parseEvent(event).地点 || '无' }}</div>
        <div class="event-content">{{ parseEvent(event).内容 || '无' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  statData: {
    事件?: string[];
  };
}

const props = defineProps<Props>();

const events = computed(() => {
  const arr = props.statData?.事件 || [];
  return [...arr].reverse();
});

function parseEvent(eventStr: string): { 时间: string; 地点: string; 内容: string } {
  if (!eventStr) return { 时间: '', 地点: '', 内容: '' };
  const parts = eventStr.split('|');
  return {
    时间: parts[0] || '',
    地点: parts[1] || '',
    内容: parts.slice(2).join('|') || '',
  };
}
</script>
