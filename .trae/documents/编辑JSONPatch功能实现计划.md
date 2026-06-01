# JSONPatch编辑功能实现计划

## 一、需求分析

### 1.1 需求变更
1. **移除刷新变量按钮**：从设置页面删除该按钮
2. **新增编辑JSONPatch功能**：
   - 获取当前楼层的消息内容
   - 解析消息中的 `<JSONPatch>` 标签内容
   - 提供编辑界面修改JSON格式
   - 支持保存修改后的内容

### 1.2 技术依据
根据酒馆助手API：
- `getChatMessages(-1)` 获取最新楼层消息
- 从消息内容中提取 `<JSONPatch>` 和 `</JSONPatch>` 之间的内容
- 使用 `setChatMessages()` 更新楼层消息

## 二、功能设计

### 2.1 设置页面新按钮布局
```
数据管理
├── 编辑变量 - 修改角色、攻略等数据
├── 编辑当前JSONPatch - 编辑最新楼层的变量更新
└── 编辑更新格式 - 编辑AI输出的变量格式模板
```

### 2.2 EditJSONPatchPage界面设计
```
┌─────────────────────────────────┐
│ ← 返回设置                       │
│                                  │
│ 编辑当前楼层JSONPatch            │
│ 修改最新AI回复中的变量更新        │
│                                  │
│ 当前楼层: #N (角色名)            │
│                                  │
│ ┌─────────────────────────────┐ │
│ │ [                         │ │
│ │   {"op": "replace",       │ │
│ │   ...                    │ │
│ │ ]                         │ │
│ └─────────────────────────────┘ │
│                                  │
│        [应用修改]                 │
└─────────────────────────────────┘
```

## 三、实施步骤

### 步骤1：修改SettingsPage.vue
1. 移除"刷新变量"按钮
2. 添加"编辑当前JSONPatch"按钮
3. 实现跳转到新编辑页面

### 步骤2：创建EditJSONPatchPage.vue
1. 获取最新楼层消息
2. 从消息中提取JSONPatch内容
3. 提供JSON编辑区域
4. 实现保存和应用功能
5. 添加返回按钮

### 步骤3：更新路由配置
在index.ts中添加新路由

## 四、涉及文件

| 文件 | 修改内容 |
|------|----------|
| `src/玄霄宗/界面/pages/SettingsPage.vue` | 移除刷新按钮，添加编辑JSONPatch按钮 |
| `src/玄霄宗/界面/pages/EditJSONPatchPage.vue` | 新建：编辑当前楼层JSONPatch页面 |
| `src/玄霄宗/界面/index.ts` | 添加新路由 |

## 五、核心功能实现

### 5.1 获取最新楼层消息
```typescript
// 获取最新楼层消息
const messages = getChatMessages(-1);
if (messages.length > 0) {
  const latestMessage = messages[0];
  const messageContent = latestMessage.message;
}
```

### 5.2 提取JSONPatch内容
```typescript
// 从消息中提取JSONPatch
function extractJSONPatch(content: string) {
  const startTag = '<JSONPatch>';
  const endTag = '</JSONPatch>';
  const startIndex = content.indexOf(startTag);
  const endIndex = content.indexOf(endTag);
  if (startIndex !== -1 && endIndex !== -1) {
    return content.slice(startIndex + startTag.length, endIndex).trim();
  }
  return '';
}
```

### 5.3 保存JSONPatch修改
```typescript
// 更新消息内容
function saveJSONPatch(newContent: string) {
  // 替换原消息中的JSONPatch部分
  // 调用 setChatMessages() 更新楼层
  // 应用变量更新
}
```

## 六、验证清单

- [ ] 刷新变量按钮已移除
- [ ] 编辑当前JSONPatch按钮已添加
- [ ] EditJSONPatchPage页面已创建
- [ ] 能正确获取最新楼层消息
- [ ] 能正确提取JSONPatch内容
- [ ] 能正确解析和编辑JSON
- [ ] 能正确保存和应用修改
- [ ] 路由配置正确
- [ ] 构建项目验证功能正常