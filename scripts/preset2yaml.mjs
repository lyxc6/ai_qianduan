import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, basename, extname } from "node:path";

const PRESET_DIR = join(import.meta.dirname, "..", "src", "NSFW", "预设");
const OUTPUT_DIR = join(import.meta.dirname, "..", "src", "NSFW", "预设_yaml");

function sanitize(name) {
  return name.replace(/[<>:"/\\|?*\x00-\x1f]/g, "_").trim();
}

const files = readdirSync(PRESET_DIR).filter((f) => extname(f) === ".json");

for (const file of files) {
  const raw = readFileSync(join(PRESET_DIR, file), "utf-8");
  const data = JSON.parse(raw);
  const presetName = basename(file, ".json");

  const dir = join(OUTPUT_DIR, sanitize(presetName));
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const prompts = data.prompts ?? [];
  for (const p of prompts) {
    if (!p.content) continue;
    const name = sanitize(p.name || p.identifier || "unnamed");
    writeFileSync(join(dir, `${name}.txt`), p.content, "utf-8");
  }

  console.log(`✓ ${file} → ${dir} (${prompts.filter((p) => p.content).length} 个文件)`);
}

console.log(`\n完成！输出目录: ${OUTPUT_DIR}`);
