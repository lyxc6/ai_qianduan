<template>
  <div class="events-container">
    <div v-if="!events || events.length === 0" class="no-events">
      <span>暂无事件记录</span>
    </div>
    <div v-else class="events-list">
      <div v-for="(eventStr, index) in reversedEvents" :key="index" class="event-entry">
        <div class="event-time">{{ parseEvent(eventStr).时间 || '无' }}</div>
        <div class="event-location">{{ parseEvent(eventStr).地点 || '无' }}</div>
        <div class="event-content">{{ parseEvent(eventStr).内容 || '无' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  statData: {
    重要事件?: string[];
  };
}

const props = defineProps<Props>();

const events = computed(() => props.statData?.重要事件 || []);
const reversedEvents = computed(() => [...events.value].reverse());

function parseEvent(eventStr: string): { 时间: string; 地点: string; 内容: string } {
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

.event-entry {
  background: linear-gradient(135deg, rgba(62, 42, 20, 0.6) 0%, rgba(43, 29, 14, 0.8) 100%);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.625rem 0.875rem;
  animation: slideIn 0.3s ease-out;
  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(212, 177, 106, 0.05);

  &:hover {
    border-color: var(--user-color-primary);
    background: linear-gradient(135deg, rgba(72, 49, 23, 0.7) 0%, rgba(50, 34, 16, 0.85) 100%);
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
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.no-events {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-secondary);
  font-family: var(--font-serif);
  font-size: 0.85rem;
  font-style: italic;
  animation: pulse 2s ease-in-out infinite;
}
</style>
