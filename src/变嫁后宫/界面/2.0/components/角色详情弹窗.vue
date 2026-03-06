<template>
  <div v-if="visible" class="character-detail-modal" @click.self="handleClose">
    <div class="character-detail-content">
      <div class="character-detail-header">
        <div class="character-name">{{ characterName }}</div>
        <div class="character-detail-close" @click="handleClose">✕</div>
      </div>
      <div class="character-detail-body">
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
          <div class="info-item">
            <div class="info-label">月经状态</div>
            <div class="info-value">{{ character.月经状态 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">怀孕状态</div>
            <div class="info-value">{{ pregnancyStatus }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">最近性行为</div>
            <div class="info-value">{{ character.最近性行为 || '' }}</div>
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

<style lang="scss">
.character-detail-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.character-detail-content {
  background: linear-gradient(135deg, var(--warm-bg-light) 0%, var(--warm-bg-dark) 100%);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  max-width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px var(--warm-shadow);
  animation: slideIn 0.3s ease-out;
}

.character-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  background: linear-gradient(135deg, var(--warm-bg-dark) 0%, var(--warm-bg-light) 100%);
  z-index: 1;
}

.character-name {
  font-family: var(--font-title);
  font-size: 1.25rem;
  color: var(--text-title);
  letter-spacing: 2px;
}

.character-detail-close {
  font-size: 1.25rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0.25rem;

  &:hover {
    color: var(--accent-color);
  }
}

.character-detail-body {
  padding: 1rem 1.25rem;
}

.character-detail-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.info-item {
  display: flex;
  flex-direction: column;
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

@media (max-width: 768px) {
  .character-detail-content {
    max-width: 95%;
    max-height: 85vh;
  }

  .character-detail-info {
    grid-template-columns: 1fr;
  }
}
</style>
