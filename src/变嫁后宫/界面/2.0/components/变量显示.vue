<template>
  <div v-if="hasUpdateContent" class="variable-update-container">
    <details class="variable-update-details">
      <summary class="variable-update-summary">
        👾变量更新
        <small><span class="toggle-hint" data-close="点击查看 ▶" data-open="点击隐藏 ▼"></span></small>
      </summary>
      <textarea class="variable-update-content" v-model="editableContent"></textarea>
      <div class="json-validate-result">
        <span class="validate-text">{{ jsonValidateResult }}</span>
        <div class="action-buttons">
          <button class="action-btn" @click="保存修改">保存</button>
          <button class="action-btn" @click="重置内容">重置</button>
          <button class="action-btn" @click="校验JSON">校验</button>
        </div>
      </div>
    </details>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  currentMessage?: any;
}>();

const outerRegex = /<(update(?:variable)?)>\s*((?:(?!<\1>).)*)\s*<\/\1>/gis;
const jsonPatchRegex = /<JSONPatch>\s*([\s\S]*?)\s*<\/JSONPatch>/gis;

const editableContent = ref('');

const hasUpdateContent = computed(() => {
  if (!props.currentMessage) {
    return false;
  }
  const messageText = props.currentMessage.message || '';
  const matches = [...messageText.matchAll(outerRegex)];
  return matches.length > 0;
});

const messageContent = computed(() => {
  if (!props.currentMessage) {
    return '暂无消息';
  }

  const messageText = props.currentMessage.message || '';
  const outerMatches = [...messageText.matchAll(outerRegex)];

  if (outerMatches.length === 0) {
    return '暂无变量更新';
  }

  const jsonPatchContents: string[] = [];

  for (const outerMatch of outerMatches) {
    const outerContent = outerMatch[2] || '';
    const jsonMatches = [...outerContent.matchAll(jsonPatchRegex)];

    for (const jsonMatch of jsonMatches) {
      if (jsonMatch[1]) {
        jsonPatchContents.push(jsonMatch[1].trim());
      }
    }
  }

  if (jsonPatchContents.length === 0) {
    return '暂无JSONPatch内容';
  }

  return jsonPatchContents.join('\n');
});

const jsonValidateResult = computed(() => {
  if (!editableContent.value) {
    return '';
  }

  try {
    const parsed = JSON.parse(editableContent.value);
    return `✅ JSON格式有效 - ${parsed.length}个操作`;
  } catch (e) {
    return `❌ JSON格式无效: ${(e as Error).message}`;
  }
});

watch(
  messageContent,
  newVal => {
    editableContent.value = newVal;
  },
  { immediate: true },
);

// 逻辑：
// 1. 先校验json格式是否正确。
// 2. 如果校验通过，显示成功提示；如果校验失败，显示错误提示。
// 3.1: 成功：用props.currentMessage的信息，替换里面的<UpdateVariable>内容，构建新的消息内容。
// 示例：<UpdateVariable><Analysis></Analysis><JSONPatch>这里放JSONPatch内容</JSONPatch> </UpdateVariable>
// 3.2: 失败：不构建新的消息内容，提示用户校验JSONPatch格式。
// 4.用setChatMessages函数更新楼层信息
async function 保存修改() {
  try {
    JSON.parse(editableContent.value);

    if (!props.currentMessage) {
      toastr.error('无法获取当前消息');
      return;
    }

    const originalMessage = props.currentMessage.message || '';
    const outerRegex = /<(update(?:variable)?)>\s*((?:(?!<\1>).)*)\s*<\/\1>/gis;

    let newMessage = originalMessage;
    let match;
    while ((match = outerRegex.exec(originalMessage)) !== null) {
      const updatedContent = match[0].replace(
        /<JSONPatch>[\s\S]*?<\/JSONPatch>/gis,
        `<JSONPatch>\n${editableContent.value}\n</JSONPatch>`,
      );
      newMessage = newMessage.replace(match[0], updatedContent);
    }

    if (newMessage === originalMessage) {
      toastr.error('未找到UpdateVariable标签');
      return;
    }

    await setChatMessages(
      [
        {
          message_id: props.currentMessage.message_id,
          message: newMessage,
        },
      ],
      { refresh: 'affected' },
    );

    toastr.success('保存成功');
  } catch (e) {
    toastr.error('JSON格式错误', (e as Error).message);
  }
}

function 重置内容() {
  editableContent.value = messageContent.value;
}

function 校验JSON() {
  try {
    const parsed = JSON.parse(editableContent.value);
    toastr.success(`校验通过 - ${parsed.length}个操作`);
  } catch (e) {
    toastr.error('校验失败', (e as Error).message);
  }
}
</script>

<style scoped lang="scss">
.variable-update-container {
  margin-bottom: 0.5rem;
}

.variable-update-details {
  background: linear-gradient(135deg, var(--warm-bg-light) 0%, var(--warm-bg-medium) 100%);
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px var(--warm-shadow);
  overflow: hidden;
  transition: all 0.3s ease;

  &[open] {
    box-shadow: 0 4px 12px var(--warm-shadow);
  }
}

.variable-update-summary {
  padding: 0.5rem 0.75rem;
  color: var(--text-title);
  font-family: var(--font-title);
  font-size: 0.85rem;
  cursor: pointer;
  list-style: none;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: var(--warm-hover-bg);
  }

  &::marker {
    display: none;
  }
}

.toggle-hint {
  font-family: var(--font-serif);
  font-size: 0.7rem;
  color: var(--text-secondary);
  transition: transform 0.3s ease;
}

.variable-update-details[open] .toggle-hint::after {
  content: attr(data-open);
}

.variable-update-details:not([open]) .toggle-hint::after {
  content: attr(data-close);
}

.variable-update-content {
  display: block;
  width: 100%;
  min-height: 2rem;
  overflow-y: auto;
  padding: 0.5rem 0.75rem;
  color: var(--text-primary);
  font-size: 0.75rem;
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: var(--bg-panel);
  border: none;
  resize: none;
  font-family: inherit;
  box-sizing: border-box;
  animation: fadeIn 0.3s ease;
  field-sizing: content;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: var(--warm-bg-dark);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 2px;
  }
}

.json-validate-result {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  font-size: 0.7rem;
  color: var(--text-secondary);
  background-color: var(--warm-bg-dark);
  border-top: 1px solid var(--border-color);
}

.validate-text {
  flex: 1;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.65rem;
  color: var(--text-primary);
  background-color: var(--bg-panel);
  border: 1px solid var(--border-color);
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--warm-hover-bg);
    border-color: var(--user-color-primary);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
