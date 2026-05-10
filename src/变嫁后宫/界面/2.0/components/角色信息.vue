<template>
  <div class="character-detail-body">
    <div class="character-info-section">
      <div class="info-section">
        <div class="section-title">基本信息</div>
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

      <div class="info-section">
        <div class="section-title">当前状态</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">当前着装</div>
            <div class="info-value">{{ character.当前着装 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">当前姿势</div>
            <div class="info-value">{{ character.当前姿势 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">当前想法</div>
            <div class="info-value">{{ character.当前想法 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">射精进度</div>
            <div class="info-value">{{ character.射精进度 !== undefined ? character.射精进度 : '' }}</div>
          </div>
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
      性别?: string;
      身份?: string;
      当前着装?: string;
      当前姿势?: string;
      当前想法?: string;
      射精进度?: number;
    };
  };
}

const props = defineProps<Props>();
const character = computed(() => props.statData?.主角 || {});
</script>
