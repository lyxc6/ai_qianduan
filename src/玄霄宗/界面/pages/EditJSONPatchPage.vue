<template>
  <div class="xx-page">
    <!-- 页面头部 -->
    <div class="patch-header">
      <div class="patch-header-content">
        <button class="patch-back-btn" @click="goBack">
          <i class="fa-solid fa-arrow-left"></i>
          <span>返回设置</span>
        </button>
        <div class="patch-title-section">
          <h1 class="patch-title">编辑当前楼层JSONPatch</h1>
          <p class="patch-subtitle">修改最新AI回复中的变量更新</p>
        </div>
      </div>
    </div>

    <!-- 楼层信息 -->
    <div class="patch-info-card" v-if="currentMessage">
      <div class="patch-info-header">
        <i class="fa-solid fa-message"></i>
        <span class="patch-info-label">当前楼层</span>
        <span class="patch-info-value">#{{ currentMessage.message_id }} ({{ currentMessage.name }})</span>
      </div>
    </div>

    <!-- 编辑区域 -->
    <div class="patch-editor-card">
      <div class="patch-editor-header">
        <span class="patch-editor-label">JSONPatch内容</span>
        <div class="patch-editor-actions">
          <button class="patch-action-btn" @click="formatJSON" title="格式化">
            <i class="fa-solid fa-indent"></i>
          </button>
          <button class="patch-action-btn" @click="validateJSON" title="验证JSON">
            <i class="fa-solid fa-check-circle"></i>
          </button>
        </div>
      </div>
      <textarea
        class="patch-textarea"
        v-model="jsonPatchContent"
        :class="{ 'patch-textarea-error': hasError }"
        placeholder="从消息中未找到JSONPatch内容..."
        rows="16"
      ></textarea>
      <div class="patch-error" v-if="hasError">{{ errorMessage }}</div>
    </div>

    <!-- 保存按钮 -->
    <div class="patch-save-section">
      <button class="patch-save-btn" @click="saveAndApply" :disabled="hasError">
        <i class="fa-solid fa-check"></i>
        <span>应用修改</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import type { Router } from 'vue-router';

const router = inject<Router>('router');

// 当前消息
const currentMessage = ref<any>(null);
// JSONPatch内容
const jsonPatchContent = ref('');
// 错误状态
const hasError = ref(false);
const errorMessage = ref('');
// 原始完整消息
const originalMessage = ref('');
const startTag = '<JSONPatch>';
const endTag = '</JSONPatch>';

function goBack() {
  router?.push('/settings');
}

// 从消息中提取JSONPatch
function extractJSONPatch(content: string) {
  const startIndex = content.indexOf(startTag);
  const endIndex = content.indexOf(endTag);
  if (startIndex !== -1 && endIndex !== -1) {
    return content.slice(startIndex + startTag.length, endIndex).trim();
  }
  return '';
}

// 获取最新楼层消息
function loadLatestMessage() {
  try {
    const messages = getChatMessages(-1);
    if (messages.length > 0) {
      currentMessage.value = messages[0];
      originalMessage.value = currentMessage.value.message;
      const extracted = extractJSONPatch(originalMessage.value);
      jsonPatchContent.value = extracted;
      if (!extracted) {
        toastr.warning('当前楼层未找到JSONPatch内容', '提示');
      }
    } else {
      toastr.error('未找到聊天消息', '错误');
    }
  } catch (error) {
    toastr.error('获取消息失败: ' + error, '错误');
  }
}

// 格式化JSON
function formatJSON() {
  try {
    if (jsonPatchContent.value.trim()) {
      const parsed = JSON.parse(jsonPatchContent.value);
      jsonPatchContent.value = JSON.stringify(parsed, null, 2);
      hasError.value = false;
      errorMessage.value = '';
    }
  } catch (e) {
    hasError.value = true;
    errorMessage.value = 'JSON格式错误: ' + (e as Error).message;
  }
}

// 验证JSON
function validateJSON() {
  try {
    if (jsonPatchContent.value.trim()) {
      JSON.parse(jsonPatchContent.value);
      hasError.value = false;
      errorMessage.value = '';
      toastr.success('JSON格式正确', '验证通过');
    }
  } catch (e) {
    hasError.value = true;
    errorMessage.value = 'JSON格式错误: ' + (e as Error).message;
    toastr.error('JSON格式错误', '验证失败');
  }
}

