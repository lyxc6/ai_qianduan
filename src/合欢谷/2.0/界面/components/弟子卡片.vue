<template>
  <div class="disciple-detail" v-if="disciple">
    <div class="detail-section">
      <div class="detail-title">基本信息</div>
      <div class="info-row"><span class="info-label">身份</span><span class="info-value">{{ disciple.身份 || '' }}</span></div>
      <div class="info-row"><span class="info-label">地位</span><span class="info-value">{{ disciple.谷内地位 || '' }}</span></div>
      <div class="info-row"><span class="info-label">境界</span><span class="info-value">{{ disciple.功力境界 || '' }}</span></div>
      <div class="info-row"><span class="info-label">好感度</span><span class="info-value">{{ disciple.好感度 ?? '' }}</span></div>
      <div class="info-row"><span class="info-label">贡献度</span><span class="info-value">{{ disciple.贡献度 ?? '' }}</span></div>
    </div>

    <div class="detail-section" v-if="disciple.性格">
      <div class="detail-title">性格</div>
      <div class="info-row"><span class="info-label">核心特征</span><span class="info-value">{{ disciple.性格.核心特征 || '' }}</span></div>
      <div class="info-row"><span class="info-label">优点</span><span class="info-value">{{ disciple.性格.优点 || '' }}</span></div>
      <div class="info-row"><span class="info-label">缺点</span><span class="info-value">{{ disciple.性格.缺点 || '' }}</span></div>
      <div class="info-row"><span class="info-label">说话风格</span><span class="info-value">{{ disciple.性格.说话风格 || '' }}</span></div>
    </div>

    <div class="detail-section" v-if="disciple.外貌">
      <div class="detail-title">外貌</div>
      <div class="info-row"><span class="info-label">身高</span><span class="info-value">{{ disciple.外貌.身高 || '' }}</span></div>
      <div class="info-row"><span class="info-label">体型</span><span class="info-value">{{ disciple.外貌.体型 || '' }}</span></div>
      <div class="info-row"><span class="info-label">面部特征</span><span class="info-value">{{ disciple.外貌.面部特征 || '' }}</span></div>
      <div class="info-row"><span class="info-label">发型</span><span class="info-value">{{ disciple.外貌.发型 || '' }}</span></div>
      <div class="info-row"><span class="info-label">气质</span><span class="info-value">{{ disciple.外貌.气质 || '' }}</span></div>
      <div class="info-row"><span class="info-label">声音</span><span class="info-value">{{ disciple.外貌.声音 || '' }}</span></div>
    </div>

    <div class="detail-section">
      <div class="detail-title">当前状态</div>
      <div class="info-row"><span class="info-label">位置</span><span class="info-value">{{ disciple.当前位置 || '' }}</span></div>
      <div class="info-row"><span class="info-label">想法</span><span class="info-value">{{ disciple.当前想法 || '' }}</span></div>
      <div class="info-row"><span class="info-label">着装</span><span class="info-value">{{ disciple.当前着装 || '' }}</span></div>
      <div class="info-row"><span class="info-label">身体状况</span><span class="info-value">{{ disciple.身体状况 || '' }}</span></div>
      <div class="info-row" v-if="disciple.当日任务"><span class="info-label">今日任务</span><span class="info-value">{{ disciple.当日任务 }}</span></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  discipleName: string;
  statData: {
    弟子?: Record<string, any>;
  };
}

const props = defineProps<Props>();

const disciple = computed(() => {
  return props.statData?.弟子?.[props.discipleName] || null;
});
</script>

<style lang="scss">
.disciple-detail {
  padding: 0.5rem;
}

.detail-section {
  background: linear-gradient(135deg, rgba(43, 29, 14, 0.6) 0%, rgba(62, 42, 20, 0.4) 100%);
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-left: 3px solid var(--accent-color);
}

.detail-title {
  font-family: var(--font-title);
  font-size: 0.9rem;
  color: var(--text-title);
  margin-bottom: 0.5rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid rgba(212, 177, 106, 0.2);
  letter-spacing: 1px;
}

.info-row {
  display: flex;
  margin-bottom: 0.3rem;
}

.info-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  min-width: 5rem;
  flex-shrink: 0;
}

.info-value {
  font-size: 0.8rem;
  color: var(--text-primary);
  flex: 1;
}
</style>
