// @ts-nocheck
import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

const 非负数 = z.coerce.number().transform(v => Math.max(0, v)).prefault(0);
const 百分比 = z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0);
const 可空字符串 = z.string().nullable().transform(v => v ?? '');
const 可空字符串数组 = z.array(z.string()).nullable().transform(v => v ?? []);
const 可空布尔 = z.boolean().nullable().transform(v => v ?? true);

const 女孩等级枚举 = ['试用生', '铜铃', '银铃', '金铃', '花冠', '孕妃'];
const 怀孕状态枚举 = ['未孕', '孕早期', '孕中期', '孕晚期', '已生产'];
const 恩客类别枚举 = ['财阀二代', '政商掮客', '演艺圈', '海外资本', '世家名门', '新贵'];
const 恋情阶段枚举 = ['相识', '心动', '交往', '婚约', '迎娶'];
const 本月事件枚举 = ['无', '邂逅夜', '定情夜', '花冠加冕日', '十周年庆典'];
const 孕愿枚举 = ['拒绝受孕', '谨慎受孕', '愿意受孕', '渴望受孕'];

const 女孩字段 = {
  姓名: 可空字符串.prefault(''),
  年龄: z.coerce.number().transform(v => Math.max(18, Math.min(45, v))).prefault(20),
  出身: 可空字符串.prefault(''),
  职业: 可空字符串.prefault(''),
  性格: 可空字符串.prefault(''),
  性格标签: 可空字符串数组.prefault([]),
  外貌: 可空字符串.prefault(''),
  等级: 可空字符串.transform(v => 女孩等级枚举.includes(v) ? v : '试用生').prefault('试用生'),
  专属恩客: 可空字符串.prefault(''),
  心动对象: 可空字符串.prefault(''),
  恋情阶段: 可空字符串.transform(v => 恋情阶段枚举.includes(v) ? v : '相识').prefault('相识'),
  好感度: 百分比,
  欲望: 百分比,
  孕愿: 可空字符串.transform(v => 孕愿枚举.includes(v) ? v : '拒绝受孕').prefault('拒绝受孕'),
  处女: 可空布尔.prefault(true),
  性爱次数: 非负数,
  无套次数: 非负数,
  内射次数: 非负数,
  怀孕状态: 可空字符串.transform(v => 怀孕状态枚举.includes(v) ? v : '未孕').prefault('未孕'),
  怀孕天数: 非负数,
  生产次数: 非负数,
  累计奖励: 非负数,
  当前想法: 可空字符串.prefault(''),
  身体状态: 可空字符串.prefault(''),
};

const 玩家字段 = {
  姓名: 可空字符串.prefault('{{user}}'),
  性别: 可空字符串.transform(v => ['男', '女'].includes(v) ? v : '男').prefault('男'),
  会员等级: 可空字符串.transform(v => ['临时体验卡', '银卡', '金卡', '黑金卡'].includes(v) ? v : '黑金卡').prefault('黑金卡'),
  类别: 可空字符串.transform(v => 恩客类别枚举.includes(v) ? v : '新贵').prefault('新贵'),
  年龄: z.coerce.number().transform(v => Math.max(18, Math.min(60, v))).prefault(28),
  累计消费: 非负数,
  金叶积分: 非负数,
  当前需求: 可空字符串.prefault('十周年夜第一次入会，想以诚意为后宫挑选第一位银铃以上的姐妹'),
  专属服务员: 可空字符串数组.prefault([]),
  当前想法: 可空字符串.prefault(''),
};

export const Schema = z.object({
  世界: z.object({
    当前日期: 可空字符串.prefault('2026年8月8日'),
    当前时间: 可空字符串.prefault('21:00'),
    当前地点: 可空字符串.prefault('金宫俱乐部·顶层酒廊'),
    营业状态: 可空字符串.transform(v => ['营业中', '闭店', '私人场'].includes(v) ? v : '营业中').prefault('营业中'),
    俱乐部名称: 可空字符串.prefault('金宫俱乐部'),
    知名度: 百分比,
    本月流水: 非负数,
    在册女孩数: 非负数,
    育宫名额: 非负数,
    本月事件: 可空字符串.transform(v => 本月事件枚举.includes(v) ? v : '无').prefault('无'),
  }).prefault({}),

  玩家: z.object(玩家字段).prefault({}),

  恩客: z.record(z.string().describe('恩客姓名'), z.object({
    会员等级: 可空字符串.transform(v => ['临时体验卡', '银卡', '金卡', '黑金卡'].includes(v) ? v : '银卡').prefault('银卡'),
    类别: 可空字符串.transform(v => 恩客类别枚举.includes(v) ? v : '财阀二代').prefault('财阀二代'),
    累计消费: 非负数,
    金叶积分: 非负数,
    当前需求: 可空字符串.prefault(''),
    专属服务员: 可空字符串数组.prefault([]),
  }).prefault({})).prefault({}),

  女孩: z.record(z.string().describe('女孩姓名'), z.object(女孩字段).prefault({})).prefault({}),
}).prefault({});

$(() => {
  registerMvuSchema(Schema);
});
