<template>
  <div class="character-detail-body">
    <div class="character-info-section">
      <div class="section-title">主角信息</div>
      <div class="info-group">
        <div class="info-item">
          <div class="info-label">姓名</div>
          <div class="info-value">{{ character.姓名 || '' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">年龄</div>
          <div class="info-value">{{ character.年龄 !== undefined ? character.年龄 : '' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">性别</div>
          <div class="info-value">{{ character.性别 || '' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">身份</div>
          <div class="info-value">{{ character.身份 || '' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">当前着装</div>
          <div class="info-value">{{ character.当前着装 || '' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">当前姿势</div>
          <div class="info-value">{{ character.当前姿势 || '' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">当前位置</div>
          <div class="info-value">{{ character.当前位置 || '' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">后宫状态</div>
          <div class="info-value">{{ character.后宫状态 || '' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">当前想法</div>
          <div class="info-value">{{ character.当前想法 || '' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">性经验</div>
          <div class="info-value">{{ character.性经验 || '' }}</div>
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
      年龄?: string;
      性别?: string;
      身份?: string;
      当前着装?: string;
      当前姿势?: string;
      当前位置?: string;
      后宫状态?: string;
      当前想法?: string;
      性经验?: string;
    };
  };
}

const props = defineProps<Props>();
const character = computed(() => props.statData?.主角 || {});
</script>

<style lang="scss">
.character-detail-body {
  padding: 0.25rem;
}

.character-info-section {
  margin-bottom: 0.5rem;
}

.section-title {
  font-family: var(--font-title);
  font-size: 1rem;
  color: var(--text-title);
  margin-bottom: 0.5rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--border-color);
  letter-spacing: 2px;
}

.info-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.info-item {
  min-width: 45%;
  flex: 1;
}

.info-label {
  font-family: var(--font-title);
  font-size: 0.75rem;
  color: var(--user-color-primary);
  margin-bottom: 0.2rem;
  letter-spacing: 1px;
}

.info-value {
  font-family: var(--font-serif);
  font-size: 0.8rem;
  color: var(--text-primary);
  line-height: 1.4;
  word-break: break-all;
}
</style>
