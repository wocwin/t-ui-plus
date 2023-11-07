<template>
  <el-select
    ref="selectRef"
    v-model="state.defaultValue"
    popper-class="t-select-table"
    :multiple="multiple"
    v-bind="selectAttr"
    :value-key="keywords.value"
    :filterable="filterable"
    :filter-method="filterMethod || filterMethodHandle"
    v-click-outside="closeBox"
    @visible-change="visibleChange"
    @remove-tag="removeTag"
    @clear="clear"
    @keyup="selectKeyup"
  >
    <template #empty>
      <div class="t-table-select__table" :style="{ width: `${tableWidth}px` }">
        <div class="table_query_condition" v-if="isShowQuery">
          <t-query-condition
            ref="tQueryConditionRef"
            :boolEnter="false"
            v-bind="$attrs"
          >
            <template v-for="(index, name) in slots" v-slot:[name]="data">
              <slot :name="name" v-bind="data"></slot>
            </template>
          </t-query-condition>
        </div>
        <el-table
          ref="selectTable"
          :data="state.tableData"
          :class="{
            radioStyle: !multiple,
            highlightCurrentRow: isRadio,
            keyUpStyle: isKeyup,
          }"
          highlight-current-row
          border
          :row-key="getRowKey"
          @row-click="rowClick"
          @cell-dblclick="cellDblclick"
          @selection-change="handlesSelectionChange"
          v-bind="$attrs"
        >
          <el-table-column
            v-if="multiple"
            type="selection"
            width="55"
            align="center"
            :reserve-selection="reserveSelection"
            fixed
          ></el-table-column>
          <el-table-column
            type="radio"
            width="55"
            :label="radioTxt"
            fixed
            align="center"
            v-if="!multiple && isShowFirstColumn"
          >
            <template #default="scope">
              <el-radio
                v-model="radioVal"
                :label="scope.$index + 1"
                @click.stop="
                  radioChangeHandle($event, scope.row, scope.$index + 1)
                "
              ></el-radio>
            </template>
          </el-table-column>
          <el-table-column
            v-for="(item, index) in columns"
            :key="index + 'i'"
            :type="item.type"
            :label="item.label"
            :prop="item.prop"
            :min-width="item['min-width'] || item.minWidth || item.width"
            :align="item.align || 'center'"
            :fixed="item.fixed"
            :show-overflow-tooltip="item.noShowTip"
            v-bind="{ ...item.bind, ...$attrs }"
          >
            <template #default="scope">
              <!-- render方式 -->
              <template v-if="item.render">
                <render-col
                  :column="item"
                  :row="scope.row"
                  :render="item.render"
                  :index="scope.$index"
                />
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
          <el-pagination
            v-model:current-page="table.currentPage"
            v-model:page-size="table.pageSize"
            small
            background
            @current-change="handlesCurrentChange"
            layout="total, prev, pager, next, jumper"
            :pager-count="5"
            :total="table.total"
            v-bind="$attrs"
          />
        </div>
      </div>
    </template>
  </el-select>
</template>

