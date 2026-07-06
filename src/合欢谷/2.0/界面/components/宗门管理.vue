<template>
  <div class="sect-management">
    <!-- 弟子列表 -->
    <div class="section">
      <div class="section-title">弟子列表</div>
      <div class="disciple-grid">
        <div
          v-for="(disciple, name) in disciples"
          :key="name"
          class="disciple-card"
          @click="$emit('showDetail', name)"
        >
          <div class="disciple-name">{{ name }}</div>
          <div class="disciple-rank">{{ disciple.谷内地位 || '' }}</div>
          <div class="disciple-realm">{{ disciple.功力境界 || '' }}</div>
          <div class="disciple-favor">
            <span class="favor-label">好感</span>
            <div class="favor-bar">
              <div class="favor-fill" :style="{ width: getFavorWidth(disciple.好感度) }"></div>
            </div>
            <span class="favor-value">{{ disciple.好感度 ?? '' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 宗门概览 -->
    <div class="section">
      <div class="section-title">宗门概览</div>
      <div class="overview-grid">
        <div class="overview-item">
          <span class="overview-label">谷内人数</span>
          <span class="overview-value">{{ sect.谷内人数 ?? '' }}</span>
        </div>
        <div class="overview-item">
          <span class="overview-label">弟子数量</span>
          <span class="overview-value">{{ sect.弟子数量 ?? '' }}</span>
        </div>
        <div class="overview-item">
          <span class="overview-label">资源</span>
          <span class="overview-value">{{ sect.资源状况 || '' }}</span>
        </div>
        <div class="overview-item">
          <span class="overview-label">声望</span>
          <span class="overview-value">{{ sect.声望 || '无' }}</span>
        </div>
      </div>
    </div>

    <!-- 待办事项 -->
    <div class="section" v-if="todos.length > 0">
      <div class="section-title">待办事项</div>
      <div class="todo-list">
        <div v-for="(todo, index) in todos" :key="index" class="todo-item">
          {{ todo }}
        </div>
      </div>
    </div>

    <!-- 待接见人员 -->
    <div class="section" v-if="pendingVisitors.length > 0">
      <div class="section-title">待接见人员</div>
      <div class="visitor-list">
        <div v-for="(visitor, index) in pendingVisitors" :key="index" class="visitor-item">
          <div class="visitor-name">{{ visitor.名称 }}</div>
          <div class="visitor-info">
            <span class="visitor-source">{{ visitor.来源 }}</span>
            <span class="visitor-purpose">{{ visitor.目的 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  statData: {
    弟子?: Record<string, any>;
    宗门?: {
      谷内人数?: number;
      弟子数量?: number;
      资源状况?: string;
      声望?: string;
      待办事项?: string[];
    };
    宗门动态?: {
      待接见人员?: Array<{
        名称?: string;
        来源?: string;
        目的?: string;
      }>;
    };
  };
}

defineProps<Props>();
defineEmits<{
  showDetail: [name: string];
}>();

const disciples = computed(() => {
  const data = useStatData();
  return data?.弟子 || {};
});

const sect = computed(() => {
  const data = useStatData();
  return data?.宗门 || {};
});

const todos = computed(() => {
  const data = useStatData();
  return data?.宗门?.待办事项 || [];
});

const pendingVisitors = computed(() => {
  const data = useStatData();
  return data?.宗门动态?.待接见人员 || [];
});

function useStatData() {
  return (document as any).__statData;
}

function getFavorWidth(favor?: number) {
  if (favor === undefined) return '0%';
  return `${Math.max(0, Math.min(100, (favor + 100) / 2))}%`;
}
</script>

<style lang="scss">
.sect-management {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.section {
  background: linear-gradient(135deg, rgba(43, 29, 14, 0.6) 0%, rgba(62, 42, 20, 0.4) 100%);
  border-radius: 0.5rem;
  padding: 0.75rem;
  border-left: 3px solid var(--accent-color);
}

.section-title {
  font-family: var(--font-title);
  font-size: 0.9rem;
  color: var(--text-title);
  margin-bottom: 0.5rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid rgba(212, 177, 106, 0.2);
  letter-spacing: 1px;
}

.disciple-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.disciple-card {
  background: linear-gradient(135deg, rgba(62, 42, 20, 0.6) 0%, rgba(43, 29, 14, 0.8) 100%);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--user-color-primary);
    transform: translateY(-1px);
  }
}

.disciple-name {
  font-family: var(--font-title);
  font-size: 0.85rem;
  color: var(--text-primary);
  margin-bottom: 0.15rem;
}

.disciple-rank {
  font-size: 0.7rem;
  color: var(--accent-color);
  margin-bottom: 0.15rem;
}

.disciple-realm {
  font-size: 0.7rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.disciple-favor {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.favor-label {
  font-size: 0.65rem;
  color: var(--text-secondary);
}

.favor-bar {
  flex: 1;
  height: 4px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  overflow: hidden;
}

.favor-fill {
  height: 100%;
  background: linear-gradient(90deg, #e74c3c, #f39c12, #2ecc71);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.favor-value {
  font-size: 0.65rem;
  color: var(--text-secondary);
  min-width: 1.5rem;
  text-align: right;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.overview-item {
  display: flex;
  flex-direction: column;
}

.overview-label {
  font-size: 0.7rem;
  color: var(--text-secondary);
  margin-bottom: 0.15rem;
}

.overview-value {
  font-size: 0.8rem;
  color: var(--text-primary);
}

.todo-list, .visitor-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.todo-item, .visitor-item {
  font-size: 0.8rem;
  color: var(--text-primary);
  padding: 0.35rem 0.5rem;
  background: linear-gradient(135deg, rgba(62, 42, 20, 0.4) 0%, rgba(43, 29, 14, 0.6) 100%);
  border-radius: 0.3rem;
  border-left: 2px solid var(--user-color-primary);
}

.visitor-name {
  font-weight: 500;
  margin-bottom: 0.15rem;
}

.visitor-info {
  display: flex;
  gap: 0.5rem;
}

.visitor-source, .visitor-purpose {
  font-size: 0.7rem;
  color: var(--text-secondary);
}
</style>
