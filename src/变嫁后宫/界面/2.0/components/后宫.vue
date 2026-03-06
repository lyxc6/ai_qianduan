<template>
  <div class="harem-container">
    <div v-if="!hasCharacters" class="harem-empty">
      <div class="harem-character-card">
        <div class="harem-character-name">暂无角色</div>
      </div>
    </div>
    <div v-else class="harem-cards-grid">
      <div v-for="(char, name) in characters" :key="name" class="harem-character-card" @click="handleCardClick(name)">
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
    后宫?: Record<
      string,
      {
        好感度?: number;
        关系?: string;
        处女?: boolean;
        性别?: string;
        [key: string]: any;
      }
    >;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.5rem;
}

.harem-character-card {
  flex: 1;
  min-width: 100px;
  max-width: 150px;
  background: linear-gradient(180deg, var(--warm-gradient-start) 0%, var(--warm-bg-dark) 100%);
  border: 1px solid var(--warm-border-light);
  border-radius: 12px;
  padding: 1rem 0.5rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 4px 15px var(--warm-shadow),
    inset 0 1px 0 var(--warm-inner-light),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--user-color-primary), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: linear-gradient(180deg, rgba(255, 210, 160, 0.9) 0%, rgba(255, 235, 195, 0.98) 100%);
    border-color: var(--warm-border-hover);
    transform: translateY(-4px) scale(1.02);
    box-shadow:
      0 8px 25px var(--warm-shadow),
      0 0 20px rgba(255, 180, 100, 0.15),
      inset 0 1px 0 var(--warm-inner-light);

    &::before {
      opacity: 1;
    }

    .harem-character-avatar {
      transform: scale(1.1);
      box-shadow: 0 0 20px var(--user-color-primary);
    }
  }
}

.harem-character-avatar {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--user-color-primary), var(--user-color-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-title);
  font-size: 1.4rem;
  color: var(--bg-main);
  margin-bottom: 0.6rem;
  box-shadow:
    0 4px 12px var(--warm-shadow),
    0 0 0 3px var(--warm-border-light),
    inset 0 2px 4px var(--warm-inner-light);
  transition: all 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--warm-border-light) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
}

.harem-character-name {
  font-family: var(--font-title);
  font-size: 0.9rem;
  color: var(--text-primary);
  margin-bottom: 0.4rem;
  letter-spacing: 2px;
  text-shadow: 0 1px 2px var(--warm-inner-light);
  font-weight: 500;
}

.harem-character-affection {
  font-family: var(--font-serif);
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid var(--warm-border-light);
  transition: all 0.3s ease;
}

.harem-character-affection.low {
  color: #ff8a8a;
  border-color: rgba(255, 100, 100, 0.3);
}

.harem-character-affection.medium {
  color: #e6a800;
  border-color: rgba(255, 200, 100, 0.3);
}
</style>
