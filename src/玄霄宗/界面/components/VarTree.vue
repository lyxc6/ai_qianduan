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

const expandedCategories = ref<Set<string>>(new Set(['主角', '后宫', '攻略目标']));
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
  font-size: 13px;
}

.var-category {
  margin-bottom: 12px;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(74, 111, 165, 0.08);
  border: 1px solid rgba(184, 134, 11, 0.15);
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #4A6FA5, #D4AF37, #4A6FA5);
  }
}

.var-category-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: linear-gradient(135deg, rgba(74, 111, 165, 0.12), rgba(212, 175, 55, 0.08));
  cursor: pointer;
  font-weight: 700;
  color: #4A6FA5;
  transition: all 0.2s;

  &:hover {
    background: linear-gradient(135deg, rgba(74, 111, 165, 0.18), rgba(212, 175, 55, 0.12));
  }

  i {
    font-size: 11px;
    width: 14px;
    color: #475569;
  }
}

.var-category-name {
  flex: 1;
  font-size: 14px;
}

.var-category-count {
  background: rgba(74, 111, 165, 0.2);
  color: #4A6FA5;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.var-category-content {
  padding: 10px;
}

.var-row {
  display: flex;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  align-items: center;
  transition: background 0.2s;

  &:hover {
    background: rgba(74, 111, 165, 0.06);
  }
}

.var-key {
  min-width: 100px;
  color: #4A6FA5;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    color: #3A5F95;
  }
}

.var-value {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #2C2C2C;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    color: #1f2937;
  }
}

.var-modified {
  color: #059669;
  font-weight: 600;
  background: rgba(5, 150, 105, 0.1);
  padding: 3px 8px;
  border-radius: 6px;
}

.var-modified-tag {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(239, 68, 68, 0.15);
  color: #dc2626;
  border-radius: 50%;
  font-size: 11px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(239, 68, 68, 0.25);
  }
}

.var-complex {
  color: #666;
  font-style: italic;
}

.var-input {
  flex: 1;
  border: 1px solid rgba(74, 111, 165, 0.3);
  background: white;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 13px;
  color: #2C2C2C;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #4A6FA5;
    box-shadow: 0 0 0 3px rgba(74, 111, 165, 0.15);
  }
}

.var-num-btn {
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 6px;
  background: linear-gradient(135deg, #4A6FA5, #3A5F95);
  color: white;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 2px 10px rgba(74, 111, 165, 0.15);

  &:hover {
    background: linear-gradient(135deg, #3A5F95, #2A4F85);
    box-shadow: 0 4px 12px rgba(74, 111, 165, 0.25);
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>
