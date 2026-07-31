<template>
  <div class="flex h-full flex-col">
    <div class="flex flex-shrink-0 items-center gap-2 px-1 pb-2" style="border-bottom: var(--theme-content-panel-border);">
      <button
        class="text-secondary font-title flex cursor-pointer items-center gap-1 rounded border-none bg-transparent px-1.5 py-0.5 text-[0.85rem] leading-none transition-colors duration-300 hover:text-primary hover:bg-black/5"
        @click="$emit('back')"
      >
        <span class="text-[1rem] leading-none">←</span> 返回
      </button>
      <div class="flex min-w-0 items-center gap-1.5">
        <i class="fa-solid fa-user" style="color: var(--theme-gold); font-size: 0.7rem;"></i>
        <span class="font-title text-title truncate text-[0.95rem] tracking-wider sm:text-[1.05rem]">{{ characterName }}</span>
      </div>
    </div>

    <div class="flex flex-shrink-0 gap-0.5 overflow-x-auto pt-2 pb-1">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="bookmark-tab font-title flex-shrink-0 px-3 pt-1.5 pb-2 text-[0.72rem] tracking-wider whitespace-nowrap sm:text-[0.78rem]"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        {{ tab.label }}
      </button>
    </div>

    <div
      class="scroll-contain min-h-0 flex-1 overflow-y-auto pt-1"
      @touchstart.passive="onTouchStart"
      @touchend="onTouchEnd"
    >
      <div class="flex flex-col gap-2.5 pb-1">
        <template v-if="activeTab === 0">
          <div class="rounded-lg p-3" style="background: var(--theme-card-bg); border: var(--theme-card-border); box-shadow: var(--theme-card-shadow);">
            <div class="grid grid-cols-2 gap-x-3 gap-y-2.5">
              <InfoCell label="年龄" :value="characterData.年龄" fallback="N/A" />
              <InfoCell label="处女" :value="characterData.处女 ? '是' : '否'" fallback="否" />
              <InfoCell label="力量等级" :value="characterData.力量等级" fallback="未知" />
              <InfoCell v-if="characterData.修行路线" label="修行路线" :value="characterData.修行路线" />
              <InfoCell v-if="characterData.灵魂倾向" label="灵魂倾向" :value="characterData.灵魂倾向" />
              <InfoCell v-if="characterData.擅长魔法" label="擅长魔法" :value="characterData.擅长魔法" />
              <div class="col-span-2 flex flex-col">
                <span class="text-secondary mb-1 text-[0.62rem]">好感度</span>
                <div class="flex items-center gap-2">
                  <div class="scale-track flex-1" style="background: rgba(0, 0, 0, 0.2);">
                    <div class="scale-fill" style="background: var(--theme-accent-bar);" :style="{ width: Math.min(characterData.好感度 ?? 0, 100) + '%' }"></div>
                    <div v-for="n in [1, 2, 3]" :key="n" class="scale-notch" :style="{ left: (n * 25) + '%' }"></div>
                  </div>
                  <span class="text-primary flex-shrink-0 text-[0.72rem]">{{ characterData.好感度 ?? 'N/A' }}</span>
                </div>
              </div>
              <InfoCell label="种族" :value="characterData.种族" fallback="未知" />
              <InfoCell label="职业" :value="characterData.职业" fallback="未知" />
              <InfoCell v-if="characterData.阶级" label="阶级" :value="getClassText(characterData.阶级)" />
              <InfoCell class="col-span-2" label="后宫地位" :value="characterData.后宫地位" fallback="未知" />
            </div>
          </div>
        </template>

        <template v-if="activeTab === 1">
          <div class="rounded-lg p-3" style="background: var(--theme-card-bg); border: var(--theme-card-border); box-shadow: var(--theme-card-shadow);">
            <div class="grid grid-cols-2 gap-x-3 gap-y-2.5">
              <InfoCell class="col-span-2" label="当前着装" :value="characterData.当前着装" fallback="未知" />
              <InfoCell class="col-span-2" label="当前姿势" :value="characterData.当前姿势" fallback="未知" />
              <div class="col-span-2 flex flex-col">
                <span class="text-secondary mb-1 text-[0.62rem]">当前想法</span>
                <span class="text-primary font-serif text-[0.75rem] leading-relaxed italic" style="color: var(--theme-label-accent);">{{ characterData.当前想法 || '未知' }}</span>
              </div>
              <InfoCell label="小穴状态" :value="characterData.当前小穴状态" fallback="未知" />
              <InfoCell label="胸部状态" :value="characterData.当前胸部状态" fallback="未知" />
              <InfoCell class="col-span-2" label="身体状态" :value="characterData.身体状态" fallback="未知" />
              <InfoCell class="col-span-2" label="最近性行为" :value="characterData.最近性行为" fallback="暂无" />
              <div class="flex flex-col">
                <span class="text-secondary mb-1 text-[0.62rem]">怀孕状态</span>
                <span
                  class="font-serif text-[0.75rem] leading-relaxed"
                  :style="isPregnant ? `color: var(--accent-color); font-weight: 600; text-shadow: 0 0 8px ${isPregnant ? 'rgba(244,114,182,0.6)' : 'transparent'};` : ''"
                >{{ characterData.怀孕状态 || '未知' }}</span>
              </div>
              <InfoCell label="高潮次数" :value="characterData.高潮次数 ?? 0" />
              <InfoCell label="内射次数" :value="characterData.内射次数 ?? 0" />
              <InfoCell label="烙印状态" :value="characterData.烙印状态" fallback="无烙印" />
              <InfoCell class="col-span-2" label="烙印反应" :value="characterData.当前烙印反应" fallback="无" />
            </div>
          </div>
        </template>

        <template v-if="activeTab === 2">
          <template v-if="hasDetail">
            <SectionCard v-for="(section, key) in detailSections" :key="String(key)" :title="section.title">
              <div v-for="(value, k) in section.data" :key="String(k)" class="flex flex-col gap-1.5">
                <div class="flex items-start justify-between gap-3">
                  <span class="text-secondary min-w-[3rem] flex-shrink-0 pt-0.5 text-[0.62rem]">{{ k }}</span>
                  <span class="text-primary text-right text-[0.74rem] leading-relaxed break-all">{{ value || '未知' }}</span>
                </div>
              </div>
            </SectionCard>
          </template>
          <div v-else class="text-secondary font-title flex h-20 items-center justify-center text-[0.9rem]">暂无详细信息</div>
        </template>

        <template v-if="activeTab === 3">
          <div v-if="characterData.背景" class="rounded-lg p-3" style="background: var(--theme-card-bg); border: var(--theme-card-border); box-shadow: var(--theme-card-shadow);">
            <div class="quote-box">
              <span class="text-primary font-serif text-[0.75rem] leading-relaxed whitespace-pre-wrap" style="font-style: normal;">{{ characterData.背景 }}</span>
            </div>
          </div>
          <div v-else class="text-secondary font-title flex h-20 items-center justify-center text-[0.9rem]">暂无背景</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h, ref } from 'vue';

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

