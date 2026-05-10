<template>
  <div class="map-container">
    <div class="building-list">
      <template v-for="region in regions" :key="region.name">
        <div class="region-header">{{ region.name }}</div>
        <div
          v-for="building in region.buildings"
          :key="building.名称"
          class="building-item"
          :class="getTypeClass(building.类型)"
          @click="handleBuildingClick(building)"
        >
          <div class="building-name">{{ building.名称 }}</div>
          <div class="building-desc">{{ building.描述 }}</div>
        </div>
      </template>
    </div>

    <div class="fab-btn" @click="openAddForm">
      <i class="fa-solid fa-plus"></i>
    </div>

    <div v-if="showAddForm" class="modal-overlay" @click.self="showAddForm = false">
      <div class="modal-content">
        <div class="modal-header">
          <span>{{ isEditing ? '编辑建筑' : '添加建筑' }}</span>
          <span class="close-btn" @click="showAddForm = false">&times;</span>
        </div>
        <div class="form-group">
          <label>建筑名称</label>
          <input v-model="newBuilding.名称" type="text" placeholder="请输入建筑名称" :disabled="isEditing" />
        </div>
        <div class="form-group">
          <label>区域</label>
          <select v-model="newBuilding.区域">
            <option value="">请选择区域</option>
            <option v-for="region in regions" :key="region.name" :value="region.name">
              {{ region.name }}
            </option>
            <option value="主角区域">⭐ 主角区域</option>
          </select>
        </div>
        <div class="form-group">
          <label>类型</label>
          <select v-model="newBuilding.类型">
            <option value="">请选择类型</option>
            <option value="dorm">住宿区 (dorm)</option>
            <option value="nature">景观区 (nature)</option>
            <option value="sports">运动区 (sports)</option>
            <option value="learning">教学区 (learning)</option>
            <option value="food">生活区 (food)</option>
            <option value="other">其他 (other)</option>
          </select>
        </div>
        <div class="form-group">
          <label>大小</label>
          <select v-model="newBuilding.大小">
            <option value="">请选择大小</option>
            <option value="巨型">巨型</option>
            <option value="大型">大型</option>
            <option value="中型">中型</option>
            <option value="迷你">迷你</option>
          </select>
        </div>
        <div class="form-group">
          <label>描述</label>
          <textarea v-model="newBuilding.描述" placeholder="请输入建筑描述" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label>详细描述</label>
          <div class="detail-items">
            <div v-for="(item, index) in detailItems" :key="index" class="detail-item">
              <input v-model="detailItems[index]" type="text" placeholder="请输入详细描述" />
              <button type="button" class="btn-remove" @click="removeDetailItem(index)" v-if="detailItems.length > 1">
                <i class="fa-solid fa-times"></i>
              </button>
            </div>
            <button type="button" class="btn-add-detail" @click="addDetailItem">
              <i class="fa-solid fa-plus"></i> 添加详细描述
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button v-if="isEditing" class="btn-delete" @click="handleDeleteBuilding">删除</button>
          <button class="btn-cancel" @click="showAddForm = false">取消</button>
          <button class="btn-confirm" @click="isEditing ? handleSaveEdit() : handleAddBuilding()">
            {{ isEditing ? '保存修改' : '确认添加' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Building {
  名称?: string;
  类型?: string;
  大小?: string;
  描述?: string;
  详细?: string;
  区域?: string;
}

interface Region {
  name: string;
  buildings: Building[];
}

interface Props {
  worldbookName?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  send: [text: string];
}>();

const regions = ref<Region[]>([]);
const showAddForm = ref(false);
const isEditing = ref(false);
const editingRegionName = ref('');
const detailItems = ref<string[]>(['']);
const newBuilding = ref<Building>({
  名称: '',
  类型: '',
  大小: '',
  描述: '',
  详细: '',
  区域: '',
});

function addDetailItem() {
  detailItems.value.push('');
}

function removeDetailItem(index: number) {
  detailItems.value.splice(index, 1);
}

function getTypeClass(type?: string): string {
  const typeMap: Record<string, string> = {
    dorm: 'type-dorm',
    nature: 'type-nature',
    sports: 'type-sports',
    learning: 'type-learning',
    food: 'type-food',
    other: 'type-other',
  };
  return typeMap[type || ''] || 'type-default';
}

async function loadBuildingsFromWorldbook() {
  if (!props.worldbookName) {
    console.warn('没有世界书名称');
    return;
  }

  try {
    const worldbook = await getWorldbook(props.worldbookName);
    const buildingData = worldbook.find(entry => entry.name === '地图');
    if (buildingData && buildingData.content) {
      const parsed = YAML.parse(buildingData.content);
      if (parsed) {
        const regionList: Region[] = Object.entries(parsed)
          .filter(([regionName]) => regionName && regionName.trim() !== '')
          .map(([regionName, regionData]: [string, any]) => ({
            name: regionName,
            buildings: Object.entries(regionData || {}).map(([name, building]: [string, any]) => ({
              名称: name,
              类型: building?.类型,
              大小: building?.大小,
              描述: building?.描述,
              详细: building?.详细,
            })),
          }));
        regions.value = regionList;
      }
    }
  } catch (e) {
    console.error('加载世界书失败:', e);
  }
}

function handleBuildingClick(building: Building) {
  const region = regions.value.find(r => r.buildings.some(b => b.名称 === building.名称));

  newBuilding.value = {
    名称: building.名称 || '',
    类型: building.类型 || '',
    大小: building.大小 || '',
    描述: building.描述 || '',
    详细: building.详细 || '',
    区域: region?.name || '',
  };

  detailItems.value = building.详细 && Array.isArray(building.详细) ? [...building.详细] : [''];

  editingRegionName.value = region?.name || '';
  isEditing.value = true;
  showAddForm.value = true;
}

function openAddForm() {
  isEditing.value = false;
  editingRegionName.value = '';
  newBuilding.value = {
    名称: '',
    类型: '',
    大小: '',
    描述: '',
    详细: '',
    区域: '',
  };
  detailItems.value = [''];
  showAddForm.value = true;
}

function handleSaveEdit() {
  if (!newBuilding.value.名称 || !newBuilding.value.区域 || !newBuilding.value.类型) {
    toastr.warning('请填写建筑名称、区域和类型', '提示');
    return;
  }

  if (!props.worldbookName) {
    toastr.warning('没有世界书名称', '提示');
    return;
  }

  const validDetails = detailItems.value.filter(item => item.trim() !== '');

  const newRegionData: any = {};
  newRegionData[newBuilding.value.名称 as string] = {
    类型: newBuilding.value.类型,
    大小: newBuilding.value.大小 || '中型',
    描述: newBuilding.value.描述 || '',
    详细: validDetails.length > 0 ? validDetails : ['(暂无详细描述)'],
  };

  const newRegionName = newBuilding.value.区域 as string;

  updateWorldbookWith(
    props.worldbookName,
    worldbook => {
      const mapEntry = worldbook.find(entry => entry.name === '地图');
      if (mapEntry) {
        let parsed: any = {};
        if (mapEntry.content) {
          try {
            parsed = YAML.parse(mapEntry.content) || {};
          } catch (e) {
            console.warn('解析现有YAML失败，使用空对象', e);
          }
        }

        if (editingRegionName.value && editingRegionName.value !== newRegionName) {
          const oldRegion = editingRegionName.value as string;
          const buildingName = newBuilding.value.名称 as string;
          if (parsed[oldRegion] && parsed[oldRegion][buildingName]) {
            delete parsed[oldRegion][buildingName];
          }
        }

        if (!parsed[newRegionName]) {
          parsed[newRegionName] = {};
        }
        parsed[newRegionName] = { ...parsed[newRegionName], ...newRegionData };

        mapEntry.content = YAML.stringify(parsed);
      }
      return worldbook;
    },
    { render: 'immediate' },
  )
    .then(() => {
      toastr.success(`建筑 "${newBuilding.value.名称}" 已修改`, '成功');
      showAddForm.value = false;
      loadBuildingsFromWorldbook();
    })
    .catch(err => {
      console.error('修改建筑失败:', err);
      toastr.error('修改建筑失败: ' + err, '错误');
    });
}

function handleDeleteBuilding() {
  if (!newBuilding.value.名称 || !newBuilding.value.区域) {
    toastr.warning('建筑信息不完整', '提示');
    return;
  }

  if (!props.worldbookName) {
    toastr.warning('没有世界书名称', '提示');
    return;
  }

  if (!confirm(`确定要删除建筑 "${newBuilding.value.名称}" 吗？`)) {
    return;
  }

  const buildingName = newBuilding.value.名称 as string;
  const regionName = newBuilding.value.区域 as string;

  updateWorldbookWith(
    props.worldbookName,
    worldbook => {
      const mapEntry = worldbook.find(entry => entry.name === '地图');
      if (mapEntry && mapEntry.content) {
        try {
          const parsed: any = YAML.parse(mapEntry.content) || {};
          if (parsed[regionName] && parsed[regionName][buildingName]) {
            delete parsed[regionName][buildingName];
            mapEntry.content = YAML.stringify(parsed);
          }
        } catch (e) {
          console.error('删除建筑解析失败:', e);
        }
      }
      return worldbook;
    },
    { render: 'immediate' },
  )
    .then(() => {
      toastr.success(`建筑 "${newBuilding.value.名称}" 已删除`, '成功');
      showAddForm.value = false;
      loadBuildingsFromWorldbook();
    })
    .catch(err => {
      console.error('删除建筑失败:', err);
      toastr.error('删除建筑失败: ' + err, '错误');
    });
}

function handleAddBuilding() {
  if (!newBuilding.value.名称 || !newBuilding.value.区域 || !newBuilding.value.类型) {
    toastr.warning('请填写建筑名称、区域和类型', '提示');
    return;
  }

  if (!props.worldbookName) {
    toastr.warning('没有世界书名称', '提示');
    return;
  }

  const validDetails = detailItems.value.filter(item => item.trim() !== '');

  const newRegionData: any = {};
  newRegionData[newBuilding.value.名称 as string] = {
    类型: newBuilding.value.类型,
    大小: newBuilding.value.大小 || '中型',
    描述: newBuilding.value.描述 || '',
    详细: validDetails.length > 0 ? validDetails : ['(暂无详细描述)'],
  };

  const regionName = newBuilding.value.区域 as string;

  updateWorldbookWith(
    props.worldbookName,
    worldbook => {
      const mapEntry = worldbook.find(entry => entry.name === '地图');
      if (mapEntry) {
        let parsed: any = {};
        if (mapEntry.content) {
          try {
            parsed = YAML.parse(mapEntry.content) || {};
          } catch (e) {
            console.warn('解析现有YAML失败，使用空对象', e);
          }
        }

        if (!parsed[regionName]) {
          parsed[regionName] = {};
        }
        parsed[regionName] = { ...parsed[regionName], ...newRegionData };

        mapEntry.content = YAML.stringify(parsed);
      }
      return worldbook;
    },
    { render: 'immediate' },
  )
    .then(() => {
      toastr.success(`建筑 "${newBuilding.value.名称}" 已添加到地图`, '成功');
      showAddForm.value = false;
      loadBuildingsFromWorldbook();
    })
    .catch(err => {
      console.error('添加建筑失败:', err);
      toastr.error('添加建筑失败: ' + err, '错误');
    });

  newBuilding.value = {
    名称: '',
    类型: '',
    大小: '',
    描述: '',
    详细: '',
    区域: '',
  };
  detailItems.value = [''];
}

onMounted(async () => {
  await loadBuildingsFromWorldbook();
});
</script>

<style lang="scss">
.map-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.25rem;
  overflow-y: auto;
  position: relative;
}

.fab-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--user-color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  i {
    font-size: 1.2rem;
  }
}

