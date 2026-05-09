import { createApp } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import './加载和卸载.ts';
import App from './App.vue';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('./pages/HomePage.vue') },
    { path: '/system', name: 'system', component: () => import('./pages/SystemPage.vue') },
    { path: '/user', name: 'user', component: () => import('./pages/UserPage.vue') },
    { path: '/target', name: 'target', component: () => import('./pages/TargetPage.vue') },
    { path: '/network', name: 'network', component: () => import('./pages/NetworkPage.vue') },
    { path: '/alltarget', name: 'alltarget', component: () => import('./pages/AllTargetPage.vue') },
    { path: '/child', name: 'child', component: () => import('./pages/ChildPage.vue') },
    { path: '/milestone', name: 'milestone', component: () => import('./pages/MilestonePage.vue') },
    { path: '/sect', name: 'sect', component: () => import('./pages/SectPage.vue') },
    { path: '/member', name: 'member', component: () => import('./pages/MemberPage.vue') },
    { path: '/base', name: 'base', component: () => import('./pages/BasePage.vue') },
    { path: '/industry', name: 'industry', component: () => import('./pages/IndustryPage.vue') },
    { path: '/task', name: 'task', component: () => import('./pages/TaskPage.vue') },
    { path: '/action', name: 'action', component: () => import('./pages/ActionPage.vue') },
    { path: '/shop', name: 'shop', component: () => import('./pages/ShopPage.vue') },
    { path: '/bag', name: 'bag', component: () => import('./pages/BagPage.vue') },
    { path: '/edit', name: 'edit', component: () => import('./pages/EditPage.vue') },
  ],
});

$(() => {
  createApp(App).use(router).mount('#app');
});
