<template>
  <div class="dash-card" :class="{ wide }">
    <div class="dash-card-header" :class="color">
      <i :class="icon"></i>
      <span>{{ title }}</span>
    </div>
    <div class="dash-card-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
  color?: string;
  wide?: boolean;
}>();
</script>
