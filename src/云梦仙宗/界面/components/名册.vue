<template>
  <div>
    <div class="filter-row">
      <button
        type="button"
        class="filter-button"
        :class="{ active: filter === 'all' }"
        @click="filter = 'all'"
      >全部</button>
      <button
        type="button"
        class="filter-button"
        :class="{ active: filter === '高好感' }"
        @click="filter = '高好感'"
      >好感≥60</button>
      <button
        type="button"
        class="filter-button"
        :class="{ active: filter === '恋人以上' }"
        @click="filter = '恋人以上'"
      >恋人以上</button>
    </div>

    <div v-if="filtered.length" class="roster-grid">
      <div v-for="entry in filtered" :key="entry.name" class="girl-card" @click="$emit('show-detail', entry.name)">
        <div class="girl-top">
          <div class="avatar">{{ entry.name.charAt(0) }}</div>
          <div class="min-w-0 flex-1">
            <div class="girl-name">{{ entry.name }}</div>
            <div class="girl-sub">{{ entry.girl.身份 }} · {{ entry.girl.年龄 }}岁</div>
          </div>
        </div>
        <div class="tag-row">
          <span class="badge" :class="realmBadge(entry.girl.修为境界)">{{ entry.girl.修为境界 }}</span>
          <span v-if="entry.girl.宗门职务 && entry.girl.宗门职务 !== '无'" class="badge badge-duty">{{ entry.girl.宗门职务 }}</span>
          <span class="badge" :class="affectionBadge(entry.girl.好感度)">{{ entry.girl.恋情阶段 }}</span>
        </div>
        <div class="divider"></div>
        <div class="bar-block">
          <div class="bar-label"><span>好感度</span><span>{{ entry.girl.好感度 }}/100</span></div>
          <div class="bar">
            <div class="bar-fill bar-affection" :style="{ width: clamp(entry.girl.好感度) + '%' }"></div>
          </div>
        </div>
        <p class="thought-line">「{{ entry.girl.当前想法 || '……' }}」</p>
      </div>
    </div>
    <div v-else class="empty-state">门内还没有女修</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDataStore } from '../store';

interface GirlData {
  身份?: string;
  年龄?: number;
  修为境界?: string;
  宗门职务?: string;
  好感度?: number;
  恋情阶段?: string;
  当前想法?: string;
}

const store = useDataStore();

defineEmits<{ showDetail: [name: string] }>();

const filter = ref<'all' | '高好感' | '恋人以上'>('all');

const filtered = computed(() => {
  const list = Object.entries(store.data.女修).map(([name, girl]) => ({ name, girl }));
  if (filter.value === '高好感') return list.filter(({ girl }) => Number(girl.好感度 || 0) >= 60);
  if (filter.value === '恋人以上') {
    return list.filter(({ girl }) => ['恋人', '道侣'].includes(girl.恋情阶段 || ''));
  }
  return list;
});

function clamp(value?: number): number {
  return Math.max(0, Math.min(100, value ?? 0));
}

function realmBadge(realm?: string): string {
  if (['金丹', '元婴', '化神'].includes(realm || '')) return 'badge-realm-high';
  return 'badge-realm';
}

function affectionBadge(value?: number): string {
  const score = Number(value || 0);
  if (score >= 70) return 'badge-event';
  if (score >= 40) return 'badge-affection';
  return 'badge-stage';
}
</script>