<script setup lang="ts" name="TSelectTable">
import TQueryCondition from '../../query-condition/src/index.vue'
import RenderCol from './renderCol.vue'
import {
  computed,
  useAttrs,
  useSlots,
  ref,
  watch,
  nextTick,
  reactive,
  onMounted,
} from 'vue'
import { ClickOutside as vClickOutside, ElMessage } from 'element-plus'
const props = defineProps({
  // 选择值
  value: {
    type: [String, Number, Array],
  },
  // table所需数据
  table: {
    type: Object,
    default: () => {
      return {}
    },
  },
  // 表头数据
  columns: {
    type: Array as unknown as any[],
    default: () => [],
  },
  // 单选文案
  radioTxt: {
    type: String,
    default: '单选',
  },
  // 是否显示搜索条件
  isShowQuery: {
    type: Boolean,
    default: false,
  },
  // 单选框--是否开启点击整行选中
  rowClickRadio: {
    type: Boolean,
    default: true,
  },
  // 是否显示首列
  isShowFirstColumn: {
    type: Boolean,
    default: true,
  },
  // 是否过滤
  filterable: {
    type: Boolean,
    default: true,
  },
  // 是否支持翻页选中
  reserveSelection: {
    type: Boolean,
    default: true,
  },
  // 是否显示分页
  isShowPagination: {
    type: Boolean,
    default: false,
  },
  // 是否自定义过滤
  filterMethod: {
    type: Function,
  },
  // 下拉数据指向的label/value
  keywords: {
    type: Object,
    default: () => {
      return {
        label: 'label',
        value: 'value',
      }
    },
  },
  // 单选是否开启键盘事件
  isKeyup: {
    type: Boolean,
    default: false,
  },
  // 多选
  multiple: {
    type: Boolean,
    default: false,
  },
  // table宽度
  tableWidth: {
    type: Number,
    default: 550,
  },
  // 设置默认选中项--keywords.value值（单选是String, Number类型；多选时是数组）
  defaultSelectVal: {
    type: [String, Number, Array],
  },
})
const selectAttr = computed(() => {
  return {
    clearable: true,
    ...useAttrs(),
  }
})
const slots = useSlots()
const isDefaultSelectVal = ref(true) // 是否已经重新选择了
const forbidden = ref(true) // 判断单选选中及取消选中
const isRadio = ref(false)
const isPagination = ref(false) // 分页点击不隐藏下拉框
const radioVal = ref('')
const state: any = reactive({
  defaultSelectValue: props.defaultSelectVal, // 默认选中
  tableData: props.table.data, // table数据
  defaultValue: props.value,
  ids: [], // 多选id集合
  tabularMap: {}, // 存储下拉tale的所有name
})
// 获取ref
const selectRef: any = ref<HTMLElement | null>(null)
const selectTable: any = ref<HTMLElement | null>(null)
const tQueryConditionRef: any = ref<HTMLElement | null>(null)
const nowIndex = ref(-1)
watch(
  () => props.table.data,
  (val) => {
    // console.log(111, val)
    state.tableData = val
    nextTick(() => {
      state.tableData &&
        state.tableData.length > 0 &&
        state.tableData.forEach((item) => {
          state.tabularMap[item[props.keywords.value]] =
            item[props.keywords.label]
        })
      // findLabel()
    })
  },
  { deep: true }
)
watch(
  () => props.value,
  (val) => {
    // console.log(111, val)
    state.tableData = val
    nextTick(() => {
      // 多选
      if (props.multiple) {
        state.defaultValue = Array.isArray(props.value)
          ? props.value
          : typeof props.value === 'string'
          ? props.value.split(',')
          : []
        state.defaultValue = (state.defaultValue || []).map((item) => {
          return item
        })
      } else {
        state.defaultValue = props.value
          ? { [props.keywords.value]: props.value }
          : ''
      }
      findLabel()
    })
  },
  { deep: true }
)
watch(
  () => props.defaultSelectVal,
  (val) => {
    // console.log('props.defaultSelectVal---watch', val)
    state.defaultSelectValue = val
    if (val && isDefaultSelectVal.value) {
      defaultSelect(val)
    }
  },
  { deep: true }
)
onMounted(() => {
  // 设置默认选中项（单选）
  if (state.defaultSelectValue && isDefaultSelectVal.value) {
    defaultSelect(state.defaultSelectValue)
  }
})
// el-select点击了空白区域
const closeBox = () => {
  // 获取查询条件组件的项
  if (tQueryConditionRef.value) {
    Object.values(tQueryConditionRef.value?.props?.opts).map((val: any) => {
      if (val.comp.includes('select') || val.comp.includes('date')) {
        isPagination.value = true
      }
    })
  }
}
// 单选键盘事件
const selectKeyup = (e) => {
  if (!props.multiple) {
    if (!props.isKeyup) return
    if (state.tableData.length === 0) return
    switch (e.keyCode) {
      case 40: // 下键
        if (state.tableData[nowIndex.value * 1 + 1] !== undefined) {
          selectTable.value.setCurrentRow(
            state.tableData[nowIndex.value * 1 + 1]
          )
          nowIndex.value = nowIndex.value * 1 + 1
        } else {
          nowIndex.value = 0
          selectTable.value.setCurrentRow(state.tableData[0])
        }
        break
      case 38: // 上键
        if (
          state.tableData[nowIndex.value * 1 - 1] !== undefined &&
          nowIndex.value > 0
        ) {
          selectTable.value.setCurrentRow(
            state.tableData[nowIndex.value * 1 - 1]
          )
          nowIndex.value = nowIndex.value * 1 - 1
        } else {
          nowIndex.value = 0
          selectTable.value.setCurrentRow(state.tableData[0])
        }
        break
      case 13: // 回车
        rowClick(state.tableData[nowIndex.value])
        break
    }
  }
}
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
      selectRef.value.selectedLabel =
        (state.defaultValue && state.defaultValue[props.keywords.label]) || ''
      // }
      if (!isPagination.value) {
        blur()
      }
    }
  })
}
// 抛出事件
const emits = defineEmits(['page-change', 'selectionChange', 'radioChange'])
// 当前页码
const handlesCurrentChange = (val) => {
  if (props.multiple) {
    if (!props.reserveSelection) {
      clear()
    }
  } else {
    clear()
  }
  isPagination.value = true
  emits('page-change', val)
}
// 默认选中（且只能默认选中第一页的数据）
const defaultSelect = (defaultSelectVal) => {
  if (typeof defaultSelectVal === 'object' && props.multiple) {
    let multipleList: any = []
    defaultSelectVal.map((val) => {
      state.tableData.forEach((row: any) => {
        if (val === row[props.keywords.value]) {
          multipleList.push(row)
        }
      })
    })
    setTimeout(() => {
      state.defaultValue = multipleList.map(
        (item) => item[props.keywords.label]
      )
      multipleList.forEach((row) => {
        const arr = state.tableData.filter(
          (item) => item[props.keywords.value] === row[props.keywords.value]
        )
        if (arr.length > 0) {
          selectTable.value.toggleRowSelection(arr[0], true)
        }
      })
      selectRef.value.selected.forEach((item) => {
        item.currentLabel = item.value
      })
    }, 0)
  } else {
    let row, index
    state.tableData.map((val, i) => {
      if (val[props.keywords.value] === defaultSelectVal) {
        row = val
        index = i
      }
    })
    radioVal.value = index + 1
    state.defaultValue = row
    setTimeout(() => {
      selectRef.value.selectedLabel = row[props.keywords.label]
    }, 0)
  }
}
// 复选框(多选)
const handlesSelectionChange = (val) => {
  // console.log('复选框', val)
  isDefaultSelectVal.value = false
  state.defaultValue = val.map((item) => item[props.keywords.label])
  state.ids = val.map((item) => item[props.keywords.value])
  emits('selectionChange', val, state.ids)
}
// 搜索后表格勾选不取消
const getRowKey = (row) => {
  return row[props.keywords.value]
}
// 搜索过滤
const filterMethodHandle = (val) => {
  if (!props.filterable) return
  const tableData = JSON.parse(JSON.stringify(props.table?.data))
  if (tableData && tableData.length > 0) {
    if (!props.multiple) {
      if (val) {
        radioVal.value = ''
      } else {
        tableData.map((item, index) => {
          if (
            item[props.keywords.value] === state.defaultValue &&
            state.defaultValue[props.keywords.value]
          ) {
            radioVal.value = index + 1
          }
        })
      }
    }
    state.tableData = tableData.filter((item) => {
      if (item[props.keywords.label].includes(val)) {
        return item
      }
    })
  }
}
// 表格显示隐藏回调
const visibleChange = (visible) => {
  // console.log('表格显示隐藏回调', visible)
  if (visible) {
    if (props.defaultSelectVal && isDefaultSelectVal.value) {
      defaultSelect(props.defaultSelectVal)
    }
    initTableData()
  } else {
    findLabel()
    filterMethodHandle('')
  }
}
// 获取表格数据
const initTableData = () => {
  // 表格默认赋值
  nextTick(() => {
    if (props.multiple) {
      state.defaultValue.forEach((row) => {
        const arr = state.tableData.filter(
          (item) => item[props.keywords.value] === row[props.keywords.value]
        )
        if (arr.length > 0) {
          selectTable.value.toggleRowSelection(arr[0], true)
        }
      })
    } else {
      const arr = state.tableData.filter(
        (item) =>
          item[props.keywords.value] === state.defaultValue &&
          state.defaultValue[props.keywords.value]
      )
      selectTable.value.setCurrentRow(arr[0])
    }
  })
}
// 复制内容
const copyDomText = (val) => {
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
const radioChangeHandle = (event, row, index) => {
  event.preventDefault()
  isDefaultSelectVal.value = false
  radioClick(row, index)
}
// forbidden取值
const isForbidden = () => {
  forbidden.value = false
  setTimeout(() => {
    forbidden.value = true
  }, 0)
}
// 单选抛出事件radioChange
const radioClick = (row, index) => {
  forbidden.value = !!forbidden.value
  if (radioVal.value) {
    if (radioVal.value === index) {
      radioVal.value = ''
      isForbidden()
      state.defaultValue = {}
      emits('radioChange', {}, null) // 取消勾选就把回传数据清除
      blur()
    } else {
      isForbidden()
      radioVal.value = index
      state.defaultValue = row
      emits('radioChange', row, row[props.keywords.value])
      blur()
    }
  } else {
    isForbidden()
    radioVal.value = index
    state.defaultValue = row
    emits('radioChange', row, row[props.keywords.value])
    blur()
  }
}
// 单击行
const rowClick = async (row) => {
  if (!props.rowClickRadio) return
  if (!props.multiple) {
    let rowIndex
    // eslint-disable-next-line no-unused-expressions
    props.table?.data.forEach((item, index) => {
      if (item[props.keywords.value] === row[props.keywords.value]) {
        // console.log('index', index)
        rowIndex = index
      }
    })
    // await this.radioClick(row, rowIndex + 1)
    isDefaultSelectVal.value = false
    await radioClick(row, rowIndex + 1)
    if (radioVal.value) {
      isRadio.value = true
    } else {
      isRadio.value = false
    }
  }
}
// tags删除后回调
const removeTag = (tag) => {
  const row = state.tableData.find((item) => item[props.keywords.label] === tag)
  selectTable.value.toggleRowSelection(row, false)
}
// 清空后的回调
const clear = () => {
  if (props.multiple) {
    selectTable.value.clearSelection()
    state.defaultValue = []
  } else {
    // 取消高亮
    selectTable.value.setCurrentRow(-1)
    nowIndex.value = -1
    radioVal.value = ''
    forbidden.value = false
    state.defaultValue = null
    emits('radioChange', {}, null)
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
defineExpose({ focus, blur, clear })
</script>

<style lang="scss">
.t-select-table {
  .el-table__cell {
    // text-align: center;
  }

  // 单选样式
  .radioStyle {
    .el-table__cell {
      // text-align: center;
    }

    .el-radio {
      .el-radio__label {
        display: none;
      }

      &:focus:not(.is-focus):not(:active):not(.is-disabled) .el-radio__inner {
        box-shadow: none;
      }
    }
    .el-table__row {
      cursor: pointer;
    }
  }
  // 键盘事件开启选择高亮
  .keyUpStyle {
    .el-table__body {
      tbody {
        .current-row {
          color: var(--el-color-primary) !important;
          cursor: pointer;
        }
      }
    }
  }
  // 选中行样式
  .highlightCurrentRow {
    :deep(.current-row) {
      color: var(--el-color-primary);
      cursor: pointer;
    }
  }
  .t-table-select__table {
    padding: 10px;

    .el-table__body,
    .el-table__header {
      margin: 0;
    }
    // 条件查询组件样式
    .table_query_condition {
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 10px;
    }
  }

  .t-table-select__page {
    padding-top: 5px;

    .el-pagination {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: calc(2% - 20px);
      background-color: var(--el-table-tr-bg-color);
    }
  }
}
</style>
