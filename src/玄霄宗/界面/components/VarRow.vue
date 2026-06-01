<template>
  <div class="var-row-wrapper">
    <div class="var-row" :class="{ 'var-row-complex': isComplex, 'var-row-hovered': isHovered }">
      <div class="var-key" @click="handleKeyClick" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
        <i v-if="isComplex" :class="isExpanded ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right'"></i>
        <span>{{ subKey }}</span>
      </div>
      <div class="var-value">
        <template v-if="isSimpleValue(displayValue) && isEditing">
          <input
            class="var-input"
            v-model="editValue"
            @keyup.enter="saveEdit"
            @keyup.escape="cancelEdit"
            @blur="saveEdit"
            autofocus
          />
        </template>
        <template v-else-if="isSimpleValue(displayValue)">
          <span :class="{ 'var-modified': isPathModified }" @click="startEdit">
            {{ displayValue }}
          </span>
          <button v-if="isNumber(displayValue)" class="var-num-btn var-num-btn-minus" @click.stop="adjustValue(-1)">
            <i class="fa-solid fa-minus"></i>
          </button>
          <button v-if="isNumber(displayValue)" class="var-num-btn var-num-btn-plus" @click.stop="adjustValue(1)">
            <i class="fa-solid fa-plus"></i>
          </button>
        </template>
        <template v-else-if="isArrayValue">
          <span class="var-complex" @click.stop="toggleExpand">
            {{ formatValue(displayValue) }}
          </span>
          <button class="var-add-btn" @click.stop="addArrayItem" title="添加元素">
            <i class="fa-solid fa-plus"></i>
          </button>
        </template>
        <template v-else-if="isObjectProp">
          <span class="var-complex" @click.stop="toggleExpand">
            {{ formatValue(displayValue) }}
          </span>
        </template>
        <span v-if="isPathModified" class="var-modified-tag" @click.stop="cancelChange" title="取消修改">
          <i class="fa-solid fa-xmark"></i>
        </span>
      </div>
    </div>

    <div v-if="isExpanded && isComplex" class="var-children">
      <template v-if="isArrayValue">
        <div v-for="(item, idx) in displayArray" :key="idx" class="var-array-item">
          <div class="var-array-item-header">
            <span class="var-array-index">{{ idx }}</span>
            <template v-if="isSimpleValue(item)">
              <input
                class="var-input var-input-small"
                :value="String(item)"
                @change="e => updateArrayItem(idx, (e.target as HTMLInputElement).value)"
              />
            </template>
            <template v-else>
              <span class="var-complex" @click.stop="toggleArrayItemExpand(idx)">
                {{ formatValue(item) }}
                <i :class="isArrayItemExpanded(idx) ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right'"></i>
              </span>
            </template>
            <button class="var-remove-btn" @click="removeArrayItem(idx)" title="删除元素">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div v-if="isArrayItemExpanded(idx) && isObjectValue(item)" class="var-array-item-children">
            <div v-for="(childValue, childKey) in getArrayItemObject(item)" :key="childKey" class="var-child-row">
              <VarRow
                :path="`${path}[${idx}].${String(childKey)}`"
                :value="childValue"
                :subKey="String(childKey)"
                :pendingChanges="pendingChanges"
                @update="handleChildUpdate"
                @toggle-expand="toggleChildExpand"
                @cancel-change="p => emit('cancel-change', p)"
              />
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="isObjectValue">
        <div v-for="(childValue, childKey) in displayObject" :key="childKey" class="var-child-row">
          <VarRow
            :path="`${path}.${String(childKey)}`"
            :value="childValue"
            :subKey="String(childKey)"
            :pendingChanges="pendingChanges"
            @update="(p, v) => emit('update', p, v)"
            @toggle-expand="p => emit('toggle-expand', p)"
            @cancel-change="p => emit('cancel-change', p)"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineOptions, ref, watch } from 'vue';

defineOptions({ name: 'VarRow' });

interface PendingChange {
  path: string;
  value: unknown;
}

const props = defineProps<{
  path: string;
  value: unknown;
  subKey: string;
  pendingChanges: PendingChange[];
}>();

const emit = defineEmits<{
  (e: 'update', path: string, value: unknown): void;
  (e: 'toggle-expand', path: string): void;
  (e: 'cancel-change', path: string): void;
}>();

const isEditing = ref(false);
const editValue = ref('');
const isExpanded = ref(false);
const expandedArrayItems = ref<Set<number>>(new Set());
const isHovered = ref(false);

const isSimpleValue = (v: unknown): boolean => {
  return typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean';
};

const isNumber = (v: unknown): boolean => typeof v === 'number';

