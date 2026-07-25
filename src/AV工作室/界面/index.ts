import { createMemoryHistory, createRouter } from 'vue-router';
import './全局.css';
import StatusBar from './组件/状态栏.vue';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: StatusBar }],
});

$(() => {
  createApp(StatusBar).use(router).mount('#app');
});
