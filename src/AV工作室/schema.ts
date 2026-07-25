const num = z.coerce.number().transform(v => Math.max(0, v)).prefault(0);
const pct = z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0);

const 角色基础字段 = {
  姓名: z.string().prefault(''),
  年龄: z.string().prefault(''),
  性格: z.string().prefault(''),
  背景: z.string().prefault(''),
  身高: z.string().prefault(''),
  体重: z.string().prefault(''),
  罩杯: z.string().transform(v => /^[A-I]$/i.test(v) ? v.toUpperCase() : '未明').prefault('未明'),
  发色: z.string().prefault(''),
  发型: z.string().prefault(''),
  衣着: z.string().prefault(''),
  鞋袜: z.string().prefault(''),
  配饰: z.string().prefault(''),
  是否处女: z.string().prefault('是'),
  性爱经历: z.string().prefault('无性爱经历'),
  性爱偏好: z.string().prefault('未知'),
  小穴状态: z.string().prefault('未开发'),
  肛门状态: z.string().prefault('未开发'),
  口腔状态: z.string().prefault('未开发'),
  可接受内容: z.array(z.string()).prefault([]),
  不可接受内容: z.array(z.string()).prefault([]),
  底线: z.string().prefault(''),
  弱点: z.array(z.string()).prefault([]),
  策略: z.string().prefault(''),
};

export const Schema = z.object({
  当前阶段: z.string().transform(v => ['招募', '交涉', '拍摄', '收尾'].includes(v) ? v : '招募').prefault('招募'),
  当前时间: z.string().prefault('2024年3月15日'),

  工作室: z.object({
    名称: z.string().prefault('梦幻映像'),
    知名度: z.coerce.number().transform(v => _.clamp(v, 1, 5)).prefault(1.5),
    总资金: z.coerce.number().transform(v => Math.max(0, v)).prefault(1000000),
  }).prefault({}),

  可选角色列表: z.array(z.object({ ...角色基础字段 })).prefault([]),

  当前演员: z.object({
    ...角色基础字段,
    接受度: pct,
    阶段状态: z.string().transform(v => ['交涉中', '已签约', '拍摄中', '已完成'].includes(v) ? v : '交涉中').prefault('交涉中'),
    当前想法: z.string().prefault(''),
    身体状态: z.string().prefault('正常'),
  }).prefault({}),

  当前拍摄: z.object({
    影片题材: z.string().prefault('待定'),
    拍摄流程: z.array(z.object({
      项目: z.string().prefault(''),
      介绍: z.string().prefault(''),
      报酬: z.coerce.number().transform(v => Math.max(0, v)).prefault(0),
      状态: z.string().transform(v => ['未开始', '进行中', '已完成'].includes(v) ? v : '未开始').prefault('未开始'),
    })).prefault([]),
    第三人称叙事: z.string().prefault(''),
    角色视角叙事: z.string().prefault(''),
    影片简介: z.string().prefault(''),
    影片销量: num,
    影片评分: pct,
    观众评论: z.array(z.string()).prefault([]),
    记者提问: z.array(z.string()).prefault([]),
    角色回答: z.array(z.string()).prefault([]),
    后日谈正文: z.string().prefault(''),
  }).prefault({}),

  演员库: z.array(z.object({
    姓名: z.string().prefault(''),
  年龄: z.string().transform(v => v.includes('岁') ? v : v + '岁').prefault(''),
    性格: z.string().prefault(''),
    背景: z.string().prefault(''),
    拍摄次数: num,
    最后合作: z.string().prefault(''),
    评价: z.string().prefault(''),
  })).prefault([]),

  拍摄历史: z.array(z.object({
    演员: z.string().prefault(''),
    影片: z.string().prefault(''),
    销量: num,
    评分: pct,
    时间: z.string().prefault(''),
  })).prefault([]),

  行动选项: z.object({
    一: z.string().prefault(''),
    二: z.string().prefault(''),
    三: z.string().prefault(''),
    四: z.string().prefault(''),
  }).prefault({}),

  当前叙事视角: z.string().prefault('第三人称'),
  当前场景描述: z.string().prefault(''),
}).prefault({});
