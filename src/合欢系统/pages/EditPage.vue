<template>
  <div>
    <div class="hh-page-header">
      <BackButton />
      <div class="hh-page-title">变量编辑APP</div>
    </div>
    <div class="hh-content">
      <div class="edit-actions">
        <button class="edit-btn save" @click="saveChanges" :disabled="pendingChanges.length === 0">
          <i class="fa-solid fa-save"></i> 保存 ({{ pendingChanges.length }})
        </button>
        <button class="edit-btn reset" @click="resetChanges" :disabled="pendingChanges.length === 0">
          <i class="fa-solid fa-undo"></i> 重置
        </button>
      </div>

      <div v-if="hasData" class="var-tree">
        <div class="var-category" v-for="(data, key) in statData" :key="key">
          <div class="var-category-header" @click="toggleCategory(key)">
            <i :class="isExpanded(key) ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right'"></i>
            <span class="var-category-name">{{ key }}</span>
            <span class="var-category-count">{{ data ? Object.keys(data).length : 0 }}</span>
          </div>
          <div v-if="isExpanded(key) && data" class="var-category-content">
            <div v-for="(value, subKey) in data" :key="subKey">
              <VarRow
                :path="`${key}.${String(subKey)}`"
                :value="value"
                :subKey="String(subKey)"
                :pendingChanges="pendingChanges"
                @update="handleUpdate"
                @toggle-expand="toggleExpand"
                @cancel-change="cancelSingleChange"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="hh-empty">加载中...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, computed } from 'vue';
import BackButton from '../components/BackButton.vue';
import VarRow from '../components/VarRow.vue';

interface StatData {
  世界?: Record<string, unknown>;
  用户?: Record<string, unknown>;
  系统?: Record<string, unknown>;
  目标?: Record<string, unknown>;
  后代?: Record<string, unknown>;
  背包?: Record<string, unknown>;
  宗门?: Record<string, unknown>;
  商城?: Record<string, unknown>;
}

const injectedStatData = inject<{ value: StatData }>('statData');
const statData = computed((): StatData => injectedStatData?.value || {});

const hasData = computed(() => statData.value && Object.keys(statData.value).length > 0);

const pendingChanges = ref<Array<{ path: string; value: unknown }>>([]);
const expandedCategories = ref<Set<string>>(new Set(['世界', '用户', '系统']));

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

function handleUpdate(path: string, value: unknown) {
  const existing = pendingChanges.value.findIndex(c => c.path === path);
  if (existing >= 0) {
    pendingChanges.value[existing].value = value;
  } else {
    pendingChanges.value.push({ path, value });
  }
}

function cancelSingleChange(path: string) {
  pendingChanges.value = pendingChanges.value.filter(c => c.path !== path);
}

function toggleExpand(path: string) {
  // VarRow handles its own expand state
}

async function saveChanges() {
  if (pendingChanges.value.length === 0) return;

  const currentStatData = _.cloneDeep(injectedStatData?.value || {});
  for (const change of pendingChanges.value) {
    _.set(currentStatData, change.path.replace('.', '.'), change.value);
  }

  await insertOrAssignVariables({ stat_data: currentStatData }, { type: 'message', message_id: 'latest' });
  pendingChanges.value = [];
}

function resetChanges() {
  pendingChanges.value = [];
}
</script>

<style lang="scss" scoped>
.edit-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.edit-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 16px;
  border: 0;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.save {
    background: linear-gradient(135deg, #ff5fae, #db2777);
    color: white;

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #ff77b7, #ec4899);
    }
  }

  &.reset {
    background: rgba(236, 72, 153, 0.15);
    color: #be185d;
    border: 1px solid rgba(236, 72, 153, 0.3);

    &:hover:not(:disabled) {
      background: rgba(236, 72, 153, 0.25);
    }
  }
}

.var-tree {
  font-size: 12px;
}

.var-category {
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  overflow: hidden;
}

.var-category-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: linear-gradient(135deg, rgba(244, 114, 182, 0.2), rgba(236, 72, 153, 0.15));
  cursor: pointer;
  font-weight: 800;
  color: #831843;
  transition: background 0.2s;

  &:hover {
    background: linear-gradient(135deg, rgba(244, 114, 182, 0.35), rgba(236, 72, 153, 0.25));
  }

  i {
    font-size: 10px;
    width: 12px;
  }
}

.var-category-name {
  flex: 1;
}

.var-category-count {
  background: rgba(236, 72, 153, 0.3);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 10px;
}

.var-category-content {
  padding: 8px;
}
</style>
