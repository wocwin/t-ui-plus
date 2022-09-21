<template>
  <el-dropdown trigger="click">
    <el-button icon="Setting" size="default">列设置</el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <span class="title">列设置</span>
          <Draggable class="t_table_column_setting_dropdown" :force-fallback="true" animation="300"
            v-model="state.columnSet" item-key="prop">
            <template #item>
              <el-checkbox v-for="(col, index) in state.columnSet" :key="index" @click.native.stop
                :checked="!col.hidden" :disabled="col.checkBoxDisabled"
                @change="checked => checkChanged(checked, index)">
                {{ col.label }}
              </el-checkbox>
            </template>
          </Draggable>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts">
export default {
  name: 'ColumnSet'
}
</script>
<script setup lang="ts">
import Draggable from 'vuedraggable'
import { ref, watch, computed, reactive } from 'vue'
const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  }
})
// 初始化
const initColumnSet = () => {
  const columnSet = props.columns.map((col: any, index) => ({
    label: col.label,
    prop: col.prop,
    hidden: false,
    checkBoxDisabled: false
  }))
  return columnSet
}
// 获取缓存数据
const getColumnSetCache = () => {
  const value = localStorage.getItem(`t-ui:TTable.columnSet-${props.name || props.title}`)
  return value ? JSON.parse(value) : initColumnSet()
}
// 抛出事件
const emits = defineEmits(['columnSetting'])
// const columnSet = ref(getColumnSetCache())
const state = reactive({
  columnSet: getColumnSetCache()
})
// let columnSet = computed(() => getColumnSetCache())
console.log(777, state.columnSet)
emits('columnSetting', state.columnSet)
watch(
  () => state.columnSet,
  (val) => {
    emits('columnSetting', val)
    localStorage.setItem(`t-ui:TTable.columnSet-${props.name || props.title}`, JSON.stringify(val))
  }
  // { deep: true }
)
const checkChanged = (checked, index) => {
  state.columnSet[index] = {
    ...state.columnSet[index],
    hidden: !checked
  }
  let obj: any = {}
  state.columnSet.map(val => {
    val.hidden in obj || (obj[val.hidden] = [])
    obj[val.hidden].push(val.hidden)
  })
  if (obj.false.length < 2) {
    state.columnSet.map((val, key) => {
      if (!val.hidden) {
        state.columnSet[key] = {
          ...state.columnSet[key],
          checkBoxDisabled: true
        }
      }
    })
  } else {
    state.columnSet.map((val, key) => {
      if (!val.hidden) {
        state.columnSet[key] = {
          ...state.columnSet[key],
          checkBoxDisabled: false
        }
      }
    })
  }
}
</script>
<style lang="scss">
.el-dropdown-menu {
  padding: 15px;
  font-size: 14px;

  .el-dropdown-menu__item {
    display: flex;
    flex-direction: column;

    .title {
      font-weight: bold;
    }

    .t_table_column_setting_dropdown {
      display: flex;
      flex-direction: column;
      max-height: 300px;
      overflow-y: auto;

      .el-checkbox {
        margin: 5px 0;

        .el-checkbox__input.is-checked+.el-checkbox__label {
          color: #262626;
        }
      }
    }
  }
}
</style>
