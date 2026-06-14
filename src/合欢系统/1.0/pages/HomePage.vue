<template>
  <div class="hh-appgrid">
    <button
      v-for="app in apps"
      :key="app.path"
      class="hh-app"
      @click="router.push(app.path)"
    >
      <div class="hh-ico" :class="app.icoClass">{{ app.ico }}</div>
      <div>{{ app.label }}</div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const apps = [
  { path: '/system', ico: '合', label: '合欢系统', icoClass: 'hh-sys' },
  { path: '/user', ico: '主', label: '主角信息', icoClass: 'hh-user' },
  { path: '/target', ico: '目', label: '在场目标', icoClass: 'hh-girl' },
  { path: '/network', ico: '网', label: '关系网', icoClass: 'hh-harem' },
  { path: '/alltarget', ico: '全', label: '全部目标', icoClass: 'hh-alltarget' },
  { path: '/child', ico: '嗣', label: '后代', icoClass: 'hh-child' },
  { path: '/milestone', ico: '碑', label: '里程碑', icoClass: 'hh-mile' },
  { path: '/sect', ico: '宗', label: '宗门', icoClass: 'hh-sect' },
  { path: '/member', ico: '员', label: '成员', icoClass: 'hh-member' },
  { path: '/base', ico: '点', label: '据点', icoClass: 'hh-base' },
  { path: '/industry', ico: '业', label: '产业', icoClass: 'hh-industry' },
  { path: '/task', ico: '任', label: '任务栏', icoClass: 'hh-task' },
  { path: '/action', ico: '策', label: '行动建议', icoClass: 'hh-action' },
  { path: '/shop', ico: '商', label: '系统商城', icoClass: 'hh-shop' },
  { path: '/bag', ico: '包', label: '背包', icoClass: 'hh-bag' },
  { path: '/edit', ico: '编', label: '变量编辑', icoClass: 'hh-edit' },
];
</script>

<style lang="scss" scoped>
.hh-appgrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.hh-app {
  border: 0;
  background: transparent;
  color: #831843;
  text-align: center;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  font-weight: 800;
}

.hh-ico {
  width: 52px;
  height: 52px;
  margin: 0 auto 5px;
  border-radius: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 900;
  box-shadow:
    0 8px 18px rgba(190, 24, 93, 0.2),
    inset 0 0 10px rgba(255, 255, 255, 0.5);
  color: #fff;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);
  }
}

.hh-app.active .hh-ico {
  outline: 2px solid rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 18px rgba(255, 77, 166, 0.7);
}

.hh-sys {
  background: linear-gradient(135deg, #ff4fa3, #be185d);
}

.hh-user {
  background: linear-gradient(135deg, #fb7185, #db2777);
}

.hh-girl {
  background: linear-gradient(135deg, #f9a8d4, #ec4899);
}

.hh-harem {
  background: linear-gradient(135deg, #f472b6, #be185d);
}

.hh-alltarget {
  background: linear-gradient(135deg, #fda4af, #f43f5e);
}

.hh-child {
  background: linear-gradient(135deg, #fecdd3, #f43f5e);
}

.hh-mile {
  background: linear-gradient(135deg, #fda4af, #fb7185);
}

.hh-task {
  background: linear-gradient(135deg, #e879f9, #c026d3);
}

.hh-action {
  background: linear-gradient(135deg, #f0abfc, #db2777);
}

.hh-shop {
  background: linear-gradient(135deg, #fbcfe8, #ec4899);
}

.hh-sect {
  background: linear-gradient(135deg, #ff77b7, #9d174d);
}

.hh-member {
  background: linear-gradient(135deg, #f9a8d4, #be185d);
}

.hh-base {
  background: linear-gradient(135deg, #fecdd3, #e11d48);
}

.hh-industry {
  background: linear-gradient(135deg, #fbcfe8, #a21caf);
}

.hh-bag {
  background: linear-gradient(135deg, #ddd6fe, #9333ea);
}

.hh-edit {
  background: linear-gradient(135deg, #34d399, #059669);
}

@media (max-width: 480px) {
  .hh-appgrid {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .hh-ico {
    width: 48px;
    height: 48px;
  }
}
</style>
