<template>
  <div class="character-detail-body">
    <div class="character-info-section">
      <div class="info-section">
        <div class="section-title">基本信息</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">姓名</div>
            <div class="info-value">苏晚棠</div>
          </div>
          <div class="info-item">
            <div class="info-label">年龄</div>
            <div class="info-value">16岁</div>
          </div>
          <div class="info-item">
            <div class="info-label">身份</div>
            <div class="info-value">穿越者、TS病患者</div>
          </div>
          <div class="info-item">
            <div class="info-label">处女</div>
            <div class="info-value">{{ character.处女 === true ? '是' : character.处女 === false ? '否' : '未知' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">好感度</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">对陆辞夜</div>
            <div class="info-value">{{ character.好感对陆辞夜 || 0 }}</div>
            <div class="bar">
              <div class="bar-fill" :style="{ width: ((character.好感对陆辞夜 || 0) / 10) + '%' }"></div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-label">对沈含烟</div>
            <div class="info-value">{{ character.好感对沈含烟 || 0 }}</div>
            <div class="bar">
              <div class="bar-fill" :style="{ width: ((character.好感对沈含烟 || 0) / 10) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">沦陷度</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">沦陷程度</div>
            <div class="info-value">{{ character.沦陷 || 0 }}%</div>
            <div class="bar">
              <div class="bar-fill" :style="{ width: (character.沦陷 || 0) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">生理状态</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">生理阶段</div>
            <div class="info-value">{{ character.生理阶段 || '安全期' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">生理天数</div>
            <div class="info-value">{{ character.生理天数 || 1 }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">上次经期</div>
            <div class="info-value">{{ character.上次经期 || '无' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">经验等级</div>
            <div class="info-value">{{ character.经验等级 || 0 }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">亲密状态</div>
            <div class="info-value">{{ character.亲密状态 || '正常' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">NSFW数据</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">胸部开发</div>
            <div class="info-value">{{ character.胸部开发 || 0 }}%</div>
            <div class="bar">
              <div class="bar-fill" :style="{ width: (character.胸部开发 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-label">阴蒂开发</div>
            <div class="info-value">{{ character.阴蒂开发 || 0 }}%</div>
            <div class="bar">
              <div class="bar-fill" :style="{ width: (character.阴蒂开发 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-label">阴道开发</div>
            <div class="info-value">{{ character.阴道开发 || 0 }}%</div>
            <div class="bar">
              <div class="bar-fill" :style="{ width: (character.阴道开发 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-label">后庭开发</div>
            <div class="info-value">{{ character.后庭开发 || 0 }}%</div>
            <div class="bar">
              <div class="bar-fill" :style="{ width: (character.后庭开发 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-label">兴奋度</div>
            <div class="info-value">{{ character.兴奋度 || 0 }}%</div>
            <div class="bar">
              <div class="bar-fill" :style="{ width: (character.兴奋度 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-label">湿润度</div>
            <div class="info-value">{{ character.湿润度 || 0 }}%</div>
            <div class="bar">
              <div class="bar-fill" :style="{ width: (character.湿润度 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-label">高潮次数</div>
            <div class="info-value">{{ character.高潮次数 || 0 }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">敏感部位</div>
        <div class="sensitive-bar">
          <div class="sensitive-item">
            <div class="sensitive-label">耳朵</div>
            <div class="info-value">{{ character.耳朵敏感 || 0 }}%</div>
            <div class="bar">
              <div class="bar-fill" :style="{ width: (character.耳朵敏感 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="sensitive-item">
            <div class="sensitive-label">后颈</div>
            <div class="info-value">{{ character.后颈敏感 || 0 }}%</div>
            <div class="bar">
              <div class="bar-fill" :style="{ width: (character.后颈敏感 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="sensitive-item">
            <div class="sensitive-label">腰部</div>
            <div class="info-value">{{ character.腰部敏感 || 0 }}%</div>
            <div class="bar">
              <div class="bar-fill" :style="{ width: (character.腰部敏感 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="sensitive-item">
            <div class="sensitive-label">大腿内侧</div>
            <div class="info-value">{{ character.大腿内侧敏感 || 0 }}%</div>
            <div class="bar">
              <div class="bar-fill" :style="{ width: (character.大腿内侧敏感 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="sensitive-item">
            <div class="sensitive-label">胸部</div>
            <div class="info-value">{{ character.胸部敏感 || 0 }}%</div>
            <div class="bar">
              <div class="bar-fill" :style="{ width: (character.胸部敏感 || 0) + '%' }"></div>
            </div>
          </div>
          <div class="sensitive-item">
            <div class="sensitive-label">阴蒂</div>
            <div class="info-value">{{ character.阴蒂敏感 || 0 }}%</div>
            <div class="bar">
              <div class="bar-fill" :style="{ width: (character.阴蒂敏感 || 0) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">着装状态</div>
        <div class="clothing-grid">
          <div class="clothing-item">
            <div class="clothing-label">头发</div>
            <div class="clothing-value">{{ character.当前头发 || '无' }}</div>
          </div>
          <div class="clothing-item">
            <div class="clothing-label">上装</div>
            <div class="clothing-value">{{ character.当前上装 || '无' }}</div>
          </div>
          <div class="clothing-item">
            <div class="clothing-label">下装</div>
            <div class="clothing-value">{{ character.当前下装 || '无' }}</div>
          </div>
          <div class="clothing-item">
            <div class="clothing-label">内衣</div>
            <div class="clothing-value">{{ character.当前内衣 || '无' }}</div>
          </div>
          <div class="clothing-item">
            <div class="clothing-label">袜子</div>
            <div class="clothing-value">{{ character.当前袜子 || '无' }}</div>
          </div>
          <div class="clothing-item">
            <div class="clothing-label">鞋子</div>
            <div class="clothing-value">{{ character.当前鞋子 || '无' }}</div>
          </div>
          <div class="clothing-item">
            <div class="clothing-label">饰品</div>
            <div class="clothing-value">{{ character.当前饰品 || '无' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">身体描述</div>
        <div class="info-group">
          <div class="info-item">
            <div class="info-label">胸部</div>
            <div class="info-value">{{ character.当前胸部 || '无' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">阴部</div>
            <div class="info-value">{{ character.当前阴部 || '无' }}</div>
          </div>
        </div>
      </div>

      <div class="info-section" v-if="hasBodyMemory">
        <div class="section-title">身体记忆</div>
        <div class="task-list">
          <div class="task-item" v-for="(memory, key) in character.身体记忆" :key="key">
            <div class="task-title">{{ key }}</div>
            <div class="task-description">{{ memory.描述 }}</div>
            <div class="task-status">触发条件：{{ memory.触发条件 }} | 强度：{{ memory.强度 }}%</div>
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