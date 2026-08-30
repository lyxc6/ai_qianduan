const 非负数 = z.coerce
  .number()
  .transform(v => Math.max(0, v))
  .prefault(0);
const 百分比 = z.coerce
  .number()
  .transform(v => _.clamp(v, 0, 100))
  .prefault(0);
const 可空字符串 = z
  .string()
  .nullable()
  .transform(v => v ?? '');
const 可空字符串数组 = z
  .array(z.string())
  .nullable()
  .transform(v => v ?? []);
const 可空布尔 = z
  .boolean()
  .nullable()
  .transform(v => v ?? true);

const 境界枚举 = ['炼气', '筑基', '金丹', '元婴', '化神', '炼虚', '合体', '大乘', '渡劫'];
const 宗门等级枚举 = ['破落小派', '小有名气', '名动一方', '声震九州', '仙门巨擘'];
const 本月事件枚举 = ['无', '灵潮月', '拍卖会', '收徒大典', '宗门大比', '兽潮来袭'];
const 恋情阶段枚举 = ['相识', '熟悉', '暧昧', '恋人', '道侣'];
const 宗门职务枚举 = ['无', '灵田', '丹房', '藏经阁', '巡山', '外事'];
const 悬赏难度枚举 = ['寻物', '驱兽', '护卫', '除害', '护送'];
const 悬赏状态枚举 = ['可接取', '进行中', '已完成', '失败'];
const 作物枚举 = ['闲置', '聚灵草', '灵稻', '药草'];
const 地块状态枚举 = ['空闲', '生长中', '成熟', '已收获'];

const 女修字段 = {
  姓名: 可空字符串.prefault(''),
  年龄: z.coerce
    .number()
    .transform(v => Math.max(18, Math.min(500, v)))
    .prefault(20),
  身份: 可空字符串.prefault(''),
  性格: 可空字符串.prefault(''),
  性格标签: 可空字符串数组.prefault([]),
  外貌: 可空字符串.prefault(''),
  修为境界: 可空字符串.transform(v => (境界枚举.includes(v) ? v : '炼气')).prefault('炼气'),
  修为进度: 百分比,
  宗门职务: 可空字符串.transform(v => (宗门职务枚举.includes(v) ? v : '无')).prefault('无'),
  好感度: 百分比,
  恋情阶段: 可空字符串.transform(v => (恋情阶段枚举.includes(v) ? v : '相识')).prefault('相识'),
  心情: 可空字符串.prefault(''),
  当前想法: 可空字符串.prefault(''),
};

const 玩家字段 = {
  姓名: 可空字符串.prefault('{{user}}'),
  性别: 可空字符串.transform(v => (['男', '女'].includes(v) ? v : '男')).prefault('男'),
  年龄: z.coerce
    .number()
    .transform(v => Math.max(16, Math.min(200, v)))
    .prefault(18),
  身份: 可空字符串.prefault('掌门'),
  修为境界: 可空字符串.transform(v => (境界枚举.includes(v) ? v : '炼气')).prefault('炼气'),
  修为进度: 百分比,
  功法: 可空字符串.prefault(''),
  灵石: 非负数,
  贡献点: 非负数,
  当前目标: 可空字符串.prefault('重振云梦仙宗，让宗门重新有烟火气'),
  当前想法: 可空字符串.prefault(''),
};

export const Schema = z
  .object({
    世界: z
      .object({
        当前日期: 可空字符串.prefault('云历148年·春三月·十五日'),
        当前时间: 可空字符串.prefault('辰时'),
        当前地点: 可空字符串.prefault('云梦山·主峰大殿'),
        宗门名称: 可空字符串.prefault('云梦仙宗'),
        宗门等级: 可空字符串.transform(v => (宗门等级枚举.includes(v) ? v : '破落小派')).prefault('破落小派'),
        灵石: 非负数,
        声望: 百分比,
        弟子人数: 非负数,
        灵田等级: 非负数,
        灵田数量: 非负数,
        丹炉数量: 非负数,
        藏经阁等级: 非负数,
        弟子房舍等级: 非负数,
        灵田地块: z
          .record(
            z.string().describe('地块名称'),
            z
              .object({
                作物: 可空字符串.transform(v => (作物枚举.includes(v) ? v : '闲置')).prefault('闲置'),
                状态: 可空字符串.transform(v => (地块状态枚举.includes(v) ? v : '空闲')).prefault('空闲'),
                种植日期: 可空字符串.prefault(''),
              })
              .prefault({}),
          )
          .prefault({}),
        悬赏列表: z
          .record(
            z.string().describe('悬赏名称'),
            z
              .object({
                发布方: 可空字符串.prefault(''),
                内容: 可空字符串.prefault(''),
                难度: 可空字符串.transform(v => (悬赏难度枚举.includes(v) ? v : '寻物')).prefault('寻物'),
                报酬: 非负数,
                状态: 可空字符串.transform(v => (悬赏状态枚举.includes(v) ? v : '可接取')).prefault('可接取'),
              })
              .prefault({}),
          )
          .prefault({}),
        本月事件: 可空字符串.transform(v => (本月事件枚举.includes(v) ? v : '无')).prefault('无'),
      })
      .prefault({}),

    玩家: z.object(玩家字段).prefault({}),

    女修: z.record(z.string().describe('女修姓名'), z.object(女修字段).prefault({})).prefault({}),
  })
  .prefault({});

export type Schema = z.output<typeof Schema>;
