<template>
  <div class="xx-page">
    <!-- 页面头部 -->
    <div class="edit-header">
      <div class="edit-header-content">
        <button class="edit-back-btn" @click="goBack">
          <i class="fa-solid fa-arrow-left"></i>
          <span>返回设置</span>
        </button>
        <div class="edit-title-section">
          <h1 class="edit-title">变量编辑</h1>
          <p class="edit-subtitle">修改变量值（需要手动应用变更）</p>
        </div>
      </div>
    </div>

    <!-- 待应用变更提示 -->
    <div class="edit-changes-card" v-if="pendingChanges.length > 0">
      <div class="edit-changes-header">
        <div class="edit-changes-icon">
          <i class="fa-solid fa-pencil"></i>
        </div>
        <div class="edit-changes-info">
          <span class="edit-changes-count">{{ pendingChanges.length }} 项待应用变更</span>
          <span class="edit-changes-desc">点击应用按钮保存所有修改</span>
        </div>
        <div class="edit-changes-actions">
          <button class="edit-btn edit-btn-cancel" @click="cancelAllChanges">
            <i class="fa-solid fa-xmark"></i>
            <span>取消</span>
          </button>
          <button class="edit-btn edit-btn-apply" @click="applyChanges">
            <i class="fa-solid fa-check"></i>
            <span>应用</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 变量树 -->
    <div class="edit-tree-container">
      <div class="edit-category" v-for="(data, key) in statData" :key="key">
        <div 
          class="edit-category-header" 
          @click="toggleCategory(key)"
          :class="{ 'edit-category-expanded': isExpanded(key) }"
        >
          <div class="edit-category-icon">
            <i :class="isExpanded(key) ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right'"></i>
          </div>
          <div class="edit-category-info">
            <span class="edit-category-name">{{ key }}</span>
            <span class="edit-category-count">{{ getCount(data) }}</span>
          </div>
        </div>
        <div v-if="isExpanded(key) && data" class="edit-category-content">
          <div v-for="(value, subKey) in data" :key="`${key}.${subKey}`" class="edit-item-wrapper">
            <VarRow
              :path="`${key}.${subKey}`"
              :value="value"
              :sub-key="subKey"
              :pending-changes="pendingChanges"
              @update="handleUpdate"
              @toggle-expand="() => {}"
              @cancel-change="handleCancelChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, type Ref } from 'vue';
import type { Router } from 'vue-router';
import VarRow from '../components/VarRow.vue';

interface PendingChange {
  path: string;
  value: unknown;
}

interface StatData {
  主角?: Record<string, unknown>;
  后宫?: Record<string, unknown>;
  攻略目标?: Record<string, unknown>;
}

const router = inject<Router>('router');
const statDataRef = inject<Ref<StatData>>('statData');
const statData = computed(() => statDataRef?.value || {});

const pendingChanges = ref<PendingChange[]>([]);
const expandedCategories = ref<Set<string>>(new Set(['主角', '后宫', '攻略目标']));

function goBack() {
  router?.push('/settings');
}

function toggleCategory(key: string) {
  if (expandedCategories.value.has(key)) {
    expandedCategories.value.delete(key);
  } else {
    expandedCategories.value.add(key);
  }
}

function isExpanded(key: string) {
  return expandedCategories.value.has(key);
}

function getCount(data: Record<string, unknown> | undefined): number {
  return data ? Object.keys(data).length : 0;
}

function handleUpdate(path: string, value: unknown) {
  const existingIndex = pendingChanges.value.findIndex(c => c.path === path);
  if (existingIndex >= 0) {
    pendingChanges.value[existingIndex].value = value;
  } else {
    pendingChanges.value.push({ path, value });
  }
}

function handleCancelChange(path: string) {
  const index = pendingChanges.value.findIndex(c => c.path === path);
  if (index >= 0) {
    pendingChanges.value.splice(index, 1);
  }
}

function cancelAllChanges() {
  pendingChanges.value = [];
}

function applyChanges() {
  if (pendingChanges.value.length === 0) return;

  const allVars = getAllVariables();
  for (const change of pendingChanges.value) {
    _.set(allVars, `stat_data.${change.path}`, change.value);
  }
  replaceVariables(allVars, { type: 'chat' });

  toastr.success(`已应用 ${pendingChanges.value.length} 个变更`, '成功');
  pendingChanges.value = [];
}
</script>

