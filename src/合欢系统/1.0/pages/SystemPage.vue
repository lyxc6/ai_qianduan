<template>
  <div>
    <div class="hh-page-header">
      <BackButton />
      <div class="hh-page-title">合欢系统APP</div>
    </div>
    <div class="hh-content">
      <div class="hh-card">
        <div class="hh-card-title">系统状态</div>
        <div class="hh-row"><span class="hh-label">时间</span><span class="hh-value">{{ world.当前时间 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">地点</span><span class="hh-value">{{ world.当前地点 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">阶段</span><span class="hh-value">{{ world.当前主线阶段 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">发展</span><span class="hh-value">{{ world.合欢宗发展等级 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">商城</span><span class="hh-value">{{ world.商城等级 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">权限</span><span class="hh-value">{{ world.系统权限等级 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">外界时间</span><span class="hh-value">{{ world.外界时间状态 || '—' }}</span></div>
      </div>

      <div class="hh-card">
        <div class="hh-card-title">名望</div>
        <div class="hh-row"><span class="hh-label">校园</span><span class="hh-value">{{ world.校园名望 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">城市</span><span class="hh-value">{{ world.城市名望 || '—' }}</span></div>
      </div>

      <div class="hh-card">
        <div class="hh-card-title">风险</div>
        <div class="hh-row"><span class="hh-label">社交</span><span class="hh-value">{{ world.社交风险值 || '—' }}</span></div>
        <div class="hh-row"><span class="hh-label">曝光</span><span class="hh-value">{{ world.曝光风险值 || '—' }}</span></div>
      </div>

      <div class="hh-card">
        <div class="hh-card-title">系统空间</div>
        <div class="hh-row"><span class="hh-label">用户在内</span><span class="hh-value">{{ systemInSpace ? '是' : '否' }}</span></div>
        <div class="hh-row"><span class="hh-label">外界时间</span><span class="hh-value">{{ timePaused ? '暂停' : '正常' }}</span></div>
        <div v-if="spaceItems.length" class="hh-row">
          <span class="hh-label">物品</span>
          <span class="hh-value">{{ spaceItems.length }}件</span>
        </div>
      </div>

      <div v-if="keyTargets.length" class="hh-card">
        <div class="hh-card-title">当前重点目标</div>
        <div class="hh-tag-container">
          <span v-for="t in keyTargets" :key="t" class="hh-tag">{{ t }}</span>
        </div>
      </div>

      <div v-if="tips.length" class="hh-tips">
        <div class="hh-tips-title">最近提示</div>
        <div class="hh-tag-container">
          <span v-for="(tip, i) in tips" :key="i" class="hh-tag">{{ tip }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import BackButton from '../components/BackButton.vue';

interface SpaceItem {
  数量?: number;
  描述?: string;
}

interface SystemSpace {
  用户是否在空间内?: boolean;
  外界时间是否暂停?: boolean;
  物品?: Record<string, SpaceItem>;
}

interface StatData {
  世界?: Record<string, unknown>;
  系统?: {
    系统空间?: SystemSpace;
    系统提示?: string[];
  };
}

const statData = inject<{ value: StatData }>('statData');

const world = computed(() => statData?.value?.世界 || {});
const system = computed(() => statData?.value?.系统 || {});

const tips = computed(() => {
  const arr = system.value?.系统提示;
  return Array.isArray(arr) ? arr as string[] : [];
});

const keyTargets = computed(() => {
  const arr = world.value?.当前重点目标;
  return Array.isArray(arr) ? arr as string[] : [];
});

const systemInSpace = computed(() => {
  const s = system.value?.系统空间;
  return s?.用户是否在空间内;
});

const timePaused = computed(() => {
  const s = system.value?.系统空间;
  return s?.外界时间是否暂停;
});

const spaceItems = computed(() => {
  const s = system.value?.系统空间;
  return s?.物品 ? Object.values(s.物品) : [];
});
</script>
