<template>
  <div>
    <div class="hh-page-header">
      <BackButton />
      <div class="hh-page-title">{{ pageTitle }}</div>
    </div>
    <div class="hh-content">
      <div v-if="targets.length" v-for="t in targets" :key="t.姓名" class="hh-card">
        <div class="hh-card-title">{{ t.姓名 }}</div>
        <div class="hh-row"><span class="hh-label">年龄</span><span class="hh-value">{{ t.年龄 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">性别</span><span class="hh-value">{{ t.性别 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">身份</span><span class="hh-value">{{ t.身份 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">场景</span><span class="hh-value">{{ t.场景来源 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">综合</span><span class="hh-value">{{ t.综合等级 || '—' }} / {{ t.综合评分 || 0 }}</span></div>
        <div class="hh-row"><span class="hh-label">容貌</span><span class="hh-value">{{ t.容貌 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">气质</span><span class="hh-value">{{ t.气质 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">身材</span><span class="hh-value">{{ t.身材 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">性取向</span><span class="hh-value">{{ t.性取向 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">喜好</span><span class="hh-value">{{ t.喜好类型 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">亲密边界</span><span class="hh-value">{{ t.亲密边界 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">关系限制</span><span class="hh-value">{{ t.当前关系限制 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">顾虑</span><span class="hh-value">{{ t.主要顾虑 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">关系</span><span class="hh-value">{{ t.关系阶段 }}｜{{ t.关系状态 }}</span></div>
        <div class="hh-row"><span class="hh-label">好感/戒备</span><span class="hh-value">{{ t.好感度 }}/{{ t.戒备心 }}</span></div>
        <div class="hh-row"><span class="hh-label">双修次数</span><span class="hh-value">{{ t.有效双修次数 || 0 }}</span></div>
        <div class="hh-row"><span class="hh-label">首次</span><span class="hh-value">{{ t.是否首次性行为者 ? '是' : '否' }}</span></div>
        <div class="hh-row"><span class="hh-label">攻略</span><span class="hh-value">{{ t.是否被攻略 ? '已攻略' : '未攻略' }}</span></div>
        <div class="hh-row"><span class="hh-label">怀孕</span><span class="hh-value">{{ t.怀孕状态 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">衣着</span><span class="hh-value">{{ t.全身衣着信息 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">身体</span><span class="hh-value">{{ t.全身肉体信息 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">心里话</span><span class="hh-value">{{ t.心里话 || '—' }}</span></div>
        <div v-if="t.风险标记?.length" class="hh-row">
          <span class="hh-label">风险</span>
          <span class="hh-value" v-html="t.风险标记.map((x: string) => `<span class='hh-tag'>${x}</span>`).join('')"></span>
        </div>
        <div v-if="t.社交圈连接?.length" class="hh-row">
          <span class="hh-label">社交圈</span>
          <span class="hh-value">{{ t.社交圈连接.join('、') }}</span>
        </div>
        <div class="hh-row"><span class="hh-label">备注</span><span class="hh-value">{{ t.备注 || '—' }}</span></div>
      </div>
      <div v-else class="hh-empty">{{ emptyText }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import BackButton from '../components/BackButton.vue';

interface TargetData {
  姓名?: string;
  性别?: string;
  年龄?: number;
  身份?: string;
  场景来源?: string;
  性取向?: string;
  喜好类型?: string;
  亲密边界?: string;
  当前关系限制?: string;
  主要顾虑?: string;
  社交圈连接?: string[];
  全身衣着信息?: string;
  全身肉体信息?: string;
  心里话?: string;
  是否被攻略?: boolean;
  怀孕状态?: string;
  是否在场?: boolean;
  容貌?: string;
  气质?: string;
  身材?: string;
  综合评分?: number;
  综合等级?: string;
  是否首次性行为者?: boolean;
  有效双修次数?: number;
  关系阶段?: string;
  关系状态?: string;
  好感度?: number;
  戒备心?: number;
  风险标记?: string[];
  备注?: string;
}

interface StatData {
  用户?: { 性别?: string };
  目标?: Record<string, TargetData>;
}

const statData = inject<{ value: StatData }>('statData');

const userMode = computed(() => {
  const sex = String(statData?.value?.用户?.性别 || '');
  if (sex.includes('男')) return { target: '女性', label: '在场女性APP', empty: '当前没有记录在场女性' };
  if (sex.includes('女')) return { target: '男性', label: '在场男性APP', empty: '当前没有记录在场男性' };
  return { target: '', label: '在场目标APP', empty: '当前没有记录在场目标' };
});

const pageTitle = computed(() => userMode.value.label);
const emptyText = computed(() => userMode.value.empty);

const targets = computed(() => {
  const allTargets = statData?.value?.目标 || {};
  const m = userMode.value;
  return Object.values(allTargets).filter(
    t => t.是否在场 && (!m.target || String(t.性别 || '').includes(m.target[0])),
  );
});
</script>