.building-list {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.region-header {
  font-family: var(--font-title);
  font-size: 0.8rem;
  color: var(--user-color-primary);
  padding: 0.4rem 0.5rem;
  margin-top: 0.5rem;
  border-bottom: 1px solid var(--border-color);
  background: rgba(255, 138, 128, 0.08);
  border-radius: 0.3rem;

  &:first-child {
    margin-top: 0;
  }
}

.building-item {
  padding: 0.5rem;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 3px solid;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &.type-dorm {
    background: rgba(186, 104, 200, 0.1);
    border-left-color: #ba68c8;
  }

  &.type-nature {
    background: rgba(77, 182, 172, 0.1);
    border-left-color: #4db6ac;
  }

  &.type-sports {
    background: rgba(129, 199, 132, 0.1);
    border-left-color: #81c784;
  }

  &.type-learning {
    background: rgba(100, 181, 246, 0.1);
    border-left-color: #64b5f6;
  }

  &.type-food {
    background: rgba(255, 183, 77, 0.1);
    border-left-color: #ffb74d;
  }

  &.type-default {
    background: rgba(255, 138, 128, 0.1);
    border-left-color: #ff8a80;
  }

  &.type-other {
    background: rgba(158, 158, 158, 0.1);
    border-left-color: #9e9e9e;
  }
}

.building-name {
  font-family: var(--font-title);
  font-size: 0.8rem;
  color: var(--text-primary);
  margin-bottom: 0.2rem;
}

.building-desc {
  font-size: 0.65rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--bg-panel, white);
  border-radius: 0.5rem;
  padding: 1rem;
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-family: var(--font-title);
  font-size: 0.9rem;
  color: var(--text-primary);
}

