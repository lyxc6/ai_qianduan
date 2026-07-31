<template>
  <CharacterPanel name="沈含烟" :age="16" :identity="['穿越者', 'TS病患者', '冰山美人']" :character="character" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CharacterPanel from './CharacterPanel.vue';

interface Props {
  statData: {
    沈含烟?: Record<string, any>;
  };
}

const props = defineProps<Props>();
const character = computed(() => props.statData?.沈含烟 || {});
</script>
