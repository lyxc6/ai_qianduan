<template>
  <div class="character-detail-body">
    <div class="character-info-section">
      <div class="info-section">
        <div class="section-title">基本信息</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">当前时间</div>
            <div class="info-value">{{ world.当前时间 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">当前地点</div>
            <div class="info-value">{{ world.当前地点 || '' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">亲密度等级</div>
            <div class="info-value">{{ world.亲密度等级 || '' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">NSFW状态</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">是否正在NSFW</div>
            <div class="info-value">{{ world.是否正在NSFW ? '是' : '否' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">当前NSFW进度</div>
            <div class="info-value">{{ world.当前NSFW进度 || '' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">解锁状态</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">牵手</div>
            <div class="info-value">{{ world.解锁牵手 ? '已解锁' : '未解锁' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">拥抱</div>
            <div class="info-value">{{ world.解锁拥抱 ? '已解锁' : '未解锁' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">接吻</div>
            <div class="info-value">{{ world.解锁接吻 ? '已解锁' : '未解锁' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">爱抚</div>
            <div class="info-value">{{ world.解锁爱抚 ? '已解锁' : '未解锁' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">互慰</div>
            <div class="info-value">{{ world.解锁互慰 ? '已解锁' : '未解锁' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">口交</div>
            <div class="info-value">{{ world.解锁口交 ? '已解锁' : '未解锁' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">插入式性行为</div>
            <div class="info-value">{{ world.解锁插入式性行为 ? '已解锁' : '未解锁' }}</div>
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
    世界?: {
      当前时间?: string;
      当前地点?: string;
      是否正在NSFW?: boolean;
      解锁牵手?: boolean;
      解锁拥抱?: boolean;
      解锁接吻?: boolean;
      解锁爱抚?: boolean;
      解锁互慰?: boolean;
      解锁口交?: boolean;
      解锁插入式性行为?: boolean;
      当前NSFW进度?: string;
      亲密度等级?: string;
    };
  };
}

const props = defineProps<Props>();
const world = computed(() => props.statData?.世界 || {});
</script>
