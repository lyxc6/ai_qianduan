<template>
  <div>
    <div class="hh-page-header">
      <BackButton />
      <div class="hh-page-title">里程碑APP</div>
    </div>
    <div class="hh-content">
      <div v-if="unlockedMilestones.length" class="hh-card">
        <div class="hh-card-title">已解锁里程碑</div>
        <div class="hh-tag-container">
          <span v-for="(m, i) in unlockedMilestones" :key="i" class="hh-tag">{{ m }}</span>
        </div>
      </div>

      <div v-if="completedTasks.length" class="hh-card">
        <div class="hh-card-title">已完成任务</div>
        <div v-for="(task, i) in completedTasks" :key="i" class="hh-row">
          <span class="hh-value">{{ task }}</span>
        </div>
      </div>

      <div v-if="!unlockedMilestones.length && !completedTasks.length" class="hh-empty">暂无里程碑和已完成任务</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import BackButton from '../components/BackButton.vue';

interface StatData {
  系统?: {
    已解锁里程碑?: string[];
    已完成任务?: string[];
  };
}

const statData = inject<{ value: StatData }>('statData');

const unlockedMilestones = computed(() => {
  const arr = statData?.value?.系统?.已解锁里程碑;
  return Array.isArray(arr) ? arr : [];
});

const completedTasks = computed(() => {
  const arr = statData?.value?.系统?.已完成任务;
  return Array.isArray(arr) ? arr : [];
});
</script>
