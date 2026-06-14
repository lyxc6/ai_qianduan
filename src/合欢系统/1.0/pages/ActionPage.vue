<template>
  <div>
    <div class="hh-page-header">
      <BackButton />
      <div class="hh-page-title">行动建议APP</div>
    </div>
    <div class="hh-content">
      <div v-for="(action, i) in actions" :key="i" class="hh-card">
        <div class="hh-card-title">建议 {{ i + 1 }}</div>
        <div class="hh-row"><span class="hh-value">{{ action }}</span></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import BackButton from '../components/BackButton.vue';

interface StatData {
  系统?: {
    行动建议?: string[];
  };
}

const statData = inject<{ value: StatData }>('statData');

const fallback = [
  '查看当前地点附近可接触目标',
  '打开商城筛选可购买商品',
  '检查社交风险与曝光风险',
  '推进当前重点目标关系',
  '休整并优化形象/气质/身材',
];

const actions = computed(() => {
  const arr = statData?.value?.系统?.行动建议;
  const list = Array.isArray(arr) ? arr : fallback;
  return list.slice(0, 5);
});
</script>
