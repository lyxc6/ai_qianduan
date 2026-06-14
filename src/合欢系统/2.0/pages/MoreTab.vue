<template>
  <div>
    <div class="group">
      <div class="group-header" :class="{ expanded: expanded2 }" @click="expanded2 = !expanded2">
        <i class="fa-solid fa-chevron-right"></i>
        <span>后代 ({{ childCount }})</span>
      </div>
      <div v-if="expanded2" class="group-body">
        <div v-if="childCount > 0">
          <div v-for="(child, name) in childItems" :key="String(name)">
            <div class="row"><span class="row-label">{{ child.姓名 || String(name) }}</span><span class="row-value accent">{{ child.当前状态 || '—' }}</span></div>
            <div class="row"><span class="row-label" style="padding-left: 12px;">父母</span><span class="row-value">{{ child.父亲 || '—' }} × {{ child.母亲 || '—' }}</span></div>
            <div class="row"><span class="row-label" style="padding-left: 12px;">年龄</span><span class="row-value">{{ child.年龄 || '—' }}</span></div>
            <div class="row"><span class="row-label" style="padding-left: 12px;">性别</span><span class="row-value">{{ child.性别 || '—' }}</span></div>
            <div class="row"><span class="row-label" style="padding-left: 12px;">受孕</span><span class="row-value">{{ child.受孕时间 || '—' }}</span></div>
            <div class="row"><span class="row-label" style="padding-left: 12px;">出生</span><span class="row-value">{{ child.出生时间 || '—' }}</span></div>
            <div class="row"><span class="row-label" style="padding-left: 12px;">特征</span><span class="row-value">{{ child.继承特征 || '—' }}</span></div>
          </div>
        </div>
        <div v-else class="empty">暂无记录</div>
      </div>
    </div>

    <div class="group">
      <div class="group-header" :class="{ expanded: expanded3 }" @click="expanded3 = !expanded3">
        <i class="fa-solid fa-chevron-right"></i>
        <span>宗门</span>
      </div>
      <div v-if="expanded3" class="group-body">
        <div class="section-label">基础</div>
        <div class="row"><span class="row-label">名称</span><span class="row-value accent">{{ sect.宗门名称 || '—' }}</span></div>
        <div class="row"><span class="row-label">理念</span><span class="row-value">{{ sect.宗门理念 || '—' }}</span></div>
        <div class="row"><span class="row-label">路线</span><span class="row-value">{{ sect.当前路线 || '—' }}</span></div>
        <div class="row"><span class="row-label">资金</span><span class="row-value">{{ sect.宗门资金 ?? 0 }}</span></div>
        <div class="row"><span class="row-label">规模</span><span class="row-value">{{ sect.宗门规模 ?? 0 }}</span></div>
        <div class="row"><span class="row-label">影响力</span><span class="row-value">{{ sect.影响力 ?? '—' }}</span></div>
        <div class="row"><span class="row-label">隐蔽度</span><span class="row-value">{{ sect.隐蔽度 ?? '—' }}</span></div>
        <div class="row"><span class="row-label">稳定度</span><span class="row-value">{{ sect.稳定度 ?? '—' }}</span></div>
        <div class="row"><span class="row-label">现代化</span><span class="row-value">{{ sect.现代化指数 ?? '—' }}</span></div>

        <div v-if="memberCount > 0" class="section-label" @click.stop="expandedMembers = !expandedMembers" style="cursor: pointer;">
          成员 ({{ memberCount }})
          <i class="fa-solid fa-chevron-right" :style="{ transform: expandedMembers ? 'rotate(90deg)' : '', transition: 'transform 0.2s', fontSize: '10px', marginLeft: '4px' }"></i>
        </div>
        <div v-if="expandedMembers && memberCount > 0">
          <div v-for="(m, name) in members" :key="String(name)">
            <div class="row"><span class="row-label">{{ m.姓名 || name }}</span><span class="row-value">{{ m.层级 || '—' }}</span></div>
            <div class="row"><span class="row-label" style="padding-left: 12px;">职位</span><span class="row-value">{{ m.当前职位 || '—' }}</span></div>
            <div class="row"><span class="row-label" style="padding-left: 12px;">忠诚</span><span class="row-value">{{ m.忠诚度 ?? '—' }}</span></div>
          </div>
        </div>

        <div v-if="positionCount > 0" class="section-label" @click.stop="expandedPositions = !expandedPositions" style="cursor: pointer;">
          岗位 ({{ positionCount }})
          <i class="fa-solid fa-chevron-right" :style="{ transform: expandedPositions ? 'rotate(90deg)' : '', transition: 'transform 0.2s', fontSize: '10px', marginLeft: '4px' }"></i>
        </div>
        <div v-if="expandedPositions && positionCount > 0">
          <div v-for="(p, name) in positions" :key="String(name)">
            <div class="row"><span class="row-label">{{ p.岗位名称 || name }}</span><span class="row-value">{{ p.任职者 || '—' }}</span></div>
            <div v-if="p.职责" class="row"><span class="row-label" style="padding-left: 12px;">职责</span><span class="row-value">{{ p.职责 }}</span></div>
          </div>
        </div>

        <div v-if="baseCount > 0" class="section-label" @click.stop="expandedBases = !expandedBases" style="cursor: pointer;">
          据点 ({{ baseCount }})
          <i class="fa-solid fa-chevron-right" :style="{ transform: expandedBases ? 'rotate(90deg)' : '', transition: 'transform 0.2s', fontSize: '10px', marginLeft: '4px' }"></i>
        </div>
        <div v-if="expandedBases && baseCount > 0">
          <div v-for="(b, name) in bases" :key="String(name)">
            <div class="row"><span class="row-label">{{ b.名称 || name }}</span><span class="row-value">{{ b.类型 || '—' }} · Lv{{ b.等级 ?? '—' }}</span></div>
            <div v-if="b.地点" class="row"><span class="row-label" style="padding-left: 12px;">地点</span><span class="row-value">{{ b.地点 }}</span></div>
            <div v-if="b.负责人" class="row"><span class="row-label" style="padding-left: 12px;">负责人</span><span class="row-value">{{ b.负责人 }}</span></div>
          </div>
        </div>

        <div v-if="industryCount > 0" class="section-label" @click.stop="expandedIndustries = !expandedIndustries" style="cursor: pointer;">
          产业 ({{ industryCount }})
          <i class="fa-solid fa-chevron-right" :style="{ transform: expandedIndustries ? 'rotate(90deg)' : '', transition: 'transform 0.2s', fontSize: '10px', marginLeft: '4px' }"></i>
        </div>
        <div v-if="expandedIndustries && industryCount > 0">
          <div v-for="(ind, name) in industries" :key="String(name)">
            <div class="row"><span class="row-label">{{ ind.名称 || name }}</span><span class="row-value">月收益 {{ ind.月收益 ?? 0 }}</span></div>
            <div v-if="ind.类型" class="row"><span class="row-label" style="padding-left: 12px;">类型</span><span class="row-value">{{ ind.类型 }}</span></div>
            <div v-if="ind.负责人" class="row"><span class="row-label" style="padding-left: 12px;">负责人</span><span class="row-value">{{ ind.负责人 }}</span></div>
          </div>
        </div>

        <div class="section-label" @click.stop="expandedRules = !expandedRules" style="cursor: pointer;">
          制度
          <i class="fa-solid fa-chevron-right" :style="{ transform: expandedRules ? 'rotate(90deg)' : '', transition: 'transform 0.2s', fontSize: '10px', marginLeft: '4px' }"></i>
        </div>
        <div v-if="expandedRules">
          <div class="row"><span class="row-label">保密</span><span class="row-value">{{ rules.保密制度 || '—' }}</span></div>
          <div class="row"><span class="row-label">贡献</span><span class="row-value">{{ rules.贡献制度 || '—' }}</span></div>
          <div class="row"><span class="row-label">晋升</span><span class="row-value">{{ rules.晋升制度 || '—' }}</span></div>
          <div class="row"><span class="row-label">奖惩</span><span class="row-value">{{ rules.奖惩制度 || '—' }}</span></div>
          <div class="row"><span class="row-label">退出</span><span class="row-value">{{ rules.退出机制 || '—' }}</span></div>
        </div>
      </div>
    </div>

    <div class="group">
      <div class="group-header" :class="{ expanded: expanded4 }" @click="expanded4 = !expanded4">
        <i class="fa-solid fa-chevron-right"></i>
        <span>商城</span>
      </div>
      <div v-if="expanded4" class="group-body">
        <div class="section-label">已解锁 ({{ unlockedCount }})</div>
        <div v-if="unlockedCount > 0">
          <div v-for="(item, name) in unlockedItems" :key="String(name)">
            <div class="row"><span class="row-label">{{ name }}</span><span class="row-value accent">{{ item.价格 ?? '—' }}点</span></div>
            <div v-if="item.类型" class="row"><span class="row-label" style="padding-left: 12px;">类型</span><span class="row-value">{{ item.类型 }}</span></div>
            <div v-if="item.效果" class="row"><span class="row-label" style="padding-left: 12px;">效果</span><span class="row-value">{{ item.效果 }}</span></div>
            <div v-if="item.持续时间" class="row"><span class="row-label" style="padding-left: 12px;">持续</span><span class="row-value">{{ item.持续时间 }}</span></div>
            <div v-if="item.使用限制" class="row"><span class="row-label" style="padding-left: 12px;">限制</span><span class="row-value">{{ item.使用限制 }}</span></div>
          </div>
        </div>

        <div class="section-label">本轮推荐 ({{ recommendedCount }})</div>
        <div v-if="recommendedCount > 0">
          <div v-for="(item, name) in recommendedItems" :key="String(name)">
            <div class="row"><span class="row-label">{{ name }}</span><span class="row-value accent">{{ item.价格 ?? '—' }}点</span></div>
            <div v-if="item.类型" class="row"><span class="row-label" style="padding-left: 12px;">类型</span><span class="row-value">{{ item.类型 }}</span></div>
            <div v-if="item.效果" class="row"><span class="row-label" style="padding-left: 12px;">效果</span><span class="row-value">{{ item.效果 }}</span></div>
            <div v-if="item.持续时间" class="row"><span class="row-label" style="padding-left: 12px;">持续</span><span class="row-value">{{ item.持续时间 }}</span></div>
            <div v-if="item.使用限制" class="row"><span class="row-label" style="padding-left: 12px;">限制</span><span class="row-value">{{ item.使用限制 }}</span></div>
            <div v-if="item.推荐理由" class="row"><span class="row-label" style="padding-left: 12px;">推荐</span><span class="row-value">{{ item.推荐理由 }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue';

interface ChildItem {
  姓名?: string;
  母亲?: string;
  父亲?: string;
  受孕时间?: string;
  出生时间?: string;
  当前状态?: string;
  年龄?: string;
  性别?: string;
  继承特征?: string;
  备注?: string;
}

interface SectMember {
  姓名?: string;
  来源目标?: string;
  层级?: string;
  当前职位?: string;
  忠诚度?: number;
  贡献值?: number;
  能力值?: number;
  野心?: number;
  泄密风险?: number;
  擅长领域?: string[];
  是否知晓系统?: boolean;
  状态?: string;
  备注?: string;
}

interface SectPosition {
  岗位名称?: string;
  任职者?: string;
  职责?: string;
  效率?: number;
  风险?: number;
  备注?: string;
}

interface SectBase {
  名称?: string;
  类型?: string;
  地点?: string;
  等级?: number;
  隐蔽度?: number;
  豪华度?: number;
  容纳人数?: number;
  功能?: string[];
  维护成本?: number;
  风险等级?: number;
  负责人?: string;
}

interface SectIndustry {
  名称?: string;
  类型?: string;
  等级?: number;
  负责人?: string;
  月收益?: number;
  维护成本?: number;
  合法外壳强度?: number;
  招募效率?: number;
  资源价值?: number;
  风险等级?: number;
  关联据点?: string;
}

interface SectRules {
  保密制度?: string;
  贡献制度?: string;
  晋升制度?: string;
  奖惩制度?: string;
  退出机制?: string;
}

interface ShopItem {
  类型?: string;
  价格?: number;
  效果?: string;
  持续时间?: string;
  使用限制?: string;
  推荐理由?: string;
}

const expanded2 = ref(false);
const expanded3 = ref(false);
const expanded4 = ref(false);
const expandedMembers = ref(false);
const expandedPositions = ref(false);
const expandedBases = ref(false);
const expandedIndustries = ref(false);
const expandedRules = ref(false);

const statData = inject<{ value: Record<string, Record<string, unknown>> }>('statData');

const childItems = computed(() => (statData?.value?.后代 || {}) as Record<string, ChildItem>);
const childCount = computed(() => Object.keys(childItems.value).length);

const sect = computed(() => (statData?.value?.宗门 || {}) as Record<string, unknown>);
const members = computed(() => (sect.value?.成员 || {}) as Record<string, SectMember>);
const memberCount = computed(() => Object.keys(members.value).length);
const positions = computed(() => (sect.value?.岗位 || {}) as Record<string, SectPosition>);
const positionCount = computed(() => Object.keys(positions.value).length);
const bases = computed(() => (sect.value?.据点 || {}) as Record<string, SectBase>);
const baseCount = computed(() => Object.keys(bases.value).length);
const industries = computed(() => (sect.value?.产业 || {}) as Record<string, SectIndustry>);
const industryCount = computed(() => Object.keys(industries.value).length);
const rules = computed(() => (sect.value?.制度 || {}) as SectRules);

const shop = computed(() => (statData?.value?.商城 || {}) as Record<string, Record<string, unknown>>);
const unlockedItems = computed(() => (shop.value?.已解锁商品 || {}) as Record<string, ShopItem>);
const unlockedCount = computed(() => Object.keys(unlockedItems.value).length);
const recommendedItems = computed(() => (shop.value?.本轮推荐商品 || {}) as Record<string, ShopItem>);
const recommendedCount = computed(() => Object.keys(recommendedItems.value).length);
</script>
