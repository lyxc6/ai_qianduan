<template>
  <div class="xx-top">
    <span>{{ currentTime }}</span>
    <span>玄霄宗</span>
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

<style lang="scss" scoped>
.xx-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: linear-gradient(135deg, #4A6FA5, #3A5F95);
  color: white;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(74, 111, 165, 0.3);
  border-bottom: 2px solid rgba(212, 175, 55, 0.3);
}
</style>
