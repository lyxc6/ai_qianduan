import { createApp } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import './2.0/加载和卸载.ts';
import App from './2.0/App.vue';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: () => import('./2.0/pages/DashboardPage.vue') },
  ],
});

$(() => {
  createApp(App).use(router).mount('#app');
});
