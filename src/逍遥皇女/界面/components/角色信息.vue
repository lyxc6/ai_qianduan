<template>
  <div class="character-detail-body">
    <div v-if="characterType === '女主'" class="character-info-section">
      <div class="character-header">
        <span class="character-header-name">{{ 女主角.姓名 || '加载中...' }}</span>
        <span class="character-header-tag female">女主</span>
      </div>

      <InfoSection title="基本信息">
        <InfoItem label="姓名" :value="女主角.姓名" />
        <InfoItem label="原名" :value="女主角.原名" />
        <InfoItem label="年龄" :value="女主角.年龄 !== undefined ? 女主角.年龄 + '岁' : undefined" />
        <InfoItem label="性别" :value="女主角.性别" />
        <InfoItem label="武功境界" :value="女主角.武功境界" />
        <InfoItem label="身份" :value="女主角.身份" />
        <InfoItem label="目标" :value="女主角.目标" />
      </InfoSection>

      <InfoSection title="好感度">
        <InfoItem label="对男主好感度">
          <ProgressBar :value="女主角.对男主好感度 || 0" :max="100" unit="" color="#e91e63" />
        </InfoItem>
      </InfoSection>

      <CollapsibleSection title="身体状态" :defaultOpen="false">
        <InfoItem label="当前姿势" :value="女主角.当前姿势" />
        <InfoItem label="身体状态" :value="女主角.身体状态" />
        <InfoItem label="小嘴状态" :value="女主角.小嘴状态" />
        <InfoItem label="胸部状态" :value="女主角.胸部状态" />
        <InfoItem label="小屄状态" :value="女主角.小屄状态" />
        <InfoItem label="屁穴状态" :value="女主角.屁穴状态" />
      </CollapsibleSection>

      <CollapsibleSection title="发育与高潮">
        <div class="progress-list">
          <ProgressBar label="发育状态" :value="女主角.当前发育状态 || 0" :max="100" unit="%" color="#ff9800" />
          <ProgressBar label="高潮进程" :value="女主角.高潮进程 || 0" :max="100" unit="%" color="#e91e63" />
        </div>
        <InfoItem label="高潮次数" :value="女主角.高潮次数 !== undefined ? 女主角.高潮次数 + '次' : undefined" />
        <InfoItem label="被内射次数" :value="女主角.被内射次数 !== undefined ? 女主角.被内射次数 + '次' : undefined" />
        <InfoItem label="处女" :value="女主角.处女" />
        <InfoItem label="破处记录" :value="女主角.破处记录" />
      </CollapsibleSection>

      <CollapsibleSection title="当前状态" :defaultOpen="false">
        <InfoItem label="当前想法" :value="女主角.当前想法" />
      </CollapsibleSection>

      <CollapsibleSection title="着装信息" :defaultOpen="false">
        <InfoItem label="整体着装" :value="女着装.整体" />
        <InfoItem label="内衣" :value="女着装.内衣" />
        <InfoItem label="内裤" :value="女着装.内裤" />
        <InfoItem label="特殊配饰" :value="女着装.特殊配饰" />
        <InfoItem label="暴露程度" :value="女着装.暴露程度" />
      </CollapsibleSection>

      <CollapsibleSection title="🔐 身份秘密" :defaultOpen="false">
        <InfoItem label="真实身份知晓者" :value="女主角.真实身份知晓者" />
        <InfoItem label="" :isSecret="true">
          {{ 女主角.秘密 || '无秘密' }}
        </InfoItem>
      </CollapsibleSection>
    </div>

    <div v-else-if="characterType === '男主'" class="character-info-section">
      <div class="character-header">
        <span class="character-header-name">{{ 男主角.姓名 || '加载中...' }}</span>
        <span class="character-header-tag male">男主</span>
      </div>

      <InfoSection title="基本信息">
        <InfoItem label="姓名" :value="男主角.姓名" />
        <InfoItem label="年龄" :value="男主角.年龄 !== undefined ? 男主角.年龄 + '岁' : undefined" />
        <InfoItem label="性别" :value="男主角.性别" />
        <InfoItem label="武功境界" :value="男主角.武功境界" />
        <InfoItem label="身份" :value="男主角.身份" />
      </InfoSection>

      <InfoSection title="与女主关系">
        <InfoItem label="关系" :value="男主角.关系" />
        <InfoItem label="好感度" color="#e91e63">
          {{ 男主角.对女主好感度 !== undefined ? 男主角.对女主好感度 : '0' }}
        </InfoItem>
        <InfoItem label="">
          <ProgressBar label="" :value="男主角.对女主好感度 || 0" :max="100" unit="" color="#e91e63" />
        </InfoItem>
        <InfoItem label="射精进度">
          <ProgressBar :value="男主角.射精进度 || 0" :max="100" unit="%" color="#9c27b0" />
        </InfoItem>
        <InfoItem label="识破身份进度">
          <ProgressBar :value="男主角.识破身份进度 || 0" :max="100" unit="%" color="#ff5722" />
        </InfoItem>
      </InfoSection>

      <CollapsibleSection title="当前状态" :defaultOpen="false">
        <InfoItem label="当前姿势" :value="男主角.当前姿势" />
        <InfoItem label="当前想法" :value="男主角.当前想法" />
      </CollapsibleSection>

      <CollapsibleSection title="着装信息" :defaultOpen="false">
        <InfoItem label="整体着装" :value="男着装.整体" />
        <InfoItem label="配饰" :value="男着装.配饰" />
        <InfoItem label="暴露程度" :value="男着装.暴露程度" />
      </CollapsibleSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import InfoSection from './信息区块.vue';
import InfoItem from './信息项.vue';
import CollapsibleSection from './折叠区块.vue';
import ProgressBar from './进度条.vue';

interface Props {
  statData?: {
    女主?: {
      姓名?: string;
      原名?: string;
      性别?: string;
      年龄?: number;
      武功境界?: string;
      对男主好感度?: number;
      当前发育状态?: number;
      高潮进程?: number;
      高潮次数?: number;
      被内射次数?: number;
      处女?: boolean;
      破处记录?: string;
      身份?: string;
      真实身份知晓者?: string;
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
      武功境界?: string;
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
  padding: 0.5rem;
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
  padding: 0.15rem 0.4rem;
  border-radius: 0.25rem;

  &.female {
    color: #e91e63;
    background: rgba(233, 30, 99, 0.15);
  }

  &.male {
    color: #2196f3;
    background: rgba(33, 150, 243, 0.15);
  }
}

.progress-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}
</style>
