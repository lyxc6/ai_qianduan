import { registerMvuSchema } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';
import { Schema } from '../../schema';

$(async () => {
  registerMvuSchema(Schema);

  // 固定锁定：外貌信息/身材信息仅创建时写入，之后 AI 的任何更新都还原为旧值
  await waitGlobalInitialized('Mvu');
  eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, (new_variables, old_variables) => {
    const new_harem = _.get(new_variables, 'stat_data.后宫', {});
    const old_harem = _.get(old_variables, 'stat_data.后宫', {});
    Object.keys(new_harem).forEach(name => {
      if (_.has(old_harem, [name, '外貌信息'])) {
        _.set(new_harem[name], '外貌信息', _.get(old_harem, [name, '外貌信息']));
      }
      if (_.has(old_harem, [name, '身材信息'])) {
        _.set(new_harem[name], '身材信息', _.get(old_harem, [name, '身材信息']));
      }
    });
  });

  // 运行时兜底：变量 schema 在聊天初始化时一次性派生并固化，已初始化的旧聊天不会再重新推导，
  // 旧 schema 中动态容器是封闭的，会导致 insert 新成员/新地域/新资源/追加事件报"不可扩展"。
  // 本体在应用命令前触发 VARIABLE_UPDATE_STARTED 且校验用的是 variables.schema 的活引用，
  // 因此在这里把动态容器标记为可扩展，本次更新即放行，并随更新结果持久化到后续楼层。
  eventOn(Mvu.events.VARIABLE_UPDATE_STARTED, variables => {
    const schema = _.get(variables, 'schema');
    // mvu_zod 生效时 schema 为占位串，本体不再做扩展性校验，无需修补
    if (!_.isPlainObject(schema)) return;
    const 动态容器: [string[], 'object' | 'array'][] = [
      [['properties', '后宫'], 'object'],
      [['properties', '事件'], 'array'],
      [['properties', '世界', 'properties', '已游历地域'], 'object'],
      [['properties', '世界', 'properties', '家族资源'], 'object'],
    ];
    动态容器.forEach(([路径, 类型]) => {
      const 节点 = _.get(schema, 路径);
      if (节点?.type === 类型 && 节点.extensible !== true) 节点.extensible = true;
    });
  });
});
