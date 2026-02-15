// @ts-nocheck
import { registerMvuSchema } from "https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js";

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

    后宫: z.record(z.string(), z.object({
        性别: z.enum(["男", "女", "由男变女"]),
        年龄: z.union([z.string(), z.number()]),
        关系: z.string().optional(),
        好感度: z.number().int().min(-100).max(100),
        身份: z.string(),
        后宫地位: z.enum([
            "未入后宫",
            "外门弟子（侍妾）",
            "内门弟子（嫔妃）",
            "真传弟子（贵妃）",
            "亲传弟子（皇后候选人）",
            "皇后（女主人）"
        ]).optional(),
        当前想法: z.string(),
        当前着装: z.string(),
        当前姿势: z.string(),
        当前位置: z.string(),
        身体状况: z.string(),
        功力境界: z.string(),
        功法与技能: z.array(z.string()),
        处女: z.boolean().optional(),
        月经状态: z.string().optional(),
        胸部状态: z.string().optional(),
        阴部状态: z.string().optional(),
        怀孕状态: z.string().optional(),
        最近性行为: z.string().optional(),
        被内射次数: z.number().optional(),
        高潮次数: z.number().optional(),
    })),

    合欢谷: z.object({
        谷内人数: z.number(),
        弟子数量: z.number(),
        后宫规模: z.number(),
        谷内状态: z.string(),
        外界认知: z.string(),
        阵法状态: z.string(),
        资源状况: z.string(),
        当前任务: z.string(),
        待办事项: z.array(z.string()),
        统治范围: z.array(z.string())
    }),

    行动选项: z.object({
        当前视角: z.string(),
        一: z.string(),
        二: z.string(),
        三: z.string(),
        四: z.string(),
    }),

    重要事件: z.array(
        z.object({
            时间: z.string(),
            地点: z.string(),
            内容: z.string()
        })
    ),
});

$(() => {
    registerMvuSchema(Schema);
});
