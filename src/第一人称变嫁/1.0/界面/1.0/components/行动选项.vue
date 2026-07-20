<template>
  <div class="action-options-container">
    <div class="action-row">
      <span class="action-label">视角</span>
      <span class="action-content">{{ actionOptions.当前视角 || '未设置' }}</span>
    </div>
    <div class="action-row" @click="handleClick(actionOptions.选项一)">
      <span class="action-text">{{ actionOptions.选项一 || '' }}</span>
    </div>
    <div class="action-row" @click="handleClick(actionOptions.选项二)">
      <span class="action-text">{{ actionOptions.选项二 || '' }}</span>
    </div>
    <div class="action-row" @click="handleClick(actionOptions.选项三)">
      <span class="action-text">{{ actionOptions.选项三 || '' }}</span>
    </div>
    <div class="action-row" @click="handleClick(actionOptions.选项四)">
      <span class="action-text">{{ actionOptions.选项四 || '' }}</span>
    </div>

    <div class="nsfw-section">
      <div class="nsfw-title">亲密互动</div>
      <div class="nsfw-grid">
        <div class="nsfw-btn" @click="handleNSFWClick('牵手触碰')">牵手触碰</div>
        <div class="nsfw-btn" @click="handleNSFWClick('轻轻拥抱')">轻轻拥抱</div>
        <div class="nsfw-btn" @click="handleNSFWClick('轻吻试探')">轻吻试探</div>
        <div class="nsfw-btn" @click="handleNSFWClick('深吻缠绵')">深吻缠绵</div>
        <div class="nsfw-btn" @click="handleNSFWClick('温柔爱抚')">温柔爱抚</div>
        <div class="nsfw-btn" @click="handleNSFWClick('激情爱抚')">激情爱抚</div>
        <div class="nsfw-btn" @click="handleNSFWClick('相互慰藉')">相互慰藉</div>
        <div class="nsfw-btn" @click="handleNSFWClick('口舌服务')">口舌服务</div>
        <div class="nsfw-btn" @click="handleNSFWClick('引导进入')">引导进入</div>
        <div class="nsfw-btn" @click="handleNSFWClick('律动迎合')">律动迎合</div>
        <div class="nsfw-btn" @click="handleNSFWClick('激情高潮')">激情高潮</div>
        <div class="nsfw-btn" @click="handleNSFWClick('事后温存')">事后温存</div>
      </div>
    </div>

    <div class="nsfw-section">
      <div class="nsfw-title">做爱体位</div>
      <div class="nsfw-grid">
        <div class="nsfw-btn" @click="handlePositionClick('正常位')">正常位</div>
        <div class="nsfw-btn" @click="handlePositionClick('火车便当式')">火车便当</div>
        <div class="nsfw-btn" @click="handlePositionClick('骑乘位')">骑乘位</div>
        <div class="nsfw-btn" @click="handlePositionClick('后入跪位')">后入跪位</div>
        <div class="nsfw-btn" @click="handlePositionClick('后入卧位')">后入卧位</div>
        <div class="nsfw-btn" @click="handlePositionClick('老汉推车式')">老汉推车</div>
        <div class="nsfw-btn" @click="handlePositionClick('正体贴合式')">正体贴合</div>
        <div class="nsfw-btn" @click="handlePositionClick('反向贴合式')">反向贴合</div>
        <div class="nsfw-btn" @click="handlePositionClick('反向莲花')">反向莲花</div>
        <div class="nsfw-btn" @click="handlePositionClick('对面坐位')">对面坐位</div>
        <div class="nsfw-btn" @click="handlePositionClick('站立后入')">站立后入</div>
        <div class="nsfw-btn" @click="handlePositionClick('单腿站立位')">单腿站立</div>
        <div class="nsfw-btn" @click="handlePositionClick('高台站立式')">高台站立</div>
        <div class="nsfw-btn" @click="handlePositionClick('打桩式')">打桩式</div>
        <div class="nsfw-btn" @click="handlePositionClick('侧躺后入位')">侧躺后入</div>
        <div class="nsfw-btn" @click="handlePositionClick('亚马逊式')">亚马逊式</div>
        <div class="nsfw-btn" @click="handlePositionClick('交叉侧入式')">交叉侧入</div>
        <div class="nsfw-btn" @click="handlePositionClick('摇篮式')">摇篮式</div>
        <div class="nsfw-btn" @click="handlePositionClick('坐姿后入')">坐姿后入</div>
        <div class="nsfw-btn" @click="handlePositionClick('坐姿背面骑乘')">坐姿背骑</div>
        <div class="nsfw-btn" @click="handlePositionClick('床上背面骑乘')">床上背骑</div>
        <div class="nsfw-btn" @click="handlePositionClick('颜面骑乘')">颜面骑乘</div>
        <div class="nsfw-btn" @click="handlePositionClick('压墙式')">压墙式</div>
        <div class="nsfw-btn" @click="handlePositionClick('侧向交叉位')">侧向交叉</div>
        <div class="nsfw-btn" @click="handlePositionClick('站立侧抬腿')">站里侧抬腿</div>
        <div class="nsfw-btn" @click="handlePositionClick('扛腿位')">扛腿位</div>
        <div class="nsfw-btn" @click="handlePositionClick('锁腿位')">锁腿位</div>
        <div class="nsfw-btn" @click="handlePositionClick('M字开脚位')">M字开脚</div>
        <div class="nsfw-btn" @click="handlePositionClick('莲花位')">莲花位</div>
        <div class="nsfw-btn" @click="handlePositionClick('六九式')">六九式</div>
        <div class="nsfw-btn" @click="handlePositionClick('床上六九')">床上六九</div>
        <div class="nsfw-btn" @click="handlePositionClick('立式六九')">立式六九</div>
        <div class="nsfw-btn" @click="handlePositionClick('真空口交')">真空口交</div>
        <div class="nsfw-btn" @click="handlePositionClick('强制深喉')">强制深喉</div>
        <div class="nsfw-btn" @click="handlePositionClick('舔阴')">舔阴</div>
        <div class="nsfw-btn" @click="handlePositionClick('口交')">口交</div>
        <div class="nsfw-btn" @click="handlePositionClick('乳交')">乳交</div>
        <div class="nsfw-btn" @click="handlePositionClick('骑乘乳交')">骑乘乳交</div>
        <div class="nsfw-btn" @click="handlePositionClick('手交')">手交</div>
        <div class="nsfw-btn" @click="handlePositionClick('素股')">素股</div>
        <div class="nsfw-btn" @click="handlePositionClick('足交')">足交</div>
        <div class="nsfw-btn" @click="handlePositionClick('正面足交')">正面足交</div>
        <div class="nsfw-btn" @click="handlePositionClick('舔蛋')">舔蛋</div>
        <div class="nsfw-btn" @click="handlePositionClick('毒龙钻')">毒龙钻</div>
        <div class="nsfw-btn" @click="handlePositionClick('清洁口交')">清洁口交</div>
        <div class="nsfw-btn" @click="handlePositionClick('人体海绵')">人体海绵</div>
        <div class="nsfw-btn" @click="handlePositionClick('软足侍奉')">软足侍奉</div>
        <div class="nsfw-btn" @click="handlePositionClick('反向悬空后入')">反向悬空</div>
        <div class="nsfw-btn" @click="handlePositionClick('面对面侧卧')">面对面侧卧</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  statData: {
    行动选项?: {
      当前视角?: string;
      选项一?: string;
      选项二?: string;
      选项三?: string;
      选项四?: string;
    };
    主角?: {
      姓名?: string;
    };
  };
}

