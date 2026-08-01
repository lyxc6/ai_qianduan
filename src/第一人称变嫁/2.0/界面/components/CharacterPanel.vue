<template>
  <div class="flex flex-col gap-3 pb-1">
    <section class="section-card head-card">
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0">
          <div class="head-name">{{ name }}</div>
          <div class="mt-1.5 flex flex-wrap gap-1.5">
            <span class="chip">{{ age }}岁</span>
            <span v-for="(it, i) in identity" :key="i" class="chip">{{ it }}</span>
            <span v-if="hasVirgin" class="chip">处女：{{ isVirgin ? '是' : '否' }}</span>
          </div>
        </div>
        <span v-if="stageLabel" class="stage-badge" :class="stageClass">{{ stageLabel }}</span>
      </div>
    </section>

    <section v-if="coreStats.length" class="section-card">
      <div class="section-title mb-2">关系状态</div>
      <div class="grid grid-cols-3 gap-2">
        <div v-for="stat in coreStats" :key="stat.label" class="ring-item">
          <div class="ring-wrap">
            <svg viewBox="0 0 48 48" class="ring-svg">
              <circle cx="24" cy="24" r="20" class="ring-track"></circle>
              <circle
                cx="24"
                cy="24"
                r="20"
                class="ring-fill"
                :class="stat.kind === 'fall' ? 'ring-fill-rose' : ''"
                :style="{ strokeDashoffset: ringOffset(stat.pct) }"
              ></circle>
            </svg>
            <div class="ring-value">{{ stat.text }}</div>
          </div>
          <div class="ring-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <section v-if="physChips.length" class="section-card">
      <div class="section-title mb-2">生理状态</div>
      <div class="flex flex-wrap gap-1.5">
        <span class="data-chip" v-for="c in physChips" :key="c.label">
          <b>{{ c.label }}</b>{{ c.value }}
        </span>
      </div>
    </section>

    <details v-if="devStats.length" class="section-card collapsible">
      <summary class="section-title">
        开发与反应
        <span class="summary-count">{{ devSummary }}</span>
      </summary>
      <div class="mt-2.5 flex flex-col gap-2">
        <div v-for="s in devStats" :key="s.label" class="bar-row">
          <span class="bar-label">{{ s.label }}</span>
          <div class="progress-track">
            <div class="progress-fill" :class="s.grad" :style="{ width: s.pct + '%' }"></div>
          </div>
          <span class="bar-value">{{ s.text }}</span>
        </div>
      </div>
    </details>

    <details v-if="sensStats.length" class="section-card collapsible">
      <summary class="section-title">
        敏感部位
        <span class="summary-count">{{ sensStats.length }} 处</span>
      </summary>
      <div class="mt-2.5 flex flex-col gap-2">
        <div v-for="s in sensStats" :key="s.label" class="bar-row">
          <span class="bar-label">{{ s.label }}</span>
          <div class="progress-track">
            <div class="progress-fill grad-sens" :style="{ width: s.pct + '%' }"></div>
          </div>
          <span class="bar-value">{{ s.text }}</span>
        </div>
      </div>
    </details>

    <section v-if="notes.length" class="section-card">
      <div class="section-title mb-2">角色特点</div>
      <div class="flex flex-col gap-1.5">
        <div v-for="n in notes" :key="n.label" class="note-row">
          <span class="note-label">{{ n.label }}</span>
          <span class="note-value">{{ n.value }}</span>
        </div>
      </div>
    </section>

    <section v-if="wardrobe.length" class="section-card">
      <div class="section-title mb-2">着装与身体</div>
      <div class="grid grid-cols-3 gap-1.5 sm:grid-cols-4">
        <div v-for="w in wardrobe" :key="w.label" class="wardrobe-item">
          <div class="wardrobe-label">{{ w.label }}</div>
          <div class="wardrobe-value">{{ w.value }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  name: string;
  age: number;
  identity: string[];
  character: Record<string, any>;
  notes?: { label: string; value: string }[];
}

const props = withDefaults(defineProps<Props>(), {
  notes: () => [],
});

const C = 2 * Math.PI * 20;

const character = computed(() => props.character || {});

const hasVirgin = computed(() => typeof character.value['处女'] === 'boolean');
const isVirgin = computed(() => character.value['处女'] === true);

const stageLabel = computed(() => character.value['攻略阶段'] || '');
const stageClass = computed(() => {
  const s = stageLabel.value;
  const map: Record<string, string> = {
    抗拒期: 'stage-resist',
    驯化期: 'stage-tame',
    沦陷期: 'stage-fall',
    狩猎期: 'stage-hunt',
    确认期: 'stage-confirm',
    守护期: 'stage-guard',
  };
  return map[s] || '';
});

interface RingStat {
  label: string;
  text: string;
  pct: number;
  kind: string;
}

const coreStats = computed<RingStat[]>(() => {
  const stats: RingStat[] = [];
  for (const [key, value] of Object.entries(character.value)) {
    if (key.startsWith('好感对')) {
      const num = Number(value) || 0;
      stats.push({
        label: key.slice(3),
        text: String(num),
        pct: Math.min(100, Math.max(0, num / 10)),
        kind: 'like',
      });
    }
  }
  if (character.value['沦陷'] !== undefined) {
    const num = Number(character.value['沦陷']) || 0;
    stats.push({
      label: '沦陷',
      text: num + '%',
      pct: Math.min(100, Math.max(0, num)),
      kind: 'fall',
    });
  }
  return stats;
});

