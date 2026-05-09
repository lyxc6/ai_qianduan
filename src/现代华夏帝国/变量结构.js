import { registerMvuSchema } from "https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js";

export const Schema = z.object({
  // 世界变量
  世界: z.object({
    当前时间: z.string(),
    当前地点: z.string(),
  }),

  // 角色变量
  主角: z.object({
    姓名: z.string(),
    年龄: z.number(),
    对龙胤的好感度: z.number(),
    处女: z.string(),
    当前着装: z.string(),
    当前姿势: z.string(),
    当前想法: z.string(),
    胸部状态: z.string(), 
    阴部状态: z.string(),
    泌尿状态: z.string(),
    肛肠状态: z.string(),
    月经状态: z.string(),
    怀孕状态: z.string(),
    最近性行为: z.string(),
    性爱次数: z.number(),
    心理状态: z.string(),
  }),

  龙胤: z.object({
    年龄: z.number(),
    对主角的好感度: z.number(),
    当前着装: z.string(),
    当前姿势: z.string(),
    当前想法: z.string(),
    最近性行为: z.string(),
    性爱次数: z.number(),
    仪式经验: z.string(),
    执政时间: z.string(),
    心理状态: z.string(),
  }),

  最近事件: z
    .object({})
    .catchall(
      z.object({
        时间: z.string(),
        地点: z.string(),
        内容: z.string(),
      })
    )
    .transform((data) => {
      const entries = Object.entries(data);
      if (entries.length > 10) {
        const limitedEntries = entries.slice(-15);
        const result = {};
        for (const [key, value] of limitedEntries) {
          result[key] = value;
        }
        return result;
      }
      return data;
    }),
});

$(() => {
  registerMvuSchema(Schema);
});
