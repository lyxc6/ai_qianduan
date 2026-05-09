<template>
  <div class="recent-events-container">
    <div v-if="!events || events.length === 0" class="empty-state">暂无最近事件</div>
    <div v-else class="events-list">
      <div v-for="(eventStr, index) in events" :key="index" class="event-item">
        <div class="event-header">
          <span class="event-time">{{ parseEvent(eventStr).时间 }}</span>
          <span class="event-location">{{ parseEvent(eventStr).地点 }}</span>
        </div>
        <div class="event-content">{{ parseEvent(eventStr).内容 }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  statData: {
    最近事件?: string[];
  };
}

const props = defineProps<Props>();
const events = computed(() => props.statData?.最近事件 || []);

function parseEvent(eventStr: string) {
  const parts = eventStr.split('|');
  return {
    时间: parts[0] || '未知时间',
    地点: parts[1] || '未知地点',
    内容: parts[2] || '',
  };
}
</script>

<style lang="scss">
.recent-events-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  overflow-y: auto;
  padding: 0.25rem;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-secondary);
  font-family: var(--font-title);
  font-size: 0.9rem;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.event-item {
  background: linear-gradient(135deg, rgba(30, 18, 60, 0.6) 0%, rgba(20, 12, 40, 0.7) 100%);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.625rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.375rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid rgba(138, 100, 200, 0.2);
}

.event-time {
  font-family: var(--font-title);
  font-size: 0.75rem;
  color: var(--user-color-primary);
}

.event-location {
  font-size: 0.7rem;
  color: var(--text-secondary);
}

.event-content {
  font-family: var(--font-serif);
  font-size: 0.8rem;
  color: var(--text-primary);
  line-height: 1.5;
}
</style>
