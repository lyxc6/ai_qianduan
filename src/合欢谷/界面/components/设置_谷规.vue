<template>
  <details class="setting-section">
    <summary>谷规</summary>
    <div class="setting-content">
      <div class="rules-list">
        <div v-for="(rule, index) in rules" :key="index" class="rule-item">
          <textarea v-model="rules[index]" class="rule-input" placeholder="请输入谷规"></textarea>
          <i class="fas fa-times delete-icon" @click="删除规则(index)" title="删除"></i>
        </div>
        <!-- 
            三个按钮：保存、重置、添加规则
            保存按钮：将规则以yaml格式写入到世界书
            重置按钮：恢复规则到刚读取的状态
            添加规则按钮：添加一个空规则项
        -->
        <div class="add-rule-btn" @click="添加规则">
          <i class="fas fa-plus add-icon"></i>
          <span>添加规则</span>
        </div>
      </div>
      <div class="rules-actions">
        <button class="action-btn save-btn" @click="保存谷规" :disabled="保存中">
          <i class="fas fa-save"></i>
          <span>{{ 保存中 ? '保存中...' : '保存' }}</span>
        </button>
        <button class="action-btn reset-btn" @click="重置谷规" :disabled="重置中">
          <i class="fas fa-undo"></i>
          <span>{{ 重置中 ? '重置中...' : '重置' }}</span>
        </button>
      </div>
    </div>
  </details>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const 原始谷规 = ref<string[]>([]);
const rules = ref<string[]>([]);
const 保存中 = ref(false);
const 重置中 = ref(false);

async function 从世界书读取谷规() {
  try {
    const 世界书名字 = getCharWorldbookNames('current').primary;
    if (!世界书名字) {
      console.warn('【谷规】没有找到世界书');
      return;
    }

    const 世界书 = await getWorldbook(世界书名字);
    const 谷规条目 = 世界书.find((entry: any) => entry.name === '[mvu_plot]合欢谷.谷规');

    if (谷规条目 && 谷规条目.content) {
      const yamlContent = 谷规条目.content;
      const parsed = YAML.parse(yamlContent);
      if (parsed && parsed.谷规 && Array.isArray(parsed.谷规)) {
        rules.value = parsed.谷规;
        原始谷规.value = [...parsed.谷规];
      }
    }
  } catch (e) {
    console.error('【谷规】读取失败:', e);
  }
}

async function 保存谷规() {
  if (保存中.value) return;
  保存中.value = true;

  try {
    const 世界书名字 = getCharWorldbookNames('current').primary;
    if (!世界书名字) {
      console.warn('【谷规】没有找到世界书');
      return;
    }

    const yamlString = 对象转YAML({ 谷规: rules.value });
    const 新条目内容 = {
      uid: 0,
      name: '[mvu_plot]合欢谷.谷规',
      enabled: true,
      content: yamlString,
      position: { type: 'before_character_definition' },
      strategy: {
        type: 'constant',
        keys: [],
        keys_secondary: { logic: 'and_any', keys: [] },
        scan_depth: 'same_as_global',
      },
      effect: { sticky: null, cooldown: null, delay: null },
    };

    const 当前世界书 = await getWorldbook(世界书名字);
    let 找到谷规条目 = false;
    const 更新后的世界书 = 当前世界书.map((entry: any) => {
      if (entry.name === '[mvu_plot]合欢谷.谷规') {
        找到谷规条目 = true;
        return { ...entry, ...新条目内容, uid: entry.uid };
      }
      return entry;
    });

    if (!找到谷规条目) {
      更新后的世界书.push({ ...新条目内容, uid: Math.max(0, ...当前世界书.map((e: any) => e.uid || 0)) + 1 });
    }

    await replaceWorldbook(世界书名字, 更新后的世界书);
    原始谷规.value = [...rules.value];
    console.info('【谷规】保存成功');
  } catch (e) {
    console.error('【谷规】保存失败:', e);
  } finally {
    保存中.value = false;
  }
}

function 重置谷规() {
  if (重置中.value) return;
  重置中.value = true;
  rules.value = [...原始谷规.value];
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
  从世界书读取谷规();
});
</script>

<style lang="scss" scoped>
.rules-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rule-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  background: rgba(43, 29, 14, 0.2);
  border: 1px solid rgba(165, 113, 58, 0.2);
  border-radius: 0.4rem;
  padding: 0.5rem;
}

.rule-input {
  flex: 1;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(165, 113, 58, 0.3);
  border-radius: 0.25rem;
  padding: 0.4rem;
  font-size: 0.8rem;
  color: var(--text-primary, #f0e6d3);
  font-family: inherit;
  resize: vertical;
  min-height: 2.5rem;

  &:focus {
    outline: none;
    border-color: rgba(212, 177, 106, 0.8);
  }

  &::placeholder {
    color: rgba(184, 169, 143, 0.5);
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
  border: 1px dashed rgba(165, 113, 58, 0.4);
  border-radius: 0.4rem;
  background: rgba(43, 29, 14, 0.1);
  color: var(--text-secondary, #b8a98f);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(43, 29, 14, 0.3);
    border-color: rgba(165, 113, 58, 0.6);
    color: var(--text-primary, #f0e6d3);
  }
}

.add-icon {
  color: rgba(100, 200, 100, 0.7);
  font-size: 0.8rem;
  transition: color 0.2s;
}

.rules-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(165, 113, 58, 0.3);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.8rem;
  border: 1px solid rgba(165, 113, 58, 0.5);
  border-radius: 0.25rem;
  background: rgba(165, 113, 58, 0.2);
  color: var(--text-primary, #f0e6d3);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: rgba(165, 113, 58, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.save-btn {
  &:hover:not(:disabled) {
    background: rgba(100, 150, 255, 0.3);
    border-color: rgba(100, 150, 255, 0.5);
  }
}

.reset-btn {
  &:hover:not(:disabled) {
    background: rgba(255, 150, 100, 0.3);
    border-color: rgba(255, 150, 100, 0.5);
  }
}

.setting-section {
  margin-bottom: 0.5rem;

  details {
    transition: all 0.5s ease;
  }

  summary {
    cursor: pointer;
    padding: 0.5rem;
    background: linear-gradient(135deg, rgba(43, 29, 14, 0.6) 0%, rgba(62, 42, 20, 0.4) 100%);
    border-radius: 0.4rem;
    color: var(--user-color-primary, #d4b16a);
    font-family: var(--font-title, 'ZCOOL XiaoWei', serif);
    font-size: 0.9rem;
    letter-spacing: 1px;
    transition: all 0.5s ease;
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::-webkit-details-marker {
      display: none;
    }

    &::before {
      content: '▶';
      font-size: 0.7rem;
      transition: transform 0.5s ease;
      color: var(--user-color-primary, #d4b16a);
    }

    &:hover {
      background: linear-gradient(135deg, rgba(43, 29, 14, 0.8) 0%, rgba(62, 42, 20, 0.6) 100%);
    }
  }

  &[open] summary::before {
    transform: rotate(90deg);
  }

  &[open] > summary {
    border-radius: 0.4rem 0.4rem 0 0;
    border-bottom: 1px solid rgba(165, 113, 58, 0.3);
  }

  .setting-content {
    padding: 0.75rem;
    background: rgba(43, 29, 14, 0.4);
    border-radius: 0 0 0.4rem 0.4rem;
    opacity: 0;
    transform: translateY(-10px);
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  }
}

.setting-section[open] .setting-content {
  opacity: 1;
  transform: translateY(0);
}
</style>
