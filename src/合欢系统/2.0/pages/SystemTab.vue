<template>
  <div>
    <div class="group">
      <div class="group-header" :class="{ expanded: expanded }" @click="expanded = !expanded">
        <i class="fa-solid fa-chevron-right"></i>
        <span>任务 ({{ tasks.length }})</span>
      </div>
      <div v-if="expanded" class="group-body">
        <div v-if="tasks.length">
          <div v-for="(t, i) in tasks" :key="i" class="task-item">
            <div class="task-dot" :class="t.状态 === '已完成' ? 'done' : t.状态 === '失败' ? 'failed' : ''"></div>
            <span class="task-name">{{ t.名称 || '未命名' }}</span>
            <span class="task-progress">{{ t.进度 || '—' }}</span>
          </div>
        </div>
        <div v-else class="empty">暂无任务</div>
      </div>
    </div>

    <div class="group">
      <div class="group-header" :class="{ expanded: expanded2 }" @click="expanded2 = !expanded2">
        <i class="fa-solid fa-chevron-right"></i>
        <span>已完成 ({{ completed.length }})</span>
      </div>
      <div v-if="expanded2" class="group-body">
        <div v-if="completed.length">
          <div v-for="(t, i) in completed" :key="i" style="padding: 4px 0; font-size: 12px; color: #666;">
            {{ t }}
          </div>
        </div>
        <div v-else class="empty">暂无记录</div>
      </div>
    </div>

    <div class="group">
      <div class="group-header" :class="{ expanded: expanded3 }" @click="expanded3 = !expanded3">
        <i class="fa-solid fa-chevron-right"></i>
        <span>里程碑 ({{ milestones.length }})</span>
      </div>
      <div v-if="expanded3" class="group-body">
        <div v-if="milestones.length">
          <div v-for="(m, i) in milestones" :key="i" style="padding: 4px 0; font-size: 12px;">
            <span class="tag green">{{ m }}</span>
          </div>
        </div>
        <div v-else class="empty">暂无记录</div>
      </div>
    </div>

    <div class="group">
      <div class="group-header" :class="{ expanded: expanded4 }" @click="expanded4 = !expanded4">
        <i class="fa-solid fa-chevron-right"></i>
        <span>行动建议</span>
      </div>
      <div v-if="expanded4" class="group-body">
        <div v-if="suggestions.length">
          <div v-for="(s, i) in suggestions" :key="i" style="padding: 4px 0; font-size: 12px; color: #666;">
            {{ i + 1 }}. {{ s }}
          </div>
        </div>
        <div v-else class="empty">暂无建议</div>
      </div>
    </div>

    <div v-if="systemSpace" class="group">
      <div class="group-header" :class="{ expanded: expanded5 }" @click="expanded5 = !expanded5">
        <i class="fa-solid fa-chevron-right"></i>
        <span>系统空间</span>
      </div>
      <div v-if="expanded5" class="group-body">
        <div class="row"><span class="row-label">在空间内</span><span class="row-value">{{ systemSpace.用户是否在空间内 ? '是' : '否' }}</span></div>
        <div class="row"><span class="row-label">时间暂停</span><span class="row-value">{{ systemSpace.外界时间是否暂停 ? '是' : '否' }}</span></div>
      </div>
    </div>

    <div v-if="tips.length" class="group">
      <div class="group-header" :class="{ expanded: expanded6 }" @click="expanded6 = !expanded6">
        <i class="fa-solid fa-chevron-right"></i>
        <span>系统提示 ({{ tips.length }})</span>
      </div>
      <div v-if="expanded6" class="group-body">
        <div v-for="(tip, i) in tips" :key="i" style="padding: 4px 0; font-size: 12px; color: #666;">
          {{ tip }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue';

interface TaskItem {
  名称?: string;
  进度?: string;
  状态?: string;
}

interface SystemSpace {
  用户是否在空间内?: boolean;
  外界时间是否暂停?: boolean;
}

const expanded = ref(true);
const expanded2 = ref(false);
const expanded3 = ref(false);
const expanded4 = ref(false);
const expanded5 = ref(false);
const expanded6 = ref(false);

const statData = inject<{ value: { 系统?: Record<string, unknown> } }>('statData');
const system = computed(() => statData?.value?.系统 || {});

const tasks = computed(() => (system.value?.当前任务 || []) as TaskItem[]);
const completed = computed(() => (system.value?.已完成任务 || []) as string[]);
const milestones = computed(() => (system.value?.已解锁里程碑 || []) as string[]);
const suggestions = computed(() => (system.value?.行动建议 || []) as string[]);
const tips = computed(() => (system.value?.系统提示 || []) as string[]);
const systemSpace = computed(() => system.value?.系统空间 as SystemSpace | undefined);
</script>
