<template>
  <div class="overview-grid">
    <!-- 灵田 -->
    <section class="card">
      <div class="card-title"><i class="fa-solid fa-seedling"></i> 灵田</div>
      <div class="stat-rows">
        <div class="stat-row">
          <span>灵田</span><b>{{ store.data.世界.灵田数量 }} 亩</b>
        </div>
        <div class="stat-row">
          <span>灵田等级</span><b>{{ store.data.世界.灵田等级 }} 级</b>
        </div>
        <div class="stat-row">
          <span>值守</span><b>{{ dutyGirls('灵田') || '无人值守' }}</b>
        </div>
      </div>
      <div class="divider"></div>

      <div v-if="plots.length" class="plot-list">
        <div v-for="plot in plots" :key="plot.name" class="plot-card">
          <div class="plot-head">
            <span class="plot-name">{{ plot.name }}</span>
            <span class="badge" :class="plotStateBadge(plot.状态)">{{ plot.状态 }}</span>
          </div>
          <div class="plot-crop">
            <span class="tag" :class="{ 'tag-idle': plot.作物 === '闲置' }">{{ plot.作物 }}</span>
            <span v-if="plot.种植日期" class="plot-date">{{ plot.种植日期 }} 播种</span>
          </div>
          <div class="plot-actions">
            <template v-if="plot.状态 === '空闲' || plot.状态 === '已收获'">
              <button
                v-for="crop in 作物选项"
                :key="crop"
                type="button"
                class="action-btn"
                :class="{ 'btn-confirming': confirming === plantKey(plot.name, crop) }"
                @click="doAction(plantKey(plot.name, crop), `掌门来到灵田区，在${plot.name}播种${crop}。`)"
              >
                {{ btnLabel(plantKey(plot.name, crop), '种' + crop) }}
              </button>
            </template>
            <button
              v-if="plot.状态 === '成熟'"
              type="button"
              class="action-btn"
              :class="{ 'btn-confirming': confirming === harvestKey(plot.name) }"
              @click="doAction(harvestKey(plot.name), `掌门来到灵田区，收获${plot.name}的${plot.作物}。`)"
            >
              {{ btnLabel(harvestKey(plot.name), '收获') }}
            </button>
          </div>
        </div>
      </div>
      <div v-else class="empty-state">灵田暂无地块记录，可先开垦新田</div>

      <div class="divider"></div>
      <div class="action-row">
        <button
          type="button"
          class="action-btn"
          :class="{ 'btn-confirming': confirming === 'reclaim' }"
          @click="doAction('reclaim', '掌门决定在灵田区新开垦一块灵田。')"
        >
          {{ btnLabel('reclaim', '开垦新田') }}
        </button>
        <button
          type="button"
          class="action-btn"
          :class="{ 'btn-confirming': confirming === 'upgrade-field' }"
          @click="doAction('upgrade-field', '掌门决定花费灵石升级灵田，提升灵田等级。')"
        >
          {{ btnLabel('upgrade-field', '升级灵田') }}
        </button>
      </div>
    </section>

    <!-- 丹房 -->
    <section class="card">
      <div class="card-title"><i class="fa-solid fa-mortar-pestle"></i> 丹房</div>
      <div class="stat-rows">
        <div class="stat-row">
          <span>丹炉</span><b>{{ store.data.世界.丹炉数量 }} 尊</b>
        </div>
        <div class="stat-row">
          <span>值守</span><b>{{ dutyGirls('丹房') || '无人值守' }}</b>
        </div>
      </div>
      <div class="divider"></div>
      <div v-for="recipe in 丹方" :key="recipe.name" class="recipe-row">
        <div class="recipe-info">
          <span class="recipe-name">{{ recipe.name }}</span>
          <span class="recipe-cost">成本 {{ recipe.cost }} · 售 {{ recipe.price }} 灵石</span>
        </div>
        <button
          type="button"
          class="action-btn"
          :class="{ 'btn-confirming': confirming === 'refine-' + recipe.name }"
          @click="doAction('refine-' + recipe.name, refineText(recipe.name))"
        >
          {{ btnLabel('refine-' + recipe.name, '炼制') }}
        </button>
      </div>
      <div class="divider"></div>
      <div class="action-row">
        <button
          type="button"
          class="action-btn"
          :class="{ 'btn-confirming': confirming === 'add-furnace' }"
          @click="doAction('add-furnace', '掌门决定为丹房添置一尊新的丹炉。')"
        >
          {{ btnLabel('add-furnace', '添置丹炉') }}
        </button>
      </div>
    </section>

    <!-- 悬赏阁 -->
    <section class="card">
      <div class="card-title"><i class="fa-solid fa-scroll"></i> 悬赏阁</div>
      <div v-if="quests.length" class="quest-list">
        <div v-for="quest in quests" :key="quest.name" class="quest-item">
          <div class="quest-head">
            <span class="quest-name">{{ quest.name }}</span>
            <span class="badge badge-duty">{{ quest.报酬 }} 灵石</span>
          </div>
          <div class="quest-desc">
            {{ quest.内容 }} · <span class="badge badge-realm">{{ quest.难度 }}</span>
          </div>
          <div class="quest-foot">
            <span class="quest-publisher">{{ quest.发布方 }}</span>
            <span class="badge" :class="questStateBadge(quest.状态)">{{ quest.状态 }}</span>
          </div>
          <div v-if="quest.状态 === '可接取'" class="quest-actions">
            <button
              type="button"
              class="action-btn"
              :class="{ 'btn-confirming': confirming === 'accept-' + quest.name }"
              @click="doAction('accept-' + quest.name, `掌门决定接下悬赏「${quest.name}」，报酬${quest.报酬}灵石。`)"
            >
              {{ btnLabel('accept-' + quest.name, '接取') }}
            </button>
          </div>
          <div v-else-if="quest.状态 === '进行中'" class="quest-actions">
            <button
              type="button"
              class="action-btn"
              :class="{ 'btn-confirming': confirming === 'settle-' + quest.name }"
              @click="
                doAction('settle-' + quest.name, `掌门前往云梦镇悬赏阁，提交「${quest.name}」的完成凭证，结算报酬。`)
              "
            >
              {{ btnLabel('settle-' + quest.name, '结算') }}
            </button>
          </div>
        </div>
      </div>
      <div v-else class="empty-state">悬赏阁暂无悬赏，可前往云梦镇看看新帖</div>
      <div class="divider"></div>
      <div class="biz-grid">
        <div class="biz-item">
          <div class="biz-name">悬赏类型</div>
          <div class="biz-desc">寻物 · 驱兽 · 护卫 · 除害 · 护送</div>
        </div>
        <div class="biz-item">
          <div class="biz-name">结算</div>
          <div class="biz-desc">完成得灵石与声望，失败赔押金</div>
        </div>
      </div>
    </section>

    <!-- 收徒与扩建 -->
    <section class="card">
      <div class="card-title"><i class="fa-solid fa-users"></i> 收徒与扩建</div>
      <div class="action-row">
        <button
          type="button"
          class="action-btn"
          :class="{ 'btn-confirming': confirming === 'recruit' }"
          @click="doAction('recruit', '掌门决定开山门收徒，考核品行与仙缘，扩充宗门弟子。')"
        >
          {{ btnLabel('recruit', '开山门收徒') }}
        </button>
      </div>
      <div class="divider"></div>
      <div v-for="item in 扩建项" :key="item.key" class="expand-row">
        <div class="expand-info">
          <span class="expand-name">{{ item.name }}</span>
          <span class="expand-level">{{ item.levelText }}</span>
        </div>
        <button
          type="button"
          class="action-btn"
          :class="{ 'btn-confirming': confirming === 'expand-' + item.key }"
          @click="doAction('expand-' + item.key, item.text)"
        >
          {{ btnLabel('expand-' + item.key, '扩建') }}
        </button>
      </div>
      <div class="divider"></div>
      <div class="stat-rows">
        <div class="stat-row"><span>扩建条件</span><b>灵石 + 剧情推进</b></div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDataStore } from '../store';
