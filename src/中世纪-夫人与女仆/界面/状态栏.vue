<template>
  <div class="lord-scroll">
    <header class="header-info">
      <div class="header-title">The Lord's Ledger</div>
      <div class="world-status">
        <div><i class="fas fa-calendar-alt"></i> <span>{{ worldTime }}</span></div>
        <div><i class="fas fa-map-marker-alt"></i> <span>{{ worldLocation }}</span></div>
      </div>
    </header>

    <div class="grid-container">
      <!-- 核心关系 -->
      <div class="section-box">
        <h3 class="section-title"><i class="fas fa-heart"></i> 核心关系</h3>
        <div class="relation-item" v-for="(data, name) in statData.角色" :key="name">
          <div class="char-header">
            <span>{{ name }}</span>
            <span class="favor-value">{{ data.好感度 ?? 0 }}</span>
          </div>
          <div class="char-status">{{ data.关系状态 ?? '' }}</div>
          <div class="progress-track">
            <div class="progress-fill" :style="{ width: Math.max(0, Math.min(100, data.好感度 ?? 0)) + '%' }"></div>
          </div>
        </div>
        <div v-if="!hasRelations" class="empty-hint">暂无记录</div>
      </div>

      <!-- 财政 -->
      <div class="section-box">
        <h3 class="section-title"><i class="fas fa-coins"></i> 领地财政</h3>
        <div class="currency-row" title="1金 = 20银 = 300铜">
          <div class="coin-group gold">
            <div class="coin-icon"></div> <span>{{ goldCoins }}</span>
          </div>
          <div class="coin-group silver">
            <div class="coin-icon"></div> <span>{{ silverCoins }}</span>
          </div>
          <div class="coin-group copper">
            <div class="coin-icon"></div> <span>{{ copperCoins }}</span>
          </div>
        </div>
        <div class="stat-row">
          <span>预计年净收入</span>
          <span class="card-sub" v-html="incomeDisplay"></span>
        </div>
        <div class="tax-note">*每年1月1日结算税收</div>
      </div>

      <!-- 领地 -->
      <div class="section-box">
        <h3 class="section-title"><i class="fas fa-chess-rook"></i> 领地概览</h3>
        <div class="scroll-list">
          <div class="list-card" v-for="(data, name) in statData.领地" :key="name" :title="data.描述 ?? ''">
            <span class="card-main"><i class="fas fa-map-marked-alt territory-icon"></i> {{ name }}</span>
            <span class="card-sub"><i class="fas fa-arrow-up"></i> {{ data.年净收入 ?? 0 }}</span>
          </div>
        </div>
        <div v-if="!hasTerritories" class="empty-hint">暂无记录</div>
      </div>

      <!-- 军队 -->
      <div class="section-box">
        <h3 class="section-title"><i class="fas fa-chess-knight"></i> 军队编制</h3>
        <div class="scroll-list">
          <div class="list-card" v-for="(data, name) in statData.军队" :key="name" :title="data.描述 ?? ''">
            <span class="card-main"><i class="fas fa-shield-alt army-icon"></i> {{ name }}</span>
            <span class="card-sub">{{ data.数量 ?? 0 }} 人</span>
          </div>
        </div>
        <div v-if="!hasArmies" class="empty-hint">暂无记录</div>
      </div>

      <!-- 外交 (全宽) -->
      <div class="section-box full-width">
        <h3 class="section-title"><i class="fas fa-handshake"></i> 外交态势</h3>
        <div class="diplomacy-grid">
          <div class="list-card" v-for="(data, name) in statData.外交" :key="name" :title="data.描述 ?? ''">
            <span class="card-main"><i class="fas fa-flag diplomacy-icon"></i> {{ name }}</span>
            <span class="card-sub">
              <span :class="['relation-badge', getRelClass(data.关系)]">{{ data.关系 ?? '未知' }}</span>
            </span>
          </div>
        </div>
        <div v-if="!hasDiplomacy" class="empty-hint">暂无记录</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

defineOptions({
  unusedWarnings: false,
});

interface CharacterData {
  好感度?: number;
  关系状态?: string;
  [key: string]: any;
}

interface TerritoryData {
  描述?: string;
  年净收入?: number;
}

interface ArmyData {
  描述?: string;
  数量?: number;
  类型?: string;
}

interface DiplomacyData {
  描述?: string;
  关系?: string;
  趋势?: string;
  上次互动?: string;
}

