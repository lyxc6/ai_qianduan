<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col gap-4">
      <div class="rounded-lg p-3" style="background: var(--warm-bg-light); border-left: 3px solid var(--user-color-primary);">
        <div class="font-title text-[0.85rem] text-title font-bold mb-2">基本信息</div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">姓名</div>
            <div class="text-[0.75rem] text-primary">陆辞夜</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">年龄</div>
            <div class="text-[0.75rem] text-primary">18岁</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">身份</div>
            <div class="text-[0.75rem] text-primary">高三富二代、学神</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">性格</div>
            <div class="text-[0.75rem] text-primary">绝对控制欲、武力强</div>
          </div>
        </div>
      </div>

      <div class="rounded-lg p-3" style="background: var(--warm-bg-light); border-left: 3px solid var(--user-color-primary);">
        <div class="font-title text-[0.85rem] text-title font-bold mb-2">好感度</div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">对苏晚棠</div>
            <div class="text-[0.75rem] text-primary">{{ character.好感对苏晚棠 || 0 }}</div>
            <div class="h-2 rounded-full overflow-hidden mt-1" style="background: var(--warm-bg-dark);">
              <div class="h-full rounded-full transition-all duration-500" style="background: linear-gradient(90deg, var(--user-color-primary) 0%, var(--user-color-secondary) 100%);" :style="{ width: ((character.好感对苏晚棠 || 0) / 10) + '%' }"></div>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">对沈含烟</div>
            <div class="text-[0.75rem] text-primary">{{ character.好感对沈含烟 || 0 }}</div>
            <div class="h-2 rounded-full overflow-hidden mt-1" style="background: var(--warm-bg-dark);">
              <div class="h-full rounded-full transition-all duration-500" style="background: linear-gradient(90deg, var(--user-color-primary) 0%, var(--user-color-secondary) 100%);" :style="{ width: ((character.好感对沈含烟 || 0) / 10) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-lg p-3" style="background: var(--warm-bg-light); border-left: 3px solid var(--user-color-primary);">
        <div class="font-title text-[0.85rem] text-title font-bold mb-2">角色特点</div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">外貌</div>
            <div class="text-[0.75rem] text-primary">英俊冷峻，气质出众</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">能力</div>
            <div class="text-[0.75rem] text-primary">学神、武力强、家境优渥</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">性格</div>
            <div class="text-[0.75rem] text-primary">绝对控制欲、占有欲强</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">对主角</div>
            <div class="text-[0.75rem] text-primary">从注意到兴趣到执着</div>
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
    陆辞夜?: {
      好感对苏晚棠?: number;
      好感对沈含烟?: number;
    };
  };
}

const props = defineProps<Props>();
const character = computed(() => props.statData?.陆辞夜 || {});
</script>