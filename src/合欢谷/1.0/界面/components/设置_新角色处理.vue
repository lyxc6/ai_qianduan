<template>
  <details class="setting-section">
    <summary>新角色处理</summary>
    <div class="setting-content">
      <div v-if="角色列表.length > 0" class="character-list-section">
        <div class="character-forms">
          <div v-for="(角色数据, 索引) in 角色列表" :key="索引" class="character-form">
            <details class="form-header">
              <summary>{{ 角色数据.解析后?.名称 || '未命名' }}</summary>
              <div v-if="角色数据.解析后" class="form-body">
                <div class="info-group">
                  <div class="info-item">
                    <div class="info-label">名称</div>
                    <div class="info-value">
                      <textarea v-model="角色数据.解析后!.名称" class="value-input" placeholder="请输入" />
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">性别</div>
                    <div class="info-value">
                      <textarea v-model="角色数据.解析后!.性别" class="value-input" placeholder="请输入" />
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">年龄</div>
                    <div class="info-value">
                      <input
                        type="number"
                        v-model.number="角色数据.解析后!.年龄"
                        class="value-input"
                        placeholder="请输入"
                      />
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">身份</div>
                    <div class="info-value">
                      <textarea v-model="角色数据.解析后!.身份" class="value-input" placeholder="请输入" />
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">功力境界</div>
                    <div class="info-value">
                      <textarea v-model="角色数据.解析后!.功力境界" class="value-input" placeholder="请输入" />
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">好感度</div>
                    <div class="info-value">
                      <input
                        type="number"
                        v-model.number="角色数据.解析后!.好感度"
                        class="value-input"
                        placeholder="请输入"
                      />
                    </div>
                  </div>
                  <div
                    class="info-item"
                    :class="{ hidden: !isFemale(角色数据.解析后) && !isTransforming(角色数据.解析后) }"
                  >
                    <div class="info-label">处女</div>
                    <div class="info-value">
                      <select v-model="角色数据.解析后!.处女" class="value-input">
                        <option :value="true">是</option>
                        <option :value="false">否</option>
                      </select>
                    </div>
                  </div>
                  <div
                    class="info-item"
                    :class="{ hidden: !isFemale(角色数据.解析后) && !isTransforming(角色数据.解析后) }"
                  >
                    <div class="info-label">谷内地位</div>
                    <div class="info-value">
                      <textarea v-model="角色数据.解析后!.谷内地位" class="value-input" placeholder="请输入"></textarea>
                    </div>
                  </div>
                  <div
                    class="info-item"
                    :class="{ hidden: !isFemale(角色数据.解析后) && !isTransforming(角色数据.解析后) }"
                  >
                    <div class="info-label">怀孕状态</div>
                    <div class="info-value">
                      <textarea v-model="角色数据.解析后!.怀孕状态" class="value-input" placeholder="请输入"></textarea>
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">当前位置</div>
                    <div class="info-value">
                      <textarea v-model="角色数据.解析后!.当前位置" class="value-input" placeholder="请输入"></textarea>
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">当前想法</div>
                    <div class="info-value">
                      <textarea
                        v-model="角色数据.解析后!.当前想法"
                        class="value-input value-textarea"
                        placeholder="请输入"
                      ></textarea>
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">当前着装</div>
                    <div class="info-value">
                      <textarea v-model="角色数据.解析后!.当前着装" class="value-input" placeholder="请输入"></textarea>
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">当前姿势</div>
                    <div class="info-value">
                      <textarea v-model="角色数据.解析后!.当前姿势" class="value-input" placeholder="请输入"></textarea>
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">身体状况</div>
                    <div class="info-value">
                      <textarea v-model="角色数据.解析后!.身体状况" class="value-input" placeholder="请输入"></textarea>
                    </div>
                  </div>
                  <div
                    class="info-item"
                    :class="{ hidden: !isFemale(角色数据.解析后) && !isTransforming(角色数据.解析后) }"
                  >
                    <div class="info-label">胸部状态</div>
                    <div class="info-value">
                      <textarea v-model="角色数据.解析后!.胸部状态" class="value-input" placeholder="请输入"></textarea>
                    </div>
                  </div>
                  <div
                    class="info-item"
                    :class="{ hidden: !isFemale(角色数据.解析后) && !isTransforming(角色数据.解析后) }"
                  >
                    <div class="info-label">阴部状态</div>
                    <div class="info-value">
                      <textarea v-model="角色数据.解析后!.阴部状态" class="value-input" placeholder="请输入"></textarea>
                    </div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">最近性行为</div>
                    <div class="info-value">
                      <textarea
                        v-model="角色数据.解析后!.最近性行为"
                        class="value-input"
                        placeholder="请输入"
                      ></textarea>
                    </div>
                  </div>
                  <div
                    class="info-item"
                    :class="{ hidden: !isFemale(角色数据.解析后) && !isTransforming(角色数据.解析后) }"
                  >
                    <div class="info-label">被内射次数</div>
                    <div class="info-value">
                      <input
                        type="number"
                        v-model.number="角色数据.解析后!.被内射次数"
                        class="value-input"
                        placeholder="请输入"
                      />
                    </div>
                  </div>
                  <div
                    class="info-item"
                    :class="{ hidden: !isFemale(角色数据.解析后) && !isTransforming(角色数据.解析后) }"
                  >
                    <div class="info-label">高潮次数</div>
                    <div class="info-value">
                      <input
                        type="number"
                        v-model.number="角色数据.解析后!.高潮次数"
                        class="value-input"
                        placeholder="请输入"
                      />
                    </div>
                  </div>
                </div>

                <div v-if="角色数据.解析后?.关键词" class="form-section">
                  <h3 class="form-section-title">
                    关键词
                    <i class="fas fa-plus add-icon" @click="添加关键词(角色数据)" title="添加关键词"></i>
                  </h3>
                  <div class="martial-arts-container">
                    <div
                      v-for="idx in 角色数据.解析后!.关键词!.length"
                      :key="'kw-' + (idx - 1)"
                      class="martial-art-item"
                    >
                      <textarea
                        v-model="角色数据.解析后!.关键词![idx - 1]"
                        class="skill-text"
                        placeholder="请输入"
                      ></textarea>
                      <i class="fas fa-times delete-icon" @click="删除关键词(角色数据, idx - 1)" title="删除"></i>
                    </div>
                  </div>
                </div>

                <div v-if="角色数据.解析后?.标签" class="form-section">
                  <h3 class="form-section-title">
                    标签
                    <i class="fas fa-plus add-icon" @click="添加标签(角色数据)" title="添加标签"></i>
                  </h3>
                  <div class="martial-arts-container">
                    <div
                      v-for="idx in 角色数据.解析后!.标签!.length"
                      :key="'tag-' + (idx - 1)"
                      class="martial-art-item"
                    >
                      <textarea
                        v-model="角色数据.解析后!.标签![idx - 1]"
                        class="skill-text"
                        placeholder="请输入"
                      ></textarea>
                      <i class="fas fa-times delete-icon" @click="删除标签(角色数据, idx - 1)" title="删除"></i>
                    </div>
                  </div>
                </div>

                <div v-if="角色数据.解析后?.功法与技能" class="form-section">
                  <h3 class="form-section-title">
                    功法与技能
                    <i class="fas fa-plus add-icon" @click="添加功法(角色数据)" title="添加功法"></i>
                  </h3>
                  <div class="martial-arts-container">
                    <div v-for="idx in 角色数据.解析后!.功法与技能.length" :key="idx - 1" class="martial-art-item">
                      <textarea
                        v-model="角色数据.解析后!.功法与技能![idx - 1]"
                        class="skill-text"
                        placeholder="请输入"
                      ></textarea>
                      <i class="fas fa-times delete-icon" @click="删除功法(角色数据, idx - 1)" title="删除"></i>
                    </div>
                  </div>
                </div>

                <div v-if="角色数据.解析后?.背景" class="form-section">
                  <h3 class="form-section-title">背景</h3>
                  <div class="info-group">
                    <div class="info-item">
                      <div class="info-label">出身</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.背景!.出身"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">师承</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.背景!.师承"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item full-width">
                      <div class="info-label">重要经历</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.背景!.重要经历"
                          class="value-input value-textarea"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">江湖地位</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.背景!.江湖地位"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="角色数据.解析后?.形象外表" class="form-section">
                  <h3 class="form-section-title">形象外表</h3>
                  <div class="info-group">
                    <div class="info-item full-width">
                      <div class="info-label">整体印象</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.形象外表!.整体印象"
                          class="value-input value-textarea"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">体型</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.形象外表!.体型"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">面部</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.形象外表!.面部"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">发型</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.形象外表!.发型"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">眼睛</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.形象外表!.眼睛"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">肤色</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.形象外表!.肤色"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">日常着装</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.形象外表!.日常着装"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="角色数据.解析后?.性格与表达" class="form-section">
                  <h3 class="form-section-title">性格与表达</h3>
                  <div class="info-group">
                    <div class="info-item full-width">
                      <div class="info-label">核心特征</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.性格与表达!.核心特征"
                          class="value-input value-textarea"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">优点</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.性格与表达!.优点"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">缺点</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.性格与表达!.缺点"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item full-width">
                      <div class="info-label">观念</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.性格与表达!.观念"
                          class="value-input value-textarea"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">说话风格</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.性格与表达!.说话风格"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">常用语</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.性格与表达!.常用语"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="角色数据.解析后?.能力" class="form-section">
                  <h3 class="form-section-title">能力</h3>
                  <div class="info-group">
                    <div class="info-item">
                      <div class="info-label">擅长</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.能力!.擅长"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">绝招</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.能力!.绝招"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">弱点</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.能力!.弱点"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">江湖评价</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.能力!.江湖评价"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  v-if="
                    角色数据.解析后?.NSFW信息 &&
                    (isFemale(角色数据.解析后) || isTransforming(角色数据.解析后) || isMale(角色数据.解析后))
                  "
                  class="form-section"
                >
                  <h3 class="form-section-title">NSFW信息</h3>
                  <div class="info-group">
                    <div class="info-item">
                      <div class="info-label">体质</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.NSFW信息!.体质"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">基础特性</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.NSFW信息!.基础特性"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item full-width">
                      <div class="info-label">敏感带</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.NSFW信息!.敏感带"
                          class="value-input"
                          placeholder="请输入，多个用顿号分隔"
                        ></textarea>
                      </div>
                    </div>
                    <template v-if="isFemale(角色数据.解析后) || isTransforming(角色数据.解析后)">
                      <div class="info-item">
                        <div class="info-label">胸部</div>
                        <div class="info-value">
                          <textarea
                            v-model="角色数据.解析后!.NSFW信息!.胸部"
                            class="value-input"
                            placeholder="请输入"
                          ></textarea>
                        </div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">阴部</div>
                        <div class="info-value">
                          <textarea
                            v-model="角色数据.解析后!.NSFW信息!.阴部"
                            class="value-input"
                            placeholder="请输入"
                          ></textarea>
                        </div>
                      </div>
                    </template>
                    <div v-if="isMale(角色数据.解析后)" class="info-item">
                      <div class="info-label">阴茎</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.NSFW信息!.阴茎"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="角色数据.解析后?.性别转换状态 && isTransforming(角色数据.解析后)" class="form-section">
                  <h3 class="form-section-title">性别转换状态</h3>
                  <div class="info-group">
                    <div class="info-item">
                      <div class="info-label">原名称</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.性别转换状态!.原名称"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">原性别</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.性别转换状态!.原性别"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">转换原因</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.性别转换状态!.转换原因"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">转换时间</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.性别转换状态!.转换时间"
                          class="value-input"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                    <div class="info-item full-width">
                      <div class="info-label">转换方式</div>
                      <div class="info-value">
                        <textarea
                          v-model="角色数据.解析后!.性别转换状态!.转换方式"
                          class="value-input value-textarea"
                          placeholder="请输入"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <div class="action-left">
                    <button class="action-btn save-btn" @click="保存角色"><i class="fas fa-save"></i> 保存</button>
                  </div>
                  <div class="action-right">
                    <button class="action-btn add-btn" @click="添加新角色(角色数据)">
                      <i class="fas fa-plus"></i> 添加角色
                    </button>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>

      <div v-else class="no-data">无新角色信息</div>
    </div>
  </details>

  <!-- 角色已存在确认模态框 -->
  <Teleport to="body">
    <div v-if="显示确认弹窗" class="modal-overlay active" @click="关闭确认弹窗">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>角色已存在</h3>
          <div class="modal-close" @click="关闭确认弹窗">✕</div>
        </div>
        <div class="modal-body">
          <p>{{ 确认弹窗信息 }}</p>
        </div>
        <div class="modal-footer">
          <button class="modal-btn cancel-btn" @click="关闭确认弹窗">取消</button>
          <button class="modal-btn confirm-btn" @click="确认覆盖添加">确认覆盖</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { onMounted, ref } from 'vue';

