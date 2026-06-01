<template>
  <div class="xx-tab-bar">
    <button
      v-for="item in tabs"
      :key="item.path"
      class="xx-tab-item"
      :class="{ 'xx-tab-active': isActive(item.path) }"
      @click="goTo(item.path)"
    >
      <i :class="item.icon"></i>
      <span>{{ item.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router';

const router = inject<Router>('router');
const route = inject<RouteLocationNormalizedLoaded>('route');

const tabs = [
  { path: '/', label: '后宫', icon: 'fa-solid fa-crown' },
  { path: '/protagonist', label: '主角', icon: 'fa-solid fa-user' },
  { path: '/settings', label: '设置', icon: 'fa-solid fa-gear' },
];

function isActive(path: string) {
  return route?.path === path;
}

function goTo(path: string) {
  router?.push(path);
}
</script>

<style lang="scss" scoped>
.xx-tab-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 3.5rem;
  background: var(--xx-paper);
  border-top: 0.0625rem solid var(--xx-border);
  position: sticky;
  bottom: 0;
  z-index: 100;
}

.xx-tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--xx-light-cyan);

  i {
    font-size: 1.125rem;
    margin-bottom: 0.125rem;
  }

  span {
    font-size: 0.6875rem;
    font-weight: 500;
  }

  &:hover {
    color: var(--xx-cyan);
    background: rgba(74, 85, 104, 0.05);
  }

  &.xx-tab-active {
    color: var(--xx-ink);

    i {
      color: var(--xx-cyan);
    }
  }
}
</style>
