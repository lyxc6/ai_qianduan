import { createMemoryHistory, createRouter } from 'vue-router';
import StatusBar from './状态栏.vue';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: StatusBar }],
});

$(() => {
  createApp(StatusBar).use(router).mount('#app');
});