interface 角色 {
  关键词?: string[];
  名称?: string;
  性别?: string;
  年龄?: number;
  标签?: string[];
  好感度?: number;
  身份?: string;
  功力境界?: string;
  当前位置?: string;
  当前想法?: string;
  当前着装?: string;
  当前姿势?: string;
  身体状况?: string;
  功法与技能?: string[];
  最近性行为?: string;
  胸部状态?: string;
  阴部状态?: string;
  处女?: boolean;
  被内射次数?: number;
  高潮次数?: number;
  谷内地位?: string;
  怀孕状态?: string;
  背景?: {
    出身?: string;
    师承?: string;
    重要经历?: string;
    江湖地位?: string;
  };
  形象外表?: {
    身体比例?: string;
    整体印象?: string;
    体型?: string;
    面部?: string;
    发型?: string;
    眼睛?: string;
    肤色?: string;
    日常着装?: string;
  };
  性格与表达?: {
    核心特征?: string;
    优点?: string;
    缺点?: string;
    观念?: string;
    习惯?: string;
    说话风格?: string;
    常用语?: string;
    基本态度?: string;
    肢体语言?: string;
    情绪表现?: string;
  };
  能力?: {
    擅长?: string[];
    绝招?: string;
    弱点?: string;
    江湖评价?: string;
  };
  NSFW信息?: {
    胸部?: string;
    阴部?: string;
    敏感带?: string[];
    体质?: string;
    基础特性?: string;
    NSFW特性?: string;
    特殊状态?: string;
    缺点?: string;
    阴茎?: string;
  };
  性别转换状态?: {
    原名称?: string;
    原性别?: string;
    转换原因?: string;
    转换时间?: string;
    转换方式?: string;
  };
}

