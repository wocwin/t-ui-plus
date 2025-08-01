<template>
  <el-input
    v-if="isShowInput"
    v-model="selectInputVal"
    v-bind="{ clearable: true, ...inputAttr }"
    @focus="() => emits('input-focus')"
    @blur="() => emits('input-blur')"
    @click="() => emits('input-click')"
    @clear="() => emits('input-clear')"
    :style="{ width: inputWidth ? `${inputWidth}px` : '100%' }"
  >
    <template v-for="(_index, name) in slots" v-slot:[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
  </el-input>
  <el-select
    v-else
    ref="selectRef"
    :model-value="multiple ? state.defaultValue : selectDefaultLabel"
    popper-class="t-select-table"
    :style="{ width: selectWidth ? `${selectWidth}px` : '100%' }"
    :value-key="keywords.value"
    :filter-method="filterMethod || filterMethodHandle"
    v-click-outside="closeBox"
    @visible-change="visibleChange"
    @remove-tag="removeTag"
    @clear="clear"
    @keyup="selectKeyup"
    v-bind="{ clearable: true, multiple, filterable, remote, remoteMethod, ...$attrs }"
  >
    <template #empty>
      <div
        class="t-table-select__table"
        :style="{ width: tableWidth ? `${tableWidth}px` : '100%' }"
      >
        <div class="table_query_condition" v-if="isShowQuery">
          <t-query-condition
            ref="tQueryConditionRef"
            :boolEnter="false"
            @handleEvent="handleEvent"
            v-bind="$attrs"
          >
            <template v-for="(_index, name) in slots" v-slot:[name]="data">
              <slot :name="name" v-bind="data"></slot>
            </template>
            <template #querybar v-if="isShowBlurBtn">
              <el-button v-bind="{ type: 'danger', ...btnBind }" @click="blur">
                {{ btnBind.btnTxt || "关闭下拉框" }}
              </el-button>
              <slot name="querybar"></slot>
            </template>
          </t-query-condition>
        </div>
        <div class="header_wrap" :style="{ paddingBottom: isShowSlot('toolbar') ? '10px' : 0 }">
          <slot name="toolbar"></slot>
        </div>
        <div class="table_content" v-loading="tableLoading" :element-loading-text="loadingTxt">
          <el-table
            ref="selectTable"
            :data="state.tableData"
            :class="{
              radioStyle: !multiple,
              highlightCurrentRow: isRadio,
              keyUpStyle: isKeyup,
              t_select_table_multiple: useVirtual && multiple,
              t_select_table_radio: useVirtual && !multiple
            }"
            :row-class-name="getRowClassName"
            :row-key="getRowKey"
            @row-click="rowClick"
            @cell-dblclick="cellDblclick"
            @selection-change="handlesSelectionChange"
            v-bind="{ border, size: tableSize, 'highlight-current-row': true, ...$attrs }"
          >
            <el-table-column
              v-if="multiple"
              type="selection"
              :width="tableSize === 'large' ? 65 : 55"
              :align="align || 'center'"
              :reserve-selection="reserveSelection"
              :selectable="selectable"
              :fixed="multipleFixed"
            ></el-table-column>
            <el-table-column
              type="radio"
              :width="tableSize === 'large' ? 65 : 55"
              :label="radioTxt"
              :fixed="radioFixed"
              :align="align || 'center'"
              v-if="!multiple && isShowFirstRadio"
            >
              <template #default="scope">
                <el-radio
                  v-model="radioVal"
                  :label="scope.$index + 1"
                  :disabled="scope.row.isRadioDisabled"
                  @click.stop="radioChangeHandle($event, scope.row, scope.$index + 1)"
                ></el-radio>
              </template>
            </el-table-column>
            <el-table-column
              v-for="(item, index) in columns"
              :key="index + 'i'"
              :type="item.type"
              :label="item.label"
              :prop="item.prop"
              :min-width="item['min-width'] || item.minWidth"
              :width="item.width"
              :align="item.align || align || 'center'"
              :fixed="item.fixed"
              v-bind="{ 'show-overflow-tooltip': true, ...item.bind }"
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
              @current-change="handlesCurrentChange"
              layout="total, prev, pager, next, jumper"
              :pager-count="table['pager-count'] || 5"
              :total="table.total"
              v-bind="{ background: true, size: paginationSize || 'small', ...$attrs }"
            />
          </div>
        </div>
        <slot name="footer"></slot>
      </div>
    </template>
  </el-select>
