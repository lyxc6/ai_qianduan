/**
 * 酒馆编译产物预览服务器
 *
 * 编译产物（dist 下的 index.html）依赖酒馆宿主全局变量（Vue、VueRouter、$、_ 等，
 * 见 webpack.config.ts 的 externals 配置），直接双击打开会白屏。
 * 本工具在本地起一个静态服务器，并在响应 HTML 时自动注入垫片脚本，
 * 让编译产物可以在浏览器中直接查看界面外壳（无酒馆数据，显示兜底状态）。
 *
 * 用法：pnpm preview          （默认端口 6622）
 *       PORT=9000 pnpm preview
 *       NO_OPEN=1 pnpm preview（不自动打开浏览器）
 *
 * 不影响酒馆正式链路：只监听独立端口，只读 dist 与 node_modules，不改任何源码/产物。
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const NODE_MODULES = path.join(ROOT, 'node_modules');
const PORT = Number(process.env.PORT || 6622);
const PREFIX = '/__preview__/';

/** zod 全局脚本：缺失时用 webpack 从 node_modules/zod 打包生成（见 scripts/zod-bundle.config.cjs） */
const ZOD_BUNDLE = path.join(ROOT, '.preview', 'zod.global.js');
if (!fs.existsSync(ZOD_BUNDLE)) {
  console.info('\x1b[33m[preview]\x1b[0m 未找到 zod 全局脚本，正在打包（仅首次需要）...');
  const result = spawnSync(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['webpack', '--config', 'scripts/zod-bundle.config.cjs'], { cwd: ROOT, stdio: 'inherit', shell: true });
  if (result.status !== 0 || !fs.existsSync(ZOD_BUNDLE)) {
    console.error('\x1b[31m[preview]\x1b[0m zod 打包失败，预览模式无法提供 z 全局，MVU 界面将无法显示');
    process.exit(1);
  }
}

/** 垫片资源：URL 文件名 → node_modules 内相对路径（均已验证存在） */
const SHIM_ASSETS = {
  'vue.global.prod.js': 'vue/dist/vue.global.prod.js',
  'vue-router.global.prod.js': 'vue-router/dist/vue-router.global.prod.js',
  'jquery.min.js': 'jquery/dist/jquery.min.js',
  'lodash.min.js': 'lodash/lodash.min.js',
  'toastr.min.js': 'toastr/build/toastr.min.js',
};

/** pinia 本地代理：产物内联脚本里写死了 jsdelivr 的 +esm 地址，预览时替换为 data URL，彻底零外网依赖 */
const PINIA_CDN_URL = 'https://testingcf.jsdelivr.net/npm/pinia/+esm';
const DEVTOOLS_STUB_CODE = 'export function setupDevtoolsPlugin() {}\n';

