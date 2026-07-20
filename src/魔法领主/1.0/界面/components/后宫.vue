<template>
  <div class="harem-container">
    <div v-if="!characters || Object.keys(characters).length === 0" class="empty-state">暂无后宫成员</div>
    <div v-else class="character-grid">
      <div
        v-for="(charData, charName) in characters"
        :key="charName"
        class="character-card"
        @click="handleClick(String(charName))"
      >
        <div class="character-name">{{ charName }}</div>
        <div class="character-stats">
          <div class="stat-row">
            <span class="stat-label">好感度</span>
            <span class="stat-value">{{ charData.好感度 ?? 'N/A' }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">后宫地位</span>
            <span class="stat-value">{{ charData.后宫地位 || '未知' }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">高潮次数</span>
            <span class="stat-value">{{ charData.高潮次数 ?? 0 }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">内射次数</span>
            <span class="stat-value">{{ charData.内射次数 ?? 0 }}</span>
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
    角色?: Record<string, any>;
  };
}

const props = defineProps<Props>();
const emit = defineEmits<{
  showDetail: [characterName: string];
}>();

const characters = computed(() => props.statData?.角色 || {});

function handleClick(characterName: string) {
  emit('showDetail', characterName);
}
</script>

<style lang="scss">
.harem-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  overflow-y: auto;
  padding: 0.25rem;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-secondary);
  font-family: var(--font-title);
  font-size: 0.9rem;
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.character-card {
  background: linear-gradient(135deg, rgba(30, 18, 60, 0.7) 0%, rgba(20, 12, 40, 0.8) 100%);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.625rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);

  &:hover {
    background: linear-gradient(135deg, rgba(40, 24, 80, 0.8) 0%, rgba(30, 18, 60, 0.9) 100%);
    border-color: var(--user-color-primary);
    transform: translateY(-2px);
    box-shadow:
      0 4px 12px rgba(167, 139, 250, 0.2),
      inset 0 1px 0 rgba(167, 139, 250, 0.1);
  }
}

.character-name {
  font-family: var(--font-title);
  font-size: 0.9rem;
  color: var(--text-title);
  margin-bottom: 0.375rem;
  letter-spacing: 1px;
}

.character-stats {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 0.7rem;
  color: var(--text-secondary);
}

.stat-value {
  font-size: 0.75rem;
  color: var(--text-primary);
}
</style>
