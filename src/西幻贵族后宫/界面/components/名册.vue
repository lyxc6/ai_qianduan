<template>
  <div>
    <div v-if="members.length" class="roster-grid">
      <div
        v-for="entry in members"
        :key="entry.name"
        class="girl-card"
        @click="$emit('show-detail', entry.name)"
      >
        <div class="girl-top">
          <div class="avatar">{{ entry.name.charAt(0) }}</div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5">
              <span class="girl-name truncate">{{ entry.name }}</span>
              <span v-if="!entry.m.处女" class="badge badge-member">已破处</span>
            </div>
            <div class="girl-sub">{{ entry.m.种族身份 || '未登记' }} · {{ entry.m.关系 || '—' }}</div>
          </div>
          <span class="badge" :class="stageBadge(entry.m.好感度)">{{ entry.m.$好感阶段 || '陌生戒备' }}</span>
        </div>

        <div class="mt-3 space-y-1.5">
          <div>
            <div class="bar-label mb-1"><span>好感度</span><span>{{ entry.m.好感度 ?? 0 }}</span></div>
            <div class="bar"><div class="bar-fill bar-affection" :style="{ width: clamp(entry.m.好感度) + '%' }"></div></div>
          </div>
        </div>

        <p class="thought-line">{{ entry.m.当前想法 || '她还没有说出此刻的想法' }}</p>

        <div class="mt-2 flex flex-wrap items-center gap-1.5">
          <span class="badge" :class="entry.m.处女 ? 'badge-trial' : 'badge-flower'">
            {{ entry.m.处女 ? '处女' : '已破处' }}
          </span>
          <span class="badge badge-engaged">{{ entry.m.当前位置 || '未知' }}</span>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">后宫尚无佳丽，旅途中的邂逅将自动纳入……</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

interface Member {
  种族身份?: string;
  关系?: string;
  好感度?: number;
  $好感阶段?: string;
  当前想法?: string;
  当前位置?: string;
  处女?: boolean;
}

const store = useDataStore();
defineEmits<{ showDetail: [name: string] }>();

const members = computed(() =>
  Object.entries(store.data.后宫 || {})
    .map(([name, m]) => ({ name, m: m as Member }))
    .sort((a, b) => (b.m.好感度 ?? 0) - (a.m.好感度 ?? 0)),
);

function stageBadge(好感?: number): string {
  if (!好感) return 'badge-trial';
  if (好感 < 20) return 'badge-trial';
  if (好感 < 40) return 'badge-bronze';
  if (好感 < 60) return 'badge-silver';
  if (好感 < 80) return 'badge-gold';
  return 'badge-flower';
}

function clamp(value?: number): number {
  return Math.max(0, Math.min(100, value ?? 0));
}
</script>
