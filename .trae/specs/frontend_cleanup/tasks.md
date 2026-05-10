# 前端代码清理与修复 - The Implementation Plan (Decomposed and Prioritized Task List)

## [ ] Task 1: 修复 HomePage.vue 中的图标问题
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 修改 fa-flame 为 fa-fire
  - 修改 fa-list-checks 为 fa-clipboard-list 或 fa-list-check 或类似的存在的图标
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `human-judgement` TR-1.1: 检查图标是否正常显示，无缺失
- **Notes**: 需选择 Font Awesome 6 中确实存在的图标

## [ ] Task 2: 清理 SectPage.vue 中的已删除变量
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 移除当前路线、影响力、隐蔽度、稳定度、现代化指数的显示
  - 相应更新 TypeScript 接口定义
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `human-judgement` TR-2.1: 检查页面是否仅显示存在的变量
- **Notes**: 保持页面美观和布局合理

## [ ] Task 3: 检查所有其他页面
- **Priority**: P1
- **Depends On**: None
- **Description**: 
  - 检查 UserPage.vue、TargetPage.vue、AllTargetPage.vue、SystemPage.vue 等
  - 查找对已删除变量的引用（背包、风险标记、风险相关变量等）
  - 如发现则进行相应清理
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `human-judgement` TR-3.1: 确认所有已删除变量的引用都已清理
- **Notes**: 重点检查 Target 相关页面的风险标记
