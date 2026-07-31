<template>
  <div class="flex flex-col gap-3 pb-1">
    <section class="section-card">
      <div class="section-title mb-2">主线任务</div>
      <div v-if="hasMainTasks" class="flex flex-col gap-1.5">
        <details
          v-for="(task, key) in world.主线任务"
          :key="key"
          class="task-item"
          :open="task.状态 === '进行中'"
        >
          <summary class="task-head">
            <span class="task-title">{{ task.标题 || key }}</span>
            <span class="pill" :class="pillClass(task.状态)">{{ task.状态 || '未开始' }}</span>
          </summary>
          <div v-if="task.描述" class="task-desc">{{ task.描述 }}</div>
        </details>
      </div>
      <div v-else class="empty-tip">暂无主线任务</div>
    </section>

    <section class="section-card">
      <div class="section-title mb-2">支线任务</div>
      <div v-if="hasSideTasks" class="flex flex-col gap-1.5">
        <details
          v-for="(task, key) in world.支线任务"
          :key="key"
          class="task-item"
          :open="task.状态 === '进行中'"
        >
          <summary class="task-head">
            <span class="task-title">{{ task.标题 || key }}</span>
            <span class="pill" :class="pillClass(task.状态)">{{ task.状态 || '未开始' }}</span>
          </summary>
          <div v-if="task.描述" class="task-desc">{{ task.描述 }}</div>
        </details>
      </div>
      <div v-else class="empty-tip">暂无支线任务</div>
    </section>

    <section class="section-card">
      <div class="section-title mb-2">特殊日期</div>
      <div v-if="hasSpecialDates" class="flex flex-col gap-1.5">
        <div
          v-for="(date, key) in world.特殊日期"
          :key="key"
          class="date-item"
          :class="{ 'date-today': isToday(date.日期) }"
        >
          <div class="date-main">
            <span class="task-title">{{ date.名称 || key }}</span>
            <span v-if="isToday(date.日期)" class="today-badge">今日</span>
          </div>
          <div class="date-sub">
            <span>{{ date.日期 || '未知' }}</span>
            <span v-if="date.类型">· {{ date.类型 }}</span>
            <span class="pill" :class="pillClass(date.状态)">{{ date.状态 || '未开始' }}</span>
          </div>
        </div>
      </div>
      <div v-else class="empty-tip">暂无特殊日期</div>
    </section>

    <div class="counter-foot">
      主线 {{ world.计数器?.主线任务 || 0 }} · 支线 {{ world.计数器?.支线任务 || 0 }} · 特殊日期
      {{ world.计数器?.特殊日期 || 0 }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  statData: {
    世界?: {
      年?: number;
      月?: number;
      日?: number;
      星期?: string;
      时段?: string;
      天气?: string;
      特殊日期?: Record<string, { 名称: string; 日期: string; 类型: string; 状态: string }>;
      主线任务?: Record<string, { 标题: string; 状态: string; 描述: string }>;
      支线任务?: Record<string, { 标题: string; 状态: string; 描述: string }>;
      计数器?: {
        特殊日期?: number;
        主线任务?: number;
        支线任务?: number;
      };
    };
  };
}

const props = defineProps<Props>();
const world = computed(() => props.statData?.世界 || {});

const hasMainTasks = computed(() => hasEntries(world.value.主线任务));
const hasSideTasks = computed(() => hasEntries(world.value.支线任务));
const hasSpecialDates = computed(() => hasEntries(world.value.特殊日期));

function hasEntries(record: unknown) {
  return !!record && typeof record === 'object' && Object.keys(record as object).length > 0;
}

function pillClass(status?: string) {
  switch (status) {
    case '已完成':
    case '完成':
    case '已结束':
      return 'pill-done';
    case '进行中':
    case '进行':
      return 'pill-active';
    case '未开始':
      return 'pill-todo';
    default:
      return 'pill-other';
  }
}

function isToday(dateText?: string) {
  if (!dateText) return false;
  const m = String(dateText).match(/(\d{1,2})月(\d{1,2})日/);
  if (!m) return false;
  return Number(m[1]) === Number(world.value.月) && Number(m[2]) === Number(world.value.日);
}
</script>

<style scoped>
.task-item {
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: 0.5rem;
  padding: 0.45rem 0.6rem;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.task-item:hover {
  border-color: var(--char-border);
  background: var(--char-bg);
}

.task-item summary {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.task-item summary::-webkit-details-marker {
  display: none;
}

.task-item summary::after {
  content: '▸';
  margin-left: auto;
  font-size: 0.65rem;
  color: var(--text-faint);
  transition: transform 0.25s ease;
  flex-shrink: 0;
}

.task-item[open] summary::after {
  transform: rotate(90deg);
}

.task-title {
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--text-primary);
  word-break: break-all;
  flex: 1;
  min-width: 0;
}

.task-desc {
  margin-top: 0.4rem;
  padding-left: 0.3rem;
  border-left: 2px solid var(--hairline);
  font-size: 0.7rem;
  color: var(--text-secondary);
  line-height: 1.5;
  word-break: break-all;
}

.date-item {
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: 0.5rem;
  padding: 0.45rem 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.date-today {
  border-color: var(--char-color);
  box-shadow: inset 3px 0 0 var(--char-color);
  background: var(--char-bg);
}

.date-main {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.today-badge {
  font-size: 0.62rem;
  padding: 0.02rem 0.4rem;
  border-radius: 999px;
  color: #fff;
  background: linear-gradient(135deg, var(--char-grad-a), var(--char-grad-b));
  flex-shrink: 0;
}

.date-sub {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.68rem;
  color: var(--text-secondary);
  flex-wrap: wrap;
}

.counter-foot {
  padding-top: 0.55rem;
  border-top: 1px dashed var(--hairline);
  text-align: center;
  font-size: 0.68rem;
  color: var(--text-faint);
  letter-spacing: 0.05em;
}
</style>
