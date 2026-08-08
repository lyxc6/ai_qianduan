<template>
  <div class="club-root animate-fadeIn">
    <header class="header-panel">
      <div class="header-top">
        <div class="min-w-0">
          <div class="brand-kicker">云霓市 · 顶级会员制会所</div>
          <h1 class="brand-title">{{ store.data.世界.俱乐部名称 }}</h1>
        </div>
        <span class="status-badge" :class="statusClass">{{ store.data.世界.营业状态 }}</span>
      </div>

      <div class="header-meta">
        <span class="meta-item"><i class="fa-solid fa-calendar-days"></i>{{ store.data.世界.当前日期 }}</span>
        <span class="meta-item"><i class="fa-solid fa-clock"></i>{{ store.data.世界.当前时间 }}</span>
        <span class="meta-item"><i class="fa-solid fa-location-dot"></i>{{ store.data.世界.当前地点 }}</span>
      </div>

      <div class="stat-strip">
        <div class="stat-cell">
          <span class="stat-label">知名度</span>
          <span class="stat-value">{{ store.data.世界.知名度 }}</span>
          <div class="mini-track">
            <div class="mini-fill" :style="{ width: clamp(store.data.世界.知名度) + '%' }"></div>
          </div>
        </div>
        <div class="stat-cell">
          <span class="stat-label">本月流水</span>
          <span class="stat-value">{{ formatMoney(store.data.世界.本月流水) }}</span>
        </div>
        <div class="stat-cell">
          <span class="stat-label">在册女孩</span>
          <span class="stat-value">{{ store.data.世界.在册女孩数 }}</span>
        </div>
        <div class="stat-cell">
          <span class="stat-label">育宫名额</span>
          <span class="stat-value">{{ store.data.世界.育宫名额 }}</span>
        </div>
        <div class="stat-cell">
          <span class="stat-label">本月事件</span>
          <span class="stat-value">{{ store.data.世界.本月事件 }}</span>
        </div>
      </div>
    </header>

    <div v-if="!subPage" class="tab-bar">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        class="tab-button"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <i :class="tab.icon"></i>
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <main class="content-panel scroll-contain">
      <template v-if="!subPage">
        <Overview v-show="activeTab === 'overview'" @show-detail="openDetail" />
        <Player v-show="activeTab === 'player'" />
        <Roster v-show="activeTab === 'roster'" @show-detail="openDetail" />
        <Guests v-show="activeTab === 'guests'" />
        <Club v-show="activeTab === 'club'" />
      </template>
      <Transition name="drawer" mode="out-in">
        <GirlDetail v-if="subPage" :name="subPage" @back="subPage = null" />
      </Transition>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Club from './components/会所.vue';
import Guests from './components/恩客.vue';
import GirlDetail from './components/女孩详情.vue';
import Overview from './components/概览.vue';
import Player from './components/玩家.vue';
import Roster from './components/名册.vue';
import { useDataStore } from './store';

const store = useDataStore();
const activeTab = ref('overview');
const subPage = ref<string | null>(null);

const tabs = [
  { id: 'overview', label: '概览', icon: 'fa-solid fa-gem' },
  { id: 'player', label: '我的', icon: 'fa-solid fa-user' },
  { id: 'roster', label: '名册', icon: 'fa-solid fa-book-open' },
  { id: 'guests', label: '恩客', icon: 'fa-solid fa-crown' },
  { id: 'club', label: '会所', icon: 'fa-solid fa-building-columns' },
];

const statusClass = computed(() => {
  const status = store.data.世界.营业状态;
  if (status === '营业中') return 'status-open';
  if (status === '私人场') return 'status-private';
  return 'status-closed';
});

function clamp(value?: number): number {
  return Math.max(0, Math.min(100, value ?? 0));
}

function formatMoney(value?: number): string {
  const amount = Number(value || 0);
  if (amount >= 100000000) return `¥${(amount / 100000000).toFixed(1)}亿`;
  if (amount >= 10000) return `¥${(amount / 10000).toFixed(amount >= 1000000 ? 0 : 1)}万`;
  return `¥${amount.toLocaleString()}`;
}

function openDetail(name: string) {
  subPage.value = name;
}
</script>
