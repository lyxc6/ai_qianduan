<template>
  <div class="tab-container">
    <div class="tab-header">{{ tabs[activeTab].label }}</div>
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
import { ref, shallowRef, onMounted, provide } from 'vue';
import WorldTab from './WorldTab.vue';
import UserTab from './UserTab.vue';
import TargetTab from './TargetTab.vue';
import SystemTab from './SystemTab.vue';
import MoreTab from './MoreTab.vue';

interface StatData {
  世界?: Record<string, unknown>;
  系统?: Record<string, unknown>;
  用户?: Record<string, unknown>;
  目标?: Record<string, unknown>;
  后代?: Record<string, unknown>;
  背包?: Record<string, unknown>;
  宗门?: Record<string, unknown>;
  商城?: Record<string, unknown>;
}

const statData = shallowRef<StatData>({});
provide('statData', statData);

const activeTab = ref(0);

const tabs = [
  { name: '世界', label: '世界状态', icon: 'fa-solid fa-globe', component: WorldTab },
  { name: '用户', label: '用户信息', icon: 'fa-solid fa-user', component: UserTab },
  { name: '目标', label: '目标列表', icon: 'fa-solid fa-users', component: TargetTab },
  { name: '系统', label: '系统信息', icon: 'fa-solid fa-desktop', component: SystemTab },
  { name: '更多', label: '更多', icon: 'fa-solid fa-ellipsis', component: MoreTab },
];

async function loadData() {
  await waitGlobalInitialized('Mvu');
  const data = _.get(getAllVariables(), 'stat_data', {});
  statData.value = data as StatData;
  eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, () => {
    statData.value = _.get(getAllVariables(), 'stat_data', {}) as StatData;
  });
}

onMounted(() => {
  loadData();
});
</script>
