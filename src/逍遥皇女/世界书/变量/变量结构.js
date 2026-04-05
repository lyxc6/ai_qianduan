// @ts-nocheck
import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

export const Schema = z.object({
  当前时间: z.string(),
  当前地点: z.string(),

  女主: z.object({
    姓名: z.string(),
    原名: z.string(),
    性别: z.string(),
    年龄: z.number(),
    武功境界: z.string(),
    对男主好感度: z.number().min(0).max(100),
    当前发育状态: z.number().min(0).max(100),
    高潮进程: z.number().min(0).max(100),
    高潮次数: z.number(),
    被内射次数: z.number(),
    处女: z.boolean(),
    破处记录: z.string(),
    身份: z.string(),
    目标: z.string(),
    秘密: z.string(),
    当前姿势: z.string(),
    当前想法: z.string(),
    身体状态: z.string(),
    小嘴状态: z.string(),
    胸部状态: z.string(),
    小屄状态: z.string(),
    屁穴状态: z.string(),
    当前着装: z.object({
      整体: z.string(),
      上装: z.string(),
      下装: z.string(),
      内衣: z.string(),
      内裤: z.string(),
      特殊配饰: z.string(),
      暴露程度: z.string(),
    }),
  }),

  男主: z.object({
    姓名: z.string(),
    性别: z.string(),
    年龄: z.number(),
    武功境界: z.string(),
    对女主好感度: z.number().int().min(0).max(100),
    射精进度: z.number().min(0).max(100),
    身份: z.string(),
    关系: z.string(),
    识破身份进度: z.number().min(0).max(100),
    当前姿势: z.string(),
    当前想法: z.string(),
    当前着装: z.object({
      整体: z.string(),
      上装: z.string(),
      下装: z.string(),
      配饰: z.string(),
      暴露程度: z.string(),
    }),
  }),

  其他角色: z.array(
    z.object({
      姓名: z.string(),
      性别: z.string(),
      年龄: z.number(),
      武功境界: z.string(),
      身份: z.string(),
      与女主关系: z.string(),
      对女主态度: z.string(),
      当前想法: z.string(),
      当前姿势: z.string(),
      背景: z.string(),
      性格: z.object({
        核心: z.string(),
        优点: z.string(),
        缺点: z.string(),
        习惯: z.string(),
        说话: z.string(),
      }),
    }),
  ),
});

$(() => {
  registerMvuSchema(Schema);
});
