<template>
  <div>
    <div class="hh-page-header">
      <BackButton />
      <div class="hh-page-title">宗门APP</div>
    </div>
    <div class="hh-content">
      <div class="hh-card">
        <div class="hh-card-title">{{ sect.宗门名称 || '现代合欢宗' }}</div>
        <div class="hh-row"><span class="hh-label">路线</span><span class="hh-value">{{ displayValue(sect.当前路线) }}</span></div>
        <div class="hh-row"><span class="hh-label">资金</span><span class="hh-value">{{ displayValue(sect.宗门资金) }}</span></div>
        <div class="hh-row"><span class="hh-label">规模</span><span class="hh-value">{{ displayValue(sect.宗门规模) }}</span></div>
        <div class="hh-row"><span class="hh-label">实际成员</span><span class="hh-value">{{ memberCount }}</span></div>
        <div class="hh-row"><span class="hh-label">据点数</span><span class="hh-value">{{ baseCount }}</span></div>
        <div class="hh-row"><span class="hh-label">产业数</span><span class="hh-value">{{ industryCount }}</span></div>
        <div class="hh-row"><span class="hh-label">影响力</span><span class="hh-value">{{ displayValue(sect.影响力) }}</span></div>
        <div class="hh-row"><span class="hh-label">隐蔽度</span><span class="hh-value">{{ displayValue(sect.隐蔽度) }}</span></div>
        <div class="hh-row"><span class="hh-label">稳定度</span><span class="hh-value">{{ displayValue(sect.稳定度) }}</span></div>
        <div class="hh-row"><span class="hh-label">现代化</span><span class="hh-value">{{ displayValue(sect.现代化指数) }}</span></div>
        <div class="hh-row"><span class="hh-label">理念</span><span class="hh-value">{{ displayValue(sect.宗门理念) }}</span></div>
      </div>
      <div class="hh-card">
        <div class="hh-card-title">制度</div>
        <div class="hh-row"><span class="hh-label">保密</span><span class="hh-value">{{ displayValue(sect.制度?.保密制度) }}</span></div>
        <div class="hh-row"><span class="hh-label">贡献</span><span class="hh-value">{{ displayValue(sect.制度?.贡献制度) }}</span></div>
        <div class="hh-row"><span class="hh-label">晋升</span><span class="hh-value">{{ displayValue(sect.制度?.晋升制度) }}</span></div>
        <div class="hh-row"><span class="hh-label">奖惩</span><span class="hh-value">{{ displayValue(sect.制度?.奖惩制度) }}</span></div>
        <div class="hh-row"><span class="hh-label">退出</span><span class="hh-value">{{ displayValue(sect.制度?.退出机制) }}</span></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import BackButton from '../components/BackButton.vue';
import { displayValue } from '../utils';

interface SectData {
  宗门名称?: string;
  当前路线?: string;
  宗门资金?: string;
  宗门规模?: string;
  影响力?: string;
  隐蔽度?: string;
  稳定度?: string;
  现代化指数?: string;
  宗门理念?: string;
  成员?: Record<string, unknown>;
  据点?: Record<string, unknown>;
  产业?: Record<string, unknown>;
  制度?: {
    保密制度?: string;
    贡献制度?: string;
    晋升制度?: string;
    奖惩制度?: string;
    退出机制?: string;
  };
}

interface StatData {
  宗门?: SectData;
}

const statData = inject<{ value: StatData }>('statData');

const sect = computed(() => statData?.value?.宗门 || {});
const memberCount = computed(() => Object.keys(sect.value.成员 || {}).length);
const baseCount = computed(() => Object.keys(sect.value.据点 || {}).length);
const industryCount = computed(() => Object.keys(sect.value.产业 || {}).length);
</script>
