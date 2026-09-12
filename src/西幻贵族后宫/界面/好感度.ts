// 好感度 → 阶段文案 / 徽章样式（阈值与《世界观/后宫规则》的好感度机制一致）
// 阶段原本由 schema 的 transform 派生并写进变量（$好感阶段），现在改为界面侧计算：
// 变量里只保留 AI 需要维护的字段，界面拿到的数值永远是最新的。

/** 好感度对应的阶段文案 */
export function 好感阶段(好感度?: number): string {
  const 值 = 好感度 ?? 0;
  if (值 < 20) return '陌生戒备';
  if (值 < 40) return '初露好感';
  if (值 < 60) return '心生倾慕';
  if (值 < 80) return '情愫暗生';
  return '死心塌地';
}

/** 好感度对应的徽章样式类（对应 global.css 里的 badge-* ） */
export function 阶段徽章(好感度?: number): string {
  const 值 = 好感度 ?? 0;
  if (值 < 20) return 'badge-trial';
  if (值 < 40) return 'badge-bronze';
  if (值 < 60) return 'badge-silver';
  if (值 < 80) return 'badge-gold';
  return 'badge-flower';
}
