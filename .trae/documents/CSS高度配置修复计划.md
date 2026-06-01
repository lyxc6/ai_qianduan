# CSS高度配置修复计划

## 问题分析

当前CSS高度配置存在以下问题：

### 1. 多层嵌套的 `height: 100%` 问题
```scss
html, body {
  height: 100%;  // 问题：在iframe环境中无法正确计算父容器高度
}

#app {
  height: 100%;  // 问题：依赖父容器的正确高度
}

.xx-app {
  height: 100%;  // 问题：多层嵌套导致高度计算错误
}
```

### 2. `overflow: hidden` 配置问题
```scss
html, body {
  overflow: hidden;  // 问题：阻止了整个页面的滚动
}

.xx-app {
  overflow: hidden;  // 问题：与内部滚动区域冲突
}
```

### 3. Flex布局高度问题
- `.xx-app` 使用了 `flex-direction: column`，但父容器高度不确定
- `.xx-screen` 使用了 `flex: 1`，但父容器高度被限制死

## 解决方案

### 方案一：使用绝对定位（推荐）
让 `.xx-app` 使用绝对定位占满整个容器，移除多层嵌套的 `height: 100%`

```scss
html, body {
  margin: 0;
  padding: 0;
  // 移除 height: 100% 和 overflow: hidden
  font-size: 16px;
}

#app {
  // 移除 height: 100%
}

.xx-app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: $xx-bg;
  font-family: 'Songti SC', 'Noto Serif SC', 'Source Han Serif SC', serif;
  overflow: hidden;
}
```

### 方案二：使用vh单位
使用视口高度单位，不依赖父容器

```scss
html, body {
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden;
  font-size: 16px;
}

#app {
  height: 100%;
}

.xx-app {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: $xx-bg;
  font-family: 'Songti SC', 'Noto Serif SC', 'Source Han Serif SC', serif;
  overflow: hidden;
}
```

## 实施步骤

1. **修改 `main.scss`**
   - 移除 `html, body` 的 `height: 100%` 和 `overflow: hidden`
   - 移除 `#app` 的 `height: 100%`
   - 为 `.xx-app` 添加绝对定位，确保占满整个容器

2. **验证修改**
   - 构建项目
   - 检查页面是否正常显示
   - 确认内容可以正常滚动

## 涉及文件

- `e:\Work\ai小说\ai_qianduan\src\玄霄宗\界面\styles\main.scss`
