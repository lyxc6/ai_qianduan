<template>
  <div class="npc-info-container">
    <div v-if="npcList.length === 0" class="no-npc">
      暂无路人信息
    </div>
    <div v-else v-for="(npc, index) in npcList" :key="index" class="npc-section">
      <div class="npc-header">
        <span class="npc-name">{{ npc.姓名 || '未命名' }}</span>
        <span class="npc-relation">{{ npc.关系 || '' }}</span>
      </div>

      <div class="info-section">
        <div class="section-title">基本信息</div>
        <div class="info-group">
          <div class="info-item" v-if="npc.性别">
            <div class="info-label">性别</div>
            <div class="info-value">{{ npc.性别 }}</div>
          </div>
          <div class="info-item" v-if="npc.年龄">
            <div class="info-label">年龄</div>
            <div class="info-value">{{ npc.年龄 }}岁</div>
          </div>
          <div class="info-item" v-if="npc.身份">
            <div class="info-label">身份</div>
            <div class="info-value">{{ npc.身份 }}</div>
          </div>
          <div class="info-item" v-if="npc.对女主看法">
            <div class="info-label">对女主看法</div>
            <div class="info-value">{{ npc.对女主看法 }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">当前状态</div>
        <div class="info-group">
          <div class="info-item" v-if="npc.当前姿势">
            <div class="info-label">当前姿势</div>
            <div class="info-value">{{ npc.当前姿势 }}</div>
          </div>
          <div class="info-item" v-if="npc.当前想法">
            <div class="info-label">当前想法</div>
            <div class="info-value">{{ npc.当前想法 }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface NPC {
  姓名?: string;
  性别?: string;
  年龄?: number;
  身份?: string;
  关系?: string;
  对女主看法?: string;
  当前姿势?: string;
  当前想法?: string;
}

interface Props {
  statData: {
    路人?: NPC[];
  };
}

const props = defineProps<Props>();

const npcList = computed(() => {
  return props.statData?.路人 || [];
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
  align-items: flex-start;
  padding: 0.2rem 0;
}

.info-label {
  color: var(--text-secondary);
  font-size: 0.65rem;
  min-width: 60px;
}

.info-value {
  color: var(--text-primary);
  font-size: 0.65rem;
  text-align: right;
  flex: 1;
  word-break: break-all;
}
</style>
