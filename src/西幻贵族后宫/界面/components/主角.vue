<template>
  <div>
    <div class="card-title"><i class="fa-solid fa-user"></i> 主角档案</div>

    <div class="guest-card">
      <div class="guest-top">
        <div class="avatar avatar-guest">{{ displayName.charAt(0) }}</div>
        <div class="min-w-0 flex-1">
          <div class="girl-name truncate">{{ displayName }}</div>
          <div class="girl-sub">{{ player.性别 || '男' }} · {{ player.年龄 ?? 0 }}岁 · {{ player.头衔 || '—' }}</div>
        </div>
        <span class="badge badge-member-black">{{ player.财富等级 || '—' }}</span>
      </div>

      <div class="money-row">
        <div class="min-w-0">
          <span class="info-label">所属家族</span>
          <span class="money">{{ player.家族 || '—' }}</span>
        </div>
        <div class="min-w-0 text-right">
          <span class="info-label">射精进度</span>
          <span class="money gold">{{ player.射精进度 ?? 0 }}%</span>
        </div>
      </div>

      <div class="mt-3">
        <div class="bar-label mb-1"><span>射精进度</span><span>{{ player.射精进度 ?? 0 }}%</span></div>
        <div class="bar"><div class="bar-fill bar-affection" :style="{ width: clamp(player.射精进度) + '%' }"></div></div>
      </div>

      <div class="demand-box">{{ player.当前想法 || '还没有具体的想法' }}</div>

      <div class="info-grid mt-3">
        <div class="info-item full">
          <span class="info-label">当前着装</span>
          <span class="info-value">{{ player.当前着装 || '未描述' }}</span>
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
  年龄?: number;
  头衔?: string;
  家族?: string;
  财富等级?: string;
  当前着装?: string;
  当前想法?: string;
  射精进度?: number;
}

const store = useDataStore();
const player = computed<PlayerData>(() => store.data.主角 || {});

const displayName = computed(() => {
  const name = player.value.姓名 || '{{user}}';
  return name.trim() ? name : '{{user}}';
});

function clamp(value?: number): number {
  return Math.max(0, Math.min(100, value ?? 0));
}
</script>
