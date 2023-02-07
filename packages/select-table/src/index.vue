<template>
  <el-select ref="selectRef" v-model="state.defaultValue" popper-class="t-select-table" :multiple="multiple"
    v-bind="selectAttr" :value-key="keywords.value" @visible-change="visibleChange" @remove-tag="removeTag"
    @clear="clear">
    <template #empty>
      <div class="t-table-select__table" :style="{ width: `${tableWidth}px` }">
        <el-table ref="selectTable" :data="state.tableData" class="radioStyle" border @row-click="rowClick"
          @cell-dblclick="cellDblclick" @selection-change="selectionChange" v-bind="$attrs">
          <el-table-column v-if="multiple" type="selection" width="55" fixed></el-table-column>
          <el-table-column type="radio" width="55" :label="radioTxt" fixed v-else>
            <template #default="scope">
              <el-radio v-model="state.radioVal" :label="scope.$index + 1"
                @click.native.prevent="radioChange(scope.row, scope.$index + 1)"></el-radio>
            </template>
          </el-table-column>
          <el-table-column v-for="(item, index) in columns" :key="index + 'i'" :type="item.type" :label="item.label"
            :prop="item.prop" :min-width="item['min-width'] || item.minWidth || item.width"
            :align="item.align || 'center'" :fixed="item.fixed" :show-overflow-tooltip="item.noShowTip"
            v-bind="{ ...item.bind, ...$attrs }">
            <template #default="scope">
              <!-- render方式 -->
              <template v-if="item.render">
                <render-col :column="item" :row="scope.row" :render="item.render" :index="scope.$index" />
              </template>
              <!-- 作用域插槽 -->
              <template v-if="item.slotName">
                <slot :name="item.slotName" :scope="scope"></slot>
              </template>
              <div v-if="!item.render && !item.slotName">
                <span>{{ scope.row[item.prop] }}</span>
              </div>
            </template>
          </el-table-column>
          <slot></slot>
        </el-table>
        <div class="t-table-select__page" v-if="isShowPagination">
          <el-pagination v-model:current-page="table.currentPage" v-model:page-size="table.pageSize" small background
            layout="total, prev, pager, next, jumper" :pager-count="5" :total="table.total" v-bind="$attrs" />
        </div>
      </div>
    </template>
  </el-select>
