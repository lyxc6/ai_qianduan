<template>
  <div class="main">
    <VariableDisplay :currentMessage="currentMessage" />

    <div class="tab-bar">
      <div class="tab-button" :class="{ active: currentPage === '1' }" @click="currentPage = '1'">系统信息</div>
      <div class="tab-button" :class="{ active: currentPage === '2' }" @click="currentPage = '2'">女主</div>
      <div class="tab-button" :class="{ active: currentPage === '3' }" @click="currentPage = '3'">男主</div>
      <div class="tab-button" :class="{ active: currentPage === '4' }" @click="currentPage = '4'">路人</div>
    </div>

    <div class="page-container" :class="{ active: currentPage === '1' }">
      <SystemInfo :statData="statData" :currentMessage="currentMessage" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '2' }">
      <CharacterInfo :statData="statData" :currentMessage="currentMessage" characterType="女主" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '3' }">
      <CharacterInfo :statData="statData" :currentMessage="currentMessage" characterType="男主" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '4' }">
      <NPCInfo :statData="statData" :currentMessage="currentMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VariableDisplay from './components/变量显示.vue';
import SystemInfo from './components/系统信息.vue';
import CharacterInfo from './components/角色信息.vue';
import NPCInfo from './components/路人信息.vue';

defineOptions({
  unusedWarnings: false,
});

interface TaskData {
  名称?: string;
  内容?: string;
  要求?: string;
}

interface StatData {
  系统?: {
    当前时间?: string;
    当前地点?: string;
    当前任务?: TaskData;
    最近性行为?: string;
  };
  女主?: {
    姓名?: string;
    性别?: string;
    年龄?: number;
    武功境界?: number;
    当前发育状态?: number;
    高潮进程?: number;
    高潮次数?: number;
    被内射次数?: number;
    处女?: boolean;
    破处记录?: string;
    身份?: string;
    目标?: string;
    秘密?: string;
    当前姿势?: string;
    当前想法?: string;
    身体状态?: string;
    小嘴状态?: string;
    胸部状态?: string;
    小屄状态?: string;
    屁穴状态?: string;
    当前着装?: {
      整体?: string;
      上装?: string;
      下装?: string;
      内衣?: string;
      内裤?: string;
      特殊配饰?: string;
      暴露程度?: string;
    };
  };
  男主?: {
    姓名?: string;
    性别?: string;
    年龄?: number;
    武功境界?: number;
    对女主好感度?: number;
    射精进度?: number;
    身份?: string;
    关系?: string;
    当前姿势?: string;
    当前想法?: string;
    当前着装?: {
      整体?: string;
      上装?: string;
      下装?: string;
      配饰?: string;
      暴露程度?: string;
    };
  };
  行动选项?: {
    当前视角?: string;
    选项一?: string;
    选项二?: string;
    选项三?: string;
    选项四?: string;
  };
  事件?: string[];
}

const currentPage = ref('1');
const currentTime = ref('加载中...');
const currentLocation = ref('加载中...');
const currentTask = ref<TaskData>({});
const statData = ref<StatData>({});
const currentMessage = ref<any>(null);

async function 加载数据() {
  await waitGlobalInitialized('Mvu');
  const data = getAllVariables().stat_data;
  statData.value = data || {};

  if (data.系统) {
    if (data.系统.当前时间) currentTime.value = data.系统.当前时间;
    if (data.系统.当前地点) currentLocation.value = data.系统.当前地点;
    if (data.系统.当前任务) currentTask.value = data.系统.当前任务;
  }

  if (data.事件 && Array.isArray(data.事件)) {
    insertVariables({ 最近事件: [...data.事件] }, { type: 'chat' });
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