const props = defineProps<Props>();
const emit = defineEmits<{
  send: [text: string];
}>();

const actionOptions = computed(() => props.statData?.行动选项 || {});

const nsfwContents: Record<string, () => string> = {
  牵手触碰: () => `${props.statData?.主角?.姓名 || '{{user}}'}伸出手轻轻握住他的手，感受掌心的温度，试探性地十指交缠。`,
  轻轻拥抱: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}张开双臂缓缓环抱他的身体，脸颊贴在他胸膛上，感受彼此的心跳加速。`,
  轻吻试探: () => `${props.statData?.主角?.姓名 || '{{user}}'}踮起脚尖，用唇轻轻触碰他的唇，舌尖试探性地轻扫他的唇缝。`,
  深吻缠绵: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}将他拉近，唇紧紧贴在一起，舌尖深入探索他的口腔，呼吸逐渐急促。`,
  温柔爱抚: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}手指轻抚他的脸颊，顺着脖颈缓缓下滑，在肩膀和手臂上温柔地游走。`,
  激情爱抚: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}将手伸向他身体更敏感的部位，手指在皮肤上缓缓游走，动作逐渐变得急促而热情。`,
  相互慰藉: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}用手轻轻握住他的敏感部位，开始有节奏地摩擦，感受着彼此越来越强烈的快感。`,
  口舌服务: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}低下头，用舌头和嘴唇小心地刺激他的敏感部位，倾听他逐渐加重的呼吸。`,
  引导进入: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}调整好姿势，用手引导他进入自己的身体，缓慢而小心地让彼此的身体完全结合。`,
  律动迎合: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}随着他的节奏扭动腰肢，主动迎合每一次深入的撞击，感受越来越强烈的快感。`,
  激情高潮: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}在他的猛烈冲击下达到高潮，身体不受控制地颤抖，紧紧抱住他，快感一波又一波席卷而来。`,
  事后温存: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}躺在床上轻轻喘息，与他相拥在一起，在耳边轻声说着情话，感受彼此还未平复的呼吸和心跳。`,
};

