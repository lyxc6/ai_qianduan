<template>
  <div>
    <div class="hh-page-header">
      <BackButton />
      <div class="hh-page-title">经营APP</div>
    </div>
    <div class="hh-tabs">
      <div
        class="hh-tab"
        :class="{ active: activeTab === 'assets' }"
        @click="activeTab = 'assets'"
      >
        资产
      </div>
      <div
        class="hh-tab"
        :class="{ active: activeTab === 'bases' }"
        @click="activeTab = 'bases'"
      >
        据点
      </div>
      <div
        class="hh-tab"
        :class="{ active: activeTab === 'industries' }"
        @click="activeTab = 'industries'"
      >
        产业
      </div>
    </div>
    <div class="hh-content">
      <template v-if="activeTab === 'assets'">
        <div class="hh-card">
          <div class="hh-card-title">宗门资产列表</div>
          <div v-if="assetsArray.length">
            <div v-for="(asset, key) in sectData?.资产" :key="key" class="hh-asset-item">
              <div class="hh-asset-name">{{ asset?.名称 || key }}</div>
              <div class="hh-asset-details">
                <span class="hh-detail-item">价值: {{ displayValue(asset?.价值) }}</span>
                <span class="hh-detail-item">所有者: {{ displayValue(asset?.所有者) }}</span>
                <span class="hh-detail-item">来源: {{ displayValue(asset?.来源) }}</span>
              </div>
            </div>
          </div>
          <div v-else class="hh-empty">暂无资产记录</div>
        </div>
        <div class="hh-card">
          <div class="hh-card-title">资产统计</div>
          <div class="hh-row"><span class="hh-label">资产总数</span><span class="hh-value">{{ assetsArray.length }}</span></div>
          <div class="hh-row"><span class="hh-label">资产总值</span><span class="hh-value">{{ totalAssetsValue }}</span></div>
          <div class="hh-row"><span class="hh-label">宗门资金</span><span class="hh-value">{{ displayValue(sectData?.宗门资金) }}</span></div>
        </div>
      </template>
      <template v-else-if="activeTab === 'bases'">
        <div v-if="bases.length" v-for="b in bases" :key="b.名称" class="hh-card">
          <div class="hh-card-title">{{ b.名称 || '未知' }}</div>
          <div class="hh-row"><span class="hh-label">类型/等级</span><span class="hh-value">{{ displayValue(b.类型) }} Lv.{{ displayValue(b.等级) }}</span></div>
          <div class="hh-row"><span class="hh-label">地点</span><span class="hh-value">{{ displayValue(b.地点) }}</span></div>
          <div class="hh-row"><span class="hh-label">豪华度</span><span class="hh-value">{{ displayValue(b.豪华度) }}</span></div>
          <div class="hh-row"><span class="hh-label">容纳</span><span class="hh-value">{{ displayValue(b.容纳人数) }}</span></div>
          <div class="hh-row"><span class="hh-label">功能</span><span class="hh-value">{{ formatArray(b.功能) }}</span></div>
          <div class="hh-row"><span class="hh-label">维护</span><span class="hh-value">{{ displayValue(b.维护成本) }}</span></div>
          <div class="hh-row"><span class="hh-label">负责人</span><span class="hh-value">{{ displayValue(b.负责人) }}</span></div>
        </div>
        <div v-else class="hh-empty">暂无宗门据点</div>
      </template>
      <template v-else>
        <div v-if="industries.length" v-for="x in industries" :key="x.名称" class="hh-card">
          <div class="hh-card-title">{{ x.名称 || '未知' }}</div>
          <div class="hh-row"><span class="hh-label">类型/等级</span><span class="hh-value">{{ displayValue(x.类型) }} Lv.{{ displayValue(x.等级) }}</span></div>
          <div class="hh-row"><span class="hh-label">负责人</span><span class="hh-value">{{ displayValue(x.负责人) }}</span></div>
          <div class="hh-row"><span class="hh-label">收益/成本</span><span class="hh-value">{{ displayValue(x.月收益) }}/{{ displayValue(x.维护成本) }}</span></div>
          <div class="hh-row"><span class="hh-label">招募/资源</span><span class="hh-value">{{ displayValue(x.招募效率) }}/{{ displayValue(x.资源价值) }}</span></div>
          <div class="hh-row"><span class="hh-label">关联据点</span><span class="hh-value">{{ displayValue(x.关联据点) }}</span></div>
        </div>
        <div v-else class="hh-empty">暂无宗门产业</div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import BackButton from '../components/BackButton.vue';
import { displayValue } from '../utils';

interface BaseData {
  名称?: string;
  类型?: string;
  等级?: number;
  地点?: string;
  豪华度?: string;
  容纳人数?: string;
  功能?: string[];
  维护成本?: string;
  负责人?: string;
}

interface IndustryData {
  名称?: string;
  类型?: string;
  等级?: number;
  负责人?: string;
  月收益?: string;
  维护成本?: string;
  招募效率?: string;
  资源价值?: string;
  关联据点?: string;
}

interface AssetData {
  名称?: string;
  价值?: string;
  所有者?: string;
  来源?: string;
}

interface SectData {
  宗门资金?: string;
  宗门规模?: string;
  据点?: Record<string, BaseData>;
  产业?: Record<string, IndustryData>;
  成员?: Record<string, unknown>;
  资产?: Record<string, AssetData>;
}

interface UserData {
  现金?: string;
  合欢值?: string;
}

interface StatData {
  宗门?: SectData;
  用户?: UserData;
}

const statData = inject<{ value: StatData }>('statData');
const activeTab = ref<'assets' | 'bases' | 'industries'>('assets');

const sectData = computed(() => statData?.value?.宗门 || {});
const bases = computed(() => Object.values(sectData.value?.据点 || {}));
const industries = computed(() => Object.values(sectData.value?.产业 || {}));
const assetsArray = computed(() => Object.values(sectData.value?.资产 || {}));

const totalAssetsValue = computed(() => {
  const assets = sectData.value?.资产 || {};
  return Object.values(assets).reduce((sum, a) => sum + Number((a as AssetData)?.价值 || 0), 0);
});

function formatArray(arr: unknown): string {
  if (Array.isArray(arr)) return arr.join('、');
  return String(arr || '—');
}
</script>

<style scoped>
.hh-tabs {
  display: flex;
  padding: 0 16px;
  gap: 8px;
  margin-bottom: 12px;
}

.hh-tab {
  flex: 1;
  padding: 8px 16px;
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.hh-tab.active {
  background: rgba(255, 255, 255, 0.15);
}

.hh-asset-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
}

.hh-asset-name {
  font-weight: bold;
  margin-bottom: 8px;
  color: #f472b6;
}

.hh-asset-details {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hh-detail-item {
  font-size: 12px;
  color: #a78bfa;
}
</style>
