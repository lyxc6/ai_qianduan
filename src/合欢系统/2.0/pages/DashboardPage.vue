<template>
  <div>
    <div class="dashboard-header">
      <h1>合欢宗OS · 变量监控面板</h1>
      <p>实时查看所有系统变量</p>
    </div>

    <div class="dashboard-grid">
      <DashboardCard title="世界" icon="fa-solid fa-globe" color="pink">
        <StatBadge label="时间" :value="world.当前时间" />
        <StatBadge label="地点" :value="world.当前地点" />
        <StatBadge label="阶段" :value="world.当前主线阶段" />
        <StatBadge label="发展" :value="world.合欢宗发展等级" />
        <StatBadge label="商城" :value="world.商城等级" />
        <StatBadge label="权限" :value="world.系统权限等级" />
        <StatBadge label="外界时间" :value="world.外界时间状态" />
      </DashboardCard>

      <DashboardCard title="用户" icon="fa-solid fa-user" color="purple">
        <StatBadge label="姓名" :value="user.姓名" :highlight="true" />
        <StatBadge label="性别" :value="user.性别" />
        <StatBadge label="综合" :value="userScoreText" :highlight="true" />
        <StatBadge label="容貌" :value="user.容貌" />
        <StatBadge label="气质" :value="user.气质" />
        <StatBadge label="身材" :value="user.身材" />
        <ProgressBar :value="Number(user.综合评分 || 0)" />
        <StatBadge label="合欢值" :value="user.合欢值" :highlight="true" />
        <StatBadge label="现金" :value="user.现金" />
        <StatBadge label="双修目标" :value="user.已有效双修不同目标数" />
        <StatBadge label="双修次数" :value="user.有效双修总次数" />
      </DashboardCard>

      <DashboardCard title="系统" icon="fa-solid fa-desktop" color="blue">
        <StatBadge label="进行中任务" :value="activeTasks.length" />
        <StatBadge label="已完成任务" :value="completedTasks.length" />
        <StatBadge label="里程碑" :value="milestones.length" />
        <StatBadge label="行动建议" :value="suggestions.length" />
        <div v-if="systemSpace" style="margin-top: 8px;">
          <StatBadge label="系统空间" :value="systemSpace.用户是否在空间内 ? '在内' : '在外'" />
          <StatBadge label="外界时间" :value="systemSpace.外界时间是否暂停 ? '暂停' : '正常'" />
        </div>
      </DashboardCard>

      <DashboardCard title="风险监控" icon="fa-solid fa-triangle-exclamation" color="red">
        <div class="stat-row">
          <span class="stat-label">社交风险</span>
          <span class="stat-value">{{ world.社交风险值 ?? '—' }}</span>
        </div>
        <ProgressBar :value="Number(world.社交风险值 || 0)" color="red" />
        <div class="stat-row">
          <span class="stat-label">曝光风险</span>
          <span class="stat-value">{{ world.曝光风险值 ?? '—' }}</span>
        </div>
        <ProgressBar :value="Number(world.曝光风险值 || 0)" color="red" />
        <div class="stat-row">
          <span class="stat-label">校园名望</span>
          <span class="stat-value">{{ world.校园名望 ?? '—' }}</span>
        </div>
        <ProgressBar :value="Number(world.校园名望 || 0)" color="green" />
        <div class="stat-row">
          <span class="stat-label">城市名望</span>
          <span class="stat-value">{{ world.城市名望 ?? '—' }}</span>
        </div>
        <ProgressBar :value="Number(world.城市名望 || 0)" color="blue" />
        <div v-if="keyTargets.length" style="margin-top: 8px;">
          <div class="stat-label" style="margin-bottom: 4px;">重点目标</div>
          <TagList :tags="keyTargets" />
        </div>
      </DashboardCard>

      <DashboardCard title="目标概览" icon="fa-solid fa-users" color="pink" :wide="true">
        <div v-if="targetList.length" class="target-scroll">
          <div v-for="t in targetList" :key="t.姓名" class="target-card">
            <div class="target-card-name">{{ t.姓名 }}</div>
            <div class="target-card-level" :class="'level-' + String(t.综合等级 || 'E').toLowerCase()">
              {{ t.综合等级 || '—' }}
            </div>
            <div class="target-card-score">
              <i class="fa-solid fa-heart"></i>{{ t.好感度 ?? 0 }}
            </div>
            <div class="target-card-score" style="margin-top: 2px;">
              {{ t.关系阶段 || '—' }} · {{ t.关系状态 || '—' }}
            </div>
          </div>
        </div>
        <div v-else class="empty-hint">暂无目标记录</div>
      </DashboardCard>

      <DashboardCard title="背包" icon="fa-solid fa-suitcase" color="purple">
        <StatBadge label="物品总数" :value="bagCount" />
        <div v-if="bagCount > 0" style="margin-top: 8px;">
          <div v-for="(item, name) in bagItems" :key="String(name)" class="stat-row">
            <span class="stat-label">{{ name }}</span>
            <span class="stat-value">×{{ item.数量 ?? 0 }}</span>
          </div>
        </div>
        <div v-else class="empty-hint">背包为空</div>
      </DashboardCard>

      <DashboardCard title="宗门" icon="fa-solid fa-landmark" color="teal">
        <StatBadge label="名称" :value="sect.宗门名称" :highlight="true" />
        <StatBadge label="路线" :value="sect.当前路线" />
        <StatBadge label="资金" :value="sect.宗门资金" />
        <StatBadge label="规模" :value="sect.宗门规模" />
        <div class="stat-row">
          <span class="stat-label">影响力</span>
          <span class="stat-value">{{ sect.影响力 ?? '—' }}</span>
        </div>
        <ProgressBar :value="Number(sect.影响力 || 0)" />
        <div class="stat-row">
          <span class="stat-label">隐蔽度</span>
          <span class="stat-value">{{ sect.隐蔽度 ?? '—' }}</span>
        </div>
        <ProgressBar :value="Number(sect.隐蔽度 || 0)" color="blue" />
        <div class="stat-row">
          <span class="stat-label">稳定度</span>
          <span class="stat-value">{{ sect.稳定度 ?? '—' }}</span>
        </div>
        <ProgressBar :value="Number(sect.稳定度 || 0)" color="green" />
      </DashboardCard>

      <DashboardCard title="商城" icon="fa-solid fa-cart-shopping" color="orange">
        <StatBadge label="已解锁" :value="unlockedCount" />
        <StatBadge label="推荐商品" :value="recommendedCount" />
        <div v-if="recommendedCount > 0" style="margin-top: 8px;">
          <div v-for="(item, name) in recommendedItems" :key="String(name)" class="stat-row">
            <span class="stat-label">{{ name }}</span>
            <span class="stat-value highlight">{{ item.价格 ?? '—' }}点</span>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard title="后代" icon="fa-solid fa-baby" color="pink">
        <StatBadge label="记录数" :value="childCount" />
        <div v-if="childCount > 0" style="margin-top: 8px;">
          <div v-for="(child, name) in childItems" :key="String(name)" class="stat-row">
            <span class="stat-label">{{ child.姓名 || name }}</span>
            <span class="stat-value">{{ child.当前状态 || '—' }}</span>
          </div>
        </div>
        <div v-else class="empty-hint">暂无后代记录</div>
      </DashboardCard>

      <DashboardCard title="任务列表" icon="fa-solid fa-list-check" color="blue" :wide="true">
        <div v-if="allTasks.length">
          <div v-for="(task, i) in allTasks" :key="i" class="task-item">
            <div class="task-dot" :class="task.状态 === '已完成' ? 'done' : task.状态 === '失败' ? 'failed' : 'active'"></div>
            <span class="task-name">{{ task.名称 || '未命名任务' }}</span>
            <span class="task-progress">{{ task.进度 || '—' }}</span>
          </div>
        </div>
        <div v-else class="empty-hint">暂无任务</div>
      </DashboardCard>

      <DashboardCard v-if="userStatuses.length" title="当前状态" icon="fa-solid fa-wand-magic-sparkles" color="green" :wide="true">
        <TagList :tags="userStatuses" />
      </DashboardCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import DashboardCard from '../components/DashboardCard.vue';
