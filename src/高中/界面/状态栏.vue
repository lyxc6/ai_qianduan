<template>
  <div class="main" :class="themeClass">
    <div class="world-info">
      <div class="world-info-box">
        <div class="world-info-item-display">⏰日期：</div>
        <div class="world-info-item-display" id="current-time">{{ currentTime }}</div>
      </div>
      <div class="world-info-box">
        <div class="world-info-item-display">📍地点：</div>
        <div class="world-info-item-display" id="current-location">{{ currentLocation }}</div>
      </div>
    </div>

    <div class="tab-bar">
      <div class="tab-button" :class="{ active: currentPage === '1' }" @click="currentPage = '1'">主角</div>
      <div class="tab-button" :class="{ active: currentPage === '2' }" @click="currentPage = '2'">档案</div>
      <div class="tab-button" :class="{ active: currentPage === '3' }" @click="currentPage = '3'">地图</div>
      <div class="tab-button" :class="{ active: currentPage === '4' }" @click="currentPage = '4'">校规</div>
      <div class="tab-button" :class="{ active: currentPage === '5' }" @click="currentPage = '5'">设置</div>
    </div>

    <div class="page-container" :class="{ active: currentPage === '1' }">
      <CharacterInfo :statData="statData" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '2' }">
      <Profile :statData="statData" @showDetail="显示角色详情" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '3' }">
      <Map :statData="statData" :worldbookName="worldbookName" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '4' }">
      <SchoolRules :statData="statData" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '5' }">
      <Settings :isDarkTheme="isDarkTheme" @toggleTheme="切换主题" />
    </div>

    <CharacterDetailModal
      :characterName="selectedCharacter"
      :statData="statData"
      :visible="detailVisible"
      @close="detailVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Map from './components/地图.vue';
import SchoolRules from './components/校规.vue';
import Profile from './components/档案.vue';
import CharacterInfo from './components/角色信息.vue';
import CharacterDetailModal from './components/角色详情弹窗.vue';
import Settings from './components/设置.vue';

defineOptions({
  unusedWarnings: false,
});

interface StatData {
  世界?: {
    时间?: string;
    地点?: string;
  };
  主角?: {
    姓名?: string;
    年龄?: string;
    性别?: string;
    身份?: string;
    当前着装?: string;
    当前姿势?: string;
    当前位置?: string;
    当前想法?: string;
    学业状态?: string;
    人际关系?: string;
  };
  同学?: Record<string, any>;
  最近事件?: Array<{ 时间?: string; 地点?: string; 内容?: string }>;
  校规?: {
    日常规范?: Array<{ icon?: string; title?: string; desc?: string }>;
    着装要求?: Array<{ day?: string; style?: string }>;
    行为准则?: Array<{ icon?: string; text?: string }>;
  };
  地图?: {
    建筑?: Record<string, any>;
  };
  物品?: Array<{ 名称?: string; 数量?: number } | string>;
}

const currentPage = ref('1');
const currentTime = ref('加载中...');
const currentLocation = ref('加载中...');
const statData = ref<StatData>({});
const selectedCharacter = ref('');
const detailVisible = ref(false);
const isDarkTheme = ref(false);
const worldbookName = ref<string>('圣樱中学');

const themeClass = computed(() => (isDarkTheme.value ? 'dark-theme' : 'light-theme'));

function 切换主题() {
  isDarkTheme.value = !isDarkTheme.value;
  const root = document.documentElement;

  if (isDarkTheme.value) {
    root.style.setProperty('--bg-main', '#1a1a2e');
    root.style.setProperty('--bg-panel', 'rgba(30, 30, 50, 0.9)');
    root.style.setProperty('--border-color', 'rgba(255, 183, 178, 0.3)');
    root.style.setProperty('--text-primary', '#f0f0f0');
    root.style.setProperty('--text-secondary', '#c0c0c0');
    root.classList.add('dark-theme');
  } else {
    root.style.setProperty('--bg-main', '#faf8f5');
    root.style.setProperty('--bg-panel', 'rgba(255, 255, 255, 0.85)');
    root.style.setProperty('--border-color', 'rgba(255, 183, 178, 0.4)');
    root.style.setProperty('--text-primary', '#3d3027');
    root.style.setProperty('--text-secondary', '#8b7355');
    root.classList.remove('dark-theme');
  }
}

