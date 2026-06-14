<template>
  <button class="hh-back" @click="handleBack">
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