</template>

<script setup lang="ts">
import TQueryCondition from "@t-ui-plus/components/query-condition/src/index.vue"
import RenderCol from "@t-ui-plus/components/select-table/src/renderCol.vue"
import {
  computed,
  useAttrs,
  useSlots,
  ref,
  watch,
  nextTick,
  reactive,
  onMounted,
  onUpdated,
  onBeforeUnmount
} from "vue"
import type { TSelectTableProps } from "./type"
import { ElMessage } from "element-plus"
import ClickOutside from "./ClickOutside"
// 虚拟滚动
import { useVirtualized } from "./useVirtualized"
const {
  scrollContainerEl,
  updateRenderedItemCache,
  updateOffset,
  getDom,
  saveDATA,
  getItemHeightFromCache
} = useVirtualized()

const props = withDefaults(defineProps<TSelectTableProps>(), {
  modelValue: undefined,
  inputValue: undefined,
  defaultSelectVal: () => [],
  radioSelectValLabel: "",
  table: () => ({
    data: [],
    currentPage: 1,
    pageSize: 10,
    total: 0
  }),
  keywords: () => ({
    value: "value",
    label: "label"
  }),
  columns: () => [],
  multiple: false,
  filterable: true,
  remote: false,
  remoteMethod: undefined,
  filterMethod: undefined,
  isShowInput: false,
  inputAttr: () => ({}),
  inputWidth: 550,
  selectWidth: 550,
  tableWidth: 550,
  isShowQuery: false,
  isShowBlurBtn: false,
  btnBind: () => ({ btnTxt: "关闭下拉框" }),
  align: "center",
  reserveSelection: true,
  selectable: undefined,
  multipleFixed: true,
  radioTxt: "单选",
  radioFixed: true,
  tableSize: "default",
  border: true,
  isShowFirstColumn: true,
  useVirtual: false,
  virtualShowSize: 30,
  isShowPagination: false,
  paginationSize: "small",
  selfExpanded: false,
  isClearQuery: false,
  isRadioEchoLabel: true,
  defaultValIsOpenRadioChange: false,
  radioSameIsCancel: true,
  rowClickRadio: true,
  isKeyup: false,
  isExpanded: false,
  multipleDisableDelete: true,
  tableLoading: false,
  loadingTxt: "加载中..."
})
defineOptions({
  name: "TSelectTable"
})
// 自定义指令
const vClickOutside = ClickOutside
// 定义 Emits 类型
export type Emits = {
  (event: "page-change", val: any): void
  (event: "selectionChange", val: any[], ids: any[]): void
  (event: "radioChange", row: any, value: any): void
  (event: "update:inputValue", val: string): void
  (event: "input-focus"): void
  (event: "input-blur"): void
  (event: "input-clear"): void
  (event: "input-click"): void
}
// 抛出事件
const emits = defineEmits<Emits>()
const slots = useSlots()
const isDefaultSelectVal = ref(true) // 是否已经重新选择了
const forbidden = ref(true) // 判断单选选中及取消选中
const isRadio = ref(false)
const isQueryVisible = ref(false) // 查询条件是否显示隐藏下拉框
const isVisible = ref(false) // 是否显示隐藏下拉框
const radioVal = ref<any>("")
const isShowFirstRadio = ref(props.isShowFirstColumn) // 是否显示第一列
const selectDefaultLabel: any = ref(props.modelValue) // 单选赋值
const scrollTopNum = ref(0) // 滚动条位置
// input回显值
let selectInputVal = computed({
  get() {
    return props.inputValue
  },
  set(val) {
    // console.log(777, val)
    emits("update:inputValue", val)
  }
})
interface InitState {
  defaultSelectValue: any[]
  tableData: any[]
  defaultValue: any
  ids: any[]
  tabularMap: any
}
const state = reactive<InitState>({
  defaultSelectValue: props.defaultSelectVal, // 默认选中
  tableData: props.table.data, // table数据
  defaultValue: props.value,
  ids: [], // 多选id集合
  tabularMap: {} // 存储下拉tale的所有name
})
// 获取ref
const selectRef = ref<HTMLElement | any>(null)
const selectTable = ref<HTMLElement | any>(null)
const tQueryConditionRef = ref<HTMLElement | any>(null)
const nowIndex = ref(-1)
// 获取tableData的label
const tableDataLabelList = computed(() => {
  return state.tableData.map((item: any) => item[props.keywords.label])
})
watch(
  () => props.table.data,
  val => {
    if (props.useVirtual) {
      saveDATA.value = val
      updateRenderData(scrollTopNum.value)
    } else {
      state.tableData = val
      // 解决查询后，之前选中的数据若不在查询结果中，则禁用删除
      if (props.multiple && props.multipleDisableDelete) {
        selectRef.value?.$el?.querySelectorAll(".el-tag").forEach(item => {
          if (
            tableDataLabelList.value?.includes(
              item.querySelector(".el-select__tags-text")?.innerText
            )
          ) {
            item.querySelector(".el-tag__close").style = "display: block"
          } else {
            item.querySelector(".el-tag__close").style = "display: none"
          }
        })
      }
    }
    nextTick(() => {
      state.tableData &&
        state.tableData.length > 0 &&
        state.tableData.forEach((item: { [x: string]: any }) => {
          state.tabularMap[item[props.keywords.value]] = item[props.keywords.label]
        })
    })
  },
  { deep: true }
)
watch(
  () => props.defaultSelectVal,
  val => {
    // console.log("props.defaultSelectVal---watch", val, isDefaultSelectVal.value)
    state.defaultSelectValue = val
    if (val.length > 0) {
      if (props.multiple) {
        if (isDefaultSelectVal.value) {
          defaultSelect(state.defaultSelectValue)
        }
      } else {
        // console.log("this.defaultSelectValue---watch---1111", state.defaultSelectValue)
        defaultSelect(state.defaultSelectValue)
      }
    }
  },
  { deep: true }
)
watch(
  () => props.radioSelectValLabel,
  val => {
    if (val) findLabel()
  },
  { deep: true }
)
onMounted(() => {
  // 设置默认选中项（单选）
  if (state.defaultSelectValue && state.defaultSelectValue.length > 0 && isDefaultSelectVal.value) {
    defaultSelect(state.defaultSelectValue)
  }
  if (props.selfExpanded) {
    selectRef.value.expanded = true
  }
  if (props.useVirtual) {
    saveDATA.value = props.table.data
    isShowFirstRadio.value = false
    getDom(props)
    scrollContainerEl.value?.addEventListener("scroll", handleScroll)
  }
  if (props.radioSelectValLabel) findLabel()
})

