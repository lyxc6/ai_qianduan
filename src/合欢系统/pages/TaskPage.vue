<template>
  <div>
    <div class="hh-page-header">
      <BackButton />
      <div class="hh-page-title">任务栏APP</div>
    </div>
    <div class="hh-content">
      <div v-if="tasks.length" v-for="t in tasks" :key="t.名称" class="hh-card">
        <div class="hh-card-title">{{ t.名称 || '未知任务' }}</div>
        <div class="hh-row"><span class="hh-label">类型</span><span class="hh-value">{{ t.类型 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">目标</span><span class="hh-value">{{ t.目标 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">进度</span><span class="hh-value">{{ t.进度 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">时限</span><span class="hh-value">{{ t.时限 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">奖励</span><span class="hh-value">{{ t.奖励 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">失败</span><span class="hh-value">{{ t.失败后果 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">状态</span><span class="hh-value">{{ t.状态 || '—' }}</span></div>
      </div>
      <div v-else class="hh-empty">暂无任务</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import BackButton from '../components/BackButton.vue';

interface TaskData {
  名称?: string;
  类型?: string;
  目标?: string;
  进度?: string;
  时限?: string;
  奖励?: string;
  失败后果?: string;
  状态?: string;
}

interface StatData {
  系统?: {
    当前任务?: TaskData[];
  };
}

const statData = inject<{ value: StatData }>('statData');

const tasks = computed(() => {
  const arr = statData?.value?.系统?.当前任务;
  return Array.isArray(arr) ? arr : [];
});
</script>
