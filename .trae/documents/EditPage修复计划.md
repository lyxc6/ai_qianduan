# EditPage.vue 获取变量错误修复计划

## 问题描述
EditPage 页面报错：`Cannot read properties of undefined (reading 'length')`
其他页面（UserPage、SystemPage、BagPage 等）正常工作，只有 EditPage 出错。

## 根本原因
EditPage.vue 的 `inject` 类型定义与其他页面不一致：

```typescript
// 错误写法（EditPage 当前）
const injectedStatData = inject<{ value?: { stat_data?: StatData } }>('statData');
const statData = computed((): StatData => injectedStatData?.value?.stat_data || {});

// 正确写法（其他页面使用）
const injectedStatData = inject<{ value: StatData }>('statData');
const statData = computed((): StatData => injectedStatData?.value || {});
```

App.vue provide 的是 `ref<StatData>`，inject 后得到 `{ value: StatData }`，而不是 `{ value: { stat_data: StatData } }`。

## 修复方案

### 修改文件：`src/合欢系统/pages/EditPage.vue`

#### 1. 修改 inject 类型定义（第 74 行）
```typescript
// 修改前：
const injectedStatData = inject<{ value?: { stat_data?: StatData } }>('statData');
const statData = computed((): StatData => injectedStatData?.value?.stat_data || {});

// 修改后：
const injectedStatData = inject<{ value: StatData }>('statData');
const statData = computed((): StatData => injectedStatData?.value || {});
```

#### 2. 修改 saveChanges 函数（第 182 行）
```typescript
// 修改前：
const currentStatData = _.cloneDeep(injectedStatData?.value?.stat_data || {});

// 修改后：
const currentStatData = _.cloneDeep(injectedStatData?.value || {});
```

## 验证步骤
1. 打开酒馆网页，进入变量编辑页面
2. 检查是否正常显示所有变量分类（世界、用户、系统等）
3. 测试修改变量值并保存
4. 确认控制台没有报错

## 涉及修改的文件
- `src/合欢系统/pages/EditPage.vue`（2 处修改）
