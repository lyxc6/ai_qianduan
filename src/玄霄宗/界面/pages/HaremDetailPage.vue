<template>
  <div class="xx-page xx-detail-page">
    <div class="xx-detail-header">
      <button class="xx-back-btn" @click="goBack">
        <i class="fa-solid fa-arrow-left"></i>
        <span>返回后宫</span>
      </button>
    </div>

    <div class="xx-detail-content">
      <div class="xx-card" v-if="character">
        <div class="xx-title">{{ characterName }}</div>

        <div class="xx-info-item">
          <span class="xx-info-label">姓名</span>
          <span class="xx-info-value">{{ character.姓名 || '-' }}</span>
        </div>
        <div class="xx-info-item">
          <span class="xx-info-label">性别</span>
          <span class="xx-info-value">{{ character.性别 || '-' }}</span>
        </div>
        <div class="xx-info-item">
          <span class="xx-info-label">年龄</span>
          <span class="xx-info-value">{{ character.年龄 || '-' }}</span>
        </div>
        <div class="xx-info-item">
          <span class="xx-info-label">身份</span>
          <span class="xx-info-value">{{ character.身份 || '-' }}</span>
        </div>
        <div class="xx-info-item">
          <span class="xx-info-label">修为境界</span>
          <span class="xx-info-value">{{ character.修为境界 || '-' }}</span>
        </div>
        <div class="xx-info-item">
          <span class="xx-info-label">好感度</span>
          <span class="xx-info-value">{{ character.对主角好感度 || 0 }}</span>
        </div>
        <div class="xx-info-item">
          <span class="xx-info-label">处女</span>
          <span class="xx-tag xx-tag-primary">{{ character.处女 ? '是' : '否' }}</span>
        </div>
        <div class="xx-info-item">
          <span class="xx-info-label">亲密次数</span>
          <span class="xx-info-value">{{ character.亲密次数 || 0 }}</span>
        </div>
        <div class="xx-info-item">
          <span class="xx-info-label">内射次数</span>
          <span class="xx-info-value">{{ character.内射次数 || 0 }}</span>
        </div>
        <div class="xx-info-item">
          <span class="xx-info-label">高潮次数</span>
          <span class="xx-info-value">{{ character.高潮次数 || 0 }}</span>
        </div>
        <div class="xx-info-item" style="flex-direction: column; align-items: flex-start">
          <span class="xx-info-label">关系</span>
          <span class="xx-info-value" style="margin-top: 0.375rem; font-weight: 400; line-height: 1.6">{{
            character.关系 || '-'
          }}</span>
        </div>
        <div class="xx-info-item" style="flex-direction: column; align-items: flex-start">
          <span class="xx-info-label">性格</span>
          <span class="xx-info-value" style="margin-top: 0.375rem; font-weight: 400; line-height: 1.6">{{
            character.性格 || '-'
          }}</span>
        </div>
        <div class="xx-info-item" style="flex-direction: column; align-items: flex-start">
          <span class="xx-info-label">身体信息</span>
          <span class="xx-info-value" style="margin-top: 0.375rem; font-weight: 400; line-height: 1.6">{{
            character.身体信息 || '-'
          }}</span>
        </div>
        <div class="xx-info-item">
          <span class="xx-info-label">当前姿势</span>
          <span class="xx-info-value">{{ character.当前姿势 || '-' }}</span>
        </div>
        <div class="xx-info-item" style="flex-direction: column; align-items: flex-start">
          <span class="xx-info-label">当前想法</span>
          <span class="xx-info-value" style="margin-top: 0.375rem; font-weight: 400; line-height: 1.6">{{
            character.当前想法 || '-'
          }}</span>
        </div>
        <div class="xx-info-item">
          <span class="xx-info-label">身体状态</span>
          <span class="xx-info-value">{{ character.身体状态 || '-' }}</span>
        </div>
        <div class="xx-info-item" style="flex-direction: column; align-items: flex-start">
          <span class="xx-info-label">当前着装</span>
          <span class="xx-info-value" style="margin-top: 0.375rem; font-weight: 400; line-height: 1.6">{{
            character.当前着装 || '-'
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, type Ref } from 'vue';
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router';

interface StatData {
  主角?: Record<string, unknown>;
  后宫?: Record<string, unknown>;
  攻略目标?: Record<string, unknown>;
}

const route = inject<RouteLocationNormalizedLoaded>('route');
const router = inject<Router>('router');

const characterName = computed(() => (route?.params.name as string) || '');

const character = computed(() => {
  const statData = inject<Ref<StatData>>('statData');
  if (!statData?.value?.后宫) return null;
  return statData.value.后宫[characterName.value] as any;
});

function goBack() {
  router?.back();
}
</script>

<style lang="scss" scoped>
.xx-detail-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.xx-detail-header {
  flex-shrink: 0;
}

.xx-back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 0.0625rem solid var(--xx-border);
  background: var(--xx-paper);
  color: var(--xx-ink);

  i {
    color: var(--xx-cyan);
  }

  &:hover {
    border-color: var(--xx-cyan);
    background: rgba(74, 85, 104, 0.03);
  }
}

.xx-detail-content {
  flex: 1;
  overflow-y: auto;
  padding-right: 0.25rem;

  &::-webkit-scrollbar {
    width: 0.25rem;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(74, 85, 104, 0.2);
    border-radius: 0.125rem;
  }
}
</style>
