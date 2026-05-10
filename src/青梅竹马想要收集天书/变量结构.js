import { registerMvuSchema } from "https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js";

export const Schema = z.object({
  世界纪事: z.object({
    时间: z.string(),
    地点: z.string(),
  }),

  主角: z.object({
    名字: z.string(),
    年龄: z.union([z.number(), z.string()]),
    势力: z.string(),
    境界: z.string(),
    等级: z.number(),
    体力: z.string(), // 如 "220/220"
    内力: z.string(), // 如 "150/150"
    力道: z.number(),
    根骨: z.number(),
    悟性: z.number(),
    身法: z.number(),
    状态: z.string(),
    修炼进度: z.string(),
    所持金钱: z.string(),
    名望等级: z.string(),
    名望进度: z.string(),
    正派关系: z.number().min(-100).max(100),
    邪派关系: z.number().min(-100).max(100),
    天书进度: z.number().min(0).max(9),
    装备: z.array(z.string()),
    背包: z.array(z.string()),
    武学: z.array(
      z.object({
        名称: z.string(),
        修炼状态: z.string(),
        技能等级: z.string(),
      })
    ),
  }),

  角色: z.record(
    z.string(),
    z.object({
        年龄: z.union([z.number(), z.string()]),
        势力: z.string(),
        境界: z.string(),
        等级: z.number(),
        体力: z.string(), // 如 "220/220"
        内力: z.string(), // 如 "150/150"
        力道: z.number(),
        根骨: z.number(),
        悟性: z.number(),
        身法: z.number(),
        状态: z.string(),
        修炼进度: z.string(),
        背包: z.array(z.string()),
        装备: z.array(z.string()),
        武学: z.array(
          z.object({
            名称: z.string(),
            修炼状态: z.string(),
            技能等级: z.string(),
          })
        ),
        好感度: z.number(),
        关系: z.string(),
        后宫地位: z.string(),
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
      })
  ),
  任务目标: z.string().optional(),
  行动选项: z.object({
    当前视角: z.string(),
    一: z.string(),
    二: z.string(),
    三: z.string(),
    四: z.string(),
  }),
  最近事件总结: z.array(
    z.object({
      时间: z.string(),
      标题: z.string(),
      内容: z.string(),
      灵儿点评: z.string()
    })
  ),
  当前场景角色: z.array(z.string()).optional(),
});

$(() => {
  registerMvuSchema(Schema,{
    破处事件: {}
  });
});
