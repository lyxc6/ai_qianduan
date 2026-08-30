<template>
  <div class="club-root animate-fadeIn">
    <header class="header-panel">
      <div class="header-top">
        <div class="min-w-0">
          <div class="brand-kicker">圣罗兰帝国 · 白蔷薇家族</div>
          <h1 class="brand-title">{{ (store.data.主角 && store.data.主角.家族) || '白蔷薇家族' }} · 后宫</h1>
        </div>
        <span class="status-badge status-open">{{ haremCount }} 位佳丽</span>
      </div>

      <div class="header-meta">
        <span class="meta-item"><i class="fa-solid fa-calendar-days"></i>{{ store.data.世界.当前时间 || '—' }}</span>
        <span class="meta-item"><i class="fa-solid fa-location-dot"></i>{{ store.data.世界.当前地点 || '—' }}</span>
        <span class="meta-item"><i class="fa-solid fa-flag"></i>{{ store.data.世界.当前国家 || '—' }}</span>
      </div>

      <div class="stat-strip">
        <div class="stat-cell">
          <span class="stat-label">金币</span>
          <span class="stat-value">{{ formatMoney(store.data.世界.金币) }}</span>
        </div>
        <div class="stat-cell">
          <span class="stat-label">声望</span>
          <span class="stat-value">{{ store.data.世界.声望 ?? 0 }}</span>
          <div class="mini-track">
            <div class="mini-fill" :style="{ width: clamp(store.data.世界.声望) + '%' }"></div>
          </div>
        </div>
        <div class="stat-cell">
          <span class="stat-label">后宫人数</span>
          <span class="stat-value">{{ haremCount }}</span>
        </div>
        <div class="stat-cell">
          <span class="stat-label">家族资源</span>
          <span class="stat-value">{{ resourceCount }}</span>
        </div>
        <div class="stat-cell">
          <span class="stat-label">事件记录</span>
          <span class="stat-value">{{ eventCount }}</span>
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
        <Resources v-show="activeTab === 'resources'" />
        <Events v-show="activeTab === 'events'" />
      </template>
      <Transition name="drawer" mode="out-in">
        <MemberDetail v-if="subPage" :name="subPage" @back="subPage = null" />
      </Transition>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Events from './components/事件.vue';
import MemberDetail from './components/成员详情.vue';
import Overview from './components/概览.vue';
import Player from './components/主角.vue';
import Resources from './components/资源.vue';
import Roster from './components/名册.vue';
import { useDataStore } from './store';

const store = useDataStore();
const activeTab = ref('overview');
const subPage = ref<string | null>(null);

const tabs = [
  { id: 'overview', label: '概览', icon: 'fa-solid fa-gem' },
  { id: 'player', label: '主角', icon: 'fa-solid fa-user' },
  { id: 'roster', label: '后宫', icon: 'fa-solid fa-book-open' },
  { id: 'resources', label: '资源', icon: 'fa-solid fa-gem' },
  { id: 'events', label: '事件', icon: 'fa-solid fa-scroll' },
];

const haremCount = computed(() => Object.keys(store.data.后宫 || {}).length);
const resourceCount = computed(() => Object.keys(store.data.世界.家族资源 || {}).length);
const eventCount = computed(() => (store.data.事件 || []).length);

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
