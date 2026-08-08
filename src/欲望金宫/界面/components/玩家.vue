<template>
  <div>
    <div class="card-title"><i class="fa-solid fa-user"></i> 我的档案</div>

    <div class="guest-card">
      <div class="guest-top">
        <div class="avatar avatar-guest">{{ displayName.charAt(0) }}</div>
        <div class="min-w-0 flex-1">
          <div class="girl-name truncate">{{ displayName }}</div>
          <div class="girl-sub">{{ player.类别 || '新贵' }} · {{ player.年龄 ?? 28 }}岁 · {{ player.性别 || '男' }}</div>
        </div>
        <span class="badge badge-member-black">{{ player.会员等级 || '黑金卡' }}</span>
      </div>

      <div class="money-row">
        <div class="min-w-0">
          <span class="info-label">累计消费</span>
          <span class="money">{{ formatMoney(player.累计消费) }}</span>
        </div>
        <div class="min-w-0 text-right">
          <span class="info-label">金叶积分</span>
          <span class="money gold">{{ player.金叶积分 ?? 0 }}</span>
        </div>
      </div>

      <div class="demand-box">{{ player.当前需求 || '今晚正在酒廊静候安排' }}</div>

      <div class="info-grid mt-3">
        <div class="info-item full">
          <span class="info-label">当前想法</span>
          <span class="info-value">{{ player.当前想法 || '还没有具体的想法' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">专属服务员</span>
          <span class="info-value">{{ player.专属服务员?.length ? player.专属服务员.join('、') : '暂无' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

interface PlayerData {
  姓名?: string;
  性别?: string;
  会员等级?: string;
  类别?: string;
  年龄?: number;
  累计消费?: number;
  金叶积分?: number;
  当前需求?: string;
  专属服务员?: string[];
  当前想法?: string;
}

const store = useDataStore();
const player = computed<PlayerData>(() => store.data.玩家 || {});

const displayName = computed(() => {
  const name = player.value.姓名 || '{{user}}';
  return name.trim() ? name : '{{user}}';
});

function formatMoney(value?: number): string {
  const amount = Number(value || 0);
  if (amount >= 100000000) return `¥${(amount / 100000000).toFixed(1)}亿`;
  if (amount >= 10000) return `¥${(amount / 10000).toFixed(amount >= 1000000 ? 0 : 1)}万`;
  return `¥${amount.toLocaleString()}`;
}
</script>
