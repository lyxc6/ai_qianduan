/**
 * 写入酒馆输入框并触发 input 事件（由酒馆监听自动发送）
 * mode: 'replace' 覆盖 / 'append' 追加到已有内容之后
 */
export function setSTInput(text: string, mode: 'replace' | 'append' = 'replace'): boolean {
  const sels = [
    '#send_textarea',
    '#send_textarea textarea',
    'textarea[name="send_textarea"]',
    'textarea#chat-input',
    'textarea[data-testid="send_textarea"]',
  ];
  const roots = [window.top, window.parent, window].filter((v, i, a) => v && a.indexOf(v) === i);
  let el: HTMLTextAreaElement | null = null;
  let doc: Document | null = null;
  for (const root of roots) {
    try {
      doc = root.document;
      for (const s of sels) {
        el = doc!.querySelector(s) as HTMLTextAreaElement;
        if (el && !el.closest('.hh-phone')) break; // 跳过扩展自身 iframe 内的元素
        el = null;
      }
      if (el) break;
    } catch (e) {
      /* 跨域访问被拒绝，忽略 */
    }
  }
  if (!el) {
    alert('未找到酒馆输入框，请手动复制：\n\n' + text);
    return false;
  }
  try {
    el.focus();
    const prev = String(el.value || '');
    const next = mode === 'append' && prev.trim() ? `${prev.trim()}\n\n${text}` : text;
    el.value = '';
    el.value = next;
    el.dispatchEvent(new InputEvent('input', { bubbles: true, data: next, inputType: 'insertText' }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    if (doc && doc.defaultView && doc.defaultView.jQuery) {
      doc.defaultView.jQuery(el).val(next).trigger('input').trigger('change');
    }
    return true;
  } catch (e) {
    alert('写入输入框失败，请手动复制：\n\n' + text);
    return false;
  }
}

/** 发送一条经营行动指令：追加到输入框并触发，由 AI 演出剧情并结算变量 */
export function 发送行动(text: string): void {
  setSTInput(text, 'append');
}
