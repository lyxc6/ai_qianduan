import { createApp } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import './加载和卸载.ts';
import App from './App.vue';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: () => import('./pages/DashboardPage.vue') },
  ],
});

$(() => {
  createApp(App).use(router).mount('#app');
});