const positionContents: Record<string, () => string> = {
  正常位: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}平躺双腿张开。他的双手揉捏着我的乳房，阴茎深入体内撞击阴蒂，我忍不住扭动腰肢回应。`,
  火车便当式: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}仰卧在沙发边缘臀部探出。他站在面前深深插入，重力让结合更紧密，每一下深入都让我脚趾蜷缩。`,
  骑乘位: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}跪坐在他身上缓缓下沉，主动将阴茎引入体内。我上下起伏，看着乳房摇晃，听着水声，感受他揉捏臀部和阴蒂。`,
  后入跪位: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}跪趴在床上臀部翘起。他从身后握住我的腰深深插入，囊袋拍打臀部，羞耻又刺激的感觉让小穴不自觉紧缩。`,
  后入卧位: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}侧躺臀部翘起。他从身后卧着进入，身体贴合紧密，我能感受到胸膛贴着后背，体温透过皮肤传来。`,
  老汉推车式: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}双手撑床臀部高高抬起。他站在身后掐住我的腰从后深深插入，羞耻感让阴道绞紧，浑身颤抖。`,
  正体贴合: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}仰卧他紧紧贴在我身上，胸腹相贴。他用耻骨死死抵住我的阴户，缓缓画圈研磨，快感如潮水般层层叠加。`,
  反向贴合: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}趴在身上胸腹紧贴。他揉捏臀部或伸到之间刺激阴蒂，我用膝盖作为支点将耻骨压在根部，前后蹭动研磨。`,
  反向莲花: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}背对着坐在他身上，缓缓坐下让阴茎从后方插入。他双手爱抚我的乳房，我可以回头与他深吻。`,
  对面坐位: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}面对面坐在他身上，双腿环绕他的腰。我们深情对视深吻，双手自由爱抚对方的身体，阴茎进入得特别深。`,
  站立后入: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}双手扶墙臀部翘起。他从身后插入，阴茎进入得特别深，每一下抽送都能顶到敏感点，双腿发软。`,
  单腿站立: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}单腿站立手扶墙，抬起另一条腿。他扛起我的腿从侧面深深插入，阴道角度改变让通道变得紧致。`,
  高台站立: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}站在桌子上臀部探出边缘。他从后方进入，高度差带来独特的角度，我忍不住抓紧桌沿。`,
  打桩式: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}躺在床上臀部微微翘起。他快速打桩撞击，每一下又深又重，囊袋拍打臀部发出清脆声响。`,
  侧躺后入: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}侧躺上方腿微微抬起。他从后方侧身进入，我们可以深吻，他环抱我的上身揉捏乳房。`,
  亚马逊式: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}躺在床沿臀部探出。他站着进入，阴茎进入得特别深，他抱着我的双腿进行抽插。`,
  交叉侧入: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}侧躺双腿交叉。他从后方侧身进入，交叉角度让阴道更加紧致，摩擦感格外强烈。`,
  摇篮式: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}仰卧抬起双腿抱住膝盖。他俯身插入双手撑床如摇篮一般，我们可以深吻，他含住乳头同时阴茎深入。`,
  坐姿后入: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}坐在床边臀部微微翘起。他站着从后方进入，重力让阴茎进入得特别深。`,
  坐姿背面骑乘: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}背对着坐在他身上，缓缓坐下让阴茎从后方插入。他坐着可以轻松爱抚乳房和臀部。`,
  床上背面骑乘: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}背对着跪在床上，缓缓向后坐下让阴茎从后方插入阴道。他躺着享受，双手自由爱抚我的乳房和阴蒂。`,
  颜面骑乘: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}跨坐在他脸上方，让他的嘴对准我的小穴。他专注舔砥我的阴蒂和阴道口，我低头看着他的动作。`,
  压墙式: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}双手用力压墙臀部翘起。他从后方猛烈抽插，乳房剧烈摇晃，阴道不断收缩。`,
  侧向交叉: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}侧躺双腿交叉。他从侧面进入，交叉角度刺激阴道内不同部位，新鲜的快感让我扭动腰肢迎合。`,
  站里侧抬腿: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}站立手扶支撑物，抬起一条腿向侧面伸展。他从侧面进入，抬起的腿让阴道更加开放。`,
  扛腿位: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}躺在床上，他抬起我的一条腿扛在肩上。这个姿势让阴茎进入得特别深，能顶到最敏感的部位。`,
  锁腿位: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}双腿紧紧缠绕在他的腰上，臀部抬起。他的阴茎被双腿紧紧环绕，结合更加紧密，摩擦感更强。`,
  M字开脚: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}仰卧双腿呈M字型张开。这个姿势让小穴完全暴露，他跪在双腿间深深插入，耻骨撞击阴蒂。`,
  莲花位: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}双腿交叉呈莲花坐姿坐在他身上，缓缓坐下让阴茎插入阴道。莲花坐姿让阴道自然收紧。`,
  六九式: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}和他呈69体位，我在上方头朝他的脚方向。我用嘴含住他的阴茎，同时他的嘴对着我的小穴。`,
  床上六九: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}在床上和他呈69体位。我用嘴含住他的阴茎，他也在舔砥着我的小穴，淫水止不住地流。`,
  立式六九: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}站着呈69体位。我一只手扶支撑物，用嘴含住他的阴茎，小穴暴露在他面前。`,
  真空口交: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}跪坐在他身前，用嘴唇紧紧包裹住他的阴茎形成密闭真空。脸颊因吸力凹陷，舌头不断舔砥。`,
  强制深喉: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}将他的阴茎深深含入口中，尽可能深入喉咙。他扶住我的头引导动作，用舌头和喉咙配合节奏。`,
  舔阴: () => `${props.statData?.主角?.姓名 || '{{user}}'}他仰卧，我趴在他两腿间，用嘴和舌头舔砥着他的阴囊和会阴处。`,
  口交: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}跪在他身前，用嘴含住他的阴茎。舌头环绕龟头刺激，将整个阴茎含入深喉，用手抚弄根部或睾丸。`,
  乳交: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}用双乳紧紧夹住他的阴茎，上下移动身体让乳房来回滑动，乳房被挤压产生形变。`,
  骑乘乳交: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}跨坐在他身上，用乳房夹住他的阴茎。上下移动身体让乳房滑动，阴茎同时摩擦到我的阴蒂。`,
  手交: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}用手握住他的阴茎进行摩擦。用手掌根部或指腹进行稳定而持续的刺激，配合润滑更加舒适。`,
  素股: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}用大腿内侧和臀部夹住他的阴茎，上下移动让阴茎在大腿和臀部间滑动，不用进入身体也能享受快感。`,
  足交: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}坐在床上用脚为他服务。用脚底或脚趾摩擦他的阴茎，调整力度和速度。`,
  正面足交: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}面对着他用脚为他足交。用脚底摩擦，脚趾精准刺激，我们面对面看着对方的表情。`,
  舔蛋: () => `${props.statData?.主角?.姓名 || '{{user}}'}温柔地含住他的睾丸，用舌尖轻轻舔砥或轻轻吸吮。`,
  毒龙钻: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}他仰卧，我从后方趴下用嘴舔砥他的肛门。舌头探索肛门周围的敏感区域。`,
  清洁口交: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}他在我体内射精后，我温柔地用嘴含住他的阴茎，仔细清理上面的精液。`,
  人体海绵: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}躺在床上身体微微弓起。他躺在我身上，身体紧密贴合如同两块海绵，利用身体重量产生摩擦快感。`,
  软足侍奉: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}用柔软的脚底和脚趾为他按摩足交。用轻柔的动作和恰到好处的力度。`,
  反向悬空: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}趴在床上臀部翘起但身体悬空。他站在身后双手托住臀部进行抽插，身体完全悬空让体位更加刺激。`,
  面对面侧卧: () =>
    `${props.statData?.主角?.姓名 || '{{user}}'}和对他方面对面侧躺在床上。他从侧面进入，我们紧紧相拥可以随时深吻，双手温柔爱抚对方。`,
};

