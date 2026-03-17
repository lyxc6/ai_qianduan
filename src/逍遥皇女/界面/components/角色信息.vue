<template>
  <div class="character-detail-body">
    <div v-if="characterType === '女主'" class="character-info-section">
      <div class="character-header">
        <span class="character-header-name">{{ character.姓名 || '加载中...' }}</span>
        <span class="character-header-tag">女主</span>
      </div>

      <div class="info-section">
        <div class="section-title">基本信息</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">姓名</div>
            <div class="info-value">{{ character.姓名 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">年龄</div>
            <div class="info-value">{{ character.年龄 !== undefined ? character.年龄 + '岁' : '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">性别</div>
            <div class="info-value">{{ character.性别 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">武功境界</div>
            <div class="info-value">{{ character.武功境界 || '0' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">身份</div>
            <div class="info-value">{{ character.身份 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">目标</div>
            <div class="info-value">{{ character.目标 || '' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">身体状态</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">当前姿势</div>
            <div class="info-value">{{ character.当前姿势 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">身体状态</div>
            <div class="info-value">{{ character.身体状态 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">小嘴状态</div>
            <div class="info-value">{{ character.小嘴状态 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">胸部状态</div>
            <div class="info-value">{{ character.胸部状态 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">小屄状态</div>
            <div class="info-value">{{ character.小屄状态 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">屁穴状态</div>
            <div class="info-value">{{ character.屁穴状态 || '' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">发育与高潮</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">发育状态</div>
            <div class="info-value">{{ character.当前发育状态 || '0' }}%</div>
          </div>
          <div class="info-item">
            <div class="info-label">高潮进程</div>
            <div class="info-value">{{ character.高潮进程 || '0' }}%</div>
          </div>
          <div class="info-item">
            <div class="info-label">高潮次数</div>
            <div class="info-value">{{ character.高潮次数 || '0' }}次</div>
          </div>
          <div class="info-item">
            <div class="info-label">被内射次数</div>
            <div class="info-value">{{ character.被内射次数 || '0' }}次</div>
          </div>
          <div class="info-item">
            <div class="info-label">处女</div>
            <div class="info-value">{{ character.处女 === true ? '是' : '否' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">破处记录</div>
            <div class="info-value">{{ character.破处记录 || '无' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">当前状态</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">当前想法</div>
            <div class="info-value">{{ character.当前想法 || '' }}</div>
          </div>
          <div v-if="着装信息.整体" class="info-item">
            <div class="info-label">整体着装</div>
            <div class="info-value">{{ 着装信息.整体 }}</div>
          </div>
          <div v-if="着装信息.内衣" class="info-item">
            <div class="info-label">内衣</div>
            <div class="info-value">{{ 着装信息.内衣 }}</div>
          </div>
          <div v-if="着装信息.内裤" class="info-item">
            <div class="info-label">内裤</div>
            <div class="info-value">{{ 着装信息.内裤 }}</div>
          </div>
          <div v-if="着装信息.特殊配饰" class="info-item">
            <div class="info-label">特殊配饰</div>
            <div class="info-value">{{ 着装信息.特殊配饰 }}</div>
          </div>
          <div v-if="着装信息.暴露程度" class="info-item">
            <div class="info-label">暴露程度</div>
            <div class="info-value">{{ 着装信息.暴露程度 }}</div>
          </div>
        </div>
      </div>

      <div class="info-section" v-if="character.秘密">
        <div class="section-title">🔒 秘密</div>
        <div class="info-group">
          <div class="info-item" style="flex-direction: column; align-items: flex-start;">
            <div class="info-value" style="color: #c62828; font-size: 0.65rem;">{{ character.秘密 }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="characterType === '男主'" class="character-info-section">
      <div class="character-header">
        <span class="character-header-name">{{ character.姓名 || '加载中...' }}</span>
        <span class="character-header-tag">男主</span>
      </div>

      <div class="info-section">
        <div class="section-title">基本信息</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">姓名</div>
            <div class="info-value">{{ character.姓名 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">年龄</div>
            <div class="info-value">{{ character.年龄 !== undefined ? character.年龄 + '岁' : '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">性别</div>
            <div class="info-value">{{ character.性别 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">武功境界</div>
            <div class="info-value">{{ character.武功境界 || '0' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">身份</div>
            <div class="info-value">{{ character.身份 || '' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">与女主关系</div>
        <div class="relationship-section">
          <div class="relationship-item">
            <span class="relation-label">关系</span>
            <span class="relation-value">{{ character.关系 || '' }}</span>
          </div>
          <div class="relationship-item">
            <span class="relation-label">好感度</span>
            <span class="relation-value">{{ character.对女主好感度 || '0' }}</span>
          </div>
          <div class="relationship-item">
            <span class="relation-label">射精进度</span>
            <span class="relation-value">{{ character.射精进度 || '0' }}%</span>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">当前状态</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">当前姿势</div>
            <div class="info-value">{{ character.当前姿势 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">当前想法</div>
            <div class="info-value">{{ character.当前想法 || '' }}</div>
          </div>
          <div v-if="着装信息.整体" class="info-item">
            <div class="info-label">整体着装</div>
            <div class="info-value">{{ 着装信息.整体 }}</div>
          </div>
          <div v-if="着装信息.配饰" class="info-item">
            <div class="info-label">配饰</div>
            <div class="info-value">{{ 着装信息.配饰 }}</div>
          </div>
          <div v-if="着装信息.暴露程度" class="info-item">
            <div class="info-label">暴露程度</div>
            <div class="info-value">{{ 着装信息.暴露程度 }}</div>
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
    女主?: {
      姓名?: string;
      性别?: string;
      年龄?: number;
      武功境界?: number;
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

const character = computed(() => {
  if (props.characterType === '女主') {
    return props.statData?.女主 || {};
  } else if (props.characterType === '男主') {
    return props.statData?.男主 || {};
  }
  return {};
});

const 着装信息 = computed(() => {
  return character.value.当前着装 || {};
});
</script>
