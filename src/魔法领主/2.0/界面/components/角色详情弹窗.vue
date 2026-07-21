<template>
  <div class="flex flex-col">
    <div class="flex items-center gap-2 p-3 flex-shrink-0" style="border-bottom: var(--theme-content-panel-border);">
      <button class="bg-transparent border-none text-secondary cursor-pointer px-1 py-0.5 leading-none transition-colors duration-300 hover:text-primary font-title text-[0.9rem] sm:text-[1rem] flex items-center gap-1" @click="$emit('back')">
        <span class="text-[1rem] sm:text-[1.2rem]">←</span> 返回
      </button>
      <div class="font-title text-[0.95rem] sm:text-[1.1rem] text-title tracking-wider ml-2">{{ characterName }}</div>
    </div>

    <div class="flex gap-1 px-3 pt-2 pb-0 overflow-x-auto flex-shrink-0" style="border-bottom: var(--theme-content-panel-border);">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="flex-shrink-0 px-3 py-2 sm:px-4 sm:py-2.5 font-title text-[0.75rem] sm:text-[0.8rem] transition-all duration-300 whitespace-nowrap"
        :style="activeTab === index ? tabActiveStyle : tabInactiveStyle"
        @click="activeTab = index"
      >
        {{ tab.label }}
      </button>
    </div>

    <div
      class="p-3 scroll-contain"
      @touchstart.passive="onTouchStart"
      @touchend="onTouchEnd"
    >
      <div class="flex flex-col gap-3">
        <template v-if="activeTab === 0">
          <div class="rounded-lg p-3" style="background: rgba(0, 0, 0, 0.2);">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="flex flex-col">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">年龄</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed font-medium">{{ characterData.年龄 ?? 'N/A' }}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">处女</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed">{{ characterData.处女 ? '是' : '否' }}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">力量等级</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed">{{ characterData.力量等级 || '未知' }}</span>
              </div>
              <div class="flex flex-col" v-if="characterData.修行路线">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">修行路线</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed">{{ characterData.修行路线 }}</span>
              </div>
              <div class="flex flex-col" v-if="characterData.灵魂倾向">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">灵魂倾向</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed">{{ characterData.灵魂倾向 }}</span>
              </div>
              <div class="flex flex-col" v-if="characterData.擅长魔法">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">擅长魔法</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed">{{ characterData.擅长魔法 }}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">好感度</span>
                <div class="flex items-center gap-2">
                  <div class="flex-1 h-2 rounded-sm overflow-hidden" style="background: rgba(0, 0, 0, 0.3);">
                    <div class="h-full rounded-sm" style="background: var(--theme-accent-bar);" :style="{ width: Math.min(characterData.好感度 ?? 0, 100) + '%' }"></div>
                  </div>
                  <span class="text-[0.75rem] sm:text-[0.8rem] text-primary">{{ characterData.好感度 ?? 'N/A' }}</span>
                </div>
              </div>
              <div class="flex flex-col">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">种族</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed">{{ characterData.种族 || '未知' }}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">职业</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed">{{ characterData.职业 || '未知' }}</span>
              </div>
              <div class="flex flex-col col-span-1 sm:col-span-2">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">后宫地位</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed">{{ characterData.后宫地位 || '未知' }}</span>
              </div>
              <div class="flex flex-col" v-if="characterData.阶级">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">阶级</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed">{{ characterData.阶级.名称 || '未知' }} {{ characterData.阶级.等级 }}</span>
              </div>
            </div>
          </div>
        </template>

        <template v-if="activeTab === 1">
          <div class="rounded-lg p-3" style="background: rgba(0, 0, 0, 0.2);">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="flex flex-col col-span-1 sm:col-span-2">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">当前着装</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed">{{ characterData.当前着装 || '未知' }}</span>
              </div>
              <div class="flex flex-col col-span-1 sm:col-span-2">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">当前姿势</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed">{{ characterData.当前姿势 || '未知' }}</span>
              </div>
              <div class="flex flex-col col-span-1 sm:col-span-2">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">当前想法</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed font-serif italic" style="color: var(--theme-label-accent);">{{ characterData.当前想法 || '未知' }}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">小穴状态</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed">{{ characterData.当前小穴状态 || '未知' }}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">胸部状态</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed">{{ characterData.当前胸部状态 || '未知' }}</span>
              </div>
              <div class="flex flex-col col-span-1 sm:col-span-2">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">身体状态</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed">{{ characterData.身体状态 || '未知' }}</span>
              </div>
              <div class="flex flex-col col-span-1 sm:col-span-2">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">最近性行为</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed">{{ characterData.最近性行为 || '暂无' }}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">怀孕状态</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed" :style="isPregnant ? 'color: var(--accent-color); font-weight: 600;' : ''">{{ characterData.怀孕状态 || '未知' }}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">高潮次数</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed">{{ characterData.高潮次数 ?? 0 }}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">内射次数</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed">{{ characterData.内射次数 ?? 0 }}</span>
              </div>
              <div class="flex flex-col">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">烙印状态</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed">{{ characterData.烙印状态 || '无烙印' }}</span>
              </div>
              <div class="flex flex-col col-span-1 sm:col-span-2">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary mb-0.5">烙印反应</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed">{{ characterData.当前烙印反应 || '无' }}</span>
              </div>
            </div>
          </div>
        </template>

        <template v-if="activeTab === 2">
          <div class="rounded-lg p-3" v-if="characterData.外貌" style="background: rgba(0, 0, 0, 0.2);">
            <div class="font-title text-sm sm:text-[0.85rem] mb-2 tracking-wider pb-1" style="color: var(--theme-subtab-section-title-color); border-bottom: var(--theme-subtab-section-divider);">外貌</div>
            <div class="flex flex-col gap-2">
              <div class="flex justify-between items-center" v-for="(value, key) in characterData.外貌" :key="String(key)">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary flex-shrink-0 min-w-[3rem]">{{ key }}</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed text-right">{{ value || '未知' }}</span>
              </div>
            </div>
          </div>
          <div class="rounded-lg p-3" v-if="characterData.性格" style="background: rgba(0, 0, 0, 0.2);">
            <div class="font-title text-sm sm:text-[0.85rem] mb-2 tracking-wider pb-1" style="color: var(--theme-subtab-section-title-color); border-bottom: var(--theme-subtab-section-divider);">性格</div>
            <div class="flex flex-col gap-2">
              <div class="flex justify-between items-center" v-for="(value, key) in characterData.性格" :key="String(key)">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary flex-shrink-0 min-w-[3rem]">{{ key }}</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed text-right">{{ value || '未知' }}</span>
              </div>
            </div>
          </div>
          <div class="rounded-lg p-3" v-if="characterData.能力" style="background: rgba(0, 0, 0, 0.2);">
            <div class="font-title text-sm sm:text-[0.85rem] mb-2 tracking-wider pb-1" style="color: var(--theme-subtab-section-title-color); border-bottom: var(--theme-subtab-section-divider);">能力</div>
            <div class="flex flex-col gap-2">
              <div class="flex justify-between items-center" v-for="(value, key) in characterData.能力" :key="String(key)">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary flex-shrink-0 min-w-[3rem]">{{ key }}</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed text-right">{{ value || '未知' }}</span>
              </div>
            </div>
          </div>
          <div class="rounded-lg p-3" v-if="characterData.NSFW" style="background: rgba(0, 0, 0, 0.2);">
            <div class="font-title text-sm sm:text-[0.85rem] mb-2 tracking-wider pb-1" style="color: var(--theme-subtab-section-title-color); border-bottom: var(--theme-subtab-section-divider);">NSFW</div>
            <div class="flex flex-col gap-2">
              <div class="flex justify-between items-center" v-for="(value, key) in characterData.NSFW" :key="String(key)">
                <span class="text-[0.6rem] sm:text-[0.65rem] text-secondary flex-shrink-0 min-w-[3rem]">{{ key }}</span>
                <span class="text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed text-right">{{ value || '未知' }}</span>
              </div>
            </div>
          </div>
          <div v-if="!characterData.外貌 && !characterData.性格 && !characterData.能力 && !characterData.NSFW" class="flex items-center justify-center h-20 text-secondary font-title text-sm sm:text-[0.9rem]">暂无详细信息</div>
        </template>

        <template v-if="activeTab === 3">
          <div class="rounded-lg p-3" v-if="characterData.背景" style="background: rgba(0, 0, 0, 0.2);">
            <div class="font-serif text-[0.75rem] sm:text-[0.8rem] text-primary leading-relaxed whitespace-pre-wrap">{{ characterData.背景 }}</div>
          </div>
          <div v-else class="flex items-center justify-center h-20 text-secondary font-title text-sm sm:text-[0.9rem]">暂无背景</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  characterName: string;
  statData: {
    角色?: Record<string, any>;
  };
}

