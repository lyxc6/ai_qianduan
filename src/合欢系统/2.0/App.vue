<template>
  <div class="app-root">
    <router-view :theme="theme" :toggleTheme="toggleTheme" />
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

const theme = ref<'light' | 'dark'>('light');

function applyTheme(value: 'light' | 'dark') {
  theme.value = value;
  document.documentElement.setAttribute('data-theme', value);
}

async function toggleTheme() {
  const next = theme.value === 'light' ? 'dark' : 'light';
  applyTheme(next);
  await insertOrAssignVariables({ UI主题: next }, { type: 'chat' });
}

async function loadData() {
  console.log('[2.0] loadData 开始');
  await waitGlobalInitialized('Mvu');
  console.log('[2.0] Mvu 已初始化');

  const allVars = getAllVariables();
  console.log('[2.0] getAllVariables():', allVars);
  console.log('[2.0] stat_data 存在:', _.has(allVars, 'stat_data'));

  const chatVars = getVariables({ type: 'chat' });
  console.log('[2.0] chat 变量:', chatVars);
  const savedTheme = _.get(chatVars, 'UI主题');
  console.log('[2.0] 读取 UI主题:', savedTheme);

  if (savedTheme === 'dark' || savedTheme === 'light') {
    applyTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  const data = _.get(getAllVariables(), 'stat_data', {});
  console.log('[2.0] stat_data 内容:', data);
  statData.value = data as StatData;
  console.log('[2.0] statData 已设置:', statData.value);

  eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, (newVars) => {
    console.log('[2.0] VARIABLE_UPDATE_ENDED 触发');
    statData.value = _.get(newVars, 'stat_data', {}) as StatData;
  });
}

onMounted(() => {
  loadData();
});
</script>
