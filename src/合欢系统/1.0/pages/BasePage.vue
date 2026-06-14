<template>
  <div>
    <div class="hh-page-header">
      <BackButton />
      <div class="hh-page-title">据点APP</div>
    </div>
    <div class="hh-content">
      <div v-if="bases.length" v-for="b in bases" :key="b.名称" class="hh-card">
        <div class="hh-card-title">{{ b.名称 || '未知' }}</div>
        <div class="hh-row"><span class="hh-label">类型/等级</span><span class="hh-value">{{ b.类型 || '—' }} Lv.{{ b.等级 || 0 }}</span></div>
        <div class="hh-row"><span class="hh-label">地点</span><span class="hh-value">{{ b.地点 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">隐蔽/豪华</span><span class="hh-value">{{ b.隐蔽度 || '—' }}/{{ b.豪华度 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">容纳</span><span class="hh-value">{{ b.容纳人数 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">功能</span><span class="hh-value">{{ formatArray(b.功能) }}</span></div>
        <div class="hh-row"><span class="hh-label">维护</span><span class="hh-value">{{ b.维护成本 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">风险</span><span class="hh-value">{{ b.风险等级 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">负责人</span><span class="hh-value">{{ b.负责人 || '—' }}</span></div>
      </div>
      <div v-else class="hh-empty">暂无宗门据点</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import BackButton from '../components/BackButton.vue';

interface BaseData {
  名称?: string;
  类型?: string;
  等级?: number;
  地点?: string;
  隐蔽度?: string;
  豪华度?: string;
  容纳人数?: string;
  功能?: string[];
  维护成本?: string;
  风险等级?: string;
  负责人?: string;
}

interface StatData {
  宗门?: {
    据点?: Record<string, BaseData>;
  };
}

const statData = inject<{ value: StatData }>('statData');

const bases = computed(() => Object.values(statData?.value?.宗门?.据点 || {}));

function formatArray(arr: unknown): string {
  if (Array.isArray(arr)) return arr.join('、');
  return String(arr || '—');
}
</script>
