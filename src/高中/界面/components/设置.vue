<template>
  <div class="settings-container">
    <div class="settings-section">
      <div class="section-title">界面设置</div>
      <div class="setting-item">
        <div class="setting-label">深色模式</div>
        <div class="theme-toggle" :class="{ active: isDarkTheme }" @click="emit('toggleTheme')">
          <span class="theme-icon">{{ isDarkTheme ? '🌙' : '☀️' }}</span>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-label">自动刷新</div>
        <div class="setting-toggle" :class="{ active: autoRefresh }" @click="autoRefresh = !autoRefresh">
          <div class="toggle-handle"></div>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-label">显示时间</div>
        <div class="setting-toggle" :class="{ active: showTime }" @click="showTime = !showTime">
          <div class="toggle-handle"></div>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-label">动画效果</div>
        <div class="setting-toggle" :class="{ active: animations }" @click="animations = !animations">
          <div class="toggle-handle"></div>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <div class="section-title">提醒设置</div>
      <div class="setting-item">
        <div class="setting-label">事件提醒</div>
        <div class="setting-toggle" :class="{ active: eventNotify }" @click="eventNotify = !eventNotify">
          <div class="toggle-handle"></div>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-label">地点变化</div>
        <div class="setting-toggle" :class="{ active: locationNotify }" @click="locationNotify = !locationNotify">
          <div class="toggle-handle"></div>
        </div>
      </div>
    </div>

    <div class="settings-section">
      <div class="section-title">关于</div>
      <div class="about-info">
        <div class="about-title">高中状态栏</div>
        <div class="about-version">版本 1.0.0</div>
        <div class="about-desc">高中世界角色扮演辅助界面</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  isDarkTheme?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  toggleTheme: [];
}>();

const autoRefresh = ref(true);
const showTime = ref(true);
const animations = ref(true);
const eventNotify = ref(true);
const locationNotify = ref(true);
</script>

<style lang="scss">
.settings-container {
  height: 100%;
  overflow-y: auto;
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.settings-section {
  background: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.6rem;
}

.section-title {
  font-family: var(--font-title);
  font-size: 0.85rem;
  color: var(--user-color-primary);
  margin-bottom: 0.5rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid rgba(255, 183, 178, 0.2);
  letter-spacing: 1px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  border-bottom: 1px solid rgba(255, 183, 178, 0.1);

  &:last-child {
    border-bottom: none;
  }
}

.setting-label {
  font-family: var(--font-serif);
  font-size: 0.75rem;
  color: var(--text-primary);
}

.setting-toggle {
  width: 2.2rem;
  height: 1.2rem;
  background: rgba(255, 183, 178, 0.3);
  border-radius: 0.6rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &.active {
    background: var(--user-color-primary);

    .toggle-handle {
      transform: translateX(1rem);
    }
  }
}

.toggle-handle {
  width: 1rem;
  height: 1rem;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 0.1rem;
  left: 0.1rem;
  transition: transform 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
}

.theme-toggle {
  width: 3rem;
  height: 1.6rem;
  background: rgba(255, 183, 178, 0.3);
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &.active {
    background: var(--user-color-primary);
  }
}

.theme-icon {
  font-size: 0.9rem;
}

.about-info {
  text-align: center;
  padding: 0.5rem;
}

.about-title {
  font-family: var(--font-title);
  font-size: 0.9rem;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.about-version {
  font-family: var(--font-serif);
  font-size: 0.7rem;
  color: var(--user-color-primary);
  margin-bottom: 0.35rem;
}

.about-desc {
  font-family: var(--font-serif);
  font-size: 0.65rem;
  color: var(--text-secondary);
}
</style>
