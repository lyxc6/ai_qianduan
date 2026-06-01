<template>
  <div class="xx-page">
    <!-- 系统设置 -->
    <div class="xx-card settings-card">
      <div class="settings-header">
        <h2 class="settings-title">系统设置</h2>
      </div>
      <div class="settings-info">
        <div class="settings-info-item">
          <span class="settings-info-label">当前主题</span>
          <span class="settings-info-value">{{ currentThemeName }}</span>
        </div>
        <div class="settings-info-item">
          <span class="settings-info-label">玄霄宗系统</span>
          <span class="settings-info-value">v1.0.0</span>
        </div>
      </div>
    </div>

    <!-- 数据管理 -->
    <div class="xx-card settings-card">
      <div class="settings-header">
        <h2 class="settings-title">数据管理</h2>
        <p class="settings-subtitle">管理系统变量和配置</p>
      </div>
      <div class="settings-grid">
        <button class="settings-btn settings-btn-primary" @click="goEdit">
          <div class="settings-btn-icon">
            <i class="fa-solid fa-edit"></i>
          </div>
          <div class="settings-btn-content">
            <span class="settings-btn-title">编辑变量</span>
            <span class="settings-btn-desc">修改角色、攻略等数据</span>
          </div>
          <div class="settings-btn-arrow">
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </button>

        <button class="settings-btn settings-btn-secondary" @click="goEditJSONPatch">
          <div class="settings-btn-icon">
            <i class="fa-solid fa-code-compare"></i>
          </div>
          <div class="settings-btn-content">
            <span class="settings-btn-title">编辑当前JSONPatch</span>
            <span class="settings-btn-desc">编辑最新楼层的变量更新</span>
          </div>
          <div class="settings-btn-arrow">
            <i class="fa-solid fa-chevron-right"></i>
          </div>
        </button>
      </div>
    </div>

    <!-- 风格设置 -->
    <div class="xx-card settings-card">
      <div class="settings-header">
        <h2 class="settings-title">风格设置</h2>
        <p class="settings-subtitle">选择您喜欢的界面风格</p>
      </div>
      <div class="theme-grid">
        <button
          v-for="theme in themes"
          :key="theme.id"
          class="theme-card"
          :class="{ 'theme-card-active': currentTheme === theme.id }"
          @click="setTheme(theme.id)"
        >
          <div class="theme-preview">
            <div class="theme-color-bar" :style="{ background: theme.colors }"></div>
          </div>
          <div class="theme-info">
            <span class="theme-name">{{ theme.name }}</span>
            <span class="theme-desc">{{ theme.description }}</span>
          </div>
          <div class="theme-check" v-if="currentTheme === theme.id">
            <i class="fa-solid fa-check"></i>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, onMounted, computed } from 'vue';
import type { Router } from 'vue-router';

const router = inject<Router>('router');

const themes = [
  {
    id: 'ink-wash',
    name: '水墨风修仙',
    description: '淡雅灰蓝，传统水墨风格',
    colors: 'linear-gradient(90deg, #4a5568, #d4af37, #718096)',
  },
  {
    id: 'ancient',
    name: '古风雅致',
    description: '赭石红金，古典雅致风格',
    colors: 'linear-gradient(90deg, #c44536, #d4af37, #3d2914)',
  },
  {
    id: 'modern',
    name: '简约现代',
    description: '极简清新，现代简洁风格',
    colors: 'linear-gradient(90deg, #16213e, #0f3460, #1a1a2e)',
  },
  {
    id: 'dark',
    name: '暗夜修仙',
    description: '深紫暗金，神秘暗黑风格',
    colors: 'linear-gradient(90deg, #9b59b6, #d4af37, #e8e8f0)',
  },
];

const currentTheme = ref('ink-wash');

const currentThemeName = computed(() => {
  const theme = themes.find((t) => t.id === currentTheme.value);
  return theme ? theme.name : '水墨风修仙';
});

function goEdit() {
  router?.push('/edit');
}

function goEditJSONPatch() {
  router?.push('/edit-jsonpatch');
}

function setTheme(themeId: string) {
  currentTheme.value = themeId;
  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.className = '';
    appElement.classList.add(`theme-${themeId}`);
  }
  const allVars = getAllVariables();
  allVars.主题风格 = themeId;
  replaceVariables(allVars, { type: 'chat' });
}

