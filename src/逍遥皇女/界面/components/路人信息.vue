<template>
  <div class="npc-info-container">
    <div v-if="npcList.length === 0" class="no-npc">暂无路人信息</div>
    <template v-else v-for="(npc, index) in npcList" :key="index">
      <div class="npc-section">
        <div class="npc-header">
          <span class="npc-name">{{ npc.姓名 || '未命名' }}</span>
          <span class="npc-relation">{{ npc.关系 || '不存在' }}</span>
        </div>

        <CollapsibleSection title="基本信息">
          <InfoItem label="性别" :value="npc.性别" />
          <InfoItem label="年龄" :value="npc.年龄 !== undefined ? npc.年龄 + '岁' : undefined" />
          <InfoItem label="武功境界" :value="npc.武功境界" />
          <InfoItem label="身份" :value="npc.身份" />
          <InfoItem label="与女主关系" :value="npc.与女主关系" />
          <InfoItem label="对女主态度" :value="npc.对女主态度" />
        </CollapsibleSection>

        <CollapsibleSection title="当前状态" :defaultOpen="false">
          <InfoItem label="当前姿势" :value="npc.当前姿势" />
          <InfoItem label="当前想法" :value="npc.当前想法" />
        </CollapsibleSection>

        <CollapsibleSection title="背景" :defaultOpen="false">
          <InfoItem label="" :value="npc.背景" />
        </CollapsibleSection>

        <CollapsibleSection title="性格" :defaultOpen="false" v-if="npc.性格">
          <InfoItem label="核心" :value="npc.性格.核心" />
          <InfoItem label="优点" :value="npc.性格.优点" />
          <InfoItem label="缺点" :value="npc.性格.缺点" />
          <InfoItem label="习惯" :value="npc.性格.习惯" />
          <InfoItem label="说话方式" :value="npc.性格.说话" />
        </CollapsibleSection>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import InfoItem from './信息项.vue';
import CollapsibleSection from './折叠区块.vue';

interface NPC性格 {
  核心?: string;
  优点?: string;
  缺点?: string;
  习惯?: string;
  说话?: string;
}

interface NPC {
  姓名?: string;
  性别?: string;
  年龄?: number;
  武功境界?: string;
  身份?: string;
  关系?: string;
  与女主关系?: string;
  对女主看法?: string;
  对女主态度?: string;
  当前姿势?: string;
  当前想法?: string;
  背景?: string;
  性格?: NPC性格;
}

interface Props {
  statData?: {
    其他角色?: NPC[];
  };
}

const props = defineProps<Props>();

const npcList = computed<NPC[]>(() => {
  return props.statData?.其他角色 ?? [];
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
</style>
