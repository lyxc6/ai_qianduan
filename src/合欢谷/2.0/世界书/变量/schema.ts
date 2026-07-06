// @ts-nocheck
import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

export const Schema = z.object({
  当前时间: z.string(),
  当前地点: z.string(),
  NSFW场景: z.boolean(),
  当前场景角色: z.array(z.string()),

  主角: z.object({
    姓名: z.string(),
    年龄: z.number().int().min(0),
    身份: z.string(),
    境界: z.string(),
    秘密知晓: z.array(z.string()),
    功法与技能: z.array(z.string()),
  }),

  弟子: z.record(z.string(), z.object({
    性别: z.enum(['男', '女', '由男变女']),
    年龄: z.union([z.string(), z.number()]),
    好感度: z.number().int().min(-100).max(100),
    身份: z.string(),
    谷内地位: z.string().optional(),
    性格: z.object({
      核心特征: z.string(),
      优点: z.string(),
      缺点: z.string(),
      说话风格: z.string(),
    }),
    外貌: z.object({
      身高: z.string(),
      体型: z.string(),
      三围: z.string().optional(),
      面部特征: z.string(),
      发型: z.string(),
      瞳色: z.string(),
      气质: z.string(),
      声音: z.string(),
      身体细节: z.string(),
      罩杯: z.string().optional(),
    }),
    当前想法: z.string(),
    当前着装: z.string(),
    当前姿势: z.string(),
    当前位置: z.string(),
    身体状况: z.string(),
    胸部状态: z.string().optional(),
    阴部状态: z.string().optional(),
    功力境界: z.string(),
    功法: z.array(z.string()).optional(),
    贡献度: z.number().int().min(0).optional(),
    当日任务: z.string().optional(),
    处女: z.boolean().optional(),
    最近性行为: z.string().optional(),
    高潮次数: z.number().optional(),
    被内射次数: z.number().optional(),
    怀孕状态: z.string().optional(),
  })),

  宗门: z.object({
    谷内人数: z.number(),
    弟子数量: z.number(),
    谷内状态: z.string(),
    外界认知: z.string(),
    阵法状态: z.string(),
    资源状况: z.string(),
    当前任务: z.string(),
    待办事项: z.array(z.string()),
    统治范围: z.array(z.string()),
    声望: z.string().optional(),
    储备金: z.number().optional(),
  }),

  宗门动态: z.object({
    待接见人员: z.array(z.object({
      名称: z.string(),
      来源: z.string(),
      资质: z.string(),
      目的: z.string(),
      到达时间: z.string(),
    })).optional(),
    外出弟子: z.array(z.object({
      名称: z.string(),
      任务: z.string(),
      出发时间: z.string(),
      预计归来: z.string(),
    })).optional(),
    江湖传闻: z.array(z.string()).optional(),
  }).optional(),

  行动选项: z.object({
    当前视角: z.string(),
    一: z.string(),
    二: z.string(),
    三: z.string(),
    四: z.string(),
  }),
});

$(() => {
  registerMvuSchema(Schema);
});