const props = defineProps<Props>();
defineEmits<{
  back: [];
}>();

const tabs = [
  { label: '基本信息' },
  { label: '身体状态' },
  { label: '详细' },
  { label: '背景' },
];

const activeTab = ref(0);

const tabActiveStyle = {
  background: 'var(--theme-subtab-active-bg)',
  color: 'var(--text-title)',
  boxShadow: 'inset 0 -2px 0 var(--theme-subtab-active-indicator)',
};

const tabInactiveStyle = {
  background: 'transparent',
  color: 'var(--text-secondary)',
};

const characterData = computed(() => {
  if (!props.characterName || !props.statData?.角色) return {};
  return props.statData.角色[props.characterName] || {};
});

const isPregnant = computed(() => {
  const state = characterData.value.怀孕状态;
  return state && state !== '未怀孕';
});

let touchStartX = 0;
let touchStartY = 0;
const swipeThreshold = 50;

function onTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}

function onTouchEnd(e: TouchEvent) {
  const diffX = touchStartX - e.changedTouches[0].clientX;
  const diffY = touchStartY - e.changedTouches[0].clientY;

  if (Math.abs(diffX) < swipeThreshold || Math.abs(diffX) < Math.abs(diffY) * 1.5) return;

  if (diffX > 0 && activeTab.value < tabs.length - 1) {
    activeTab.value++;
  } else if (diffX < 0 && activeTab.value > 0) {
    activeTab.value--;
  }
}
</script>

<style>
</style>
