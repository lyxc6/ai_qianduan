<template>
  <div>
    <div class="hh-page-header">
      <BackButton />
      <div class="hh-page-title">后代APP</div>
    </div>
    <div class="hh-content">
      <div v-if="children.length" v-for="k in children" :key="k.姓名" class="hh-card">
        <div class="hh-card-title">{{ k.姓名 }}</div>
        <div class="hh-row"><span class="hh-label">母亲</span><span class="hh-value">{{ k.母亲 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">父亲</span><span class="hh-value">{{ k.父亲 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">受孕</span><span class="hh-value">{{ k.受孕时间 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">出生</span><span class="hh-value">{{ k.出生时间 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">状态</span><span class="hh-value">{{ k.当前状态 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">年龄/性别</span><span class="hh-value">{{ k.年龄 || '—' }}｜{{ k.性别 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">继承</span><span class="hh-value">{{ k.继承特征 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">备注</span><span class="hh-value">{{ k.备注 || '—' }}</span></div>
      </div>
      <div v-else class="hh-empty">暂无后代记录</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import BackButton from '../components/BackButton.vue';

interface ChildData {
  姓名?: string;
  母亲?: string;
  父亲?: string;
  受孕时间?: string;
  出生时间?: string;
  当前状态?: string;
  年龄?: number;
  性别?: string;
  继承特征?: string;
  备注?: string;
}

interface StatData {
  后代?: Record<string, ChildData>;
}

const statData = inject<{ value: StatData }>('statData');

const children = computed(() => {
  return Object.values(statData?.value?.后代 || {});
});
</script>