interface 角色数据 {
  解析后?: 角色;
  message_id?: number;
}

const 角色列表 = ref<角色数据[]>([]);
const 显示确认弹窗 = ref(false);
const 确认弹窗信息 = ref('');
let 待确认角色数据: 角色数据 | null = null;

onMounted(() => {
  显示新角色信息();
});

function isFemale(角色: 角色 | undefined): boolean {
  return 角色?.性别 === '女';
}

function isMale(角色: 角色 | undefined): boolean {
  return 角色?.性别 === '男';
}

function isTransforming(角色: 角色 | undefined): boolean {
  return 角色?.性别 === '由男变女';
}

function 打开确认弹窗(角色数据: 角色数据, 信息: string) {
  待确认角色数据 = 角色数据;
  确认弹窗信息.value = 信息;
  显示确认弹窗.value = true;
}

function 关闭确认弹窗() {
  待确认角色数据 = null;
  显示确认弹窗.value = false;
  确认弹窗信息.value = '';
}

async function 确认覆盖添加() {
  if (!待确认角色数据) {
    关闭确认弹窗();
    return;
  }

  const 角色内容 = 待确认角色数据.解析后;
  if (!角色内容 || !角色内容.名称) {
    关闭确认弹窗();
    return;
  }

  const 角色性别 = 获取角色性别(角色内容);
  await 覆盖角色变量(角色内容, 角色性别);
  await 覆盖角色世界书(角色内容, 角色性别);

  console.info('【角色处理】角色覆盖添加成功:', 角色内容.名称);
  关闭确认弹窗();
}

