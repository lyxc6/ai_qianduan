<template>
  <div class="character-detail-body">
    <div v-if="characterType === '女主'" class="character-info-section">
      <div class="character-header">
        <span class="character-header-name">{{ 女主角.姓名 || '加载中...' }}</span>
        <span class="character-header-tag">女主</span>
      </div>

      <div class="info-section">
        <div class="section-title">基本信息</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">姓名</div>
            <div class="info-value">{{ 女主角.姓名 || '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">原名</div>
            <div class="info-value">{{ 女主角.原名 || '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">年龄</div>
            <div class="info-value">{{ 女主角.年龄 !== undefined ? 女主角.年龄 + '岁' : '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">性别</div>
            <div class="info-value">{{ 女主角.性别 || '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">武功境界</div>
            <div class="info-value">{{ 女主角.武功境界 || '0' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">身份</div>
            <div class="info-value">{{ 女主角.身份 || '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">目标</div>
            <div class="info-value">{{ 女主角.目标 || '不存在' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">人际关系</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">对男主好感度</div>
            <div class="info-value">{{ 女主角.对男主好感度 !== undefined ? 女主角.对男主好感度 : '不存在' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">身体状态</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">当前姿势</div>
            <div class="info-value">{{ 女主角.当前姿势 || '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">身体状态</div>
            <div class="info-value">{{ 女主角.身体状态 || '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">小嘴状态</div>
            <div class="info-value">{{ 女主角.小嘴状态 || '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">胸部状态</div>
            <div class="info-value">{{ 女主角.胸部状态 || '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">小屄状态</div>
            <div class="info-value">{{ 女主角.小屄状态 || '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">屁穴状态</div>
            <div class="info-value">{{ 女主角.屁穴状态 || '不存在' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">发育与高潮</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">发育状态</div>
            <div class="info-value">{{ 女主角.当前发育状态 || '0' }}%</div>
          </div>
          <div class="info-item">
            <div class="info-label">高潮进程</div>
            <div class="info-value">{{ 女主角.高潮进程 || '0' }}%</div>
          </div>
          <div class="info-item">
            <div class="info-label">高潮次数</div>
            <div class="info-value">{{ 女主角.高潮次数 || '0' }}次</div>
          </div>
          <div class="info-item">
            <div class="info-label">被内射次数</div>
            <div class="info-value">{{ 女主角.被内射次数 || '0' }}次</div>
          </div>
          <div class="info-item">
            <div class="info-label">处女</div>
            <div class="info-value">{{ 女主角.处女 === true ? '是' : '否' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">破处记录</div>
            <div class="info-value">{{ 女主角.破处记录 || '无' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">当前状态</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">当前想法</div>
            <div class="info-value">{{ 女主角.当前想法 || '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">整体着装</div>
            <div class="info-value">{{ 女着装.整体 || '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">内衣</div>
            <div class="info-value">{{ 女着装.内衣 || '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">内裤</div>
            <div class="info-value">{{ 女着装.内裤 || '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">特殊配饰</div>
            <div class="info-value">{{ 女着装.特殊配饰 || '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">暴露程度</div>
            <div class="info-value">{{ 女着装.暴露程度 || '不存在' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">🔒 秘密</div>
        <div class="info-group">
          <div class="info-item" style="flex-direction: column; align-items: flex-start">
            <div class="info-value" style="color: #c62828; font-size: 0.65rem">{{ 女主角.秘密 || '无秘密' }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="characterType === '男主'" class="character-info-section">
      <div class="character-header">
        <span class="character-header-name">{{ 男主角.姓名 || '加载中...' }}</span>
        <span class="character-header-tag">男主</span>
      </div>

      <div class="info-section">
        <div class="section-title">基本信息</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">姓名</div>
            <div class="info-value">{{ 男主角.姓名 || '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">年龄</div>
            <div class="info-value">{{ 男主角.年龄 !== undefined ? 男主角.年龄 + '岁' : '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">性别</div>
            <div class="info-value">{{ 男主角.性别 || '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">武功境界</div>
            <div class="info-value">{{ 男主角.武功境界 || '0' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">身份</div>
            <div class="info-value">{{ 男主角.身份 || '不存在' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">与女主关系</div>
        <div class="relationship-section">
          <div class="relationship-item">
            <span class="relation-label">关系</span>
            <span class="relation-value">{{ 男主角.关系 || '不存在' }}</span>
          </div>
          <div class="relationship-item">
            <span class="relation-label">好感度</span>
            <span class="relation-value">{{ 男主角.对女主好感度 || '0' }}</span>
          </div>
          <div class="relationship-item">
            <span class="relation-label">射精进度</span>
            <span class="relation-value">{{ 男主角.射精进度 || '0' }}%</span>
          </div>
          <div class="relationship-item">
            <span class="relation-label">识破身份进度</span>
            <span class="relation-value">{{ 男主角.识破身份进度 !== undefined ? 男主角.识破身份进度 + '%' : '不存在' }}</span>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">当前状态</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">当前姿势</div>
            <div class="info-value">{{ 男主角.当前姿势 || '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">当前想法</div>
            <div class="info-value">{{ 男主角.当前想法 || '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">整体着装</div>
            <div class="info-value">{{ 男着装.整体 || '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">配饰</div>
            <div class="info-value">{{ 男着装.配饰 || '不存在' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">暴露程度</div>
            <div class="info-value">{{ 男着装.暴露程度 || '不存在' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  statData?: {
    女主?: {
      姓名?: string;
      原名?: string;
      性别?: string;
      年龄?: number;
      武功境界?: number;
      对男主好感度?: number;
      当前发育状态?: number;
      高潮进程?: number;
      高潮次数?: number;
      被内射次数?: number;
      处女?: boolean;
      破处记录?: string;
      身份?: string;
      目标?: string;
      秘密?: string;
      当前姿势?: string;
      当前想法?: string;
      身体状态?: string;
      小嘴状态?: string;
      胸部状态?: string;
      小屄状态?: string;
      屁穴状态?: string;
      当前着装?: {
        整体?: string;
        上装?: string;
        下装?: string;
        内衣?: string;
        内裤?: string;
        特殊配饰?: string;
        暴露程度?: string;
      };
    };
    男主?: {
      姓名?: string;
      性别?: string;
      年龄?: number;
      武功境界?: number;
      对女主好感度?: number;
      射精进度?: number;
      身份?: string;
      关系?: string;
      识破身份进度?: number;
      当前姿势?: string;
      当前想法?: string;
      当前着装?: {
        整体?: string;
        上装?: string;
        下装?: string;
        配饰?: string;
        暴露程度?: string;
      };
    };
  };
  characterType?: string;
}

const props = defineProps<Props>();

type FemaleChar = NonNullable<Props['statData']>['女主'];
type MaleChar = NonNullable<Props['statData']>['男主'];

const 女主角 = computed<FemaleChar>(() => {
  if (!props.statData) return {} as FemaleChar;
  return props.statData.女主 || ({} as FemaleChar);
});
const 男主角 = computed<MaleChar>(() => {
  if (!props.statData) return {} as MaleChar;
  return props.statData.男主 || ({} as MaleChar);
});

const 女着装 = computed(() => {
  const char = 女主角.value;
  if (!char) return {};
  return char.当前着装 || {};
});
const 男着装 = computed(() => {
  const char = 男主角.value;
  if (!char) return {};
  return char.当前着装 || {};
});
</script>

<style scoped>
.character-detail-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.character-info-section {
  background: var(--warm-bg-light);
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.character-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.35rem 0.5rem;
  background: var(--warm-bg-medium);
  border-radius: 0.3rem;
  margin-bottom: 0.5rem;
}

.character-header-name {
  font-weight: bold;
  color: var(--text-title);
  font-size: 0.8rem;
}

.character-header-tag {
  font-size: 0.65rem;
  color: var(--user-color-primary);
  background: var(--warm-bg-dark);
  padding: 0.15rem 0.35rem;
  border-radius: 0.25rem;
}

.info-section {
  margin-bottom: 0.5rem;
}

.info-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-weight: bold;
  color: var(--text-title);
  font-size: 0.7rem;
  margin-bottom: 0.35rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid var(--border-color);
}

.info-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.15rem 0;
  font-size: 0.65rem;
}

.info-label {
  color: var(--text-secondary);
  flex-shrink: 0;
}

.info-value {
  color: var(--text-primary);
  text-align: right;
  margin-left: 0.5rem;
}

.relationship-section {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.relationship-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0;
  font-size: 0.65rem;
}

.relation-label {
  color: var(--text-secondary);
}

.relation-value {
  color: var(--accent-color);
  font-weight: 500;
}
</style>
