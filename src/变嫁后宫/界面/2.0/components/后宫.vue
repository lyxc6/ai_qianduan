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
