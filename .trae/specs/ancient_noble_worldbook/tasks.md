# 古风架空王朝·特权二代世界书 任务清单

## [x] Task 1: 创建项目目录结构和 index.yaml
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 创建 `src/玄霄王朝/` 目录及其子目录结构（世界书/世界观、世界书/角色、世界书/变量）
  - 创建 `src/玄霄王朝/index.yaml` 世界书索引文件
  - 参照初始模板，配置蓝灯常驻的世界书条目（变量初始化、变量更新规则、变量输出格式、角色设定、世界观条目）
  - 配置 MVU 脚本引用、正则规则（去除/折叠变量更新）
- **Acceptance Criteria**: index.yaml 结构完整，所有条目正确引用对应文件
- **Test Requirements**:
  - `programmatic`: index.yaml 中的文件引用路径与实际文件一致

## [x] Task 2: 创建世界观设定条目
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 创建 `世界书/世界观/世界观.yaml`：架空王朝世界观
    - 朝代背景（玄霄王朝，以武立国，已历四百年）
    - 王朝起源（太祖以军功起家，建立"功勋爵位世袭罔替"制度）
    - 武学境界体系（后天→先天→宗师→大宗师→天人）
    - 地理疆域、都城设定
  - 创建 `世界书/世界观/王朝律法与特权.yaml`：合理化用户行为的核心条目
    - "功臣特权法"：功勋贵族直系后裔享有纳平民入府的特权
    - "武道阴阳论"：此世界武道修炼需要阴阳调和，纳妾修炼是武学刚需
    - "血脉继承制"：功勋爵位世袭罔替，孤子继承全部爵位和特权
    - 这些设定从法律、武学、制度三个层面合理化用户需求
  - 创建 `世界书/世界观/保障规则.yaml`：爽文保障机制
    - 系统自动处理一切现实后果
    - 目标天然有基础好感，攻略过程无真正风险
    - 社会舆论、法律追责等由系统自动摆平
- **Acceptance Criteria**: 三个世界观条目逻辑自洽，从法律/武学/文化层面合理化用户行为
- **Test Requirements**:
  - `human-judgement`: 世界观设定逻辑自洽，"合理化"设计有说服力

## [x] Task 3: 创建 {{user}} 角色设定
- **Priority**: P0
- **Depends On**: Task 2
- **Description**:
  - 创建 `世界书/角色/{{user}}.yaml`：
    - 身份：镇国公遗孤，父母为王朝战死
    - 母亲身份：先帝最宠爱的幼妹（长公主），因此 {{user}} 流有皇室血脉
    - 持有先帝遗诏：赋予超然特权，当今皇帝也需礼让三分
    - 官职/爵位：继承镇国公爵位
    - 武道修为：天赋异禀（皇室+将门双重血脉）
    - 性格设定：纨绔但不愚蠢，霸道但有底线
    - 关系网络：与朝中重臣、皇族成员的关系
- **Acceptance Criteria**: {{user}} 设定完整，身份背景充分合理化后续行为
- **Test Requirements**:
  - `human-judgement`: 身份设定逻辑严密，与世界观配套

## [x] Task 4: 创建变量结构 Schema
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 创建 `src/玄霄王朝/变量结构.js`：
    - 使用 zod 4 定义完整的变量结构
    - 包含字段：当前时间、当前地点
    - 主角状态：官职、爵位、武道修为、财富、声望
    - 后宫管理：后宫成员列表（姓名、身份、好感度、处女状态、亲密次数等）
    - 攻略目标：目标信息、攻略进度
    - 参照逍遥皇女的变量结构格式，根据新世界观调整
  - 参照 mvu角色卡规范：去除开头 import 和结尾 $(...)，只保留 `export const Schema`
- **Acceptance Criteria**: Schema 完整定义所有需要的变量，使用 zod 4 语法
- **Test Requirements**:
  - `programmatic`: Schema 可通过 zod 解析验证

## [x] Task 5: 创建变量体系文件
- **Priority**: P0
- **Depends On**: Task 4
- **Description**:
  - 创建 `世界书/变量/initvar.yaml`：变量初始值
    - 当前时间、地点
    - 主角初始状态（镇国公、先天境修为等）
    - 后宫初始为空
  - 创建 `世界书/变量/变量列表.yaml`：变量显示格式
  - 创建 `世界书/变量/变量输出格式.yaml`：规定 AI 输出变量更新的格式
  - 创建 `世界书/变量/变量更新规则.yaml`：各变量的更新条件和规则
    - 时间地点随剧情推进更新
    - 好感度随互动调整
    - 后宫成员随剧情增删
    - 武道修为随修炼/奇遇变化
- **Acceptance Criteria**: 四个变量文件完整，格式正确，与 Schema 匹配
- **Test Requirements**:
  - `programmatic`: initvar 中的变量结构与 Schema 一致

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 2]
- [Task 5] depends on [Task 4]
- [Task 1] 和 [Task 4] 可并行执行
