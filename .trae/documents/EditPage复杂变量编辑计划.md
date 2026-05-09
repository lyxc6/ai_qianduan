# EditPage 复杂变量编辑功能增强计划

## 需求概述
在 EditPage 中添加复杂变量（嵌套对象、数组）的编辑支持：
- 在原分类下展开子项（手风琴效果）
- 支持多层递归展开
- 支持数组的增删元素操作

## 当前状态分析

### 现有功能
- 简单值（string、number、boolean）可直接编辑
- 复杂变量显示为 `{n}` 或 `[n]`，点击后无反应

### 现有模板逻辑（第 24-51 行）
```vue
<div v-if="isExpanded(key) && data" class="var-category-content">
  <div v-for="(value, subKey) in data" :key="subKey" class="var-row">
    <div class="var-key" @click="startEdit(key, subKey, value)">{{ subKey }}</div>
    <div class="var-value">
      <template v-if="isEditing(key, subKey)">
        <!-- 编辑输入框 -->
      </template>
      <template v-else>
        <span>{{ formatValue(value) }}</span>
        <!-- +- 按钮 -->
      </template>
    </div>
  </div>
</div>
```

### 现有 JavaScript 函数
- `isSimpleValue()` - 判断是否为简单值
- `formatValue()` - 格式化显示值
- `startEdit()` - 开始编辑
- `isEditing()` - 判断是否在编辑状态

## 修改方案

### 修改文件：`src/合欢系统/pages/EditPage.vue`

#### 1. 新增数据结构（用于追踪展开状态）

```typescript
const expandedPaths = ref<Set<string>>(new Set());
```

#### 2. 新增辅助函数

```typescript
function isObject(value: unknown): boolean {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isArray(value: unknown): boolean {
  return Array.isArray(value);
}

function isExpandedPath(path: string): boolean {
  return expandedPaths.value.has(path);
}

function toggleExpand(path: string) {
  if (expandedPaths.value.has(path)) {
    expandedPaths.value.delete(path);
  } else {
    expandedPaths.value.add(path);
  }
}

function getObjectEntries(value: object): Array<[string, unknown]> {
  return Object.entries(value);
}

function isPathModified(path: string): boolean {
  return pendingChanges.value.some(c => c.path === path);
}

function getPathModifiedValue(path: string): unknown {
  const change = pendingChanges.value.find(c => c.path === path);
  return change ? change.value : undefined;
}
```

#### 3. 新增数组操作函数

```typescript
function addArrayItem(category: string, key: string) {
  const path = `${category}.${key}`;
  const original = _.get(statData.value, path);
  const current = getPathModifiedValue(path) ?? original;
  if (Array.isArray(current)) {
    handleUpdate(path, [...current, '']);
  }
}

function removeArrayItem(category: string, key: string, index: number) {
  const path = `${category}.${key}`;
  const original = _.get(statData.value, path);
  const current = getPathModifiedValue(path) ?? original;
  if (Array.isArray(current)) {
    const newArr = [...current];
    newArr.splice(index, 1);
    handleUpdate(path, newArr);
  }
}

function updateArrayItem(category: string, key: string, index: number, value: unknown) {
  const path = `${category}.${key}`;
  const original = _.get(statData.value, path);
  const current = getPathModifiedValue(path) ?? original;
  if (Array.isArray(current)) {
    const newArr = [...current];
    newArr[index] = value;
    handleUpdate(path, newArr);
  }
}
```

#### 4. 修改模板结构

**替换原有 var-row 部分**，添加递归渲染逻辑：

```vue
<!-- 原有代码替换为： -->
<template v-for="(value, subKey) in data" :key="subKey">
  <VarRow
    :path="`${key}.${String(subKey)}`"
    :data="value"
    :category="key"
    :subKey="String(subKey)"
    :pendingChanges="pendingChanges"
    @update="handleUpdate"
    @toggle-expand="toggleExpand"
    @cancel-change="cancelSingleChange"
  />
</template>
```

**或者使用内联方式**（保持单文件，更清晰）：

修改 var-row 部分，添加复杂值的展开/编辑逻辑：

