<template>
  <div v-if="member" class="detail-layout">
    <div class="detail-hero">
      <button type="button" class="back-button" @click="$emit('back')">
        <i class="fa-solid fa-arrow-left"></i> 返回后宫
      </button>
      <span class="badge" :class="stageBadge(member.好感度)">{{ member.$好感阶段 || '陌生戒备' }}</span>
    </div>

    <div class="detail-head">
      <div class="avatar avatar-lg">{{ name.charAt(0) }}</div>
      <div class="min-w-0 flex-1">
        <div class="detail-name">{{ name }}</div>
        <div class="girl-sub">{{ member.种族身份 || '未登记' }} · {{ member.关系 || '—' }}</div>
      </div>
      <span class="badge" :class="member.处女 ? 'badge-trial' : 'badge-flower'">
        {{ member.处女 ? '处女' : '已破处' }}
      </span>
    </div>

    <div class="card">
      <div class="bar-block">
        <div>
          <div class="bar-label mb-1"><span>好感度</span><span>{{ member.好感度 ?? 0 }}</span></div>
          <div class="bar"><div class="bar-fill bar-affection" :style="{ width: clamp(member.好感度) + '%' }"></div></div>
        </div>
      </div>
    </div>

    <section class="card">
      <div class="card-title"><i class="fa-solid fa-user"></i> 人物档案</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">年龄</span>
          <span class="info-value">{{ member.年龄 ?? '—' }}岁</span>
        </div>
        <div class="info-item">
          <span class="info-label">种族身份</span>
          <span class="info-value">{{ member.种族身份 || '未登记' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">与主角关系</span>
          <span class="info-value">{{ member.关系 || '未登记' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">当前着装</span>
          <span class="info-value">{{ member.当前着装 || '未描述' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">当前姿势</span>
          <span class="info-value">{{ member.当前姿势 || '未描述' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">当前位置</span>
          <span class="info-value">{{ member.当前位置 || '未知' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">身体状态</span>
          <span class="info-value">{{ member.身体状态 || '健康状态良好' }}</span>
        </div>
      </div>
      <div class="quote">「{{ member.当前想法 || '她还没有说出此刻的想法' }}」</div>
    </section>

    <section class="card">
      <div class="card-title"><i class="fa-solid fa-face-smile"></i> 外貌信息</div>
      <div class="info-grid">
        <div class="info-item full">
          <span class="info-label">脸型</span>
          <span class="info-value">{{ member.外貌信息?.脸型 || '—' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">发型</span>
          <span class="info-value">{{ member.外貌信息?.发型 || '—' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">眼睛</span>
          <span class="info-value">{{ member.外貌信息?.眼睛 || '—' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">气质</span>
          <span class="info-value">{{ member.外貌信息?.气质 || '—' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">五官</span>
          <span class="info-value">{{ member.外貌信息?.五官 || '—' }}</span>
        </div>
      </div>
    </section>

    <section class="card">
      <div class="card-title"><i class="fa-solid fa-heart"></i> 情事与破处</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">处女</span>
          <span class="info-value">{{ member.处女 ? '是' : '否' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">高潮次数</span>
          <span class="info-value">{{ member.高潮次数 ?? 0 }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">被内射次数</span>
          <span class="info-value">{{ member.被内射次数 ?? 0 }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">破处记录</span>
          <span class="info-value">{{ member.破处记录 || '无' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">最近性行为</span>
          <span class="info-value">{{ member.最近性行为 || '无' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">胸部状态</span>
          <span class="info-value">{{ member.胸部状态 || '—' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">阴部状态</span>
          <span class="info-value">{{ member.阴部状态 || '—' }}</span>
        </div>
      </div>
    </section>

    <section class="card">
      <div class="card-title"><i class="fa-solid fa-child-reaching"></i> 身材信息</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">身高</span>
          <span class="info-value">{{ member.身材信息?.身高 || '—' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">体重</span>
          <span class="info-value">{{ member.身材信息?.体重 || '—' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">体型</span>
          <span class="info-value">{{ member.身材信息?.体型 || '—' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">三围</span>
          <span class="info-value">{{ member.身材信息?.三围 || '—' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">乳</span>
          <span class="info-value">{{ member.身材信息?.乳 || '—' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">腰</span>
          <span class="info-value">{{ member.身材信息?.腰 || '—' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">臀</span>
          <span class="info-value">{{ member.身材信息?.臀 || '—' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">腿</span>
          <span class="info-value">{{ member.身材信息?.腿 || '—' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">穴</span>
          <span class="info-value">{{ member.身材信息?.穴 || '—' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">皮肤</span>
          <span class="info-value">{{ member.身材信息?.皮肤 || '—' }}</span>
        </div>
        <div class="info-item full">
          <span class="info-label">体味</span>
          <span class="info-value">{{ member.身材信息?.体味 || '—' }}</span>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="empty-state">未找到这位佳丽的档案</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

interface Props {
  name: string;
}

interface Member {
  年龄?: number;
  种族身份?: string;
  关系?: string;
  好感度?: number;
  $好感阶段?: string;
  当前着装?: string;
  当前姿势?: string;
  当前位置?: string;
  当前想法?: string;
  处女?: boolean;
  破处记录?: string;
  最近性行为?: string;
  胸部状态?: string;
  阴部状态?: string;
  身体状态?: string;
  高潮次数?: number;
  被内射次数?: number;
  外貌信息?: {
    脸型?: string;
    发型?: string;
    眼睛?: string;
    气质?: string;
    五官?: string;
  };
  身材信息?: {
    身高?: string;
    体重?: string;
    体型?: string;
    三围?: string;
    乳?: string;
    腰?: string;
    臀?: string;
    腿?: string;
    穴?: string;
    皮肤?: string;
    体味?: string;
  };
}

const props = defineProps<Props>();
defineEmits<{ back: [] }>();
const store = useDataStore();

const member = computed<Member | null>(() => {
  return (store.data.后宫 && store.data.后宫[props.name]) || null;
});

function stageBadge(好感?: number): string {
  if (!好感) return 'badge-trial';
  if (好感 < 20) return 'badge-trial';
  if (好感 < 40) return 'badge-bronze';
  if (好感 < 60) return 'badge-silver';
  if (好感 < 80) return 'badge-gold';
  return 'badge-flower';
}

function clamp(value?: number): number {
  return Math.max(0, Math.min(100, value ?? 0));
}
</script>
