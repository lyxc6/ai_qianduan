<template>
  <div class="bg-main rounded-lg p-2 flex flex-col relative animate-fadeIn max-h-[46rem]">
    <div class="rounded-lg p-3 mb-2" style="background: linear-gradient(135deg, rgba(20, 12, 40, 0.85) 0%, rgba(30, 18, 60, 0.75) 100%); border-left: 3px solid var(--color-primary); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(167, 139, 250, 0.1);">
      <div class="flex flex-row justify-between items-center mb-1">
        <div class="font-title text-[0.9rem] text-secondary tracking-wider" style="min-width: 4.5rem; color: var(--color-primary);">日期：</div>
        <div class="font-title text-[0.9rem] text-secondary tracking-wider font-serif font-medium flex-1 text-right pl-2 text-primary" id="current-time">{{ currentTime }}</div>
      </div>
      <div class="flex flex-row justify-between items-center">
        <div class="font-title text-[0.9rem] text-secondary tracking-wider" style="min-width: 4.5rem; color: var(--color-primary);">地点：</div>
        <div class="font-title text-[0.9rem] text-secondary tracking-wider font-serif font-medium flex-1 text-right pl-2 text-primary" id="current-location">{{ currentLocation }}</div>
      </div>
    </div>

    <div v-if="!subPage" class="flex justify-between mt-1 rounded-t-lg p-1" style="background: linear-gradient(135deg, rgba(20, 12, 40, 0.6) 0%, rgba(30, 18, 60, 0.4) 100%);">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="flex-1 font-title text-[0.9rem] text-secondary tracking-wider py-3 px-2 cursor-pointer bg-transparent rounded-t-md transition-all duration-300 text-center relative overflow-hidden hover:text-primary"
        style="border: 1px solid transparent;"
        :class="{ 'active-tab': currentPage === tab.id }"
        @click="currentPage = tab.id"
      >
        {{ tab.label }}
      </div>
    </div>

    <div
      class="bg-panel backdrop-blur-[10px] flex-1 min-h-0 overflow-y-auto scroll-contain"
      :class="subPage ? 'rounded-lg p-2' : 'rounded-b-lg p-2'"
      style="box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.4);"
    >
      <template v-if="!subPage">
        <div v-for="tab in tabs" :key="'content-' + tab.id" class="hidden" :class="{ '!block': currentPage === tab.id }">
          <ActionOptions v-if="tab.id === '1'" :statData="statData" @send="处理发送" />
          <CharacterInfo v-if="tab.id === '2'" :statData="statData" />
          <Harem v-if="tab.id === '3'" :statData="statData" @showDetail="显示角色详情" />
          <FactionsInfo v-if="tab.id === '4'" :statData="statData" />
        </div>
      </template>
      <CharacterDetailPage
        v-else
        :characterName="subPage.characterName"
        :statData="statData"
        @back="subPage = null"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Harem from './components/后宫.vue';
import ActionOptions from './components/行动选项.vue';
import CharacterInfo from './components/角色信息.vue';
import CharacterDetailPage from './components/角色详情弹窗.vue';
import FactionsInfo from './components/势力信息.vue';

defineOptions({
  unusedWarnings: false,
});

interface FactionInfo {
  关系?: string;
  趋势?: string;
  上次互动?: string;
}

interface StatData {
  世界?: {
    时间?: string;
    地点?: string;
  };
  主角?: {
    姓名?: string;
    年龄?: number;
    力量等级?: string;
    修行路线?: string;
    侧重?: string;
    灵魂能量?: number;
    当前着装?: string;
    当前姿势?: string;
    当前位置?: string;
    当前想法?: string;
    最近性行为?: string;
    阴茎状态?: string;
    射精进度?: number;
    龙血?: Record<string, any>;
  };
  角色?: Record<string, {
    年龄?: number;
    处女?: boolean;
    力量等级?: string;
    好感度?: number;
    后宫地位?: string;
    修行路线?: string;
    灵魂倾向?: string;
    擅长魔法?: string;
    当前着装?: string;
    当前姿势?: string;
    当前想法?: string;
    最近性行为?: string;
    当前小穴状态?: string;
    当前胸部状态?: string;
    怀孕状态?: string;
    身体状态?: string;
    高潮次数?: number;
    内射次数?: number;
    背景?: string;
    外貌?: Record<string, string>;
    性格?: Record<string, string>;
    能力?: Record<string, string>;
    NSFW?: Record<string, string>;
    种族?: string;
    阶级?: Record<string, string>;
    职业?: string;
    烙印状态?: string;
    当前烙印反应?: string;
  }>;
  后宫?: {
    总数?: number;
    平均好感度?: number;
    满意度?: string;
  };
  行动选项?: {
    选项一?: string;
    选项二?: string;
    选项三?: string;
    选项四?: string;
  };
  势力?: Record<string, FactionInfo>;
  当前主线?: string;
  任务列表?: Record<string, {
    类型?: string;
    说明?: string;
    进度?: string;
    奖励?: string;
  }>;
}

const tabs = [
  { id: '1', label: '行动选项' },
  { id: '2', label: '主角' },
  { id: '3', label: '后宫' },
  { id: '4', label: '势力' },
];

const currentPage = ref('1');
const currentTime = ref('加载中...');
const currentLocation = ref('加载中...');
const statData = ref<StatData>({});
const subPage = ref<{ type: string; characterName: string } | null>(null);

async function 加载数据() {
  await waitGlobalInitialized('Mvu');
  const data = getAllVariables().stat_data;
  statData.value = data || {};

  if (data.世界?.时间) currentTime.value = data.世界.时间;
  if (data.世界?.地点) currentLocation.value = data.世界.地点;
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
  subPage.value = { type: 'characterDetail', characterName };
}

onMounted(() => {
  加载数据();
});
</script>

<style>
.active-tab {
  color: var(--text-title) !important;
  background-color: var(--bg-panel) !important;
  border-bottom: 1px solid var(--bg-panel);
  transform: translateY(-1px);
}

.active-tab::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  border-radius: 0.25rem 0.25rem 0 0;
}
</style>
