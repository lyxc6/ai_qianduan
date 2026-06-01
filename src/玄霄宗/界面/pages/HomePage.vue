<template>
  <div class="xx-page">
    <!-- 当前时间和地点 -->
    <div class="xx-status-bar">
      <div class="xx-status-item">
        <i class="fa-solid fa-clock"></i>
        <span>{{ currentTime }}</span>
      </div>
      <div class="xx-status-item">
        <i class="fa-solid fa-location-dot"></i>
        <span>{{ currentLocation }}</span>
      </div>
    </div>

    <!-- 主角信息概览 -->
    <div class="xx-card" v-if="statData.主角">
      <div class="xx-title">主角信息</div>
      <div class="xx-info-item">
        <span class="xx-info-label">姓名</span>
        <span class="xx-info-value">{{ statData.主角.姓名 || '-' }}</span>
      </div>
      <div class="xx-info-item">
        <span class="xx-info-label">修为境界</span>
        <span class="xx-info-value">{{ statData.主角.修为境界 || '-' }}</span>
      </div>
      <div class="xx-info-item">
        <span class="xx-info-label">年龄</span>
        <span class="xx-info-value">{{ statData.主角.年龄 || '-' }}</span>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="xx-grid xx-grid-2">
      <div class="xx-stat-card" @click="goToPage('harem')">
        <div class="xx-stat-value">{{ haremCount }}</div>
        <div class="xx-stat-label">后宫人数</div>
      </div>
      <div class="xx-stat-card" @click="goToPage('protagonist')">
        <div class="xx-stat-value">{{ targetCount }}</div>
        <div class="xx-stat-label">攻略目标</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useRouter } from 'vue-router';

interface StatData {
  主角?: Record<string, unknown>;
  后宫?: Record<string, unknown>;
  攻略目标?: Record<string, unknown>;
  当前时间?: string;
  当前地点?: string;
}

const router = useRouter();
const statData = inject<StatData>('statData') || {};

const currentTime = computed(() => {
  return (statData as any).当前时间 || '暂无';
});
const currentLocation = computed(() => {
  return (statData as any).当前地点 || '暂无';
});

const haremCount = computed(() => {
  if (!statData.后宫) return 0;
  return Object.keys(statData.后宫).length;
});

const targetCount = computed(() => {
  if (!statData.攻略目标) return 0;
  return Object.keys(statData.攻略目标).length;
});

function goToPage(page: string) {
  switch(page) {
    case 'harem':
      router.push('/harem');
      break;
    case 'protagonist':
      router.push('/protagonist');
      break;
  }
}
</script>
