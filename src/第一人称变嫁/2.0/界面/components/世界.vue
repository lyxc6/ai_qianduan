<template>
  <div class="character-detail-body">
    <div class="character-info-section">
      <div class="info-section">
        <div class="section-title">时间信息</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">日期</div>
            <div class="info-value">{{ world.年 || 2016 }}年{{ world.月 || 9 }}月{{ world.日 || 1 }}日</div>
          </div>
          <div class="info-item">
            <div class="info-label">星期</div>
            <div class="info-value">{{ world.星期 || '周四' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">时段</div>
            <div class="info-value">{{ world.时段 || '早自习' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">天气</div>
            <div class="info-value">{{ world.天气 || '晴' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">主线任务</div>
        <div class="task-list" v-if="hasMainTasks">
          <div class="task-item" v-for="(task, key) in world.主线任务" :key="key">
            <div class="task-title">{{ task.标题 || key }}</div>
            <div class="task-status">状态：{{ task.状态 || '未开始' }}</div>
            <div class="task-description" v-if="task.描述">{{ task.描述 }}</div>
          </div>
        </div>
        <div class="info-value" v-else>暂无主线任务</div>
      </div>

      <div class="info-section">
        <div class="section-title">支线任务</div>
        <div class="task-list" v-if="hasSideTasks">
          <div class="task-item" v-for="(task, key) in world.支线任务" :key="key">
            <div class="task-title">{{ task.标题 || key }}</div>
            <div class="task-status">状态：{{ task.状态 || '未开始' }}</div>
            <div class="task-description" v-if="task.描述">{{ task.描述 }}</div>
          </div>
        </div>
        <div class="info-value" v-else>暂无支线任务</div>
      </div>

      <div class="info-section">
        <div class="section-title">特殊日期</div>
        <div class="task-list" v-if="hasSpecialDates">
          <div class="task-item" v-for="(date, key) in world.特殊日期" :key="key">
            <div class="task-title">{{ date.名称 || key }}</div>
            <div class="task-status">日期：{{ date.日期 || '未知' }} | 类型：{{ date.类型 || '未知' }} | 状态：{{ date.状态 || '未开始' }}</div>
          </div>
        </div>
        <div class="info-value" v-else>暂无特殊日期</div>
      </div>

      <div class="info-section">
        <div class="section-title">计数器</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">特殊日期</div>
            <div class="info-value">{{ world.计数器?.特殊日期 || 0 }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">身体记忆</div>
            <div class="info-value">{{ world.计数器?.身体记忆 || 0 }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">主线任务</div>
            <div class="info-value">{{ world.计数器?.主线任务 || 0 }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">支线任务</div>
            <div class="info-value">{{ world.计数器?.支线任务 || 0 }}</div>
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
        身体记忆?: number;
        主线任务?: number;
        支线任务?: number;
      };
    };
  };
}

const props = defineProps<Props>();
const world = computed(() => props.statData?.世界 || {});
const hasMainTasks = computed(() => {
  const tasks = world.value.主线任务;
  return tasks && typeof tasks === 'object' && Object.keys(tasks).length > 0;
});
const hasSideTasks = computed(() => {
  const tasks = world.value.支线任务;
  return tasks && typeof tasks === 'object' && Object.keys(tasks).length > 0;
});
const hasSpecialDates = computed(() => {
  const dates = world.value.特殊日期;
  return dates && typeof dates === 'object' && Object.keys(dates).length > 0;
});
</script>