// 更新实际渲染数据
const updateRenderData = (scrollTop: number) => {
  // console.log("更新实际渲染数据---scrollTop", scrollTop)
  let startIndex = 0
  let offsetHeight = 0
  for (let i = 0; i < saveDATA.value.length; i++) {
    offsetHeight += getItemHeightFromCache(i)
    if (offsetHeight >= scrollTop) {
      startIndex = i
      break
    }
  }
  // 计算得出的渲染数据
  state.tableData = saveDATA.value.slice(startIndex, startIndex + props.virtualShowSize)
  // 缓存最新的列表项高度
  updateRenderedItemCache(startIndex)
  // 更新偏移值
  updateOffset(offsetHeight - getItemHeightFromCache(startIndex))
}
// 滚动事件
const handleScroll = (e: any) => {
  scrollTopNum.value = e.target.scrollTop
  // 渲染正确的数据
  updateRenderData(scrollTopNum.value)
  // console.log("滚动事件---handleScroll")
}
// 移除滚动事件
onBeforeUnmount(() => {
  // console.log("移除滚动事件")
  if (props.useVirtual) {
    scrollContainerEl.value?.removeEventListener("scroll", handleScroll)
  }
})
// 解决查询条件下拉选择table闪烁问题
onUpdated(() => {
  if (props.isShowQuery) {
    // console.log('onUpdated--22')
    selectTable.value.doLayout()
  }
})
// 表格显示隐藏回调
const visibleChange = (visible: boolean) => {
  // console.log('表格显示隐藏回调', visible)
  isVisible.value = visible
  if (isQueryVisible.value) {
    selectRef.value.expanded = true
  }
  // console.log('表格显示隐藏回调--222', visible)
  if (visible) {
    if (
      state.defaultSelectValue &&
      state.defaultSelectValue.length > 0 &&
      isDefaultSelectVal.value
    ) {
      defaultSelect(state.defaultSelectValue)
    }
    initTableData()
    if (props.useVirtual) {
      saveDATA.value = props.table.data
      updateRenderData(scrollTopNum.value)
    }
  } else {
    if (
      tQueryConditionRef.value &&
      props.isShowQuery &&
      props.isClearQuery &&
      !selectRef.value.expanded &&
      !props.selfExpanded
    ) {
      tQueryConditionRef.value?.resetData()
    }
    findLabel()
    filterMethodHandle("")
    if (props.useVirtual) {
      // console.log("props.useVirtual---清空")
      state.tableData = []
      saveDATA.value = []
    }
  }
  if (props.selfExpanded) {
    selectRef.value.expanded = true
  }
}
// 查询条件change事件触发
const handleEvent = () => {
  // console.log('查询条件change事件触发')
  selectRef.value.expanded = true
}
// 条件查询组件的visible-change事件
const queryVisibleChange = (val: boolean) => {
  isQueryVisible.value = val
}
// el-select点击了空白区域
const closeBox = () => {
  // 获取查询条件组件的项
  if (tQueryConditionRef.value && props.isShowQuery) {
    selectRef.value.expanded = true
    Object.values(tQueryConditionRef.value?.props?.opts).map((val: any) => {
      if (val.comp.includes("select") || val.comp.includes("picker") || val.comp.includes("date")) {
        val.eventHandle = {
          "visible-change": ($event: boolean) => queryVisibleChange($event)
        }
        // queryVisibleChange(true)
        // isQueryVisible.value = true
        selectRef.value.expanded = true
      }
    })
    if (isVisible.value && props.isShowQuery) {
      selectRef.value.expanded = true
    } else {
      selectRef.value.expanded = false
    }
  }
}
const attrs: any = useAttrs()
// 单选键盘事件
const selectKeyup = (e: { keyCode: any }) => {
  if (!props.multiple && props.isKeyup && state.tableData.length > 0) {
    const newIndex = nowIndex.value * 1
    const nextIndex = e.keyCode === 40 ? newIndex + 1 : e.keyCode === 38 ? newIndex - 1 : newIndex
    // 键盘向上/下滚动条根据移动的选择区域而滚动
    const rowHeight = selectTable.value.$el.querySelectorAll(".el-table__row")[0]?.clientHeight || 0
    const headerHeight =
      selectTable.value.$el.querySelectorAll(".el-table__header")[0]?.clientHeight || 0
    const attrsMaxHeight =
      (typeof (attrs["max-height"] || attrs["maxHeight"]) === "number"
        ? attrs["max-height"] || attrs["maxHeight"]
        : parseFloat(attrs["max-height"] || attrs["maxHeight"])) || 0
    const maxHeight = attrsMaxHeight ? attrsMaxHeight - headerHeight : 0
    const height = rowHeight * (nextIndex + 3)
    const scrollTop = height > maxHeight ? height - maxHeight : 0
    // console.log('attrsMaxHeight---22', attrsMaxHeight)
    if (attrsMaxHeight) {
      selectTable.value.setScrollTop(scrollTop)
    }

    const validNextIndex = Math.max(0, Math.min(nextIndex, state.tableData.length - 1))

    selectTable.value.setCurrentRow(state.tableData[validNextIndex])
    nowIndex.value = validNextIndex

    if (e.keyCode === 13) {
      rowClick(state.tableData[validNextIndex])
    }
  }
}

