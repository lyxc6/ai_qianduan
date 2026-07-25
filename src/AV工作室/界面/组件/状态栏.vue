<template>
  <div class="bg-main rounded-lg p-2 flex flex-col animate-fadeIn" style="height: var(--panel-max-height); background: var(--bg-main);">
    <!-- Header -->
    <div class="rounded-lg p-3 mb-2 relative" style="background: var(--bg-card); border-left: 3px solid var(--accent-purple); box-shadow: var(--shadow-card);">
      <div class="flex flex-row justify-between items-center mb-1">
        <span class="font-title text-xs tracking-wider" style="color: var(--accent-purple); min-width: 3rem;">阶段</span>
        <span class="font-title text-xs text-secondary tracking-wider flex-1 text-right" style="color: var(--stat-fame);">{{ currentPhase }}</span>
      </div>
      <div class="flex flex-row justify-between items-center mb-1">
        <span class="font-title text-xs tracking-wider" style="color: var(--accent-purple); min-width: 3rem;">时间</span>
        <span class="font-title text-xs text-secondary tracking-wider flex-1 text-right" style="color: var(--text-primary);">{{ currentTime }}</span>
      </div>
      <div class="flex flex-row justify-between items-center mb-1">
        <span class="font-title text-xs tracking-wider" style="color: var(--accent-purple); min-width: 3rem;">工作室</span>
        <span class="font-title text-xs text-secondary tracking-wider flex-1 text-right" style="color: var(--accent-teal);">{{ studioName }}</span>
      </div>
      <div class="flex flex-row justify-between items-center">
        <span class="font-title text-xs tracking-wider" style="color: var(--accent-purple); min-width: 3rem;">知名度</span>
        <span class="font-title text-xs text-secondary tracking-wider flex-1 text-right" style="color: var(--stat-fame);">{{ fameDisplay }}</span>
      </div>
      <!-- Extra Model Status -->
      <div
        v-if="isExtraModelBusy"
        class="mt-2 pt-2 text-center text-xs animate-pulse rounded"
        style="border-top: 1px solid var(--border-subtle); color: var(--accent-cyan); padding: 4px 0;"
      >
        额外模型解析中...
      </div>
    </div>

    <!-- Tab Bar -->
    <div v-if="!subPage" class="flex justify-between mt-1 rounded-t-lg p-1 overflow-x-auto flex-shrink-0" style="background: var(--tabbar-bg);">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="flex-1 font-title text-xs sm:text-sm tracking-wider py-2.5 px-2 cursor-pointer bg-transparent rounded-t-md transition-all duration-300 text-center relative overflow-hidden tab-btn"
        :class="{ active: currentTab === tab.id }"
        @click="currentTab = tab.id"
      >
        {{ tab.label }}
      </div>
    </div>

    <!-- Tab Content -->
    <div class="bg-panel flex-1 min-h-0 overflow-y-auto scroll-contain rounded-b-lg p-2" style="background: var(--bg-panel); box-shadow: var(--shadow-card);">
      <template v-if="!subPage">
        <div v-for="tab in tabs" :key="'content-' + tab.id" class="hidden" :class="{ '!block': currentTab === tab.id }">
          <RecruitPanel v-if="tab.id === '1'" :statData="statData" @send="处理发送" />
          <NegotiatePanel v-if="tab.id === '2'" :statData="statData" />
          <ShootPanel v-if="tab.id === '3'" :statData="statData" />
          <ResultPanel v-if="tab.id === '4'" :statData="statData" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from 'vue';
import RecruitPanel from './招募面板.vue';
import NegotiatePanel from './交涉面板.vue';
import ShootPanel from './拍摄面板.vue';
import ResultPanel from './收尾面板.vue';

defineOptions({ unusedWarnings: false });

const tabs = [
  { id: '1', label: '招募' },
  { id: '2', label: '交涉' },
  { id: '3', label: '拍摄' },
  { id: '4', label: '收尾' },
];

const currentTab = ref('1');
const currentTime = ref('加载中...');
const currentPhase = ref('---');
const studioName = ref('梦幻映像');
const statData = ref<any>({});
const subPage = ref<any>(null);
const isExtraModelBusy = ref(false);
let pollTimer: ReturnType<typeof setInterval> | null = null;

const fameDisplay = computed(() => {
  const fame = statData.value?.工作室?.知名度;
  if (fame === undefined || fame === null) return '---';
  return '★'.repeat(Math.floor(fame)) + '☆'.repeat(5 - Math.floor(fame)) + ` ${fame}`;
});

function checkExtraModel() {
  try {
    isExtraModelBusy.value = (window as any).Mvu?.isDuringExtraAnalysis?.() ?? false;
  } catch {
    isExtraModelBusy.value = false;
  }
}

async function 加载数据() {
  try {
    await waitGlobalInitialized('Mvu');
    const data = getAllVariables().stat_data;
    statData.value = data || {};

    if (data?.当前时间) currentTime.value = data.当前时间;
    if (data?.当前阶段) currentPhase.value = data.当前阶段;
    if (data?.工作室?.名称) studioName.value = data.工作室.名称;

    if (data?.当前阶段) {
      const phaseMap: Record<string, string> = {
        '招募': '1', '交涉': '2', '拍摄': '3', '收尾': '4',
      };
      currentTab.value = phaseMap[data.当前阶段] || '1';
    }
  } catch (e) {
    console.error('加载MVU数据失败:', e);
  }
}

function 处理发送(text: string) {
  const trimmedText = String(text).trim();
  if (!trimmedText) return;

  try {
    const $textarea = $(parent.document).find('#send_textarea');
    if ($textarea.length === 0) return;

    const currentContent = $textarea.val() || '';
    if (currentContent.includes(trimmedText)) return;

    const separator = currentContent.trim() ? '\n' : '';
    const newContent = currentContent + separator + trimmedText;
    $textarea.val(newContent);
    $textarea.trigger('input');
  } catch (error) {
    console.error('发送消息失败:', error);
  }
}

function setupMvuListener() {
  try {
    const mvu = (window as any).Mvu;
    if (mvu?.events?.VARIABLE_UPDATE_ENDED) {
      mvu.events.VARIABLE_UPDATE_ENDED.subscribe(() => {
        setTimeout(加载数据, 300);
      });
    }
  } catch {
    console.warn('MVU事件监听注册失败，使用轮询');
  }
}

onMounted(() => {
  加载数据();
  setupMvuListener();
  checkExtraModel();
  pollTimer = setInterval(checkExtraModel, 1500);
});

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer);
});
</script>

<style scoped>
.hidden {
  display: none !important;
}
.\!block {
  display: block !important;
}
</style>
