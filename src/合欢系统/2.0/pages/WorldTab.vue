<template>
  <div>
    <div class="group">
      <div class="group-header" :class="{ expanded: expanded }" @click="expanded = !expanded">
        <i class="fa-solid fa-chevron-right"></i>
        <span>世界状态</span>
      </div>
      <div v-if="expanded" class="group-body">
        <div class="row"><span class="row-label">时间</span><span class="row-value">{{ data.当前时间 || '—' }}</span></div>
        <div class="row"><span class="row-label">地点</span><span class="row-value">{{ data.当前地点 || '—' }}</span></div>
        <div class="row"><span class="row-label">主线阶段</span><span class="row-value">{{ data.当前主线阶段 || '—' }}</span></div>
        <div class="row"><span class="row-label">发展等级</span><span class="row-value">{{ data.合欢宗发展等级 || '—' }}</span></div>
        <div class="row"><span class="row-label">商城等级</span><span class="row-value">{{ data.商城等级 || '—' }}</span></div>
        <div class="row"><span class="row-label">权限等级</span><span class="row-value">{{ data.系统权限等级 || '—' }}</span></div>
        <div class="row"><span class="row-label">外界时间</span><span class="row-value">{{ data.外界时间状态 || '—' }}</span></div>
      </div>
    </div>

    <div class="group">
      <div class="group-header" :class="{ expanded: expanded2 }" @click="expanded2 = !expanded2">
        <i class="fa-solid fa-chevron-right"></i>
        <span>名望</span>
      </div>
      <div v-if="expanded2" class="group-body">
        <div class="row"><span class="row-label">校园名望</span><span class="row-value">{{ data.校园名望 ?? '—' }}</span></div>
        <div class="row"><span class="row-label">城市名望</span><span class="row-value">{{ data.城市名望 ?? '—' }}</span></div>
      </div>
    </div>

    <div class="group">
      <div class="group-header" :class="{ expanded: expanded3 }" @click="expanded3 = !expanded3">
        <i class="fa-solid fa-chevron-right"></i>
        <span>风险</span>
      </div>
      <div v-if="expanded3" class="group-body">
        <div class="row"><span class="row-label">社交风险</span><span class="row-value">{{ data.社交风险值 ?? '—' }}</span></div>
        <div class="row"><span class="row-label">曝光风险</span><span class="row-value">{{ data.曝光风险值 ?? '—' }}</span></div>
      </div>
    </div>

    <div v-if="keyTargets.length" class="group">
      <div class="group-header" :class="{ expanded: expanded4 }" @click="expanded4 = !expanded4">
        <i class="fa-solid fa-chevron-right"></i>
        <span>重点目标</span>
      </div>
      <div v-if="expanded4" class="group-body">
        <div style="padding: 4px 0;">
          <span v-for="t in keyTargets" :key="t" class="tag">{{ t }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue';

const expanded = ref(true);
const expanded2 = ref(true);
const expanded3 = ref(true);
const expanded4 = ref(true);

const statData = inject<{ value: Record<string, Record<string, unknown>> }>('statData');
const data = computed(() => statData?.value?.世界 || {});

const keyTargets = computed(() => {
  const arr = data.value?.当前重点目标;
  return Array.isArray(arr) ? arr as string[] : [];
});
</script>