const isArrayValue = computed(() => Array.isArray(props.value));
const isObjectProp = computed(() => {
  return typeof props.value === 'object' && props.value !== null && !Array.isArray(props.value);
});

const isComplex = computed(() => isArrayValue.value || isObjectProp.value);

const modifiedChange = computed(() => {
  return props.pendingChanges.find(c => c.path === props.path);
});

const displayValue = computed(() => {
  if (modifiedChange.value) {
    return modifiedChange.value.value;
  }
  return props.value;
});

const displayArray = computed(() => {
  if (modifiedChange.value) {
    return modifiedChange.value.value as unknown[];
  }
  return props.value as unknown[];
});

const displayObject = computed(() => {
  if (modifiedChange.value) {
    return modifiedChange.value.value as Record<string, unknown>;
  }
  return props.value as Record<string, unknown>;
});

const isPathModified = computed(() => !!modifiedChange.value);

const formatValue = (v: unknown): string => {
  if (v === null || v === undefined) return '—';
  if (typeof v === 'object') {
    if (Array.isArray(v)) return `数组 [${v.length}项]`;
    const keys = Object.keys(v as object);
    if (keys.length === 0) return '空对象';
    return `对象 {${keys.length}项}`;
  }
  return String(v);
};

const handleKeyClick = () => {
  if (isSimpleValue(props.value)) {
    startEdit();
  } else if (isComplex.value) {
    toggleExpand();
  }
};

const startEdit = () => {
  isEditing.value = true;
  editValue.value = String(displayValue.value);
};

const saveEdit = () => {
  if (!isEditing.value) return;
  let newValue: unknown = editValue.value;
  if (typeof props.value === 'number') {
    newValue = Number(editValue.value) || 0;
  }
  emit('update', props.path, newValue);
  isEditing.value = false;
};

const cancelEdit = () => {
  isEditing.value = false;
};

const adjustValue = (delta: number) => {
  const current = Number(displayValue.value) || 0;
  emit('update', props.path, Math.max(0, current + delta));
};

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
  if (isExpanded.value) {
    emit('toggle-expand', props.path);
  }
};

const cancelChange = () => {
  emit('cancel-change', props.path);
};

const addArrayItem = () => {
  const arr = [...displayArray.value, ''];
  emit('update', props.path, arr);
};

const removeArrayItem = (index: number) => {
  const arr = [...displayArray.value];
  arr.splice(index, 1);
  emit('update', props.path, arr);
};

const updateArrayItem = (index: number, value: string) => {
  const arr = [...displayArray.value];
  const originalType = typeof displayArray.value[index];
  if (originalType === 'number') {
    arr[index] = Number(value) || 0;
  } else {
    arr[index] = value;
  }
  emit('update', props.path, arr);
};

const isArrayItemExpanded = (index: number) => {
  return expandedArrayItems.value.has(index);
};

const toggleArrayItemExpand = (index: number) => {
  if (expandedArrayItems.value.has(index)) {
    expandedArrayItems.value.delete(index);
  } else {
    expandedArrayItems.value.add(index);
  }
};

const isObjectValue = (v: unknown): boolean => {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
};

const getArrayItemObject = (item: unknown): Record<string, unknown> => {
  return item as Record<string, unknown>;
};

const handleChildUpdate = (path: string, value: unknown) => {
  emit('update', path, value);
};

const toggleChildExpand = (path: string) => {
  emit('toggle-expand', path);
};

watch(
  () => props.path,
  () => {
    isEditing.value = false;
  },
);
</script>

<style lang="scss" scoped>
.var-row-wrapper {
  width: 100%;
}

/* 行项目 */
.var-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0.625rem 0.875rem;
  border-radius: 0.375rem;
  align-items: center;
  transition: all 0.25s ease;
  background: transparent;

  &:hover {
    background: rgba(74, 111, 165, 0.06);
  }

  &.var-row-complex {
    background: rgba(74, 111, 165, 0.04);
    border-left: 0.1875rem solid rgba(74, 111, 165, 0.2);
  }

  &.var-row-hovered {
    background: rgba(74, 111, 165, 0.08);
  }
}

/* 键名 */
.var-key {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a6fa5;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.375rem 0;

  i {
    font-size: 0.6875rem;
    width: 1rem;
    color: #666;
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    color: #3a5f95;

    i {
      color: #4a6fa5;
    }
  }
}

/* 值区域 */
.var-value {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2c2c2c;
  font-size: 0.875rem;
  padding: 0.375rem 0;
  min-width: 0;

  span {
    cursor: pointer;
    transition: color 0.2s ease;
    word-break: break-word;

    &:hover {
      color: #4a6fa5;
    }
  }
}

