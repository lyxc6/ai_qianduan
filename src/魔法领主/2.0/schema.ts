const num = z.coerce.number().transform(v => Math.max(0, v)).prefault(0);
const pct = z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0);

const CharacterSchema = z.object({
  背景: z.string().prefault(''),
  外貌: z.object({
    体型: z.string().prefault(''),
    面容: z.string().prefault(''),
    发色: z.string().prefault(''),
    眼睛: z.string().prefault(''),
    肤色: z.string().prefault(''),
    特征: z.string().prefault(''),
  }).prefault({}),
  性格: z.object({
    核心: z.string().prefault(''),
    优点: z.string().prefault(''),
    缺点: z.string().prefault(''),
    习惯: z.string().prefault(''),
  }).prefault({}),
  能力: z.object({
    擅长: z.string().prefault(''),
    盲区: z.string().prefault(''),
    特殊: z.string().prefault(''),
  }).prefault({}),
  NSFW: z.object({
    胸部: z.string().prefault(''),
    阴部: z.string().prefault(''),
    臀部: z.string().prefault(''),
    腰腹: z.string().prefault(''),
    腿部: z.string().prefault(''),
    敏感带: z.string().prefault(''),
    体质: z.string().prefault(''),
    性态度: z.string().prefault(''),
    特殊需求: z.string().prefault(''),
  }).prefault({}),
  年龄: num,
  处女: z.union([z.boolean(), z.literal('是'), z.literal('否')])
    .transform(v => v === true || v === '是')
    .prefault(true),
  修行路线: z.string().prefault(''),
  灵魂倾向: z.string().prefault(''),
  擅长魔法: z.string().prefault(''),
  力量等级: z.string().prefault('见习法师'),
  种族: z.string().prefault('人类'),
  阶级: z.object({
    名称: z.string().prefault('平民'),
    等级: z.string().prefault(''),
  }).prefault({}),
  职业: z.string().prefault(''),
  好感度: pct,
  后宫地位: z.string().prefault(''),
  当前着装: z.string().prefault(''),
  当前姿势: z.string().prefault(''),
  当前想法: z.string().prefault(''),
  最近性行为: z.string().prefault('无'),
  当前小穴状态: z.string().prefault('正常状态'),
  当前胸部状态: z.string().prefault('正常状态'),
  怀孕状态: z.string().prefault('未怀孕'),
  身体状态: z.string().prefault('正常状态'),
  高潮次数: num,
  内射次数: num,
  烙印状态: z.string().prefault('无烙印'),
  当前烙印反应: z.string().prefault('无'),
}).prefault({});

export const Schema = z.object({
  世界: z.object({
    时间: z.string().prefault('永恒历1145年03月15日 07:30'),
    地点: z.string().prefault('城堡主卧'),
  }).prefault({}),

  主角: z.object({
    龙血: z.object({
      觉醒等级: z.string()
        .transform(v => ['龙息初萌', '龙息掌控', '龙息完全体'].includes(v) ? v : '龙息初萌')
        .prefault('龙息初萌'),
      魅惑强度: pct,
      龙血能量: pct,
      烙印数量: num,
    }).prefault({}),
    修行路线: z.string()
      .transform(v => ['魔法', '战技', '融合'].includes(v) ? v : '融合')
      .prefault('融合'),
    侧重: z.string().prefault(''),
    灵魂能量: pct,
    姓名: z.string().prefault('{{user}}'),
    年龄: num,
    力量等级: z.string().prefault('大法师'),
    当前着装: z.string().prefault(''),
    当前姿势: z.string().prefault(''),
    当前位置: z.string().prefault(''),
    当前想法: z.string().prefault(''),
    最近性行为: z.string().prefault(''),
    阴茎状态: z.string().prefault(''),
    射精进度: pct,
  }).prefault({}),

  角色: z.record(
    z.string().describe('角色名'),
    CharacterSchema,
  ).prefault({}),

  后宫: z.object({
    总数: num,
    平均好感度: pct,
    满意度: z.string().prefault('良好'),
  }).prefault({}),

  行动选项: z.object({
    选项一: z.string().prefault(''),
    选项二: z.string().prefault(''),
    选项三: z.string().prefault(''),
    选项四: z.string().prefault(''),
  }).prefault({}),

  势力: z.record(
    z.string().describe('势力名'),
    z.object({
      关系: z.string().prefault('中立'),
      趋势: z.string()
        .transform(v => ['恶化', '稳定', '改善'].includes(v) ? v : '稳定')
        .prefault('稳定'),
      上次互动: z.string().prefault('无'),
    }).prefault({}),
  ).prefault({}),

  当前主线: z.string().prefault(''),
  任务列表: z.record(
    z.string().describe('任务名'),
    z.object({
      类型: z.string()
        .transform(v => ['主线', '支线', '日常'].includes(v) ? v : '支线')
        .prefault('支线'),
      说明: z.string().prefault(''),
      进度: z.string().prefault('未开始'),
      奖励: z.string().prefault(''),
    }).prefault({}),
  ).prefault({}),
}).prefault({});
