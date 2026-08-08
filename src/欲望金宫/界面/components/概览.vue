<template>
  <div class="overview-grid">
    <section class="card focus-card">
      <div class="card-title"><i class="fa-solid fa-crown"></i> 贵宾焦点</div>
      <div v-if="focusGuest" class="focus-guest">
        <div class="focus-head">
          <span class="guest-name">{{ focusGuest.name }}</span>
          <span class="badge" :class="memberBadge(focusGuest.guest.会员等级)">{{ focusGuest.guest.会员等级 }}</span>
        </div>
        <p class="focus-demand">{{ focusGuest.guest.当前需求 || '今晚正在酒廊静候安排' }}</p>
        <div v-if="focusGuest.guest.专属服务员?.length" class="tag-row">
          <span class="tag" v-for="server in focusGuest.guest.专属服务员" :key="server">{{ server }} · 专属服务员</span>
        </div>
      </div>
      <div v-else class="empty-state">今晚还没有贵宾到场</div>
    </section>

    <section class="card">
      <div class="card-title"><i class="fa-solid fa-bell-concierge"></i> 今晚名册</div>
      <div v-if="topGirls.length" class="mini-roster">
        <div v-for="entry in topGirls" :key="entry.name" class="mini-girl" @click="$emit('show-detail', entry.name)">
          <div class="avatar">{{ entry.name.charAt(0) }}</div>
          <div class="min-w-0 flex-1">
            <div class="mini-name">{{ entry.name }}</div>
            <div class="mini-sub">{{ entry.girl.等级 }} · {{ entry.girl.年龄 }}岁 · {{ entry.girl.恋情阶段 }}</div>
          </div>
          <span v-if="isPregnant(entry.girl)" class="badge badge-pregnant">孕</span>
        </div>
      </div>
      <div v-else class="empty-state">名册尚未填写</div>
    </section>

    <section class="card">
      <div class="card-title"><i class="fa-solid fa-chart-simple"></i> 经营快报</div>
      <div class="level-row">
        <div v-for="level in LEVEL_ORDER" :key="level" class="level-cell">
          <span class="level-name">{{ level }}</span>
          <span class="level-count">{{ levelCounts[level] ?? 0 }}</span>
        </div>
      </div>
      <div class="divider"></div>
      <div class="stat-rows">
        <div class="stat-row"><span>怀孕在册</span><b>{{ pregnantCount }} 人</b></div>
        <div class="stat-row"><span>定情姐妹</span><b>{{ engagedCount }} 人</b></div>
        <div class="stat-row"><span>本月事件</span><b>{{ store.data.世界.本月事件 || '无' }}</b></div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

interface GirlData {
  等级?: string;
  年龄?: number;
  恋情阶段?: string;
  怀孕状态?: string;
  专属恩客?: string;
}

interface GuestData {
  会员等级?: string;
  当前需求?: string;
  专属服务员?: string[];
}

const store = useDataStore();

defineEmits<{ showDetail: [name: string] }>();

const LEVEL_ORDER = ['试用生', '铜铃', '银铃', '金铃', '花冠', '孕妃'] as const;

const girls = computed(() => {
  return Object.entries(store.data.女孩).map(([name, girl]) => ({ name, girl }));
});

const guests = computed(() => {
  return Object.entries(store.data.恩客).map(([name, guest]) => ({ name, guest }));
});

const topGirls = computed(() => girls.value.slice(0, 3));

const focusGuest = computed(() => {
  return guests.value.find(entry => entry.guest.当前需求) || guests.value[0] || null;
});

const levelCounts = computed(() => {
  const counts: Record<string, number> = {};
  girls.value.forEach(({ girl }) => {
    const level = girl.等级 || '试用生';
    counts[level] = (counts[level] || 0) + 1;
  });
  return counts;
});

const pregnantCount = computed(() => {
  return girls.value.filter(({ girl }) => girl.怀孕状态 && girl.怀孕状态 !== '未孕').length;
});

const engagedCount = computed(() => {
  return girls.value.filter(({ girl }) => {
    return !!girl.专属恩客 || ['交往', '婚约', '迎娶'].includes(girl.恋情阶段 || '');
  }).length;
});

function memberBadge(level?: string): string {
  if (level === '黑金卡') return 'badge-member-black';
  if (level === '金卡') return 'badge-gold';
  if (level === '银卡') return 'badge-silver';
  return 'badge-member';
}

function isPregnant(girl: GirlData): boolean {
  return !!girl.怀孕状态 && girl.怀孕状态 !== '未孕';
}
</script>
