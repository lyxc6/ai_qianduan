# 世界观纯爽文改造 - Product Requirement Document

## Overview

* **Summary**: 将当前带有现实风险和失败机制的合欢宗世界观改造成纯爽文设定，移除所有暴露风险、法律风险、社交风险等负面机制，保留攻略目标的难度让用户享受攻略过程，但系统会自动处理一切现实后果，让主角一路顺利升级。

* **Purpose**: 提供纯粹的爽文体验，让用户无需担心任何现实后果，但保留攻略乐趣。

* **Target Users**: 希望获得纯爽文体验，同时享受攻略过程的用户。

## Goals

* 移除所有失败与风险规则

* 移除系统隐秘原则

* 改造世界背景为超现实爽文设定

* 目标天然有基础好感，但仍需攻略

* 系统自动处理一切现实后果

* 提升奖励机制的爽感

* 修改变量结构.js，移除风险相关字段

## Non-Goals (Out of Scope)

* 保留任何现实法律、道德约束

* 移除攻略目标的难度和挑战

* 移除任务失败机制（但失败不会有严重后果）

## Background & Context

当前世界观基于现实逻辑，包含大量风险机制（社交风险、曝光风险、法律风险）、失败处理规则、系统隐秘要求等。需要全面改造为纯爽文设定，但保留攻略乐趣。

## Functional Requirements

* **FR-1**: 移除《失败与风险规则.yaml》中的所有风险内容

* **FR-2**: 改造《合欢宗系统.yaml》，移除隐秘原则，增加自动处理机制

* **FR-3**: 改造《世界背景.yaml》为超现实爽文设定

* **FR-4**: 更新《变量更新规则.yaml》，移除风险相关规则

* **FR-5**: 更新《变量输出格式.yaml》，移除风险检查点

* **FR-6**: 修改《变量结构.js》，移除风险相关字段

## Non-Functional Requirements

* **NFR-1**: 保持变量结构的兼容性，不破坏现有前端页面

* **NFR-2**: 爽文设定要逻辑自洽

## Constraints

* **Technical**: 保持现有YAML/JS文件结构

* **Dependencies**: 依赖现有变量结构和前端页面

## Assumptions

* 用户希望体验纯爽文模式，不担心任何风险

* 用户希望享受攻略目标的过程，保留攻略难度

* 改造不会破坏现有功能的完整性

## Acceptance Criteria

### AC-1: 移除所有风险规则

* **Given**: 世界观改造完成

* **When**: 用户查看《失败与风险规则.yaml》

* **Then**: 文件已被替换为无风险设定或删除

* **Verification**: `programmatic`

### AC-2: 系统改造为自动爽感模式

* **Given**: 世界观改造完成

* **When**: 用户查看《合欢宗系统.yaml》

* **Then**: 包含自动后果处理、目标天然基础好感等爽文设定

* **Verification**: `programmatic`

### AC-3: 世界背景改造

* **Given**: 世界观改造完成

* **When**: 用户查看《世界背景.yaml》

* **Then**: 已改为超现实爽文设定

* **Verification**: `programmatic`

### AC-4: 变量规则更新

* **Given**: 世界观改造完成

* **When**: 检查变量更新规则

* **Then**: 风险相关规则已移除，保留攻略难度

* **Verification**: `programmatic`

### AC-5: 变量结构修改

* **Given**: 世界观改造完成

* **When**: 检查变量结构.js

* **Then**: 风险相关字段已移除或调整描述

* **Verification**: `programmatic`

## Open Questions

* 暂无

