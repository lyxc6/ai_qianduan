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
});
