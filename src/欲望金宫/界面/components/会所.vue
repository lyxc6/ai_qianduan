<template>
  <div>
    <div class="card-title"><i class="fa-solid fa-building-columns"></i> 金宫会所档案</div>

    <div class="section-title"><i class="fa-solid fa-map-location-dot"></i> 会所场所</div>
    <div class="club-grid">
      <div v-for="place in places" :key="place.name" class="place-item">
        <div class="place-name">{{ place.name }}</div>
        <div class="place-desc">{{ place.desc }}</div>
      </div>
    </div>

    <div class="section-title"><i class="fa-solid fa-address-card"></i> 会员等级</div>
    <div class="club-grid">
      <div v-for="member in members" :key="member.name" class="member-card">
        <div class="member-name">{{ member.name }}</div>
        <div class="member-perk">{{ member.perk }}</div>
      </div>
    </div>

    <div class="section-title"><i class="fa-solid fa-ranking-star"></i> 女孩等级阶梯</div>
    <div class="club-grid">
      <div v-for="level in levels" :key="level.name" class="member-card">
        <div class="member-name">{{ level.name }}</div>
        <div class="member-perk">{{ level.perk }}</div>
      </div>
    </div>

    <div class="section-title"><i class="fa-solid fa-coins"></i> 基础奖励表</div>
    <div class="card">
      <table class="reward-table">
        <thead>
          <tr>
            <th>服务项目</th>
            <th>奖励区间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reward in rewards" :key="reward.name">
            <td>{{ reward.name }}</td>
            <td>{{ reward.amount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const places = [
  { name: '顶层酒廊', desc: '社交饮酒、初见与选人' },
  { name: '私宴厅', desc: '商务宴请与伴侣展示' },
  { name: '后宫庭院', desc: '贵宾与姐妹共同居所' },
  { name: '云雨间', desc: '私密性爱服务套房' },
  { name: '温泉汤池区', desc: '约会、按摩与酒水服务' },
  { name: '告白庭', desc: '定情、求婚、求子仪式' },
  { name: '金音厅', desc: '邂逅夜与加冕日会场' },
  { name: '医疗中心', desc: '体检、备孕与孕期检查' },
  { name: '育宫', desc: '孕妃产检、护理与抚养' },
  { name: '招募部', desc: '试镜、债务收购与签约' },
];

const members = [
  { name: '临时体验卡', perk: '单次入场，由执事团批准，无定情约申请权' },
  { name: '银卡会员', perk: '年费100万，可邀请试用生与铜铃' },
  { name: '金卡会员', perk: '年费1000万，可邀请银铃及以上并申请定情约' },
  { name: '黑金卡会员', perk: '执事团审批，可经营后宫，享最高规格服务' },
];

const levels = [
  { name: '试用生', perk: '新人首月，分成×1.0' },
  { name: '铜铃', perk: '累计奖励≥10万，分成×1.5' },
  { name: '银铃', perk: '累计奖励≥50万，分成×2.0' },
  { name: '金铃', perk: '累计奖励≥200万，分成×3.0，获得挑客权' },
  { name: '花冠', perk: '累计奖励≥500万，人气票选前三，分成×5.0' },
  { name: '孕妃', perk: '怀孕专属身份，享花冠待遇，单独定酬' },
];

const rewards = [
  { name: '陪酒聊天', amount: '5千-2万' },
  { name: '按摩陪伴', amount: '8千-3万' },
  { name: '亲吻与爱抚', amount: '1万-5万' },
  { name: '手交', amount: '2万-6万' },
  { name: '口交（含口爆）', amount: '3万-12万' },
  { name: '无套性交', amount: '20万-50万' },
  { name: '内射（无套中出）', amount: '50万-150万' },
  { name: '破处', amount: '300万起' },
  { name: '怀孕确认', amount: '500万起' },
  { name: '跟班陪游', amount: '每日20万起' },
];
</script>
