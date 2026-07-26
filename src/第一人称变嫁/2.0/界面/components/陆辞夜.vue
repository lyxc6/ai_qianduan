<template>
  <div class="character-detail-body">
    <div class="character-info-section">
      <div class="info-section">
        <div class="section-title">基本信息</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">姓名</div>
            <div class="info-value">陆辞夜</div>
          </div>
          <div class="info-item">
            <div class="info-label">年龄</div>
            <div class="info-value">18岁</div>
          </div>
          <div class="info-item">
            <div class="info-label">身份</div>
            <div class="info-value">高三富二代、学神</div>
          </div>
          <div class="info-item">
            <div class="info-label">性格</div>
            <div class="info-value">绝对控制欲、武力强</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">好感度</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">对苏晚棠</div>
            <div class="info-value">{{ character.好感对苏晚棠 || 0 }}</div>
            <div class="bar">
              <div class="bar-fill" :style="{ width: ((character.好感对苏晚棠 || 0) / 10) + '%' }"></div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-label">对沈含烟</div>
            <div class="info-value">{{ character.好感对沈含烟 || 0 }}</div>
            <div class="bar">
              <div class="bar-fill" :style="{ width: ((character.好感对沈含烟 || 0) / 10) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">角色特点</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">外貌</div>
            <div class="info-value">英俊冷峻，气质出众</div>
          </div>
          <div class="info-item">
            <div class="info-label">能力</div>
            <div class="info-value">学神、武力强、家境优渥</div>
          </div>
          <div class="info-item">
            <div class="info-label">性格</div>
            <div class="info-value">绝对控制欲、占有欲强</div>
          </div>
          <div class="info-item">
            <div class="info-label">对主角</div>
            <div class="info-value">从注意到兴趣到执着</div>
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
    陆辞夜?: {
      好感对苏晚棠?: number;
      好感对沈含烟?: number;
    };
  };
}

const props = defineProps<Props>();
const character = computed(() => props.statData?.陆辞夜 || {});
</script>