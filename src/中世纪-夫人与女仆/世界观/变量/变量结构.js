// @ts-nocheck
// ═══ 中世纪-夫人与女仆 Schema v1.0 ═══
import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
const num   = z.coerce.number().transform(v => Math.max(0, v)).default(0).catch(0);
const num1  = z.coerce.number().transform(v => Math.max(1, v)).default(1).catch(1);
const pct   = z.coerce.number().transform(v => clamp(v, 0, 100)).default(0).catch(0);
const favor = z.coerce.number().transform(v => clamp(v, 0, 100)).default(0).catch(0);
const str   = (d = '') => z.string().default(d).catch(d);
const arr   = z.array(z.string()).default([]).catch([]);

const CharacterSchema = z.object({
  年龄: num1,
  好感度: favor,
  关系状态: str(),
  当前着装: str(),
  当前姿势: str(),
  当前想法: str(),
  最近亲密行为: str(),
  身体状态: str(),
  外貌: z.object({
    体型: str(),
    面容: str(),
    发色: str(),
    眼睛: str(),
    肤色: str(),
    特征: str(),
  }).default({}).catch({}),
  性格: z.object({
    核心: str(),
    优点: str(),
    缺点: str(),
    习惯: str(),
  }).default({}).catch({}),
  NSFW: z.object({
    胸部: str(),
    阴部: str(),
    敏感带: str(),
    体质: str(),
    性态度: str(),
  }).default({}).catch({}),
}).default({}).catch({});

const TerritorySchema = z.object({
  描述: str(),
  年净收入: num,
}).default({}).catch({});

const ArmySchema = z.object({
  描述: str(),
  数量: num1,
  类型: str(),
}).default({}).catch({});

const DiplomacySchema = z.object({
  描述: str(),
  关系: str(),
  趋势: str(),
  上次互动: str(),
}).default({}).catch({});

export const Schema = z.object({
  世界: z.object({
    时间: str(),
    地点: str(),
  }).default({}).catch({}),

  主角: z.object({
    姓名: str(),
    年龄: num1,
    爵位: str(),
    当前着装: str(),
    当前姿势: str(),
    当前位置: str(),
    当前想法: str(),
    最近性行为: str(),
    剑术水平: str(),
  }).default({}).catch({}),

  角色: z.record(z.string(), CharacterSchema).default({}).catch({}),

  经济: z.object({
    铜币总额: num,
    年净收入: num,
    上次结算时间: str(),
  }).default({}).catch({}),

  领地: z.record(z.string(), TerritorySchema).default({}).catch({}),

  军队: z.record(z.string(), ArmySchema).default({}).catch({}),

  外交: z.record(z.string(), DiplomacySchema).default({}).catch({}),

  最近事件: arr,

  _UID计数器: z.object({
    角色: num1,
    领地: num1,
    军队: num1,
    外交: num1,
  }).default({}).catch({}),
});

$(() => {
  registerMvuSchema(Schema);
});
