<template>
  <div class="main">
    <VariableDisplay :currentMessage="currentMessage" />

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
      <div class="tab-button" :class="{ active: currentPage === '1' }" @click="currentPage = '1'">行动</div>
      <div class="tab-button" :class="{ active: currentPage === '2' }" @click="currentPage = '2'">女主</div>
      <div class="tab-button" :class="{ active: currentPage === '3' }" @click="currentPage = '3'">世界</div>
      <div class="tab-button" :class="{ active: currentPage === '4' }" @click="currentPage = '4'">男主</div>
      <div class="tab-button" :class="{ active: currentPage === '5' }" @click="currentPage = '5'">事件</div>
    </div>

    <div class="page-container" :class="{ active: currentPage === '1' }">
      <ActionOptions :statData="statData" :currentMessage="currentMessage" @send="处理发送" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '2' }">
      <Female :statData="statData" :currentMessage="currentMessage" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '3' }">
      <World :statData="statData" :currentMessage="currentMessage" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '4' }">
      <Male :statData="statData" :currentMessage="currentMessage" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '5' }">
      <RecentEvents :statData="statData" :currentMessage="currentMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import World from './components/世界.vue';
import VariableDisplay from './components/变量显示.vue';
import Female from './components/女主.vue';
import RecentEvents from './components/最近事件.vue';
import Male from './components/男主.vue';
import ActionOptions from './components/行动选项.vue';

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
  顾言?: {
    年龄?: number;
    关系?: string;
    当前着装?: string;
    当前姿势?: string;
    当前想法?: string;
    身体感受?: string;
    隐藏身份?: string;
    射精进度?: number;
  };
  事件?: string[];
}

const currentPage = ref('1');
const currentTime = ref('加载中...');
const currentLocation = ref('加载中...');
const statData = ref<StatData>({});
const currentMessage = ref<any>(null);

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

  const messages = getChatMessages(-1);
  if (messages && messages.length > 0) {
    currentMessage.value = messages[0];
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

onMounted(() => {
  加载数据();
});
</script>
