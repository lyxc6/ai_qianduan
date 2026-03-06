<template>
  <Teleport to="body">
    <div v-if="visible" class="character-detail-modal active" @click="handleBackdropClick">
      <div class="character-detail-content" @click.stop>
        <div class="character-detail-header">
          <div class="character-name">{{ characterName }}</div>
          <div class="character-detail-close" @click="emit('close')">✕</div>
        </div>
        <div class="character-detail-body">
          <div class="character-detail-info info-group">
            <div class="info-item">
              <div class="info-label">性别</div>
              <div class="info-value">{{ character.性别 || '' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">年龄</div>
              <div class="info-value">{{ character.年龄 !== undefined ? character.年龄 : '' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">身份</div>
              <div class="info-value">{{ character.身份 || '' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">好感度</div>
              <div class="info-value">{{ character.好感度 || 0 }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">关系</div>
              <div class="info-value">{{ character.关系 || '同学' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">当前位置</div>
              <div class="info-value">{{ character.当前位置 || '' }}</div>
            </div>
            <div class="info-item full-width">
              <div class="info-label">当前状态</div>
              <div class="info-value">{{ character.当前状态 || '' }}</div>
            </div>
            <div class="info-item full-width">
              <div class="info-label">当前想法</div>
              <div class="info-value">{{ character.当前想法 || '' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  characterName: string;
  statData: {
    同学?: Record<string, any>;
  };
  visible: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const character = computed(() => {
  if (!props.characterName || !props.statData?.同学) return {};
  return props.statData.同学[props.characterName] || {};
});

function handleBackdropClick() {
  emit('close');
}
</script>

<style lang="scss">
.character-detail-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
}

.character-detail-modal.active {
  display: flex;
}

.character-detail-content {
  background: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  width: 90%;
  max-width: 28rem;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(255, 138, 128, 0.2);
  animation: slideIn 0.3s ease-out;
}

.character-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-panel);
  border-radius: 1rem 1rem 0 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.character-name {
  font-family: var(--font-title);
  font-size: 1.2rem;
  color: var(--user-color-primary);
  letter-spacing: 1px;
}

.character-detail-close {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-secondary);
  font-size: 1rem;

  &:hover {
    background-color: rgba(255, 183, 178, 0.15);
    color: var(--text-primary);
  }
}

.character-detail-body {
  padding: 1rem;
}

.character-detail-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
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
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  word-break: break-word;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

::-webkit-scrollbar {
  width: 0.5rem;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
}

::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 0.25rem;

  &:hover {
    background: var(--user-color-primary);
  }
}
</style>