function 删除功法(角色数据: 角色数据, 索引: number) {
  角色数据.解析后!.功法与技能?.splice(索引, 1);
}

function 添加功法(角色数据: 角色数据) {
  if (!角色数据.解析后!.功法与技能) {
    角色数据.解析后!.功法与技能 = [];
  }
  角色数据.解析后!.功法与技能.push('');
}

function 删除关键词(角色数据: 角色数据, 索引: number) {
  角色数据.解析后!.关键词?.splice(索引, 1);
}

function 添加关键词(角色数据: 角色数据) {
  if (!角色数据.解析后!.关键词) {
    角色数据.解析后!.关键词 = [];
  }
  角色数据.解析后!.关键词.push('');
}

function 删除标签(角色数据: 角色数据, 索引: number) {
  角色数据.解析后!.标签?.splice(索引, 1);
}

function 添加标签(角色数据: 角色数据) {
  if (!角色数据.解析后!.标签) {
    角色数据.解析后!.标签 = [];
  }
  角色数据.解析后!.标签.push('');
}

async function 保存角色() {
  const messageId = getCurrentMessageId();
  const messages = getChatMessages(messageId);

  if (messages.length === 0) {
    console.warn('【角色处理】没有找到消息');
    return;
  }

  const latestMessage = messages[0];

  if (角色列表.value.length === 0) {
    console.warn('【角色处理】没有角色数据');
    return;
  }

  let newMessageText = latestMessage.message;

  const getNewCharacterRegex = /<newWorldCharacter>[\s\S]*?<\/newWorldCharacter>/g;

  for (let i = 0; i < 角色列表.value.length; i++) {
    const 角色数据 = 角色列表.value[i];
    const 角色内容 = 角色数据.解析后;

    if (!角色内容) {
      console.warn('【角色处理】角色数据为空:', i);
      continue;
    }

    const 角色字符串 = 对象转YAML(角色内容 as unknown as Record<string, unknown>);
    const 新标签 = `<newWorldCharacter>\n${角色字符串}</newWorldCharacter>`;

    if (i === 0 && !getNewCharacterRegex.test(newMessageText)) {
      newMessageText = 新标签 + '\n' + newMessageText;
    } else {
      const match = newMessageText.match(getNewCharacterRegex);
      if (match && match[i]) {
        newMessageText = newMessageText.replace(match[i], 新标签);
      } else {
        newMessageText = newMessageText.replace(getNewCharacterRegex, 新标签);
      }
    }

    console.info('【角色处理】保存角色:', 角色内容.名称);
  }

  console.info('【角色处理】更新消息');

  await setChatMessages([{ message_id: latestMessage.message_id, message: newMessageText }]);
}

function 对象转YAML(obj: Record<string, unknown>, indent: number = 0): string {
  const spaces = '  '.repeat(indent);
  let result = '';

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      if (value.length === 0) {
        result += `${spaces}${key}: []\n`;
        continue;
      }

      const allStrings = value.every(item => typeof item === 'string');
      if (allStrings) {
        const items = value.map((item: any) => {
          const str = String(item);
          if (str.includes(',') || str.includes('[') || str.includes(']') || str.includes(':') || str.includes('#')) {
            return `"${str.replace(/"/g, '\\"')}"`;
          }
          return str;
        });
        result += `${spaces}${key}: [${items.join(', ')}]\n`;
      } else {
        result += `${spaces}${key}:\n`;
        for (const item of value) {
          if (typeof item === 'string') {
            result += `${spaces}  - ${item}\n`;
          } else if (typeof item === 'object' && item !== null) {
            result += `${spaces}  - ${对象转YAML(item as Record<string, unknown>, indent + 2).trim()}\n`;
          }
        }
      }
    } else if (typeof value === 'object') {
      result += `${spaces}${key}:\n${对象转YAML(value as Record<string, unknown>, indent + 1)}`;
    } else if (typeof value === 'string') {
      const escapedValue = value.replace(/"/g, '\\"').replace(/\n/g, '\\n');
      if (
        escapedValue.includes(':') ||
        escapedValue.includes('#') ||
        escapedValue.startsWith(' ') ||
        escapedValue.endsWith(' ')
      ) {
        result += `${spaces}${key}: "${escapedValue}"\n`;
      } else {
        result += `${spaces}${key}: ${escapedValue}\n`;
      }
    } else if (typeof value === 'boolean') {
      result += `${spaces}${key}: ${value}\n`;
    } else if (typeof value === 'number') {
      result += `${spaces}${key}: ${value}\n`;
    }
  }

  return result;
}

