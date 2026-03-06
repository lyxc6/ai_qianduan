<template>
  <div class="profile-container">
    <div class="profile-tabs">
      <div class="profile-tab" :class="{ active: profileTab === 'events' }" @click="profileTab = 'events'">
        最近事件
      </div>
      <div class="profile-tab" :class="{ active: profileTab === 'classmates' }" @click="profileTab = 'classmates'">
        同学
      </div>
    </div>

    <div class="profile-content" :class="{ active: profileTab === 'events' }">
      <div v-if="!events || events.length === 0" class="no-events">
        <span>暂无事件记录</span>
      </div>
      <div v-else class="events-list">
        <div v-for="(event, index) in reversedEvents" :key="index" class="event-entry">
          <div class="event-time">{{ event.时间 || '无' }}</div>
          <div class="event-location">{{ event.地点 || '无' }}</div>
          <div class="event-content">{{ event.内容 || '无' }}</div>
        </div>
      </div>
    </div>

    <div class="profile-content" :class="{ active: profileTab === 'classmates' }">
      <div v-if="!hasClassmates" class="classmates-empty">
        <span>暂无同学</span>
      </div>
      <div v-else class="classmates-cards-grid">
        <div v-for="(char, name) in classmates" :key="name" class="classmate-card" @click="handleCardClick(name)">
          <div class="classmate-avatar">{{ String(name).charAt(0).toUpperCase() }}</div>
          <div class="classmate-name">{{ name }}</div>
          <div class="classmate-relation" :class="getRelationClass(char.关系)">
            {{ char.关系 || '同学' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  statData: {
    最近事件?: Array<{ 时间?: string; 地点?: string; 内容?: string }>;
    同学?: Record<
      string,
      {
        好感度?: number;
        关系?: string;
        性别?: string;
        [key: string]: any;
      }
    >;
  };
}

const props = defineProps<Props>();
const emit = defineEmits<{
  showDetail: [characterName: string];
}>();

const profileTab = ref('events');

const events = computed(() => props.statData?.最近事件 || []);
const reversedEvents = computed(() => [...events.value].reverse());

const classmates = computed(() => props.statData?.同学 || {});
const hasClassmates = computed(() => Object.keys(classmates.value).length > 0);

function getRelationClass(relation?: string): string {
  if (!relation) return '';
  const rel = relation.toLowerCase();
  if (rel.includes('闺蜜') || rel.includes('好朋友')) return 'close';
  if (rel.includes('暗恋') || rel.includes('喜欢')) return 'affection';
  if (rel.includes('敌') || rel.includes('仇')) return 'enemy';
  return '';
}

function handleCardClick(name: string) {
  emit('showDetail', name);
}
</script>

<style lang="scss">
.profile-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.profile-tabs {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
  padding: 0.25rem;
  background: rgba(255, 183, 178, 0.1);
  border-radius: 0.5rem;
}

.profile-tab {
  flex: 1;
  font-family: var(--font-title);
  font-size: 0.75rem;
  color: var(--text-secondary);
  padding: 0.4rem 0.5rem;
  cursor: pointer;
  border-radius: 0.35rem;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    color: var(--text-primary);
    background: rgba(255, 138, 128, 0.08);
  }

  &.active {
    color: var(--user-color-primary);
    background: var(--bg-main);
    box-shadow: 0 1px 4px rgba(255, 138, 128, 0.15);
  }
}

.profile-content {
  display: none;
  flex: 1;
  overflow-y: auto;

  &.active {
    display: block;
  }
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.event-entry {
  background: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.625rem 0.875rem;
  animation: slideIn 0.3s ease-out;

  &:hover {
    border-color: var(--user-color-primary);
  }
}

.event-time {
  font-family: var(--font-title);
  font-size: 0.75rem;
  color: var(--user-color-primary);
  margin-bottom: 0.2rem;
}

.event-location {
  font-family: var(--font-serif);
  font-size: 0.7rem;
  color: var(--text-secondary);
  margin-bottom: 0.3rem;
}

.event-content {
  font-family: var(--font-serif);
  font-size: 0.8rem;
  color: var(--text-primary);
  line-height: 1.4;
}

.classmates-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
  gap: 0.5rem;
  padding: 0.25rem;
}

.classmate-card {
  background: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    border-color: var(--accent-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 138, 128, 0.15);
  }
}

.classmate-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--user-color-primary), var(--user-color-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-title);
  font-size: 0.9rem;
  color: #fff;
  margin-bottom: 0.35rem;
  box-shadow: 0 2px 6px rgba(255, 138, 128, 0.2);
}

.classmate-name {
  font-family: var(--font-title);
  font-size: 0.75rem;
  color: var(--text-primary);
  margin-bottom: 0.2rem;
}

.classmate-relation {
  font-family: var(--font-serif);
  font-size: 0.65rem;
  padding: 0.1rem 0.3rem;
  border-radius: 0.2rem;
  background: rgba(255, 183, 178, 0.15);
  color: var(--text-secondary);
}

.classmate-relation.close {
  color: #81c784;
}

.classmate-relation.affection {
  color: #f48fb1;
}

.classmate-relation.enemy {
  color: #ef5350;
}

.no-events,
.classmates-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-secondary);
  font-family: var(--font-title);
  font-size: 0.85rem;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
