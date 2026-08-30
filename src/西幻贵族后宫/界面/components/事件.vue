<template>
  <div>
    <div class="card-title"><i class="fa-solid fa-scroll"></i> 事件编年</div>

    <div v-if="events.length" class="mini-roster">
      <div v-for="(ev, i) in events" :key="i" class="card">
        <div class="focus-head">
          <span class="guest-name">{{ ev.日期 || '—' }}</span>
          <span v-if="ev.地点" class="badge badge-engaged">{{ ev.地点 }}</span>
        </div>
        <p class="focus-demand">{{ ev.描述 || '—' }}</p>
      </div>
    </div>

    <div v-else class="empty-state">暂无事件记录</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

interface ParsedEvent {
  日期?: string;
  地点?: string;
  描述?: string;
}

const store = useDataStore();

const events = computed<ParsedEvent[]>(() => {
  const list = store.data.事件 || [];
  return list.map((line) => {
    const parts = String(line).split('|');
    if (parts.length >= 3) {
      return { 日期: parts[0], 地点: parts[1], 描述: parts.slice(2).join('|') };
    }
    if (parts.length === 2) {
      return { 日期: parts[0], 描述: parts[1] };
    }
    return { 描述: String(line) };
  });
});
</script>
