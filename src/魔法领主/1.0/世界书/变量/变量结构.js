// @ts-nocheck
import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

export const Schema = z.object({
  世界: z.object({
    时间: z.string(),
    地点: z.string(),
  }),

  主角: z.object({
    姓名: z.string(),
    年龄: z.number(),
    力量等级: z.string(),
    // @ts-ignore
    当前着装: z.string(),
    当前姿势: z.string(),
    当前位置: z.string(),
    当前想法: z.string(),
    最近性行为: z.string(),
    阴茎状态: z.string(),
    射精进度: z.number().min(0).max(100),
  }),

  角色: z.record(
    z.object({
      年龄: z.number(),
      处女: z.string(),
      力量等级: z.string(),
      好感度: z.number().min(0).max(100),
      后宫地位: z.string(),
      破处: z.string(),
      当前着装: z.string(),
      当前姿势: z.string(),
      当前想法: z.string(),
      最近性行为: z.string(),
      当前小穴状态: z.string(),
      当前胸部状态: z.string(),
      怀孕状态: z.string(),
      身体状态: z.string(),
      高潮次数: z.number(),
      内射次数: z.number(),
    }),
  ),

  行动选项: z.object({
    选项一: z.string().optional(),
    选项二: z.string().optional(),
    选项三: z.string().optional(),
    选项四: z.string().optional(),
  }),

  最近事件: z.array(z.string()),
});

$(() => {
  registerMvuSchema(Schema, {
    最近事件: [],
  });
});
