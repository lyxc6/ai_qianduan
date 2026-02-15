import { z } from 'zod';
import _ from 'lodash';

export const Schema = z.object({
  世界: z.object({
    当前时间: z.string(),
    当前地点: z.string(),
    近期事务: z.record(z.string().describe('事务名'), z.string().describe('事务描述')),
  }),

  领主: z
    .object({
      威望: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
      财富: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
      军事力量: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
      声望: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    })
    .transform(data => {
      const $阶段 =
        data.威望 < 20
          ? '卑微的边境领主'
          : data.威望 < 40
            ? '小有威望的爵士'
            : data.威望 < 60
              : '受人尊敬的领主'
              : data.威望 < 80
                : '权势滔天的侯爵'
                : '至高无上的王者';
      return { ...data, $阶段 };
    }),

  人物: z.record(
    z.string().describe('人名'),
    z.object({
      好感度: z.coerce.number().transform(v => _.clamp(v, -100, 100)),
      关系: z.string(),
      简介: z.string(),
    }),
  ),

  领地: z.object({
    繁荣度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    防御力: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    资源储备: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
  }),

  军队: z.record(
    z.string().describe('军队名称'),
    z.object({
      数量: z.coerce.number(),
      战斗力: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
      忠诚度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    }),
  ),
});

export type Schema = z.output<typeof Schema>;
