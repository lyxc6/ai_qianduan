<template>
  <div class="school-rules-container">
    <div class="rules-section">
      <div class="section-title">日常规范</div>
      <div class="rules-list">
        <div v-for="(rule, index) in dailyRules" :key="index" class="rule-item">
          <div class="rule-icon">{{ rule.icon }}</div>
          <div class="rule-content">
            <div class="rule-title">{{ rule.title }}</div>
            <div class="rule-desc">{{ rule.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="rules-section">
      <div class="section-title">着装要求</div>
      <div class="dress-code">
        <div v-for="(dress, index) in dressCodes" :key="index" class="dress-item">
          <div class="dress-label">{{ dress.day }}</div>
          <div class="dress-value">{{ dress.style }}</div>
        </div>
      </div>
    </div>

    <div class="rules-section">
      <div class="section-title">行为准则</div>
      <div class="behavior-list">
        <div v-for="(behavior, index) in behaviorRules" :key="index" class="behavior-item">
          <span class="behavior-icon">{{ behavior.icon }}</span>
          <span class="behavior-text">{{ behavior.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  statData: {
    校规?: {
      日常规范?: Array<{ icon?: string; title?: string; desc?: string }>;
      着装要求?: Array<{ day?: string; style?: string }>;
      行为准则?: Array<{ icon?: string; text?: string }>;
    };
  };
}

const props = defineProps<Props>();

const defaultDailyRules = [
  { icon: '📅', title: '考勤制度', desc: '按时上课，不得迟到早退' },
  { icon: '💍', title: '佩戴身份标识', desc: '必须佩戴学生项圈' },
  { icon: '🍽️', title: '膳食时间', desc: '按规定时间用餐' },
  { icon: '🏠', title: '住宿规定', desc: '必须在校住宿' },
];

const defaultDressCodes = [
  { day: '周一', style: '校服正装' },
  { day: '周二', style: '体操服' },
  { day: '周三', style: '泳装' },
  { day: '周四', style: '校服正装' },
  { day: '周五', style: '自由着装' },
  { day: '周末', style: '便装' },
];

const defaultBehaviorRules = [
  { icon: '✅', text: '服从教师指令' },
  { icon: '✅', text: '保持身体清洁' },
  { icon: '✅', text: '按时完成作业' },
  { icon: '✅', text: '遵守项圈佩戴规定' },
  { icon: '✅', text: '配合身体检查' },
  { icon: '✅', text: '禁止反抗管理' },
];

const dailyRules = computed(() => props.statData?.校规?.日常规范 || defaultDailyRules);
const dressCodes = computed(() => props.statData?.校规?.着装要求 || defaultDressCodes);
const behaviorRules = computed(() => props.statData?.校规?.行为准则 || defaultBehaviorRules);
</script>

<style lang="scss">
.school-rules-container {
  height: 100%;
  overflow-y: auto;
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.rules-section {
  background: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.6rem;
}

.section-title {
  font-family: var(--font-title);
  font-size: 0.85rem;
  color: var(--user-color-primary);
  margin-bottom: 0.5rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid rgba(255, 183, 178, 0.2);
  letter-spacing: 1px;
}

.rules-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.rule-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.35rem;
  background: rgba(255, 183, 178, 0.1);
  border-radius: 0.35rem;
}

.rule-icon {
  font-size: 1rem;
  flex-shrink: 0;
}

.rule-content {
  flex: 1;
}

.rule-title {
  font-family: var(--font-title);
  font-size: 0.75rem;
  color: var(--text-primary);
  margin-bottom: 0.15rem;
}

.rule-desc {
  font-family: var(--font-serif);
  font-size: 0.65rem;
  color: var(--text-secondary);
  line-height: 1.3;
}

.dress-code {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.35rem;
}

.dress-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.35rem 0.5rem;
  background: rgba(255, 183, 178, 0.1);
  border-radius: 0.35rem;
}

.dress-label {
  font-family: var(--font-title);
  font-size: 0.7rem;
  color: var(--user-color-primary);
}

.dress-value {
  font-family: var(--font-serif);
  font-size: 0.65rem;
  color: var(--text-primary);
}

.behavior-list {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.behavior-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.4rem;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 0.3rem;
}

.behavior-icon {
  font-size: 0.8rem;
}

.behavior-text {
  font-family: var(--font-serif);
  font-size: 0.7rem;
  color: var(--text-primary);
}
</style>
