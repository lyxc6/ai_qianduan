import { createMemoryHistory, createRouter } from 'vue-router';
import './加载和卸载.ts';
import StatusBar from './状态栏.vue';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: StatusBar }],
});

$(() => {
  createApp(StatusBar).use(router).mount('#app');
});
