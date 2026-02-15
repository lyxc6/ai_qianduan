// @ts-nocheck
import { registerMvuSchema } from "https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js";

export const Schema = z.object({
    世界: z.object({
        时间: z.string(),
        地点: z.string(),
    }),

    主角: z.object({
        姓名: z.string(),
        性别: z.string(),
        年龄: z.string(),
        身份: z.string(),
        后宫状态: z.string(),
        当前着装: z.string(),
        当前姿势: z.string(),
        当前位置: z.string(),
        当前想法: z.string(),
        性经验: z.string(),
    }),

    后宫: z.record(z.string(), z.object({
        年龄: z.string(),
        关系: z.string(),
        好感度: z.number().int().min(0).max(100),
        当前着装: z.string(),
        当前姿势: z.string(),
        当前位置: z.string(),
        当前想法: z.string(),
        最近性行为: z.string(),
        处女: z.boolean(),
        胸部状态: z.string(),
        阴部状态: z.string(),
        身体状态: z.string(),
        月经状态: z.string(),
        怀孕: z.object({
            是否怀孕: z.boolean(),
            怀孕月数: z.number(),
        }),
        高潮次数: z.number(),
        被内射次数: z.number(),
    })),

    行动选项: z.object({
        当前视角: z.string(),
        选项一: z.string(),
        选项二: z.string(),
        选项三: z.string(),
        选项四: z.string(),
    }),

    最近事件: z.array(
        z.object({
            时间: z.string(),
            地点: z.string(),
            内容: z.string()
        })
    ),

    住房信息: z.object({
        是否正在NSFW: z.boolean(),
        当前谁在家: z.string(),
        主卧状态: z.string(),
        次卧A状态: z.string(),
        次卧B状态: z.string(),
        次卧C状态: z.string(),
        次卧D状态: z.string(),
        次卧E状态: z.string(),
        客厅状态: z.string(),
        餐厅状态: z.string(),
        厨房状态: z.string(),
        健身区状态: z.string(),
        舞蹈室状态: z.string(),
        娱乐室状态: z.string(),
        阳台状态: z.string(),
    }),
});

$(() => {
    registerMvuSchema(Schema);
});