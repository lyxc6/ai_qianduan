<template>
  <div class="overview-grid">
    <section class="card focus-card">
      <div class="card-title"><i class="fa-solid fa-flag"></i> 掌门手记</div>
      <div class="stat-rows">
        <div class="stat-row"><span>当前目标</span><b>{{ store.data.玩家.当前目标 || '—' }}</b></div>
        <div class="stat-row"><span>掌门想法</span><b>{{ store.data.玩家.当前想法 || '—' }}</b></div>
      </div>
      <div class="divider"></div>
      <div class="stat-rows">
        <div class="stat-row"><span>宗门灵石</span><b class="money">{{ formatStone(store.data.世界.灵石) }}</b></div>
        <div class="stat-row"><span>本月事件</span><b>{{ store.data.世界.本月事件 || '无' }}</b></div>
      </div>
    </section>

    <section class="card">
      <div class="card-title"><i class="fa-solid fa-book-open"></i> 门内女修</div>
      <div v-if="girls.length" class="mini-roster">
        <div v-for="entry in girls" :key="entry.name" class="mini-girl" @click="$emit('show-detail', entry.name)">
          <div class="avatar">{{ entry.name.charAt(0) }}</div>
          <div class="min-w-0 flex-1">
            <div class="mini-name">{{ entry.name }}</div>
            <div class="mini-sub">{{ entry.girl.身份 }} · {{ entry.girl.修为境界 }}</div>
          </div>
          <span class="badge" :class="affectionBadge(entry.girl.好感度)">{{ entry.girl.恋情阶段 }}</span>
        </div>
      </div>
      <div v-else class="empty-state">门内还没有女修</div>
    </section>

    <section class="card">
      <div class="card-title"><i class="fa-solid fa-chart-simple"></i> 宗门速报</div>
      <div class="stat-rows">
        <div class="stat-row"><span>宗门等级</span><b>{{ store.data.世界.宗门等级 }}</b></div>
        <div class="stat-row"><span>声望</span><b>{{ store.data.世界.声望 }}/100</b></div>
        <div class="stat-row"><span>弟子人数</span><b>{{ store.data.世界.弟子人数 }} 人</b></div>
        <div class="stat-row"><span>灵田</span><b>{{ store.data.世界.灵田数量 }} 亩 · {{ store.data.世界.灵田等级 }}级</b></div>
      </div>
      <div class="divider"></div>
      <div class="bar-block">
        <div class="bar-label"><span>宗门声望</span><span>{{ store.data.世界.声望 }}/100</span></div>
        <div class="bar">
          <div class="bar-fill bar-affection" :style="{ width: clamp(store.data.世界.声望) + '%' }"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

interface GirlData {
  身份?: string;
  修为境界?: string;
  好感度?: number;
  恋情阶段?: string;
}

const store = useDataStore();

defineEmits<{ showDetail: [name: string] }>();

const girls = computed(() => {
  return Object.entries(store.data.女修).map(([name, girl]) => ({ name, girl }));
});

function clamp(value?: number): number {
  return Math.max(0, Math.min(100, value ?? 0));
}

function formatStone(value?: number): string {
  const amount = Number(value || 0);
  if (amount >= 10000) return `${(amount / 10000).toFixed(1)}万`;
  return amount.toLocaleString();
}

function affectionBadge(value?: number): string {
  const score = Number(value || 0);
  if (score >= 70) return 'badge-event';
  if (score >= 40) return 'badge-affection';
  return 'badge-realm';
}
</script>
