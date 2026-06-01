// @ts-nocheck
import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

export const Schema = z.object({
  当前时间: z.string(),
  当前地点: z.string(),

  主角: z.object({
    姓名: z.string(),
    性别: z.string(),
    年龄: z.coerce.number(),
    身份: z.string(),
    修为境界: z.string(),
    当前姿势: z.string(),
    当前想法: z.string(),
    身体状态: z.string(),
    当前着装: z.string(),
  }),

  后宫: z.record(
    z.string().describe('成员名'),
    z.object({
      姓名: z.string(),
      性别: z.string(),
      年龄: z.coerce.number(),
      身份: z.string(),
      修为境界: z.string(),
      对主角好感度: z.coerce.number().min(0).max(100),
      处女: z.boolean(),
      破处记录: z.string(),
      亲密次数: z.coerce.number(),
      内射次数: z.coerce.number(),
      高潮次数: z.coerce.number(),
      关系: z.string(),
      性格: z.string(),
      身体信息: z.string(),
      当前姿势: z.string(),
      当前想法: z.string(),
      身体状态: z.string(),
      当前着装: z.string(),
    }),
  ),

  攻略目标: z.record(
    z.string().describe('目标名'),
    z.object({
      姓名: z.string(),
      身份: z.string(),
      攻略进度: z.coerce.number().min(0).max(100),
      对主角好感度: z.coerce.number().min(0).max(100),
      当前状态: z.string(),
      备注: z.string(),
    }),
  ),
});

$(() => {
  registerMvuSchema(Schema);
});