function handleClick(text?: string) {
  if (text && text.trim()) {
    emit('send', text);
  }
}

function handleNSFWClick(buttonName: string) {
  const contentGenerator = nsfwContents[buttonName];
  if (contentGenerator) {
    const content = contentGenerator();
    console.log('【行动选项】主角姓名:', props.statData?.主角?.姓名);
    console.log('【行动选项】生成内容:', content);
    emit('send', content);
  }
}

function handlePositionClick(positionName: string) {
  const contentGenerator = positionContents[positionName];
  if (contentGenerator) {
    const content = contentGenerator();
    console.log('【体位选择】主角姓名:', props.statData?.主角?.姓名);
    console.log('【体位选择】体位:', positionName);
    console.log('【体位选择】生成内容:', content);
    emit('send', content);
  }
}
</script>

<style scoped lang="scss">
.nsfw-section {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px dashed var(--border-color);
}

.nsfw-title {
  font-family: var(--font-title);
  font-size: 0.85rem;
  color: var(--text-title);
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

.nsfw-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.4rem;
}

.nsfw-btn {
  background: linear-gradient(135deg, var(--warm-gradient-start) 0%, var(--warm-gradient-end) 100%);
  border: 1px solid var(--border-color);
  border-radius: 0.4rem;
  padding: 0.5rem 0.3rem;
  font-family: var(--font-serif);
  font-size: 0.65rem;
  color: var(--text-primary);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow:
    0 2px 4px var(--warm-shadow),
    inset 0 1px 0 var(--warm-inner-light);

  &:hover {
    background: linear-gradient(135deg, rgba(255, 210, 160, 0.9) 0%, rgba(255, 235, 195, 0.95) 100%);
    border-color: var(--user-color-primary);
    transform: translateY(-1px);
    box-shadow:
      0 4px 8px var(--warm-shadow),
      inset 0 1px 0 var(--warm-inner-light);
  }

  &:active {
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .nsfw-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 480px) {
  .nsfw-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .nsfw-btn {
    font-size: 0.6rem;
    padding: 0.4rem 0.25rem;
  }
}
</style>
