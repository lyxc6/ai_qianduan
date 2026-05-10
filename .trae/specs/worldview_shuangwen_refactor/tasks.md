# 世界观纯爽文改造 - The Implementation Plan (Decomposed and Prioritized Task List)

## [ ] Task 1: 改造《世界背景.yaml》为超现实爽文设定
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 移除现实法律、道德约束设定
  - 改造为超现实爽文世界观
  - 目标天然对主角有基础好感，但仍需攻略
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `programmatic` TR-1.1: 《世界背景.yaml》包含超现实爽文设定
  - `human-judgement` TR-1.2: 爽文设定逻辑自洽，无现实约束
- **Notes**: 保持文件结构兼容

## [ ] Task 2: 改造《合欢宗系统.yaml》
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 移除系统隐秘原则
  - 增加系统自动处理一切现实后果
  - 保留任务失败机制，但失败后果轻微不影响爽感
  - 强化奖励爽感
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `programmatic` TR-2.1: 系统包含自动处理机制
  - `human-judgement` TR-2.2: 爽文设定完整，无隐秘要求
- **Notes**: 保持核心系统功能，保留攻略难度

## [ ] Task 3: 删除或重写《失败与风险规则.yaml》
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 删除原风险规则文件
  - 或重写为爽文保障规则
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `programmatic` TR-3.1: 原风险规则文件已处理
- **Notes**: 考虑是否需要保留文件作为占位

## [ ] Task 4: 更新《变量更新规则.yaml》
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 移除风险相关更新规则
  - 保留戒备心机制作为攻略难度
  - 更新好感度机制为天然基础好感
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `programmatic` TR-4.1: 风险相关规则已移除
  - `human-judgement` TR-4.2: 新规则符合爽文设定，保留攻略难度
- **Notes**: 保持变量结构兼容性

## [ ] Task 5: 更新《变量输出格式.yaml》
- **Priority**: P1
- **Depends On**: Task 4
- **Description**: 
  - 移除风险检查点
  - 更新为爽文输出格式
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `programmatic` TR-5.1: 风险检查点已移除
- **Notes**: 保持格式结构兼容

## [ ] Task 6: 修改《变量结构.js》
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 移除社交风险值、曝光风险值字段
  - 保留戒备心字段，调整描述
  - 移除风险标记字段
  - 保留其他字段但调整描述为爽文设定
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `programmatic` TR-6.1: 风险相关字段已移除或调整
  - `human-judgement` TR-6.2: 保留戒备心作为攻略难度
- **Notes**: 保持变量结构兼容性，不破坏现有前端页面
