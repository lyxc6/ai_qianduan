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
      </div>
    </div>
    <div class="character-info-section">
      <div class="section-title">当前状态</div>
      <div class="info-group">
        <div class="info-item full-width">
          <div class="info-label">当前位置</div>
          <div class="info-value">{{ character.当前位置 || '' }}</div>
        </div>
        <div class="info-item full-width">
          <div class="info-label">当前着装</div>
          <div class="info-value">{{ character.当前着装 || '' }}</div>
        </div>
        <div class="info-item full-width">
          <div class="info-label">当前姿势</div>
          <div class="info-value">{{ character.当前姿势 || '' }}</div>
        </div>
        <div class="info-item full-width">
          <div class="info-label">学业状态</div>
          <div class="info-value">{{ character.学业状态 || '' }}</div>
        </div>
        <div class="info-item full-width">
          <div class="info-label">人际关系</div>
          <div class="info-value">{{ character.人际关系 || '' }}</div>
        </div>
        <div class="info-item full-width">
          <div class="info-label">当前想法</div>
          <div class="info-value">{{ character.当前想法 || '' }}</div>
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
      当前想法?: string;
      学业状态?: string;
      人际关系?: string;
    };
  };
}

const props = defineProps<Props>();
const character = computed(() => props.statData?.主角 || {});
</script>

<style lang="scss">
.character-detail-body {
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.character-info-section {
  background: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 0.75rem;
  box-shadow: 0 2px 8px rgba(255, 138, 128, 0.08);
}

.section-title {
  font-family: var(--font-title);
  font-size: 0.9rem;
  color: var(--user-color-primary);
  margin-bottom: 0.6rem;
  letter-spacing: 1px;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--border-color);
}

.info-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-label {
  font-family: var(--font-title);
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 0.2rem;
  letter-spacing: 0.5px;
}

.info-value {
  font-family: var(--font-serif);
  font-size: 0.8rem;
  color: var(--text-primary);
  line-height: 1.4;
  word-break: break-word;
}
</style>