/* 修改状态标识 */
.var-modified {
  color: #059669;
  font-weight: 600;
  background: rgba(5, 150, 105, 0.08);
  padding: 0.25rem 0.625rem;
  border-radius: 0.375rem;
  border: 0.0625rem solid rgba(5, 150, 105, 0.2);

  &:hover {
    background: rgba(5, 150, 105, 0.12);
  }
}

/* 修改标签 */
.var-modified-tag {
  width: 1.375rem;
  height: 1.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(239, 68, 68, 0.12);
  color: #dc2626;
  border-radius: 50%;
  font-size: 0.625rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 0.0625rem solid rgba(239, 68, 68, 0.2);

  &:hover {
    background: rgba(239, 68, 68, 0.2);
    transform: scale(1.1);
  }
}

/* 复杂类型显示 */
.var-complex {
  color: #6b7280;
  font-style: italic;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;

  &:hover {
    color: #4a5568;
    background: rgba(74, 85, 104, 0.08);
  }

  i {
    font-size: 0.625rem;
    color: #6b7280;
    transition: transform 0.2s ease;
  }
}

/* 输入框 */
.var-input {
  flex: 1 1 auto;
  min-width: 0;
  border: 0.0625rem solid rgba(74, 111, 165, 0.3);
  background: white;
  border-radius: 0.375rem;
  padding: 0.4375rem 0.625rem;
  font-size: 0.875rem;
  color: #2c2c2c;
  outline: none;
  transition: all 0.25s ease;
  box-shadow: inset 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.03);

  &:focus {
    border-color: #4a6fa5;
    box-shadow:
      0 0 0 0.1875rem rgba(74, 111, 165, 0.15),
      inset 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.03);
  }

  &.var-input-small {
    flex: 0 1 6rem;
    min-width: 4rem;
  }
}

/* 数字加减按钮 */
.var-num-btn {
  width: 1.625rem;
  height: 1.625rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  font-size: 0.6875rem;

  &:active {
    transform: scale(0.92);
  }
}

.var-num-btn-minus {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
  color: #dc2626;
  border: 0.0625rem solid rgba(239, 68, 68, 0.2);

  &:hover {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.1));
    box-shadow: 0 0.125rem 0.375rem rgba(239, 68, 68, 0.15);
  }
}

.var-num-btn-plus {
  background: linear-gradient(135deg, rgba(5, 150, 105, 0.1), rgba(5, 150, 105, 0.05));
  color: #059669;
  border: 0.0625rem solid rgba(5, 150, 105, 0.2);

  &:hover {
    background: linear-gradient(135deg, rgba(5, 150, 105, 0.15), rgba(5, 150, 105, 0.1));
    box-shadow: 0 0.125rem 0.375rem rgba(5, 150, 105, 0.15);
  }
}

/* 添加/删除按钮 */
.var-add-btn,
.var-remove-btn {
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
  transition: all 0.25s ease;
}

.var-add-btn {
  background: rgba(5, 150, 105, 0.12);
  color: #059669;
  border: 0.0625rem solid rgba(5, 150, 105, 0.2);

  &:hover {
    background: rgba(5, 150, 105, 0.18);
    transform: scale(1.1);
  }
}

.var-remove-btn {
  background: rgba(239, 68, 68, 0.12);
  color: #dc2626;
  border: 0.0625rem solid rgba(239, 68, 68, 0.2);

  &:hover {
    background: rgba(239, 68, 68, 0.18);
    transform: scale(1.1);
  }
}

/* 子项列表 */
.var-children {
  margin-left: 1.75rem;
  padding-left: 0.875rem;
  border-left: 0.125rem solid rgba(74, 111, 165, 0.12);
}

/* 数组项 */
.var-array-item {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  margin: 0.375rem 0;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 0.375rem;
  border: 0.0625rem solid rgba(212, 175, 55, 0.15);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    border-color: rgba(212, 175, 55, 0.25);
  }

  .var-input {
    flex: 1;
  }
}

.var-array-item-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.var-array-index {
  min-width: 1.5rem;
  font-size: 0.6875rem;
  color: #6b7280;
  font-weight: 600;
  background: rgba(74, 111, 165, 0.08);
  padding: 0.2rem 0.4375rem;
  border-radius: 0.25rem;
  text-align: center;
}

.var-array-item-children {
  margin-left: 1.75rem;
  padding-left: 0.875rem;
  border-left: 0.125rem solid rgba(74, 111, 165, 0.12);
}

.var-child-row {
  margin: 0.375rem 0;
}
</style>