async function 加载数据() {
  await waitGlobalInitialized('Mvu');
  const data = getAllVariables().stat_data;
  statData.value = data || {};

  if (data.世界) {
    if (data.世界.时间) currentTime.value = data.世界.时间;
    if (data.世界.地点) currentLocation.value = data.世界.地点;
  }

  if (data.最近事件 && Array.isArray(data.最近事件)) {
    insertVariables({ 最近事件: [...data.最近事件] }, { type: 'chat' });
  }
}

function 显示角色详情(characterName: string) {
  selectedCharacter.value = characterName;
  detailVisible.value = true;
}

onMounted(() => {
  加载数据();
});
</script>

<style lang="scss">
:root {
  --font-serif: 'Noto Serif SC', serif;
  --font-title: 'ZCOOL XiaoWei', serif;
  --bg-main: #faf8f5;
  --bg-panel: rgba(255, 255, 255, 0.85);
  --border-color: rgba(255, 183, 178, 0.4);
  --user-color-primary: #ff8a80;
  --user-color-secondary: #ffab91;
  --text-primary: #3d3027;
  --text-secondary: #8b7355;
  --text-title: #ff8a80;
  --accent-color: #f48fb1;
}

.dark-theme {
  --bg-main: #1a1a2e;
  --bg-panel: rgba(30, 30, 50, 0.9);
  --border-color: rgba(255, 183, 178, 0.3);
  --text-primary: #f0f0f0;
  --text-secondary: #c0c0c0;
  --text-title: #ff8a80;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: transparent;
  font-family: var(--font-serif);
  font-size: 0.75rem;
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.main {
  background-color: var(--bg-main);
  background-size: cover;
  background-position: center;
  padding: 0.5rem;
  box-sizing: border-box;
  animation: fadeIn 1s ease-out;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 183, 178, 0.2);
}

.world-info {
  background: var(--bg-panel);
  border-radius: 0.75rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-left: 3px solid var(--user-color-primary);
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(255, 138, 128, 0.1);
}

.world-info-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.world-info-box:last-child {
  margin-bottom: 0;
}

.world-info-item-display {
  font-family: var(--font-title);
  font-size: 0.9rem;
  color: var(--text-secondary);
  letter-spacing: 1px;
}

.world-info-item-display:first-child {
  color: var(--user-color-primary);
  min-width: 4.5rem;
}

.world-info-item-display:last-child {
  color: var(--text-primary);
  font-family: var(--font-serif);
  font-weight: 500;
  flex: 1;
  text-align: right;
  padding-left: 0.5rem;
}

.tab-bar {
  display: flex;
  justify-content: space-between;
  margin-top: 0.4rem;
  background: var(--bg-panel);
  border-radius: 0.75rem 0.75rem 0 0;
  padding: 0.25rem;
  border-bottom: 1px solid var(--border-color);
}

.tab-button {
  flex: 1;
  font-family: var(--font-title);
  font-size: 0.85rem;
  color: var(--text-secondary);
  letter-spacing: 1px;
  padding: 0.6rem 0.4rem;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:hover {
    color: var(--text-primary);
    background-color: rgba(255, 138, 128, 0.08);
  }

  &.active {
    color: var(--text-title);
    background-color: var(--bg-main);
    box-shadow: 0 2px 8px rgba(255, 138, 128, 0.15);

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      height: 0.2rem;
      background: linear-gradient(90deg, var(--user-color-primary), var(--user-color-secondary));
      border-radius: 0.25rem 0.25rem 0 0;
    }
  }
}

.page-container {
  display: none;
  border-radius: 0 0 0.75rem 0.75rem;
  padding: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  animation: fadeIn 0.5s ease-out;
  max-height: 20rem;
  height: 20rem;
  overflow-y: auto;
}

.page-container.active {
  display: block;
}

::-webkit-scrollbar {
  width: 0.4rem;
}

::-webkit-scrollbar-track {
  background: rgba(255, 138, 128, 0.05);
  border-radius: 0.2rem;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 138, 128, 0.3);
  border-radius: 0.2rem;

  &:hover {
    background: var(--user-color-primary);
  }
}

@media (max-width: 768px) {
  .info-group {
    gap: 0.5rem;
  }
  .info-item {
    min-width: 100%;
    flex: 1;
  }
  .info-label {
    font-size: 0.7rem;
    margin-bottom: 0.15rem;
  }
  .info-value {
    font-size: 0.8rem;
    line-height: 1.3;
  }
  .character-detail-info {
    padding: 0.5rem;
  }
  .martial-arts-container {
    gap: 0.35rem;
  }
  .martial-art-item {
    padding: 0.4rem 0.6rem;
  }
  .martial-art-name {
    font-size: 0.75rem;
  }
}
</style>
