<template>
  <div>
    <div v-if="targets.length">
      <div v-for="t in targets" :key="t.姓名" class="group">
        <div class="group-header" :class="{ expanded: isExpanded(t.姓名!) }" @click="toggle(t.姓名!)">
          <i class="fa-solid fa-chevron-right"></i>
          <span>{{ t.姓名 }}</span>
          <span v-if="t.是否被攻略" class="tag tag-green" style="margin-left: auto;">已攻略</span>
          <span v-if="t.是否在场" class="tag tag-blue">在场</span>
        </div>
        <div v-if="isExpanded(t.姓名!)" class="group-body">
          <div class="section-label">基本信息</div>
          <div class="row"><span class="row-label">性别</span><span class="row-value">{{ t.性别 || '—' }}</span></div>
          <div class="row"><span class="row-label">年龄</span><span class="row-value">{{ t.年龄 || '—' }}</span></div>
          <div class="row"><span class="row-label">身份</span><span class="row-value">{{ t.身份 || '—' }}</span></div>
          <div class="row"><span class="row-label">场景</span><span class="row-value">{{ t.场景来源 || '—' }}</span></div>

          <div class="section-label">属性评分</div>
          <div class="row"><span class="row-label">综合</span><span class="row-value accent">{{ t.综合等级 || '—' }} / {{ t.综合评分 ?? 0 }}</span></div>
          <div class="row"><span class="row-label">容貌</span><span class="row-value">{{ t.容貌 ?? '—' }}</span></div>
          <div class="row"><span class="row-label">气质</span><span class="row-value">{{ t.气质 ?? '—' }}</span></div>
          <div class="row"><span class="row-label">身材</span><span class="row-value">{{ t.身材 ?? '—' }}</span></div>

          <div class="section-label">关系</div>
          <div class="row"><span class="row-label">关系阶段</span><span class="row-value accent">{{ t.关系阶段 || '—' }}</span></div>
          <div class="row"><span class="row-label">关系状态</span><span class="row-value">{{ t.关系状态 || '—' }}</span></div>
          <div class="row"><span class="row-label">好感度</span><span class="row-value accent">{{ t.好感度 ?? 0 }}</span></div>
          <div class="row"><span class="row-label">戒备心</span><span class="row-value">{{ t.戒备心 ?? 0 }}</span></div>
          <div class="row"><span class="row-label">双修次数</span><span class="row-value">{{ t.有效双修次数 ?? 0 }}</span></div>
          <div class="row"><span class="row-label">首次</span><span class="row-value">{{ t.是否首次性行为者 ? '是' : '否' }}</span></div>

          <div class="section-label">偏好</div>
          <div class="row"><span class="row-label">性取向</span><span class="row-value">{{ t.性取向 || '—' }}</span></div>
          <div class="row"><span class="row-label">喜好类型</span><span class="row-value">{{ t.喜好类型 || '—' }}</span></div>
          <div class="row"><span class="row-label">亲密边界</span><span class="row-value">{{ t.亲密边界 || '—' }}</span></div>
          <div class="row"><span class="row-label">主要顾虑</span><span class="row-value">{{ t.主要顾虑 || '—' }}</span></div>
          <div class="row"><span class="row-label">关系限制</span><span class="row-value">{{ t.当前关系限制 || '—' }}</span></div>

          <div class="section-label">状态</div>
          <div class="row"><span class="row-label">怀孕</span><span class="row-value">{{ t.怀孕状态 || '—' }}</span></div>
          <div class="row"><span class="row-label">攻略</span><span class="row-value">{{ t.是否被攻略 ? '已攻略' : '未攻略' }}</span></div>
          <div class="row"><span class="row-label">在场</span><span class="row-value">{{ t.是否在场 ? '是' : '否' }}</span></div>

          <div class="section-label">外观</div>
          <div class="row"><span class="row-label">衣着</span><span class="row-value">{{ t.全身衣着信息 || '—' }}</span></div>
          <div class="row"><span class="row-label">身体</span><span class="row-value">{{ t.全身肉体信息 || '—' }}</span></div>
          <div class="row"><span class="row-label">心里话</span><span class="row-value">{{ t.心里话 || '—' }}</span></div>

          <div v-if="t.社交圈连接?.length" class="section-label">社交圈</div>
          <div v-if="t.社交圈连接?.length" style="padding: 4px 0;">
            <span v-for="(s, i) in t.社交圈连接" :key="i" class="tag">{{ s }}</span>
          </div>

          <div v-if="t.风险标记?.length" class="section-label">风险标记</div>
          <div v-if="t.风险标记?.length" style="padding: 4px 0;">
            <span v-for="(r, i) in t.风险标记" :key="i" class="tag tag-blue">{{ r }}</span>
          </div>

          <div class="section-label">备注</div>
          <div class="row"><span class="row-value" style="color: #666;">{{ t.备注 || '—' }}</span></div>
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
  性取向?: string;
  喜好类型?: string;
  亲密边界?: string;
  主要顾虑?: string;
  当前关系限制?: string;
  社交圈连接?: string[];
  全身衣着信息?: string;
  全身肉体信息?: string;
  心里话?: string;
  是否被攻略?: boolean;
  怀孕状态?: string;
  是否在场?: boolean;
  容貌?: number;
  气质?: number;
  身材?: number;
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
