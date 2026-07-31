<template>
  <div class="flex flex-col gap-2 p-1">
    <!-- 当前主线：卷轴 -->
    <div v-if="mainQuest" class="scroll-card rounded-lg px-3 pt-3 pb-2.5">
      <div class="mb-1 flex items-center gap-1.5">
        <i class="fa-solid fa-scroll" style="color: var(--theme-gold); font-size: 0.7rem;"></i>
        <span class="scroll-title-text text-[0.7rem] tracking-widest">当前主线</span>
      </div>
      <div class="text-primary font-serif text-[0.82rem] leading-relaxed sm:text-[0.88rem]">{{ mainQuest }}</div>
    </div>

    <div v-if="!quests || Object.keys(quests).length === 0" class="text-secondary font-title flex items-center justify-center pt-4 text-[0.9rem]">
      暂无委托…
    </div>
    <div v-else class="flex flex-col gap-2">
      <div
        v-for="(info, questName) in quests"
        :key="questName"
        class="rounded-lg p-3 transition-all duration-300 hover:translate-y-[-1px]"
        style="background: var(--theme-card-bg); border: var(--theme-card-border); box-shadow: var(--theme-card-shadow);"
      >
        <div class="mb-1.5 flex items-center justify-between">
          <div class="mr-2 flex min-w-0 flex-1 items-center gap-2">
            <i :class="getTypeIcon(info.类型)" style="color: var(--theme-gold); font-size: 0.75rem;" class="flex-shrink-0"></i>
            <span class="font-title text-title truncate text-[0.9rem] tracking-wider">{{ questName }}</span>
          </div>
          <span
            v-if="info.类型"
            class="font-title flex-shrink-0 rounded px-2 py-0.5 text-[0.6rem]"
            :style="getTypeStyle(info.类型)"
          >{{ info.类型 }}</span>
        </div>
        <div v-if="info.说明" class="text-primary mb-1.5 font-serif text-[0.74rem] leading-relaxed sm:text-[0.8rem]">{{ info.说明 }}</div>
        <div class="flex items-center justify-between gap-2">
          <span
            class="font-title rounded px-1.5 py-0.5 text-[0.65rem]"
            :style="getProgressStyle(info.进度)"
          >
            <i :class="getProgressIcon(info.进度)" class="mr-1"></i>{{ info.进度 || '未开始' }}
          </span>
          <div v-if="info.奖励" class="flex items-center gap-1">
            <i class="fa-solid fa-gem" style="color: var(--theme-gold); font-size: 0.55rem;"></i>
            <span class="text-primary font-serif text-[0.65rem]">{{ info.奖励 }}</span>
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

function getTypeIcon(type?: string): string {
  if (type === '主线') return 'fa-solid fa-swords';
  if (type === '支线') return 'fa-solid fa-scroll';
  if (type === '日常') return 'fa-solid fa-hammer';
  return 'fa-solid fa-circle-question';
}

function getProgressIcon(progress?: string): string {
  if (!progress || progress === '未开始') return 'fa-solid fa-circle-notch';
  if (progress === '进行中') return 'fa-solid fa-hourglass-half';
  if (progress === '已完成') return 'fa-solid fa-check';
  return 'fa-solid fa-circle-question';
}

function getTypeStyle(type: string): Record<string, string> {
  if (type === '主线') return { background: 'color-mix(in srgb, var(--theme-badge-bad) 14%, transparent)', color: 'var(--theme-badge-bad)' };
  if (type === '支线') return { background: 'color-mix(in srgb, #4a7a9c 14%, transparent)', color: '#4a7a9c' };
  if (type === '日常') return { background: 'color-mix(in srgb, var(--theme-badge-good) 14%, transparent)', color: 'var(--theme-badge-good)' };
  return { background: 'color-mix(in srgb, #888 10%, transparent)', color: '#888' };
}

function getProgressStyle(progress: string): Record<string, string> {
  if (!progress || progress === '未开始') return { background: 'color-mix(in srgb, #888 10%, transparent)', color: '#888' };
  if (progress === '进行中') return { background: 'color-mix(in srgb, var(--theme-badge-neutral) 14%, transparent)', color: 'var(--theme-badge-neutral)' };
  if (progress === '已完成') return { background: 'color-mix(in srgb, var(--theme-badge-good) 14%, transparent)', color: 'var(--theme-badge-good)' };
  return { background: 'color-mix(in srgb, #888 10%, transparent)', color: '#888' };
}
</script>
