<template>
  <div class="overview-grid">
    <section class="card focus-card">
      <div class="card-title"><i class="fa-solid fa-earth-europe"></i> 大陆局势</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">当前时间</span>
          <span class="info-value">{{ world.当前时间 || '—' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">当前国家</span>
          <span class="info-value">{{ world.当前国家 || '—' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">当前地点</span>
          <span class="info-value">{{ world.当前地点 || '—' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">声望</span>
          <span class="info-value">{{ world.声望 ?? 0 }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">金币</span>
          <span class="info-value" style="color: var(--gold-strong);">{{ formatMoney(world.金币) }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">已游历地域</span>
          <span class="info-value">{{ visitedCount }} 处</span>
        </div>
      </div>
    </section>

    <section class="card">
      <div class="card-title"><i class="fa-solid fa-bullseye"></i> 行动选项</div>
      <div v-if="actions.length" class="mini-roster">
        <div v-for="(opt, i) in actions" :key="i" class="stat-row">
          <span><b class="text-gold">{{ i + 1 }}.</b> {{ opt }}</span>
        </div>
      </div>
      <div v-else class="empty-state">暂无行动选项</div>
    </section>

    <section class="card">
      <div class="card-title"><i class="fa-solid fa-book-open"></i> 后宫一览</div>
      <div v-if="topMembers.length" class="mini-roster">
        <div
          v-for="entry in topMembers"
          :key="entry.name"
          class="mini-girl"
          @click="$emit('show-detail', entry.name)"
        >
          <div class="avatar">{{ entry.name.charAt(0) }}</div>
          <div class="min-w-0 flex-1">
            <div class="mini-name">{{ entry.name }}</div>
            <div class="mini-sub">{{ entry.m.种族身份 || '—' }} · 好感 {{ entry.m.好感度 ?? 0 }}</div>
          </div>
          <span class="badge" :class="stageBadge(entry.m.好感度)">{{ entry.m.$好感阶段 || '—' }}</span>
        </div>
      </div>
      <div v-else class="empty-state">后宫尚无佳丽</div>
    </section>

    <section class="card focus-card">
      <div class="card-title"><i class="fa-solid fa-scroll"></i> 最近事件</div>
      <div v-if="recentEvents.length" class="mini-roster">
        <div v-for="(e, i) in recentEvents" :key="i" class="event-item">{{ e }}</div>
      </div>
      <div v-else class="empty-state">暂无事件记录</div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

interface Member {
  种族身份?: string;
  好感度?: number;
  $好感阶段?: string;
}

const store = useDataStore();
defineEmits<{ showDetail: [name: string] }>();

const world = computed(() => store.data.世界 || {});
const visitedCount = computed(() => Object.keys(world.value.已游历地域 || {}).length);

const actions = computed(() => {
  const a = store.data.行动选项 || {};
  return [a.选项一, a.选项二, a.选项三, a.选项四].filter((x): x is string => !!x);
});

const members = computed(() =>
  Object.entries(store.data.后宫 || {}).map(([name, m]) => ({ name, m: m as Member })),
);
const topMembers = computed(() => members.value.slice(0, 3));

const recentEvents = computed(() => {
  const list = store.data.事件 || [];
  return list.slice(-5).reverse();
});

function stageBadge(好感?: number): string {
  if (!好感) return 'badge-trial';
  if (好感 < 20) return 'badge-trial';
  if (好感 < 40) return 'badge-bronze';
  if (好感 < 60) return 'badge-silver';
  if (好感 < 80) return 'badge-gold';
  return 'badge-flower';
}

function formatMoney(value?: number): string {
  const amount = Number(value || 0);
  if (amount >= 100000000) return `¥${(amount / 100000000).toFixed(1)}亿`;
  if (amount >= 10000) return `¥${(amount / 10000).toFixed(amount >= 1000000 ? 0 : 1)}万`;
  return `¥${amount.toLocaleString()}`;
}
</script>

<style scoped>
.event-item {
  padding: 0.3rem 0.4rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.035);
  color: var(--text-secondary);
  font-size: 0.68rem;
  line-height: 1.4;
}
.text-gold {
  color: var(--gold-strong);
  margin-right: 0.2rem;
}
</style>
