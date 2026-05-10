import { createMemoryHistory, createRouter } from 'vue-router';
import './styles.scss';
import StatusBar from './状态栏.vue';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: StatusBar }],
});

$(async () => {
  await waitGlobalInitialized('Mvu');
  createApp(StatusBar).use(router).mount('#app');
});
