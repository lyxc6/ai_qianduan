<template>
  <div class="flex flex-col gap-2 p-1">
    <!-- 名册统计带 -->
    <div v-if="haremStats.总数" class="relative rounded-lg px-3 py-2" style="background: var(--theme-stat-bg); border: var(--theme-stat-border);">
      <div class="flex items-center justify-around">
        <div class="flex flex-col items-center">
          <div class="font-title text-secondary mb-0.5 text-[0.62rem] tracking-wider">后宫成员</div>
          <div class="text-primary font-serif text-[1rem] leading-none font-medium">{{ haremStats.总数 }}</div>
        </div>
        <div class="w-px self-stretch" style="background: var(--theme-divider);"></div>
        <div class="flex flex-col items-center">
          <div class="font-title text-secondary mb-0.5 text-[0.62rem] tracking-wider">平均好感度</div>
          <div class="text-primary font-serif text-[1rem] leading-none font-medium">{{ haremStats.平均好感度 ?? 0 }}</div>
        </div>
        <div class="w-px self-stretch" style="background: var(--theme-divider);"></div>
        <div class="flex flex-col items-center">
          <div class="font-title text-secondary mb-0.5 text-[0.62rem] tracking-wider">满意度</div>
          <div class="text-primary font-serif text-[1rem] leading-none font-medium">{{ haremStats.满意度 ?? '良好' }}</div>
        </div>
      </div>
    </div>

    <div v-if="!characters || Object.keys(characters).length === 0" class="text-secondary font-title flex items-center justify-center py-8 text-[0.9rem]">
      名册尚未开启…
    </div>
    <div v-else class="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <div
        v-for="(charData, charName) in sortedCharacters"
        :key="charName"
        class="cursor-pointer rounded-lg p-2.5 transition-all duration-300 hover:translate-y-[-2px]"
        style="background: var(--theme-card-bg); border: var(--theme-card-border); box-shadow: var(--theme-card-shadow);"
        @click="handleClick(charName)"
      >
        <div class="mb-2 flex items-center gap-2.5">
          <div
            class="font-title flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[1rem]"
            style="background: var(--theme-accent-bar); color: #fff; box-shadow: 0 0 6px var(--theme-rune-glow);"
          >{{ getInitial(charName) }}</div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5">
              <span class="font-title text-title truncate text-[0.88rem] tracking-wider">{{ charName }}</span>
              <span
                v-if="isPregnant(charData)"
                class="font-title flex-shrink-0 rounded px-1.5 py-0.5 text-[0.58rem]"
                style="background: rgba(244, 114, 182, 0.35); color: var(--accent-color); box-shadow: 0 0 6px rgba(244, 114, 182, 0.5);"
              >孕</span>
            </div>
            <div v-if="charData.后宫地位" class="text-secondary truncate font-serif text-[0.62rem]">{{ charData.后宫地位 }}</div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-secondary flex-shrink-0 text-[0.62rem]">好感</span>
          <div class="scale-track flex-1" style="background: rgba(0, 0, 0, 0.2);">
            <div class="scale-fill" style="background: var(--theme-accent-bar);" :style="{ width: clampAffection(charData.好感度) + '%' }"></div>
            <div v-for="n in [1, 2, 3]" :key="n" class="scale-notch" :style="{ left: (n * 25) + '%' }"></div>
          </div>
          <span class="text-primary min-w-[2rem] flex-shrink-0 text-right text-[0.65rem]">{{ charData.好感度 ?? 0 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface CharacterData {
  好感度?: number;
  怀孕状态?: string;
  后宫地位?: string;
}

interface HaremStats {
  总数?: number;
  平均好感度?: number;
  满意度?: string;
}

interface Props {
  statData: {
    角色?: Record<string, CharacterData>;
    后宫?: HaremStats;
  };
}

const props = defineProps<Props>();
const emit = defineEmits<{
  showDetail: [characterName: string];
}>();

const characters = computed(() => props.statData?.角色 || {});
const haremStats = computed(() => props.statData?.后宫 || {});

const sortedCharacters = computed(() => {
  return Object.entries(characters.value)
    .sort((a, b) => (b[1]?.好感度 ?? 0) - (a[1]?.好感度 ?? 0))
    .reduce<Record<string, CharacterData>>((acc, [name, data]) => {
      acc[name] = data;
      return acc;
    }, {});
});

function getInitial(name: string): string {
  return (name || '?').charAt(0);
}

function clampAffection(value?: number): number {
  return Math.max(0, Math.min(100, value ?? 0));
}

function isPregnant(data: CharacterData): boolean {
  return !!data.怀孕状态 && data.怀孕状态 !== '未怀孕';
}

function handleClick(characterName: string) {
  emit('showDetail', characterName);
}
</script>
