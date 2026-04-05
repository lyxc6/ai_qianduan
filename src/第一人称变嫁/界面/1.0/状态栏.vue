<template>
  <div class="main">
    <div class="world-info">
      <div class="world-info-box">
        <div>
          <div class="world-info-label">当前时间</div>
          <div class="world-info-content">{{ time }}</div>
        </div>
        <div>
          <div class="world-info-label">当前地点</div>
          <div class="world-info-content">{{ location }}</div>
        </div>
      </div>
    </div>

    <div class="time-location">
      <div class="time-location-time">📅 {{ time }}</div>
      <div class="time-location-location">📍 {{ location }}</div>
    </div>

    <div class="status-container">
      <div class="status-title">角色状态</div>
      <div class="status-content">
        <div v-for="char in characters" :key="char.id" class="status-item">
          <div class="status-item-avatar">{{ char.avatar }}</div>
          <div class="status-item-info">
            <div class="status-item-name">{{ char.name }}</div>
            <div class="status-item-detail">{{ char.status }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="actions.length > 0" class="action-container">
      <div class="action-title">行动选项</div>
      <div class="action-options">
        <div v-for="(action, index) in actions" :key="index" class="action-option">
          {{ index + 1 }}. {{ action }}
        </div>
      </div>
    </div>

    <div v-if="events.length > 0" class="event-container">
      <div class="event-title">最近事件</div>
      <div class="event-list">
        <div v-for="(event, index) in events" :key="index" class="event-item">
          {{ event }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getVars, subscribeUpdate } from '@if/exported.mvu';

const time = ref('');
const location = ref('');
const characters = ref<Array<{
  id: string;
  avatar: string;
  name: string;
  status: string;
}>>([]);
const actions = ref<string[]>([]);
const events = ref<string[]>([]);

async function loadData() {
  try {
    const vars = await getVars();

    if (vars.世界) {
      time.value = vars.世界.当前时间 || '';
      location.value = vars.世界.当前地点 || '';
    }

    characters.value = [];

    if (vars.主角) {
      const mainChar = vars.主角;
      let gdcInfo = '';
      if (mainChar.GDC状态 && mainChar.GDC状态 !== '无') {
        gdcInfo = ` [${mainChar.GDC状态}]`;
      }
      characters.value.push({
        id: '主角',
        avatar: '👤',
        name: mainChar.姓名 + gdcInfo,
        status: `${mainChar.当前姿势} | ${mainChar.当前着装}`,
      });
    }

    if (vars.顾言) {
      const guy = vars.顾言;
      characters.value.push({
        id: '顾言',
        avatar: '💕',
        name: guy.姓名 + ' [好感度:' + guy.好感度 + ']',
        status: `${guy.当前姿势} | ${guy.当前着装}`,
      });
    }

    if (vars.行动选项 && vars.行动选项.选项) {
      actions.value = vars.行动选项.选项;
    }

    if (vars.事件 && Array.isArray(vars.事件)) {
      events.value = vars.事件.slice(-3);
    }
  } catch (error) {
    console.error('加载变量失败:', error);
  }
}

onMounted(async () => {
  await loadData();
  subscribeUpdate(() => {
    loadData();
  });
});
</script>
