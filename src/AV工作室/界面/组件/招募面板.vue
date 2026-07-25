<template>
  <div class="flex flex-col gap-3 p-1">
    <!-- Recruit Action Bar -->
    <div class="flex gap-2">
      <button
        class="flex-1 font-title text-sm py-2.5 rounded-lg transition-all duration-300 text-center border flex items-center justify-center gap-2"
        :disabled="isExtraModelBusy"
        :style="{
          background: isExtraModelBusy ? 'rgba(96,239,255,0.08)' : 'linear-gradient(135deg, rgba(187,134,252,0.25) 0%, rgba(96,239,255,0.15) 100%)',
          borderColor: isExtraModelBusy ? 'var(--accent-cyan)' : 'var(--accent-purple)',
          color: isExtraModelBusy ? 'var(--accent-cyan)' : 'var(--text-title)',
          boxShadow: isExtraModelBusy ? '0 0 12px rgba(96,239,255,0.2)' : 'none',
          cursor: isExtraModelBusy ? 'wait' : 'pointer',
        }"
        @click="startRecruit"
      >
        <span v-if="isExtraModelBusy" class="animate-pulse">◉ 额外模型解析中...</span>
        <span v-else>🎬 招募素人演员</span>
      </button>
      <button
        v-if="characters.length > 0"
        class="btn-primary text-xs py-2.5 px-3 font-title flex-shrink-0"
        @click="refreshCharacters"
      >
        🔄 刷新
      </button>
    </div>

    <!-- Extra Model Status Banner -->
    <div
      v-if="isExtraModelBusy"
      class="text-center text-xs py-2 px-3 rounded-lg animate-pulse"
      style="background: rgba(96,239,255,0.08); color: var(--accent-cyan); border: 1px solid rgba(96,239,255,0.2);"
    >
      额外模型正在分析AI回复，提取角色数据...
    </div>

    <!-- Generated Characters Carousel -->
    <div v-if="characters.length > 0" class="space-y-3">
      <div class="font-title text-xs tracking-wider px-1" style="color: var(--accent-purple);">
        可选素人 {{ charIndex + 1 }}/{{ characters.length }}
      </div>

      <div class="stat-card animate-pulseGlow">
        <div class="flex justify-between items-start mb-2">
          <div>
            <span class="font-title text-sm" style="color: var(--text-title);">{{ currentChar.姓名 }}</span>
            <span class="badge badge-purple ml-2">{{ currentChar.年龄 }}</span>
          </div>
          <div class="flex gap-1">
            <button class="btn-primary text-xs py-1 px-3" @click="prevChar" :disabled="characters.length <= 1">&lt;</button>
            <button class="btn-primary text-xs py-1 px-3" @click="nextChar" :disabled="characters.length <= 1">&gt;</button>
          </div>
        </div>

        <div class="text-xs space-y-1" style="color: var(--text-secondary);">
          <p><span style="color: var(--accent-purple);">性格:</span> {{ currentChar.性格 }}</p>
          <p><span style="color: var(--accent-purple);">背景:</span> {{ currentChar.背景 }}</p>
          <p><span style="color: var(--accent-purple);">外貌:</span> {{ currentChar.身高 }} / {{ currentChar.体重 }} / {{ currentChar.罩杯 }}杯 / {{ currentChar.发色 }}{{ currentChar.发型 }} / {{ currentChar.衣着 }}</p>
          <p><span style="color: var(--accent-purple);">性经验:</span> {{ currentChar.是否处女 === '是' ? '处女 · ' : '' }}{{ currentChar.性爱经历 }}</p>
        </div>

        <div class="mt-2 flex flex-wrap gap-1">
          <span class="badge badge-accept" v-for="item in currentChar.可接受内容?.slice(0, 6)" :key="item">{{ item }}</span>
          <span v-if="currentChar.可接受内容?.length > 6" class="badge badge-accept">+{{ currentChar.可接受内容.length - 6 }}</span>
        </div>

        <div class="mt-1 flex flex-wrap gap-1">
          <span class="badge badge-danger" v-for="item in currentChar.不可接受内容?.slice(0, 6)" :key="item">{{ item }}</span>
          <span v-if="currentChar.不可接受内容?.length > 6" class="badge badge-danger">+{{ currentChar.不可接受内容.length - 6 }}</span>
        </div>

        <div class="mt-2 space-y-1 text-xs">
          <p><span style="color: var(--accent-pink);">底线:</span> {{ currentChar.底线 }}</p>
          <p><span style="color: var(--accent-gold);">弱点:</span> {{ (currentChar.弱点 || []).join('、') }}</p>
          <p><span style="color: var(--accent-teal);">建议策略:</span> {{ currentChar.策略 }}</p>
        </div>

        <button
          class="btn-primary w-full mt-3 text-sm py-2 font-title"
          @click="selectCharacter(currentChar.姓名)"
        >
          选择 {{ currentChar.姓名 }}
        </button>
      </div>
    </div>

    <div v-else class="text-center py-12" style="color: var(--text-muted);">
      <div class="mb-3" style="font-size: 2rem; opacity: 0.3;">📋</div>
      <p class="text-sm" v-if="!isExtraModelBusy">点击上方「招募素人演员」按钮</p>
      <p class="text-sm" v-else>正在等待AI生成角色...</p>
      <p class="text-xs mt-1" style="color: var(--text-muted);">
        系统将随机生成未成年/青年/成熟女性各一人
      </p>
    </div>

    <!-- Actor Library -->
    <div v-if="actorLibrary.length > 0" class="mt-4">
      <div class="font-title text-xs tracking-wider px-1 mb-2" style="color: var(--accent-teal);">
        演员库 ({{ actorLibrary.length }}人)
      </div>
      <div class="space-y-2">
        <div v-for="actor in actorLibrary" :key="actor.姓名" class="stat-card flex justify-between items-center text-xs">
          <div>
            <span style="color: var(--text-primary);">{{ actor.姓名 }}</span>
            <span class="text-muted ml-1" style="color: var(--text-muted);">{{ actor.年龄 }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="badge badge-cyan">拍摄{{ actor.拍摄次数 }}次</span>
            <span style="color: var(--text-muted);">{{ actor.最后合作 }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Suggestions -->
    <div class="mt-2 space-y-2" v-if="suggestions.length > 0">
      <div
        v-for="(s, i) in suggestions"
        :key="i"
        class="btn-primary text-xs py-2.5 px-3 text-left"
        @click="$emit('send', s)"
      >
        {{ s }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue';

interface Props {
  statData: any;
}

const props = defineProps<Props>();
const emit = defineEmits<{ send: [text: string] }>();

const charIndex = ref(0);
const isExtraModelBusy = ref(false);
let pollTimer: ReturnType<typeof setInterval> | null = null;

const characters = computed(() => {
  return props.statData?.可选角色列表 || [];
});

const currentChar = computed(() => {
  if (characters.value.length === 0) {
    return { 姓名: '', 年龄: '', 性格: '', 背景: '', 身高: '', 体重: '', 罩杯: '', 发色: '', 发型: '', 衣着: '', 是否处女: '', 性爱经历: '', 底线: '', 策略: '', 弱点: [], 可接受内容: [], 不可接受内容: [] };
  }
  return characters.value[charIndex.value] || characters.value[0] || {};
});

const actorLibrary = computed(() => {
  return props.statData?.演员库 || [];
});

const suggestions = computed(() => {
  const opts = props.statData?.行动选项;
  if (!opts) return [];
  return [opts.一, opts.二, opts.三, opts.四].filter(Boolean);
});

watch(() => characters.value.length, () => {
  charIndex.value = 0;
});

function checkExtraModel() {
  try {
    isExtraModelBusy.value = (window as any).Mvu?.isDuringExtraAnalysis?.() ?? false;
  } catch {
    isExtraModelBusy.value = false;
  }
}

function startRecruit() {
  checkExtraModel();
  if (isExtraModelBusy.value) return;
  emit('send', '开始招募素人演员');
  pollInterval(2000, 30000);
}

function refreshCharacters() {
  emit('send', '重新生成角色列表');
  pollInterval(2000, 30000);
}

function pollInterval(delay: number, maxDuration: number) {
  if (pollTimer) clearInterval(pollTimer);
  checkExtraModel();
  const start = Date.now();
  pollTimer = setInterval(() => {
    checkExtraModel();
    if (!isExtraModelBusy.value || Date.now() - start > maxDuration) {
      if (pollTimer) clearInterval(pollTimer);
      pollTimer = null;
    }
  }, delay);
}

function prevChar() {
  if (characters.value.length > 0) {
    charIndex.value = (charIndex.value - 1 + characters.value.length) % characters.value.length;
  }
}

function nextChar() {
  if (characters.value.length > 0) {
    charIndex.value = (charIndex.value + 1) % characters.value.length;
  }
}

function selectCharacter(name: string) {
  if (name) {
    emit('send', `选择${name}`);
  }
}

onMounted(() => {
  checkExtraModel();
});

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer);
});
</script>
