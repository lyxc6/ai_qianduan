import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

export const Schema = z.object({
  世界状态: z.object({
    当前日期: z.string().prefault('未记录'),
    当前时间: z.string().prefault('未记录'),
    当前地点: z.string().prefault('未记录'),
  }),

  出场女性角色: z.record(
    z.string().describe('角色姓名'),
    z
      .object({
        MBTI: z.string().prefault('未知'),
        好感度: z.coerce
          .number()
          .transform(v => _.clamp(v, 0, 100))
          .prefault(0),
        怀孕天数: z.coerce
          .number()
          .transform(v => Math.max(0, v))
          .prefault(0),
        生产次数: z.coerce
          .number()
          .transform(v => Math.max(0, v))
          .prefault(0),
        外貌: z.string().prefault('未知'),
        喜好: z.string().prefault('未知'),
        处女: z.boolean().prefault(true),
        破处记录: z.string().prefault(''),
      })
      .prefault({}),
  ),
});

$(() => {
  registerMvuSchema(Schema);
});
