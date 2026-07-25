<template>
  <div class="flex flex-col gap-3 p-1">
    <!-- No Actor Selected -->
    <div v-if="!hasActor" class="text-center py-8" style="color: var(--text-muted);">
      <p class="text-sm">尚未选择交涉对象</p>
      <p class="text-xs mt-1">请先在「招募」面板中选择一位素人</p>
    </div>

    <template v-else>
      <!-- Actor Profile -->
      <div class="stat-card">
        <div class="flex justify-between items-start mb-2">
          <div>
            <span class="font-title text-sm" style="color: var(--text-title);">{{ actor.姓名 }}</span>
            <span class="badge badge-purple ml-2">{{ actor.年龄 }}</span>
            <span class="badge" :class="phaseBadgeClass">{{ actor.阶段状态 }}</span>
          </div>
        </div>

        <div class="text-xs space-y-1" style="color: var(--text-secondary);">
          <p><span style="color: var(--accent-purple);">性格:</span> {{ actor.性格 }}</p>
          <p><span style="color: var(--accent-purple);">外貌:</span> {{ actor.身高 }} / {{ actor.体重 }} / {{ actor.罩杯 }}杯 / {{ actor.发色 }}{{ actor.发型 }}</p>
          <p><span style="color: var(--accent-purple);">底线:</span> {{ actor.底线 }}</p>
        </div>

        <div class="mt-2 flex flex-wrap gap-1">
          <span class="badge badge-accept" v-for="item in actor.可接受内容?.slice(0, 6)" :key="item">{{ item }}</span>
        </div>
        <div class="mt-1 flex flex-wrap gap-1">
          <span class="badge badge-danger" v-for="item in actor.不可接受内容?.slice(0, 6)" :key="item">{{ item }}</span>
        </div>
      </div>

      <!-- Acceptance Bar -->
      <div class="stat-card">
        <div class="flex justify-between items-center mb-1">
          <span class="font-title text-xs" style="color: var(--accent-purple);">接受度</span>
          <span class="font-title text-sm" :style="{ color: acceptColor }">{{ actor.接受度 }}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :class="acceptProgressClass" :style="{ width: (actor.接受度 || 0) + '%' }"></div>
        </div>
        <div class="flex justify-between text-xs mt-1" style="color: var(--text-muted);">
          <span>抵触</span>
          <span>80%可线下</span>
          <span>接受</span>
        </div>
      </div>

      <!-- Actor Thoughts & Status -->
      <div v-if="actor.当前想法" class="stat-card text-xs" style="color: var(--text-secondary); border-left: 3px solid var(--accent-teal);">
        <span style="color: var(--accent-teal);">角色想法:</span> {{ actor.当前想法 }}
      </div>

      <div v-if="actor.身体状态 && actor.身体状态 !== '正常'" class="stat-card text-xs" style="color: var(--text-secondary); border-left: 3px solid var(--accent-pink);">
        <span style="color: var(--accent-pink);">身体状态:</span> {{ actor.身体状态 }}
      </div>

      <!-- Strategy Tips -->
      <div v-if="actor.策略" class="stat-card text-xs" style="border-left: 3px solid var(--accent-gold);">
        <span style="color: var(--accent-gold);">当前策略:</span>
        <span style="color: var(--text-secondary);">{{ actor.策略 }}</span>
      </div>

      <!-- Action Suggestions -->
      <div class="space-y-2" v-if="suggestions.length > 0">
        <div
          v-for="(s, i) in suggestions"
          :key="i"
          class="btn-primary text-xs py-2.5 px-3 text-left"
          @click="$emit('send', s)"
        >
          {{ s }}
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  statData: any;
}

const props = defineProps<Props>();
const emit = defineEmits<{ send: [text: string] }>();

const hasActor = computed(() => {
  return props.statData?.当前演员?.姓名 && props.statData.当前演员.姓名 !== '';
});

const actor = computed(() => {
  return props.statData?.当前演员 || {};
});

const acceptColor = computed(() => {
  const v = actor.value.接受度 || 0;
  if (v >= 80) return 'var(--stat-accept-high)';
  if (v >= 40) return 'var(--stat-accept-mid)';
  return 'var(--stat-accept-low)';
});

const acceptProgressClass = computed(() => {
  const v = actor.value.接受度 || 0;
  if (v >= 80) return 'progress-accept-high';
  if (v >= 40) return 'progress-accept-mid';
  return 'progress-accept-low';
});

const phaseBadgeClass = computed(() => {
  const s = actor.value.阶段状态;
  if (s === '已签约' || s === '拍摄中') return 'badge-cyan';
  if (s === '已完成') return 'badge-accept';
  return 'badge-warn';
});

const suggestions = computed(() => {
  const opts = props.statData?.行动选项;
  if (!opts) return [];
  return [opts.一, opts.二, opts.三, opts.四].filter(Boolean);
});
</script>
