<template>
  <div class="action-options">
    <div class="info-section">
      <div class="section-title">当前视角</div>
      <div class="info-value">{{ actionOptions.当前视角 || '苏晚棠' }}</div>
    </div>

    <div class="info-section">
      <div class="section-title">行动选项</div>
      <div class="action-button" v-if="actionOptions.选项一" @click="sendAction(actionOptions.选项一)">
        {{ actionOptions.选项一 }}
      </div>
      <div class="action-button" v-if="actionOptions.选项二" @click="sendAction(actionOptions.选项二)">
        {{ actionOptions.选项二 }}
      </div>
      <div class="action-button" v-if="actionOptions.选项三" @click="sendAction(actionOptions.选项三)">
        {{ actionOptions.选项三 }}
      </div>
      <div class="action-button" v-if="actionOptions.选项四" @click="sendAction(actionOptions.选项四)">
        {{ actionOptions.选项四 }}
      </div>
      <div class="info-value" v-if="!hasOptions">暂无行动选项</div>
    </div>

    <div class="info-section" v-if="recentEvents && recentEvents.length > 0">
      <div class="section-title">最近事件</div>
      <div class="task-list">
        <div class="task-item" v-for="(event, index) in recentEvents" :key="index">
          <div class="task-description">{{ event }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  statData: {
    行动选项?: {
      当前视角?: string;
      选项一?: string;
      选项二?: string;
      选项三?: string;
      选项四?: string;
    };
    事件?: string[];
  };
  currentMessage?: any;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  send: [text: string];
}>();

const actionOptions = computed(() => props.statData?.行动选项 || {});
const recentEvents = computed(() => props.statData?.事件 || []);
const hasOptions = computed(() => {
  const options = actionOptions.value;
  return options.选项一 || options.选项二 || options.选项三 || options.选项四;
});

function sendAction(text: string) {
  if (text) {
    emit('send', text);
  }
}
</script>