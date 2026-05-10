<template>
  <div class="harem-container">
    <div v-if="!hasCharacters" class="harem-empty">
      <div class="harem-character-card">
        <div class="harem-character-name">暂无角色</div>
      </div>
    </div>
    <div v-else class="harem-cards-grid">
      <div
        v-for="(char, name) in characters"
        :key="name"
        class="harem-character-card"
        @click="handleCardClick(name)"
      >
        <div class="harem-character-avatar">{{ String(name).charAt(0).toUpperCase() }}</div>
        <div class="harem-character-name">{{ name }}</div>
        <div class="harem-character-affection" :class="getAffectionClass(char.好感度)">
          好感度: {{ char.好感度 || 0 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  statData: {
    后宫?: Record<string, {
      好感度?: number;
      关系?: string;
      处女?: boolean;
      性别?: string;
      [key: string]: any;
    }>;
  };
}

const props = defineProps<Props>();
const emit = defineEmits<{
  showDetail: [characterName: string];
}>();

const characters = computed(() => props.statData?.后宫 || {});
const hasCharacters = computed(() => Object.keys(characters.value).length > 0);

function getAffectionClass(affection?: number): string {
  if (affection === undefined || affection === null) return '';
  if (affection < 30) return 'low';
  if (affection < 70) return 'medium';
  return '';
}

function handleCardClick(name: string) {
  emit('showDetail', name);
}
</script>

<style lang="scss">
.harem-container {
  height: 100%;
  padding: 0.25rem;
}

.harem-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
  gap: 0.5rem;
  padding: 0.25rem;
}

.harem-character-card {
  background: linear-gradient(135deg, rgba(62, 42, 20, 0.8) 0%, rgba(43, 29, 14, 0.9) 100%);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(212, 177, 106, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    background: linear-gradient(135deg, rgba(82, 56, 27, 0.9) 0%, rgba(57, 38, 19, 0.95) 100%);
    border-color: var(--accent-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(212, 177, 106, 0.2);
  }
}

.harem-character-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--user-color-primary), var(--user-color-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-title);
  font-size: 1.2rem;
  color: var(--bg-main);
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.harem-character-name {
  font-family: var(--font-title);
  font-size: 0.85rem;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
  letter-spacing: 1px;
}

.harem-character-affection {
  font-family: var(--font-serif);
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  border-radius: 0.25rem;
  background: rgba(0, 0, 0, 0.2);
}

.harem-character-affection.low {
  color: #ff6b6b;
}

.harem-character-affection.medium {
  color: #ffd93d;
}
</style>