async function 添加新角色(角色数据: 角色数据) {
  const 角色内容 = 角色数据.解析后;

  if (!角色内容 || !角色内容.名称) {
    console.warn('【角色处理】角色数据为空');
    return;
  }

  const 角色名称 = String(角色内容.名称);
  const 检查结果 = await 检查角色是否已存在(角色名称);

  if (检查结果.存在) {
    let 提示信息 = `角色 "${角色名称}" 已存在于`;
    if (检查结果.类型 === '变量') {
      提示信息 += '变量中';
    } else if (检查结果.类型 === '世界书') {
      提示信息 += '世界书中';
    } else {
      提示信息 += '变量和世界书中';
    }
    提示信息 += '。是否覆盖添加？';

    打开确认弹窗(角色数据, 提示信息);
    return;
  }

  const 角色性别 = 获取角色性别(角色内容);

  添加角色到变量(角色内容, 角色性别);
  添加角色到世界书(角色内容, 角色性别);
}

function 获取角色性别(角色内容: 角色): string {
  if (角色内容.性别 === '由男变女') {
    return '由男变女';
  } else if (角色内容.性别 === '男') {
    return '男';
  }
  return '女';
}

async function 添加角色到变量(角色内容: 角色, 角色性别: string) {
  const 角色名称 = String(角色内容.名称 ?? '');

  const 变量信息: Record<string, any> = {
    [角色名称]: {
      性别: 角色性别,
      年龄: 角色内容.年龄 || 18,
      好感度: 角色内容.好感度 || 0,
      身份: 角色内容.身份 || '',
      当前位置: 角色内容.当前位置 || '',
      当前想法: 角色内容.当前想法 || '',
      当前着装: 角色内容.当前着装 || '',
      当前姿势: 角色内容.当前姿势 || '',
      身体状况: 角色内容.身体状况 || '',
      功力境界: 角色内容.功力境界 || '',
      功法: 角色内容.功法与技能 || [],
    },
  };

  if (角色性别 === '男') {
    变量信息[角色名称].最近性行为 = 角色内容.最近性行为 || '';
  } else if (角色性别 === '女' || 角色性别 === '由男变女') {
    变量信息[角色名称].谷内地位 = 角色内容.谷内地位 || '外门弟子（侍妾）';
    变量信息[角色名称].处女 = 角色内容.处女 !== undefined ? 角色内容.处女 : true;
    变量信息[角色名称].怀孕状态 = 角色内容.怀孕状态 || '';
    变量信息[角色名称].胸部状态 = 角色内容.胸部状态 || '';
    变量信息[角色名称].阴部状态 = 角色内容.阴部状态 || '';
    变量信息[角色名称].最近性行为 = 角色内容.最近性行为 || '';
    变量信息[角色名称].被内射次数 = 角色内容.被内射次数 || 0;
    变量信息[角色名称].高潮次数 = 角色内容.高潮次数 || 0;
  }

  insertOrAssignVariables({ stat_data: { 后宫: 变量信息 } }, { type: 'message' });

  console.info('【角色处理】变量添加成功:', 角色名称);
}

async function 添加角色到世界书(角色内容: 角色, 角色性别: string) {
  const 世界书名字 = getCharWorldbookNames('current').primary;

  if (!世界书名字) {
    console.warn('【角色处理】没有找到世界书');
    return;
  }

  const 世界书信息: Record<string, any> = {
    名称: 角色内容.名称 || '',
    标签: 角色内容.标签 || [],
    背景: 角色内容.背景 || {},
    外貌: 角色内容.形象外表 || {},
    性格: 角色内容.性格与表达 || {},
    能力: 角色内容.能力 || {},
  };

  if (角色性别 === '男') {
    世界书信息.NSFW信息 = 角色内容.NSFW信息 || {};
  } else if (角色性别 === '女') {
    世界书信息.NSFW信息 = 角色内容.NSFW信息 || {};
  } else if (角色性别 === '由男变女') {
    世界书信息.NSFW信息 = 角色内容.NSFW信息 || {};
    世界书信息.性别转换状态 = 角色内容.性别转换状态 || {};
  }

  const yamlString = 对象转YAML(世界书信息);

  const 新条目内容 = {
    name: '[mvu_plot]' + 世界书信息.名称,
    content: yamlString,
    keys: 角色内容.关键词 || [],
    context: '',
    enabled: true,
    strategy: {
      type: 'selective' as const,
      keys: 角色内容.关键词 || [],
    },
    position: {
      type: 'before_character_definition' as const,
    },
    probability: 100,
  };

  await createWorldbookEntries(世界书名字, [新条目内容]);

  console.info('【角色处理】世界书添加成功:', 角色内容.名称);
}

async function 检查角色是否已存在(角色名称: string): Promise<{ 存在: boolean; 类型: '变量' | '世界书' | '两者' }> {
  const 世界书名字 = getCharWorldbookNames('current').primary;

  let 变量存在 = false;
  let 世界书存在 = false;

  await updateVariablesWith(
    variables => {
      const 角色变量 = _.get(variables, `stat_data.后宫.${角色名称}`);
      if (角色变量) {
        变量存在 = true;
      }
      return variables;
    },
    { type: 'message' },
  );

  if (世界书名字) {
    const 世界书 = await getWorldbook(世界书名字);
    const 角色条目 = 世界书.find((entry: any) => entry.name === `[mvu_plot]${角色名称}`);
    if (角色条目) {
      世界书存在 = true;
    }
  }

  if (变量存在 && 世界书存在) {
    return { 存在: true, 类型: '两者' };
  } else if (变量存在) {
    return { 存在: true, 类型: '变量' };
  } else if (世界书存在) {
    return { 存在: true, 类型: '世界书' };
  }

  return { 存在: false, 类型: '变量' };
}

