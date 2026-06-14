<template>
  <div class="dashboard-root">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, provide } from 'vue';
import './styles/main.scss';

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

const statData = ref<StatData>({});
provide('statData', statData);

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
