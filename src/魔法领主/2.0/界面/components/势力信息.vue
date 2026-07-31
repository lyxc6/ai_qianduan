<template>
  <div class="flex flex-col gap-2 p-1">
    <div v-if="!factions || Object.keys(factions).length === 0" class="text-secondary font-title flex h-full items-center justify-center text-[0.9rem]">
      诸侯尚未显露动向…
    </div>
    <div v-else class="flex flex-col gap-2">
      <div
        v-for="(info, factionName) in factions"
        :key="factionName"
        class="relative rounded-lg py-2.5 pr-3 pl-2 transition-all duration-300 hover:translate-x-1"
        style="background: var(--theme-card-bg); border: var(--theme-card-border); box-shadow: var(--theme-card-shadow); overflow: hidden;"
      >
        <div class="absolute top-0 bottom-0 left-0 w-1" :style="{ background: getRelationColor(getRelationText(info)) }"></div>
        <div class="mb-1 flex items-center justify-between">
          <div class="font-title text-title mr-2 min-w-0 flex-1 truncate text-[0.92rem] tracking-wider">{{ factionName }}</div>
          <div class="flex flex-shrink-0 items-center gap-2">
            <span
              class="font-title rounded px-2 py-0.5 text-[0.68rem] tracking-wide"
              :style="getBadgeStyle(getRelationText(info))"
            >
              {{ getRelationText(info) }}
            </span>
            <span
              v-if="getTrendText(info) && getTrendText(info) !== '稳定'"
              class="trend-arrow w-4 text-center text-[0.7rem] font-bold"
              :class="getTrendText(info) === '改善' ? 'trend-up' : 'trend-down'"
              :style="{ color: getTrendText(info) === '改善' ? 'var(--theme-badge-good)' : 'var(--theme-badge-bad)' }"
              :title="getTrendText(info)"
            >{{ getTrendText(info) === '改善' ? '↑' : '↓' }}</span>
          </div>
        </div>
        <div v-if="getLastInteraction(info)" class="text-secondary truncate pl-1.5 text-[0.64rem] leading-relaxed">{{ getLastInteraction(info) }}</div>
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

function getRelationColor(relation: string): string {
  if (relation.includes('友好') || relation.includes('合作')) return 'var(--theme-badge-good)';
  if (relation.includes('贸易') || relation.includes('伙伴')) return '#4a7a9c';
  if (relation.includes('中立')) return 'var(--theme-badge-neutral)';
  if (relation.includes('敌对') || relation.includes('警惕')) return 'var(--theme-badge-bad)';
  return 'var(--theme-badge-neutral)';
}

function getBadgeStyle(relation: string): Record<string, string> {
  return {
    background: `color-mix(in srgb, ${getRelationColor(relation)} 14%, transparent)`,
    color: getRelationColor(relation),
  };
}
</script>

<style scoped>
@keyframes arrowFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}
@keyframes arrowFloatDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(2px); }
}
.trend-up {
  animation: arrowFloat 1.6s ease-in-out infinite;
}
.trend-down {
  animation: arrowFloatDown 1.6s ease-in-out infinite;
}
</style>
