<template>
  <div class="npc-info-container">
    <div v-if="npcList.length === 0" class="no-npc">暂无路人信息</div>
    <template v-else v-for="(npc, index) in npcList" :key="index">
      <div class="npc-section">
        <div class="npc-header">
          <span class="npc-name">{{ npc.姓名 || '未命名' }}</span>
          <span class="npc-relation">{{ npc.关系 || '不存在' }}</span>
        </div>

        <div class="info-section">
          <div class="section-title">基本信息</div>
          <div class="info-group">
            <div class="info-item">
              <div class="info-label">性别</div>
              <div class="info-value">{{ npc.性别 || '不存在' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">年龄</div>
              <div class="info-value">{{ npc.年龄 !== undefined ? npc.年龄 + '岁' : '不存在' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">武功境界</div>
              <div class="info-value">{{ npc.武功境界 !== undefined ? npc.武功境界 : '不存在' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">身份</div>
              <div class="info-value">{{ npc.身份 || '不存在' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">对女主看法</div>
              <div class="info-value">{{ npc.对女主看法 || '不存在' }}</div>
            </div>
          </div>
        </div>

        <div class="info-section">
          <div class="section-title">当前状态</div>
          <div class="info-group">
            <div class="info-item">
              <div class="info-label">当前姿势</div>
              <div class="info-value">{{ npc.当前姿势 || '不存在' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">当前想法</div>
              <div class="info-value">{{ npc.当前想法 || '不存在' }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface NPC {
  姓名?: string;
  性别?: string;
  年龄?: number;
  武功境界?: number;
  身份?: string;
  关系?: string;
  对女主看法?: string;
  当前姿势?: string;
  当前想法?: string;
}

interface Props {
  statData?: {
    路人?: NPC[];
  };
}

const props = defineProps<Props>();

const npcList = computed<NPC[]>(() => {
  return props.statData?.路人 ?? [];
});
</script>

<style scoped>
.npc-info-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.no-npc {
  text-align: center;
  color: var(--text-secondary);
  padding: 1rem;
  font-size: 0.7rem;
}

.npc-section {
  background: var(--warm-bg-light);
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.npc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.35rem 0.5rem;
  background: var(--warm-bg-medium);
  border-radius: 0.3rem;
  margin-bottom: 0.5rem;
}

.npc-name {
  font-weight: bold;
  color: var(--text-title);
  font-size: 0.75rem;
}

.npc-relation {
  font-size: 0.65rem;
  color: var(--accent-color);
  background: var(--warm-bg-dark);
  padding: 0.15rem 0.35rem;
  border-radius: 0.25rem;
}

.info-section {
  margin-bottom: 0.5rem;
}

.info-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-weight: bold;
  color: var(--text-title);
  font-size: 0.7rem;
  margin-bottom: 0.35rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid var(--border-color);
}

.info-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.15rem 0;
  font-size: 0.65rem;
}

.info-label {
  color: var(--text-secondary);
  flex-shrink: 0;
}

.info-value {
  color: var(--text-primary);
  text-align: right;
  margin-left: 0.5rem;
}
</style>
