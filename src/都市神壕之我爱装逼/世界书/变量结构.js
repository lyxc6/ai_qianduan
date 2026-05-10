import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

export const Schema = z
  .object({
    日期: z.string().prefault('2020年10月01日'),
    时间: z.string().prefault('08:00'),
    位置: z.string().prefault('上海市·静安区'),
    姓名: z.string().prefault(''),
    年龄: z.string().prefault('未知'),
    外貌: z.string().prefault('未知'),
    身材: z.string().prefault('未知'),
    性能力: z.string().prefault('未知'),
    现金余额: z.coerce.number().prefault(0),
    系统积分: z.coerce.number().prefault(0),
    神豪等级: z.string().prefault('萌新神豪'),
    返现倍数: z.coerce.number().prefault(10),
    名下资产: z.record(
      z.string(),
      z.object({
        估值: z.coerce.number().prefault(0),
        描述: z.string().prefault(''),
        获得时间: z.string().prefault('2020年10月01日'),
      }),
    ),
    技能: z.record(
      z.string(),
      z.object({
        等级: z.string().prefault('Lv.1'),
        效果: z.string().prefault(''),
        获得途径: z.enum(['系统奖励', '商城兑换', '自我觉醒']).prefault('系统奖励'),
      }),
    ),

    当前在场互动女性: z
      .record(
        z
          .string()
          .describe(
            '【极度重要】角色真实姓名。强制规则：1. 仅限当前场景线下物理在场（面对面）的【女性角色】，严禁录入男性角色！线上手机聊天/打电话绝对不添加。2. 一旦该女性角色离开当前场景，或李子辰前往了其他地点导致双方不在一起，必须通过发送删除键的操作将其从本列表中彻底移除。3. 只在得知具体姓名后添加。',
          ),
        z
          .object({
            年龄: z.string().describe("必须用阿拉伯数字显示并添加单位'岁'").prefault('未知'),
            职业: z.string().prefault('未知'),
            与user的关系: z.string().describe('如：爱人、性奴、同学等。需自动识别user为当前用户名').prefault('陌生人'),
            自我认知: z.string().prefault(''),
            心声: z.string().prefault(''),
            好感度: z.coerce
              .number()
              .transform(val => _.clamp(val, -100, 100))
              .prefault(0),
            堕落值: z.coerce
              .number()
              .transform(val => _.clamp(val, 0, 100))
              .prefault(0),

            外貌描写: z
              .string()
              .describe('详细描写，包含身形，脸型轮廓，肤色，眼睛，鼻唇，发型，气息，特殊标记，最少20字')
              .prefault(''),
            颜值评分: z.coerce
              .number()
              .transform(val => _.clamp(val, 0, 100))
              .describe('依托大众审美给出固定值，50为大众脸')
              .prefault(50),

            衣着: z
              .object({
                上装: z.string().prefault(''),
                下装: z.string().prefault(''),
                内衣: z.string().prefault(''),
                袜子: z.string().prefault(''),
                鞋子: z.string().prefault(''),
              })
              .prefault({}),

            身体状态: z
              .object({
                朱唇: z
                  .string()
                  .describe('详细描写唇形，色泽，柔软度，口腔内温度与气味，牙齿特征，舌头灵敏度。最少25字')
                  .prefault('未知'),
                乳房: z
                  .string()
                  .describe('详细描写乳头颜色，乳房形状，乳房颜色，罩杯大小(严格以AA,A这种来评级)。最少25字')
                  .prefault('未知'),
                美臀: z.string().describe('详细描写臀部形状，丰满度，弹性，皮肤质感。最少25字').prefault('未知'),
                小穴: z
                  .string()
                  .describe('详细描写湿润度，外形，阴毛状态，内壁情况，子宫形态。最少25字')
                  .prefault('未知'),
                菊穴: z.string().describe('详细描写紧致度，颜色，形状。最少25字').prefault('未知'),
                玉足: z.string().describe('详细描写气味，肤色，脚型，足弓，指甲颜色。最少25字').prefault('未知'),
              })
              .prefault({}),

            私密档案: z
              .object({
                是否为处女: z.enum(['是', '否', '未知']).prefault('未知'),
                初夜对象: z.string().prefault('未知'),
                是否怀孕: z.enum(['是', '否', '未知']).prefault('未知'),
                怀孕几率: z.string().prefault('0%'),
                内射次数: z.coerce.number().prefault(0),
                子嗣所属: z.string().prefault('无'),
                名器: z
                  .string()
                  .describe("若有名器则显示其具体'名器种类'并附加特点描述，若无则显示'无'，未探索前显示'未知'")
                  .prefault('未知'),
              })
              .prefault({}),
          })
          .prefault({}),
      )
      .prefault({}),

    后宫状态: z
      .record(
        z
          .string()
          .describe('角色真实姓名。触发条件：仅显示好感度或者堕落值达到60以上的全部女性，不受场景限制，永久保留'),
        z
          .object({
            年龄: z.string().prefault('未知'),
            与user的关系: z.string().prefault('未知'),
            堕落值: z.coerce
              .number()
              .transform(val => _.clamp(val, 0, 100))
              .prefault(0),
            名器种类: z.string().prefault('未知'),
          })
          .prefault({}),
      )
      .prefault({})
      .transform(data => {
        return _(data)
          .entries()
          .orderBy([([name, info]) => parseInt(info.年龄) || 0], ['desc'])
          .fromPairs()
          .value();
      }),
  })
  .transform(data => {
    const cash = data.现金余额;
    let level = '萌新神豪';
    let multiplier = 10;

    if (cash >= 100000000000) {
      level = '顶级神豪';
      multiplier = 2;
    } else if (cash >= 10000000000) {
      level = '高级神豪';
      multiplier = 3;
    } else if (cash >= 1000000000) {
      level = '中级神豪';
      multiplier = 5;
    } else if (cash >= 100000000) {
      level = '初级神豪';
      multiplier = 8;
    }

    if (data.神豪等级 !== level) data.神豪等级 = level;
    if (data.返现倍数 !== multiplier) data.返现倍数 = multiplier;

    return data;
  });

$(() => {
  registerMvuSchema(Schema);
});
