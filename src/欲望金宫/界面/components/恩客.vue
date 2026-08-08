<template>
  <div>
    <div class="card-title"><i class="fa-solid fa-crown"></i> 贵宾名录 · {{ guests.length }}</div>

    <div v-if="guests.length" class="guest-grid">
      <div v-for="entry in sortedGuests" :key="entry.name" class="guest-card">
        <div class="guest-top">
          <div class="avatar avatar-guest">{{ entry.name.charAt(0) }}</div>
          <div class="min-w-0 flex-1">
            <div class="girl-name truncate">{{ entry.name }}</div>
            <div class="girl-sub">{{ entry.guest.类别 }}</div>
          </div>
          <span class="badge" :class="memberBadge(entry.guest.会员等级)">{{ entry.guest.会员等级 }}</span>
        </div>

        <div class="money-row">
          <div class="min-w-0">
            <span class="info-label">累计消费</span>
            <span class="money">{{ formatMoney(entry.guest.累计消费) }}</span>
          </div>
          <div class="min-w-0 text-right">
            <span class="info-label">金叶积分</span>
            <span class="money gold">{{ entry.guest.金叶积分 }}</span>
          </div>
        </div>

        <div class="demand-box">{{ entry.guest.当前需求 || '暂无公开需求' }}</div>

        <div v-if="entry.guest.专属服务员?.length" class="tag-row">
          <span class="tag" v-for="server in entry.guest.专属服务员" :key="server">{{ server }} · 专属服务员</span>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">还没有贵宾档案</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

interface GuestData {
  会员等级?: string;
  类别?: string;
  累计消费?: number;
  金叶积分?: number;
  当前需求?: string;
  专属服务员?: string[];
}

const store = useDataStore();

const guests = computed(() => {
  return Object.entries(store.data.恩客).map(([name, guest]) => ({ name, guest }));
});

const sortedGuests = computed(() => {
  return [...guests.value].sort((a, b) => (b.guest.金叶积分 ?? 0) - (a.guest.金叶积分 ?? 0));
});

function memberBadge(level?: string): string {
  if (level === '黑金卡') return 'badge-member-black';
  if (level === '金卡') return 'badge-gold';
  if (level === '银卡') return 'badge-silver';
  return 'badge-member';
}

function formatMoney(value?: number): string {
  const amount = Number(value || 0);
  if (amount >= 100000000) return `¥${(amount / 100000000).toFixed(1)}亿`;
  if (amount >= 10000) return `¥${(amount / 10000).toFixed(amount >= 1000000 ? 0 : 1)}万`;
  return `¥${amount.toLocaleString()}`;
}
</script>