<style lang="scss" scoped>
/* 页面头部 */
.edit-header {
  background: linear-gradient(135deg, rgba(74, 111, 165, 0.08) 0%, rgba(212, 175, 55, 0.05) 100%);
  border-bottom: 0.0625rem solid rgba(74, 85, 104, 0.1);
  padding: 1rem;
}

.edit-header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* 返回按钮 */
.edit-back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 0.0625rem solid rgba(74, 85, 104, 0.2);
  background: rgba(255, 255, 255, 0.8);
  color: #4A6FA5;
  backdrop-filter: blur(0.5rem);

  i {
    font-size: 0.875rem;
  }

  &:hover {
    background: rgba(74, 111, 165, 0.1);
    border-color: #4A6FA5;
    transform: translateX(-0.125rem);
    box-shadow: 0 0.25rem 0.75rem rgba(74, 111, 165, 0.15);
  }

  &:active {
    transform: translateX(-0.125rem) scale(0.98);
  }
}

/* 标题区域 */
.edit-title-section {
  flex: 1;
}

.edit-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #2C2C2C;
  letter-spacing: 0.0625rem;
}

.edit-subtitle {
  margin: 0.25rem 0 0 0;
  font-size: 0.8125rem;
  color: #718096;
}

/* 待应用变更卡片 */
.edit-changes-card {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(74, 111, 165, 0.05) 100%);
  border-radius: 0.5rem;
  padding: 1rem;
  border: 0.0625rem solid rgba(212, 175, 55, 0.2);
  margin-bottom: 1rem;
  box-shadow: 0 0.125rem 0.5rem rgba(212, 175, 55, 0.1);
}

.edit-changes-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.edit-changes-icon {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #D4AF37, #B8962E);
  border-radius: 0.75rem;
  color: white;
  font-size: 1.25rem;
  box-shadow: 0 0.25rem 0.75rem rgba(212, 175, 55, 0.3);
}

.edit-changes-info {
  flex: 1;
}

.edit-changes-count {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  color: #2C2C2C;
}

.edit-changes-desc {
  display: block;
  font-size: 0.75rem;
  color: #718096;
  margin-top: 0.125rem;
}

.edit-changes-actions {
  display: flex;
  gap: 0.5rem;
}

/* 操作按钮 */
.edit-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  &:active {
    transform: scale(0.96);
  }
}

.edit-btn-cancel {
  background: rgba(239, 68, 68, 0.1);
  color: #DC2626;

  &:hover {
    background: rgba(239, 68, 68, 0.15);
  }
}

.edit-btn-apply {
  background: linear-gradient(135deg, #059669, #047857);
  color: white;
  box-shadow: 0 0.125rem 0.5rem rgba(5, 150, 105, 0.3);

  &:hover {
    background: linear-gradient(135deg, #047857, #065f46);
    box-shadow: 0 0.25rem 0.75rem rgba(5, 150, 105, 0.4);
  }
}

/* 变量树容器 */
.edit-tree-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* 分类卡片 */
.edit-category {
  background: #FAFAF7;
  border-radius: 0.5rem;
  border: 0.0625rem solid rgba(74, 85, 104, 0.1);
  overflow: hidden;
  box-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.03);
}

.edit-category-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  background: linear-gradient(135deg, rgba(74, 111, 165, 0.06) 0%, transparent 100%);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, rgba(74, 111, 165, 0.1) 0%, transparent 100%);
  }
}

.edit-category-expanded {
  background: linear-gradient(135deg, rgba(74, 111, 165, 0.12) 0%, transparent 100%);
}

.edit-category-icon {
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(74, 111, 165, 0.1);
  border-radius: 0.375rem;
  color: #4A6FA5;
  font-size: 0.75rem;
  transition: transform 0.2s ease;

  .edit-category-expanded & {
    transform: rotate(180deg);
  }
}

.edit-category-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.edit-category-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #2C2C2C;
}

.edit-category-count {
  padding: 0.1875rem 0.625rem;
  background: rgba(74, 111, 165, 0.1);
  border-radius: 1rem;
  font-size: 0.75rem;
  color: #4A6FA5;
  font-weight: 500;
}

.edit-category-content {
  padding: 0.25rem 0;
  border-top: 0.0625rem solid rgba(74, 85, 104, 0.08);
}

.edit-item-wrapper {
  border-bottom: 0.0625rem solid rgba(74, 85, 104, 0.06);

  &:last-child {
    border-bottom: none;
  }
}
</style>