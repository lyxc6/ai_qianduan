<template>
  <div class="var-row-wrapper">
    <div class="var-row" :class="{ 'var-row-complex': isComplex }">
      <div class="var-key" @click="handleKeyClick">
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
          <button v-if="isNumber(displayValue)" class="var-num-btn" @click.stop="adjustValue(-1)">-</button>
          <button v-if="isNumber(displayValue)" class="var-num-btn" @click.stop="adjustValue(1)">+</button>
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
        <span v-if="isPathModified" class="var-modified-tag" @click.stop="cancelChange">
          <i class="fa-solid fa-times"></i>
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
                class="var-input"
                :value="String(item)"
                @change="(e) => updateArrayItem(idx, (e.target as HTMLInputElement).value)"
              />
            </template>
            <template v-else>
              <span class="var-complex" @click.stop="toggleArrayItemExpand(idx)">
                {{ formatValue(item) }}
                <i :class="isArrayItemExpanded(idx) ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right'"></i>
              </span>
            </template>
            <button class="var-remove-btn" @click="removeArrayItem(idx)" title="删除元素">
              <i class="fa-solid fa-times"></i>
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
                @cancel-change="(p) => emit('cancel-change', p)"
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
            @toggle-expand="(p) => emit('toggle-expand', p)"
            @cancel-change="(p) => emit('cancel-change', p)"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineOptions } from 'vue';

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
    if (Array.isArray(v)) return `[${v.length}]`;
    const keys = Object.keys(v as object);
    if (keys.length === 0) return '{}';
    return `{${keys.length}}`;
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

watch(() => props.path, () => {
  isEditing.value = false;
});
</script>

<style lang="scss" scoped>
.var-row-wrapper {
  width: 100%;
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

  &.var-row-complex {
    background: rgba(244, 114, 182, 0.05);
  }
}

.var-key {
  min-width: 80px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #be185d;
  font-weight: 700;
  cursor: pointer;

  i {
    font-size: 8px;
    width: 12px;
    color: #9f647f;
  }

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
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  i {
    font-size: 8px;
    color: #831843;
  }
}

.var-input {
  flex: 1;
  min-width: 60px;
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

.var-add-btn, .var-remove-btn {
  width: 20px;
  height: 20px;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}

.var-add-btn {
  background: rgba(16, 185, 129, 0.2);
  color: #059669;

  &:hover {
    background: rgba(16, 185, 129, 0.4);
  }
}

.var-remove-btn {
  background: rgba(239, 68, 68, 0.2);
  color: #dc2626;

  &:hover {
    background: rgba(239, 68, 68, 0.4);
  }
}

.var-children {
  margin-left: 20px;
  padding-left: 12px;
  border-left: 2px solid rgba(236, 72, 153, 0.2);
}

.var-array-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px 8px;
  margin: 4px 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 6px;

  .var-input {
    flex: 1;
  }
}

.var-array-item-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.var-array-index {
  min-width: 20px;
  font-size: 10px;
  color: #9f647f;
  font-weight: 600;
}

.var-array-item-children {
  margin-left: 24px;
  padding-left: 12px;
  border-left: 2px solid rgba(236, 72, 153, 0.2);
}

.var-child-row {
  margin: 4px 0;
}
</style>