// 赋值
const findLabel = () => {
  nextTick(() => {
    if (props.multiple) {
      selectRef.value.selected?.forEach((item: { currentLabel: any; value: any }) => {
        item.currentLabel = item.value
      })
    } else {
      if (props.isRadioEchoLabel) {
        selectDefaultLabel.value =
          (state.defaultValue && state.defaultValue[props.keywords.label]) ||
          props.radioSelectValLabel
      } else {
        selectDefaultLabel.value =
          (state.defaultValue && state.defaultValue[props.keywords.label]) || ""
      }
    }
  })
}

// 当前页码
const handlesCurrentChange = (val: any) => {
  if (props.multiple) {
    if (!props.reserveSelection) {
      clear()
    }
  } else {
    // clear()
    reset()
  }
  emits("page-change", val)
}
// 数据重置后回调
const reset = () => {
  if (!props.multiple) {
    // 取消高亮
    selectTable.value.setCurrentRow(-1)
    nowIndex.value = -1
    radioVal.value = ""
    isDefaultSelectVal.value = true
    forbidden.value = false
  }
}
// 默认选中（且只能默认选中第一页的数据）
const defaultSelect = (defaultSelectVal: any[]) => {
  if (props.multiple) {
    const multipleList = defaultSelectVal
      .map(val => state.tableData.find(row => row[props.keywords.value] === val))
      .filter(Boolean) as any[]

    setTimeout(() => {
      state.defaultValue = multipleList.map(item => item[props.keywords.label])
      multipleList.forEach(row => {
        selectTable.value.toggleRowSelection(row, true)
      })
      selectRef.value?.selected?.forEach(item => {
        item.currentLabel = item.value
      })
    }, 0)
  } else {
    setTimeout(() => {
      const row = state.tableData.find(item => item[props.keywords.value] === defaultSelectVal[0])
      if (row) {
        radioVal.value = state.tableData.indexOf(row) + 1
        state.defaultValue = row
        selectDefaultLabel.value = row[props.keywords.label]
        // 是否开启单选事件
        if (!props.defaultValIsOpenRadioChange) {
          emits("radioChange", row, row[props.keywords.value])
        }
      }
    }, 0)
  }
}