function loadTheme() {
  try {
    const allVars = getAllVariables();
    if (allVars && allVars.主题风格) {
      const savedTheme = themes.find((t) => t.id === allVars.主题风格);
      if (savedTheme) {
        currentTheme.value = savedTheme.id;
        const appElement = document.getElementById('app');
        if (appElement) {
          appElement.classList.add(`theme-${currentTheme.value}`);
        }
      }
    }
  } catch (error) {
    console.error('加载主题失败:', error);
  }
}

onMounted(() => {
  loadTheme();
});
</script>

<style lang="scss" scoped>
/* 设置卡片 */
.settings-card {
  background: var(--xx-paper);
  overflow: hidden;
}

.settings-header {
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 0.0625rem solid var(--xx-border);
}

.settings-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--xx-ink);
  letter-spacing: 0.0625rem;
}

.settings-subtitle {
  margin: 0.25rem 0 0 0;
  font-size: 0.8125rem;
  color: var(--xx-light-cyan);
}

.settings-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.settings-info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.settings-info-label {
  font-size: 0.875rem;
  color: var(--xx-light-cyan);
  font-weight: 500;
}

.settings-info-value {
  font-size: 0.875rem;
  color: var(--xx-cyan);
  font-weight: 600;
}

/* 主题网格 */
.theme-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

/* 主题卡片 */
.theme-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 0.0625rem solid var(--xx-border);
  background: var(--xx-bg);
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;

  &:hover {
    border-color: var(--xx-cyan);
    transform: translateY(-0.125rem);
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.08);
  }

  &.theme-card-active {
    border-color: var(--xx-cyan);
    background: rgba(74, 85, 104, 0.05);
  }
}

.theme-preview {
  width: 100%;
  height: 0.5rem;
  border-radius: 0.25rem;
  overflow: hidden;
}

.theme-color-bar {
  width: 100%;
  height: 100%;
}

.theme-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.theme-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--xx-ink);
}

.theme-desc {
  font-size: 0.75rem;
  color: var(--xx-light-cyan);
}

.theme-check {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--xx-cyan);
  border-radius: 50%;
  color: white;
  font-size: 0.6875rem;
}

/* 设置按钮网格 */
.settings-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* 设置按钮 */
.settings-btn {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  width: 100%;
  padding: 0.875rem;
  border-radius: 0.5rem;
  border: 0.0625rem solid var(--xx-border);
  background: var(--xx-bg);
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: left;

  &:hover {
    border-color: var(--xx-cyan);
    transform: translateY(-0.125rem);
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.08);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
}

.settings-btn-icon {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  transition: all 0.25s ease;
}

.settings-btn-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.settings-btn-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--xx-ink);
}

.settings-btn-desc {
  font-size: 0.75rem;
  color: var(--xx-light-cyan);
}

.settings-btn-arrow {
  color: var(--xx-pale-cyan);
  font-size: 0.75rem;
  transition: all 0.25s ease;

  .settings-btn:hover & {
    color: var(--xx-cyan);
    transform: translateX(0.125rem);
  }
}

/* 主要按钮样式 */
.settings-btn-primary {
  .settings-btn-icon {
    background: linear-gradient(135deg, rgba(74, 111, 165, 0.15), rgba(74, 111, 165, 0.08));
    color: var(--xx-cyan);
  }

  &:hover .settings-btn-icon {
    background: linear-gradient(135deg, var(--xx-cyan), #3a5f95);
    color: white;
    transform: scale(1.05);
  }
}

/* 次要按钮样式 */
.settings-btn-secondary {
  .settings-btn-icon {
    background: linear-gradient(135deg, rgba(74, 85, 104, 0.1), rgba(74, 85, 104, 0.05));
    color: var(--xx-cyan);
  }

  &:hover .settings-btn-icon {
    background: linear-gradient(135deg, rgba(74, 111, 165, 0.2), rgba(74, 111, 165, 0.1));
    color: var(--xx-cyan);
    transform: scale(1.05);
  }
}

/* 响应式适配 */
@media (max-width: 375px) {
  .theme-grid {
    grid-template-columns: 1fr;
  }

  .settings-btn {
    padding: 0.75rem;
    gap: 0.75rem;
  }

  .settings-btn-icon {
    width: 2.25rem;
    height: 2.25rem;
    font-size: 1rem;
  }

  .settings-btn-title {
    font-size: 0.875rem;
  }

  .settings-btn-desc {
    font-size: 0.6875rem;
  }
}
</style>
