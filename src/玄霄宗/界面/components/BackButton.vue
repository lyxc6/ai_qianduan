<template>
  <button class="xx-back" @click="handleBack">
    <i class="fa-solid fa-chevron-left"></i>
    <span>返回</span>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function handleBack() {
  router.push('/');
}
</script>

<style lang="scss" scoped>
.xx-back {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: white;
  border: 1px solid rgba(184, 134, 11, 0.25);
  border-radius: 6px;
  color: #2C2C2C;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 10px rgba(74, 111, 165, 0.08);

  &:hover {
    background: linear-gradient(135deg, #E8F0F8 0%, #F8F5E8 100%);
    border-color: #D4AF37;
  }

  &:active {
    transform: scale(0.98);
  }

  i {
    font-size: 12px;
    color: #4A6FA5;
  }
}
</style>
