<template>
  <div class="overview-grid">
    <section class="card">
      <div class="card-title"><i class="fa-solid fa-user"></i> 掌门</div>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">姓名</span>
          <span class="info-value">{{ displayName }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">身份</span>
          <span class="info-value">{{ store.data.玩家.身份 || '掌门' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">性别</span>
          <span class="info-value">{{ store.data.玩家.性别 }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">年龄</span>
          <span class="info-value">{{ store.data.玩家.年龄 }}岁</span>
        </div>
      </div>
      <div class="divider"></div>
      <div class="bar-block">
        <div class="bar-label">
          <span>{{ store.data.玩家.修为境界 }}</span>
          <span>{{ store.data.玩家.修为进度 }}/100</span>
        </div>
        <div class="bar">
          <div class="bar-fill bar-cultivation" :style="{ width: clamp(store.data.玩家.修为进度) + '%' }"></div>
        </div>
      </div>
      <div class="info-grid" style="margin-top: 0.45rem">
        <div class="info-item">
          <span class="info-label">功法</span>
          <span class="info-value">{{ store.data.玩家.功法 || '—' }}</span>
        </div>
      </div>
    </section>

    <section class="card">
      <div class="card-title"><i class="fa-solid fa-coins"></i> 身家</div>
      <div class="stat-rows">
        <div class="stat-row"><span>个人灵石</span><b class="money">{{ store.data.玩家.灵石 }}</b></div>
        <div class="stat-row"><span>贡献点</span><b class="money">{{ store.data.玩家.贡献点 }}</b></div>
      </div>
      <div class="divider"></div>
      <div class="stat-rows">
        <div class="stat-row"><span>宗门灵石</span><b class="money gold">{{ store.data.世界.灵石 }}</b></div>
        <div class="stat-row"><span>宗门声望</span><b>{{ store.data.世界.声望 }}/100</b></div>
      </div>
    </section>

    <section class="card focus-card">
      <div class="card-title"><i class="fa-solid fa-bullseye"></i> 当前目标</div>
      <div class="stat-rows">
        <div class="stat-row"><span>目标</span><b>{{ store.data.玩家.当前目标 || '—' }}</b></div>
        <div class="stat-row"><span>想法</span><b>{{ store.data.玩家.当前想法 || '—' }}</b></div>
      </div>
      <div class="quote">「{{ store.data.玩家.当前想法 || '云梦仙宗的故事，才刚刚开始。' }}」</div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();

const displayName = computed(() => store.data.玩家.姓名 || '{{user}}');

function clamp(value?: number): number {
  return Math.max(0, Math.min(100, value ?? 0));
}
</script>