interface StatData {
  世界?: { 时间?: string; 地点?: string };
  角色?: Record<string, CharacterData>;
  经济?: { 铜币总额?: number; 年净收入?: number; 上次结算时间?: string };
  领地?: Record<string, TerritoryData>;
  军队?: Record<string, ArmyData>;
  外交?: Record<string, DiplomacyData>;
}

const statData = ref<StatData>({});
const worldTime = ref('--');
const worldLocation = ref('--');

const copperTotal = computed(() => statData.value.经济?.铜币总额 ?? 0);
const goldCoins = computed(() => Math.floor(copperTotal.value / 300));
const silverCoins = computed(() => Math.floor((copperTotal.value % 300) / 15));
const copperCoins = computed(() => copperTotal.value % 15);

const income = computed(() => statData.value.经济?.年净收入 ?? 0);
const incomeDisplay = computed(() => {
  const v = income.value;
  const cls = v >= 0 ? 'trend-up' : 'trend-down';
  const sign = v >= 0 ? '+' : '';
  return `<span class="${cls}">${sign}${v} 铜币/年</span>`;
});

const hasRelations = computed(() => statData.value.角色 && Object.keys(statData.value.角色).length > 0);
const hasTerritories = computed(() => statData.value.领地 && Object.keys(statData.value.领地).length > 0);
const hasArmies = computed(() => statData.value.军队 && Object.keys(statData.value.军队).length > 0);
const hasDiplomacy = computed(() => statData.value.外交 && Object.keys(statData.value.外交).length > 0);

function getRelClass(rel: string | undefined): string {
  if (!rel) return 'rel-neutral';
  if (rel === '敌对') return 'rel-hostile';
  if (rel === '紧张') return 'rel-hostile';
  if (rel === '平和' || rel === '盟友') return 'rel-peace';
  return 'rel-neutral';
}

function applyData(data: any) {
  statData.value = data || {};
  if (data?.世界?.时间) worldTime.value = data.世界.时间;
  if (data?.世界?.地点) worldLocation.value = data.世界.地点;
}

async function loadData() {
  await waitGlobalInitialized('Mvu');
  applyData(getAllVariables().stat_data);

  eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, () => {
    applyData(getAllVariables().stat_data);
  });
}

onMounted(() => {
  loadData();
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: transparent;
  font-family: var(--font-cn);
  color: var(--ink-primary);
}

:root {
  --scroll-bg: #f4ecd8;
  --scroll-border: #dbbba0;
  --ink-primary: #4a3b2a;
  --ink-secondary: #6e5a44;
  --ink-accent: #8b2e2e;
  --gold: #cfb53b;
  --silver: #a8a9ad;
  --copper: #b87333;
  --hover-highlight: rgba(139, 46, 46, 0.08);
  --font-en: 'IM Fell English SC', serif;
  --font-cn: 'Noto Serif SC', serif;
}

.lord-scroll {
  background: var(--scroll-bg);
  background-image: 
    linear-gradient(to right, rgba(0,0,0,0.05) 0%, transparent 10%, transparent 90%, rgba(0,0,0,0.05) 100%),
    url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
  border: 1px solid var(--scroll-border);
  border-radius: 4px;
  box-shadow: 
    0 2px 10px rgba(0,0,0,0.1),
    0 10px 20px rgba(0,0,0,0.15),
    inset 0 0 60px rgba(160, 120, 80, 0.15);
  position: relative;
  max-width: 750px;
  margin: 0 auto;
  padding: 30px 40px;
  overflow: hidden;
  font-family: var(--font-cn);
  color: var(--ink-primary);
  box-sizing: border-box;
}

.header-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid var(--ink-primary);
  padding-bottom: 15px;
  margin-bottom: 25px;
  position: relative;
}

.header-title {
  font-family: var(--font-en);
  font-size: 2.2em;
  font-weight: bold;
  line-height: 1;
  letter-spacing: 1px;
  text-shadow: 1px 1px 0 rgba(255,255,255,0.5);
}