const characterData = computed(() => {
  if (!props.characterName || !props.statData?.角色) return {};
  return props.statData.角色[props.characterName] || {};
});

const isPregnant = computed(() => {
  const state = characterData.value.怀孕状态;
  return state && state !== '未怀孕';
});

const detailSections = computed(() => {
  const d = characterData.value;
  const sections: { title: string; data: Record<string, any> }[] = [];
  if (d.外貌) sections.push({ title: '外貌', data: d.外貌 });
  if (d.性格) sections.push({ title: '性格', data: d.性格 });
  if (d.能力) sections.push({ title: '能力', data: d.能力 });
  if (d.NSFW) sections.push({ title: 'NSFW', data: d.NSFW });
  return sections;
});

const hasDetail = computed(() => detailSections.value.length > 0);

function getClassText(cls: Record<string, any>): string {
  return [cls.名称, cls.等级].filter(Boolean).join(' ');
}

function InfoCell(props: any) {
  const value = props.value ?? props.fallback ?? '—';
  return h('div', { class: ['flex flex-col', props.class] }, [
    h('span', { class: 'text-[0.62rem] text-secondary mb-1' }, props.label),
    h('span', { class: 'text-[0.74rem] text-primary leading-relaxed font-medium' }, String(value)),
  ]);
}

function SectionCard(props: any, ctx: any) {
  return h('div', { class: 'rounded-lg p-3', style: 'background: var(--theme-card-bg); border: var(--theme-card-border); box-shadow: var(--theme-card-shadow);' }, [
    h('div', { class: 'font-title text-[0.8rem] mb-2 tracking-widest gold-divider pb-1.5', style: 'color: var(--theme-subtab-section-title-color);' }, props.title),
    h('div', { class: 'flex flex-col gap-2.5' }, ctx.slots.default?.()),
  ]);
}

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
