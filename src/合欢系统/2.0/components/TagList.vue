<template>
  <div class="tag-container">
    <span v-for="(tag, i) in tags" :key="i" class="tag">{{ tag }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tags: string[];
}>();
</script>
