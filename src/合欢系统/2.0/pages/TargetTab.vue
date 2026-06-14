<template>
  <div>
    <div v-if="targets.length">
      <div v-for="t in targets" :key="t.姓名" class="group">
        <div class="group-header" :class="{ expanded: isExpanded(t.姓名!) }" @click="toggle(t.姓名!)">
          <i class="fa-solid fa-chevron-right"></i>
          <span>{{ t.姓名 }}</span>
          <span v-if="t.是否被攻略" class="tag green" style="margin-left: auto;">已攻略</span>
        </div>
        <div v-if="isExpanded(t.姓名!)" class="group-body">
          <div class="row"><span class="row-label">性别</span><span class="row-value">{{ t.性别 || '—' }}</span></div>
          <div class="row"><span class="row-label">年龄</span><span class="row-value">{{ t.年龄 || '—' }}</span></div>
          <div class="row"><span class="row-label">身份</span><span class="row-value">{{ t.身份 || '—' }}</span></div>
          <div class="row"><span class="row-label">场景</span><span class="row-value">{{ t.场景来源 || '—' }}</span></div>
          <div class="row"><span class="row-label">综合</span><span class="row-value">{{ t.综合等级 || '—' }} / {{ t.综合评分 ?? 0 }}</span></div>
          <div class="row"><span class="row-label">关系</span><span class="row-value">{{ t.关系阶段 || '—' }} · {{ t.关系状态 || '—' }}</span></div>
          <div class="row"><span class="row-label">好感</span><span class="row-value accent">{{ t.好感度 ?? 0 }}</span></div>
          <div class="row"><span class="row-label">戒备</span><span class="row-value">{{ t.戒备心 ?? 0 }}</span></div>
          <div class="row"><span class="row-label">双修</span><span class="row-value">{{ t.有效双修次数 ?? 0 }}次</span></div>
          <div class="row"><span class="row-label">怀孕</span><span class="row-value">{{ t.怀孕状态 || '—' }}</span></div>
          <div class="row"><span class="row-label">顾虑</span><span class="row-value">{{ t.主要顾虑 || '—' }}</span></div>
          <div v-if="t.风险标记?.length" class="row">
            <span class="row-label">风险</span>
            <span class="row-value"><span v-for="(r, i) in t.风险标记" :key="i" class="tag blue">{{ r }}</span></span>
          </div>
          <div class="row"><span class="row-label">备注</span><span class="row-value">{{ t.备注 || '—' }}</span></div>
        </div>
      </div>
    </div>
    <div v-else class="empty">暂无目标记录</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue';

interface TargetItem {
  姓名?: string;
  性别?: string;
  年龄?: string;
  身份?: string;
  场景来源?: string;
  综合等级?: string;
  综合评分?: number;
  关系阶段?: string;
  关系状态?: string;
  好感度?: number;
  戒备心?: number;
  有效双修次数?: number;
  怀孕状态?: string;
  主要顾虑?: string;
  是否被攻略?: boolean;
  风险标记?: string[];
  备注?: string;
  [key: string]: unknown;
}

const statData = inject<{ value: { 目标?: Record<string, TargetItem> } }>('statData');
const expandedSet = ref<Set<string>>(new Set());

const targets = computed(() => {
  const all = statData?.value?.目标 || {};
  return Object.values(all);
});

function isExpanded(name: string) {
  return expandedSet.value.has(name);
}

function toggle(name: string) {
  if (expandedSet.value.has(name)) {
    expandedSet.value.delete(name);
  } else {
    expandedSet.value.add(name);
  }
}
</script>