async function 覆盖角色变量(角色内容: 角色, 角色性别: string) {
  const 角色名称 = String(角色内容.名称 ?? '');

  const 变量信息: Record<string, any> = {
    [角色名称]: {
      性别: 角色性别,
      年龄: 角色内容.年龄 || 18,
      好感度: 角色内容.好感度 || 0,
      身份: 角色内容.身份 || '',
      当前位置: 角色内容.当前位置 || '',
      当前想法: 角色内容.当前想法 || '',
      当前着装: 角色内容.当前着装 || '',
      当前姿势: 角色内容.当前姿势 || '',
      身体状况: 角色内容.身体状况 || '',
      功力境界: 角色内容.功力境界 || '',
      功法: 角色内容.功法与技能 || [],
    },
  };

  if (角色性别 === '男') {
    变量信息[角色名称].最近性行为 = 角色内容.最近性行为 || '';
  } else if (角色性别 === '女' || 角色性别 === '由男变女') {
    变量信息[角色名称].谷内地位 = 角色内容.谷内地位 || '外门弟子（侍妾）';
    变量信息[角色名称].处女 = 角色内容.处女 !== undefined ? 角色内容.处女 : true;
    变量信息[角色名称].怀孕状态 = 角色内容.怀孕状态 || '';
    变量信息[角色名称].胸部状态 = 角色内容.胸部状态 || '';
    变量信息[角色名称].阴部状态 = 角色内容.阴部状态 || '';
    变量信息[角色名称].最近性行为 = 角色内容.最近性行为 || '';
    变量信息[角色名称].被内射次数 = 角色内容.被内射次数 || 0;
    变量信息[角色名称].高潮次数 = 角色内容.高潮次数 || 0;
  }

  insertOrAssignVariables({ stat_data: { 后宫: 变量信息 } }, { type: 'message' });

  console.info('【角色处理】变量覆盖成功:', 角色名称);
}

async function 覆盖角色世界书(角色内容: 角色, 角色性别: string) {
  const 世界书名字 = getCharWorldbookNames('current').primary;

  if (!世界书名字) {
    console.warn('【角色处理】没有找到世界书');
    return;
  }

  const 世界书信息: Record<string, any> = {
    名称: 角色内容.名称 || '',
    标签: 角色内容.标签 || [],
    背景: 角色内容.背景 || {},
    外貌: 角色内容.形象外表 || {},
    性格: 角色内容.性格与表达 || {},
    能力: 角色内容.能力 || {},
  };

  if (角色性别 === '男') {
    世界书信息.NSFW信息 = 角色内容.NSFW信息 || {};
  } else if (角色性别 === '女') {
    世界书信息.NSFW信息 = 角色内容.NSFW信息 || {};
  } else if (角色性别 === '由男变女') {
    世界书信息.NSFW信息 = 角色内容.NSFW信息 || {};
    世界书信息.性别转换状态 = 角色内容.性别转换状态 || {};
  }

  const yamlString = 对象转YAML(世界书信息);

  const 新条目内容 = {
    name: '[mvu_plot]' + 世界书信息.名称,
    content: yamlString,
    keys: 角色内容.关键词 || [],
    context: '',
    enabled: true,
    strategy: {
      type: 'selective' as const,
      keys: 角色内容.关键词 || [],
      keys_secondary: { logic: 'and_any' as const, keys: [] },
      scan_depth: 'same_as_global' as const,
    },
    position: {
      type: 'after_character_definition' as const,
      role: 'system' as const,
      depth: 0,
      order: 0,
    },
    probability: 100,
    recursion: {
      prevent_incoming: false,
      prevent_outgoing: false,
      delay_until: null,
    },
    effect: {
      sticky: null,
      cooldown: null,
      delay: null,
    },
  };

  const 当前世界书 = await getWorldbook(世界书名字);
  const 更新后的世界书 = 当前世界书.map((entry: any) => {
    if (entry.name === `[mvu_plot]${角色内容.名称}`) {
      return 新条目内容;
    }
    return entry;
  });

  await replaceWorldbook(世界书名字, 更新后的世界书);

  console.info('【角色处理】世界书覆盖成功:', 角色内容.名称);
}

function 显示新角色信息() {
  const currentMessageId = getCurrentMessageId();
  const messages = getChatMessages(currentMessageId);

  if (messages.length === 0) {
    console.info('【角色处理】没有找到消息');
    角色列表.value = [];
    return;
  }

  const latestMessage = messages[0];
  const extractedCharacters = 提取角色信息(latestMessage.message, latestMessage.message_id);

  console.info('【角色处理】提取到的角色:', extractedCharacters);
  角色列表.value = extractedCharacters;
}