// 复选框(多选)
const handlesSelectionChange = (val: any[]) => {
  // console.log("复选框--组件内--val", val)
  isDefaultSelectVal.value = false
  state.defaultValue = val.map(item => item[props.keywords.label])
  state.ids = val.map(item => item[props.keywords.value])
  if (val.length === 0) {
    isDefaultSelectVal.value = true
    state.defaultSelectValue = []
  }
  emits("selectionChange", val, state.ids)
}
// 设置table行class
const getRowClassName = ({ row }: any) => {
  if (!props.multiple && JSON.stringify(row) === JSON.stringify(state.defaultValue)) {
    return "selected_row_style"
  }
  return ""
}
// 搜索后表格勾选不取消
const getRowKey = (row: { [x: string]: any }) => {
  return row[props.keywords.value]
}

// 搜索过滤
const filterMethodHandle = (val: string) => {
  if (!props.filterable) return
  if (props.filterable && props.remote && typeof props.remoteMethod === "function") {
    props.remoteMethod(val)
    return
  }
  const tableData = JSON.parse(JSON.stringify(props.table?.data))
  if (!tableData || tableData.length === 0) return
  if (!props.multiple) {
    if (val) {
      radioVal.value = ""
    } else {
      const defaultIndex = tableData.findIndex(
        item => item[props.keywords.label] === selectDefaultLabel.value
      )
      if (defaultIndex !== -1) {
        radioVal.value = defaultIndex + 1
      }
    }
  }
  state.tableData = tableData.filter(item => {
    return item[props.keywords.label]?.includes(val)
  })
  // 解决选中后，在过滤后，没有选中问题
  if (selectDefaultLabel.value) {
    const defaultIndex = state.tableData.findIndex(
      item => item[props.keywords.label] === selectDefaultLabel.value
    )
    if (defaultIndex !== -1) {
      radioVal.value = defaultIndex + 1
    }
  }
}

// 获取表格数据
const initTableData = () => {
  // 表格默认赋值
  nextTick(() => {
    if (props.multiple) {
      state.defaultValue?.forEach(row => {
        const matchedRow = state.tableData.find(
          item => item[props.keywords.value] === row[props.keywords.value]
        )
        if (matchedRow) {
          selectTable.value.toggleRowSelection(matchedRow, true)
        }
      })
    } else {
      const matchedRow = state.tableData?.find(
        item => item[props.keywords.value] === selectDefaultLabel.value
      )
      if (matchedRow) {
        selectTable.value.setCurrentRow(matchedRow)
      }
    }
  })
}

