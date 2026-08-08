<template>
  <div v-if="girl" class="detail-layout">
    <div class="detail-hero">
      <button type="button" class="back-button" @click="$emit('back')">
        <i class="fa-solid fa-arrow-left"></i> 返回名册
      </button>
      <span class="badge" :class="levelBadge(girl.等级)">{{ girl.等级 || '未登记' }}</span>
    </div>

    <div class="detail-head">
      <div class="avatar avatar-lg">{{ name.charAt(0) }}</div>
      <div class="min-w-0 flex-1">
        <div class="detail-name">{{ name }}</div>
        <div class="girl-sub">{{ girl.年龄 }}岁 · {{ girl.职业 || '未登记' }} · {{ girl.恋情阶段 }}</div>
      </div>
      <span v-if="isPregnant" class="badge badge-pregnant"><i class="fa-solid fa-heart-pulse"></i>{{ girl.怀孕状态 }}</span>
    </div>

    <div class="card">
      <div class="bar-block">
        <div>
          <div class="bar-label mb-1"><span>好感度</span><span>{{ girl.好感度 ?? 0 }}</span></div>
          <div class="bar"><div class="bar-fill bar-affection" :style="{ width: clamp(girl.好感度) + '%' }"></div></div>
        </div>
        <div>
          <div class="bar-label mb-1"><span>欲望</span><span>{{ girl.欲望 ?? 0 }}</span></div>
          <div class="bar"><div class="bar-fill bar-desire" :style="{ width: clamp(girl.欲望) + '%' }"></div></div>
        </div>
      </div>
    </div>

    <section class="card">
      <div class="card-title"><i class="fa-solid fa-user"></i> 人物档案</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">年龄</span>
          <span class="info-value">{{ girl.年龄 }}岁</span>
        </div>
        <div class="info-item">
          <span class="info-label">职业</span>
          <span class="info-value">{{ girl.职业 || '未登记' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">出身</span>
          <span class="info-value">{{ girl.出身 || '未登记' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">性格</span>
          <span class="info-value">{{ girl.性格 || '未登记' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">外貌</span>
          <span class="info-value">{{ girl.外貌 || '未登记' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">身体状态</span>
          <span class="info-value">{{ girl.身体状态 || '未登记' }}</span>
        </div>
      </div>
      <div v-if="girl.性格标签?.length" class="tag-row">
        <span class="tag" v-for="tag in girl.性格标签" :key="tag">{{ tag }}</span>
      </div>
    </section>

    <section class="card">
      <div class="card-title"><i class="fa-solid fa-heart"></i> 关系与心意</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">心动对象</span>
          <span class="info-value">{{ girl.心动对象 || '暂无' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">专属恩客</span>
          <span class="info-value">{{ girl.专属恩客 || '暂无' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">恋情阶段</span>
          <span class="info-value">{{ girl.恋情阶段 }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">孕愿</span>
          <span class="info-value">{{ girl.孕愿 }}</span>
        </div>
      </div>
      <div class="quote">「{{ girl.当前想法 || '她还没有说出此刻的想法' }}」</div>
    </section>

    <section class="card">
      <div class="card-title"><i class="fa-solid fa-notes-medical"></i> 亲密与孕育</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">处女</span>
          <span class="info-value">{{ girl.处女 ? '是' : '否' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">性爱次数</span>
          <span class="info-value">{{ girl.性爱次数 ?? 0 }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">无套次数</span>
          <span class="info-value">{{ girl.无套次数 ?? 0 }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">内射次数</span>
          <span class="info-value">{{ girl.内射次数 ?? 0 }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">怀孕天数</span>
          <span class="info-value">{{ girl.怀孕天数 ?? 0 }} 天</span>
        </div>
        <div class="info-item">
          <span class="info-label">生产次数</span>
          <span class="info-value">{{ girl.生产次数 ?? 0 }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">累计奖励</span>
          <span class="info-value" style="color: var(--gold-strong);">{{ formatMoney(girl.累计奖励) }}</span>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="empty-state">未找到这位女孩的档案</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

interface Props {
  name: string;
}

interface GirlData {
  等级?: string;
  年龄?: number;
  职业?: string;
  恋情阶段?: string;
  好感度?: number;
  欲望?: number;
  出身?: string;
  性格?: string;
  外貌?: string;
  身体状态?: string;
  性格标签?: string[];
  心动对象?: string;
  专属恩客?: string;
  孕愿?: string;
  当前想法?: string;
  处女?: boolean;
  性爱次数?: number;
  无套次数?: number;
  内射次数?: number;
  怀孕状态?: string;
  怀孕天数?: number;
  生产次数?: number;
  累计奖励?: number;
}

const props = defineProps<Props>();
defineEmits<{ back: [] }>();
const store = useDataStore();

const girl = computed<GirlData | null>(() => {
  return store.data.女孩[props.name] || null;
});

const isPregnant = computed(() => {
  return !!girl.value?.怀孕状态 && girl.value.怀孕状态 !== '未孕';
});

function levelBadge(level?: string): string {
  const map: Record<string, string> = {
    试用生: 'badge-trial',
    铜铃: 'badge-bronze',
    银铃: 'badge-silver',
    金铃: 'badge-gold',
    花冠: 'badge-flower',
    孕妃: 'badge-mother',
  };
  return map[level || '试用生'] || 'badge-trial';
}

function clamp(value?: number): number {
  return Math.max(0, Math.min(100, value ?? 0));
}

function formatMoney(value?: number): string {
  const amount = Number(value || 0);
  if (amount >= 100000000) return `¥${(amount / 100000000).toFixed(1)}亿`;
  if (amount >= 10000) return `¥${(amount / 10000).toFixed(amount >= 1000000 ? 0 : 1)}万`;
  return `¥${amount.toLocaleString()}`;
}
</script>