/** 读取 pinia 浏览器 ESM，把 vue / devtools 导入替换为 data URL 后整体 base64 */
function readPiniaDataUrl() {
  const source = fs.readFileSync(path.join(NODE_MODULES, 'pinia/dist/pinia.esm-browser.js'), 'utf8');
  const vueEsm = fs.readFileSync(path.join(NODE_MODULES, 'vue/dist/vue.esm-browser.prod.js'), 'utf8');
  const vueDataUrl = `data:text/javascript;base64,${Buffer.from(vueEsm).toString('base64')}`;
  const devtoolsDataUrl = `data:text/javascript;base64,${Buffer.from(DEVTOOLS_STUB_CODE).toString('base64')}`;
  const rewritten = source
    .replace(/from\s*['"]vue['"]/g, `from '${vueDataUrl}'`)
    .replace(/from\s*['"]@vue\/devtools-api['"]/g, `from '${devtoolsDataUrl}'`);
  return `data:text/javascript;base64,${Buffer.from(rewritten).toString('base64')}`;
}

/** 酒馆助手全局 API 垫片：预览模式下数据兜底为空 */
const SHIM_JS = `/* 酒馆预览垫片：模拟酒馆宿主全局，仅供本地预览编译产物 */
(function () {
  window.__TAVERN_PREVIEW__ = true;
  /* 酒馆助手全局 API（空实现） */
  window.waitGlobalInitialized = window.waitGlobalInitialized || (() => Promise.resolve());
  window.getAllVariables = window.getAllVariables || (() => ({ stat_data: {} }));
  window.getVariables = window.getVariables || (() => ({ stat_data: {} }));
  window.getVariable = window.getVariable || (() => undefined);
  window.eventOn = window.eventOn || (() => () => {});
  window.Mvu = window.Mvu || { events: { VARIABLE_UPDATE_ENDED: '__preview__' } };
  window.insertOrAssignVariables = window.insertOrAssignVariables || (async () => {});
  window.removeVariable = window.removeVariable || (async () => {});
  /* MVU 界面（defineMvuDataStore）依赖的宿主函数：预览下直接放行 */
  window.getCurrentMessageId = window.getCurrentMessageId || (() => 1);
  window.errorCatched = window.errorCatched || ((fn) => fn);
  window.updateVariablesWith = window.updateVariablesWith || (async () => {});
  window.replaceVariables = window.replaceVariables || (async () => {});
  /* 缺失的 external 全局（空壳，避免引用时报错） */
  window.YAML = window.YAML || {};
  window.z = window.z || (typeof zodGlobal !== 'undefined' ? (zodGlobal.z || zodGlobal.default) : {});
  window.showdown = window.showdown || {};
  /* 错误捕获：把页面运行期错误写到 body 属性，便于调试白屏 */
  window.addEventListener('error', (event) => {
    const stack = event.error && event.error.stack ? event.error.stack.split('\n').slice(0, 5).join(' || ') : '';
    document.body.dataset.pageError = (event.message || String(event.error)) + ' ## ' + stack;
  });
  window.addEventListener('unhandledrejection', (event) => {
    document.body.dataset.pageRejection = String(event.reason && event.reason.message ? event.reason.message : event.reason);
  });
  console.log('%c[预览模式] 无酒馆数据注入，界面显示兜底状态', 'color:#8a8a8a;font-weight:bold');
})();
`;

/** 注入到 <head> 之后的垫片脚本：全部内联（含第三方库），避免子资源请求受缓存/网络影响 */
const SHIM_TAGS = [
  fs.readFileSync(path.join(ROOT, '.preview', 'zod.global.js'), 'utf8') + '\n' + SHIM_JS,
  ...Object.values(SHIM_ASSETS).map(rel => fs.readFileSync(path.join(NODE_MODULES, rel), 'utf8')),
]
  .map(code => `<script>${code.replace(/<\/script>/g, '<\\/script>')}</script>`)
  .join('\n');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
};

/** 递归扫描目录下所有 index.html（返回相对路径，含正斜杠分隔） */
function scanHtml(dir, base = '') {
  const out = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      out.push(...scanHtml(full, rel));
    } else if (entry.name === 'index.html') {
      out.push(rel);
    }
  }
  return out;
}

/** 生成索引页 */
function renderIndex(files) {
  const items = files
    .sort((a, b) => a.localeCompare(b, 'zh-CN'))
    .map((rel) => {
      const title = rel === 'index.html' ? '（根目录）' : rel.slice(0, -'index.html'.length).replace(/\/$/, '');
      return `<a class="item" href="${encodeURI(rel)}"><span class="title">${escapeHtml(title)}</span><span class="go">→</span></a>`;
    })
    .join('\n');
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<title>酒馆编译产物预览</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: "Microsoft YaHei", system-ui, sans-serif; background: #1e1e2e; color: #cdd6f4; padding: 32px; }
  h1 { font-size: 20px; margin-bottom: 8px; color: #fff; }
  p.sub { color: #7f849c; font-size: 13px; margin-bottom: 24px; }
  .list { max-width: 720px; display: flex; flex-direction: column; gap: 8px; }
  .item { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #2b2b3f; border: 1px solid #3a3a52; border-radius: 8px; color: #cdd6f4; text-decoration: none; font-size: 14px; transition: background .15s; }
  .item:hover { background: #3a3a55; border-color: #89b4fa; }
  .item .go { color: #89b4fa; }
</style>
</head>
<body>
<h1>酒馆编译产物预览</h1>
<p class="sub">共 ${files.length} 个界面 · 预览模式无酒馆数据，仅展示界面外壳</p>
<div class="list">
${items}
</div>
</body>
</html>`;
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** 防止路径穿越：只允许访问 base 之下的文件 */
function safeJoin(base, rel) {
  const target = path.normalize(path.join(base, rel));
  if (target !== base && !target.startsWith(base + path.sep)) return null;
  return target;
}

function send(res, status, type, body) {
  res.writeHead(status, { 'Content-Type': type, 'Content-Length': Buffer.byteLength(body) });
  res.end(body);
}

function sendFile(res, filePath, type) {
  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': type, 'Content-Length': data.length });
    res.end(data);
  } catch {
    send(res, 404, 'text/plain; charset=utf-8', '404 Not Found');
  }
}

function send404(res) {
  send(res, 404, 'text/plain; charset=utf-8', '404 Not Found');
}

const server = http.createServer((req, res) => {
  try {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    } catch {
      pathname = new URL(req.url, 'http://localhost').pathname;
    }

    /* 索引页 */
    if (pathname === '/' || pathname === '/index.html') {
      const files = scanHtml(DIST);
      send(res, 200, MIME['.html'], renderIndex(files));
      return;
    }

    /* 垫片资源 */
    if (pathname.startsWith(PREFIX)) {
      const key = pathname.slice(PREFIX.length);
      if (key === 'shim.js') {
        send(res, 200, MIME['.js'], SHIM_JS);
        return;
      }
      if (key === 'zod.global.js') {
        const zodBundle = path.join(ROOT, '.preview', 'zod.global.js');
        if (!fs.existsSync(zodBundle)) return send404(res);
        sendFile(res, zodBundle, MIME['.js']);
        return;
      }
      const rel = SHIM_ASSETS[key];
      if (!rel) return send404(res);
      sendFile(res, path.join(NODE_MODULES, rel), MIME['.js']);
      return;
    }

    /* dist 静态文件 */
    const relPath = pathname.replace(/^\/+/, '');
    const filePath = safeJoin(DIST, relPath);
    if (!filePath || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      return send404(res);
    }

    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.html') {
      let html = fs.readFileSync(filePath, 'utf8');
      /* 产物内联脚本里写死的 pinia CDN 地址 → data URL（含 vue/devtools 依赖重写），零外网依赖 */
      html = html.split(PINIA_CDN_URL).join(readPiniaDataUrl());
      const headEnd = html.indexOf('<head>');
      if (headEnd >= 0) {
        html = html.slice(0, headEnd + '<head>'.length) + '\n' + SHIM_TAGS + '\n' + html.slice(headEnd + '<head>'.length);
      }
      send(res, 200, MIME['.html'], html);
      return;
    }
    sendFile(res, filePath, MIME[ext] || 'application/octet-stream');
  } catch (err) {
    console.error('[preview] 请求处理出错:', err);
    send(res, 500, 'text/plain; charset=utf-8', '预览服务器错误: ' + err.message);
  }
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n  端口 ${PORT} 已被占用，可用 PORT=其他端口 重新指定，例如：`);
    console.error(`  PORT=9000 pnpm preview\n`);
  } else {
    console.error('[preview] 服务器错误:', err);
  }
  process.exit(1);
});

function openBrowser(url) {
  try {
    if (process.platform === 'win32') {
      spawn('cmd', ['/c', 'start', '', url], { detached: true, stdio: 'ignore' }).unref();
    } else if (process.platform === 'darwin') {
      spawn('open', [url], { detached: true, stdio: 'ignore' }).unref();
    } else {
      spawn('xdg-open', [url], { detached: true, stdio: 'ignore' }).unref();
    }
  } catch {
    /* 打不开浏览器也不影响服务器本身 */
  }
}

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}/`;
  console.log('');
  console.log('  酒馆编译产物预览服务器已启动');
  console.log(`  地址: ${url}`);
  console.log('  （预览模式：无酒馆数据注入，界面显示兜底状态）');
  console.log('  按 Ctrl+C 退出');
  console.log('');
  if (process.env.NO_OPEN !== '1') openBrowser(url);
});
