<template>
  <div>
    <div class="hh-page-header">
      <BackButton />
      <div class="hh-page-title">产业APP</div>
    </div>
    <div class="hh-content">
      <div v-if="industries.length" v-for="x in industries" :key="x.名称" class="hh-card">
        <div class="hh-card-title">{{ x.名称 || '未知' }}</div>
        <div class="hh-row"><span class="hh-label">类型/等级</span><span class="hh-value">{{ x.类型 || '—' }} Lv.{{ x.等级 || 0 }}</span></div>
        <div class="hh-row"><span class="hh-label">负责人</span><span class="hh-value">{{ x.负责人 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">收益/成本</span><span class="hh-value">{{ x.月收益 || '—' }}/{{ x.维护成本 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">外壳</span><span class="hh-value">{{ x.合法外壳强度 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">招募/资源</span><span class="hh-value">{{ x.招募效率 || '—' }}/{{ x.资源价值 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">风险</span><span class="hh-value">{{ x.风险等级 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">据点</span><span class="hh-value">{{ x.关联据点 || '—' }}</span></div>
      </div>
      <div v-else class="hh-empty">暂无宗门产业</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import BackButton from '../components/BackButton.vue';

interface IndustryData {
  名称?: string;
  类型?: string;
  等级?: number;
  负责人?: string;
  月收益?: string;
  维护成本?: string;
  合法外壳强度?: string;
  招募效率?: string;
  资源价值?: string;
  风险等级?: string;
  关联据点?: string;
}

interface StatData {
  宗门?: {
    产业?: Record<string, IndustryData>;
  };
}

const statData = inject<{ value: StatData }>('statData');

const industries = computed(() => Object.values(statData?.value?.宗门?.产业 || {}));
</script>
