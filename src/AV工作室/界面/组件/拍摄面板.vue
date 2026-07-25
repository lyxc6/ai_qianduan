<template>
  <div class="flex flex-col gap-3 p-1">
    <!-- No Shoot Data -->
    <div v-if="!hasShootData" class="text-center py-8" style="color: var(--text-muted);">
      <p class="text-sm">暂无拍摄数据</p>
      <p class="text-xs mt-1">请先在「交涉」面板中达成线下见面协议</p>
    </div>

    <template v-else>
      <!-- Actor + Film Info -->
      <div class="stat-card">
        <div class="flex justify-between items-start mb-2">
          <div>
            <span class="font-title text-sm" style="color: var(--text-title);">{{ actor.姓名 }}</span>
            <span class="badge badge-purple ml-2">{{ actor.年龄 }}</span>
          </div>
          <span class="badge badge-cyan">{{ actor.阶段状态 }}</span>
        </div>
        <p class="text-xs" style="color: var(--text-secondary);">
          <span style="color: var(--accent-purple);">影片题材:</span> {{ shoot.影片题材 || '待定' }}
        </p>
        <p class="text-xs mt-1" style="color: var(--text-secondary);">
          <span style="color: var(--accent-purple);">接受度:</span>
          <span :style="{ color: acceptColor }">{{ actor.接受度 }}%</span>
        </p>
      </div>

      <!-- Shoot Process List -->
      <div v-if="shootProcess.length > 0" class="stat-card">
        <div class="font-title text-xs tracking-wider mb-2" style="color: var(--accent-purple);">拍摄流程</div>
        <div class="space-y-2">
          <div v-for="(item, i) in shootProcess" :key="i" class="flex items-start gap-2 text-xs">
            <span class="status-dot" :class="statusClass(item.状态)"></span>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between">
                <span :style="{ color: item.状态 === '已完成' ? 'var(--text-muted)' : 'var(--text-primary)' }">{{ item.项目 }}</span>
                <span style="color: var(--stat-funds);">{{ item.报酬?.toLocaleString() }}円</span>
              </div>
              <div class="truncate" style="color: var(--text-muted);">{{ item.介绍 }}</div>
            </div>
          </div>
        </div>
        <div class="mt-2 pt-2 text-xs text-right" style="color: var(--stat-funds); border-top: 1px solid var(--border-subtle);">
          总报酬: {{ totalPay.toLocaleString() }}円
        </div>
      </div>

      <!-- Dual Perspective -->
      <div v-if="shoot.第三人称叙事 || shoot.角色视角叙事">
        <div class="flex gap-1 mb-2">
          <button
            class="btn-primary text-xs py-1.5 px-3 flex-1 font-title"
            :style="perspective === 'third' ? { borderColor: 'var(--accent-purple)', boxShadow: 'var(--shadow-glow)' } : {}"
            @click="perspective = 'third'"
          >第三人称</button>
          <button
            class="btn-primary text-xs py-1.5 px-3 flex-1 font-title"
            :style="perspective === 'first' ? { borderColor: 'var(--accent-purple)', boxShadow: 'var(--shadow-glow)' } : {}"
            @click="perspective = 'first'"
          >{{ actor.姓名 }}视角</button>
        </div>

        <div class="stat-card text-xs leading-relaxed" style="color: var(--text-secondary); max-height: 200px; overflow-y: auto;" v-if="perspective === 'third' && shoot.第三人称叙事">
          {{ shoot.第三人称叙事 }}
        </div>
        <div class="stat-card text-xs leading-relaxed" style="color: var(--text-secondary); max-height: 200px; overflow-y: auto; border-left: 3px solid var(--accent-pink);" v-if="perspective === 'first' && shoot.角色视角叙事">
          {{ shoot.角色视角叙事 }}
        </div>
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
import { computed, ref } from 'vue';

interface Props {
  statData: any;
}

const props = defineProps<Props>();
const emit = defineEmits<{ send: [text: string] }>();

const perspective = ref('third');

const actor = computed(() => props.statData?.当前演员 || {});
const shoot = computed(() => props.statData?.当前拍摄 || {});

const hasShootData = computed(() => {
  return actor.value.姓名 || shoot.value.拍摄流程?.length > 0;
});

const shootProcess = computed(() => {
  return shoot.value.拍摄流程 || [];
});

const totalPay = computed(() => {
  return shootProcess.value.reduce((sum: number, item: any) => sum + (item.报酬 || 0), 0);
});

const acceptColor = computed(() => {
  const v = actor.value.接受度 || 0;
  if (v >= 80) return 'var(--stat-accept-high)';
  if (v >= 40) return 'var(--stat-accept-mid)';
  return 'var(--stat-accept-low)';
});

const suggestions = computed(() => {
  const opts = props.statData?.行动选项;
  if (!opts) return [];
  return [opts.一, opts.二, opts.三, opts.四].filter(Boolean);
});

function statusClass(status: string) {
  if (status === '已完成') return 'done';
  if (status === '进行中') return 'progress';
  return 'pending';
}
</script>
