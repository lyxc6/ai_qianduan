# Git 仓库恢复计划

## 问题

本地 `.git` 目录损坏/丢失，但：

* 远程仓库（<https://github.com/lyxc6/ai_qianduan.git）有完整历史>

* 本地有最新修改的文件

## 目标

在当前目录恢复 Git 仓库，同步远程历史，然后提交本地更新。

## 步骤

### 步骤 1：初始化本地 Git 仓库

```bash
cd e:\Work\ai小说\ai_qianduan
git init
```

### 步骤 2：关联远程仓库

```bash
git remote add origin https://github.com/lyxc6/ai_qianduan.git
```

### 步骤 3：拉取远程历史

```bash
git fetch origin
git checkout -b main origin/main
```

### 步骤 4：合并本地更新

```bash
git add -A
git stash
git pull origin main
git stash pop
```

### 步骤 5：处理冲突（如出现）

如果有冲突，手动编辑冲突文件，然后：

```bash
git add -A
git commit -m "merge: 合并本地更新与远程历史"
```

### 步骤 6：提交并推送

```bash
git add -A
git commit -m "feat: 合欢系统界面重构与功能扩展

- 重构多个页面组件（首页、成员页、人脉页、宗门页、系统页、目标页、用户页）
- 新增管理页面 ManagementPage.vue
- 删除冗余页面文件（BagPage.vue, BasePage.vue, IndustryPage.vue）
- 添加数据库模块和模板场景目录
- 更新工具函数和入口文件
- 添加系统文档说明"
git push origin main
```

## 注意事项

* 如果 `git stash pop` 出现冲突，需要手动解决

* 如果提示 "Already up to date"，直接提交即可

* 确保网络连接正常，能够访问 GitHub

## 备选方案

如果以上步骤失败，使用备份方案：

1. 备份当前目录
2. 删除原目录
3. `git clone https://github.com/lyxc6/ai_qianduan.git`
4. 将备份文件复制回克隆目录
5. 提交并推送