import StatBadge from '../components/StatBadge.vue';
import ProgressBar from '../components/ProgressBar.vue';
import TagList from '../components/TagList.vue';

interface TaskItem {
  名称?: string;
  类型?: string;
  目标?: string;
  时限?: string;
  奖励?: string;
  失败后果?: string;
  进度?: string;
  状态?: string;
}

interface TargetItem {
  姓名?: string;
  性别?: string;
  综合等级?: string;
  综合评分?: number;
  关系阶段?: string;
  关系状态?: string;
  好感度?: number;
  是否在场?: boolean;
  是否被攻略?: boolean;
  怀孕状态?: string;
  有效双修次数?: number;
  主要顾虑?: string;
  [key: string]: unknown;
}

interface BagItem {
  数量?: number;
  类型?: string;
  效果?: string;
  持续时间?: string;
  使用限制?: string;
}

interface SectData {
  宗门名称?: string;
  当前路线?: string;
  宗门资金?: number;
  宗门规模?: number;
  影响力?: number;
  隐蔽度?: number;
  稳定度?: number;
  成员?: Record<string, unknown>;
  岗位?: Record<string, unknown>;
  据点?: Record<string, unknown>;
  产业?: Record<string, unknown>;
  制度?: Record<string, unknown>;
}

interface ShopItem {
  类型?: string;
  价格?: number;
  效果?: string;
  持续时间?: string;
  使用限制?: string;
  推荐理由?: string;
}

