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
              <div class="info-value">{{ character.年龄 || '' }}</div>
            </div>
            <div class="info-item female-only" :class="{ hidden: !isFemale }">
              <div class="info-label">后宫地位</div>
              <div class="info-value">{{ character.后宫地位 || '' }}</div>
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
              <div class="info-label">功力境界</div>
              <div class="info-value">{{ character.功力境界 || '' }}</div>
            </div>
            <div class="info-item female-only" :class="{ hidden: !isFemale }">
              <div class="info-label">处女</div>
              <div class="info-value">{{ character.处女 ? '是' : '否' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">高潮次数</div>
              <div class="info-value">{{ character.高潮次数 !== undefined ? character.高潮次数 : '' }}</div>
            </div>
            <div class="info-item female-only" :class="{ hidden: !isFemale }">
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
            <div class="info-item female-only" :class="{ hidden: !isFemale }">
              <div class="info-label">月经状态</div>
              <div class="info-value">{{ character.月经状态 || '' }}</div>
            </div>
            <div class="info-item female-only" :class="{ hidden: !isFemale }">
              <div class="info-label">怀孕状态</div>
              <div class="info-value">{{ character.怀孕状态 || '' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">最近性行为</div>
              <div class="info-value">{{ character.最近性行为 || '' }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">身体状态</div>
              <div class="info-value">{{ character.身体状况 || '' }}</div>
            </div>
            <div class="info-item female-only" :class="{ hidden: !isFemale }">
              <div class="info-label">胸部状态</div>
              <div class="info-value">{{ character.胸部状态 || '' }}</div>
            </div>
            <div class="info-item female-only" :class="{ hidden: !isFemale }">
              <div class="info-label">阴部状态</div>
              <div class="info-value">{{ character.阴部状态 || '' }}</div>
            </div>
          </div>
          <div class="character-inventory-section">
            <h3 class="section-title">功法与技能</h3>
            <div class="martial-arts-container">
              <div v-if="!skills || skills.length === 0" class="no-items">暂无功法与技能</div>
              <div v-else v-for="(skill, index) in skills" :key="index" class="martial-art-item">
                <div class="martial-art-name">{{ skill }}</div>
              </div>
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

const isFemale = computed(() => {
  const gender = character.value.性别;
  return gender === '女' || gender === '由男变女';
});

const skills = computed(() => character.value.功法与技能 || []);

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
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
}

.character-detail-modal.active {
  display: flex;
}

.character-detail-content {
  background: linear-gradient(135deg, rgba(43, 29, 14, 0.98) 0%, rgba(62, 42, 20, 0.95) 100%);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(212, 177, 106, 0.1);
  animation: slideIn 0.3s ease-out;
}

.character-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-color);
  background: linear-gradient(90deg, rgba(212, 177, 106, 0.1) 0%, transparent 100%);
}

.character-name {
  font-family: var(--font-title);
  font-size: 1.1rem;
  color: var(--text-title);
  letter-spacing: 2px;
}

.character-detail-close {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 107, 107, 0.2);
    color: #ff6b6b;
  }
}

.character-detail-body {
  padding: 1rem;
}

.character-detail-info {
  margin-bottom: 1rem;
}

.female-only.hidden {
  display: none;
}
</style>
