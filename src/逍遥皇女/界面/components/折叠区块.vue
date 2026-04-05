<template>
  <details class="collapsible-section" :open="defaultOpen">
    <summary class="collapsible-summary">
      <span class="summary-icon">{{ isOpen ? '▼' : '▶' }}</span>
      <span class="summary-title">{{ title }}</span>
    </summary>
    <div class="collapsible-content">
      <slot></slot>
    </div>
  </details>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  title?: string;
  defaultOpen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  defaultOpen: true,
});

const isOpen = ref(props.defaultOpen);

watch(() => props.defaultOpen, (newVal) => {
  isOpen.value = newVal;
});
</script>

<style scoped>
.collapsible-section {
  background: var(--warm-bg-light);
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.collapsible-summary {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem;
  cursor: pointer;
  background: var(--warm-bg-medium);
  user-select: none;
  list-style: none;
}

.collapsible-summary::-webkit-details-marker {
  display: none;
}

.collapsible-summary:hover {
  background: var(--warm-hover-bg);
}

.summary-icon {
  font-size: 0.6rem;
  color: var(--text-secondary);
  transition: transform 0.2s ease;
}

.summary-title {
  font-weight: bold;
  color: var(--text-title);
  font-size: 0.7rem;
}

.collapsible-content {
  padding: 0.5rem;
}
</style>
