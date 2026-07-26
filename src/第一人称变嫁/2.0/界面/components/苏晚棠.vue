<template>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col gap-3">
      <div class="rounded-lg p-3" style="background: var(--warm-bg-light); border-left: 3px solid var(--user-color-primary);">
        <div class="font-title text-[0.85rem] text-title font-bold mb-2">基本信息</div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">姓名</div>
            <div class="text-[0.75rem] text-primary">苏晚棠</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">年龄</div>
            <div class="text-[0.75rem] text-primary">16岁</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">身份</div>
            <div class="text-[0.75rem] text-primary">穿越者、TS病患者</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">处女</div>
            <div class="text-[0.75rem] text-primary">{{ character.处女 === true ? '是' : character.处女 === false ? '否' : '未知' }}</div>
          </div>
        </div>
      </div>

      <div class="rounded-lg p-3" style="background: var(--warm-bg-light); border-left: 3px solid var(--user-color-primary);">
        <div class="font-title text-[0.85rem] text-title font-bold mb-2">好感度</div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">对陆辞夜</div>
            <div class="text-[0.75rem] text-primary">{{ character.好感对陆辞夜 || 0 }}</div>
            <div class="h-2 rounded-full overflow-hidden mt-1" style="background: var(--warm-bg-dark);">
              <div class="h-full rounded-full transition-all duration-500" style="background: linear-gradient(90deg, var(--user-color-primary) 0%, var(--user-color-secondary) 100%);" :style="{ width: ((character.好感对陆辞夜 || 0) / 10) + '%' }"></div>
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
        <div class="font-title text-[0.85rem] text-title font-bold mb-2">沦陷度</div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">沦陷程度</div>
            <div class="text-[0.75rem] text-primary">{{ character.沦陷 || 0 }}%</div>
            <div class="h-2 rounded-full overflow-hidden mt-1" style="background: var(--warm-bg-dark);">
              <div class="h-full rounded-full transition-all duration-500" style="background: linear-gradient(90deg, var(--user-color-primary) 0%, var(--user-color-secondary) 100%);" :style="{ width: (character.沦陷 || 0) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-lg p-3" style="background: var(--warm-bg-light); border-left: 3px solid var(--user-color-primary);">
        <div class="font-title text-[0.85rem] text-title font-bold mb-2">生理状态</div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">生理阶段</div>
            <div class="text-[0.75rem] text-primary">{{ character.生理阶段 || '安全期' }}</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">生理天数</div>
            <div class="text-[0.75rem] text-primary">{{ character.生理天数 || 1 }}</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">上次经期</div>
            <div class="text-[0.75rem] text-primary">{{ character.上次经期 || '无' }}</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">经验等级</div>
            <div class="text-[0.75rem] text-primary">{{ character.经验等级 || 0 }}</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">亲密状态</div>
            <div class="text-[0.75rem] text-primary">{{ character.亲密状态 || '正常' }}</div>
          </div>
        </div>
      </div>

      <div class="rounded-lg p-3" style="background: var(--warm-bg-light); border-left: 3px solid var(--user-color-primary);">
        <div class="font-title text-[0.85rem] text-title font-bold mb-2">NSFW数据</div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">胸部开发</div>
            <div class="text-[0.75rem] text-primary">{{ character.胸部开发 || 0 }}%</div>
            <div class="h-2 rounded-full overflow-hidden mt-1" style="background: var(--warm-bg-dark);">
              <div class="h-full rounded-full transition-all duration-500" style="background: linear-gradient(90deg, var(--user-color-primary) 0%, var(--user-color-secondary) 100%);" :style="{ width: (character.胸部开发 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">阴蒂开发</div>
            <div class="text-[0.75rem] text-primary">{{ character.阴蒂开发 || 0 }}%</div>
            <div class="h-2 rounded-full overflow-hidden mt-1" style="background: var(--warm-bg-dark);">
              <div class="h-full rounded-full transition-all duration-500" style="background: linear-gradient(90deg, var(--user-color-primary) 0%, var(--user-color-secondary) 100%);" :style="{ width: (character.阴蒂开发 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">阴道开发</div>
            <div class="text-[0.75rem] text-primary">{{ character.阴道开发 || 0 }}%</div>
            <div class="h-2 rounded-full overflow-hidden mt-1" style="background: var(--warm-bg-dark);">
              <div class="h-full rounded-full transition-all duration-500" style="background: linear-gradient(90deg, var(--user-color-primary) 0%, var(--user-color-secondary) 100%);" :style="{ width: (character.阴道开发 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">后庭开发</div>
            <div class="text-[0.75rem] text-primary">{{ character.后庭开发 || 0 }}%</div>
            <div class="h-2 rounded-full overflow-hidden mt-1" style="background: var(--warm-bg-dark);">
              <div class="h-full rounded-full transition-all duration-500" style="background: linear-gradient(90deg, var(--user-color-primary) 0%, var(--user-color-secondary) 100%);" :style="{ width: (character.后庭开发 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">兴奋度</div>
            <div class="text-[0.75rem] text-primary">{{ character.兴奋度 || 0 }}%</div>
            <div class="h-2 rounded-full overflow-hidden mt-1" style="background: var(--warm-bg-dark);">
              <div class="h-full rounded-full transition-all duration-500" style="background: linear-gradient(90deg, var(--user-color-primary) 0%, var(--user-color-secondary) 100%);" :style="{ width: (character.兴奋度 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">湿润度</div>
            <div class="text-[0.75rem] text-primary">{{ character.湿润度 || 0 }}%</div>
            <div class="h-2 rounded-full overflow-hidden mt-1" style="background: var(--warm-bg-dark);">
              <div class="h-full rounded-full transition-all duration-500" style="background: linear-gradient(90deg, var(--user-color-primary) 0%, var(--user-color-secondary) 100%);" :style="{ width: (character.湿润度 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">高潮次数</div>
            <div class="text-[0.75rem] text-primary">{{ character.高潮次数 || 0 }}</div>
          </div>
        </div>
      </div>

      <div class="rounded-lg p-3" style="background: var(--warm-bg-light); border-left: 3px solid var(--user-color-primary);">
        <div class="font-title text-[0.85rem] text-title font-bold mb-2">敏感部位</div>
        <div class="flex flex-col gap-2">
          <div class="flex flex-row items-center gap-2">
            <div class="text-[0.65rem] text-secondary min-w-[4rem]">耳朵</div>
            <div class="text-[0.7rem] text-primary">{{ character.耳朵敏感 || 0 }}%</div>
            <div class="flex-1 h-2 rounded-full overflow-hidden" style="background: var(--warm-bg-dark);">
              <div class="h-full rounded-full transition-all duration-500" style="background: linear-gradient(90deg, var(--user-color-primary) 0%, var(--user-color-secondary) 100%);" :style="{ width: (character.耳朵敏感 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="flex flex-row items-center gap-2">
            <div class="text-[0.65rem] text-secondary min-w-[4rem]">后颈</div>
            <div class="text-[0.7rem] text-primary">{{ character.后颈敏感 || 0 }}%</div>
            <div class="flex-1 h-2 rounded-full overflow-hidden" style="background: var(--warm-bg-dark);">
              <div class="h-full rounded-full transition-all duration-500" style="background: linear-gradient(90deg, var(--user-color-primary) 0%, var(--user-color-secondary) 100%);" :style="{ width: (character.后颈敏感 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="flex flex-row items-center gap-2">
            <div class="text-[0.65rem] text-secondary min-w-[4rem]">腰部</div>
            <div class="text-[0.7rem] text-primary">{{ character.腰部敏感 || 0 }}%</div>
            <div class="flex-1 h-2 rounded-full overflow-hidden" style="background: var(--warm-bg-dark);">
              <div class="h-full rounded-full transition-all duration-500" style="background: linear-gradient(90deg, var(--user-color-primary) 0%, var(--user-color-secondary) 100%);" :style="{ width: (character.腰部敏感 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="flex flex-row items-center gap-2">
            <div class="text-[0.65rem] text-secondary min-w-[4rem]">大腿内侧</div>
            <div class="text-[0.7rem] text-primary">{{ character.大腿内侧敏感 || 0 }}%</div>
            <div class="flex-1 h-2 rounded-full overflow-hidden" style="background: var(--warm-bg-dark);">
              <div class="h-full rounded-full transition-all duration-500" style="background: linear-gradient(90deg, var(--user-color-primary) 0%, var(--user-color-secondary) 100%);" :style="{ width: (character.大腿内侧敏感 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="flex flex-row items-center gap-2">
            <div class="text-[0.65rem] text-secondary min-w-[4rem]">胸部</div>
            <div class="text-[0.7rem] text-primary">{{ character.胸部敏感 || 0 }}%</div>
            <div class="flex-1 h-2 rounded-full overflow-hidden" style="background: var(--warm-bg-dark);">
              <div class="h-full rounded-full transition-all duration-500" style="background: linear-gradient(90deg, var(--user-color-primary) 0%, var(--user-color-secondary) 100%);" :style="{ width: (character.胸部敏感 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="flex flex-row items-center gap-2">
            <div class="text-[0.65rem] text-secondary min-w-[4rem]">阴蒂</div>
            <div class="text-[0.7rem] text-primary">{{ character.阴蒂敏感 || 0 }}%</div>
            <div class="flex-1 h-2 rounded-full overflow-hidden" style="background: var(--warm-bg-dark);">
              <div class="h-full rounded-full transition-all duration-500" style="background: linear-gradient(90deg, var(--user-color-primary) 0%, var(--user-color-secondary) 100%);" :style="{ width: (character.阴蒂敏感 || 0) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-lg p-3" style="background: var(--warm-bg-light); border-left: 3px solid var(--user-color-primary);">
        <div class="font-title text-[0.85rem] text-title font-bold mb-2">着装状态</div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div class="rounded-lg p-2 text-center" style="background: var(--warm-bg-medium);">
            <div class="text-[0.65rem] text-secondary mb-1">头发</div>
            <div class="text-[0.7rem] text-primary">{{ character.当前头发 || '无' }}</div>
          </div>
          <div class="rounded-lg p-2 text-center" style="background: var(--warm-bg-medium);">
            <div class="text-[0.65rem] text-secondary mb-1">上装</div>
            <div class="text-[0.7rem] text-primary">{{ character.当前上装 || '无' }}</div>
          </div>
          <div class="rounded-lg p-2 text-center" style="background: var(--warm-bg-medium);">
            <div class="text-[0.65rem] text-secondary mb-1">下装</div>
            <div class="text-[0.7rem] text-primary">{{ character.当前下装 || '无' }}</div>
          </div>
          <div class="rounded-lg p-2 text-center" style="background: var(--warm-bg-medium);">
            <div class="text-[0.65rem] text-secondary mb-1">内衣</div>
            <div class="text-[0.7rem] text-primary">{{ character.当前内衣 || '无' }}</div>
          </div>
          <div class="rounded-lg p-2 text-center" style="background: var(--warm-bg-medium);">
            <div class="text-[0.65rem] text-secondary mb-1">袜子</div>
            <div class="text-[0.7rem] text-primary">{{ character.当前袜子 || '无' }}</div>
          </div>
          <div class="rounded-lg p-2 text-center" style="background: var(--warm-bg-medium);">
            <div class="text-[0.65rem] text-secondary mb-1">鞋子</div>
            <div class="text-[0.7rem] text-primary">{{ character.当前鞋子 || '无' }}</div>
          </div>
          <div class="rounded-lg p-2 text-center" style="background: var(--warm-bg-medium);">
            <div class="text-[0.65rem] text-secondary mb-1">饰品</div>
            <div class="text-[0.7rem] text-primary">{{ character.当前饰品 || '无' }}</div>
          </div>
        </div>
      </div>

      <div class="rounded-lg p-3" style="background: var(--warm-bg-light); border-left: 3px solid var(--user-color-primary);">
        <div class="font-title text-[0.85rem] text-title font-bold mb-2">身体描述</div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">胸部</div>
            <div class="text-[0.75rem] text-primary">{{ character.当前胸部 || '无' }}</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-[0.65rem] text-secondary font-bold">阴部</div>
            <div class="text-[0.75rem] text-primary">{{ character.当前阴部 || '无' }}</div>
          </div>
        </div>
      </div>

      <div class="rounded-lg p-3" style="background: var(--warm-bg-light); border-left: 3px solid var(--user-color-primary);" v-if="hasBodyMemory">
        <div class="font-title text-[0.85rem] text-title font-bold mb-2">身体记忆</div>
        <div class="flex flex-col gap-2">
          <div class="rounded-lg p-2" style="background: var(--warm-bg-medium);" v-for="(memory, key) in character.身体记忆" :key="key">
            <div class="text-[0.75rem] font-bold text-title mb-1">{{ key }}</div>
            <div class="text-[0.7rem] text-primary">{{ memory.描述 }}</div>
            <div class="text-[0.65rem] text-secondary mt-1">触发条件：{{ memory.触发条件 }} | 强度：{{ memory.强度 }}%</div>
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
    苏晚棠?: {
      好感对陆辞夜?: number;
      好感对沈含烟?: number;
      沦陷?: number;
      生理阶段?: string;
      生理天数?: number;
      上次经期?: string;
      处女?: boolean;
      经验等级?: number;
      胸部开发?: number;
      阴蒂开发?: number;
      阴道开发?: number;
      后庭开发?: number;
      兴奋度?: number;
      湿润度?: number;
      高潮次数?: number;
      亲密状态?: string;
      耳朵敏感?: number;
      后颈敏感?: number;
      腰部敏感?: number;
      大腿内侧敏感?: number;
      胸部敏感?: number;
      阴蒂敏感?: number;
      身体记忆?: Record<string, { 描述: string; 触发条件: string; 强度: number }>;
      当前头发?: string;
      当前上装?: string;
      当前下装?: string;
      当前内衣?: string;
      当前袜子?: string;
      当前鞋子?: string;
      当前饰品?: string;
      当前胸部?: string;
      当前阴部?: string;
    };
  };
}

const props = defineProps<Props>();
const character = computed(() => props.statData?.苏晚棠 || {});
const hasBodyMemory = computed(() => {
  const memory = character.value.身体记忆;
  return memory && typeof memory === 'object' && Object.keys(memory).length > 0;
});
</script>