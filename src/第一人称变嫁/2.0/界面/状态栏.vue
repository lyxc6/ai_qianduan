<template>
  <div class="bg-main rounded-lg p-2 flex flex-col relative animate-fadeIn" style="height: var(--panel-max-height);">
    <div class="rounded-lg p-3 mb-2" style="background: var(--warm-bg-light); border-left: 3px solid var(--user-color-primary); box-shadow: 0 2px 8px var(--warm-shadow), inset 0 1px 0 var(--warm-inner-light);">
      <div class="flex flex-row justify-between items-center mb-1">
        <div class="font-title text-[0.9rem] text-secondary tracking-wider" style="min-width: 4.5rem; color: var(--text-title);">⏰日期：</div>
        <div class="font-title text-[0.9rem] text-secondary tracking-wider font-serif font-medium flex-1 text-right pl-2 text-primary" id="current-time">{{ currentTime }}</div>
      </div>
      <div class="flex flex-row justify-between items-center">
        <div class="font-title text-[0.9rem] text-secondary tracking-wider" style="min-width: 4.5rem; color: var(--text-title);">🌤天气：</div>
        <div class="font-title text-[0.9rem] text-secondary tracking-wider font-serif font-medium flex-1 text-right pl-2 text-primary" id="current-weather">{{ currentWeather }}</div>
      </div>
    </div>

    <div class="flex justify-between mt-1 rounded-t-lg p-1 overflow-x-auto flex-shrink-0" style="background: var(--warm-bg-medium);">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="flex-1 font-title text-[0.8rem] sm:text-[0.9rem] text-secondary tracking-wider py-2.5 md:py-3 px-2 cursor-pointer bg-transparent rounded-t-md transition-all duration-300 text-center relative overflow-hidden hover:text-primary"
        style="border: 1px solid transparent;"
        :class="{ 'active-tab': currentPage === tab.id }"
        @click="currentPage = tab.id"
      >
        {{ tab.label }}
      </div>
    </div>

    <div class="bg-panel backdrop-blur-[10px] flex-1 min-h-0 overflow-y-auto scroll-contain rounded-b-lg p-2 relative" style="box-shadow: inset 0 0 40px var(--warm-shadow);">
      <div v-for="tab in tabs" :key="'content-' + tab.id" class="hidden" :class="{ '!block': currentPage === tab.id }">
        <ActionOptions v-if="tab.id === '1'" :statData="statData" :currentMessage="currentMessage" @send="handleSend" />
        <SuwanTang v-if="tab.id === '2'" :statData="statData" />
        <ShenHanYan v-if="tab.id === '3'" :statData="statData" />
        <LuCiYe v-if="tab.id === '4'" :statData="statData" />
        <World v-if="tab.id === '5'" :statData="statData" />
        <VariableDisplay v-if="tab.id === '6'" :statData="statData" />
      </div>
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

const tabs = [
  { id: '1', label: '行动' },
  { id: '2', label: '苏晚棠' },
  { id: '3', label: '沈含烟' },
  { id: '4', label: '陆辞夜' },
  { id: '5', label: '世界' },
  { id: '6', label: '变量' },
];

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

<style>
.active-tab {
  color: var(--text-title) !important;
  background-color: var(--warm-bg-light) !important;
  border-bottom: 1px solid var(--warm-bg-light);
  transform: translateY(-1px);
}

.active-tab::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--user-color-primary), var(--user-color-secondary));
  border-radius: 0.25rem 0.25rem 0 0;
}
</style>