/**
 * 从消息内容中提取并解析所有角色信息
 * @param {string} message - 聊天消息
 * @returns {object[]} 解析后的角色对象数组
 */
function 提取角色信息(message) {
  const getNewCharacterRegex = /<newWorldCharacter>([\s\S]*?)<\/newWorldCharacter>/g;
  const matches = message.match(getNewCharacterRegex);

  if (!matches || matches.length === 0) {
    return [];
  }

  const 角色列表 = [];

  for (const match of matches) {
    const content = match.replace(/<\/?newWorldCharacter>/g, '').trim();
    try {
      let 角色;

      // 优先尝试 YAML 解析
      try {
        角色 = YAML.parse(content);
      } catch (yamlErr) {
        // YAML 解析失败，尝试 JSON.parse（兼容旧格式）
        const jsonContent = content
          .replace(/：/g, ':') // 中文冒号转英文
          .replace(/"/g, '"') // 中文引号转英文
          .replace(/'/g, "'"); // 中文单引号转英文
        角色 = JSON.parse(jsonContent);
      }

      console.log('【角色处理】解析成功，角色名称:', 角色.名称, '年龄:', 角色.年龄, '功力境界:', 角色.功力境界);
      角色列表.push(角色);
    } catch (e) {
      console.error('【角色处理】解析错误:', e.message);
      console.error('【角色处理】原始内容', content);
    }
  }

  return 角色列表;
}

/**
 * 检查角色是否已存在于世界书中
 * @param {string} 世界书名字 - 世界书名称
 * @param {string} 角色名称 - 要检查的角色名称
 * @returns {Promise<{存在: boolean, 角色条目: object|null}>}
 */
async function 检查角色是否存在(世界书名字, 角色名称) {
  try {
    const 世界书条目 = await getWorldbook(世界书名字);
    const 现有角色条目 = 世界书条目.find(entry => entry.name === 角色名称);

    if (现有角色条目) {
      console.log('【角色处理】角色已存在于世界书中:', 现有角色条目);
      return { 存在: true, 角色条目: 现有角色条目 };
    }

    console.log('【角色处理】角色不存在于世界书中，准备新增');
    return { 存在: false, 角色条目: null };
  } catch (err) {
    console.error('【角色处理】获取世界书失败:', err);
    return { 存在: false, 角色条目: null };
  }
}

/**
 * 根据性别类型构建世界书基础信息
 * @param {object} 新角色 - 角色数据对象
 * @param {string} 角色性别 - 角色性别
 * @returns {object} 世界书信息对象
 */
function 构建世界书基础信息(新角色, 角色性别) {
  const 世界书信息 = {
    名称: 新角色.名称 || '',
    标签: 新角色.标签 || [],
    背景: 新角色.背景 || {},
    外貌: 新角色.形象外表 || {},
    性格: 新角色.性格与表达 || {},
    能力: 新角色.能力 || {},
  };

  // 根据性别添加特定字段
  if (角色性别 === '男') {
    世界书信息.NSFW信息 = 新角色.NSFW信息 || {};
  } else if (角色性别 === '女') {
    世界书信息.NSFW信息 = 新角色.NSFW信息 || {};
  } else if (角色性别 === '由男变女') {
    世界书信息.NSFW信息 = 新角色.NSFW信息 || {};
    世界书信息.性别转换状态 = 新角色.性别转换状态 || {};
  }

  return 世界书信息;
}

/**
 * 根据性别类型构建变量信息
 * @param {object} 新角色 - 角色数据对象
 * @param {string} 角色性别 - 角色性别
 * @returns {object} 变量信息对象
 */
function 构建变量信息(新角色, 角色性别) {
  const 变量信息 = {
    [新角色.名称]: {
      性别: 角色性别,
      年龄: 新角色.年龄 || 18,
      好感度: 新角色.好感度 || 0,
      身份: 新角色.身份 || '',
      当前位置: 新角色.当前位置 || '',
      当前想法: 新角色.当前想法 || '',
      当前着装: 新角色.当前着装 || '',
      当前姿势: 新角色.当前姿势 || '',
      身体状况: 新角色.身体状况 || '',
      功力境界: 新角色.功力境界 || '',
      功法与技能: 新角色.功法与技能 || [],
    },
  };

  // 根据性别添加特定字段
  if (角色性别 === '男') {
    变量信息[新角色.名称].最近性行为 = 新角色.最近性行为 || '';
  } else if (角色性别 === '女') {
    变量信息[新角色.名称].后宫地位 = 新角色.后宫地位 || '外门弟子（侍妾）';
    变量信息[新角色.名称].处女 = 新角色.处女 !== undefined ? 新角色.处女 : true;
    变量信息[新角色.名称].怀孕状态 = 新角色.怀孕状态 || '';
    变量信息[新角色.名称].胸部状态 = 新角色.胸部状态 || '';
    变量信息[新角色.名称].阴部状态 = 新角色.阴部状态 || '';
    变量信息[新角色.名称].最近性行为 = 新角色.最近性行为 || '';
    变量信息[新角色.名称].被内射次数 = 新角色.被内射次数 || 0;
    变量信息[新角色.名称].高潮次数 = 新角色.高潮次数 || 0;
  } else if (角色性别 === '由男变女') {
    变量信息[新角色.名称].后宫地位 = 新角色.后宫地位 || '外门弟子（侍妾）';
    变量信息[新角色.名称].处女 = 新角色.处女 || true;
    变量信息[新角色.名称].怀孕状态 = 新角色.怀孕状态 || '';
    变量信息[新角色.名称].胸部状态 = 新角色.胸部状态 || '';
    变量信息[新角色.名称].阴部状态 = 新角色.阴部状态 || '';
    变量信息[新角色.名称].最近性行为 = 新角色.最近性行为 || '';
    变量信息[新角色.名称].被内射次数 = 新角色.被内射次数 || 0;
    变量信息[新角色.名称].高潮次数 = 新角色.高潮次数 || 0;
  }

  return 变量信息;
}

/**
 * 替换性别转换角色的世界书条目
 * 特殊处理：当性别为"由男变女"且角色已存在时，使用replaceWorldbook替换
 * @param {string} 世界书名字 - 世界书名称
 * @param {object} 世界书信息 - 世界书信息对象
 * @param {string} 角色性别 - 角色性别
 * @returns {Promise<boolean>} 是否成功替换
 */
async function 替换性别转换角色(世界书名字, 世界书信息, 角色性别) {
  if (角色性别 !== '由男变女') {
    return false;
  }

  console.log('【角色处理】执行性别转换角色替换逻辑');

  const yamlString = YAML.stringify(世界书信息);

  const 新条目内容 = {
    name: 世界书信息.名称,
    content: yamlString,
    enabled: true,
    strategy: {
      type: 'selective',
      keys: 世界书信息.关键词,
    },
    position: {
      type: 'after_character_definition',
    },
    probability: 100,
  };

  try {
    const 当前世界书 = await getWorldbook(世界书名字);
    const 更新后的世界书 = 当前世界书.map(entry => {
      if (entry.name === 世界书信息.名称) {
        return { ...entry, ...新条目内容 };
      }
      return entry;
    });

    await replaceWorldbook(世界书名字, 更新后的世界书);
    console.log('【角色处理】性别转换角色替换成功:', 世界书信息.名称);
    return true;
  } catch (err) {
    console.error('【角色处理】替换世界书失败:', err);
    return false;
  }
}

/**
 * 创建新的世界书条目
 * @param {string} 世界书名字 - 世界书名称
 * @param {object} 世界书信息 - 世界书信息对象
 * @returns {Promise<void>}
 */
async function 创建世界书条目(世界书名字, 世界书信息) {
  const yamlString = YAML.stringify(世界书信息);

  const 构建 = [
    {
      name: '[mvu_plot]' + 世界书信息.名称,
      content: yamlString,
      enabled: true,
      strategy: {
        type: 'selective',
        keys: 世界书信息.关键词,
      },
      position: {
        type: 'after_character_definition',
      },
      probability: 100,
    },
  ];

  await createWorldbookEntries(世界书名字, 构建);
}

/**
 * 处理单个角色：添加到世界书和变量
 * @param {object} 新角色 - 角色数据对象
 * @param {string} 世界书名字 - 世界书名称
 * @param {number} message_id - 消息ID，用于变量更新
 */
async function 处理单个角色(新角色, 世界书名字, message_id) {
  const 角色性别 = 新角色.性别 || '女';
  console.log('【角色处理】处理角色:', 新角色.名称, '性别:', 角色性别);

  // 检查角色是否已存在
  const { 存在: 角色已存在 } = await 检查角色是否存在(世界书名字, 新角色.名称);

  // 构建世界书基础信息
  const 世界书信息 = 构建世界书基础信息(新角色, 角色性别);

  // 处理性别转换角色的特殊替换逻辑
  if (角色性别 === '由男变女' && 角色已存在) {
    const 替换成功 = await 替换性别转换角色(世界书名字, 世界书信息, 角色性别);

    if (替换成功) {
      // 更新变量信息
      const 写入变量信息 = 构建变量信息(新角色, 角色性别);
      console.log('【角色处理】更新变量信息:', 写入变量信息);
      insertOrAssignVariables({ stat_data: { 后宫: 写入变量信息 } }, { type: 'message', message_id: message_id });
      return;
    }
  }

  // 跳过已存在的普通角色
  if (角色已存在) {
    return;
  }

  // 构建变量信息
  const 写入变量信息 = 构建变量信息(新角色, 角色性别);
  console.log('【角色处理】写入变量信息:', 写入变量信息);

  // 创建新的世界书条目
  await 创建世界书条目(世界书名字, 世界书信息);

  // 更新变量
  insertOrAssignVariables({ stat_data: { 后宫: 写入变量信息 } }, { type: 'message', message_id: message_id });
}

/**
 * 主函数：添加新角色
 * 处理流程：
 * 1. 从消息中提取所有角色信息
 * 2. 遍历每个角色并处理
 * @param {number} message_id - 消息ID，用于获取特定消息
 */
async function 添加新角色(message_id) {
  const messages = getChatMessages(message_id);

  if (messages.length === 0) {
    console.info('【角色处理】没有找到消息:', message_id);
    return;
  }

  const message = messages[0];

  // 步骤1：提取所有角色JSON
  const 角色列表 = 提取角色信息(message.message);
  console.log('【角色处理】提取到的角色列表:', 角色列表);
  if (角色列表.length === 0) {
    console.info('【角色处理】没有找到新的角色信息');
    return;
  }

  const 世界书名字 = getCharWorldbookNames('current').primary;
  console.log('【角色处理】世界书名字:', 世界书名字);
  console.log('【角色处理】找到', 角色列表.length, '个角色需要处理');

  // 步骤2：遍历处理每个角色
  for (const 新角色 of 角色列表) {
    await 处理单个角色(新角色, 世界书名字, message_id);
  }
}

// 监听消息接收和更新事件，当收到新消息或消息被修改时执行
eventOn(tavern_events.MESSAGE_RECEIVED, message_id => {
  console.log('【角色处理】收到新消息:', message_id);
  添加新角色(message_id);
});

eventOn(tavern_events.MESSAGE_UPDATED, message_id => {
  console.log('【角色处理】消息被更新:', message_id);
  添加新角色(message_id);
});