.close-btn {
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--text-secondary);

  &:hover {
    color: var(--text-primary);
  }
}

.form-group {
  margin-bottom: 0.8rem;

  label {
    display: block;
    font-size: 0.7rem;
    color: var(--text-secondary);
    margin-bottom: 0.3rem;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 0.3rem;
    font-size: 0.75rem;
    background: var(--bg-main);
    color: var(--text-primary);

    &:focus {
      outline: none;
      border-color: var(--user-color-primary);
    }
  }

  textarea {
    resize: vertical;
  }
}

.detail-items {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.detail-item {
  display: flex;
  gap: 0.4rem;
  align-items: center;

  input {
    flex: 1;
  }

  .btn-remove {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
      background: #ff5252;
      border-color: #ff5252;
      color: white;
    }

    i {
      font-size: 0.7rem;
    }
  }
}

.btn-add-detail {
  padding: 0.3rem 0.5rem;
  border: 1px dashed var(--border-color);
  border-radius: 0.3rem;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.65rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  &:hover {
    border-color: var(--user-color-primary);
    color: var(--user-color-primary);
  }
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn-cancel,
.btn-confirm,
.btn-delete {
  padding: 0.4rem 0.8rem;
  border-radius: 0.3rem;
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);

  &:hover {
    background: var(--border-color);
  }
}

.btn-confirm {
  background: var(--user-color-primary);
  border: 1px solid var(--user-color-primary);
  color: white;

  &:hover {
    opacity: 0.9;
  }
}

.btn-delete {
  background: #ff5252;
  border: 1px solid #ff5252;
  color: white;

  &:hover {
    opacity: 0.9;
  }
}
</style>
