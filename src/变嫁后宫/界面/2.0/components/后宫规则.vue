<template>
  <div class="rules-container">
    <div class="rules-section">
      <div class="rules-title">后宫守则</div>
      <div class="rules-list">
        <div v-for="(rule, index) in rules" :key="index" class="rule-item">
          <textarea v-model="rules[index]" class="rule-input" placeholder="请输入守则"></textarea>
          <i class="fas fa-times delete-icon" @click="删除规则(index)" title="删除"></i>
        </div>
        <div class="add-rule-btn" @click="添加规则">
          <i class="fas fa-plus add-icon"></i>
          <span>添加守则</span>
        </div>
      </div>
      <div class="rules-actions">
        <button class="action-btn save-btn" @click="保存守则" :disabled="保存中">
          <i class="fas fa-save"></i>
          <span>{{ 保存中 ? '保存中...' : '保存' }}</span>
        </button>
        <button class="action-btn reset-btn" @click="重置守则" :disabled="重置中">
          <i class="fas fa-undo"></i>
          <span>{{ 重置中 ? '重置中...' : '重置' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Props {
  statData?: {
    后宫守则?: string[];
    [key: string]: any;
  };
}

const props = defineProps<Props>();

const 原始守则 = ref<string[]>([]);
const rules = ref<string[]>([]);
const 保存中 = ref(false);
const 重置中 = ref(false);

function 初始化守则() {
  从世界书读取守则();
}

async function 从世界书读取守则() {
  try {
    const 世界书名字 = getCharWorldbookNames('current').primary;
    if (!世界书名字) {
      console.warn('【后宫守则】没有找到世界书');
      return;
    }

    const 世界书 = await getWorldbook(世界书名字);
    const 守则条目 = 世界书.find((entry: any) => entry.name === '[mvu_plot]后宫规则');

    if (守则条目 && 守则条目.content) {
      const yamlContent = 守则条目.content;
      const parsed = YAML.parse(yamlContent);
      if (parsed && parsed.后宫守则 && Array.isArray(parsed.后宫守则)) {
        rules.value = parsed.后宫守则;
        原始守则.value = [...parsed.后宫守则];
        console.log('【后宫守则】从世界书读取到', rules.value.length, '条守则');
      }
    }
  } catch (e) {
    console.error('【后宫守则】读取失败:', e);
  }
}

async function 保存守则() {
  if (保存中.value) return;
  保存中.value = true;

  try {
    const 世界书名字 = getCharWorldbookNames('current').primary;
    if (!世界书名字) {
      toastr.error('没有找到世界书', '错误');
      return;
    }

    const yamlString = 对象转YAML({ 后宫守则: rules.value });
    const 新条目内容 = {
      uid: 0,
      name: '[mvu_plot]后宫规则',
      enabled: true,
      content: yamlString,
      position: { type: 'after_character_definition' },
      strategy: {
        type: 'constant',
        keys: [],
        keys_secondary: { logic: 'and_any', keys: [] },
        scan_depth: 'same_as_global',
      },
      effect: { sticky: null, cooldown: null, delay: null },
    };

    const 当前世界书 = await getWorldbook(世界书名字);
    let 找到守则条目 = false;
    const 更新后的世界书 = 当前世界书.map((entry: any) => {
      if (entry.name === '[mvu_plot]后宫规则') {
        找到守则条目 = true;
        return { ...entry, ...新条目内容, uid: entry.uid };
      }
      return entry;
    });

    if (!找到守则条目) {
      更新后的世界书.push({ ...新条目内容, uid: Math.max(0, ...当前世界书.map((e: any) => e.uid || 0)) + 1 });
    }

    await replaceWorldbook(世界书名字, 更新后的世界书);
    原始守则.value = [...rules.value];
    toastr.success('后宫守则已保存', '成功');
  } catch (e) {
    console.error('【后宫守则】保存失败:', e);
    toastr.error('保存失败: ' + e, '错误');
  } finally {
    保存中.value = false;
  }
}

function 重置守则() {
  if (重置中.value) return;
  重置中.value = true;
  rules.value = [...原始守则.value];
  toastr.info('已恢复到上次保存的状态', '重置');
  setTimeout(() => {
    重置中.value = false;
  }, 300);
}

const 添加规则 = () => {
  rules.value.push('');
};

const 删除规则 = (index: number) => {
  rules.value.splice(index, 1);
};

function 对象转YAML(obj: Record<string, unknown>, indent: number = 0): string {
  const spaces = ' '.repeat(indent);
  let result = '';

  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (typeof item === 'object' && item !== null) {
        result += `${spaces}- ${对象转YAML(item as Record<string, unknown>, indent + 2).trim()}\n`;
      } else {
        result += `${spaces}- ${item}\n`;
      }
    }
  } else if (typeof obj === 'object' && obj !== null) {
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        result += `${spaces}${key}:\n`;
        for (const item of value) {
          if (typeof item === 'object' && item !== null) {
            result += `${spaces}  - ${对象转YAML(item as Record<string, unknown>, indent + 2).trim()}\n`;
          } else {
            result += `${spaces}  - ${item}\n`;
          }
        }
      } else if (typeof value === 'object' && value !== null) {
        result += `${spaces}${key}:\n${对象转YAML(value as Record<string, unknown>, indent + 1)}`;
      } else {
        result += `${spaces}${key}: ${value}\n`;
      }
    }
  }

  return result;
}

