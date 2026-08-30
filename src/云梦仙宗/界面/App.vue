<template>
  <div class="sect-root animate-fadeIn">
    <header class="header-panel">
      <div class="header-top">
        <div class="min-w-0">
          <div class="brand-kicker">青州云梦山 · 仙门</div>
          <h1 class="brand-title">{{ store.data.世界.宗门名称 }}</h1>
        </div>
        <span class="status-badge" :class="levelClass">{{ store.data.世界.宗门等级 }}</span>
      </div>

      <div class="header-meta">
        <span class="meta-item"><i class="fa-solid fa-calendar-days"></i>{{ store.data.世界.当前日期 }}</span>
        <span class="meta-item"><i class="fa-solid fa-clock"></i>{{ store.data.世界.当前时间 }}</span>
        <span class="meta-item"><i class="fa-solid fa-location-dot"></i>{{ store.data.世界.当前地点 }}</span>
        <span class="meta-item"><i class="fa-solid fa-users"></i>{{ store.data.世界.弟子人数 }} 弟子</span>
      </div>

      <div class="stat-strip">
        <div class="stat-cell">
          <span class="stat-label">灵石</span>
          <span class="stat-value">{{ formatStone(store.data.世界.灵石) }}</span>
        </div>
        <div class="stat-cell">
          <span class="stat-label">声望</span>
          <span class="stat-value">{{ store.data.世界.声望 }}</span>
          <div class="mini-track">
            <div class="mini-fill" :style="{ width: clamp(store.data.世界.声望) + '%' }"></div>
          </div>
        </div>
        <div class="stat-cell">
          <span class="stat-label">灵田</span>
          <span class="stat-value">{{ store.data.世界.灵田数量 }} 亩 · {{ store.data.世界.灵田等级 }}级</span>
        </div>
        <div class="stat-cell">
          <span class="stat-label">本月事件</span>
          <span class="stat-value">{{ store.data.世界.本月事件 || '无' }}</span>
        </div>
        <div class="stat-cell">
          <span class="stat-label">掌门境界</span>
          <span class="stat-value">{{ store.data.玩家.修为境界 }} {{ store.data.玩家.修为进度 }}%</span>
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
        <Biz v-show="activeTab === 'biz'" />
        <Roster v-show="activeTab === 'roster'" @show-detail="openDetail" />
        <Player v-show="activeTab === 'player'" />
      </template>
      <Transition name="drawer" mode="out-in">
        <GirlDetail v-if="subPage" :name="subPage" @back="subPage = null" />
      </Transition>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Biz from './components/经营.vue';
import GirlDetail from './components/女修详情.vue';
import Overview from './components/概览.vue';
import Player from './components/玩家.vue';
import Roster from './components/名册.vue';
import { useDataStore } from './store';

const store = useDataStore();
const activeTab = ref('overview');
const subPage = ref<string | null>(null);

const tabs = [
  { id: 'overview', label: '概览', icon: 'fa-solid fa-mountain-sun' },
  { id: 'biz', label: '经营', icon: 'fa-solid fa-seedling' },
  { id: 'roster', label: '名册', icon: 'fa-solid fa-book-open' },
  { id: 'player', label: '我的', icon: 'fa-solid fa-user' },
];

const levelClass = computed(() => {
  const level = store.data.世界.宗门等级;
  if (level === '仙门巨擘') return 'status-private';
  if (level === '破落小派') return 'status-closed';
  return 'status-open';
});

function clamp(value?: number): number {
  return Math.max(0, Math.min(100, value ?? 0));
}

function formatStone(value?: number): string {
  const amount = Number(value || 0);
  if (amount >= 10000) return `${(amount / 10000).toFixed(1)}万`;
  return amount.toLocaleString();
}

function openDetail(name: string) {
  subPage.value = name;
}
</script>
