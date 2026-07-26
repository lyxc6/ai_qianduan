<template>
  <div class="main">
    <div class="world-info">
      <div class="world-info-box">
        <div class="world-info-item-display">⏰日期：</div>
        <div class="world-info-item-display" id="current-time">{{ currentTime }}</div>
      </div>
      <div class="world-info-box">
        <div class="world-info-item-display">🌤天气：</div>
        <div class="world-info-item-display" id="current-weather">{{ currentWeather }}</div>
      </div>
    </div>

    <div class="tab-bar">
      <div class="tab-button" :class="{ active: currentPage === '1' }" @click="currentPage = '1'">行动</div>
      <div class="tab-button" :class="{ active: currentPage === '2' }" @click="currentPage = '2'">苏晚棠</div>
      <div class="tab-button" :class="{ active: currentPage === '3' }" @click="currentPage = '3'">沈含烟</div>
      <div class="tab-button" :class="{ active: currentPage === '4' }" @click="currentPage = '4'">陆辞夜</div>
      <div class="tab-button" :class="{ active: currentPage === '5' }" @click="currentPage = '5'">世界</div>
      <div class="tab-button" :class="{ active: currentPage === '6' }" @click="currentPage = '6'">变量</div>
    </div>

    <div class="page-container" :class="{ active: currentPage === '1' }">
      <ActionOptions :statData="statData" :currentMessage="currentMessage" @send="handleSend" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '2' }">
      <SuwanTang :statData="statData" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '3' }">
      <ShenHanYan :statData="statData" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '4' }">
      <LuCiYe :statData="statData" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '5' }">
      <World :statData="statData" />
    </div>

    <div class="page-container" :class="{ active: currentPage === '6' }">
      <VariableDisplay :statData="statData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SuwanTang from './components/苏晚棠.vue';
import ShenHanYan from './components/沈含烟.vue';
import LuCiYe from './components/陆辞夜.vue';
import World from './components/世界.vue';
import ActionOptions from './components/行动选项.vue';
import VariableDisplay from './components/变量显示.vue';

defineOptions({
  unusedWarnings: false,
});

interface StatData {
  苏晚棠?: {
    好感对陆辞夜?: number;
    好感对沈含烟?: number;
    沦陷?: number;
    生理阶段?: string;
    生理天数?: number;
    上次经期?: string;
    处女?: boolean;
    经验等级?: number;
    胸部开发?: number;
    阴蒂开发?: number;
    阴道开发?: number;
    后庭开发?: number;
    兴奋度?: number;
    湿润度?: number;
    高潮次数?: number;
    亲密状态?: string;
    耳朵敏感?: number;
    后颈敏感?: number;
    腰部敏感?: number;
    大腿内侧敏感?: number;
    胸部敏感?: number;
    阴蒂敏感?: number;
    身体记忆?: Record<string, { 描述: string; 触发条件: string; 强度: number }>;
    当前头发?: string;
    当前上装?: string;
    当前下装?: string;
    当前内衣?: string;
    当前袜子?: string;
    当前鞋子?: string;
    当前饰品?: string;
    当前胸部?: string;
    当前阴部?: string;
  };
  沈含烟?: {
    好感对陆辞夜?: number;
    好感对苏晚棠?: number;
    沦陷?: number;
    生理阶段?: string;
    生理天数?: number;
    上次经期?: string;
    处女?: boolean;
    经验等级?: number;
    胸部开发?: number;
    阴蒂开发?: number;
    阴道开发?: number;
    后庭开发?: number;
    兴奋度?: number;
    湿润度?: number;
    高潮次数?: number;
    亲密状态?: string;
    耳朵敏感?: number;
    后颈敏感?: number;
    腰部敏感?: number;
    大腿内侧敏感?: number;
    胸部敏感?: number;
    阴蒂敏感?: number;
    身体记忆?: Record<string, { 描述: string; 触发条件: string; 强度: number }>;
    当前头发?: string;
    当前上装?: string;
    当前下装?: string;
    当前内衣?: string;
    当前袜子?: string;
    当前鞋子?: string;
    当前饰品?: string;
    当前胸部?: string;
    当前阴部?: string;
  };
  陆辞夜?: {
    好感对苏晚棠?: number;
    好感对沈含烟?: number;
  };
  世界?: {
    年?: number;
    月?: number;
    日?: number;
    星期?: string;
    时段?: string;
    天气?: string;
    特殊日期?: Record<string, { 名称: string; 日期: string; 类型: string; 状态: string }>;
    主线任务?: Record<string, { 标题: string; 状态: string; 描述: string }>;
    支线任务?: Record<string, { 标题: string; 状态: string; 描述: string }>;
    计数器?: {
      特殊日期?: number;
      身体记忆?: number;
      主线任务?: number;
      支线任务?: number;
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
const currentWeather = ref('加载中...');
const statData = ref<StatData>({});
const currentMessage = ref<any>(null);

async function loadData() {
  await waitGlobalInitialized('Mvu');
  const data = getAllVariables().stat_data;
  statData.value = data || {};

  if (data.世界) {
    const world = data.世界;
    if (world.年 && world.月 && world.日) {
      currentTime.value = `${world.年}年${world.月}月${world.日}日 ${world.星期 || ''} ${world.时段 || ''}`;
    }
    if (world.天气) {
      currentWeather.value = world.天气;
    }
  }

  if (data.事件 && Array.isArray(data.事件)) {
    insertVariables({ 最近事件: [...data.事件] }, { type: 'chat' });
  }

  const messages = getChatMessages(-1);
  if (messages && messages.length > 0) {
    currentMessage.value = messages[0];
  }
}

function handleSend(text: string) {
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
  loadData();
});
</script>