</template>
<script lang="ts">
export default {
  name: 'TSelectTable'
}
</script>
<script setup lang="ts">
import RenderCol from './renderCol.vue'
import { computed, useAttrs, ref, watch, nextTick, reactive } from 'vue'
import { ElMessage } from 'element-plus'
const props = defineProps({
  // 选择值
  value: {
    type: [String, Number, Array]
  },
  // table所需数据
  table: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 表头数据
  columns: {
    type: Array as unknown as any[],
    default: () => []
  },
  // 单选文案
  radioTxt: {
    type: String,
    default: '单选'
  },
  // 是否显示分页
  isShowPagination: {
    type: Boolean,
    default: false
  },
  // 下拉数据指向的label/value
  keywords: {
    type: Object,
    default: () => {
      return {
        label: 'label',
        value: 'value'
      }
    }
  },
  // 多选
  multiple: {
    type: Boolean,
    default: false
  },
  // table宽度
  tableWidth: {
    type: Number,
    default: 550
  }
})
const selectAttr = computed(() => {
  return {
    clearable: true,
    filterable: true,
    ...useAttrs()
  }
})
const state: any = reactive({
  radioVal: '',
  forbidden: true, // 判断单选选中及取消选中
  tableData: props.table.data, // table数据
  defaultValue: props.value,
  ids: [], // 多选id集合
  tabularMap: {} // 存储下拉tale的所有name
})
// 获取ref
const selectRef: any = ref<HTMLElement | null>(null)
const selectTable: any = ref<HTMLElement | null>(null)
watch(
  () => props.table.data,
  val => {
    // console.log(111, val)
    state.tableData = val
    state.tableData = val
    nextTick(() => {
      state.tableData && state.tableData.length > 0 && state.tableData.forEach(item => {
        state.tabularMap[item[props.keywords.value]] = item[props.keywords.label]
      })
      findLabel()
    })
  },
  { deep: true }
)
watch(
  () => props.value,
  val => {
    // console.log(111, val)
    state.tableData = val
    state.tableData = val
    nextTick(() => {
      // 多选
      if (props.multiple) {
        state.defaultValue = Array.isArray(props.value) ? props.value : typeof props.value === 'string' ? props.value.split(',') : []
        state.defaultValue = (state.defaultValue || []).map(item => {
          return item
        })
      } else {
        state.defaultValue = props.value ? { [props.keywords.value]: props.value } : ''
      }
      findLabel()
    })
  },
  { deep: true }
)
// 赋值
const findLabel = () => {
  nextTick(() => {
    if (props.multiple) {
      // if (selectRef.value) {
      selectRef.value.selected?.forEach((item) => {
        item.currentLabel = item.value
        // this.tableData.map(val => {
        //   if (val[this.keywords.label] === item.value) {
        //     item.value = val[this.keywords.value]
        //   }
        // })
      })
      // }
    } else {
      // if (selectRef.value) {
      selectRef.value.selectedLabel = state.defaultValue[props.keywords.label] || ''
      // }
    }
  })
}
// 抛出事件
const emits = defineEmits(['page-change', 'selectionChange', 'radioChange'])
// 当前页码
const handlesCurrentChange = (val) => {
  emits('page-change', val)
}
// 复选框(多选)
const selectionChange = (val) => {
  // console.log('复选框', val)
  state.defaultValue = val.map(item => item[props.keywords.label])
  state.ids = val.map(item => item[props.keywords.value])
  emits('selectionChange', val, state.ids)
}
// 表格显示隐藏回调
const visibleChange = (visible) => {
  // console.log('表格显示隐藏回调', visible)
  if (visible) {
    initTableData()
  } else {
    findLabel()
  }
}
// 获取表格数据
const initTableData = () => {
  // 表格默认赋值
  nextTick(() => {
    if (props.multiple) {
      state.defaultValue.forEach(row => {
        const arr = state.tableData.filter(item => item[props.keywords.value] === row[props.keywords.value])
        if (arr.length > 0) {
          selectTable.value.toggleRowSelection(arr[0], true)
        }
      })
    } else {
      const arr = state.tableData.filter(item => item[props.keywords.value] === state.defaultValue && state.defaultValue[props.keywords.value])
      selectTable.value.setCurrentRow(arr[0])
    }
  })
}
// 复制内容
const copyDomText = val => {
  // 获取需要复制的元素以及元素内的文本内容
  const text = val
  // 添加一个input元素放置需要的文本内容
  const input = document.createElement('input')
  input.value = text
  document.body.appendChild(input)
  // 选中并复制文本到剪切板
  input.select()
  document.execCommand('copy')
  // 移除input元素
  document.body.removeChild(input)
}
// 双击复制单元格内容
const cellDblclick = (row, column) => {
  try {
    copyDomText(row[column.property])
    ElMessage.success('复制成功')
  } catch (e) {
    ElMessage.error('复制失败')
  }
}
// 点击单选框单元格触发事件
const radioChange = (row, index) => {
  radioClick(row, index)
}
// forbidden取值
const isForbidden = () => {
  state.forbidden = false
  setTimeout(() => {
    state.forbidden = true
  }, 0)
}
// 单选抛出事件radioChange
const radioClick = (row, index) => {
  state.forbidden = !!state.forbidden
  if (state.radioVal) {
    if (state.radioVal === index) {
      state.radioVal = ''
      isForbidden()
      state.defaultValue = {}
      emits('radioChange', {}, null) // 取消勾选就把回传数据清除
      blur()
    } else {
      isForbidden()
      state.radioVal = index
      state.defaultValue = row
      emits('radioChange', row, row[props.keywords.value])
      blur()
    }
  } else {
    isForbidden()
    state.radioVal = index
    state.defaultValue = row
    emits('radioChange', row, row[props.keywords.value])
    blur()
  }
}
// 单击行
const rowClick = (row) => {
  if (props.multiple) {

  } else {
    radioClick(row, state.tableData.indexOf(row) + 1)
  }
}
// tags删除后回调
const removeTag = (tag) => {
  const row = state.tableData.find(item => item[props.keywords.label] === tag)
  selectTable.value.toggleRowSelection(row, false)
}
// 清空后的回调
const clear = () => {
  if (props.multiple) {
    selectTable.value.clearSelection()
  } else {
    state.radioVal = ''
    state.forbidden = false
  }
}
// 触发select隐藏
const blur = () => {
  selectRef.value.blur()
}
// 触发select显示
const focus = () => {
  selectRef.value.focus()
}
// 暴露方法出去
defineExpose({ focus, blur })
</script>

<style lang="scss">
.t-select-table {
  .el-table__cell {
    text-align: center;
  }

  // 单选样式
  .radioStyle {
    .el-table__cell {
      text-align: center;
    }

    .el-radio {
      .el-radio__label {
        display: none;
      }

      &:focus:not(.is-focus):not(:active):not(.is-disabled) .el-radio__inner {
        box-shadow: none;
      }
    }

    :deep(tbody) {
      .el-table__row {
        cursor: pointer;
      }
    }
  }

  .t-table-select__table {
    padding: 10px;

    .el-table__body,
    .el-table__header {
      margin: 0;
    }
  }

  .t-table-select__page {
    padding-top: 5px;

    .el-pagination {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: calc(2% - 20px);
      background-color: #fff;
    }
  }
}
</style>