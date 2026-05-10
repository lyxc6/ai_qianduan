<template>
  <div class="system-hud">
    <div class="info-bar">
      <div class="info-item">
        <span class="info-label">Date:</span>
        <span class="info-value">{{ statData['日期'] || '未知日期' }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Time:</span>
        <span class="info-value">{{ statData['时间'] || '未知时间' }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Location:</span>
        <span class="info-value">{{ statData['位置'] || '未知位置' }}</span>
      </div>
    </div>

    <div class="assets-section">
      <div class="assets-title">Assets // 名下资产</div>
      <div class="assets-grid">
        <template v-if="Object.keys(statData['名下资产'] || {}).length === 0">
          <span class="asset-item">暂无资产</span>
        </template>
        <template v-else>
          <span v-for="(info, name) in statData['名下资产']" :key="name" class="asset-item">
            {{ typeof info === 'string' ? info : `${info['名称'] || name} x${info['数量'] || 1}` }}
          </span>
        </template>
      </div>
    </div>

    <div class="skills-section">
      <div class="skills-title">Skills // 技能列表</div>
      <div class="skills-grid">
        <template v-if="Object.keys(statData['技能'] || {}).length === 0">
          <span class="skill-item">暂无技能</span>
        </template>
        <template v-else>
          <span v-for="(info, name) in statData['技能']" :key="name" class="skill-item">
            {{ typeof info === 'string' ? info : info['名称'] || name }}
          </span>
        </template>
      </div>
    </div>

    <div class="core-data">
      <div class="core-item">
        <span class="core-label">Balance</span>
        <span class="core-val">￥{{ formatNumber(statData['现金余额']) }}</span>
      </div>
      <div class="core-item">
        <span class="core-label">Rank</span>
        <span class="core-val">{{ statData['神豪等级'] || '萌新神豪' }}</span>
      </div>
      <div class="core-item">
        <span class="core-label">Points</span>
        <span class="core-val">{{ statData['系统积分'] || 0 }}</span>
      </div>
      <div class="core-item">
        <span class="core-label">Mult</span>
        <span class="core-val">{{ statData['返现倍数'] || 0 }}x</span>
      </div>
    </div>

    <div class="section-header" :class="{ active: girlsSectionOpen }" @click="girlsSectionOpen = !girlsSectionOpen">
      TARGETS // 实时侦测中
    </div>
    <div class="section-content" :class="{ active: girlsSectionOpen }">
      <template v-if="Object.keys(activeGirls).length === 0">
        <div class="empty-state">[ SENSOR_OFFLINE: 范围内未发现目标女性 ]</div>
      </template>
      <template v-else>
        <div v-for="(girl, name) in activeGirls" :key="name" class="girl-card">
          <div class="girl-header">
            <span class="girl-name">❖ {{ name }}</span>
            <span class="girl-score">AGE: {{ girl['年龄'] }} | SCORE: {{ girl['颜值评分'] }}</span>
          </div>
          <div class="girl-body">
            <div class="stat-row">
              <div class="stat-box">
                <span class="stat-label">RELATION</span>
                <span class="stat-val">{{ girl['与user的关系'] }}</span>
              </div>
              <div class="stat-box">
                <span class="stat-label">FAVOR</span>
                <span class="stat-val">{{ girl['好感度'] }}</span>
              </div>
              <div class="stat-box">
                <span class="stat-label">DEGEN</span>
                <span class="stat-val" style="color: var(--lust-color)">{{ girl['堕落值'] }}</span>
              </div>
            </div>

            <div class="body-detail"><b>[认知]</b> {{ girl['自我认知'] }}</div>
            <div class="body-detail">
              <b>[心声]</b> <i style="color: #ff80b3">"{{ girl['心声'] }}"</i>
            </div>

            <div class="body-detail clothes-panel">
              <b>[上装]</b> {{ girl['衣着']?.['上装'] || '未探测' }}<br />
              <b>[下装]</b> {{ girl['衣着']?.['下装'] || '未探测' }}<br />
              <b>[内衣]</b> {{ girl['衣着']?.['内衣'] || '未探测' }}<br />
              <b>[袜子]</b> {{ girl['衣着']?.['袜子'] || '未探测' }}<br />
              <b>[鞋子]</b> {{ girl['衣着']?.['鞋子'] || '未探测' }}
            </div>

            <div class="intimate-panel">
              <span class="intimate-label">DEPTH_SCAN // 深度探测</span>
              <div class="secret-grid">
                <div class="secret-item">
                  <b>处女:</b><span>{{ girl['私密档案']?.['是否为处女'] || '未知' }}</span>
                </div>
                <div class="secret-item">
                  <b>受孕:</b
                  ><span
                    >{{ girl['私密档案']?.['是否怀孕'] || '未知' }} ({{ girl['私密档案']?.['怀孕几率'] || '0%' }})</span
                  >
                </div>
                <div class="secret-item" style="grid-column: span 2">
                  <b>初夜归属:</b><span>{{ girl['私密档案']?.['初夜对象'] || '尚未被夺走' }}</span>
                </div>
                <div class="secret-item">
                  <b>内射次数:</b><span>{{ girl['私密档案']?.['内射次数'] || 0 }}</span>
                </div>
                <div class="secret-item">
                  <b>子嗣归属:</b><span>{{ girl['私密档案']?.['子嗣所属'] || '无' }}</span>
                </div>
              </div>
              <div class="body-detail">
                <b>名器记录:</b>
                <span style="color: var(--gold-primary); font-weight: bold">
                  {{ girl['私密档案']?.['名器'] || '尚未解析' }}
                </span>
              </div>
              <div class="body-part-list">
                <b>[朱唇]</b> {{ girl['身体状态']?.['朱唇'] }}<br />
                <b>[乳房]</b> {{ girl['身体状态']?.['乳房'] }}<br />
                <b>[美臀]</b> {{ girl['身体状态']?.['美臀'] }}<br />
                <b>[小穴]</b> {{ girl['身体状态']?.['小穴'] }}<br />
                <b>[菊穴]</b> {{ girl['身体状态']?.['菊穴'] }}<br />
                <b>[玉足]</b> {{ girl['身体状态']?.['玉足'] }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div class="section-header" :class="{ active: haremSectionOpen }" @click="haremSectionOpen = !haremSectionOpen">
      ARCHIVE // 禁脔图鉴
    </div>
    <div class="section-content" :class="{ active: haremSectionOpen }">
      <template v-if="Object.keys(harem).length === 0">
        <div class="empty-state">[ 暂无图鉴数据 ]</div>
      </template>
      <template v-else>
        <div v-for="(data, name) in harem" :key="name" class="harem-item">
          <div class="harem-name-group">
            <span class="harem-name">{{ name }}</span>
            <span class="harem-age">{{ getHaremDisplayData(name, data)['年龄'] }}</span>
          </div>
          <div class="harem-info">
            <div style="color: var(--lust-color)">堕落: {{ getHaremDisplayData(name, data)['堕落值'] }}</div>
            <div style="font-size: 0.625rem">
              {{ getHaremDisplayData(name, data)['与user的关系'] }} | {{ getHaremDisplayData(name, data)['名器种类'] }}
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import waitUntil from 'async-wait-until';
import _ from 'lodash';
import { onMounted, onUnmounted, ref } from 'vue';

interface GirlData {
  年龄: number;
  颜值评分: number;
  与user的关系: string;
  好感度: number;
  堕落值: number;
  自我认知: string;
  心声: string;
  衣着?: {
    上装?: string;
    下装?: string;
    内衣?: string;
    袜子?: string;
    鞋子?: string;
  };
  身体状态?: {
    朱唇?: string;
    乳房?: string;
    美臀?: string;
    小穴?: string;
    菊穴?: string;
    玉足?: string;
  };
  私密档案?: {
    是否为处女?: string;
    是否怀孕?: string;
    怀孕几率?: string;
    初夜对象?: string;
    内射次数?: number;
    子嗣所属?: string;
    名器?: string;
  };
}

interface HaremData {
  年龄: number;
  堕落值: number;
  与user的关系: string;
  名器种类: string;
}

interface StatData {
  日期?: string;
  时间?: string;
  位置?: string;
  现金余额?: number;
  神豪等级?: string;
  系统积分?: number;
  返现倍数?: number;
  名下资产?: Record<string, any>;
  技能?: Record<string, any>;
  当前在场互动女性?: Record<string, GirlData>;
  后宫状态?: Record<string, HaremData>;
}

const statData = ref<StatData>({});
const activeGirls = ref<Record<string, GirlData>>({});
const harem = ref<Record<string, HaremData>>({});
const girlsSectionOpen = ref(true);
const haremSectionOpen = ref(false);

const formatNumber = (num: number | undefined): string => {
  return (num || 0).toLocaleString();
};

const getHaremDisplayData = (name: string, data: HaremData): HaremData => {
  const activeGirl = activeGirls.value[name];
  if (activeGirl) {
    return {
      ...data,
      堕落值: activeGirl['堕落值'],
      与user的关系: activeGirl['与user的关系'],
      名器种类: _.get(activeGirl, '私密档案.名器', data['名器种类']),
    };
  }
  return data;
};

const loadData = () => {
  const variables = Mvu.getMvuData({ type: 'message', message_id: getCurrentMessageId() });
  const data = _.get(variables, 'stat_data', {}) as StatData;

  statData.value = data;
  activeGirls.value = data['当前在场互动女性'] || {};
  harem.value = data['后宫状态'] || {};
};

let unsubscribe: ReturnType<typeof eventOn> | null = null;

onMounted(async () => {
  await waitGlobalInitialized('Mvu');
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));

  loadData();

  unsubscribe = eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, () => {
    loadData();
  });
});

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe.stop();
  }
});
</script>

