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

    <!-- 主角信息 -->
    <div class="xx-card" v-if="statData.主角">
      <div class="xx-title">主角信息</div>
      <div class="xx-info-item">
        <span class="xx-info-label">姓名</span>
        <span class="xx-info-value">{{ statData.主角.姓名 || '-' }}</span>
      </div>
      <div class="xx-info-item">
        <span class="xx-info-label">性别</span>
        <span class="xx-info-value">{{ statData.主角.性别 || '-' }}</span>
      </div>
      <div class="xx-info-item">
        <span class="xx-info-label">年龄</span>
        <span class="xx-info-value">{{ statData.主角.年龄 || '-' }}</span>
      </div>
      <div class="xx-info-item">
        <span class="xx-info-label">身份</span>
        <span class="xx-info-value">{{ statData.主角.身份 || '-' }}</span>
      </div>
      <div class="xx-info-item">
        <span class="xx-info-label">修为境界</span>
        <span class="xx-info-value">{{ statData.主角.修为境界 || '-' }}</span>
      </div>
      <div class="xx-info-item">
        <span class="xx-info-label">身体状态</span>
        <span class="xx-info-value">{{ statData.主角.身体状态 || '-' }}</span>
      </div>
    </div>

    <!-- 攻略目标 -->
    <div class="xx-card" v-if="hasTargets">
      <div class="xx-title">攻略目标</div>
      <div style="gap: 0.625rem; display: flex; flex-direction: column">
        <div v-for="(target, name) in statData.攻略目标" :key="name" class="xx-character-card">
          <div class="xx-character-header" @click="toggleTarget(name)">
            <div>
              <div class="xx-character-name">{{ name }}</div>
              <div class="xx-character-info">{{ (target as any)?.身份 || '-' }}</div>
            </div>
            <i :class="isExpanded(name) ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"></i>
          </div>
          <div v-if="isExpanded(name)" class="xx-character-detail">
            <div class="xx-info-item">
              <span class="xx-info-label">修为境界</span>
              <span class="xx-info-value">{{ (target as any)?.修为境界 || '-' }}</span>
            </div>
            <div class="xx-info-item">
              <span class="xx-info-label">攻略进度</span>
              <span class="xx-info-value">{{ (target as any)?.攻略进度 || 0 }}%</span>
            </div>
            <div class="xx-info-item">
              <span class="xx-info-label">好感度</span>
              <span class="xx-info-value">{{ (target as any)?.对主角好感度 || 0 }}</span>
            </div>
            <div class="xx-info-item" style="flex-direction: column; align-items: flex-start">
              <span class="xx-info-label">当前状态</span>
              <span class="xx-info-value" style="margin-top: 0.25rem">{{ (target as any)?.当前状态 || '-' }}</span>
            </div>
            <div class="xx-info-item" style="flex-direction: column; align-items: flex-start">
              <span class="xx-info-label">关系</span>
              <span class="xx-info-value" style="margin-top: 0.25rem">{{ (target as any)?.关系 || '-' }}</span>
            </div>
            <div
              class="xx-info-item"
              style="flex-direction: column; align-items: flex-start"
              v-if="(target as any)?.备注"
            >
              <span class="xx-info-label">备注</span>
              <span class="xx-info-value" style="margin-top: 0.25rem">{{ (target as any)?.备注 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, type Ref } from 'vue';

interface StatData {
  主角?: Record<string, unknown>;
  后宫?: Record<string, unknown>;
  攻略目标?: Record<string, unknown>;
  当前时间?: string;
  当前地点?: string;
}

// inject 返回的是 Ref<StatData>，需要通过 .value 访问
const statDataRef = inject<Ref<StatData>>('statData');
const statData = computed(() => statDataRef?.value || {});

const currentTime = computed(() => statData.value.当前时间 || '暂无');
const currentLocation = computed(() => statData.value.当前地点 || '暂无');

const hasTargets = computed(() => {
  return statData.value.攻略目标 && Object.keys(statData.value.攻略目标).length > 0;
});

const expandedTargets = ref<Set<string>>(new Set());

function toggleTarget(name: string) {
  if (expandedTargets.value.has(name)) {
    expandedTargets.value.delete(name);
  } else {
    expandedTargets.value.add(name);
  }
}

function isExpanded(name: string) {
  return expandedTargets.value.has(name);
}
</script>

<style lang="scss" scoped>
.xx-character-card {
  background: linear-gradient(135deg, var(--xx-paper) 0%, var(--xx-bg) 100%);
  border-radius: 0.25rem;
  padding: 0.875rem;
  border: 0.0625rem solid var(--xx-border);
}

.xx-character-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  i {
    color: var(--xx-light-cyan);
    transition: transform 0.2s;
  }
}

.xx-character-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--xx-ink);
  margin-bottom: 0.375rem;
}

.xx-character-info {
  font-size: 0.8125rem;
  color: var(--xx-light-cyan);
}

.xx-character-detail {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 0.0625rem solid var(--xx-border);
}
</style>
