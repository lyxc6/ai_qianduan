<template>
  <div>
    <div class="hh-page-header">
      <BackButton />
      <div class="hh-page-title">成员管理APP</div>
    </div>
    <div class="hh-content">
      <div v-for="m in members" :key="m.姓名" class="hh-card">
        <div class="hh-card-title">{{ m.姓名 || '未知' }}</div>
        <div class="hh-row"><span class="hh-label">层级</span><span class="hh-value">{{ m.层级 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">职位</span><span class="hh-value">{{ m.当前职位 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">忠诚/能力</span><span class="hh-value">{{ m.忠诚度 || '—' }}/{{ m.能力值 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">贡献</span><span class="hh-value">{{ m.贡献值 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">野心/泄密</span><span class="hh-value">{{ m.野心 || '—' }}/{{ m.泄密风险 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">领域</span><span class="hh-value">{{ formatArray(m.擅长领域) }}</span></div>
        <div class="hh-row"><span class="hh-label">知晓系统</span><span class="hh-value">{{ m.是否知晓系统 ? '是' : '否' }}</span></div>
        <div class="hh-row"><span class="hh-label">来源</span><span class="hh-value">{{ m.来源目标 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">状态</span><span class="hh-value">{{ m.状态 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">备注</span><span class="hh-value">{{ m.备注 || '—' }}</span></div>
      </div>
      <div v-if="jobs.length" class="hh-card">
        <div class="hh-card-title">岗位总览</div>
        <div v-for="j in jobs" :key="j.岗位名称" class="hh-card" style="margin-top: 8px; padding: 8px;">
          <div class="hh-card-title">{{ j.岗位名称 }}</div>
          <div class="hh-row"><span class="hh-label">任职者</span><span class="hh-value">{{ j.任职者 || '—' }}</span></div>
          <div class="hh-row"><span class="hh-label">职责</span><span class="hh-value">{{ j.职责 || '—' }}</span></div>
          <div class="hh-row"><span class="hh-label">效率/风险</span><span class="hh-value">{{ j.效率 || '—' }}/{{ j.风险 || '—' }}</span></div>
          <div class="hh-row"><span class="hh-label">备注</span><span class="hh-value">{{ j.备注 || '—' }}</span></div>
        </div>
      </div>
      <div v-if="!members.length && !jobs.length" class="hh-empty">暂无成员，仅有岗位框架</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import BackButton from '../components/BackButton.vue';

interface MemberData {
  姓名?: string;
  层级?: string;
  当前职位?: string;
  忠诚度?: string;
  能力值?: string;
  贡献值?: string;
  野心?: string;
  泄密风险?: string;
  擅长领域?: string[];
  是否知晓系统?: boolean;
  状态?: string;
  来源目标?: string;
  备注?: string;
}

interface JobData {
  岗位名称?: string;
  任职者?: string;
  职责?: string;
  效率?: string;
  风险?: string;
  备注?: string;
}

interface StatData {
  宗门?: {
    成员?: Record<string, MemberData>;
    岗位?: Record<string, JobData>;
  };
}

const statData = inject<{ value: StatData }>('statData');

const members = computed(() => Object.values(statData?.value?.宗门?.成员 || {}));
const jobs = computed(() => Object.values(statData?.value?.宗门?.岗位 || {}));

function formatArray(arr: unknown): string {
  if (Array.isArray(arr)) return arr.join('、');
  return String(arr || '—');
}
</script>
