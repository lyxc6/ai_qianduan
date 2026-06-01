import { createApp } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import './加载和卸载.ts';
import App from './App.vue';
import ProtagonistPage from './pages/ProtagonistPage.vue';
import EditPage from './pages/EditPage.vue';
import HaremPage from './pages/HaremPage.vue';
import HaremDetailPage from './pages/HaremDetailPage.vue';
import SettingsPage from './pages/SettingsPage.vue';
import EditJSONPatchPage from './pages/EditJSONPatchPage.vue';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'harem', component: HaremPage },
    { path: '/harem/:name', name: 'harem-detail', component: HaremDetailPage },
    { path: '/protagonist', name: 'protagonist', component: ProtagonistPage },
    { path: '/edit', name: 'edit', component: EditPage },
    { path: '/settings', name: 'settings', component: SettingsPage },
    { path: '/edit-jsonpatch', name: 'edit-jsonpatch', component: EditJSONPatchPage },
  ],
});

$(() => {
  createApp(App).use(router).mount('#app');
});
