<template>
  <div class="system-info-container">
    <div class="info-section">
      <div class="section-title">📅 时间与地点</div>
      <div class="info-group">
        <div class="info-item">
          <div class="info-label">当前时间</div>
          <div class="info-value">{{ system.当前时间 || '不存在' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">当前地点</div>
          <div class="info-value">{{ system.当前地点 || '不存在' }}</div>
        </div>
      </div>
    </div>

    <div class="info-section" v-if="system.当前任务">
      <div class="section-title">📋 当前任务</div>
      <div class="info-group">
        <div class="info-item">
          <div class="info-label">任务名称</div>
          <div class="info-value">{{ system.当前任务.名称 || '不存在' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">任务内容</div>
          <div class="info-value">{{ system.当前任务.内容 || '不存在' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">任务进度</div>
          <div class="info-value">{{ system.当前任务.进度 !== undefined ? system.当前任务.进度 + '%' : '不存在' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">奖励</div>
          <div class="info-value reward">{{ system.当前任务.奖励 || '不存在' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">惩罚</div>
          <div class="info-value penalty">{{ system.当前任务.惩罚 || '不存在' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  statData: {
    系统?: {
      当前时间?: string;
      当前地点?: string;
      当前任务?: {
        名称?: string;
        内容?: string;
        要求?: string;
        奖励?: string;
        惩罚?: string;
        进度?: number;
      };
      最近性行为?: string;
    };
  };
}

const props = defineProps<Props>();

const system = computed(() => props.statData?.系统 || {});
</script>

<style scoped>
.system-info-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-section {
  background: var(--warm-bg-light);
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.section-title {
  font-weight: bold;
  color: var(--text-title);
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--border-color);
}

.info-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.25rem 0;
}

.info-label {
  color: var(--text-secondary);
  font-size: 0.7rem;
  min-width: 70px;
}

.info-value {
  color: var(--text-primary);
  font-size: 0.7rem;
  text-align: right;
  flex: 1;
  word-break: break-all;
}

.info-value.requirement {
  color: var(--accent-color);
  font-style: italic;
}

.info-value.reward {
  color: #2e7d32;
}

.info-value.penalty {
  color: #c62828;
}
</style>
