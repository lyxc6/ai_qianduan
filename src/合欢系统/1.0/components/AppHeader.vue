<template>
  <div class="hh-top">
    <span>{{ currentTime }}</span>
    <span>合欢宗OS</span>
    <span>100%</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref('09:41');

function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  currentTime.value = `${hours}:${minutes}`;
}

let interval: number;

onMounted(() => {
  updateTime();
  interval = window.setInterval(updateTime, 60000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>