<style scoped>
.system-hud {
  margin: 0.625rem;
  border: 0.0625rem solid var(--gold-dim);
  border-radius: 0.625rem;
  background: var(--bg-panel);
  box-shadow: var(--neon-glow);
  overflow: hidden;
  backdrop-filter: blur(0.9375rem);
}

.section-header {
  background: linear-gradient(90deg, rgba(255, 204, 102, 0.2) 0%, transparent 100%);
  color: var(--gold-primary);
  padding: 0.875rem 1.125rem;
  font-weight: bold;
  font-size: 0.9375rem;
  border-left: 0.25rem solid var(--gold-primary);
  border-bottom: 0.0625rem solid var(--gold-dim);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  letter-spacing: 0.125rem;
  text-shadow: 0 0 0.625rem rgba(255, 204, 102, 0.5);
  user-select: none;
}

.section-header::after {
  content: '▼';
  font-size: 0.75rem;
  transition: transform 0.4s;
}

.section-header.active::after {
  transform: rotate(180deg);
}

.section-content {
  display: none;
  max-height: 43.75rem;
  overflow-y: auto;
}

.section-content.active {
  display: block;
}

.core-data {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.0625rem;
  background: var(--gold-dim);
}

.core-item {
  background: var(--bg-panel);
  padding: 0.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.core-label {
  font-size: 0.6875rem;
  color: var(--text-muted);
  margin-bottom: 0.25rem;
  text-transform: uppercase;
}

.core-val {
  font-size: 1rem;
  color: var(--gold-primary);
  font-weight: bold;
}

.info-bar {
  background: linear-gradient(90deg, rgba(255, 204, 102, 0.08) 0%, rgba(255, 204, 102, 0.03) 100%);
  border-bottom: 0.0625rem solid var(--gold-dim);
  padding: 0.625rem 1.125rem;
  display: flex;
  gap: 1.25rem;
  font-size: 0.8125rem;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.info-label {
  color: var(--text-muted);
  font-size: 0.6875rem;
  text-transform: uppercase;
}

.info-value {
  color: var(--gold-primary);
  font-weight: bold;
}

.assets-section {
  padding: 0.75rem 1.125rem;
  border-bottom: 0.0625rem solid rgba(255, 255, 255, 0.05);
}

.assets-title {
  font-size: 0.6875rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.0625rem;
}

.assets-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.asset-item {
  background: rgba(255, 204, 102, 0.08);
  border: 0.0625rem solid rgba(255, 204, 102, 0.2);
  padding: 0.25rem 0.625rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  color: var(--gold-primary);
}

.skills-section {
  padding: 0.75rem 1.125rem;
  border-bottom: 0.0625rem solid rgba(255, 255, 255, 0.05);
}

.skills-title {
  font-size: 0.6875rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.0625rem;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-item {
  background: rgba(100, 200, 255, 0.08);
  border: 0.0625rem solid rgba(100, 200, 255, 0.2);
  padding: 0.25rem 0.625rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  color: #64c8ff;
}

.girl-card {
  margin: 0.75rem;
  border: 0.0625rem solid rgba(255, 77, 148, 0.4);
  border-radius: 0.5rem;
  background: linear-gradient(180deg, rgba(30, 30, 40, 0.6) 0%, var(--lust-bg) 100%);
  box-shadow: var(--lust-glow);
}

.girl-header {
  display: flex;
  justify-content: space-between;
  padding: 0.625rem 0.9375rem;
  background: rgba(255, 77, 148, 0.1);
  border-bottom: 0.0625rem solid rgba(255, 77, 148, 0.2);
}

.girl-name {
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  text-shadow: 0 0 0.625rem var(--lust-color);
}

.girl-score {
  font-size: 0.75rem;
  color: var(--gold-primary);
  font-weight: bold;
}

.girl-body {
  padding: 0.75rem;
  font-size: 0.8125rem;
}

.stat-row {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.625rem;
  padding-bottom: 0.5rem;
  border-bottom: 0.0625rem solid rgba(255, 255, 255, 0.1);
}

.stat-box {
  flex: 1;
  text-align: center;
}

.stat-label {
  font-size: 0.625rem;
  color: var(--text-muted);
  display: block;
  margin-bottom: 0.125rem;
}

.stat-val {
  color: #fff;
  font-size: 0.875rem;
  font-weight: bold;
}

.body-detail {
  color: #cbd5e1;
  line-height: 1.7;
  margin-bottom: 0.5rem;
}

.body-detail b {
  color: var(--gold-primary);
  font-weight: normal;
  margin-right: 0.375rem;
}

.clothes-panel {
  background: rgba(255, 204, 102, 0.05);
  padding: 0.625rem;
  border-radius: 0.25rem;
  border-left: 0.125rem solid var(--gold-primary);
  margin: 0.625rem 0;
}

.intimate-panel {
  margin-top: 0.75rem;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0.375rem;
  border: 0.0625rem solid var(--lust-color);
  position: relative;
}

.intimate-panel::before {
  content: 'BIOLOGICAL_SCAN';
  position: absolute;
  top: -0.5rem;
  right: 0.625rem;
  font-size: 0.5625rem;
  background: var(--lust-color);
  color: #000;
  padding: 0 0.25rem;
  border-radius: 0.125rem;
  font-weight: bold;
}

.intimate-label {
  color: var(--lust-color);
  font-size: 0.75rem;
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  border-bottom: 0.0625rem solid var(--lust-bg);
  text-align: center;
  letter-spacing: 0.125rem;
}

.secret-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 0.625rem;
}

.secret-item {
  background: rgba(255, 77, 148, 0.05);
  padding: 0.3125rem 0.5rem;
  border-radius: 0.25rem;
  border: 0.0625rem solid rgba(255, 77, 148, 0.1);
}

.secret-item b {
  color: var(--lust-color);
  font-size: 0.6875rem;
  margin-right: 0.25rem;
}

.secret-item span {
  color: #fff;
  font-size: 0.75rem;
}

.body-part-list {
  font-size: 0.6875rem;
  border-top: 0.0625rem dashed rgba(255, 77, 148, 0.3);
  padding-top: 0.625rem;
  color: #94a3b8;
}

.body-part-list b {
  color: #ff80b3;
}

.harem-item {
  padding: 0.75rem 1.125rem;
  border-bottom: 0.0625rem solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.harem-name-group {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.harem-name {
  color: var(--lust-color);
  font-weight: bold;
  font-size: 0.9375rem;
}

.harem-age {
  color: var(--text-muted);
  font-size: 0.6875rem;
  opacity: 0.8;
}

.harem-info {
  color: var(--text-muted);
  font-size: 0.75rem;
  text-align: right;
}

.empty-state {
  padding: 1.25rem;
  color: var(--text-muted);
  text-align: center;
  font-style: italic;
  letter-spacing: 0.0625rem;
}

::-webkit-scrollbar {
  width: 0.25rem;
}

::-webkit-scrollbar-thumb {
  background: var(--gold-primary);
  border-radius: 0.125rem;
}
</style>
