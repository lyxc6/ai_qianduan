# 酒馆助手前端界面或脚本编写

@.trae/rules/项目基本概念.mdc
@.trae/rules/酒馆变量.mdc
@.trae/rules/酒馆助手接口.md
@.trae/rules/前端界面.md
@.trae/rules/脚本.mdc
@.trae/rules/mvu变量框架.mdc
@.trae/rules/mvu角色卡.mdc
@.trae/rules/内置第三方库.md

# Git提交信息规范

使用 Conventional Commits 格式：`<type>(<scope>): <description>`

## Type 类型
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具变更
- `ci`: CI配置变更

## Scope 范围（可选）
项目名或模块名，如 `合欢系统`、`高中`、`玄霄宗` 等

## Description 描述规则
1. 使用中文描述
2. 简洁明了，说明做了什么
3. 不超过50个字符
4. 不加句号

## 示例
- `feat(合欢系统): 添加角色状态栏组件`
- `fix(高中): 修复剧情切换崩溃问题`
- `docs: 更新README安装说明`
- `chore: 更新依赖版本`

## 禁止事项
- 禁止只有类型没有描述（如 `feat`、`fix`）
- 禁止使用时间戳作为提交信息（如 `2026-04-07-22-07`）
- 禁止无意义的提交信息
