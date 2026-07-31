<template>
  <div :class="'bg-main rounded-lg p-2 flex flex-col relative animate-fadeIn theme-' + currentTheme" style="height: var(--panel-max-height);">
    <!-- 书脊头部 -->
    <div class="sig-header relative mb-1.5 flex-shrink-0 rounded-lg px-3 pt-2 pb-1.5" style="background: var(--theme-header-bg); border-bottom: var(--theme-header-border); box-shadow: var(--theme-header-shadow);">
      <div class="mb-0.5 flex items-center justify-between">
        <div class="header-title">Lord's Grimoire</div>
        <div class="relative">
          <button class="text-secondary cursor-pointer border-none bg-transparent px-1 py-0.5 leading-none transition-colors duration-200 hover:text-primary" title="切换主题" @click="showThemeSwitcher = !showThemeSwitcher">
            <i class="fa-solid fa-book" style="font-size: 0.85rem;"></i>
          </button>
          <div v-if="showThemeSwitcher" class="theme-switcher absolute top-full right-0 z-20 mt-1 rounded-lg px-2 py-1.5" style="background: var(--theme-bg-panel); border: var(--theme-content-panel-border); box-shadow: var(--theme-card-shadow);">
            <div
              v-for="t in themes"
              :key="t.id"
              :class="['theme-dot', t.id, { active: currentTheme === t.id }]"
              :title="t.label"
              @click="切换主题(t.id)"
            ></div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-0.5 pb-0.5">
        <div class="flex items-center gap-1.5">
          <i class="fa-solid fa-clock text-[0.65rem]" style="color: var(--theme-gold); min-width: 0.8rem; text-align: center;"></i>
          <span class="font-title text-[0.78rem] tracking-wider" style="color: var(--theme-label-accent);">日期</span>
          <span id="current-time" class="text-primary flex-1 text-right font-serif font-medium" style="font-size: 0.78rem;">{{ currentTime }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <i class="fa-solid fa-location-dot text-[0.65rem]" style="color: var(--theme-gold); min-width: 0.8rem; text-align: center;"></i>
          <span class="font-title text-[0.78rem] tracking-wider" style="color: var(--theme-label-accent);">地点</span>
          <span id="current-location" class="text-primary flex-1 text-right font-serif font-medium" style="font-size: 0.78rem;">{{ currentLocation }}</span>
        </div>
      </div>
    </div>

    <!-- 行动选项：常驻顶部 -->
    <div v-if="!subPage" class="mb-1.5 flex-shrink-0">
      <ActionOptions :stat-data="statData" @send="处理发送" />
    </div>

    <!-- 书签式 Tab -->
    <div v-if="!subPage" class="mb-1 flex flex-shrink-0 justify-between gap-1 px-0.5">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="bookmark-tab font-title text-secondary flex-1 px-2 py-2 text-center text-[0.78rem] tracking-wider sm:text-[0.85rem]"
        :class="{ active: currentPage === tab.id }"
        @click="currentPage = tab.id"
      >
        {{ tab.label }}
      </div>
    </div>

    <!-- 内容区 -->
    <div
      class="bg-panel scroll-contain relative min-h-0 flex-1 overflow-y-auto rounded-b-lg p-2 backdrop-blur-[10px]"
      style="box-shadow: var(--theme-panel-shadow);"
    >
      <template v-if="!subPage">
        <div v-for="tab in tabs" :key="'content-' + tab.id" class="hidden" :class="{ '!block': currentPage === tab.id }">
          <CharacterInfo v-if="tab.id === '2'" :stat-data="statData" />
          <Harem v-if="tab.id === '3'" :stat-data="statData" @show-detail="显示角色详情" />
          <FactionsInfo v-if="tab.id === '4'" :stat-data="statData" />
          <TaskInfo v-if="tab.id === '5'" :stat-data="statData" />
        </div>
      </template>
      <Transition name="drawer" mode="out-in">
        <CharacterDetailPage
          v-if="subPage"
          :key="'detail-' + subPage.characterName"
          :character-name="subPage.characterName"
          :stat-data="statData"
          @back="subPage = null"
        />
      </Transition>
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
import TaskInfo from './components/任务信息.vue';

const THEME_KEY = 'magic-lord-theme';

const themes = [
  { id: 'parchment', label: '羊皮纸魔法书' },
  { id: 'gothic', label: '暗黑哥特' },
];

const currentTheme = ref(loadTheme());
const showThemeSwitcher = ref(false);

function loadTheme(): string {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved && themes.some(t => t.id === saved)) return saved;
  } catch (_) {
    /* ignore */
  }
  return 'parchment';
}

function 切换主题(id: string) {
  currentTheme.value = id;
  showThemeSwitcher.value = false;
  try {
    localStorage.setItem(THEME_KEY, id);
  } catch (_) {
    /* ignore */
  }
}

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
  { id: '2', label: '主角' },
  { id: '3', label: '后宫' },
  { id: '4', label: '势力' },
  { id: '5', label: '任务' },
];

const currentPage = ref('2');
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
.header-title {
  font-family: var(--font-title);
  font-size: 1.15rem;
  font-weight: bold;
  letter-spacing: 3px;
  color: var(--text-title);
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.35);
  line-height: 1.2;
}
.theme-gothic .header-title {
  text-shadow: 0 0 10px rgba(139, 26, 58, 0.6);
}
</style>
