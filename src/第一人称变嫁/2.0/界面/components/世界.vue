<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col gap-3">
      <div class="rounded-lg p-3" style="background: var(--warm-bg-light); border-left: 3px solid var(--user-color-primary);">
        <div class="font-title text-[0.85rem] text-title font-bold mb-2">时间信息</div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">日期</div>
            <div class="text-[0.75rem] text-primary">{{ world.年 || 2016 }}年{{ world.月 || 9 }}月{{ world.日 || 1 }}日</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">星期</div>
            <div class="text-[0.75rem] text-primary">{{ world.星期 || '周四' }}</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">时段</div>
            <div class="text-[0.75rem] text-primary">{{ world.时段 || '早自习' }}</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">天气</div>
            <div class="text-[0.75rem] text-primary">{{ world.天气 || '晴' }}</div>
          </div>
        </div>
      </div>

      <div class="rounded-lg p-3" style="background: var(--warm-bg-light); border-left: 3px solid var(--user-color-primary);">
        <div class="font-title text-[0.85rem] text-title font-bold mb-2">主线任务</div>
        <div class="flex flex-col gap-2" v-if="hasMainTasks">
          <div class="rounded-lg p-2" style="background: var(--warm-bg-medium);" v-for="(task, key) in world.主线任务" :key="key">
            <div class="text-[0.75rem] font-bold text-title mb-1">{{ task.标题 || key }}</div>
            <div class="text-[0.65rem] text-secondary mt-1">状态：{{ task.状态 || '未开始' }}</div>
            <div class="text-[0.7rem] text-primary" v-if="task.描述">{{ task.描述 }}</div>
          </div>
        </div>
        <div class="text-[0.75rem] text-primary" v-else>暂无主线任务</div>
      </div>

      <div class="rounded-lg p-3" style="background: var(--warm-bg-light); border-left: 3px solid var(--user-color-primary);">
        <div class="font-title text-[0.85rem] text-title font-bold mb-2">支线任务</div>
        <div class="flex flex-col gap-2" v-if="hasSideTasks">
          <div class="rounded-lg p-2" style="background: var(--warm-bg-medium);" v-for="(task, key) in world.支线任务" :key="key">
            <div class="text-[0.75rem] font-bold text-title mb-1">{{ task.标题 || key }}</div>
            <div class="text-[0.65rem] text-secondary mt-1">状态：{{ task.状态 || '未开始' }}</div>
            <div class="text-[0.7rem] text-primary" v-if="task.描述">{{ task.描述 }}</div>
          </div>
        </div>
        <div class="text-[0.75rem] text-primary" v-else>暂无支线任务</div>
      </div>

      <div class="rounded-lg p-3" style="background: var(--warm-bg-light); border-left: 3px solid var(--user-color-primary);">
        <div class="font-title text-[0.85rem] text-title font-bold mb-2">特殊日期</div>
        <div class="flex flex-col gap-2" v-if="hasSpecialDates">
          <div class="rounded-lg p-2" style="background: var(--warm-bg-medium);" v-for="(date, key) in world.特殊日期" :key="key">
            <div class="text-[0.75rem] font-bold text-title mb-1">{{ date.名称 || key }}</div>
            <div class="text-[0.65rem] text-secondary mt-1">日期：{{ date.日期 || '未知' }} | 类型：{{ date.类型 || '未知' }} | 状态：{{ date.状态 || '未开始' }}</div>
          </div>
        </div>
        <div class="text-[0.75rem] text-primary" v-else>暂无特殊日期</div>
      </div>

      <div class="rounded-lg p-3" style="background: var(--warm-bg-light); border-left: 3px solid var(--user-color-primary);">
        <div class="font-title text-[0.85rem] text-title font-bold mb-2">计数器</div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">特殊日期</div>
            <div class="text-[0.75rem] text-primary">{{ world.计数器?.特殊日期 || 0 }}</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">主线任务</div>
            <div class="text-[0.75rem] text-primary">{{ world.计数器?.主线任务 || 0 }}</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">支线任务</div>
            <div class="text-[0.75rem] text-primary">{{ world.计数器?.支线任务 || 0 }}</div>
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