// 复制内容到剪切板
const copyToClipboard = async (text: any) => {
  // 确保传入的内容是字符串类型
  if (typeof text !== "string" || text.trim() === "") {
    throw new Error("无效的复制内容")
  }
  try {
    // 使用现代剪贴板 API 进行复制
    await navigator.clipboard.writeText(text)
  } catch (error) {
    // 捕获并抛出具体的错误信息
    if ((error as any).name === "NotAllowedError" || (error as any).name === "SecurityError") {
      throw new Error("复制失败：权限被拒绝")
    } else {
      throw new Error("复制失败：浏览器不支持或发生未知错误")
    }
  }
}

// 显示消息提示
const showMessage = (type: "success" | "error", message: string) => {
  if (type === "success") {
    ElMessage.success(message)
  } else {
    ElMessage.error(message)
  }
}

// 双击复制单元格内容
const cellDblclick = async (row: { [x: string]: any }, column: { property: string | number }) => {
  const value = row[column.property]
  try {
    // 调用复制函数
    await copyToClipboard(String(value)) // 确保值转换为字符串
    showMessage("success", "复制成功")
  } catch (error: any) {
    // 捕获并显示错误信息
    showMessage("error", error.message || "复制失败")
  }
}
// 点击单选框单元格触发事件
const radioChangeHandle = (event: { preventDefault: () => void }, row: any, index: any) => {
  event.preventDefault()
  if (row.isRadioDisabled) return
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
const radioClick = (row: { [x: string]: any }, index: string | number) => {
  forbidden.value = !forbidden.value
  if (radioVal.value === index) {
    if (!props.radioSameIsCancel) return
    clear()
  } else {
    updateState(row, index)
  }

  if (props.isExpanded && state.defaultValue) {
    selectDefaultLabel.value = state.defaultValue[props.keywords.label] || ""
    selectRef.value.expanded = true
  } else {
    blur()
  }
}

const updateState = (row: { [x: string]: any }, index: string | number) => {
  isForbidden()
  radioVal.value = index
  state.defaultValue = row
  emits("radioChange", row, row[props.keywords.value])
}

// 单击行
const rowClick = async (row: { [x: string]: any }) => {
  if (row.isRadioDisabled) return
  if (!props.rowClickRadio) return
  if (!props.multiple) {
    const rowIndex = props.table?.data.findIndex(
      item => item[props.keywords.value] === row[props.keywords.value]
    )
    if (rowIndex !== -1) {
      isDefaultSelectVal.value = false
      await radioClick(row, rowIndex + 1)
      if (radioVal.value) {
        isRadio.value = true
      } else {
        isRadio.value = false
      }
    }
  }
}

// tags删除后回调
const removeTag = (tag: any) => {
  const row = state.tableData.find(
    (item: { [x: string]: any }) => item[props.keywords.label] === tag
  )
  console.log("tags删除后回调", row)
  row && selectTable.value.toggleRowSelection(row, false)
  isDefaultSelectVal.value = true
}
// 清空后的回调
const clear = () => {
  // 公共逻辑：重置默认选择状态
  const resetDefaultState = () => {
    isDefaultSelectVal.value = true
    state.defaultSelectValue = []
    state.defaultValue = props.multiple ? [] : null
  }

  // 安全检查：确保 selectTable.value 存在
  if (!selectTable.value) {
    console.warn("selectTable.value is not initialized")
    return
  }

  if (props.multiple === true) {
    try {
      selectTable.value.clearSelection()
    } catch (error) {
      console.error("Failed to clear selection:", error)
    }
    resetDefaultState()
  } else if (props.multiple === false) {
    try {
      selectTable.value.setCurrentRow(-1)
    } catch (error) {
      console.error("Failed to set current row:", error)
    }
    nowIndex.value = -1
    radioVal.value = ""
    forbidden.value = false
    selectDefaultLabel.value = null
    resetDefaultState()
    emits("radioChange", null, null)
  } else {
    console.warn("Invalid value for props.multiple:", props.multiple)
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
// 判断是否使用了某个插槽
const isShowSlot = (name: string) => {
  return Object.keys(slots).includes(name)
}
// 暴露方法出去
defineExpose({
  focus,
  blur,
  clear,
  props,
  state,
  tQueryConditionRef,
  selectRef,
  selectTable
})
</script>