function 提取角色信息(message: string, message_id?: number): 角色数据[] {
  const getNewCharacterRegex = /<newWorldCharacter>([\s\S]*?)<\/newWorldCharacter>/g;
  const matches = message.match(getNewCharacterRegex);

  if (!matches || matches.length === 0) {
    return [];
  }

  const 解析的角色列表: 角色数据[] = [];

  for (const match of matches) {
    const content = match.replace(/<\/?newWorldCharacter>/g, '').trim();
    let 解析后: 角色 | undefined;

    try {
      try {
        解析后 = YAML.parse(content);
      } catch (yamlErr) {
        const jsonContent = content.replace(/：/g, ':').replace(/"/g, '"').replace(/'/g, "'");
        解析后 = JSON.parse(jsonContent);
      }

      console.info(
        '【角色处理】解析成功，角色名称:',
        解析后?.名称,
        '年龄:',
        解析后?.年龄,
        '功力境界:',
        解析后?.功力境界,
      );
    } catch (e) {
      console.error('【角色处理】解析错误:', (e as Error).message);
      console.error('【角色处理】原始内容', content);
    }

    解析的角色列表.push({
      解析后: 解析后,
      message_id: message_id,
    });
  }

  return 解析的角色列表;
}
</script>

<style lang="scss" scoped>
.setting-section {
  margin-bottom: 0.5rem;
  details {
    transition: all 0.5s ease;
  }

  summary {
    cursor: pointer;
    padding: 0.5rem;
    background: linear-gradient(135deg, rgba(43, 29, 14, 0.6) 0%, rgba(62, 42, 20, 0.4) 100%);
    border-radius: 0.4rem;
    color: var(--user-color-primary, #d4b16a);
    font-family: var(--font-title, 'ZCOOL XiaoWei', serif);
    font-size: 0.9rem;
    letter-spacing: 1px;
    transition: all 0.5s ease;
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::-webkit-details-marker {
      display: none;
    }

    &::before {
      content: '▶';
      font-size: 0.7rem;
      transition: transform 0.5s ease;
      color: var(--user-color-primary, #d4b16a);
    }

    &:hover {
      background: linear-gradient(135deg, rgba(43, 29, 14, 0.8) 0%, rgba(62, 42, 20, 0.6) 100%);
    }
  }

  &[open] summary::before {
    transform: rotate(90deg);
  }

  &[open] > summary {
    border-radius: 0.4rem 0.4rem 0 0;
    border-bottom: 1px solid rgba(165, 113, 58, 0.3);
  }

  .setting-content {
    padding: 0.75rem;
    background: rgba(43, 29, 14, 0.4);
    border-radius: 0 0 0.4rem 0.4rem;
    opacity: 0;
    transform: translateY(-10px);
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  }
}

.setting-section[open] .setting-content {
  opacity: 1;
  transform: translateY(0);
}

.character-list-section {
  margin-top: 0.5rem;
}

.character-forms {
  overflow-y: auto;
  padding-right: 0.25rem;

  &::-webkit-scrollbar {
    width: 0.3rem;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 0.15rem;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(165, 113, 58, 0.5);
    border-radius: 0.15rem;
  }
}

.character-form {
  background: rgba(43, 29, 14, 0.2);
  border: 1px solid rgba(165, 113, 58, 0.2);
  border-radius: 0.4rem;
  padding: 0.6rem;
  margin-bottom: 0.5rem;
  transition: all 0.5s ease;
  overflow: hidden;

  &:last-child {
    margin-bottom: 0;
  }
}

.form-header {
  margin-bottom: 0.5rem;

  > summary {
    cursor: pointer;
    padding: 0.5rem;
    background: linear-gradient(135deg, rgba(43, 29, 14, 0.6) 0%, rgba(62, 42, 20, 0.4) 100%);
    border-radius: 0.4rem;
    color: var(--user-color-primary, #d4b16a);
    font-family: var(--font-title, 'ZCOOL XiaoWei', serif);
    font-size: 0.9rem;
    letter-spacing: 1px;
    transition: all 0.5s ease;
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::-webkit-details-marker {
      display: none;
    }

    &::before {
      content: '▶';
      font-size: 0.7rem;
      transition: transform 0.5s ease;
      color: var(--user-color-primary, #d4b16a);
    }

    &:hover {
      background: linear-gradient(135deg, rgba(43, 29, 14, 0.8) 0%, rgba(62, 42, 20, 0.6) 100%);
    }
  }

  &[open] > summary::before {
    transform: rotate(90deg);
  }
}

.form-body {
  padding-top: 0.5rem;
}

.form-section-title {
  font-size: 0.75rem;
  color: var(--user-color-primary, #d4b16a);
  font-family: var(--font-title, 'ZCOOL XiaoWei', serif);
  margin: 0.75rem 0 0.5rem 0;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid rgba(165, 113, 58, 0.3);

  &:first-of-type {
    margin-top: 0;
  }
}

.form-title {
  font-family: var(--font-title, 'ZCOOL XiaoWei', serif);
  font-size: 0.9rem;
  color: var(--user-color-primary, #d4b16a);
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.35rem;
  font-size: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }

  label {
    color: var(--text-secondary, #b8a98f);
    min-width: 3.5rem;
  }

  input,
  select {
    flex: 1;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(165, 113, 58, 0.3);
    border-radius: 0.25rem;
    padding: 0.25rem 0.4rem;
    font-size: 0.75rem;
    color: var(--text-primary, #f0e6d3);
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: rgba(212, 177, 106, 0.8);
    }
  }

  input[type='number'] {
    max-width: 5rem;
  }
}

.action-btn {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, rgba(212, 177, 106, 0.2) 0%, rgba(212, 177, 106, 0.1) 100%);
  border: 1px solid rgba(212, 177, 106, 0.5);
  border-radius: 0.4rem;
  color: var(--text-primary, #f0e6d3);
  font-family: var(--font-serif, 'Noto Serif SC', serif);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, rgba(212, 177, 106, 0.3) 0%, rgba(212, 177, 106, 0.2) 100%);
    border-color: rgba(212, 177, 106, 0.8);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
}

.no-data {
  color: var(--text-secondary, #b8a98f);
  font-size: 0.8rem;
  text-align: center;
  padding: 1rem;
}

.modal-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;

  &.active {
    display: flex;
  }
}

.modal-content {
  background: linear-gradient(135deg, rgba(43, 29, 14, 0.98) 0%, rgba(62, 42, 20, 0.95) 100%);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  width: 90%;
  max-width: 400px;
  padding: 0;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(212, 177, 106, 0.1);
  animation: slideIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-color);
  background: linear-gradient(90deg, rgba(212, 177, 106, 0.1) 0%, transparent 100%);

  h3 {
    margin: 0;
    font-family: var(--font-title);
    font-size: 1.1rem;
    color: var(--text-title);
    letter-spacing: 2px;
  }
}

.modal-close {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 107, 107, 0.2);
    color: #ff6b6b;
  }
}

.modal-body {
  padding: 1rem;

  p {
    margin: 0;
    color: var(--text-primary);
    line-height: 1.5;
  }
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--border-color);
  background: linear-gradient(90deg, rgba(212, 177, 106, 0.05) 0%, transparent 100%);
}

.modal-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  background: transparent;
  color: var(--text-primary);

  &:hover {
    background: rgba(212, 177, 106, 0.1);
  }
}

