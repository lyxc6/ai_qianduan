// @ts-nocheck
import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

export const Schema = z.object({
  世界: z.object({
    当前时间: z.string(),
    当前地点: z.string(),
    是否正在NSFW: z.boolean(),
    解锁牵手: z.boolean(),
    解锁拥抱: z.boolean(),
    解锁接吻: z.boolean(),
    解锁爱抚: z.boolean(),
    解锁互慰: z.boolean(),
    解锁口交: z.boolean(),
    解锁插入式性行为: z.boolean(),
    当前NSFW进度: z.string(),
    亲密度等级: z.string(),
    男主对女主的好感度: z.number().int().min(0),
    女主对男主的好感度: z.number().int().min(0),
  }),

  主角: z.object({
    姓名: z.string(),
    性别: z.string(),
    年龄: z.number(),
    身份: z.string(),
    当前着装: z.string(),
    当前姿势: z.string(),
    当前想法: z.string(),
    身体感受: z.string(),
    胸部感受: z.string(),
    小穴感受: z.string(),
    菊穴感受: z.string(),
    处女: z.boolean(),
    高潮次数: z.number(),
    内射次数: z.number(),
    GDC状态: z.string(),
    GDC阶段: z.string(),
    GDC周数: z.number(),
    GDC症状: z.string(),
  }),

  顾言: z.object({
    年龄: z.number(),
    关系: z.string(),
    当前着装: z.string(),
    当前姿势: z.string(),
    当前想法: z.string(),
    身体感受: z.string(),
    隐藏身份: z.string(),
    射精进度: z.number().min(0).max(100),
  }),

  行动选项: z.object({
    当前视角: z.string(),
    选项一: z.string(),
    选项二: z.string(),
    选项三: z.string(),
    选项四: z.string(),
  }),

  事件: z.array(z.string()),
});

$(() => {
  registerMvuSchema(Schema);
});