```vue
<!-- 替换整个 var-row div -->
<div class="var-row" :class="{ 'var-row-complex': isObject(value) || isArray(value) }">
  <div class="var-key" @click="handleKeyClick(key, subKey, value)">
    {{ subKey }}
    <i v-if="isObject(value) || isArray(value)"
       :class="isExpandedPath(`${key}.${subKey}`) ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right'">
    </i>
  </div>
  <div class="var-value">
    <!-- 简单值编辑 -->
    <template v-if="isSimpleValue(value) && isEditing(key, subKey)">
      <input class="var-input" v-model="editValue"
             @keyup.enter="saveEdit(key, subKey)"
             @keyup.escape="cancelEdit" autofocus />
    </template>

    <!-- 简单值显示 -->
    <template v-else-if="isSimpleValue(value)">
      <span :class="{ 'var-modified': isModified(key, subKey) }"
            @click="startEdit(key, subKey, value)">
        {{ isModified(key, subKey) ? getModifiedValue(key, subKey) : formatValue(value) }}
      </span>
      <button v-if="isNumber(value)" class="var-num-btn"
              @click.stop="adjustValue(key, subKey, getCurrentValue(value, key, subKey), -1)">-</button>
      <button v-if="isNumber(value)" class="var-num-btn"
              @click.stop="adjustValue(key, subKey, getCurrentValue(value, key, subKey), 1)">+</button>
    </template>

    <!-- 数组显示 -->
    <template v-else-if="isArray(value)">
      <span class="var-complex" @click.stop="toggleExpand(`${key}.${subKey}`)">
        {{ formatValue(value) }}
      </span>
      <button class="var-add-btn" @click.stop="addArrayItem(key, subKey)">
        <i class="fa-solid fa-plus"></i>
      </button>
    </template>

    <!-- 对象显示 -->
    <template v-else-if="isObject(value)">
      <span class="var-complex" @click.stop="toggleExpand(`${key}.${subKey}`)">
        {{ formatValue(value) }}
      </span>
    </template>

    <span v-if="isModified(key, subKey)" class="var-modified-tag"
          @click.stop="cancelSingleChange(key, subKey)">
      <i class="fa-solid fa-times"></i>
    </span>
  </div>
</div>

<!-- 展开的子内容 -->
<div v-if="isExpandedPath(`${key}.${subKey}`)" class="var-children">
  <!-- 数组子项 -->
  <template v-if="isArray(value)">
    <div v-for="(item, idx) in getDisplayArray(value, key, subKey)" :key="idx" class="var-array-item">
      <template v-if="isSimpleValue(item)">
        <input class="var-input" :value="item"
               @change="(e) => updateArrayItem(key, subKey, idx, (e.target as HTMLInputElement).value)" />
      </template>
      <template v-else>
        <span class="var-complex">{{ formatValue(item) }}</span>
      </template>
      <button class="var-remove-btn" @click="removeArrayItem(key, subKey, idx)">
        <i class="fa-solid fa-times"></i>
      </button>
    </div>
  </template>

  <!-- 对象子项（递归） -->
  <template v-else-if="isObject(value)">
    <div v-for="(childValue, childKey) in getDisplayObject(value, key, subKey)"
         :key="childKey" class="var-child-row">
      <VarRowInline
        :path="`${key}.${subKey}.${String(childKey)}`"
        :value="childValue"
        :subKey="String(childKey)"
        :pendingChanges="pendingChanges"
        @update="handleChildUpdate"
        @toggle-expand="toggleExpand"
        @cancel-change="cancelSingleChange"
      />
    </div>
  </template>
</div>
```

#### 5. 添加必要的辅助函数

```typescript
function getDisplayArray(value: unknown, category: string, key: string): unknown[] {
  const path = `${category}.${key}`;
  const modified = pendingChanges.value.find(c => c.path === path);
  return modified ? (modified.value as unknown[]) : (value as unknown[]);
}

function getDisplayObject(value: object, category: string, key: string): Record<string, unknown> {
  const path = `${category}.${key}`;
  const modified = pendingChanges.value.find(c => c.path === path);
  return modified ? (modified.value as Record<string, unknown>) : value;
}

function handleKeyClick(category: string, subKey: string, value: unknown) {
  if (isSimpleValue(value)) {
    startEdit(category, subKey, value);
  } else if (isObject(value) || isArray(value)) {
    toggleExpand(`${category}.${subKey}`);
  }
}

function handleChildUpdate(path: string, value: unknown) {
  handleUpdate(path, value);
}
```

#### 6. 新增/修改样式

```scss
.var-row-complex {
  background: rgba(244, 114, 182, 0.05);
}

.var-children {
  margin-left: 20px;
  padding-left: 12px;
  border-left: 2px solid rgba(236, 72, 153, 0.2);
}

.var-array-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  margin: 4px 0;

  .var-input {
    flex: 1;
  }
}

.var-remove-btn {
  width: 20px;
  height: 20px;
  border: 0;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.2);
  color: #dc2626;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(239, 68, 68, 0.4);
  }
}

.var-add-btn {
  width: 20px;
  height: 20px;
  border: 0;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.2);
  color: #059669;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(16, 185, 129, 0.4);
  }
}

.var-child-row {
  margin: 4px 0;
}
```

## 简化方案（可选）

考虑到代码复杂性，可以创建一个单独的 `VarRow.vue` 组件来递归处理：

### 新增文件：`src/合欢系统/components/VarRow.vue`

```vue
<template>
  <div class="var-row" :class="{ 'var-row-complex': isComplex }">
    <div class="var-key" @click="handleClick">
      {{ subKey }}
      <i v-if="isComplex" :class="isExpanded ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right'"></i>
    </div>
    <div class="var-value">
      <!-- 简单值编辑/显示逻辑 -->
      <template v-if="isSimpleValue(displayValue) && isEditing">
        <input class="var-input" v-model="editValue" @keyup.enter="saveEdit" @keyup.escape="cancelEdit" autofocus />
      </template>
      <template v-else-if="isSimpleValue(displayValue)">
        <span @click="startEdit">{{ formatValue(displayValue) }}</span>
      </template>
      <template v-else>
        <span @click.stop="toggleExpand">{{ formatValue(displayValue) }}</span>
      </template>
      <!-- 数组添加按钮等 -->
    </div>
  </div>
  <!-- 递归展开子项 -->
  <div v-if="isExpanded && isComplex" class="var-children">
    <VarRow v-for="(val, key) in childEntries" :key="key" :path="`${path}.${key}`" :value="val" :subKey="String(key)" />
  </div>
</template>
```

## 验证步骤
1. 打开酒馆网页，进入变量编辑页面
2. 展开一个包含复杂变量的分类（如宗门、目标）
3. 点击复杂变量（如目标A）验证是否能展开显示子字段
4. 测试编辑简单值、展开嵌套对象
5. 测试数组的增删功能
6. 确认保存后数据正确更新

## 涉及修改的文件
- `src/合欢系统/pages/EditPage.vue`（主要修改）
- 可选：`src/合欢系统/components/VarRow.vue`（如果使用组件方案）

## 决策点
1. **使用内联方式还是组件方式？**
   - 内联方式：所有代码在一个文件，更容易维护
   - 组件方式：代码更清晰，但需要创建新文件

建议先使用内联方式实现，保持单文件结构。
