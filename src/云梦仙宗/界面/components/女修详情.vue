<template>
  <div class="detail-layout">
    <div class="detail-hero">
      <button type="button" class="back-button" @click="$emit('back')">
        <i class="fa-solid fa-arrow-left"></i> 返回
      </button>
      <span class="badge badge-sect">{{ girl.宗门职务 && girl.宗门职务 !== '无' ? girl.宗门职务 + '值守' : '无职务' }}</span>
    </div>

    <section v-if="girl" class="card">
      <div class="detail-head">
        <div class="avatar avatar-lg">{{ girl.姓名.charAt(0) }}</div>
        <div class="min-w-0">
          <div class="detail-name">{{ girl.姓名 }}</div>
          <div class="girl-sub">{{ girl.身份 }} · {{ girl.年龄 }}岁 · {{ girl.性格 }}</div>
        </div>
      </div>
      <div class="tag-row">
        <span v-for="tag in girl.性格标签" :key="tag" class="tag">{{ tag }}</span>
      </div>

      <div class="divider"></div>

      <div class="bar-block">
        <div class="bar-label">
          <span>好感度 · {{ girl.恋情阶段 }}</span>
          <span>{{ girl.好感度 }}/100</span>
        </div>
        <div class="bar">
          <div class="bar-fill bar-affection" :style="{ width: clamp(girl.好感度) + '%' }"></div>
        </div>
      </div>
      <div class="bar-block" style="margin-top: 0.35rem">
        <div class="bar-label">
          <span>{{ girl.修为境界 }}修为</span>
          <span>{{ girl.修为进度 }}/100</span>
        </div>
        <div class="bar">
          <div class="bar-fill bar-cultivation" :style="{ width: clamp(girl.修为进度) + '%' }"></div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">外貌</span>
          <span class="info-value">{{ girl.外貌 || '—' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">心情</span>
          <span class="info-value">{{ girl.心情 || '—' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">当前想法</span>
          <span class="info-value">「{{ girl.当前想法 || '……' }}」</span>
        </div>
      </div>
    </section>

    <div v-else class="empty-state">查无此人</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const props = defineProps<{ name: string }>();
defineEmits<{ back: [] }>();

const store = useDataStore();

const girl = computed(() => store.data.女修[props.name] || null);

function clamp(value?: number): number {
  return Math.max(0, Math.min(100, value ?? 0));
}
</script>
