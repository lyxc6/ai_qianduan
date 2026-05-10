import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

const score = desc =>
  z.coerce
    .number()
    .transform(v => _.clamp(Math.round(v), 0, 100))
    .describe(desc);
const nonNegative = desc =>
  z.coerce
    .number()
    .transform(v => Math.max(0, Math.round(v)))
    .describe(desc);
const positive = desc =>
  z.coerce
    .number()
    .transform(v => Math.max(1, Math.round(v)))
    .describe(desc);
const level = desc =>
  z.coerce
    .number()
    .transform(v => _.clamp(Math.round(v), 1, 5))
    .describe(desc);
const limitedList = (desc, max = 10) =>
  z
    .array(z.string())
    .transform(v => v.slice(-max))
    .describe(desc);

export const Schema = z.object({
  世界: z.object({
    当前时间: z.string().describe('当前剧情时间'),
    当前地点: z.string().describe('当前剧情地点'),
    外界时间状态: z.string().describe('正常流逝/暂停'),
    当前主线阶段: z.string().describe('当前主线阶段'),
    合欢宗发展等级: z.string().describe('新人/入门/小成/精英/核心/宗主'),
    商城等级: z.string().describe('初级/进阶/高级/宗门核心'),
    系统权限等级: level('系统权限等级，1-5'),
    校园名望: score('0-100，校园/熟人圈正面名望，只会上升不会下降'),
    城市名望: score('0-100，城市/社会层面名望，只会上升不会下降'),
    当前重点目标: limitedList('当前重点推进/重点关注目标', 8),
  }),
  用户: z.object({
    姓名: z.string().describe('{{user}}的姓名'),
    性别: z.string().describe('男性/女性/未设定'),
    容貌: score('0-100，{{user}}容貌评分'),
    气质: score('0-100，{{user}}气质评分'),
    身材: score('0-100，{{user}}身材评分'),
    综合评分: score('0-100，由容貌、气质、身材平均得出'),
    综合等级: z.string().describe('S/A/B/C/D/E/不入流'),
    合欢值: nonNegative('可用于合欢商店消费的点数'),
    累计获得合欢值: nonNegative('历史累计获得合欢值'),
    累计消费合欢值: nonNegative('历史累计消费合欢值'),
    现金: nonNegative('银行卡/可支配现金余额，单位元'),
    已有效双修不同目标数: nonNegative('满足有效双修判定的不同目标总数'),
    有效双修总次数: nonNegative('所有有效双修次数总和'),
    已领取现金里程碑: nonNegative('已领取到第几个5人里程碑'),
    当前生效状态: limitedList('临时魅力、道具buff、身体状态等', 12),
  }),
  系统: z.object({
    当前任务: z
      .array(
        z.object({
          名称: z.string(),
          类型: z.string(),
          目标: z.string(),
          时限: z.string(),
          奖励: z.string(),
          失败后果: z.string(),
          进度: z.string(),
          状态: z.string(),
        }),
      )
      .transform(v => v.slice(-12))
      .describe('当前主线/支线/隐藏/风险任务'),
    已完成任务: limitedList('已完成任务摘要', 20),
    已解锁里程碑: limitedList('已领取或已触发里程碑', 30),
    行动建议: z
      .array(z.string())
      .transform(v => v.slice(0, 5))
      .describe('行动建议APP显示的5条可选行动建议'),
    系统提示: limitedList('最近系统提示', 10),
    用户是否在系统空间内: z.boolean(),
    外界时间是否暂停: z.boolean(),
  }),
  目标: z
    .record(
      z.string(),
      z.object({
        姓名: z.string(),
        性别: z.string(),
        年龄: z.string(),
        身份: z.string(),
        场景来源: z.string(),
        性取向: z.string().describe('目标的性取向/情感倾向'),
        喜好类型: z.string().describe('目标偏好的伴侣/互动/审美类型'),
        亲密边界: z.string().describe('目标当前能接受与不能接受的亲密边界'),
        主要顾虑: z.string().describe('影响目标推进关系的现实顾虑'),
        当前关系限制: z.string().describe('是否已有伴侣、家庭限制、事业限制、公众身份限制等'),
        社交圈连接: limitedList('目标与其他角色/圈层的连接', 8),
        全身衣着信息: z.string().describe('当前场景中的全身衣着、妆造、配饰'),
        全身肉体信息: z.string().describe('体态、曲线、皮肤、姿态等非露骨身体信息'),
        心里话: z.string().describe('目标当前不直接说出口的想法'),
        是否被攻略: z.boolean().describe('是否已被{{user}}成功攻略或进入稳定亲密阵营'),
        怀孕状态: z.string().describe('未怀孕/疑似怀孕/已怀孕/不适用等'),
        是否在场: z.boolean().describe('当前是否与{{user}}处于同一场景'),
        容貌: score('0-100，目标容貌评分'),
        气质: score('0-100，目标气质评分'),
        身材: score('0-100，目标身材评分'),
        综合评分: score('0-100，由容貌、气质、身材平均得出'),
        综合等级: z.string().describe('S/A/B/C/D/E/不入流'),
        是否首次性行为者: z.boolean().describe('处女/处男/首次发生性行为者'),
        有效双修次数: nonNegative('与{{user}}满足有效双修判定的次数'),
        关系阶段: z.string().describe('陌生/认识/熟悉/暧昧/亲密/稳定关系'),
        关系状态: z.string().describe('同学/朋友/暧昧/恋人/炮友/合作等'),
        好感度: score('0-100，目标对{{user}}天然有20-30点基础好感'),
        戒备心: score('0-100，作为攻略挑战保留，不会天然降低'),
        备注: z.string(),
      }),
    )
    .describe('重要攻略目标记录'),
  后代: z
    .record(
      z.string(),
      z.object({
        姓名: z.string(),
        母亲: z.string(),
        父亲: z.string(),
        受孕时间: z.string(),
        出生时间: z.string(),
        当前状态: z.string(),
        年龄: z.string(),
        性别: z.string(),
        继承特征: z.string(),
        备注: z.string(),
      }),
    )
    .describe('后代APP显示的后代记录'),
  宗门: z.object({
    宗门名称: z.string(),
    宗门理念: z.string(),
    宗门资金: nonNegative('宗门公共资金，单位元'),
    宗门规模: nonNegative('宗门成员与外围网络规模'),
    资产: z
      .record(
        z.string(),
        z.object({
          名称: z.string(),
          价值: nonNegative('资产价值，单位元'),
          所有者: z.string(),
          来源: z.string(),
        }),
      )
      .describe('宗门资产列表'),
    成员: z
      .record(
        z.string(),
        z.object({
          姓名: z.string(),
          来源目标: z.string(),
          层级: z.string().describe('临时合作对象/外围成员/预备成员/正式成员/核心成员/骨干管理层'),
          当前职位: z.string(),
          忠诚度: score('0-100，只会上升不会下降'),
          贡献值: nonNegative('宗门贡献值'),
          能力值: score('0-100，综合办事能力'),
          擅长领域: limitedList('成员擅长领域', 8),
          是否知晓系统: z.boolean(),
          状态: z.string(),
          备注: z.string(),
        }),
      )
      .describe('宗门成员档案'),
    岗位: z
      .record(
        z.string(),
        z.object({
          岗位名称: z.string(),
          任职者: z.string(),
          职责: z.string(),
          效率: score('0-100'),
          备注: z.string(),
        }),
      )
      .describe('宗门岗位任命'),
    据点: z
      .record(
        z.string(),
        z.object({
          名称: z.string(),
          类型: z.string(),
          地点: z.string(),
          等级: level('据点等级1-5'),
          豪华度: score('0-100'),
          容纳人数: nonNegative('可容纳人数'),
          功能: limitedList('据点功能', 8),
          维护成本: nonNegative('每周期维护成本'),
          负责人: z.string(),
        }),
      )
      .describe('宗门据点'),
    产业: z
      .record(
        z.string(),
        z.object({
          名称: z.string(),
          类型: z.string(),
          等级: level('产业等级1-5'),
          负责人: z.string(),
          月收益: nonNegative('月收益'),
          维护成本: nonNegative('月维护成本'),
          招募效率: score('0-100'),
          资源价值: score('0-100'),
          关联据点: z.string(),
        }),
      )
      .describe('宗门产业'),
    制度: z.object({
      保密制度: z.string(),
      贡献制度: z.string(),
      晋升制度: z.string(),
      奖惩制度: z.string(),
      退出机制: z.string(),
    }),
  }),
  商城: z.object({
    已解锁商品: z
      .record(
        z.string(),
        z.object({
          类型: z.string(),
          价格: positive('合欢值价格，必须为正整数'),
          效果: z.string(),
          持续时间: z.string(),
          使用限制: z.string(),
        }),
      )
      .describe('已解锁可购买商品'),
    本轮推荐商品: z
      .record(
        z.string(),
        z.object({
          类型: z.string(),
          价格: positive('合欢值价格，必须为正整数'),
          效果: z.string(),
          持续时间: z.string(),
          使用限制: z.string(),
          推荐理由: z.string(),
        }),
      )
      .describe('系统商城APP本轮动态展示商品，每轮应变化'),
  }),
});

$(() => {
  registerMvuSchema(Schema);
});