interface ChipStat {
  label: string;
  value: string;
}

const physChips = computed<ChipStat[]>(() => {
  const c = character.value;
  const chips: ChipStat[] = [];
  const fields: [string, string][] = [
    ['生理阶段', '安全期'],
    ['生理天数', '1'],
    ['经验等级', '0'],
    ['亲密状态', '正常'],
    ['上次经期', '无'],
    ['高潮次数', '0'],
  ];
  for (const [key, fallback] of fields) {
    if (c[key] !== undefined && c[key] !== null) {
      chips.push({ label: key, value: String(c[key]) });
    }
  }
  return chips;
});

interface BarStat {
  label: string;
  text: string;
  pct: number;
  grad: string;
}

const devStats = computed<BarStat[]>(() => {
  const c = character.value;
  const stats: BarStat[] = [];
  const devFields = ['胸部开发', '阴蒂开发', '阴道开发', '后庭开发'];
  for (const key of devFields) {
    if (c[key] !== undefined && c[key] !== null) {
      const num = Number(c[key]) || 0;
      stats.push({ label: key, text: num + '%', pct: Math.min(100, Math.max(0, num)), grad: 'grad-dev' });
    }
  }
  const exciteFields: [string, string][] = [
    ['兴奋度', 'grad-rose'],
    ['湿润度', 'grad-rose'],
  ];
  for (const [key, grad] of exciteFields) {
    if (c[key] !== undefined && c[key] !== null) {
      const num = Number(c[key]) || 0;
      stats.push({ label: key, text: num + '%', pct: Math.min(100, Math.max(0, num)), grad });
    }
  }
  return stats;
});

const devSummary = computed(() => {
  const c = character.value;
  const parts: string[] = [];
  if (c['兴奋度'] !== undefined) parts.push('兴奋 ' + c['兴奋度'] + '%');
  if (c['湿润度'] !== undefined) parts.push('湿润 ' + c['湿润度'] + '%');
  if (!parts.length && c['胸部开发'] !== undefined) parts.push('开发 ' + c['胸部开发'] + '%');
  return parts.join(' · ') || '—';
});

const sensStats = computed<BarStat[]>(() => {
  const c = character.value;
  const stats: BarStat[] = [];
  const fields = ['耳朵敏感', '后颈敏感', '腰部敏感', '大腿内侧敏感', '胸部敏感', '阴蒂敏感'];
  for (const key of fields) {
    if (c[key] !== undefined && c[key] !== null) {
      const num = Number(c[key]) || 0;
      stats.push({
        label: key.replace('敏感', ''),
        text: num + '%',
        pct: Math.min(100, Math.max(0, num)),
        grad: 'grad-sens',
      });
    }
  }
  return stats;
});

const wardrobe = computed<ChipStat[]>(() => {
  const c = character.value;
  const fields = ['当前头发', '当前上装', '当前下装', '当前内衣', '当前袜子', '当前鞋子', '当前饰品', '当前胸部', '当前阴部'];
  const items: ChipStat[] = [];
  for (const key of fields) {
    if (c[key] !== undefined && c[key] !== null) {
      items.push({ label: key.replace('当前', ''), value: String(c[key]) || '无' });
    }
  }
  return items;
});

function ringOffset(pct: number) {
  const clamped = Math.min(100, Math.max(0, pct));
  return String(C * (1 - clamped / 100));
}
</script>

<style scoped>
.head-card {
  background: linear-gradient(135deg, var(--char-bg) 0%, var(--surface) 70%);
  border-color: var(--char-border);
}

.head-name {
  font-family: var(--font-title);
  font-size: 1.35rem;
  line-height: 1.15;
  color: var(--char-deep);
  letter-spacing: 0.1em;
}

.ring-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.ring-wrap {
  position: relative;
  width: 3.6rem;
  height: 3.6rem;
}

.ring-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.ring-track {
  fill: none;
  stroke: var(--track-color);
  stroke-width: 3.5;
}

.ring-fill {
  fill: none;
  stroke: var(--char-color);
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-dasharray: 125.66;
  transition: stroke-dashoffset 0.7s ease;
}

.ring-fill-rose {
  stroke: var(--rose-grad-b);
}

.ring-value {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
}

.ring-label {
  font-size: 0.68rem;
  color: var(--text-secondary);
}

.note-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.note-label {
  min-width: 3rem;
  font-size: 0.68rem;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.note-value {
  font-size: 0.74rem;
  color: var(--text-primary);
}

.wardrobe-item {
  background: var(--char-bg);
  border: 1px solid var(--char-border);
  border-radius: 0.5rem;
  padding: 0.4rem 0.35rem;
  text-align: center;
  min-width: 0;
}

.wardrobe-label {
  font-size: 0.66rem;
  color: var(--text-secondary);
  margin-bottom: 0.18rem;
}

.wardrobe-value {
  font-size: 0.72rem;
  color: var(--text-primary);
  word-break: break-all;
  line-height: 1.35;
}
</style>
