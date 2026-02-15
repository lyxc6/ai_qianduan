<template>
  <div class="character-detail-body">
    <div class="character-info-section">
      <div class="section-title">主角信息</div>
      <div class="info-group">
        <div class="info-item">
          <div class="info-label">姓名</div>
          <div class="info-value">{{ character.姓名 || '' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">年龄</div>
          <div class="info-value">{{ character.年龄 || '' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">身份</div>
          <div class="info-value">{{ character.身份 || '' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">境界</div>
          <div class="info-value">{{ character.境界 || '' }}</div>
        </div>
      </div>
      <div class="character-inventory-section">
        <h3 class="section-title">秘密知晓</h3>
        <div class="martial-arts-container">
          <div v-if="!secrets || secrets.length === 0" class="no-items">暂无秘密</div>
          <div v-else v-for="(secret, index) in secrets" :key="index" class="martial-art-item">
            <div class="martial-art-name">{{ secret }}</div>
          </div>
        </div>
      </div>
      <div class="character-inventory-section">
        <h3 class="section-title">功法与技能</h3>
        <div class="martial-arts-container">
          <div v-if="!skills || skills.length === 0" class="no-items">暂无功法与技能</div>
          <div v-else v-for="(skill, index) in skills" :key="index" class="martial-art-item">
            <div class="martial-art-name">{{ skill }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="character-info-section">
      <div class="section-title">合欢谷信息</div>
      <div class="info-group">
        <div class="info-item">
          <div class="info-label">谷内人数</div>
          <div class="info-value">{{ valley.谷内人数 || '' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">弟子数量</div>
          <div class="info-value">{{ valley.弟子数量 || '' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">后宫规模</div>
          <div class="info-value">{{ valley.后宫规模 || '' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">谷内状态</div>
          <div class="info-value">{{ valley.谷内状态 || '' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">外界认知</div>
          <div class="info-value">{{ valley.外界认知 || '' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">阵法状态</div>
          <div class="info-value">{{ valley.阵法状态 || '' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">资源状况</div>
          <div class="info-value">{{ valley.资源状况 || '' }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">当前任务</div>
          <div class="info-value">{{ valley.当前任务 || '' }}</div>
        </div>
      </div>
      <div class="character-inventory-section">
        <h3 class="section-title">待办事项</h3>
        <div class="martial-arts-container">
          <div v-if="!todos || todos.length === 0" class="no-items">暂无待办事项</div>
          <div v-else v-for="(todo, index) in todos" :key="index" class="martial-art-item">
            <div class="martial-art-name">{{ todo }}</div>
          </div>
        </div>
      </div>
      <div class="character-inventory-section">
        <h3 class="section-title">统治范围</h3>
        <div class="martial-arts-container">
          <div v-if="!territories || territories.length === 0" class="no-items">暂无统治范围</div>
          <div v-else v-for="(territory, index) in territories" :key="index" class="martial-art-item">
            <div class="martial-art-name">{{ territory }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  statData: {
    主角?: {
      姓名?: string;
      年龄?: string;
      身份?: string;
      境界?: string;
      秘密知晓?: string[];
      功法与技能?: string[];
    };
    合欢谷?: {
      谷内人数?: string;
      弟子数量?: string;
      后宫规模?: string;
      谷内状态?: string;
      外界认知?: string;
      阵法状态?: string;
      资源状况?: string;
      当前任务?: string;
      待办事项?: string[];
      统治范围?: string[];
    };
  };
}

const props = defineProps<Props>();

const character = computed(() => props.statData?.主角 || {});
const valley = computed(() => props.statData?.合欢谷 || {});
const secrets = computed(() => props.statData?.主角?.秘密知晓 || []);
const skills = computed(() => props.statData?.主角?.功法与技能 || []);
const todos = computed(() => props.statData?.合欢谷?.待办事项 || []);
const territories = computed(() => props.statData?.合欢谷?.统治范围 || []);
</script>

<style lang="scss">
.character-detail-body {
  padding: 0.5rem;
}

.character-info-section {
  background: linear-gradient(135deg, rgba(43, 29, 14, 0.6) 0%, rgba(62, 42, 20, 0.4) 100%);
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-left: 3px solid var(--accent-color);
}

.info-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  min-width: 30%;
  flex: 1;
}

.info-label {
  font-family: var(--font-title);
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
  letter-spacing: 1px;
}

.info-value {
  font-family: var(--font-serif);
  font-size: 0.85rem;
  color: var(--text-primary);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.status-section {
  background: linear-gradient(135deg, rgba(43, 29, 14, 0.6) 0%, rgba(62, 42, 20, 0.4) 100%);
  border-radius: 0.5rem;
  padding: 0.75rem;
}

.section-header {
  font-family: var(--font-title);
  font-size: 0.9rem;
  color: var(--text-title);
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
  letter-spacing: 2px;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.status-item {
  display: flex;
  flex-direction: column;
}

.status-label {
  font-family: var(--font-title);
  font-size: 0.7rem;
  color: var(--text-secondary);
  margin-bottom: 0.2rem;
  letter-spacing: 1px;
}

.status-value {
  font-family: var(--font-serif);
  font-size: 0.8rem;
  color: var(--text-primary);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  line-height: 1.4;
}

.character-inventory-section {
  border-top: 1px solid var(--border-color);
  padding-top: 0.75rem;
  margin-top: 0.5rem;
}

.section-title {
  font-family: var(--font-title);
  font-size: 0.9rem;
  color: var(--text-title);
  margin-bottom: 0.5rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid rgba(212, 177, 106, 0.2);
  letter-spacing: 1px;
}

.martial-arts-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.martial-art-item {
  background: linear-gradient(135deg, rgba(62, 42, 20, 0.6) 0%, rgba(43, 29, 14, 0.8) 100%);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background: linear-gradient(135deg, rgba(72, 49, 23, 0.7) 0%, rgba(50, 34, 16, 0.85) 100%);
    border-color: var(--user-color-primary);
    transform: translateX(2px);
  }
}

.martial-art-name {
  font-family: var(--font-serif);
  font-size: 0.85rem;
  color: var(--text-primary);
  line-height: 1.4;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.no-items {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  color: var(--text-secondary);
  font-family: var(--font-serif);
  font-size: 0.8rem;
  font-style: italic;
}
</style>
