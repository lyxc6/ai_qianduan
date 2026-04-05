<template>
  <div class="main">
    <VariableDisplay :currentMessage="currentMessage" />

    <div class="world-status-bar">
      <div class="status-item">
        <span class="status-icon">📅</span>
        <span class="status-text">{{ currentTime }}</span>
      </div>
      <div class="status-divider"></div>
      <div class="status-item">
        <span class="status-icon">📍</span>
        <span class="status-text">{{ currentLocation }}</span>
      </div>
    </div>

    <div class="tab-bar">
      <div class="tab-button" :class="{ active: currentPage === '1' }" @click="currentPage = '1'">女主</div>
      <div class="tab-button" :class="{ active: currentPage === '2' }" @click="currentPage = '2'">男主</div>
      <div class="tab-button" :class="{ active: currentPage === '3' }" @click="currentPage = '3'">路人</div>
    </div>

    <div class="page-container" :class="{ active: currentPage === '1' }">
      <CharacterInfo :statData="statData" :currentMessage="currentMessage" characterType="女主" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '2' }">
      <CharacterInfo :statData="statData" :currentMessage="currentMessage" characterType="男主" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '3' }">
      <NPCInfo :statData="statData" :currentMessage="currentMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VariableDisplay from './components/变量显示.vue';
import CharacterInfo from './components/角色信息.vue';
import NPCInfo from './components/路人信息.vue';

defineOptions({
  unusedWarnings: false,
});

interface NPC {
  姓名: string;
  性别: string;
  年龄: number;
  武功境界: string;
  身份: string;
  与女主关系: string;
  对女主态度: string;
  当前姿势: string;
  当前想法: string;
  背景: string;
  性格: {
    核心: string;
    优点: string;
    缺点: string;
    习惯: string;
    说话: string;
  };
}

interface StatData {
  当前时间: string;
  当前地点: string;
  女主: {
    姓名: string;
    原名: string;
    性别: string;
    年龄: number;
    武功境界: string;
    对男主好感度: number;
    当前发育状态: number;
    高潮进程: number;
    高潮次数: number;
    被内射次数: number;
    处女: boolean;
    破处记录: string;
    身份: string;
    真实身份知晓者?: string;
    目标: string;
    秘密: string;
    当前姿势: string;
    当前想法: string;
    身体状态: string;
    小嘴状态: string;
    胸部状态: string;
    小屄状态: string;
    屁穴状态: string;
    当前着装: {
      整体: string;
      上装: string;
      下装: string;
      内衣: string;
      内裤: string;
      特殊配饰: string;
      暴露程度: string;
    };
  };
  男主: {
    姓名: string;
    性别: string;
    年龄: number;
    武功境界: string;
    对女主好感度: number;
    射精进度: number;
    身份: string;
    关系: string;
    识破身份进度: number;
    当前姿势: string;
    当前想法: string;
    当前着装: {
      整体: string;
      上装: string;
      下装: string;
      配饰: string;
      暴露程度: string;
    };
  };
  其他角色: NPC[];
}

const currentPage = ref('1');
const currentTime = ref('加载中...');
const currentLocation = ref('加载中...');
const statData = ref<StatData>({});
const currentMessage = ref<any>(null);

async function 加载数据() {
  await waitGlobalInitialized('Mvu');
  const data = getAllVariables().stat_data;

  if (data) {
    statData.value = data;
    currentTime.value = data.当前时间 || '未知时间';
    currentLocation.value = data.当前地点 || '未知地点';
  }

  const messages = getChatMessages(-1);
  if (messages && messages.length > 0) {
    currentMessage.value = messages[0];
  }
}

onMounted(() => {
  加载数据();
});
</script>