interface ChildItem {
  姓名?: string;
  母亲?: string;
  父亲?: string;
  当前状态?: string;
  年龄?: string;
  性别?: string;
}

interface StatData {
  世界?: Record<string, unknown>;
  用户?: {
    姓名?: string;
    性别?: string;
    综合评分?: number;
    综合等级?: string;
    容貌?: string;
    气质?: string;
    身材?: string;
    合欢值?: number;
    现金?: number;
    已有效双修不同目标数?: number;
    有效双修总次数?: number;
    当前生效状态?: string[];
    已领取现金里程碑?: string[];
    [key: string]: unknown;
  };
  系统?: {
    当前任务?: TaskItem[];
    已完成任务?: string[];
    已解锁里程碑?: string[];
    行动建议?: string[];
    系统提示?: string[];
    系统空间?: {
      用户是否在空间内?: boolean;
      外界时间是否暂停?: boolean;
    };
    [key: string]: unknown;
  };
  目标?: Record<string, TargetItem>;
  背包?: Record<string, BagItem>;
  后代?: Record<string, ChildItem>;
  宗门?: SectData;
  商城?: {
    已解锁商品?: Record<string, ShopItem>;
    本轮推荐商品?: Record<string, ShopItem>;
  };
}

const injectedStatData = inject<{ value: StatData }>('statData');
const statData = computed((): StatData => injectedStatData?.value || {});

const world = computed(() => statData.value?.世界 || {});
const user = computed(() => statData.value?.用户 || {});
const system = computed(() => statData.value?.系统 || {});
const sect = computed(() => statData.value?.宗门 || {});
const shop = computed(() => statData.value?.商城 || {});

const userScoreText = computed(() => {
  const score = Number(user.value.综合评分 || 0);
  const level = user.value.综合等级 || '';
  return level ? `${score} / ${level}` : String(score);
});

const userStatuses = computed(() => user.value?.当前生效状态 || []);
const keyTargets = computed(() => {
  const arr = world.value?.当前重点目标;
  return Array.isArray(arr) ? arr as string[] : [];
});

const systemSpace = computed(() => system.value?.系统空间);

const allTasks = computed(() => system.value?.当前任务 || []);
const activeTasks = computed(() => allTasks.value.filter(t => t.状态 !== '已完成' && t.状态 !== '失败'));
const completedTasks = computed(() => allTasks.value.filter(t => t.状态 === '已完成'));
const milestones = computed(() => system.value?.已解锁里程碑 || []);
const suggestions = computed(() => system.value?.行动建议 || []);

const targetList = computed(() => {
  const all = statData.value?.目标 || {};
  return Object.values(all);
});

const bagItems = computed(() => statData.value?.背包 || {});
const bagCount = computed(() => Object.keys(bagItems.value).length);

const childItems = computed(() => statData.value?.后代 || {});
const childCount = computed(() => Object.keys(childItems.value).length);

const unlockedCount = computed(() => {
  const items = shop.value?.已解锁商品 || {};
  return Object.keys(items).length;
});

const recommendedCount = computed(() => {
  const items = shop.value?.本轮推荐商品 || {};
  return Object.keys(items).length;
});

const recommendedItems = computed(() => shop.value?.本轮推荐商品 || {});
</script>
