<template>
  <div class="flex flex-col gap-2 p-1">
    <div v-if="!factions || Object.keys(factions).length === 0" class="flex items-center justify-center h-full text-secondary font-title text-sm sm:text-[0.9rem]">暂无势力信息</div>
    <div v-else class="flex flex-col gap-2">
      <div
        v-for="(info, factionName) in factions"
        :key="factionName"
        class="rounded-lg p-3 transition-all duration-300"
        style="background: var(--theme-card-bg); border: var(--theme-card-border); box-shadow: var(--theme-card-shadow);"
      >
        <div class="flex justify-between items-center mb-1">
          <div class="font-title text-sm sm:text-[0.95rem] text-title tracking-wider">{{ factionName }}</div>
          <div class="flex items-center gap-2">
            <span
              class="text-[0.7rem] sm:text-[0.75rem] px-2 py-0.5 rounded font-title"
              :class="getRelationClass(getRelationText(info))"
            >
              {{ getRelationText(info) }}
            </span>
            <span
              v-if="getTrendText(info) && getTrendText(info) !== '稳定'"
              class="text-[0.65rem] sm:text-[0.7rem] px-1.5 py-0.5 rounded font-title"
              :class="getTrendClass(getTrendText(info))"
            >
              {{ getTrendText(info) === '改善' ? '↑' : '↓' }}
            </span>
          </div>
        </div>
        <div v-if="getLastInteraction(info)" class="text-[0.65rem] sm:text-[0.7rem] text-secondary leading-relaxed truncate">{{ getLastInteraction(info) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface FactionInfo {
  关系?: string;
  趋势?: string;
  上次互动?: string;
}

interface Props {
  statData: {
    势力?: Record<string, FactionInfo>;
  };
}

const props = defineProps<Props>();
const factions = computed(() => props.statData?.势力 || {});

function getRelationText(info: FactionInfo | string): string {
  if (typeof info === 'string') return info;
  return info?.关系 || '未知';
}

function getTrendText(info: FactionInfo | string): string {
  if (typeof info === 'string') return '稳定';
  return info?.趋势 || '稳定';
}

function getLastInteraction(info: FactionInfo | string): string {
  if (typeof info === 'string') return '';
  return info?.上次互动 || '';
}

function getRelationClass(relation: string): string {
  if (relation.includes('友好') || relation.includes('合作')) {
    return 'bg-green-500/20 text-green-400';
  }
  if (relation.includes('贸易') || relation.includes('伙伴')) {
    return 'bg-blue-500/20 text-blue-400';
  }
  if (relation.includes('中立')) {
    return 'bg-yellow-500/20 text-yellow-400';
  }
  if (relation.includes('敌对') || relation.includes('警惕')) {
    return 'bg-red-500/20 text-red-400';
  }
  return 'bg-gray-500/20 text-gray-400';
}

function getTrendClass(trend: string): string {
  if (trend === '改善') return 'bg-green-500/20 text-green-400';
  if (trend === '恶化') return 'bg-red-500/20 text-red-400';
  return 'bg-gray-500/20 text-gray-400';
}
</script>
