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
      <div class="tab-button" :class="{ active: currentPage === '3' }" @click="currentPage = '3'">宗门管理</div>
      <div class="tab-button" :class="{ active: currentPage === '4' }" @click="currentPage = '4'">设置</div>
    </div>

    <div class="page-container" :class="{ active: currentPage === '1' }">
      <ActionOptions :statData="statData" @send="处理发送" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '2' }"><CharacterInfo :statData="statData" /></div>

    <div class="page-container" :class="{ active: currentPage === '3' }">
      <SectManagement :statData="statData" @showDetail="显示角色详情" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '4' }"><Settings /></div>

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
import ActionOptions from './components/行动选项.vue';
import CharacterInfo from './components/角色信息.vue';
import SectManagement from './components/宗门管理.vue';
import Settings from './components/设置.vue';
import CharacterDetailModal from './components/角色详情弹窗.vue';

defineOptions({
  unusedWarnings: false,
});

interface StatData {
  当前时间?: string;
  当前地点?: string;
  行动选项?: {
    当前视角?: string;
    一?: string;
    二?: string;
    三?: string;
    四?: string;
  };
  主角?: {
    姓名?: string;
    年龄?: string;
    身份?: string;
    境界?: string;
    秘密知晓?: string[];
    功法与技能?: string[];
  };
  宗门?: {
    谷内人数?: number;
    弟子数量?: number;
    谷内状态?: string;
    外界认知?: string;
    阵法状态?: string;
    资源状况?: string;
    当前任务?: string;
    待办事项?: string[];
    统治范围?: string[];
    声望?: string;
    储备金?: number;
  };
  宗门动态?: {
    待接见人员?: Array<{
      名称?: string;
      来源?: string;
      资质?: string;
      目的?: string;
      到达时间?: string;
    }>;
    外出弟子?: Array<{
      名称?: string;
      任务?: string;
      出发时间?: string;
      预计归来?: string;
    }>;
    江湖传闻?: string[];
  };
  弟子?: Record<string, any>;
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

  if (data.当前时间) currentTime.value = data.当前时间;
  if (data.当前地点) currentLocation.value = data.当前地点;
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

    const currentContent = $textarea.val() || '';
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
  --bg-main: #1a1208;
  --bg-panel: rgba(43, 29, 14, 0.75);
  --border-color: rgba(165, 113, 58, 0.5);
  --user-color-primary: #d4b16a;
  --user-color-secondary: #e0c88f;
  --text-primary: #f0e6d3;
  --text-secondary: #b8a98f;
  --text-title: #d4b16a;
  --accent-color: #ff6b9d;
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
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
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
  background: linear-gradient(135deg, rgba(43, 29, 14, 0.85) 0%, rgba(62, 42, 20, 0.75) 100%);
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-left: 3px solid var(--user-color-primary);
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(212, 177, 106, 0.1);
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
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
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
  background: linear-gradient(135deg, rgba(43, 29, 14, 0.6) 0%, rgba(62, 42, 20, 0.4) 100%);
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
    background-color: rgba(212, 177, 106, 0.05);
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
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.4);
  animation: fadeIn 0.5s ease-out;
  max-height: 20rem;
  height: 20rem;
  overflow-y: auto;
}

.page-container.active {
  display: block;
}

::-webkit-scrollbar { width: 0.5rem; }
::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); border-radius: 0.25rem; }
::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 0.25rem;
  &:hover { background: var(--user-color-primary); }
}
</style>
