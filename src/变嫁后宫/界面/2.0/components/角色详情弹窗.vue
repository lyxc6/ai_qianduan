<template>
  <div v-if="visible" class="character-detail-modal" @click.self="handleClose">
    <div class="character-detail-content">
      <div class="character-detail-header">
        <div class="character-name">{{ characterName }}</div>
        <div class="character-detail-close" @click="handleClose">✕</div>
      </div>
      <div class="character-detail-body">
        <div class="info-section">
          <div class="section-title">基本信息</div>
          <div class="character-detail-info info-group">
            <div class="info-item">
              <div class="info-label">年龄</div>
              <div class="info-value">{{ character.年龄 || '' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">关系</div>
              <div class="info-value">{{ character.关系 || '' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">好感度</div>
              <div class="info-value">{{ character.好感度 || 0 }}</div>
            </div>
          </div>
        </div>

        <div class="info-section">
          <div class="section-title">当前状态</div>
          <div class="character-detail-info info-group">
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
              <div class="info-label">当前想法</div>
              <div class="info-value">{{ character.当前想法 || '' }}</div>
            </div>
          </div>
        </div>

        <div class="info-section">
          <div class="section-title">身体状态</div>
          <div class="character-detail-info info-group">
            <div class="info-item">
              <div class="info-label">处女</div>
              <div class="info-value">{{ character.处女 ? '是' : '否' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">破处记录</div>
              <div class="info-value">{{ character.破处记录 || '' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">高潮次数</div>
              <div class="info-value">{{ character.高潮次数 !== undefined ? character.高潮次数 : '' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">被内射次数</div>
              <div class="info-value">{{ character.被内射次数 !== undefined ? character.被内射次数 : '' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">身体状态</div>
              <div class="info-value">{{ character.身体状态 || '' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">胸部状态</div>
              <div class="info-value">{{ character.胸部状态 || '' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">阴部状态</div>
              <div class="info-value">{{ character.阴部状态 || '' }}</div>
            </div>
          </div>
        </div>

        <div class="info-section">
          <div class="section-title">怀孕相关</div>
          <div class="character-detail-info info-group">
            <div class="info-item">
              <div class="info-label">怀孕状态</div>
              <div class="info-value">{{ pregnancyStatus }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">最近性行为</div>
              <div class="info-value">{{ character.最近性行为 || '' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  characterName: string;
  statData: {
    后宫?: Record<string, any>;
  };
  visible: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const character = computed(() => {
  if (!props.characterName || !props.statData?.后宫) return {};
  return props.statData.后宫[props.characterName] || {};
});

const pregnancyStatus = computed(() => {
  const 怀孕信息 = character.value.怀孕 || {};
  if (怀孕信息.是否怀孕) {
    return `已怀孕 ${怀孕信息.怀孕月数} 个月`;
  }
  return '未怀孕';
});

function handleClose() {
  emit('close');
}
</script>
