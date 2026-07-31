<template>
  <CharacterPanel
    name="陆辞夜"
    :age="18"
    :identity="['高三富二代', '学神']"
    :character="character"
    :notes="[
      { label: '外貌', value: '英俊冷峻，气质出众' },
      { label: '性格', value: '绝对控制欲、占有欲强' },
      { label: '对主角', value: '从注意到兴趣到执着' },
    ]"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CharacterPanel from './CharacterPanel.vue';

interface Props {
  statData: {
    陆辞夜?: Record<string, any>;
  };
}

const props = defineProps<Props>();
const character = computed(() => props.statData?.陆辞夜 || {});
</script>
