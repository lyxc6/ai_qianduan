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
import { computed, ref, watch } from 'vue';

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

function 校验JSON() {
  try {
    const parsed = JSON.parse(editableContent.value);
    toastr.success(`校验通过 - ${parsed.length}个操作`);
  } catch (e) {
    toastr.error('校验失败', (e as Error).message);
  }
}

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
</script>
