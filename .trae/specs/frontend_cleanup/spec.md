# 前端代码清理与修复 - Product Requirement Document

## Overview
- **Summary**: 修复前端代码中引用不存在变量和无效图标的问题，确保与当前世界观变量结构保持一致。
- **Purpose**: 解决系统中存在的视觉问题和功能异常，提供流畅的用户体验。
- **Target Users**: 使用系统的用户

## Goals
- 修复 HomePage.vue 中不存在的 Font Awesome 图标（fa-flame、fa-list-checks）
- 移除 SectPage.vue 中引用已删除变量的显示（当前路线、影响力、隐蔽度、稳定度、现代化指数）
- 全面检查并清理所有其他前端页面中对不存在变量的引用

## Non-Goals (Out of Scope)
- 不添加新功能，仅清理现有问题
- 不修改核心业务逻辑
- 不重构架构或设计样式

## Background & Context
- 系统最近进行了世界观变量更新，移除了部分字段（如背包、宗门影响力、稳定度、风险标记等）
- 部分前端页面仍在引用已删除的变量，可能导致显示错误
- Font Awesome 图标 fa-flame 和 fa-list-checks 在当前版本中不存在

## Functional Requirements
- **FR-1**: 修复 HomePage.vue 中的图标问题
- **FR-2**: 清理 SectPage.vue 中已删除变量的显示
- **FR-3**: 全面检查并修复其他页面的变量引用问题

## Non-Functional Requirements
- **NFR-1**: 保持现有样式和布局不变
- **NFR-2**: 修复后的代码能正常运行，无控制台错误

## Constraints
- **Technical**: Vue 3 + TypeScript + Font Awesome
- **Dependencies**: 依赖变量结构定义和数据来源

## Assumptions
- Font Awesome 标准版本可用
- 数据已按最新变量结构更新

## Acceptance Criteria

### AC-1: HomePage 图标修复
- **Given**: 用户在系统首页
- **When**: 查看应用图标
- **Then**: 所有图标正常显示，无缺失或错误的图标类名
- **Verification**: `human-judgment`

### AC-2: SectPage 已删除变量移除
- **Given**: 用户在宗门页面
- **When**: 查看页面内容
- **Then**: 不显示已删除的变量（当前路线、影响力、隐蔽度、稳定度、现代化指数）
- **Verification**: `human-judgment`

### AC-3: 所有页面检查完成
- **Given**: 所有页面代码
- **When**: 搜索已删除变量的引用
- **Then**: 确认没有遗漏的已删除变量引用
- **Verification**: `human-judgment`

## Open Questions
- [ ] 确认是否还有其他已删除的变量可能被引用
