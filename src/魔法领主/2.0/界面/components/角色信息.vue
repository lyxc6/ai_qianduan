<template>
  <div class="flex flex-col gap-2.5 p-1">
    <!-- 身份卡：姓名 + 徽章 + 灵魂能量环 -->
    <div class="flex items-center gap-3 rounded-lg p-3" style="background: var(--theme-card-bg); border: var(--theme-card-border); box-shadow: var(--theme-card-shadow);">
      <div class="flex min-w-0 flex-1 flex-col gap-1.5">
        <div class="flex flex-wrap items-center gap-2">
          <span class="font-title text-title truncate text-[1rem] tracking-wider sm:text-[1.1rem]">{{ protagonist.姓名 || '无名者' }}</span>
          <span
            v-if="protagonist.力量等级"
            class="font-title flex-shrink-0 rounded px-2 py-0.5 text-[0.6rem] tracking-wider"
            style="background: var(--theme-stat-bg); border: var(--theme-stat-border); color: var(--theme-label-accent);"
          >{{ protagonist.力量等级 }}</span>
        </div>
        <div class="text-secondary flex items-center gap-2 text-[0.7rem] sm:text-[0.75rem]">
          <span v-if="protagonist.年龄 !== undefined"><i class="fa-solid fa-cake-candles mr-1" style="color: var(--theme-gold);"></i>{{ protagonist.年龄 }}岁</span>
          <span v-if="protagonist.修行路线"><i class="fa-solid fa-wand-magic-sparkles mr-1" style="color: var(--theme-gold);"></i>{{ protagonist.修行路线 }}</span>
          <span v-if="protagonist.侧重" class="truncate"><i class="fa-solid fa-crosshairs mr-1" style="color: var(--theme-gold);"></i>{{ protagonist.侧重 }}</span>
        </div>
      </div>
      <div class="flex flex-shrink-0 flex-col items-center" title="灵魂能量">
        <svg viewBox="0 0 120 120" class="h-[4.2rem] w-[4.2rem]">
          <defs>
            <linearGradient id="soulRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#d4a853" />
              <stop offset="100%" stop-color="#8b2e2e" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(0,0,0,0.15)" stroke-width="9" />
          <circle
            cx="60" cy="60" r="52" fill="none"
            stroke="url(#soulRingGrad)" stroke-width="9" stroke-linecap="round"
            :stroke-dasharray="soulRingDash"
            transform="rotate(-90 60 60)"
          />
          <text x="60" y="58" text-anchor="middle" class="font-title" font-size="22" font-weight="bold" :fill="soulColor">{{ soulPercent }}</text>
          <text x="60" y="76" text-anchor="middle" font-size="9" fill="currentColor" opacity="0.6">灵魂能量</text>
        </svg>
      </div>
    </div>

    <!-- 当前状态 -->
    <div class="rounded-lg p-3" style="background: var(--theme-card-bg); border: var(--theme-card-border); box-shadow: var(--theme-card-shadow);">
      <div class="font-title text-title gold-divider mb-2 pb-1.5 text-[0.85rem] tracking-widest">当前状态</div>
      <div class="flex flex-col gap-2">
        <div class="flex flex-wrap items-center gap-2">
          <span v-if="protagonist.当前着装" class="status-chip"><i class="fa-solid fa-shirt mr-1"></i>{{ protagonist.当前着装 }}</span>
          <span v-if="protagonist.当前姿势" class="status-chip"><i class="fa-solid fa-person mr-1"></i>{{ protagonist.当前姿势 }}</span>
          <span v-if="protagonist.当前位置" class="status-chip"><i class="fa-solid fa-location-dot mr-1"></i>{{ protagonist.当前位置 }}</span>
          <span v-if="protagonist.阴茎状态" class="status-chip"><i class="fa-solid fa-venus-mars mr-1"></i>{{ protagonist.阴茎状态 }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="font-title text-secondary flex-shrink-0 text-[0.65rem] tracking-wide">射精进度</span>
          <div class="scale-track flex-1" style="background: rgba(0, 0, 0, 0.18);">
            <div class="scale-fill" style="background: var(--theme-accent-bar);" :style="{ width: (protagonist.射精进度 ?? 0) + '%' }"></div>
            <div v-for="n in [1, 2, 3]" :key="n" class="scale-notch" :style="{ left: (n * 25) + '%' }"></div>
          </div>
          <span class="text-primary w-9 flex-shrink-0 text-right font-serif text-[0.7rem]">{{ protagonist.射精进度 ?? 0 }}%</span>
        </div>
      </div>
    </div>

    <!-- 龙血 -->
    <div v-if="dragonBlood && Object.keys(dragonBlood).length > 0" class="rounded-lg p-3" style="background: var(--theme-card-bg); border: var(--theme-card-border); box-shadow: var(--theme-card-shadow);">
      <div class="font-title text-title gold-divider mb-2 pb-1.5 text-[0.85rem] tracking-widest"><i class="fa-solid fa-dragon mr-1.5" style="color: var(--theme-gold);"></i>龙血</div>
      <div class="grid grid-cols-2 gap-1.5">
        <div
          v-for="(value, key) in dragonBlood"
          :key="String(key)"
          class="flex flex-col rounded-md px-2.5 py-1.5"
          style="background: var(--theme-stat-bg); border: var(--theme-stat-border);"
        >
          <span class="font-title text-secondary mb-0.5 text-[0.62rem] tracking-wide">{{ key }}</span>
          <span class="text-primary font-serif text-[0.8rem] font-medium">{{ formatDragonValue(key, value) }}</span>
        </div>
      </div>
    </div>

    <!-- 想法与最近 -->
    <div class="flex flex-col gap-2">
      <div v-if="protagonist.当前想法" class="quote-box">
        <span class="text-primary font-serif text-[0.75rem] leading-relaxed sm:text-[0.8rem]">{{ protagonist.当前想法 }}</span>
      </div>
      <div v-if="protagonist.最近性行为" class="rounded-lg px-3 py-2" style="background: var(--theme-card-bg); border: var(--theme-card-border);">
        <span class="font-title text-secondary mr-2 text-[0.62rem] tracking-wide"><i class="fa-solid fa-heart mr-1" style="color: var(--accent-color);"></i>最近性行为</span>
        <span class="text-primary font-serif text-[0.72rem] leading-relaxed sm:text-[0.78rem]">{{ protagonist.最近性行为 }}</span>
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

const CIRCUMFERENCE = 2 * Math.PI * 52;

const soulPercent = computed(() => Math.round(Math.max(0, Math.min(100, protagonist.value.灵魂能量 ?? 0))));

const soulRingDash = computed(() => {
  return `${(soulPercent.value / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`;
});

const soulColor = computed(() => {
  if (soulPercent.value >= 60) return '#2e8b57';
  if (soulPercent.value >= 30) return '#b8860b';
  return '#c83232';
});

const dragonBlood = computed(() => {
  const db = protagonist.value.龙血;
  if (!db || Object.keys(db).length === 0) return null;
  return db;
});

function formatDragonValue(key: string, value: any): string {
  if (typeof value === 'number') return `${Math.round(value)}`;
  return String(value ?? '未知');
}
</script>

<style scoped>
.status-chip {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-serif);
  font-size: 0.68rem;
  color: var(--text-primary);
  background: var(--theme-stat-bg);
  border: var(--theme-stat-border);
  border-radius: 0.4rem;
  padding: 0.15rem 0.55rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.status-chip i {
  color: var(--theme-gold);
  font-size: 0.6rem;
}
</style>
