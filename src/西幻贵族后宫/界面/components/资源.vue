<template>
  <div>
    <div class="card-title"><i class="fa-solid fa-gem"></i> 家族资源</div>

    <div v-if="resources.length" class="club-grid">
      <div v-for="item in resources" :key="item.name" class="place-item">
        <div class="flex items-center justify-between gap-2">
          <span class="place-name">{{ item.name }}</span>
          <span class="badge badge-gold">×{{ item.数量 ?? 1 }}</span>
        </div>
        <div class="place-desc">{{ item.描述 || '—' }}</div>
      </div>
    </div>

    <div v-else class="empty-state">家族暂未持有哪些资源</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

interface Resource {
  描述?: string;
  数量?: number;
}

const store = useDataStore();

const resources = computed(() => {
  const map = (store.data.世界 && store.data.世界.家族资源) || {};
  return Object.entries(map).map(([name, r]) => ({
    name,
    描述: (r as Resource).描述,
    数量: (r as Resource).数量 ?? 1,
  }));
});
</script>
