<template>
  <div class="character-detail-body">
    <div class="character-info-section">
      <div class="info-section">
        <div class="section-title">基本信息</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">姓名</div>
            <div class="info-value">{{ character.姓名 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">性别</div>
            <div class="info-value">{{ character.性别 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">年龄</div>
            <div class="info-value">{{ character.年龄 !== undefined ? character.年龄 : '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">身份</div>
            <div class="info-value">{{ character.身份 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">对男主好感度</div>
            <div class="info-value">{{ character.对男主的好感度 !== undefined ? character.对男主的好感度 : '' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">GDC状态</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">状态</div>
            <div class="info-value">{{ character.GDC状态 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">阶段</div>
            <div class="info-value">{{ character.GDC阶段 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">周数</div>
            <div class="info-value">{{ character.GDC周数 !== undefined ? character.GDC周数 : '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">症状</div>
            <div class="info-value">{{ character.GDC症状 || '' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">身体状态</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">当前着装</div>
            <div class="info-value">{{ character.当前着装 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">当前姿势</div>
            <div class="info-value">{{ character.当前姿势 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">当前想法</div>
            <div class="info-value">{{ character.当前想法 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">身体感受</div>
            <div class="info-value">{{ character.身体感受 || '' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">敏感部位</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">胸部感受</div>
            <div class="info-value">{{ character.胸部感受 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">小穴感受</div>
            <div class="info-value">{{ character.小穴感受 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">菊穴感受</div>
            <div class="info-value">{{ character.菊穴感受 || '' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">NSFW数据</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">高潮次数</div>
            <div class="info-value">{{ character.高潮次数 !== undefined ? character.高潮次数 : 0 }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">内射次数</div>
            <div class="info-value">{{ character.内射次数 !== undefined ? character.内射次数 : 0 }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">处女</div>
            <div class="info-value">{{ character.处女 ? '是' : '否' }}</div>
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
      性别?: string;
      年龄?: number;
      对男主的好感度?: number;
      身份?: string;
      当前着装?: string;
      当前姿势?: string;
      当前想法?: string;
      身体感受?: string;
      胸部感受?: string;
      小穴感受?: string;
      菊穴感受?: string;
      高潮次数?: number;
      内射次数?: number;
      处女?: boolean;
      GDC状态?: string;
      GDC阶段?: string;
      GDC周数?: number;
      GDC症状?: string;
    };
  };
}

const props = defineProps<Props>();
const character = computed(() => props.statData?.主角 || {});
</script>
