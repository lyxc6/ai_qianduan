<template>
  <div>
    <div class="hh-page-header">
      <BackButton />
      <div class="hh-page-title">背包APP</div>
    </div>
    <div class="hh-content">
      <div v-if="items.length" v-for="([name, item]) in items" :key="name" class="hh-card">
        <div class="hh-card-title">{{ name }}</div>
        <div class="hh-row"><span class="hh-label">数量</span><span class="hh-value">{{ item.数量 || 0 }}</span></div>
        <div class="hh-row"><span class="hh-label">类型</span><span class="hh-value">{{ item.类型 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">效果</span><span class="hh-value">{{ item.效果 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">时长</span><span class="hh-value">{{ item.持续时间 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">限制</span><span class="hh-value">{{ item.使用限制 || '—' }}</span></div>
      </div>
      <div v-else class="hh-empty">背包空空如也</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import BackButton from '../components/BackButton.vue';

interface BagItem {
  数量?: number;
  类型?: string;
  效果?: string;
  持续时间?: string;
  使用限制?: string;
}

interface StatData {
  背包?: Record<string, BagItem>;
}

const statData = inject<{ value: StatData }>('statData');

const items = computed(() => {
  const bag = statData?.value?.背包 || {};
  return Object.entries(bag);
});
</script>
