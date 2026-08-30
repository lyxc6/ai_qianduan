/**
 * 预览服务器专用：把 node_modules/zod 打包成同步加载的 IIFE 全局脚本（zodGlobal）
 * 产出：.preview/zod.global.js
 * 用法：npx webpack --config scripts/zod-bundle.config.cjs
 *
 * 背景：zod 4 只有 ESM 构建，浏览器 module script 加载时序在预览环境不可靠，
 * 而编译产物在模块顶层就用 external 全局 z 构建 Schema（快照绑定），
 * 必须让 z 在产物脚本执行前同步可用。
 */
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

module.exports = {
  mode: 'production',
  entry: path.join(ROOT, 'node_modules/zod/index.js'),
  output: {
    path: path.join(ROOT, '.preview'),
    filename: 'zod.global.js',
    library: {
      type: 'var',
      name: 'zodGlobal',
    },
  },
  resolve: {
    mainFields: ['module', 'main'],
  },
  optimization: {
    minimize: true,
  },
};
