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

<style lang="scss">
.events-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.25rem;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
}

.event-entry {
  background: linear-gradient(135deg, var(--warm-gradient-start) 0%, var(--warm-gradient-end) 100%);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.625rem 0.875rem;
  animation: slideIn 0.3s ease-out;
  box-shadow:
    0 2px 6px var(--warm-shadow),
    inset 0 1px 0 var(--warm-inner-light);

  &:hover {
    border-color: var(--user-color-primary);
    background: linear-gradient(135deg, rgba(255, 210, 160, 0.7) 0%, rgba(255, 235, 195, 0.85) 100%);
  }
}

.event-time {
  font-family: var(--font-title);
  font-size: 0.75rem;
  color: var(--user-color-primary);
  margin-bottom: 0.2rem;
  letter-spacing: 1px;
}

.event-location {
  font-family: var(--font-serif);
  font-size: 0.7rem;
  color: var(--text-secondary);
  margin-bottom: 0.35rem;
  font-style: italic;
}

.event-content {
  font-family: var(--font-serif);
  font-size: 0.8rem;
  color: var(--text-primary);
  line-height: 1.5;
  text-shadow: 0 1px 2px var(--warm-inner-light);
}

.no-events {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-secondary);
  font-family: var(--font-title);
  font-size: 0.9rem;
}
</style>
