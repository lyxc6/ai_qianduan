<template>
  <div>
    <div class="hh-page-header">
      <BackButton />
      <div class="hh-page-title">主角信息APP</div>
    </div>
    <div class="hh-content">
      <div class="hh-card">
        <div class="hh-card-title">{{ user.姓名 || '未知角色' }}</div>
        <div class="hh-row"><span class="hh-label">性别</span><span class="hh-value">{{ user.性别 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">综合</span><span class="hh-value">{{ score }} / {{ level }}</span></div>
        <div class="hh-row"><span class="hh-label">容貌</span><span class="hh-value">{{ user.容貌 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">气质</span><span class="hh-value">{{ user.气质 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">身材</span><span class="hh-value">{{ user.身材 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">进度</span><span class="hh-value"><div class="hh-bar"><div class="hh-fill" :style="{ width: Math.min(100, score) + '%' }"></div></div></span></div>
      </div>

      <div class="hh-card">
        <div class="hh-card-title">数值</div>
        <div class="hh-row"><span class="hh-label">合欢值</span><span class="hh-value">{{ user.合欢值 || 0 }}</span></div>
        <div class="hh-row"><span class="hh-label">累计获得</span><span class="hh-value">{{ user.累计获得合欢值 || 0 }}</span></div>
        <div class="hh-row"><span class="hh-label">累计消费</span><span class="hh-value">{{ user.累计消费合欢值 || 0 }}</span></div>
        <div class="hh-row"><span class="hh-label">现金</span><span class="hh-value">{{ user.现金 || 0 }}</span></div>
        <div class="hh-row"><span class="hh-label">不同目标</span><span class="hh-value">{{ user.已有效双修不同目标数 || 0 }}</span></div>
        <div class="hh-row"><span class="hh-label">总次数</span><span class="hh-value">{{ user.有效双修总次数 || 0 }}</span></div>
      </div>

      <div v-if="milestones.length" class="hh-card">
        <div class="hh-card-title">已领取现金里程碑</div>
        <div class="hh-row"><span class="hh-value" v-html="milestonesHtml"></span></div>
      </div>

      <div v-if="statuses.length" class="hh-card">
        <div class="hh-card-title">当前状态</div>
        <div class="hh-row"><span class="hh-value" v-html="statusesHtml"></span></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import BackButton from '../components/BackButton.vue';

interface StatData {
  用户?: {
    姓名?: string;
    性别?: string;
    综合评分?: number;
    综合等级?: string;
    容貌?: string;
    气质?: string;
    身材?: string;
    合欢值?: number;
    累计获得合欢值?: number;
    累计消费合欢值?: number;
    现金?: number;
    已有效双修不同目标数?: number;
    有效双修总次数?: number;
    已领取现金里程碑?: string[];
    当前生效状态?: string[];
  };
}

const statData = inject<{ value: StatData }>('statData');

const user = computed(() => statData?.value?.用户 || {});
const score = computed(() => Number(user.value.综合评分 || 0));
const level = computed(() => user.value.综合等级 || grade(score.value));
const statuses = computed(() => user.value.当前生效状态 || []);
const milestones = computed(() => user.value.已领取现金里程碑 || []);
const statusesHtml = computed(() => statuses.value.map(x => `<span class="hh-tag">${x}</span>`).join(''));
const milestonesHtml = computed(() => milestones.value.map(x => `<span class="hh-tag">${x}</span>`).join(''));

function grade(n: number): string {
  return n >= 95 ? 'S' : n >= 85 ? 'A' : n >= 75 ? 'B' : n >= 65 ? 'C' : n >= 55 ? 'D' : n >= 45 ? 'E' : '不入流';
}
</script>
