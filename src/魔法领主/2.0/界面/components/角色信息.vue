<template>
  <div class="flex flex-col gap-3 p-1">
    <div class="rounded-lg p-3" style="background: linear-gradient(135deg, rgba(30, 18, 60, 0.6) 0%, rgba(20, 12, 40, 0.7) 100%); border: 1px solid var(--border-color);">
      <div class="flex flex-wrap gap-3">
        <div v-if="protagonist.姓名" class="flex-1 min-w-[45%] flex flex-col">
          <div class="font-title text-[0.75rem] mb-1 tracking-wider" style="color: var(--color-primary);">姓名</div>
          <div class="font-serif text-[0.85rem] text-primary leading-relaxed">{{ protagonist.姓名 }}</div>
        </div>
        <div v-if="protagonist.年龄 !== undefined" class="flex-1 min-w-[45%] flex flex-col">
          <div class="font-title text-[0.75rem] mb-1 tracking-wider" style="color: var(--color-primary);">年龄</div>
          <div class="font-serif text-[0.85rem] text-primary leading-relaxed">{{ protagonist.年龄 }}</div>
        </div>
        <div v-if="protagonist.力量等级" class="flex-1 min-w-[45%] flex flex-col">
          <div class="font-title text-[0.75rem] mb-1 tracking-wider" style="color: var(--color-primary);">力量等级</div>
          <div class="font-serif text-[0.85rem] text-primary leading-relaxed">{{ protagonist.力量等级 }}</div>
        </div>
        <div v-if="protagonist.修行路线" class="flex-1 min-w-[45%] flex flex-col">
          <div class="font-title text-[0.75rem] mb-1 tracking-wider" style="color: var(--color-primary);">修行路线</div>
          <div class="font-serif text-[0.85rem] text-primary leading-relaxed">{{ protagonist.修行路线 }}</div>
        </div>
        <div v-if="protagonist.侧重" class="flex-1 min-w-[45%] flex flex-col">
          <div class="font-title text-[0.75rem] mb-1 tracking-wider" style="color: var(--color-primary);">侧重</div>
          <div class="font-serif text-[0.85rem] text-primary leading-relaxed">{{ protagonist.侧重 }}</div>
        </div>
        <div v-if="protagonist.灵魂能量 !== undefined" class="flex-1 min-w-[45%] flex flex-col">
          <div class="font-title text-[0.75rem] mb-1 tracking-wider" style="color: var(--color-primary);">灵魂能量</div>
          <div class="font-serif text-[0.85rem] text-primary leading-relaxed">{{ protagonist.灵魂能量 }}</div>
        </div>
      </div>
    </div>

    <div class="rounded-lg p-3" style="background: linear-gradient(135deg, rgba(30, 18, 60, 0.6) 0%, rgba(20, 12, 40, 0.7) 100%); border: 1px solid var(--border-color);">
      <div class="font-title text-[0.85rem] text-title mb-2 tracking-wider pb-1" style="border-bottom: 1px solid var(--border-color);">当前状态</div>
      <div class="grid grid-cols-2 gap-2">
        <div v-if="protagonist.当前着装" class="flex flex-col">
          <div class="font-title text-[0.7rem] text-secondary mb-0.5 tracking-wide">当前着装</div>
          <div class="font-serif text-[0.8rem] text-primary leading-relaxed">{{ protagonist.当前着装 }}</div>
        </div>
        <div v-if="protagonist.当前姿势" class="flex flex-col">
          <div class="font-title text-[0.7rem] text-secondary mb-0.5 tracking-wide">当前姿势</div>
          <div class="font-serif text-[0.8rem] text-primary leading-relaxed">{{ protagonist.当前姿势 }}</div>
        </div>
        <div v-if="protagonist.当前位置" class="flex flex-col">
          <div class="font-title text-[0.7rem] text-secondary mb-0.5 tracking-wide">当前位置</div>
          <div class="font-serif text-[0.8rem] text-primary leading-relaxed">{{ protagonist.当前位置 }}</div>
        </div>
        <div v-if="protagonist.阴茎状态" class="flex flex-col">
          <div class="font-title text-[0.7rem] text-secondary mb-0.5 tracking-wide">阴茎状态</div>
          <div class="font-serif text-[0.8rem] text-primary leading-relaxed">{{ protagonist.阴茎状态 }}</div>
        </div>
        <div class="flex flex-col">
          <div class="font-title text-[0.7rem] text-secondary mb-0.5 tracking-wide">射精进度</div>
          <div class="font-serif text-[0.8rem] text-primary leading-relaxed">{{ protagonist.射精进度 ?? 0 }}%</div>
        </div>
        <div v-if="protagonist.当前想法" class="flex flex-col col-span-2">
          <div class="font-title text-[0.7rem] text-secondary mb-0.5 tracking-wide">当前想法</div>
          <div class="font-serif text-[0.8rem] text-primary leading-relaxed">{{ protagonist.当前想法 }}</div>
        </div>
        <div v-if="protagonist.最近性行为" class="flex flex-col col-span-2">
          <div class="font-title text-[0.7rem] text-secondary mb-0.5 tracking-wide">最近性行为</div>
          <div class="font-serif text-[0.8rem] text-primary leading-relaxed">{{ protagonist.最近性行为 }}</div>
        </div>
      </div>
    </div>

    <div class="rounded-lg p-3" v-if="protagonist.龙血" style="background: linear-gradient(135deg, rgba(30, 18, 60, 0.6) 0%, rgba(20, 12, 40, 0.7) 100%); border: 1px solid var(--border-color);">
      <div class="font-title text-[0.85rem] text-title mb-2 tracking-wider pb-1" style="border-bottom: 1px solid var(--border-color);">龙血</div>
      <div class="grid grid-cols-2 gap-2">
        <div class="flex flex-col" v-for="(value, key) in protagonist.龙血" :key="String(key)">
          <div class="font-title text-[0.7rem] text-secondary mb-0.5 tracking-wide">{{ key }}</div>
          <div class="font-serif text-[0.8rem] text-primary leading-relaxed">{{ value ?? '未知' }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  statData: {
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
  };
}

const props = defineProps<Props>();
const protagonist = computed(() => props.statData?.主角 || {});
</script>