// 保存并应用修改
async function saveAndApply() {
  try {
    // 先验证JSON
    if (jsonPatchContent.value.trim()) {
      JSON.parse(jsonPatchContent.value);
    }

    // 构建新的消息内容
    let newMessage = '';
    const startIndex = originalMessage.value.indexOf(startTag);
    const endIndex = originalMessage.value.indexOf(endTag);

    if (startIndex !== -1 && endIndex !== -1) {
      // 替换原有内容
      newMessage =
        originalMessage.value.slice(0, startIndex + startTag.length) +
        '\n' +
        jsonPatchContent.value +
        '\n' +
        originalMessage.value.slice(endIndex);
    } else if (jsonPatchContent.value.trim()) {
      // 没有找到标签，追加到末尾
      newMessage = originalMessage.value + '\n' + startTag + '\n' + jsonPatchContent.value + '\n' + endTag;
    } else {
      // 清空内容
      if (startIndex !== -1 && endIndex !== -1) {
        newMessage = originalMessage.value.slice(0, startIndex) + originalMessage.value.slice(endIndex + endTag.length);
      } else {
        newMessage = originalMessage.value;
      }
    }

    // 更新楼层消息
    await setChatMessages([
      {
        message_id: currentMessage.value.message_id,
        message: newMessage,
      },
    ]);

    toastr.success('JSONPatch已更新并应用', '成功');
    goBack();
  } catch (e) {
    hasError.value = true;
    errorMessage.value = 'JSON格式错误: ' + (e as Error).message;
    toastr.error('保存失败: ' + (e as Error).message, '错误');
  }
}

onMounted(() => {
  loadLatestMessage();
});
</script>

<style lang="scss" scoped>
/* 页面头部 */
.patch-header {
  background: linear-gradient(135deg, rgba(74, 85, 104, 0.08) 0%, rgba(212, 175, 55, 0.05) 100%);
  border-bottom: 0.0625rem solid var(--xx-border);
  padding: 1rem;
}

.patch-header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* 返回按钮 */
.patch-back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 0.0625rem solid var(--xx-border);
  background: var(--xx-paper);
  color: var(--xx-ink);

  i {
    font-size: 0.875rem;
    color: var(--xx-cyan);
  }

  &:hover {
    background: rgba(74, 85, 104, 0.05);
    border-color: var(--xx-cyan);
  }
}

/* 标题区域 */
.patch-title-section {
  flex: 1;
}

.patch-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--xx-ink);
  letter-spacing: 0.0625rem;
}

.patch-subtitle {
  margin: 0.25rem 0 0 0;
  font-size: 0.8125rem;
  color: var(--xx-light-cyan);
}

/* 楼层信息卡片 */
.patch-info-card {
  margin-top: 1rem;
  background: rgba(74, 85, 104, 0.05);
  border: 0.0625rem solid var(--xx-border);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
}

.patch-info-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.patch-info-header i {
  color: var(--xx-cyan);
  font-size: 1rem;
}

.patch-info-label {
  font-size: 0.875rem;
  color: var(--xx-cyan);
  font-weight: 600;
}

.patch-info-value {
  font-size: 0.875rem;
  color: var(--xx-ink);
  font-weight: 600;
}

/* 编辑卡片 */
.patch-editor-card {
  margin-top: 1rem;
  background: var(--xx-paper);
  border-radius: 0.5rem;
  border: 0.0625rem solid var(--xx-border);
  overflow: hidden;
  box-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.03);
}

.patch-editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, rgba(74, 85, 104, 0.06) 0%, transparent 100%);
  border-bottom: 0.0625rem solid var(--xx-border);
}

.patch-editor-label {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--xx-ink);
}

.patch-editor-actions {
  display: flex;
  gap: 0.5rem;
}

.patch-action-btn {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  border: 0.0625rem solid var(--xx-border);
  background: var(--xx-paper);
  color: var(--xx-light-cyan);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;

  &:hover {
    border-color: var(--xx-cyan);
    color: var(--xx-cyan);
    background: rgba(74, 85, 104, 0.05);
  }
}

/* 文本编辑区域 */
.patch-textarea {
  width: 100%;
  min-height: 20rem;
  padding: 1rem;
  border: none;
  background: var(--xx-bg);
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--xx-ink);
  resize: vertical;
  outline: none;
  transition: box-shadow 0.2s ease;

  &:focus {
    background: var(--xx-paper);
  }

  &::placeholder {
    color: var(--xx-pale-cyan);
  }
}

.patch-textarea-error {
  box-shadow: inset 0 0 0 0.125rem rgba(239, 68, 68, 0.2);
}

.patch-error {
  padding: 0.5rem 1rem;
  background: rgba(239, 68, 68, 0.05);
  border-top: 0.0625rem solid rgba(239, 68, 68, 0.15);
  color: #dc2626;
  font-size: 0.8125rem;
}

/* 保存区域 */
.patch-save-section {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}

.patch-save-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  border: none;
  background: linear-gradient(135deg, var(--xx-success), #047857);
  color: white;
  box-shadow: 0 0.25rem 0.75rem rgba(5, 150, 105, 0.3);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #047857, #065f46);
    box-shadow: 0 0.375rem 1rem rgba(5, 150, 105, 0.4);
    transform: translateY(-0.0625rem);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 0.125rem 0.5rem rgba(5, 150, 105, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

/* 响应式适配 */
@media (max-width: 375px) {
  .patch-header {
    padding: 0.75rem;
  }

  .patch-title {
    font-size: 1rem;
  }

  .patch-textarea {
    padding: 0.75rem;
    font-size: 0.8125rem;
  }

  .patch-save-btn {
    padding: 0.625rem 1.5rem;
    font-size: 0.875rem;
  }
}
</style>
