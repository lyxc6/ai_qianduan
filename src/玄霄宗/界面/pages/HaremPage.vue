<template>
  <div class="xx-page">
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

    <div v-if="!statData.后宫 || Object.keys(statData.后宫).length === 0" class="xx-empty">
      <i class="fa-solid fa-user-group"></i>
      <span>暂无后宫角色</span>
    </div>

    <div v-else class="xx-card-list">
      <div
        v-for="(character, name) in statData.后宫"
        :key="name"
        class="xx-card xx-card-clickable"
        @click="goToDetail(name)">
        <div class="xx-card-header">
          <div class="xx-card-name">{{ name }}</div>
          <i class="fa-solid fa-chevron-right"></i>
        </div>
        <div class="xx-card-info">
          <span>{{ (character as any)?.修为境界 || '-' }}</span>
          <span class="xx-divider">|</span>
          <span>好感 {{ (character as any)?.对主角好感度 || 0 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, type Ref } from 'vue';
import type { Router } from 'vue-router';

interface StatData {
  主角?: Record<string, unknown>;
  后宫?: Record<string, unknown>;
  攻略目标?: Record<string, unknown>;
  当前时间?: string;
  当前地点?: string;
}

const router = inject<Router>('router');
const statData = inject<Ref<StatData>>('statData');
const statDataValue = computed(() => statData?.value || {});

const currentTime = computed(() => statDataValue.value.当前时间 || '暂无');
const currentLocation = computed(() => statDataValue.value.当前地点 || '暂无');

function goToDetail(name: string) {
  router?.push(`/harem/${encodeURIComponent(name)}`);
}
</script>

<style lang="scss" scoped>
.xx-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem;
  color: #718096;

  i {
    font-size: 3rem;
    opacity: 0.5;
    color: #4A5568;
  }

  span {
    font-size: 0.875rem;
  }
}

.xx-card-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.xx-card-clickable {
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #4A5568;
  }

  &:active {
    transform: scale(0.99);
  }
}

.xx-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  i {
    color: #A0AEC0;
    font-size: 0.75rem;
  }
}

.xx-card-name {
  font-size: 1rem;
  font-weight: 700;
  color: #2C2C2C;
  letter-spacing: 0.0625rem;
}

.xx-card-info {
  font-size: 0.8125rem;
  color: #718096;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.xx-divider {
  color: #A0AEC0;
}
</style>
