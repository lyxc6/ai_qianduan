<template>
  <div class="character-info-container">
    <div class="character-info-section">
      <div class="info-group">
        <div class="info-item">
          <div class="info-label">姓名</div>
          <div class="info-value">{{ protagonist.姓名 || '加载中...' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">年龄</div>
          <div class="info-value">{{ protagonist.年龄 || '加载中...' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">力量等级</div>
          <div class="info-value">{{ protagonist.力量等级 || '加载中...' }}</div>
        </div>
      </div>
    </div>

    <div class="status-section">
      <div class="section-header">当前状态</div>
      <div class="status-grid">
        <div class="status-item">
          <div class="status-label">当前着装</div>
          <div class="status-value">{{ protagonist.当前着装 || '加载中...' }}</div>
        </div>
        <div class="status-item">
          <div class="status-label">当前姿势</div>
          <div class="status-value">{{ protagonist.当前姿势 || '加载中...' }}</div>
        </div>
        <div class="status-item">
          <div class="status-label">当前位置</div>
          <div class="status-value">{{ protagonist.当前位置 || '加载中...' }}</div>
        </div>
        <div class="status-item full-width">
          <div class="status-label">当前想法</div>
          <div class="status-value">{{ protagonist.当前想法 || '加载中...' }}</div>
        </div>
        <div class="status-item full-width">
          <div class="status-label">最近性行为</div>
          <div class="status-value">{{ protagonist.最近性行为 || '暂无' }}</div>
        </div>
        <div class="status-item full-width">
          <div class="status-label">阴茎状态</div>
          <div class="status-value">{{ protagonist.阴茎状态 || '未知' }}</div>
        </div>
        <div class="status-item">
          <div class="status-label">射精进度</div>
          <div class="status-value">{{ protagonist.射精进度 ?? 0 }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  statData: {
    主角?: {
      姓名?: string;
      年龄?: string;
      力量等级?: string;
      当前着装?: string;
      当前姿势?: string;
      当前位置?: string;
      当前想法?: string;
      最近性行为?: string;
      阴茎状态?: string;
      射精进度?: number;
    };
  };
}

const props = defineProps<Props>();
const protagonist = computed(() => props.statData?.主角 || {});
</script>

<style lang="scss">
.character-info-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
  overflow-y: auto;
  padding: 0.25rem;
}

.character-info-section {
  background: linear-gradient(135deg, rgba(30, 18, 60, 0.6) 0%, rgba(20, 12, 40, 0.7) 100%);
  border-radius: 0.5rem;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
}

.info-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.info-item {
  flex: 1;
  min-width: 45%;
  display: flex;
  flex-direction: column;
}

.info-label {
  font-family: var(--font-title);
  font-size: 0.75rem;
  color: var(--user-color-primary);
  margin-bottom: 0.25rem;
  letter-spacing: 1px;
}

.info-value {
  font-family: var(--font-serif);
  font-size: 0.85rem;
  color: var(--text-primary);
  line-height: 1.4;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.status-section {
  background: linear-gradient(135deg, rgba(30, 18, 60, 0.6) 0%, rgba(20, 12, 40, 0.7) 100%);
  border-radius: 0.5rem;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
}

.section-header {
  font-family: var(--font-title);
  font-size: 0.85rem;
  color: var(--text-title);
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--border-color);
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.status-item {
  display: flex;
  flex-direction: column;
}

.status-item.full-width {
  grid-column: span 2;
}

.status-label {
  font-family: var(--font-title);
  font-size: 0.7rem;
  color: var(--text-secondary);
  margin-bottom: 0.15rem;
  letter-spacing: 0.5px;
}

.status-value {
  font-family: var(--font-serif);
  font-size: 0.8rem;
  color: var(--text-primary);
  line-height: 1.4;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}
</style>
