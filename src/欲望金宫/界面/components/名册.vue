<template>
  <div>
    <div class="filter-row">
      <button
        v-for="filter in filters"
        :key="filter.id"
        type="button"
        class="filter-button"
        :class="{ active: currentFilter === filter.id }"
        @click="currentFilter = filter.id"
      >
        {{ filter.label }}
      </button>
    </div>

    <div v-if="filteredGirls.length" class="roster-grid">
      <div v-for="entry in filteredGirls" :key="entry.name" class="girl-card" @click="$emit('show-detail', entry.name)">
        <div class="girl-top">
          <div class="avatar">{{ entry.name.charAt(0) }}</div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5">
              <span class="girl-name truncate">{{ entry.name }}</span>
              <span v-if="isPregnant(entry.girl)" class="badge badge-pregnant">孕</span>
            </div>
            <div class="girl-sub">{{ entry.girl.年龄 }}岁 · {{ entry.girl.职业 || '未登记' }}</div>
          </div>
          <span class="badge" :class="levelBadge(entry.girl.等级)">{{ entry.girl.等级 }}</span>
        </div>

        <div class="mt-3 space-y-1.5">
          <div>
            <div class="bar-label mb-1"><span>好感度</span><span>{{ entry.girl.好感度 ?? 0 }}</span></div>
            <div class="bar"><div class="bar-fill bar-affection" :style="{ width: clamp(entry.girl.好感度) + '%' }"></div></div>
          </div>
          <div>
            <div class="bar-label mb-1"><span>欲望</span><span>{{ entry.girl.欲望 ?? 0 }}</span></div>
            <div class="bar"><div class="bar-fill bar-desire" :style="{ width: clamp(entry.girl.欲望) + '%' }"></div></div>
          </div>
        </div>

        <div v-if="(entry.girl.性格标签 || []).length" class="tag-row">
          <span class="tag" v-for="tag in (entry.girl.性格标签 || []).slice(0, 3)" :key="tag">{{ tag }}</span>
        </div>

        <p class="thought-line">{{ entry.girl.当前想法 || '她还没有说出此刻的想法' }}</p>

        <div class="mt-2 flex flex-wrap items-center gap-1.5">
          <span v-if="entry.girl.专属恩客" class="badge badge-engaged"><i class="fa-solid fa-heart"></i>{{ entry.girl.专属恩客 }}</span>
          <span v-if="entry.girl.心动对象" class="badge badge-member">心动 {{ entry.girl.心动对象 }}</span>
          <span class="badge" :class="pregnancyBadge(entry.girl.怀孕状态)">{{ entry.girl.怀孕状态 || '未孕' }}</span>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">没有符合当前筛选的女孩</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDataStore } from '../store';

interface GirlData {
  年龄?: number;
  职业?: string;
  等级?: string;
  好感度?: number;
  欲望?: number;
  性格标签?: string[];
  当前想法?: string;
  专属恩客?: string;
  心动对象?: string;
  怀孕状态?: string;
  恋情阶段?: string;
}

const store = useDataStore();

defineEmits<{ showDetail: [name: string] }>();

const filters = [
  { id: 'all', label: '全部' },
  { id: 'pregnant', label: '孕妃' },
  { id: 'engaged', label: '定情' },
  { id: 'trial', label: '试用生' },
];

const currentFilter = ref('all');
const LEVEL_ORDER = ['试用生', '铜铃', '银铃', '金铃', '花冠', '孕妃'];

const filteredGirls = computed(() => {
  let entries = Object.entries(store.data.女孩).map(([name, girl]) => ({ name, girl }));

  if (currentFilter.value === 'pregnant') {
    entries = entries.filter(entry => entry.girl.怀孕状态 && entry.girl.怀孕状态 !== '未孕');
  } else if (currentFilter.value === 'engaged') {
    entries = entries.filter(entry => {
      return !!entry.girl.专属恩客 || ['交往', '婚约', '迎娶'].includes(entry.girl.恋情阶段 || '');
    });
  } else if (currentFilter.value === 'trial') {
    entries = entries.filter(entry => entry.girl.等级 === '试用生');
  }

  return entries.sort((a, b) => {
    return levelRank(b.girl.等级) - levelRank(a.girl.等级) || (b.girl.好感度 ?? 0) - (a.girl.好感度 ?? 0);
  });
});

function levelRank(level?: string): number {
  const index = LEVEL_ORDER.indexOf(level || '试用生');
  return index === -1 ? 0 : index;
}

function levelBadge(level?: string): string {
  const map: Record<string, string> = {
    试用生: 'badge-trial',
    铜铃: 'badge-bronze',
    银铃: 'badge-silver',
    金铃: 'badge-gold',
    花冠: 'badge-flower',
    孕妃: 'badge-mother',
  };
  return map[level || '试用生'] || 'badge-trial';
}

function pregnancyBadge(status?: string): string {
  return status && status !== '未孕' ? 'badge-pregnant' : 'badge-trial';
}

function isPregnant(girl: GirlData): boolean {
  return !!girl.怀孕状态 && girl.怀孕状态 !== '未孕';
}

function clamp(value?: number): number {
  return Math.max(0, Math.min(100, value ?? 0));
}
</script>
