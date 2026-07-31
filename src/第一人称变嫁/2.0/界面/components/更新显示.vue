<template>
  <div class="flex flex-col gap-3 pb-1">
    <template v-if="groups.length">
      <section
        v-for="g in groups"
        :key="g.name"
        class="section-card update-group"
        :class="g.theme"
      >
        <div class="section-title mb-2">{{ g.name }} <span class="summary-count">{{ g.ops.length }} 项</span></div>
        <div class="flex flex-col gap-1.5">
          <div v-for="(op, i) in g.ops" :key="i" class="op-row">
            <span class="op-field">{{ op.field }}</span>
            <span class="op-op">{{ op.opLabel }}</span>
            <span class="op-value" :class="op.opClass">{{ op.display }}</span>
          </div>
        </div>
      </section>

      <details class="raw-toggle">
        <summary>查看原始 JSONPatch</summary>
        <pre class="raw-json">{{ rawJson }}</pre>
      </details>
    </template>
    <div v-else class="empty-tip">本楼层暂无变量更新</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

interface Props {
  statData?: Record<string, any>;
  currentMessage?: any;
}

const props = defineProps<Props>();

interface ParsedOp {
  op: string;
  owner: string;
  field: string;
  opLabel: string;
  display: string;
  opClass: string;
}

interface Group {
  name: string;
  theme: string;
  ops: ParsedOp[];
}

const rawJson = ref('');
const ops = ref<ParsedOp[]>([]);

const PERCENT_FIELDS = ['开发', '敏感', '兴奋', '湿润', '沦陷', '进度'];
const OWNER_ORDER = ['苏晚棠', '沈含烟', '陆辞夜', '世界', '行动选项'];
const OWNER_THEME: Record<string, string> = {
  苏晚棠: 'swt',
  沈含烟: 'sht',
  陆辞夜: 'lcy',
  世界: 'world',
  行动选项: 'updates',
};

const groups = computed<Group[]>(() => {
  const bucket = new Map<string, ParsedOp[]>();
  for (const op of ops.value) {
    const owner = op.owner || '其他';
    if (!bucket.has(owner)) bucket.set(owner, []);
    bucket.get(owner)!.push(op);
  }
  const names = [...OWNER_ORDER.filter(n => bucket.has(n)), ...[...bucket.keys()].filter(n => !OWNER_ORDER.includes(n))];
  return names.map(name => ({
    name,
    theme: OWNER_THEME[name] || 'updates',
    ops: bucket.get(name)!,
  }));
});

function formatOp(raw: any): ParsedOp | null {
  if (!raw || typeof raw.path !== 'string' || typeof raw.op !== 'string') return null;
  const segments = raw.path.split('/').filter(Boolean);
  const owner = segments[0] || '其他';
  const field = segments[segments.length - 1] || '未知字段';
  const value = raw.value;
  const isPercent = PERCENT_FIELDS.some(k => field.includes(k));
  const num = typeof value === 'number' ? value : null;

  let opLabel: string;
  let display: string;
  let opClass: string;

  if (raw.op === 'delta' && num !== null) {
    if (num > 0) {
      opLabel = '+';
      opClass = 'op-up';
    } else if (num < 0) {
      opLabel = '−';
      opClass = 'op-down';
    } else {
      opLabel = '±';
      opClass = 'op-flat';
    }
    display = Math.abs(num) + (isPercent ? '%' : '');
  } else if (raw.op === 'replace') {
    opLabel = '=';
    opClass = 'op-set';
    if (num !== null) {
      display = String(num) + (isPercent ? '%' : '');
    } else if (typeof value === 'boolean') {
      display = value ? 'true' : 'false';
    } else {
      display = String(value);
    }
  } else {
    opLabel = '·';
    opClass = 'op-flat';
    display = String(value);
  }

  return { op: raw.op, owner, field, opLabel, display, opClass };
}

function parse(text?: string) {
  rawJson.value = '';
  ops.value = [];
  if (!text) return;
  const matches = [...String(text).matchAll(/<UpdateVariable>[\s\S]*?<JSONPatch>([\s\S]*?)<\/JSONPatch>[\s\S]*?<\/UpdateVariable>/g)];
  if (!matches.length) return;
  const last = matches[matches.length - 1][1];
  let parsed: any[];
  try {
    parsed = JSON.parse(last);
  } catch {
    return;
  }
  if (!Array.isArray(parsed)) return;
  rawJson.value = JSON.stringify(parsed, null, 2);
  ops.value = parsed
    .map(formatOp)
    .filter((op): op is ParsedOp => op !== null);
}

watch(() => props.currentMessage, msg => parse(msg?.message), { immediate: true });
</script>

<style scoped>
.update-group {
  border-top: 2px solid var(--char-color);
}

.op-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: 0.45rem;
  padding: 0.35rem 0.55rem;
}

.op-field {
  flex: 1;
  min-width: 0;
  font-size: 0.74rem;
  color: var(--text-primary);
  word-break: break-all;
}

.op-op {
  flex-shrink: 0;
  width: 1.1rem;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-faint);
}

.op-value {
  flex-shrink: 0;
  font-size: 0.78rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.op-up {
  color: var(--op-up);
}

.op-down {
  color: var(--op-down);
}

.op-set {
  color: var(--op-set);
}

.op-flat {
  color: var(--text-secondary);
}

.raw-toggle {
  border: 1px dashed var(--hairline);
  border-radius: 0.5rem;
  padding: 0.4rem 0.6rem;
}

.raw-toggle summary {
  list-style: none;
  cursor: pointer;
  user-select: none;
  font-size: 0.7rem;
  color: var(--text-secondary);
}

.raw-toggle summary::-webkit-details-marker {
  display: none;
}

.raw-toggle[open] summary {
  margin-bottom: 0.4rem;
}

.raw-json {
  font-family: Consolas, Monaco, monospace;
  font-size: 0.65rem;
  line-height: 1.5;
  color: var(--text-secondary);
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 14rem;
  overflow-y: auto;
  padding: 0.4rem;
  background: var(--track-color);
  border-radius: 0.35rem;
}
</style>
