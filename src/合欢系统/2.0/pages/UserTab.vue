<template>
  <div>
    <div class="group">
      <div class="group-header" :class="{ expanded: expanded }" @click="expanded = !expanded">
        <i class="fa-solid fa-chevron-right"></i>
        <span>基本信息</span>
      </div>
      <div v-if="expanded" class="group-body">
        <div class="row"><span class="row-label">姓名</span><span class="row-value accent">{{ data.姓名 || '—' }}</span></div>
        <div class="row"><span class="row-label">性别</span><span class="row-value">{{ data.性别 || '—' }}</span></div>
        <div class="row"><span class="row-label">综合</span><span class="row-value accent">{{ data.综合评分 ?? '—' }} / {{ data.综合等级 || '—' }}</span></div>
        <div class="row"><span class="row-label">容貌</span><span class="row-value">{{ data.容貌 ?? '—' }}</span></div>
        <div class="row"><span class="row-label">气质</span><span class="row-value">{{ data.气质 ?? '—' }}</span></div>
        <div class="row"><span class="row-label">身材</span><span class="row-value">{{ data.身材 ?? '—' }}</span></div>
      </div>
    </div>

    <div class="group">
      <div class="group-header" :class="{ expanded: expanded2 }" @click="expanded2 = !expanded2">
        <i class="fa-solid fa-chevron-right"></i>
        <span>数值</span>
      </div>
      <div v-if="expanded2" class="group-body">
        <div class="row"><span class="row-label">合欢值</span><span class="row-value accent">{{ data.合欢值 ?? 0 }}</span></div>
        <div class="row"><span class="row-label">累计获得</span><span class="row-value">{{ data.累计获得合欢值 ?? 0 }}</span></div>
        <div class="row"><span class="row-label">累计消费</span><span class="row-value">{{ data.累计消费合欢值 ?? 0 }}</span></div>
        <div class="row"><span class="row-label">现金</span><span class="row-value">{{ data.现金 ?? 0 }}</span></div>
        <div class="row"><span class="row-label">双修目标</span><span class="row-value">{{ data.已有效双修不同目标数 ?? 0 }}</span></div>
        <div class="row"><span class="row-label">双修次数</span><span class="row-value">{{ data.有效双修总次数 ?? 0 }}</span></div>
      </div>
    </div>

    <div v-if="statuses.length" class="group">
      <div class="group-header" :class="{ expanded: expanded3 }" @click="expanded3 = !expanded3">
        <i class="fa-solid fa-chevron-right"></i>
        <span>当前状态</span>
      </div>
      <div v-if="expanded3" class="group-body">
        <div style="padding: 4px 0;">
          <span v-for="(s, i) in statuses" :key="i" class="tag">{{ s }}</span>
        </div>
      </div>
    </div>

    <div v-if="milestones.length" class="group">
      <div class="group-header" :class="{ expanded: expanded4 }" @click="expanded4 = !expanded4">
        <i class="fa-solid fa-chevron-right"></i>
        <span>现金里程碑</span>
      </div>
      <div v-if="expanded4" class="group-body">
        <div style="padding: 4px 0;">
          <span v-for="(m, i) in milestones" :key="i" class="tag green">{{ m }}</span>
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
const data = computed(() => (statData?.value?.用户 || {}) as Record<string, unknown>);

const statuses = computed(() => {
  const arr = data.value?.当前生效状态;
  return Array.isArray(arr) ? arr as string[] : [];
});

const milestones = computed(() => {
  const arr = data.value?.已领取现金里程碑;
  return Array.isArray(arr) ? arr as string[] : [];
});
</script>
