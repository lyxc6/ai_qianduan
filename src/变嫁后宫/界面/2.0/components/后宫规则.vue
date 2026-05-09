<template>
  <div class="rules-container">
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
