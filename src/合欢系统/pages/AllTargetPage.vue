<template>
  <div>
    <div class="hh-page-header">
      <BackButton />
      <div class="hh-page-title">全部目标APP</div>
    </div>
    <div class="hh-content">
      <div class="hh-summary">
        共 {{ targets.length }} 位目标
      </div>
      <div v-if="targets.length" v-for="t in targets" :key="t.姓名" class="hh-card">
        <div class="hh-card-title">
          {{ t.姓名 }}
          <span v-if="t.是否被攻略" class="hh-tag-green">已攻略</span>
          <span v-if="t.是否在场" class="hh-tag-blue">在场</span>
        </div>
        <div class="hh-row"><span class="hh-label">年龄</span><span class="hh-value">{{ displayValue(t.年龄) }}</span></div>
        <div class="hh-row"><span class="hh-label">性别</span><span class="hh-value">{{ displayValue(t.性别) }}</span></div>
        <div class="hh-row"><span class="hh-label">身份</span><span class="hh-value">{{ displayValue(t.身份) }}</span></div>
        <div class="hh-row"><span class="hh-label">场景</span><span class="hh-value">{{ displayValue(t.场景来源) }}</span></div>
        <div class="hh-row"><span class="hh-label">综合</span><span class="hh-value">{{ t.综合等级 || '—' }} / {{ displayValue(t.综合评分) }}</span></div>
        <div class="hh-row"><span class="hh-label">容貌</span><span class="hh-value">{{ displayValue(t.容貌) }}</span></div>
        <div class="hh-row"><span class="hh-label">气质</span><span class="hh-value">{{ displayValue(t.气质) }}</span></div>
        <div class="hh-row"><span class="hh-label">身材</span><span class="hh-value">{{ displayValue(t.身材) }}</span></div>
        <div class="hh-row"><span class="hh-label">性取向</span><span class="hh-value">{{ displayValue(t.性取向) }}</span></div>
        <div class="hh-row"><span class="hh-label">喜好</span><span class="hh-value">{{ displayValue(t.喜好类型) }}</span></div>
        <div class="hh-row"><span class="hh-label">亲密边界</span><span class="hh-value">{{ displayValue(t.亲密边界) }}</span></div>
        <div class="hh-row"><span class="hh-label">关系限制</span><span class="hh-value">{{ displayValue(t.当前关系限制) }}</span></div>
        <div class="hh-row"><span class="hh-label">顾虑</span><span class="hh-value">{{ displayValue(t.主要顾虑) }}</span></div>
        <div class="hh-row"><span class="hh-label">关系</span><span class="hh-value">{{ t.关系阶段 }}｜{{ t.关系状态 }}</span></div>
        <div class="hh-row"><span class="hh-label">好感/戒备</span><span class="hh-value">{{ displayValue(t.好感度) }}/{{ displayValue(t.戒备心) }}</span></div>
        <div class="hh-row"><span class="hh-label">双修次数</span><span class="hh-value">{{ displayValue(t.有效双修次数) }}</span></div>
        <div class="hh-row"><span class="hh-label">首次</span><span class="hh-value">{{ t.是否首次性行为者 ? '是' : '否' }}</span></div>
        <div class="hh-row"><span class="hh-label">怀孕</span><span class="hh-value">{{ displayValue(t.怀孕状态) }}</span></div>
        <div class="hh-row"><span class="hh-label">衣着</span><span class="hh-value">{{ displayValue(t.全身衣着信息) }}</span></div>
        <div class="hh-row"><span class="hh-label">身体</span><span class="hh-value">{{ displayValue(t.全身肉体信息) }}</span></div>
        <div class="hh-row"><span class="hh-label">心里话</span><span class="hh-value">{{ displayValue(t.心里话) }}</span></div>
        <div v-if="t.风险标记?.length" class="hh-row">
          <span class="hh-label">风险</span>
          <span class="hh-value" v-html="t.风险标记.map((x: string) => `<span class='hh-tag'>${x}</span>`).join('')"></span>
        </div>
        <div v-if="t.社交圈连接?.length" class="hh-row">
          <span class="hh-label">社交圈</span>
          <span class="hh-value">{{ t.社交圈连接.join('、') }}</span>
        </div>
        <div class="hh-row"><span class="hh-label">备注</span><span class="hh-value">{{ displayValue(t.备注) }}</span></div>
      </div>
      <div v-else class="hh-empty">尚未记录任何目标</div>
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
  目标?: Record<string, TargetData>;
}

const statData = inject<{ value: StatData }>('statData');

const targets = computed(() => {
  const allTargets = statData?.value?.目标 || {};
  return Object.values(allTargets);
});
</script>

<style lang="scss" scoped>
.hh-summary {
  background: rgba(236, 72, 153, 0.1);
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 12px;
  color: #be185d;
  font-weight: 600;
}

.hh-tag-green {
  display: inline-block;
  background: rgba(16, 185, 129, 0.2);
  color: #059669;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 10px;
  margin-left: 8px;
}

.hh-tag-blue {
  display: inline-block;
  background: rgba(59, 130, 246, 0.2);
  color: #2563eb;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 10px;
  margin-left: 8px;
}
</style>