.world-status {
  text-align: right;
  font-size: 0.9em;
  color: var(--ink-secondary);
}
.world-status div { margin-bottom: 4px; }
.world-status i { color: var(--ink-accent); margin-right: 5px; width: 16px; text-align: center; }

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.section-box {
  position: relative;
  padding: 15px;
  border: 1px dashed rgba(110, 90, 68, 0.3);
  border-radius: 6px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.15);
}
.section-box:hover {
  background-color: var(--hover-highlight);
  border-color: var(--ink-accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.section-title {
  font-family: var(--font-en);
  font-size: 1.2em;
  color: var(--ink-accent);
  margin-top: 0;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(139, 46, 46, 0.2);
  padding-bottom: 5px;
}
.section-title i { margin-right: 8px; font-size: 0.9em; }

.relation-item {
  margin-bottom: 12px;
  padding: 8px 10px;
  border-radius: 4px;
  transition: background 0.3s;
  border: 1px solid transparent;
}
.relation-item:hover { 
  background: rgba(255,255,255,0.5); 
  border-color: rgba(139, 46, 46, 0.1);
}

.char-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 1.05em;
}

.favor-value {
  color: var(--ink-accent);
}

.char-status {
  font-size: 0.85em;
  color: var(--ink-secondary);
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.progress-track {
  height: 6px;
  background: rgba(74, 59, 42, 0.1);
  border-radius: 3px;
  margin-top: 8px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--ink-accent);
  width: 0%;
  transition: width 1s ease-out;
  border-radius: 3px;
}

.currency-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin: 15px 0;
  background: rgba(74, 59, 42, 0.05);
  padding: 12px;
  border-radius: 8px;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);
}

.coin-group {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-en);
  font-weight: bold;
  font-size: 1.1em;
  cursor: help;
  transition: transform 0.2s;
}
.coin-group:hover { transform: scale(1.05); }

.coin-icon {
  width: 18px; height: 18px;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
  position: relative;
}
.coin-icon::after {
  content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, transparent 60%);
  border-radius: 50%;
}

.gold .coin-icon { background: var(--gold); border: 1px solid #b8860b; }
.silver .coin-icon { background: var(--silver); border: 1px solid #7d7d7d; }
.copper .coin-icon { background: var(--copper); border: 1px solid #8b4513; }

.stat-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.95em;
  padding: 6px 0;
  border-bottom: 1px dotted rgba(74, 59, 42, 0.15);
}
.stat-row:last-child { border-bottom: none; }

.trend-up { color: #2e8b57; font-weight: bold; }
.trend-down { color: #8b2e2e; font-weight: bold; }

.tax-note {
  margin-top: 8px;
  font-style: italic;
  font-size: 0.8em;
  color: var(--ink-secondary);
}

.scroll-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.list-card {
  background: rgba(255, 255, 255, 0.6);
  padding: 10px 12px;
  border-radius: 4px;
  border-left: 3px solid var(--ink-secondary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.list-card:hover {
  background: #fff;
  padding-left: 18px;
  border-left-color: var(--ink-accent);
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  transform: translateX(2px);
}

.card-main {
  font-weight: bold;
  color: var(--ink-primary);
  display: flex;
  align-items: center;
}

.card-sub {
  font-family: var(--font-en);
  font-weight: bold;
  color: var(--ink-secondary);
  font-size: 0.9em;
}

.territory-icon, .army-icon, .diplomacy-icon {
  margin-right: 8px;
  opacity: 0.6;
}

.diplomacy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
}

.full-width {
  grid-column: 1 / -1;
}

.relation-badge {
  font-size: 0.8em;
  padding: 2px 6px;
  border-radius: 3px;
  border: 1px solid currentColor;
  display: inline-block;
}

.rel-peace { color: #2e8b57; background: rgba(46, 139, 87, 0.08); }
.rel-hostile { color: #8b2e2e; background: rgba(139, 46, 46, 0.08); }
.rel-neutral { color: #6e5a44; background: rgba(110, 90, 68, 0.08); }

.empty-hint {
  font-style: italic;
  font-size: 0.85em;
  color: var(--ink-secondary);
  text-align: center;
  padding: 12px 0;
}

@media (max-width: 600px) {
  .lord-scroll {
    padding: 20px 15px;
    border-radius: 0;
    border-left: none;
    border-right: none;
    box-shadow: none;
  }

  .header-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  .header-title { font-size: 1.8em; }

  .world-status {
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    font-size: 0.85em;
  }
  .world-status div { margin-bottom: 0; }

  .grid-container {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .currency-row { gap: 10px; padding: 10px 5px; }

  .diplomacy-grid {
    grid-template-columns: 1fr;
  }

  .list-card:hover {
    transform: none;
    padding-left: 12px;
  }
}
</style>
