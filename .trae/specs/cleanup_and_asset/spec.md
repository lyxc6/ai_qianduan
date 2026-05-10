# 世界观清理与资产系统改造 - Product Requirement Document

## Overview
- **Summary**: 清理世界观中不再需要的内容（背包、低调资金包装、风险相关），移除宗门变量中的影响力、稳定度、现代化指数、当前路线，在经营页面添加资产内容。
- **Purpose**: 简化系统，使世界观更符合纯爽文设定，添加资产管理功能。
- **Target Users**: 合欢系统用户

## Goals
- 移除背包系统相关内容
- 移除低调资金包装等掩护系统存在的内容
- 在经营页面添加资产内容
- 移除宗门变量的影响力、稳定度、现代化指数、当前路线
- 修改初始变量符合当前世界观

## Non-Goals (Out of Scope)
- 保持据点和产业系统不变

## Background & Context
当前世界观中存在一些不再需要的内容（如背包、风险相关），需要清理以符合纯爽文设定。同时需要添加资产管理功能。

## Functional Requirements
- **FR-1**: 移除背包系统（变量结构、更新规则、输出格式、初始化）
- **FR-2**: 移除低调资金包装相关内容
- **FR-3**: 移除宗门的影响力、稳定度、现代化指数、当前路线字段
- **FR-4**: 修改经营页面添加资产内容
- **FR-5**: 更新初始变量

## Non-Functional Requirements
- **NFR-1**: 保持现有功能兼容性

## Constraints
- **Technical**: 保持现有文件结构

## Acceptance Criteria

### AC-1: 背包系统移除
- **Given**: 改造完成
- **When**: 检查相关文件
- **Then**: 背包相关内容已移除
- **Verification**: `programmatic`

### AC-2: 宗门变量清理
- **Given**: 改造完成
- **When**: 检查宗门变量
- **Then**: 影响力、稳定度、现代化指数、当前路线已移除
- **Verification**: `programmatic`

### AC-3: 经营页面更新
- **Given**: 改造完成
- **When**: 查看经营页面
- **Then**: 包含资产内容
- **Verification**: `human-judgment`

### AC-4: 初始变量更新
- **Given**: 改造完成
- **When**: 查看初始变量文件
- **Then**: 符合当前世界观
- **Verification**: `programmatic`

## Open Questions
- 暂无
