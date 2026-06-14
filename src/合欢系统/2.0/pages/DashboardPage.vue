<template>
  <div class="tab-container">
    <div class="tab-header">
      <div style="width: 32px;"></div>
      <div class="tab-header-title">{{ tabs[activeTab].label }}</div>
      <button class="theme-toggle" @click="toggleTheme">
        <i :class="theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
      </button>
    </div>
    <div class="tab-content">
      <component :is="tabs[activeTab].component" />
    </div>
    <div class="tab-bar">
      <button
        v-for="(tab, i) in tabs"
        :key="i"
        class="tab-item"
        :class="{ active: activeTab === i }"
        @click="activeTab = i"
      >
        <i :class="tab.icon"></i>
        <span>{{ tab.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, provide } from 'vue';
import WorldTab from './WorldTab.vue';
import UserTab from './UserTab.vue';
import TargetTab from './TargetTab.vue';
import SystemTab from './SystemTab.vue';
import MoreTab from './MoreTab.vue';

defineProps<{
  theme: string;
  toggleTheme: () => void;
}>();

const activeTab = ref(0);

const tabs = [
  { name: '世界', label: '世界状态', icon: 'fa-solid fa-globe', component: WorldTab },
  { name: '用户', label: '用户信息', icon: 'fa-solid fa-user', component: UserTab },
  { name: '目标', label: '目标列表', icon: 'fa-solid fa-users', component: TargetTab },
  { name: '系统', label: '系统信息', icon: 'fa-solid fa-desktop', component: SystemTab },
  { name: '更多', label: '更多', icon: 'fa-solid fa-ellipsis', component: MoreTab },
];
</script>
