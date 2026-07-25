<template>
  <div class="flex flex-col gap-2 p-1">
    <div v-if="mainQuest" class="rounded-lg p-3" style="background: var(--theme-highlight-bg); border: var(--theme-highlight-border);">
      <div class="font-title text-[0.7rem] sm:text-[0.75rem] mb-1.5 tracking-wider" style="color: var(--theme-label-accent);">当前主线</div>
      <div class="font-serif text-sm sm:text-[0.85rem] text-primary leading-relaxed">{{ mainQuest }}</div>
    </div>

    <div v-if="!quests || Object.keys(quests).length === 0" class="flex items-center justify-center h-full text-secondary font-title text-sm sm:text-[0.9rem] pt-4">暂无任务</div>
    <div v-else class="flex flex-col gap-2">
      <div
        v-for="(info, questName) in quests"
        :key="questName"
        class="rounded-lg p-3 transition-all duration-300"
        style="background: var(--theme-card-bg); border: var(--theme-card-border); box-shadow: var(--theme-card-shadow);"
      >
        <div class="flex justify-between items-center mb-1.5">
          <div class="font-title text-sm sm:text-[0.9rem] text-title tracking-wider truncate flex-1 mr-2">{{ questName }}</div>
          <span
            v-if="info.类型"
            class="text-[0.6rem] sm:text-[0.65rem] px-2 py-0.5 rounded font-title flex-shrink-0"
            :style="getTypeStyle(info.类型)"
          >{{ info.类型 }}</span>
        </div>
        <div v-if="info.说明" class="font-serif text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed mb-1.5">{{ info.说明 }}</div>
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-1.5">
            <span class="font-title text-[0.6rem] sm:text-[0.65rem] text-secondary">进度</span>
            <span
              class="text-[0.65rem] sm:text-[0.7rem] px-1.5 py-0.5 rounded font-title"
              :style="getProgressStyle(info.进度)"
            >{{ info.进度 || '未开始' }}</span>
          </div>
          <div v-if="info.奖励" class="flex items-center gap-1">
            <span class="font-title text-[0.55rem] sm:text-[0.6rem] text-secondary">奖励</span>
            <span class="font-serif text-[0.65rem] sm:text-[0.7rem] text-primary">{{ info.奖励 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface QuestInfo {
  类型?: string;
  说明?: string;
  进度?: string;
  奖励?: string;
}

interface Props {
  statData: {
    当前主线?: string;
    任务列表?: Record<string, QuestInfo>;
  };
}

const props = defineProps<Props>();
const mainQuest = computed(() => props.statData?.当前主线 || '');
const quests = computed(() => props.statData?.任务列表 || {});

function getTypeStyle(type: string): Record<string, string> {
  if (type === '主线') return { background: 'rgba(200, 50, 50, 0.12)', color: '#c83232' };
  if (type === '支线') return { background: 'rgba(58, 100, 140, 0.12)', color: '#3a5a7c' };
  if (type === '日常') return { background: 'rgba(46, 139, 87, 0.12)', color: '#2e8b57' };
  return { background: 'rgba(120, 120, 120, 0.1)', color: '#666' };
}

function getProgressStyle(progress: string): Record<string, string> {
  if (!progress || progress === '未开始') return { background: 'rgba(120, 120, 120, 0.1)', color: '#666' };
  if (progress === '进行中') return { background: 'rgba(180, 140, 60, 0.12)', color: '#8a6d30' };
  if (progress === '已完成') return { background: 'rgba(46, 139, 87, 0.12)', color: '#2e8b57' };
  return { background: 'rgba(120, 120, 120, 0.1)', color: '#666' };
}
</script>
