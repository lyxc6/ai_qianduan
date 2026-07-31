<template>
  <CharacterPanel name="苏晚棠" :age="16" :identity="['穿越者', 'TS病患者']" :character="character" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CharacterPanel from './CharacterPanel.vue';

interface Props {
  statData: {
    苏晚棠?: Record<string, any>;
  };
}

const props = defineProps<Props>();
const character = computed(() => props.statData?.苏晚棠 || {});
</script>
