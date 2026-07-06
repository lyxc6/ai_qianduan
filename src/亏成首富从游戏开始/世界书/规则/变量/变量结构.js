import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

export const Schema = z
  .object({
    世界: z
      .object({
        当前时间: z.string().prefault(''),
        当前地点: z.string().prefault(''),
      })
      .prefault({}),

    玩家: z
      .object({
        角色介绍: z.string().prefault(''),
        集团名称: z.string().prefault(''),
        主营业务: z.string().prefault(''),
        次要业务: z.string().prefault(''),
        产业资金: z.coerce
          .number()
          .transform(v => Math.max(0, v))
          .prefault(0),
        累计经营收入: z.coerce
          .number()
          .transform(v => Math.max(0, v))
          .prefault(0),
        累计补充金额: z.coerce
          .number()
          .transform(v => Math.max(0, v))
          .prefault(0),
        自由资金: z.coerce.number().prefault(0),
        影响力: z.string().prefault('无'),
      })
      .prefault({}),

    经营系统: z
      .object({
        盈利转换比例: z.coerce.number().prefault(30000),
        亏损转换比例: z.coerce.number().prefault(2000),
        月度结算日: z.string().prefault('每月1日'),
        上次结算结果: z.string().prefault('未结算'),
        产业总资产: z.coerce
          .number()
          .transform(v => Math.max(0, v))
          .prefault(0),
        历史最高阶梯: z.coerce
          .number()
          .transform(v => Math.max(0, v))
          .prefault(0),
        当前补充倍率: z.coerce.number().prefault(2.0),
        上月补充金额: z.coerce
          .number()
          .transform(v => Math.max(0, v))
          .prefault(0),
        上月总支出: z.coerce
          .number()
          .transform(v => Math.max(0, v))
          .prefault(0),
        累计奖励: z.coerce
          .number()
          .transform(v => Math.max(0, v))
          .prefault(0),
      })
      .prefault({}),

    核心角色: z
      .record(
        z.string().describe('角色名'),
        z.object({
          性别: z.string().prefault(''),
          出生年月日: z.string().prefault(''),
          好感度: z.coerce
            .number()
            .transform(v => _.clamp(v, 0, 100))
            .prefault(50),
          性格: z.string().prefault(''),
          岗位: z.string().prefault(''),
          薪资: z.coerce
            .number()
            .transform(v => Math.max(0, v))
            .prefault(0),
          所属产业: z.string().prefault(''),
          加入时间: z.string().prefault(''),
        }),
      )
      .prefault({}),

    产业列表: z
      .record(
        z.string().describe('产业名称'),
        z.object({
          类型: z.string().prefault(''),
          公司类型: z.string().prefault(''),
          母公司: z.string().prefault(''),
          位置: z.string().prefault(''),
          人数: z.coerce
            .number()
            .transform(v => Math.max(0, v))
            .prefault(0),
          运营状态: z.string().prefault('正常'),
          月收入: z.coerce.number().prefault(0),
          月支出: z.coerce.number().prefault(0),
          注册资本: z.coerce
            .number()
            .transform(v => Math.max(0, v))
            .prefault(0),
          持股比例: z.coerce
            .number()
            .transform(v => _.clamp(v, 0, 100))
            .prefault(100),
          资产估值: z.coerce
            .number()
            .transform(v => Math.max(0, v))
            .prefault(0),
          备注: z.string().prefault(''),
        }),
      )
      .prefault({}),

    资产列表: z
      .record(
        z.string().describe('资产名称'),
        z.object({
          资产类型: z.string().prefault(''),
          所属公司: z.string().prefault(''),
          账面价值: z.coerce
            .number()
            .transform(v => Math.max(0, v))
            .prefault(0),
          评估价值: z.coerce
            .number()
            .transform(v => Math.max(0, v))
            .prefault(0),
          购入时间: z.string().prefault(''),
          折旧方式: z.string().prefault(''),
          状态: z.string().prefault(''),
          备注: z.string().prefault(''),
        }),
      )
      .prefault({}),

    产品列表: z
      .record(
        z.string().describe('产品名称'),
        z.object({
          所属公司: z.string().prefault(''),
          产品类型: z.string().prefault(''),
          成本: z.coerce
            .number()
            .transform(v => Math.max(0, v))
            .prefault(0),
          售价: z.coerce
            .number()
            .transform(v => Math.max(0, v))
            .prefault(0),
          月销量: z.coerce
            .number()
            .transform(v => Math.max(0, v))
            .prefault(0),
          库存: z.coerce
            .number()
            .transform(v => Math.max(0, v))
            .prefault(0),
          状态: z.string().prefault(''),
          备注: z.string().prefault(''),
        }),
      )
      .prefault({}),
  })
  .prefault({});

$(() => {
  registerMvuSchema(Schema);
});
