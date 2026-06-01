<template>
  <div class="xx-page">
    <BackButton />
    
    <div class="xx-card">
      <div class="xx-title">变量管理</div>
      <div class="xx-subtitle">查看和管理所有变量</div>
    </div>

    <VarTree
      :stat-data="statData"
      :pending-changes="[]"
    />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import BackButton from '../components/BackButton.vue';
import VarTree from '../components/VarTree.vue';

interface StatData {
  主角?: Record<string, unknown>;
  后宫?: Record<string, unknown>;
  攻略目标?: Record<string, unknown>;
}

const statData = inject<StatData>('statData') || {};
</script>
