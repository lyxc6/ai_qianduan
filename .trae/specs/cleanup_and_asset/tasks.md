# 世界观清理与资产系统改造 - The Implementation Plan

## [ ] Task 1: 修改变量结构.js - 移除背包和宗门的影响力、稳定度、现代化指数、当前路线
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 移除背包相关字段
  - 移除宗门的影响力、稳定度、现代化指数、当前路线
- **Acceptance Criteria Addressed**: AC-1, AC-2
- **Test Requirements**:
  - `programmatic` TR-1.1: 背包字段已移除
  - `programmatic` TR-1.2: 宗门字段已清理

## [ ] Task 2: 修改变量更新规则.yaml - 移除背包和相关规则
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 移除背包更新规则
  - 移除低调资金包装相关内容
- **Acceptance Criteria Addressed**: AC-1, AC-2
- **Test Requirements**:
  - `programmatic` TR-2.1: 背包规则已移除

## [ ] Task 3: 修改变量输出格式.yaml - 移除背包相关检查点
- **Priority**: P1
- **Depends On**: Task 1
- **Description**: 
  - 移除背包相关检查点
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `programmatic` TR-3.1: 背包检查点已移除

## [ ] Task 4: 修改初始变量文件 - 移除背包和相关内容
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 移除背包初始化
  - 移除宗门的影响力、稳定度、现代化指数、当前路线
  - 更新宗门理念等
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `programmatic` TR-4.1: 初始变量已更新

## [ ] Task 5: 修改经营页面 - 添加资产内容
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 添加资产Tab页
  - 显示宗门资金、用户现金等资产信息
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `human-judgment` TR-5.1: 经营页面包含资产内容

## [ ] Task 6: 更新宗门经营系统.yaml - 移除风险相关内容
- **Priority**: P1
- **Depends On**: None
- **Description**: 
  - 移除据点和产业的风险相关属性
  - 移除合法外壳等掩护内容
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `programmatic` TR-6.1: 风险相关内容已移除
