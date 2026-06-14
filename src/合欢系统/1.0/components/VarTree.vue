<template>
  <div class="var-tree">
    <div class="var-category" v-for="(data, key) in statData" :key="key">
      <div class="var-category-header" @click="toggleCategory(key)">
        <i :class="isExpanded(key) ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right'"></i>
        <span class="var-category-name">{{ key }}</span>
        <span class="var-category-count">{{ getCount(data) }}</span>
      </div>
      <div v-if="isExpanded(key) && data" class="var-category-content">
        <div v-for="(value, subKey) in data" :key="subKey" class="var-row">
          <div class="var-key" @click="startEdit(key, subKey, value)">{{ subKey }}</div>
          <div class="var-value">
            <template v-if="isEditing(key, subKey)">
              <input
                v-if="isSimpleValue(value)"
                class="var-input"
                v-model="editValue"
                @keyup.enter="saveEdit(key, subKey)"
                @keyup.escape="cancelEdit"
                ref="editInput"
                autofocus
              />
              <span v-else class="var-complex">{{ formatValue(value) }}</span>
            </template>
            <template v-else>
              <span :class="{ 'var-modified': isModified(key, subKey) }">
                {{ isModified(key, subKey) ? getModifiedValue(key, subKey) : formatValue(value) }}
              </span>
              <button v-if="isNumber(value)" class="var-num-btn" @click.stop="adjustValue(key, subKey, getCurrentValue(value, key, subKey), -1)">-</button>
              <button v-if="isNumber(value)" class="var-num-btn" @click.stop="adjustValue(key, subKey, getCurrentValue(value, key, subKey), 1)">+</button>
            </template>
            <span v-if="isModified(key, subKey)" class="var-modified-tag" @click.stop="cancelSingleChange(key, subKey)">
              <i class="fa-solid fa-times"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';

interface Change {
  path: string;
  value: unknown;
}

interface Props {
  statData: Record<string, Record<string, unknown>>;
  pendingChanges: Change[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update', path: string, value: unknown): void;
  (e: 'remove', path: string): void;
}>();

const expandedCategories = ref<Set<string>>(new Set(['世界', '用户', '系统']));
const editingPath = ref<string | null>(null);
const editValue = ref<string>('');
const editInput = ref<HTMLInputElement | null>(null);

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

function isSimpleValue(value: unknown): boolean {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
}

function isNumber(value: unknown): boolean {
  return typeof value === 'number';
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'object') {
    if (Array.isArray(value)) return `[${value.length}]`;
    const keys = Object.keys(value as object);
    if (keys.length === 0) return '{}';
    return `{${keys.length}}`;
  }
  return String(value);
}

function isModified(category: string, key: string): boolean {
  const path = `${category}.${key}`;
  return props.pendingChanges.some(c => c.path === path);
}

function getModifiedValue(category: string, key: string): string {
  const path = `${category}.${key}`;
  const change = props.pendingChanges.find(c => c.path === path);
  return change ? formatValue(change.value) : '';
}

function getCurrentValue(originalValue: unknown, category: string, key: string): number {
  const path = `${category}.${key}`;
  const change = props.pendingChanges.find(c => c.path === path);
  return change ? Number(change.value) : Number(originalValue);
}

function startEdit(category: string, key: string, value: unknown) {
  editingPath.value = `${category}.${key}`;
  const currentVal = getCurrentValue(value, category, key);
  editValue.value = String(currentVal);
  nextTick(() => {
    if (editInput.value) {
      (editInput.value as HTMLInputElement).focus();
    }
  });
}

function isEditing(category: string, key: string): boolean {
  return editingPath.value === `${category}.${key}`;
}

function saveEdit(category: string, key: string) {
  const path = `${category}.${key}`;
  let newValue: unknown = editValue.value;

  const original = _.get(props.statData, `${category}.${key}`);
  if (typeof original === 'number') {
    newValue = Number(editValue.value) || 0;
  }

  emit('update', path, newValue);
  editingPath.value = null;
}

function cancelEdit() {
  editingPath.value = null;
}

function adjustValue(category: string, key: string, current: number, delta: number) {
  const path = `${category}.${key}`;
  emit('update', path, Math.max(0, current + delta));
}

function cancelSingleChange(category: string, key: string) {
  const path = `${category}.${key}`;
  emit('remove', path);
}
</script>

<style lang="scss" scoped>
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

.var-row {
  display: flex;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 8px;
  align-items: center;

  &:hover {
    background: rgba(244, 114, 182, 0.1);
  }
}

.var-key {
  min-width: 80px;
  color: #be185d;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    color: #9d174d;
  }
}

.var-value {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #5b173c;
  cursor: pointer;

  &:hover {
    color: #831843;
  }
}

.var-modified {
  color: #059669;
  font-weight: 700;
  background: rgba(5, 150, 105, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
}

.var-modified-tag {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(239, 68, 68, 0.2);
  color: #dc2626;
  border-radius: 50%;
  font-size: 10px;
  cursor: pointer;

  &:hover {
    background: rgba(239, 68, 68, 0.4);
  }
}

.var-complex {
  color: #9f647f;
  font-style: italic;
}

.var-input {
  flex: 1;
  border: 1px solid rgba(236, 72, 153, 0.4);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 12px;
  color: #831843;
  outline: none;

  &:focus {
    border-color: #ec4899;
    box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.2);
  }
}

.var-num-btn {
  width: 24px;
  height: 24px;
  border: 0;
  border-radius: 6px;
  background: linear-gradient(135deg, #f472b6, #ec4899);
  color: white;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: linear-gradient(135deg, #ec4899, #db2777);
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>
