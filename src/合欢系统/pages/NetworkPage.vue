<template>
  <div>
    <div class="hh-page-header">
      <BackButton />
      <div class="hh-page-title">关系网APP</div>
    </div>
    <div class="hh-content">
      <div v-if="targets.length" v-for="t in targets" :key="t.姓名" class="hh-card">
        <div class="hh-card-title">{{ t.姓名 }}</div>
        <div class="hh-row"><span class="hh-label">性别</span><span class="hh-value">{{ displayValue(t.性别) }}</span></div>
        <div class="hh-row"><span class="hh-label">综合</span><span class="hh-value">{{ t.综合等级 || '—' }} / {{ displayValue(t.综合评分) }}</span></div>
        <div class="hh-row"><span class="hh-label">关系</span><span class="hh-value">{{ t.关系阶段 }}｜{{ t.关系状态 }}</span></div>
        <div class="hh-row"><span class="hh-label">好感</span><span class="hh-value">{{ displayValue(t.好感度) }}</span></div>
        <div class="hh-row"><span class="hh-label">双修次数</span><span class="hh-value">{{ displayValue(t.有效双修次数) }}</span></div>
        <div class="hh-row"><span class="hh-label">怀孕</span><span class="hh-value">{{ displayValue(t.怀孕状态) }}</span></div>
        <div class="hh-row"><span class="hh-label">顾虑</span><span class="hh-value">{{ displayValue(t.主要顾虑) }}</span></div>
      </div>
      <div v-else class="hh-empty">尚未建立稳定关系网</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import BackButton from '../components/BackButton.vue';
import { displayValue } from '../utils';

interface TargetData {
  姓名?: string;
  性别?: string;
  综合等级?: string;
  综合评分?: number;
  关系阶段?: string;
  关系状态?: string;
  好感度?: number;
  有效双修次数?: number;
  主要顾虑?: string;
  是否被攻略?: boolean;
  怀孕状态?: string;
}

interface StatData {
  目标?: Record<string, TargetData>;
}

const statData = inject<{ value: StatData }>('statData');

const targets = computed(() => {
  const allTargets = statData?.value?.目标 || {};
  return Object.values(allTargets).filter(
    t => t.是否被攻略 || ['亲密', '稳定关系'].includes(t.关系阶段 || ''),
  );
});
</script>
