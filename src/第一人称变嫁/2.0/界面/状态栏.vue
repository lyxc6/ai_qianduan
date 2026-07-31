<template>
  <div
    :data-theme="theme"
    :data-scheme="scheme"
    class="bg-main animate-fadeIn relative flex flex-col rounded-lg p-2"
    style="height: var(--panel-max-height);"
  >
    <div class="head-bar">
      <div class="min-w-0">
        <div class="head-date font-title">{{ dateText }}</div>
        <div class="head-sub">{{ weekText }}</div>
      </div>
      <div class="head-chips">
        <button
          type="button"
          class="scheme-btn"
          :title="scheme === 'dark' ? '切换为浅色主题' : '切换为深色主题'"
          @click="toggleScheme"
        >
          {{ scheme === 'dark' ? '☀️' : '🌙' }}
        </button>
        <span class="head-chip">🌤 {{ currentWeather || '—' }}</span>
        <span class="head-chip">👤 {{ currentView || '—' }}</span>
        <span v-if="stageLabel" class="stage-badge" :class="stageClass">{{ stageLabel }}</span>
      </div>
    </div>

    <div class="tab-bar">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-item"
        :class="{ active: currentPage === tab.id }"
        @click="switchTab(tab.id)"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </div>
    </div>

    <div class="bg-panel scroll-contain relative min-h-0 flex-1 overflow-y-auto rounded-b-lg p-2 backdrop-blur-[10px]" style="box-shadow: inset 0 0 40px var(--shadow-soft);">
      <div v-for="tab in tabs" :key="'content-' + tab.id" class="hidden" :class="{ '!block': currentPage === tab.id }">
        <ActionOptions v-if="tab.id === '1'" :statData="statData" :currentMessage="currentMessage" @send="handleSend" />
        <SuwanTang v-if="tab.id === '2'" :statData="statData" />
        <ShenHanYan v-if="tab.id === '3'" :statData="statData" />
        <LuCiYe v-if="tab.id === '4'" :statData="statData" />
        <World v-if="tab.id === '5'" :statData="statData" />
        <UpdateDisplay v-if="tab.id === '6'" :statData="statData" :currentMessage="currentMessage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import SuwanTang from './components/苏晚棠.vue';
import ShenHanYan from './components/沈含烟.vue';
import LuCiYe from './components/陆辞夜.vue';
import World from './components/世界.vue';
import ActionOptions from './components/行动选项.vue';
import UpdateDisplay from './components/更新显示.vue';

defineOptions({
  unusedWarnings: false,
});

const tabs = [
  { id: '1', label: '行动', icon: '⚡' },
  { id: '2', label: '苏晚棠', icon: '🌸' },
  { id: '3', label: '沈含烟', icon: '❄️' },
  { id: '4', label: '陆辞夜', icon: '♟' },
  { id: '5', label: '世界', icon: '🌿' },
  { id: '6', label: '更新', icon: '📝' },
];

const THEME_MAP: Record<string, string> = {
  '1': 'action',
  '2': 'swt',
  '3': 'sht',
  '4': 'lcy',
  '5': 'world',
  '6': 'updates',
};

interface StatData {
  苏晚棠?: {
    攻略阶段?: string;
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
    攻略阶段?: string;
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
    攻略阶段?: string;
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
const statData = ref<StatData>({});
const currentMessage = ref<any>(null);

const SCHEME_KEY = 'lj_theme_scheme';

const scheme = ref<'light' | 'dark'>('light');

function detectInitialScheme(): 'light' | 'dark' {
  const saved = localStorage.getItem(SCHEME_KEY);
  if (saved === 'dark' || saved === 'light') {
    return saved;
  }
  try {
    const body = parent.document.body;
    if (body && typeof body.classList.contains === 'function' && body.classList.contains('darkTheme')) {
      return 'dark';
    }
  } catch {
    // ignore
  }
  return 'light';
}

function toggleScheme() {
  scheme.value = scheme.value === 'dark' ? 'light' : 'dark';
  try {
    localStorage.setItem(SCHEME_KEY, scheme.value);
  } catch {
    // ignore
  }
}

const theme = computed(() => THEME_MAP[currentPage.value] || 'action');

const dateText = computed(() => {
  const world = statData.value.世界;
  if (world?.年 && world?.月 && world?.日) {
    return `${world.年}年${world.月}月${world.日}日`;
  }
  return '——';
});

const weekText = computed(() => {
  const world = statData.value.世界;
  if (!world?.年) return '加载中...';
  return [world.星期, world.时段].filter(Boolean).join(' · ');
});

const currentWeather = computed(() => statData.value.世界?.天气 || '');

const currentView = computed(() => statData.value.行动选项?.当前视角 || '');

const stageLabel = computed(() => {
  const view = currentView.value;
  if (!view) return '';
  const char = (statData.value as Record<string, any>)[view];
  return char?.攻略阶段 || '';
});

const stageClass = computed(() => {
  const map: Record<string, string> = {
    抗拒期: 'stage-resist',
    驯化期: 'stage-tame',
    沦陷期: 'stage-fall',
    狩猎期: 'stage-hunt',
    确认期: 'stage-confirm',
    守护期: 'stage-guard',
  };
  return map[stageLabel.value] || '';
});

async function loadData() {
  await waitGlobalInitialized('Mvu');
  const data = getAllVariables().stat_data;
  statData.value = data || {};

  const messages = getChatMessages(-1);
  if (messages && messages.length > 0) {
    currentMessage.value = messages[0];
  }
}

function switchTab(id: string) {
  currentPage.value = id;
  loadData();
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
  scheme.value = detectInitialScheme();
  loadData();
});
</script>

<style scoped>
.head-bar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.45rem 0.6rem 0.6rem;
}

.head-date {
  font-size: 1.1rem;
  line-height: 1.2;
  color: var(--text-primary);
  letter-spacing: 0.06em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.head-sub {
  font-size: 0.68rem;
  color: var(--text-secondary);
  margin-top: 0.1rem;
}

.head-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  justify-content: flex-end;
  align-items: center;
}

.head-chip {
  display: inline-flex;
  align-items: center;
  background: var(--char-bg);
  color: var(--char-deep);
  border: 1px solid var(--char-border);
  border-radius: 999px;
  padding: 0.12rem 0.6rem;
  font-size: 0.7rem;
  white-space: nowrap;
}

.scheme-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 999px;
  background: var(--char-bg);
  border: 1px solid var(--char-border);
  color: var(--char-deep);
  font-size: 0.85rem;
  line-height: 1;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.scheme-btn:hover {
  transform: scale(1.1);
  background: var(--char-bg-strong);
  border-color: var(--char-color);
}

.tab-bar {
  display: flex;
  gap: 2px;
  padding: 0 0.5rem;
  border-bottom: 1px solid var(--hairline);
  overflow-x: auto;
  flex-shrink: 0;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.45rem 0.65rem;
  font-family: var(--font-title);
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  border-radius: 0.45rem 0.45rem 0 0;
  transition:
    color 0.25s ease,
    background-color 0.25s ease,
    border-color 0.25s ease;
  user-select: none;
}

.tab-item:hover {
  color: var(--text-primary);
  background: var(--char-bg);
}

.tab-item.active {
  color: var(--char-deep);
  border-bottom-color: var(--char-color);
  background: var(--char-bg-strong);
}

.tab-icon {
  font-size: 0.85rem;
  line-height: 1;
}
</style>
