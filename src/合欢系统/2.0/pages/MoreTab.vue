<template>
  <div>
    <div class="group">
      <div class="group-header" :class="{ expanded: expanded1 }" @click="expanded1 = !expanded1">
        <i class="fa-solid fa-chevron-right"></i>
        <span>背包 ({{ bagCount }})</span>
      </div>
      <div v-if="expanded1" class="group-body">
        <div v-if="bagCount > 0">
          <div v-for="(item, name) in bagItems" :key="String(name)" class="row">
            <span class="row-label">{{ name }}</span>
            <span class="row-value">×{{ item.数量 ?? 0 }}</span>
          </div>
        </div>
        <div v-else class="empty">背包为空</div>
      </div>
    </div>

    <div class="group">
      <div class="group-header" :class="{ expanded: expanded2 }" @click="expanded2 = !expanded2">
        <i class="fa-solid fa-chevron-right"></i>
        <span>后代 ({{ childCount }})</span>
      </div>
      <div v-if="expanded2" class="group-body">
        <div v-if="childCount > 0">
          <div v-for="(child, name) in childItems" :key="String(name)" class="row">
            <span class="row-label">{{ child.姓名 || String(name) }}</span>
            <span class="row-value">{{ child.当前状态 || '—' }}</span>
          </div>
        </div>
        <div v-else class="empty">暂无记录</div>
      </div>
    </div>

    <div class="group">
      <div class="group-header" :class="{ expanded: expanded3 }" @click="expanded3 = !expanded3">
        <i class="fa-solid fa-chevron-right"></i>
        <span>宗门</span>
      </div>
      <div v-if="expanded3" class="group-body">
        <div class="row"><span class="row-label">名称</span><span class="row-value accent">{{ sect.宗门名称 || '—' }}</span></div>
        <div class="row"><span class="row-label">路线</span><span class="row-value">{{ sect.当前路线 || '—' }}</span></div>
        <div class="row"><span class="row-label">资金</span><span class="row-value">{{ sect.宗门资金 ?? 0 }}</span></div>
        <div class="row"><span class="row-label">规模</span><span class="row-value">{{ sect.宗门规模 ?? 0 }}</span></div>
        <div class="row"><span class="row-label">影响力</span><span class="row-value">{{ sect.影响力 ?? '—' }}</span></div>
        <div class="row"><span class="row-label">隐蔽度</span><span class="row-value">{{ sect.隐蔽度 ?? '—' }}</span></div>
        <div class="row"><span class="row-label">稳定度</span><span class="row-value">{{ sect.稳定度 ?? '—' }}</span></div>
      </div>
    </div>

    <div class="group">
      <div class="group-header" :class="{ expanded: expanded4 }" @click="expanded4 = !expanded4">
        <i class="fa-solid fa-chevron-right"></i>
        <span>商城</span>
      </div>
      <div v-if="expanded4" class="group-body">
        <div class="row"><span class="row-label">已解锁</span><span class="row-value">{{ unlockedCount }}</span></div>
        <div class="row"><span class="row-label">推荐商品</span><span class="row-value">{{ recommendedCount }}</span></div>
        <div v-if="recommendedCount > 0" style="margin-top: 8px;">
          <div v-for="(item, name) in recommendedItems" :key="String(name)" class="row">
            <span class="row-label">{{ name }}</span>
            <span class="row-value accent">{{ item.价格 ?? '—' }}点</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue';

const expanded1 = ref(false);
const expanded2 = ref(false);
const expanded3 = ref(false);
const expanded4 = ref(false);

const statData = inject<{ value: Record<string, Record<string, unknown>> }>('statData');

const bagItems = computed(() => (statData?.value?.背包 || {}) as Record<string, { 数量?: number }>);
const bagCount = computed(() => Object.keys(bagItems.value).length);

const childItems = computed(() => (statData?.value?.后代 || {}) as Record<string, { 姓名?: string; 当前状态?: string }>);
const childCount = computed(() => Object.keys(childItems.value).length);

const sect = computed(() => (statData?.value?.宗门 || {}) as Record<string, unknown>);

const shop = computed(() => (statData?.value?.商城 || {}) as Record<string, Record<string, unknown>>);
const unlockedCount = computed(() => Object.keys(shop.value?.已解锁商品 || {}).length);
const recommendedCount = computed(() => Object.keys(shop.value?.本轮推荐商品 || {}).length);
const recommendedItems = computed(() => (shop.value?.本轮推荐商品 || {}) as Record<string, { 价格?: number }>);
</script>