import { 发送行动 } from '../utils';

const store = useDataStore();
const confirming = ref<string | null>(null);

const 作物选项 = ['聚灵草', '灵稻', '药草'];

const 丹方 = [
  { name: '养气丹', cost: 10, price: 20 },
  { name: '聚灵丹', cost: 30, price: 60 },
  { name: '筑基丹', cost: 200, price: 500 },
  { name: '驻颜丹', cost: 150, price: 400 },
];

const plots = computed(() => Object.entries(store.data.世界.灵田地块).map(([name, data]) => ({ name, ...data })));

const quests = computed(() => Object.entries(store.data.世界.悬赏列表).map(([name, data]) => ({ name, ...data })));

const 扩建项 = computed(() => [
  {
    key: '灵田',
    name: '灵田升级',
    levelText: `当前 ${store.data.世界.灵田等级} 级`,
    text: '掌门决定花费灵石扩建灵田，提升灵田等级与产量。',
  },
  {
    key: '丹房',
    name: '丹房扩建',
    levelText: `丹炉 ${store.data.世界.丹炉数量} 尊`,
    text: '掌门决定扩建丹房，添置更多丹炉。',
  },
  {
    key: '藏经阁',
    name: '藏经阁扩建',
    levelText: `当前 ${store.data.世界.藏经阁等级} 级`,
    text: '掌门决定扩建藏经阁，收录更多功法与典籍。',
  },
  {
    key: '房舍',
    name: '弟子房舍',
    levelText: `当前 ${store.data.世界.弟子房舍等级} 级`,
    text: '掌门决定扩建弟子房舍，容纳更多弟子。',
  },
]);

function dutyGirls(duty: string): string {
  return Object.values(store.data.女修)
    .filter(girl => girl.宗门职务 === duty)
    .map(girl => girl.姓名)
    .filter(Boolean)
    .join('、');
}

/** 防误触：点击后按钮变「确认？」，450ms 内再次点击取消，超时自动发送 */
function doAction(key: string, text: string) {
  if (confirming.value === key) {
    confirming.value = null;
    return;
  }
  confirming.value = key;
  window.setTimeout(() => {
    if (confirming.value !== key) return;
    confirming.value = null;
    发送行动(text);
  }, 450);
}

function btnLabel(key: string, label: string): string {
  return confirming.value === key ? '确认？' : label;
}

function plantKey(plotName: string, crop: string): string {
  return `plant-${plotName}-${crop}`;
}

function harvestKey(plotName: string): string {
  return `harvest-${plotName}`;
}

function refineText(recipeName: string): string {
  const keeper = dutyGirls('丹房');
  return keeper
    ? `掌门来到丹房，让${keeper}炼制${recipeName}，药材与火耗由宗门账目支出。`
    : `掌门决定在丹房炼制${recipeName}，药材与火耗由宗门账目支出。`;
}

function plotStateBadge(state: string): string {
  if (state === '成熟') return 'badge-event';
  if (state === '生长中') return 'badge-realm';
  if (state === '已收获') return 'badge-stage';
  return 'badge-sect';
}

function questStateBadge(state: string): string {
  if (state === '进行中') return 'badge-affection';
  if (state === '已完成') return 'badge-event';
  if (state === '失败') return 'badge-realm-high';
  return 'badge-duty';
}
</script>
