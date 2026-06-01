<template>
  <div class="xx-app" id="app">
    <div class="xx-screen">
      <router-view />
    </div>
    <TabBar />
  </div>
</template>

<script setup lang="ts">
import { onMounted, provide, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TabBar from './components/TabBar.vue';
import './styles/main.scss';

const router = useRouter();
const route = useRoute();
provide('router', router);
provide('route', route);

interface StatData {
  主角?: Record<string, unknown>;
  后宫?: Record<string, unknown>;
  攻略目标?: Record<string, unknown>;
  当前时间?: string;
  当前地点?: string;
}

const statData = ref<StatData>({});
provide<Ref<StatData>>('statData', statData);

async function loadData() {
  await waitGlobalInitialized('Mvu');
  const data = _.get(getAllVariables(), 'stat_data', {});
  statData.value = data as StatData;
  eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, () => {
    statData.value = _.get(getAllVariables(), 'stat_data', {}) as StatData;
  });
}

function loadTheme() {
  try {
    const allVars = getAllVariables();
    if (allVars && allVars.主题风格) {
      const appElement = document.getElementById('app');
      if (appElement) {
        appElement.classList.add(`theme-${allVars.主题风格}`);
      }
    }
  } catch (error) {
    console.error('加载主题失败:', error);
  }
}

onMounted(() => {
  loadData();
  loadTheme();
});
</script>
