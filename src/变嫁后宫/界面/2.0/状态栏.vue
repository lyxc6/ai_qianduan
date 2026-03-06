<template>
  <div class="main">
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
      <div class="tab-button" :class="{ active: currentPage === '1' }" @click="currentPage = '1'">行动选项</div>
      <div class="tab-button" :class="{ active: currentPage === '2' }" @click="currentPage = '2'">主角</div>
      <div class="tab-button" :class="{ active: currentPage === '3' }" @click="currentPage = '3'">守则</div>
      <div class="tab-button" :class="{ active: currentPage === '4' }" @click="currentPage = '4'">后宫</div>
      <div class="tab-button" :class="{ active: currentPage === '5' }" @click="currentPage = '5'">最近事件</div>
    </div>

    <div class="page-container" :class="{ active: currentPage === '1' }">
      <ActionOptions :statData="statData" @send="处理发送" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '2' }">
      <CharacterInfo :statData="statData" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '3' }">
      <HaremRules :statData="statData" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '4' }">
      <Harem :statData="statData" @showDetail="显示角色详情" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '5' }">
      <RecentEvents :statData="statData" />
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
import { onMounted, ref } from 'vue';
import Harem from './components/后宫.vue';
import HaremRules from './components/后宫规则.vue';
import RecentEvents from './components/最近事件.vue';
import ActionOptions from './components/行动选项.vue';
import CharacterInfo from './components/角色信息.vue';
import CharacterDetailModal from './components/角色详情弹窗.vue';

defineOptions({
  unusedWarnings: false,
});

interface StatData {
  世界?: {
    当前时间?: string;
    当前地点?: string;
  };
  行动选项?: {
    当前视角?: string;
    选项一?: string;
    选项二?: string;
    选项三?: string;
    选项四?: string;
  };
  主角?: {
    姓名?: string;
    年龄?: number;
    性别?: string;
    身份?: string;
    当前着装?: string;
    当前姿势?: string;
    当前想法?: string;
    射精进度?: number;
  };
  后宫?: Record<string, any>;
  事件?: string[];
}

const currentPage = ref('1');
const currentTime = ref('加载中...');
const currentLocation = ref('加载中...');
const statData = ref<StatData>({});
const selectedCharacter = ref('');
const detailVisible = ref(false);

async function 加载数据() {
  await waitGlobalInitialized('Mvu');
  const data = getAllVariables().stat_data;
  statData.value = data || {};

  if (data.世界) {
    if (data.世界.当前时间) currentTime.value = data.世界.当前时间;
    if (data.世界.当前地点) currentLocation.value = data.世界.当前地点;
  }

  if (data.事件 && Array.isArray(data.事件)) {
    insertVariables({ 最近事件: [...data.事件] }, { type: 'chat' });
  }
}

function 处理发送(text: string) {
  const trimmedText = String(text).trim();
  if (!trimmedText || trimmedText === '…' || trimmedText === '...') {
    return;
  }

  try {
    const $textarea = $(parent.document).find('#send_textarea');
    if ($textarea.length === 0) {
      return;
    }

    const currentContent = String($textarea.val() || '');
    if (currentContent.includes(trimmedText)) {
      return;
    }

    const separator = currentContent.trim() ? '\n' : '';
    const newContent = currentContent + separator + trimmedText;

    $textarea.val(newContent);
    $textarea.trigger('input');
  } catch (error) {
    console.error('发送到聊天框时出错:', error);
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
  --bg-main: #fff5e6;
  --bg-panel: rgba(255, 240, 220, 0.85);
  --border-color: rgba(255, 180, 100, 0.4);
  --user-color-primary: #ff9966;
  --user-color-secondary: #ffcc99;
  --text-primary: #5c4033;
  --text-secondary: #8b7355;
  --text-title: #ff7744;
  --accent-color: #ff5588;
  --warm-bg-light: rgba(255, 240, 220, 0.9);
  --warm-bg-medium: rgba(255, 230, 200, 0.85);
  --warm-bg-dark: rgba(255, 220, 180, 0.8);
  --warm-gradient-start: rgba(255, 200, 150, 0.6);
  --warm-gradient-end: rgba(255, 220, 180, 0.8);
  --warm-shadow: rgba(255, 180, 100, 0.2);
  --warm-inner-light: rgba(255, 255, 255, 0.5);
  --warm-border-light: rgba(255, 200, 150, 0.3);
  --warm-border-hover: rgba(255, 200, 150, 0.6);
  --warm-hover-bg: rgba(255, 200, 150, 0.1);
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
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

.world-info {
  background: linear-gradient(135deg, var(--warm-bg-light) 0%, var(--warm-bg-medium) 100%);
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-left: 3px solid var(--user-color-primary);
  display: flex;
  flex-direction: column;
  box-shadow:
    0 2px 8px var(--warm-shadow),
    inset 0 1px 0 var(--warm-inner-light);
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
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
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
  background: linear-gradient(135deg, var(--warm-bg-medium) 0%, var(--warm-bg-light) 100%);
  border-radius: 0.5rem 0.5rem 0 0;
  padding: 0.25rem 0.25rem 0 0.25rem;
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
  border-radius: 0.4rem 0.4rem 0 0;
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:hover {
    color: var(--text-primary);
    background-color: var(--warm-hover-bg);
    border-color: var(--border-color);
  }

  &.active {
    color: var(--text-title);
    background-color: var(--bg-panel);
    border-bottom: 1px solid var(--bg-panel);
    transform: translateY(-1px);

    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 0.1875rem;
      background: linear-gradient(90deg, var(--user-color-primary), var(--user-color-secondary));
      border-radius: 0.25rem 0.25rem 0 0;
    }
  }
}

.page-container {
  display: none;
  background-color: var(--bg-panel);
  backdrop-filter: blur(10px);
  border-radius: 0 0 0.5rem 0.5rem;
  padding: 0.5rem;
  box-shadow: inset 0 0 40px rgba(255, 200, 150, 0.2);
  animation: fadeIn 0.5s ease-out;
  max-height: 20rem;
  height: 20rem;
  overflow-y: auto;
}

.page-container.active {
  display: block;
}

::-webkit-scrollbar {
  width: 0.5rem;
}

::-webkit-scrollbar-track {
  background: var(--warm-bg-medium);
  border-radius: 0.25rem;
}

::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 0.25rem;

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
