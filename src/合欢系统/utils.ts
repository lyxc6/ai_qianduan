const esc = (v: unknown) =>
  String(v ?? '—').replace(/[&<>"]/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[s] as string);
const num = (v: unknown) => Number(v || 0);
const grade = (n: number) =>
  n >= 95 ? 'S' : n >= 85 ? 'A' : n >= 75 ? 'B' : n >= 65 ? 'C' : n >= 55 ? 'D' : n >= 45 ? 'E' : '不入流';

function setSTInput(text: string, mode = 'replace') {
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
        if (el && !el.closest('.hh-phone')) break;
        el = null;
      }
      if (el) break;
    } catch (e) {}
  }
  if (!el) {
    alert('未找到酒馆输入框，请手动复制：\n\n' + text);
    return;
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
  } catch (e) {
    alert('写入输入框失败，请手动复制：\n\n' + text);
  }
}

function buildRow(k: string, v: unknown) {
  return { k, v };
}

function buildCard(title: string, rows: Array<{ k: string; v: unknown }>) {
  return { title, rows };
}

export { esc, num, grade, setSTInput, buildRow, buildCard };
