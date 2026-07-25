<template>
  <div class="flex flex-col gap-3 p-1">
    <!-- No Result Data -->
    <div v-if="!hasResultData" class="text-center py-8" style="color: var(--text-muted);">
      <p class="text-sm">暂无收尾数据</p>
      <p class="text-xs mt-1">完成拍摄后将在此显示结算信息</p>
    </div>

    <template v-else>
      <!-- Film Sales -->
      <div class="stat-card">
        <div class="flex justify-between items-center mb-1">
          <span class="font-title text-sm" style="color: var(--text-title);">{{ shoot.影片题材 || 'AV作品' }}</span>
        </div>
        <p class="text-xs leading-relaxed mb-2" style="color: var(--text-secondary);">{{ shoot.影片简介 || '暂无简介' }}</p>

        <div class="grid grid-cols-2 gap-3">
          <div class="text-center">
            <div class="font-title text-lg" style="color: var(--stat-funds);">{{ (shoot.影片销量 || 0).toLocaleString() }}</div>
            <div class="text-xs" style="color: var(--text-muted);">销量</div>
          </div>
          <div class="text-center">
            <div class="font-title text-lg" :style="{ color: ratingColor }">{{ shoot.影片评分 || 0 }}</div>
            <div class="text-xs" style="color: var(--text-muted);">评分</div>
          </div>
        </div>

        <!-- Rating Bar -->
        <div class="progress-bar mt-2">
          <div class="progress-fill" :class="ratingBarClass" :style="{ width: (shoot.影片评分 || 0) + '%' }"></div>
        </div>
      </div>

      <!-- Viewer Comments -->
      <div v-if="(shoot.观众评论 || []).length > 0" class="stat-card">
        <div class="font-title text-xs tracking-wider mb-2" style="color: var(--accent-teal);">观众评论</div>
        <div class="space-y-1.5">
          <div v-for="(comment, i) in shoot.观众评论" :key="i" class="text-xs leading-relaxed flex gap-2" style="color: var(--text-secondary);">
            <span style="color: var(--text-muted); flex-shrink: 0;">#{{ i + 1 }}</span>
            <span>{{ comment }}</span>
          </div>
        </div>
      </div>

      <!-- Interview -->
      <div v-if="(shoot.记者提问 || []).length > 0" class="stat-card">
        <div class="font-title text-xs tracking-wider mb-2" style="color: var(--accent-gold);">媒体访谈</div>
        <div class="space-y-2">
          <div v-for="(q, i) in shoot.记者提问" :key="'q' + i" class="text-xs">
            <p style="color: var(--accent-purple);">Q{{ i + 1 }}: {{ q }}</p>
            <p class="mt-0.5" style="color: var(--text-secondary);" v-if="shoot.角色回答 && shoot.角色回答[i]">A: {{ shoot.角色回答[i] }}</p>
          </div>
        </div>
      </div>

      <!-- After Story -->
      <div v-if="shoot.后日谈正文" class="stat-card" style="border-left: 3px solid var(--accent-teal);">
        <div class="font-title text-xs tracking-wider mb-2" style="color: var(--accent-teal);">后日谈</div>
        <p class="text-xs leading-relaxed" style="color: var(--text-secondary);">{{ shoot.后日谈正文 }}</p>
      </div>

      <!-- Shoot History -->
      <div v-if="shootHistory.length > 0" class="stat-card">
        <div class="font-title text-xs tracking-wider mb-2" style="color: var(--accent-purple);">拍摄历史 ({{ shootHistory.length }})</div>
        <div class="space-y-1.5">
          <div v-for="(record, i) in shootHistory" :key="i" class="flex justify-between items-center text-xs">
            <span style="color: var(--text-primary);">{{ record.影片 || '---' }}</span>
            <span style="color: var(--text-muted);">{{ record.演员 || '---' }}</span>
            <div class="flex gap-2">
              <span style="color: var(--stat-funds);">{{ (record.销量 || 0).toLocaleString() }}</span>
              <span :style="{ color: record.评分 >= 80 ? 'var(--stat-accept-high)' : record.评分 >= 60 ? 'var(--stat-accept-mid)' : 'var(--stat-accept-low)' }">{{ record.评分 }}</span>
            </div>
          </div>
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
import { computed } from 'vue';

interface Props {
  statData: any;
}

const props = defineProps<Props>();
const emit = defineEmits<{ send: [text: string] }>();

const shoot = computed(() => props.statData?.当前拍摄 || {});
const shootHistory = computed(() => props.statData?.拍摄历史 || []);

const hasResultData = computed(() => {
  return shoot.value.影片评分 > 0 || (shoot.value.观众评论 || []).length > 0 || shootHistory.value.length > 0;
});

const ratingColor = computed(() => {
  const v = shoot.value.影片评分 || 0;
  if (v >= 80) return 'var(--stat-accept-high)';
  if (v >= 60) return 'var(--stat-accept-mid)';
  return 'var(--stat-accept-low)';
});

const ratingBarClass = computed(() => {
  const v = shoot.value.影片评分 || 0;
  if (v >= 80) return 'progress-accept-high';
  if (v >= 60) return 'progress-accept-mid';
  return 'progress-accept-low';
});

const suggestions = computed(() => {
  const opts = props.statData?.行动选项;
  if (!opts) return [];
  return [opts.一, opts.二, opts.三, opts.四].filter(Boolean);
});
</script>