onMounted(() => {
  初始化守则();
});
</script>

<style lang="scss">
.rules-container {
  padding: 0.25rem;
  height: 100%;
  overflow-y: auto;
}

.rules-section {
  background: linear-gradient(135deg, var(--warm-gradient-start) 0%, var(--warm-gradient-end) 100%);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow:
    0 2px 8px var(--warm-shadow),
    inset 0 1px 0 var(--warm-inner-light);
}

.rules-title {
  font-family: var(--font-title);
  font-size: 1.1rem;
  color: var(--text-title);
  text-align: center;
  margin-bottom: 1rem;
  letter-spacing: 3px;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--warm-border-light);
}

.rules-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rule-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid var(--warm-border-light);
  border-radius: 0.4rem;
  padding: 0.5rem;
}

.rule-input {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--warm-border-light);
  border-radius: 0.25rem;
  padding: 0.4rem;
  font-size: 0.8rem;
  color: var(--text-primary);
  font-family: inherit;
  resize: vertical;
  min-height: 2.5rem;

  &:focus {
    outline: none;
    border-color: var(--user-color-primary);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
}

.delete-icon {
  color: rgba(255, 100, 100, 0.7);
  cursor: pointer;
  margin-top: 0.3rem;
  font-size: 0.8rem;
  transition: color 0.2s;

  &:hover {
    color: rgba(255, 80, 80, 1);
  }
}

.add-rule-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px dashed var(--border-color);
  border-radius: 0.4rem;
  background: var(--warm-bg-light);
  color: var(--text-secondary);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--warm-bg-dark);
    border-color: var(--warm-border-hover);
    color: var(--text-primary);
  }
}

.add-icon {
  color: rgba(100, 200, 100, 0.7);
  font-size: 0.8rem;
}

.rules-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--warm-border-light);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--warm-border-light);
  border-radius: 0.25rem;
  background: var(--warm-bg-light);
  color: var(--text-primary);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: var(--warm-bg-dark);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.save-btn {
  &:hover:not(:disabled) {
    background: rgba(100, 150, 255, 0.2);
    border-color: rgba(100, 150, 255, 0.5);
  }
}

.reset-btn {
  &:hover:not(:disabled) {
    background: rgba(255, 150, 100, 0.2);
    border-color: rgba(255, 150, 100, 0.5);
  }
}
</style>
