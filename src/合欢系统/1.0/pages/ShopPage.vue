<template>
  <div>
    <div class="hh-page-header">
      <BackButton />
      <div class="hh-page-title">系统商城APP</div>
    </div>
    <div class="hh-content">
      <div class="hh-small" style="margin-bottom: 12px;">{{ titleTip }}。选择数量后点击购买，会把购买指令追加写入输入框。</div>
      <div v-if="displayItems.length" v-for="([name, item], i) in displayItems" :key="name" class="hh-card">
        <div class="hh-card-title">{{ name }}</div>
        <div class="hh-row"><span class="hh-label">类型</span><span class="hh-value">{{ item.类型 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">价格</span><span class="hh-value">{{ item.价格 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">效果</span><span class="hh-value">{{ item.效果 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">时长</span><span class="hh-value">{{ item.持续时间 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">限制</span><span class="hh-value">{{ item.使用限制 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">推荐</span><span class="hh-value">{{ item.推荐理由 || '已解锁商品' }}</span></div>
        <div class="hh-buy">
          <input
            class="hh-qty"
            type="number"
            min="1"
            :value="quantities[i] || 1"
            @input="(e) => updateQuantity(i, (e.target as HTMLInputElement).value)"
            placeholder="数量"
          />
          <button class="hh-buybtn" @click="handleBuy(name, item.价格, quantities[i] || 1)">购买</button>
        </div>
      </div>
      <div v-else class="hh-empty">暂无商品</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import BackButton from '../components/BackButton.vue';
import { setSTInput } from '../utils';

interface ItemData {
  类型?: string;
  价格?: string;
  效果?: string;
  持续时间?: string;
  使用限制?: string;
  推荐理由?: string;
}

interface StatData {
  商城?: {
    本轮推荐商品?: Record<string, ItemData>;
    已解锁商品?: Record<string, ItemData>;
  };
}

const statData = inject<{ value: StatData }>('statData');
const quantities = ref<Record<number, number>>({});

const displayItems = computed(() => {
  const shop = statData?.value?.商城 || {};
  let items = Object.entries(shop.本轮推荐商品 || {});
  if (!items.length) {
    items = Object.entries(shop.已解锁商品 || {});
  }
  return items.slice(0, 8);
});

const titleTip = computed(() => {
  const shop = statData?.value?.商城 || {};
  return shop.本轮推荐商品 && Object.keys(shop.本轮推荐商品).length ? '本轮动态推荐商品' : '暂无本轮推荐，显示已解锁商品';
});

function updateQuantity(index: number, value: string) {
  const num = Math.max(1, Math.floor(Number(value) || 1));
  quantities.value[index] = num;
}

function handleBuy(item: string, price: unknown, quantity: number) {
  const q = Math.min(99, Math.max(1, quantity));
  setSTInput(
    `购买商城物品：${item}\n购买数量：${q}\n单价：${price}合欢值\n请检查我的合欢值是否足够，若足够则扣除对应合欢值并把物品加入背包；若不足，请由系统精灵提示余额不足。`,
    'append',
  );
}
</script>
