<template>
  <div class="flex flex-col gap-2 p-1">
    <div v-if="haremStats.总数" class="rounded-lg p-2.5 mb-1" style="background: linear-gradient(135deg, rgba(167, 139, 250, 0.15) 0%, rgba(244, 114, 182, 0.1) 100%); border: 1px solid rgba(167, 139, 250, 0.3);">
      <div class="flex justify-around items-center">
        <div class="flex flex-col items-center">
          <div class="font-title text-[0.65rem] text-secondary tracking-wider mb-0.5">后宫成员</div>
          <div class="font-serif text-[1rem] text-primary font-medium">{{ haremStats.总数 }}</div>
        </div>
        <div class="flex flex-col items-center">
          <div class="font-title text-[0.65rem] text-secondary tracking-wider mb-0.5">平均好感度</div>
          <div class="font-serif text-[1rem] text-primary font-medium">{{ haremStats.平均好感度 ?? 0 }}</div>
        </div>
        <div class="flex flex-col items-center">
          <div class="font-title text-[0.65rem] text-secondary tracking-wider mb-0.5">满意度</div>
          <div class="font-serif text-[1rem] text-primary font-medium">{{ haremStats.满意度 ?? '良好' }}</div>
        </div>
      </div>
    </div>
    <div v-if="!characters || Object.keys(characters).length === 0" class="flex items-center justify-center text-secondary font-title text-[0.9rem] py-8">暂无后宫成员</div>
    <div v-else class="grid grid-cols-2 gap-2">
      <div
        v-for="(charData, charName) in characters"
        :key="charName"
        class="rounded-lg p-2.5 cursor-pointer transition-all duration-300"
        style="background: linear-gradient(135deg, rgba(30, 18, 60, 0.7) 0%, rgba(20, 12, 40, 0.8) 100%); border: 1px solid var(--border-color); box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);"
        @click="handleClick(String(charName))"
      >
        <div class="flex justify-between items-center mb-2">
          <div class="font-title text-[0.9rem] text-title tracking-wider truncate">{{ charName }}</div>
          <div v-if="charData.怀孕状态 && charData.怀孕状态 !== '未怀孕'" class="text-[0.6rem] px-1.5 py-0.5 rounded font-title flex-shrink-0" style="background: rgba(244, 114, 182, 0.3); color: var(--accent-color);">孕</div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[0.7rem] text-secondary flex-shrink-0">好感</span>
          <div class="flex-1 h-2 rounded-sm relative overflow-hidden" style="background: rgba(0, 0, 0, 0.3);">
            <div class="h-full rounded-sm transition-all duration-300" style="background: linear-gradient(90deg, var(--color-primary), var(--accent-color));" :style="{ width: (charData.好感度 ?? 0) + '%' }"></div>
          </div>
          <span class="text-[0.65rem] text-primary flex-shrink-0 min-w-[2rem] text-right">{{ charData.好感度 ?? 0 }}</span>
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

function handleClick(characterName: string) {
  emit('showDetail', characterName);
}
</script>
