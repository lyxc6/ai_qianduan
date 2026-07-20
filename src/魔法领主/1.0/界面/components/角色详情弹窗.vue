<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">{{ characterName }}</div>
            <button class="close-button" @click="$emit('close')">&times;</button>
          </div>

          <div class="modal-body">
            <div class="character-detail-info">
              <div class="info-section">
                <div class="section-title">基本信息</div>
                <div class="info-grid">
                  <div class="info-item">
                    <span class="info-label">年龄</span>
                    <span class="info-value">{{ characterData.年龄 ?? 'N/A' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">处女</span>
                    <span class="info-value">{{ characterData.处女 || '未知' }}</span>
                  </div>
                  <div class="info-item full-width">
                    <span class="info-label">破处</span>
                    <span class="info-value">{{ characterData.破处 || '无' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">力量等级</span>
                    <span class="info-value">{{ characterData.力量等级 || '未知' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">好感度</span>
                    <span class="info-value">{{ characterData.好感度 ?? 'N/A' }}</span>
                  </div>
                  <div class="info-item full-width">
                    <span class="info-label">后宫地位</span>
                    <span class="info-value">{{ characterData.后宫地位 || '未知' }}</span>
                  </div>
                </div>
              </div>

              <div class="info-section">
                <div class="section-title">身体状态</div>
                <div class="info-grid">
                  <div class="info-item full-width">
                    <span class="info-label">当前着装</span>
                    <span class="info-value">{{ characterData.当前着装 || '未知' }}</span>
                  </div>
                  <div class="info-item full-width">
                    <span class="info-label">当前姿势</span>
                    <span class="info-value">{{ characterData.当前姿势 || '未知' }}</span>
                  </div>
                  <div class="info-item full-width">
                    <span class="info-label">当前想法</span>
                    <span class="info-value">{{ characterData.当前想法 || '未知' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">小穴状态</span>
                    <span class="info-value">{{ characterData.当前小穴状态 || '未知' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">胸部状态</span>
                    <span class="info-value">{{ characterData.当前胸部状态 || '未知' }}</span>
                  </div>
                  <div class="info-item full-width">
                    <span class="info-label">身体状态</span>
                    <span class="info-value">{{ characterData.身体状态 || '未知' }}</span>
                  </div>
                  <div class="info-item full-width">
                    <span class="info-label">最近性行为</span>
                    <span class="info-value">{{ characterData.最近性行为 || '暂无' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">怀孕状态</span>
                    <span class="info-value">{{ characterData.怀孕状态 || '未知' }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">高潮次数</span>
                    <span class="info-value">{{ characterData.高潮次数 ?? 0 }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">内射次数</span>
                    <span class="info-value">{{ characterData.内射次数 ?? 0 }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  characterName: string;
  statData: {
    角色?: Record<string, any>;
  };
  visible: boolean;
}

const props = defineProps<Props>();
defineEmits<{
  close: [];
}>();

const characterData = computed(() => {
  if (!props.characterName || !props.statData?.角色) return {};
  return props.statData.角色[props.characterName] || {};
});
</script>

<style lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: linear-gradient(135deg, rgba(20, 12, 40, 0.95) 0%, rgba(30, 18, 60, 0.95) 100%);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  width: 90%;
  max-width: 28rem;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(167, 139, 250, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  background: linear-gradient(135deg, rgba(20, 12, 40, 0.98) 0%, rgba(30, 18, 60, 0.98) 100%);
  z-index: 1;
}

.modal-title {
  font-family: var(--font-title);
  font-size: 1.1rem;
  color: var(--text-title);
  letter-spacing: 1px;
}

.close-button {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 0.25rem;
  line-height: 1;
  transition: color 0.3s ease;

  &:hover {
    color: var(--text-primary);
  }
}

.modal-body {
  padding: 0.75rem;
}

.character-detail-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-section {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  padding: 0.625rem;
}

.section-title {
  font-family: var(--font-title);
  font-size: 0.85rem;
  color: var(--user-color-primary);
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--border-color);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.375rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-item.full-width {
  grid-column: span 2;
}

.info-label {
  font-size: 0.65rem;
  color: var(--text-secondary);
  margin-bottom: 0.125rem;
}

.info-value {
  font-size: 0.75rem;
  color: var(--text-primary);
  line-height: 1.3;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
