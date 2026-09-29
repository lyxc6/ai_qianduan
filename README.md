# ai_qianduan

基于 [tavern_helper_template](https://github.com/StageDog/tavern_helper_template) 的酒馆 (SillyTavern) 角色卡与前端界面工作区。仓库同时承担两个角色:

1. **角色卡开发**: 用 `tavern_sync.yaml` 把酒馆里的角色卡、世界书、预设提取成本地文件, 编辑后再打包回酒馆可直接导入的文件。
2. **前端界面 / 脚本开发**: 在 `src/*/` 下用 Vue 3 + TypeScript 编写酒馆助手前端界面或脚本, 由 webpack 打包到 `dist/` 供 jsdelivr 分发。

## 目录结构

| 路径 | 说明 |
|---|---|
| `src/*/` | 本工作区的角色卡与前端界面 / 脚本项目, 具体清单见 `tavern_sync.yaml` |
| `示例/*/` | 模板自带的示例项目 (**不要删除**, `webpack.config.ts` 第 54 行会打包 `{示例,src}/`) |
| `初始模板/*/` | 新建项目时复制使用的初始模板 |
| `@types/` | 酒馆助手接口的类型定义, 代码中可直接调用, 清单见 `.agents/rules/酒馆助手接口.md` |
| `util/` | 工具函数: `common.ts`、`script.ts`、`mvu.ts`、`streaming.ts` |
| `docs/` | 角色卡预览图等附带素材 |
| `dist/` | 打包产物 (随仓库上传, 由 CI 重新生成) |
| `scripts/` | 本地预览等辅助脚本 |
| `slash_command.txt` | 酒馆 STScript 命令列表, 配合 `triggerSlash` 使用 |
| `tavern_sync.yaml` | 角色卡 / 世界书 / 预设的提取与打包配置 |

## 可用脚本

```bash
pnpm build        # 生产模式打包
pnpm build:dev    # 开发模式打包
pnpm watch        # 监听并持续打包 (会生成 schema.json)
pnpm format       # prettier 格式化
pnpm lint         # eslint 检查
pnpm lint:fix     # eslint 自动修复
pnpm dump         # 生成 zod schema
pnpm sync         # 运行 tavern_sync.mjs 与酒馆同步角色卡
pnpm preview      # 本地预览
```

## 使用方法

请阅读[教程文档](https://stagedog.github.io/青空莉/工具经验/实时编写前端界面或脚本/)来了解如何使用。

### 仅本地使用

你可以点击网页右上角的绿色 `Code` 按钮-`Download ZIP` 下载本模板的压缩包来只在本地使用。

这意味着:

- 你将不能利用 jsdelivr 实现前端界面或脚本的自动更新;
- 也不能享受本模板提供的自动打包、自动更新功能。

但你本地依旧能很方便地使用这个模板。

### 作为 Github 仓库

你可以通过以下两种方式中的一种来创建仓库:

- 点击网页右上角绿色 `Use this template` 按钮;
- 或者点击网页右上角的 `fork` 按钮, 但需要手动去 fork 所得仓库的 `Actions` 页面启用自动工作流.

在创建好仓库后, 你需要配置工作流的权限: 前往仓库 `Settings -> Actions -> General` 中将 `Workflow permissions` 设置为 `Read and write permissions`, 并勾选 `Allow GitHub Actions to create and approve pull requests`。

此外, 你可以把仓库网址发给 AI, 问 AI 该**怎么启用 `core.symlinks`**, 然后克隆到本地使用; 或者, 你可以游玩 [Learn Git Branching](https://learngitbranching.js.org/?locale=zh_CN) 来学习 git 分支和合并。

### `.vscode/launch.json` 文件

由于 `.vscode/launch.json` 文件中填写了你的酒馆地址, 你可能需要运行命令来忽略这个更改, 避免你的云酒馆 ip 地址暴露:

```bash
git update-index --skip-worktree .vscode/launch.json
```

### 利用 jsdelivr 实现前端界面或脚本的自动更新

由于你所制作的前端界面或脚本将被打包在 github 仓库中, 你将能用 jsdelivr 链接来访问它们, 而这个链接可以在前端界面或脚本中直接使用。

由此你就可以为用户创建这样一个自动更新的前端界面:

```html
<body>
  <script>
    $('body').load('https://testingcf.jsdelivr.net/gh/lolo-desu/lolocard/dist/日记络络/界面/介绍页/index.html')
  </script>
</body>
```

或一个自动更新的脚本:

```typescript
import 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/酒馆助手/场景感/index.js'
```

更多请见于[文档](https://stagedog.github.io/青空莉/工具经验/实时编写前端界面或脚本/进阶技巧)。

### 自动打包、自动更新功能

本仓库在 `.github/workflows` 文件夹中设置了几个 CI 工作流来为你带来自动打包、自动更新功能, 你也可以在网页上方的 `Actions` 中手动运行它们:

**`bundle.yaml`**

- 自动打包 `src` 文件夹中的代码到 `dist` 文件夹中, 并自动递增版本号从而让 jsdelivr 更快更新缓存;
- 自动将 `tavern_sync.yaml` 中[已经配置好了的角色卡、世界书或预设](https://stagedog.github.io/青空莉/工具经验/实时编写角色卡、世界书或预设/)打包成可以被酒馆导入的文件.

**`bump_deps.yaml`**

- 每三天一次, 自动更新第三方库依赖和酒馆助手 `@types` 文件夹.

**`sync_template.yaml`**

- 在你基于模板仓库创建新仓库后, 你的新仓库将不再和模板仓库有关联, 因此我设置了这个工作流用于同步模板仓库的更新 (如编程助手编写规则、MCP、slash_command.txt 文件等):
  - 发现模板仓库更新后, 这个工作流将会自动创建一个 pull request 来同步更新, 而**你需要手动批准 pull request, 因此建议你时常查看 github 的邮件通知;**
  - 如果模板仓库中有文件是你不想继续同步的, 可以在 `.github/.templatesyncignore` 中添加它 (本仓库已排除 `README.md`, 因此本文件不会被模板同步覆盖).

### 打包冲突问题

为了自动更新和打包一些东西, 本项目直接打包源代码在 `dist/` 文件夹中并随仓库上传, 而这会让开发时经常出现分支冲突。

为了解决这一点, 仓库在 `.gitattribute` 中设置了对于 `dist/` 文件夹中的冲突总是使用当前版本 (`.gitattributes` 中的 `dist/** merge=ours`)。这不会有什么问题: 在上传后, ci 会将 `dist/` 文件夹重新打包成最新版本, 因而你上传的 `dist/` 文件夹内容如何无关紧要。

为了启用这个功能, 请执行一次以下命令:

```bash
git config --global merge.ours.driver true
```

## 编程助手规则

本仓库的编程助手约定放在 `.agents/` 目录中:

- `.agents/rules/*.md`: 项目基本概念、酒馆变量、酒馆助手接口、前端界面、脚本、MVU 变量框架、MVU 角色卡、内置第三方库等编写规则
- `.agents/skills/*/`: 可复用的 skill (酒馆助手开发指南、tailwind 设计系统、git 工作流等)

`CLAUDE.md` 是编程助手的入口文件, `AGENTS.md` 与 `GEMINI.md` 都指向它。**Git 提交信息规范见 `CLAUDE.md`。**

## 许可证

[Aladdin](LICENSE)