.cancel-btn {
  &:hover {
    background: rgba(255, 107, 107, 0.2);
    color: #ff6b6b;
  }
}

.confirm-btn {
  background: rgba(212, 177, 106, 0.2);
  border-color: var(--border-color);

  &:hover {
    background: rgba(212, 177, 106, 0.3);
  }
}

.info-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
  padding: 0.4rem;

  &.hidden {
    display: none;
  }
}

.info-label {
  font-size: 0.7rem;
  color: var(--text-secondary, #b8a98f);
  margin-bottom: 0.2rem;
}

.info-value {
  font-size: 0.75rem;
  color: var(--text-primary, #f0e6d3);
}

.form-section {
  margin-top: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(165, 113, 58, 0.3);
}

.martial-arts-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.martial-art-item {
  background: rgba(165, 113, 58, 0.2);
  border: 1px solid rgba(165, 113, 58, 0.3);
  border-radius: 0.25rem;
  padding: 0.2rem 0.4rem;
  font-size: 0.7rem;
  color: var(--text-primary, #f0e6d3);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-text {
  flex: 1;
  word-break: break-all;
  background: transparent;
  border: none;
  color: var(--text-primary, #f0e6d3);
  font-size: inherit;
  font-family: inherit;
  resize: none;
  padding: 0;
  min-height: 1.2em;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: rgba(184, 169, 143, 0.5);
  }
}

.delete-icon {
  color: rgba(255, 100, 100, 0.7);
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 0.8rem;
  transition: color 0.2s;

  &:hover {
    color: rgba(255, 80, 80, 1);
  }
}

.add-icon {
  color: rgba(100, 200, 100, 0.7);
  cursor: pointer;
  margin-left: 0.5rem;
  font-size: 0.8rem;
  transition: color 0.2s;

  &:hover {
    color: rgba(100, 200, 100, 1);
  }
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-top: 1px solid rgba(165, 113, 58, 0.3);
  margin-top: 0.5rem;
}

.action-left {
  display: flex;
  gap: 0.5rem;
}

.action-right {
  display: flex;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.6rem;
  border: 1px solid rgba(165, 113, 58, 0.5);
  border-radius: 0.25rem;
  background: rgba(165, 113, 58, 0.2);
  color: var(--text-primary, #f0e6d3);
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(165, 113, 58, 0.4);
  }
}

.save-btn {
  &:hover {
    background: rgba(100, 150, 255, 0.3);
    border-color: rgba(100, 150, 255, 0.5);
  }
}

.add-btn {
  background: rgba(100, 200, 100, 0.2);
  border-color: rgba(100, 200, 100, 0.5);

  &:hover {
    background: rgba(100, 200, 100, 0.4);
  }
}

.value-input {
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(165, 113, 58, 0.3);
  border-radius: 0.25rem;
  padding: 0.25rem 0.4rem;
  font-size: 0.75rem;
  color: var(--text-primary, #f0e6d3);
  font-family: inherit;
  resize: none;

  &:focus {
    outline: none;
    border-color: rgba(212, 177, 106, 0.8);
  }

  &::placeholder {
    color: rgba(184, 169, 143, 0.5);
  }
}

.value-textarea {
  min-height: 3rem;
}

.full-width {
  grid-column: 1 / -1;
}
</style>
