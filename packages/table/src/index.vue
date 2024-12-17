<template>
  <div class="t-table" ref="TTableBox" v-loading="tableLoading" :element-loading-text="loadingTxt">
    <div
      class="header_wrap"
      :style="{
        paddingBottom:
          tableTitle ||
          title ||
          isShow('title') ||
          isShow('toolbar') ||
          isSlotToolbar ||
          columnSetting
            ? '10px'
            : 0
      }"
    >
      <div class="header_title" v-if="tableTitle || title || $slots.title || isSlotTitle">
        <template v-if="$slots.title || isSlotTitle">
          <slot name="title" />
        </template>
        <template v-else>
          <span v-if="tableTitle">{{ tableTitle }}</span>
          <span v-else>{{ title }}</span>
        </template>
      </div>
      <div class="toolbar_top">
        <!-- 表格外操作 -->
        <slot name="toolbar"></slot>
        <!--列设置按钮-->
        <div
          class="header_right_wrap"
          :style="{
            marginLeft: isShow('toolbar') || isSlotToolbar ? '12px' : 0
          }"
        >
          <slot name="btn" />
          <column-set
            v-if="columnSetting && !isTableHeader"
            v-bind="$attrs"
            :title="title || tableTitle"
            :columns="renderColumns"
            ref="columnSetRef"
            @columnSetting="v => (state.columnSet = v)"
          />
        </div>
      </div>
    </div>
    <div class="title-tip" v-if="isShow('titleTip')">
      <slot name="titleTip" />
    </div>
    <el-table
      ref="TTable"
      :data="state.tableData"
      :class="{
        cursor: isCopy,
        row_sort: isRowSort,
        row_sort_none: isRowSortIcon,
        tree_style: isTree,
        highlightCurrentRow: highlightCurrentRow,
        radioStyle: radioStyleClass,
        multile_head_column: isTableHeader,
        t_table_use_virtual: useVirtual
      }"
      v-bind="$attrs"
      :highlight-current-row="highlightCurrentRow"
      :border="border || table.border || isTableBorder || useVirtual"
      @cell-dblclick="cellDblclick"
      @row-click="rowClick"
    >
      <el-table-column
        v-if="isRowSortIcon"
        v-bind="{
          width: rowSortIconBind.width || 55,
          'min-width': rowSortIconBind['min-width'] || rowSortIconBind.minWidth,
          label: rowSortIconBind.label || '拖动',
          fixed: rowSortIconBind.fixed,
          align: rowSortIconBind.align || align,
          ...rowSortIconBind
        }"
      >
        <template #default="scope">
          <el-icon class="row_drag" :color="rowSortIconBind.color" :size="rowSortIconBind.size"
            ><Rank
          /></el-icon>
        </template>
      </el-table-column>
      <!-- 复选框/单选框/序列号 -->
      <template v-if="!Array.isArray(table.firstColumn) && table.firstColumn">
        <!-- 复选框 -->
        <el-table-column
          v-if="table.firstColumn.type === 'selection'"
          v-bind="{
            type: 'selection',
            width: table.firstColumn.width || 55,
            label: table.firstColumn.label,
            fixed: table.firstColumn.fixed,
            align: table.firstColumn.align || align,
            'reserve-selection': table.firstColumn.isPaging || false,
            selectable: table.firstColumn.selectable,
            ...table.firstColumn.bind
          }"
        />
        <el-table-column
          v-else
          v-bind="{
            type: table.firstColumn.type,
            width: table.firstColumn.width || 55,
            label:
              table.firstColumn.label ||
              (table.firstColumn.type === 'radio' && '单选') ||
              (table.firstColumn.type === 'index' && '序号') ||
              (table.firstColumn.type === 'expand' && '') ||
              '',
            fixed: table.firstColumn.fixed,
            align: table.firstColumn.align || align,
            ...table.firstColumn.bind
          }"
        >
          <template #default="scope" v-if="table.firstColumn.type !== 'selection'">
            <el-radio
              v-if="table.firstColumn.type === 'radio'"
              v-model="radioVal"
              :label="scope.$index + 1"
              :disabled="scope.row.isRadioDisabled"
              @click="radioHandleChange(scope.row, scope.$index + 1)"
            ></el-radio>
            <template v-if="table.firstColumn.type === 'index'">
              <span v-if="isPaginationCumulative && isShowPagination">
                {{ (table.currentPage - 1) * table.pageSize + scope.$index + 1 }}
              </span>
              <span v-else>{{ scope.$index + 1 }}</span>
            </template>
            <template v-if="table.firstColumn.type === 'expand'">
              <slot name="expand" :scope="scope"></slot>
            </template>
          </template>
        </el-table-column>
      </template>
      <template v-if="Array.isArray(table.firstColumn)">
        <template v-for="(item, index) in table.firstColumn">
          <!-- 复选框 -->
          <el-table-column
            :key="index + 1"
            v-if="item.type === 'selection'"
            v-bind="{
              type: 'selection',
              width: item.width || 55,
              label: item.label,
              fixed: item.fixed,
              align: item.align || align,
              'reserve-selection': item.isPaging || false,
              selectable: item.selectable,
              ...item.bind
            }"
          />
          <el-table-column
            v-else
            :key="index + 'k'"
            v-bind="{
              type: item.type,
              width: item.width || 55,
              label:
                item.label ||
                (item.type === 'radio' && '单选') ||
                (item.type === 'index' && '序号') ||
                (item.type === 'expand' && '') ||
                '',
              fixed: item.fixed,
              align: item.align || align,
              ...item.bind
            }"
          >
            <template #default="scope" v-if="item.type !== 'selection'">
              <el-radio
                v-if="item.type === 'radio'"
                v-model="radioVal"
                :label="scope.$index + 1"
                :disabled="scope.row.isRadioDisabled"
                @click="radioHandleChange(scope.row, scope.$index + 1)"
              ></el-radio>
              <template v-if="item.type === 'index'">
                <span v-if="isPaginationCumulative && isShowPagination">
                  {{ (table.currentPage - 1) * table.pageSize + scope.$index + 1 }}
                </span>
                <span v-else>{{ scope.$index + 1 }}</span>
              </template>
              <template v-if="item.type === 'expand'">
                <slot name="expand" :scope="scope"></slot>
              </template>
            </template>
          </el-table-column>
        </template>
      </template>
      <!-- 主体内容 -->
      <template v-for="(item, index) in renderColumns">
        <template v-if="!item.children">
          <!-- 常规列 -->
          <el-table-column
            v-if="typeof item.isShowCol == 'function' ? item.isShowCol(item) : !item.isShowCol"
            :key="index + 'i'"
            :type="item.type"
            :label="item.label"
            :prop="item.prop"
            :min-width="item['min-width'] || item.minWidth"
            :width="item.width"
            :sortable="item.sortable || item.sort || sortable"
            :align="item.align || align"
            :fixed="item.fixed"
            v-bind="{ 'show-overflow-tooltip': true, ...item.bind, ...$attrs }"
          >
            <template #header v-if="item.headerRequired || item.renderHeader || item.isClickEdit">
              <render-header v-if="item.renderHeader" :column="item" :render="item.renderHeader" />
              <div style="display: inline" v-if="item.headerRequired">
                <span style="color: #f56c6c; font-size: 16px; margin-right: 3px">*</span>
                <span>{{ item.label }}</span>
              </div>
              <div
                v-if="item.isClickEdit"
                class="click_edit"
                :style="{ justifyContent: item.editIconAlign || align || 'center' }"
              >
                <span>{{ item.label }}</span>
                <el-icon v-if="!item.isShowEditIcon" v-bind="{ size: 14, ...item.editIconBind }">
                  <Edit />
                </el-icon>
              </div>
            </template>
            <template #default="scope">
              <!-- render渲染 -->
              <template v-if="item.render">
                <render-col
                  :column="item"
                  :row="scope.row"
                  :render="item.render"
                  :index="scope.$index"
                />
              </template>
              <!-- 自定义插槽 -->
              <template v-if="item.slotName">
                <slot :name="item.slotName" :scope="scope"></slot>
              </template>
              <!-- 单个单元格编辑 -->
              <template v-if="item.canEdit">
                <el-form
                  :model="state.tableData[scope.$index]"
                  :rules="isEditRules ? table.rules : {}"
                  class="t_edit_cell_form"
                  :class="{
                    t_edit_cell_form_rules: isEditRules
                  }"
                  :ref="(el:any) => handleRef(el, scope,item)"
                  @submit.prevent
                >
                  <single-edit-cell
                    :configEdit="item.configEdit"
                    v-model="scope.row[item.prop]"
                    :prop="item.prop"
                    :scope="scope"
                    :indexColumns="index"
                    :ref="(el:any) => handleEditTableRef(el, scope,item)"
                    @handleEvent="handleEvent($event, scope.$index)"
                    @keyup-handle="handleKeyup"
                    v-bind="$attrs"
                  >
                    <template v-for="(index, name) in slots" v-slot:[name]="data">
                      <slot :name="name" v-bind="data"></slot>
                    </template>
                  </single-edit-cell>
                </el-form>
              </template>
              <!-- 单击单元格编辑 -->
              <template v-if="item.isClickEdit">
                <single-edit
                  :isClickEdit="item.isClickEdit"
                  :configEdit="item.configEdit"
                  v-model="scope.row[scope.column.property]"
                  v-bind="$attrs"
                  ref="editClickCell"
                >
                  <template v-for="(index, name) in slots" v-slot:[name]="data">
                    <slot :name="name" v-bind="data"></slot>
                  </template>
                </single-edit>
              </template>
              <!-- 字典过滤 -->
              <template v-if="item.filters && item.filters.list">
                {{
                  constantEscape(
                    scope.row[item.prop],
                    table.listTypeInfo[item.filters.list],
                    item.filters.key || "value",
                    item.filters.label || "label"
                  )
                }}
              </template>
              <div
                v-if="
                  !item.render &&
                  !item.slotName &&
                  !item.canEdit &&
                  !item.filters &&
                  !item.isClickEdit
                "
              >
                <span>{{ scope.row[item.prop] }}</span>
              </div>
            </template>
          </el-table-column>
        </template>
        <!-- 表头合并单元格 -->
        <t-table-column v-else :key="index + 'm'" :item="item" :align="align" v-bind="$attrs">
          <template v-for="(index, name) in slots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
          </template>
        </t-table-column>
      </template>
      <slot></slot>
      <!-- 操作按钮 -->
      <el-table-column
        v-if="table.operator"
        :fixed="table.operatorConfig && table.operatorConfig.fixed"
        :label="(table.operatorConfig && table.operatorConfig.label) || '操作'"
        :min-width="table.operatorConfig && table.operatorConfig.minWidth"
        :width="table.operatorConfig && table.operatorConfig.width"
        :align="(table.operatorConfig && table.operatorConfig.align) || align"
        v-bind="table.operatorConfig && table.operatorConfig.bind"
        class-name="operator"
      >
        <template #default="scope">
          <div class="operator_btn" :style="table.operatorConfig && table.operatorConfig.style">
            <template v-for="(item, index) in table.operator" :key="index">
              <el-button
                @click="item.fun && item.fun(scope.row, scope.$index, state.tableData)"
                v-bind="{
                  type: 'primary',
                  link: true,
                  text: true,
                  size: 'small',
                  ...item.bind,
                  ...$attrs
                }"
                v-if="checkIsShow(scope, item)"
              >
                <!-- render渲染 -->
                <template v-if="item.render">
                  <render-col
                    :column="item"
                    :row="scope.row"
                    :render="item.render"
                    :index="scope.$index"
                  />
                </template>
                <span v-if="!item.render">{{ item.text }}</span>
              </el-button>
            </template>
          </div>
        </template>
      </el-table-column>
      <template v-for="(index, name) in slots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-if="state.tableData && state.tableData.length && isShowPagination"
      v-model:current-page="table.currentPage"
      @current-change="handlesCurrentChange"
      :page-sizes="table.pageSizes || [10, 20, 50, 100]"
      v-model:page-size="table.pageSize"
      :layout="table.layout || 'total,sizes, prev, pager, next, jumper'"
      :prev-text="table.prevText"
      :next-text="table.nextText"
      :total="table.total || 0"
      :size="table.size || 'small'"
      v-bind="$attrs"
      background
    >
      <slot name="pagination"></slot>
    </el-pagination>
    <!-- 表格底部按钮 -->
    <footer
      class="handle_wrap"
      :style="{ textAlign: footerBtnAlign as any }"
      v-if="isShowFooterBtn && state.tableData && state.tableData.length > 0"
    >
      <slot name="footer" />
      <div v-if="!slots.footer">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts" name="TTable">
import {
  computed,
  ref,
  watch,
  useSlots,
  reactive,
  onMounted,
  onUpdated,
  onBeforeUnmount
} from "vue"
import { ElMessage } from "element-plus"
import Sortable from "sortablejs"
import TTableColumn from "./TTableColumn.vue"
import SingleEditCell from "./singleEditCell.vue"
import SingleEdit from "./singleEdit.vue"
import ColumnSet from "./ColumnSet.vue"
import RenderCol from "./renderCol.vue"
import RenderHeader from "./renderHeader.vue"
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
import { useExpose } from "./useExpose"
const {
  TTable,
  clearSelection,
  getSelectionRows,
  toggleRowSelection,
  toggleAllSelection,
  toggleRowExpansion,
  setCurrentRow,
  clearSort,
  clearFilter,
  doLayout,
  sort,
  scrollTo,
  setScrollTop,
  setScrollLeft
} = useExpose()
import { tableProps } from "./tableProps"
const props = defineProps(tableProps)

// 初始化数据
let state = reactive({
  tableData: props.table.data,
  columnSet: [],
  copyTableData: [] // 键盘事件
})
// 单选框
const radioVal = ref<number | any>("")
// 判断单选选中及取消选中
const forbidden = ref(true)
// 获取t-table ref
const TTableBox = ref<HTMLElement | any>(null)
// 获取columnSet Ref
const columnSetRef = ref<HTMLElement | any>(null)
// 获取form ref
const formRef = ref({})
// 动态form ref
const handleRef = (
  el: any,
  scope: { $index: number; column: { property: string } },
  item: { prop: any }
) => {
  if (el) {
    formRef.value[`formRef-${scope.$index}-${item.prop || scope.column.property}`] = el
  }
}
// 获取所有单元格编辑组件 ref
const editTableRef: any = ref({})
// 动态单元格编辑组件 ref
const handleEditTableRef = (
  el: any,
  scope: { $index: number; column: { property: string } },
  item: { prop: any }
) => {
  if (el) {
    editTableRef.value[`singleEditRef-${scope.$index}-${item.prop || scope.column.property}`] = el
  }
}
// 抛出事件
const emits = defineEmits([
  "save",
  "page-change",
  "handleEvent",
  "radioChange",
  "rowSort",
  "validateError"
])
// 获取所有插槽
const slots = useSlots()
watch(
  () => props.table.data,
  val => {
    // console.log(111, val)
    if (props.useVirtual) {
      saveDATA.value = val
      updateRenderData(0)
    } else {
      state.tableData = val
    }
  },
  { deep: true }
)

onMounted(() => {
  // console.log('onMounted', props.table.firstColumn)
  // 设置默认选中项（单选）
  if (props.defaultRadioCol) {
    defaultRadioSelect(props.defaultRadioCol)
  }
  initSort()
  if (props.useVirtual) {
    saveDATA.value = props.table.data
    getDom()
    scrollContainerEl.value?.addEventListener("scroll", handleScroll)
  }
})
// 更新实际渲染数据
const updateRenderData = (scrollTop: number) => {
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
  // 渲染正确的数据
  updateRenderData(e.target.scrollTop)
  // console.log("滚动事件---handleScroll")
}
// 移除滚动事件
onBeforeUnmount(() => {
  // console.log("移除滚动事件")
  if (props.useVirtual) {
    scrollContainerEl.value?.removeEventListener("scroll", handleScroll)
  }
})
onUpdated(() => {
  TTable.value.doLayout()
})
// 默认选中（单选项）---index必须是大于等于1（且只能默认选中第一页的数据）
const defaultRadioSelect = (index: number | any) => {
  radioVal.value = index
  emits("radioChange", state.tableData[index - 1], radioVal.value)
}
// 行拖拽
const initSort = () => {
  if (!props.isRowSort) return
  const el = TTableBox.value?.querySelector(".el-table__body-wrapper tbody")
  // console.log('3333', el)
  const handle = props.isRowSortIcon ? ".row_drag" : ".el-table__row"
  Sortable.create(el, {
    animation: 150, // 动画
    handle, // 指定拖拽目标，点击此目标才可拖拽元素(此例中设置操作按钮拖拽)
    // filter: '.disabled', // 指定不可拖动的类名（el-table中可通过row-class-name设置行的class）
    // dragClass: 'dragClass', // 设置拖拽样式类名
    // ghostClass: 'ghostClass', // 设置拖拽停靠样式类名
    // chosenClass: 'chosenClass', // 设置选中样式类名
    onEnd: (evt: { oldIndex: any; newIndex: any }) => {
      const curRow = state.tableData.splice(evt.oldIndex, 1)[0]
      state.tableData.splice(evt.newIndex, 0, curRow)
      emits("rowSort", state.tableData)
    }
  })
}

// 过滤字典
/**
 * 下拉数据回显中文过滤器
 * @param [String,Number] value 需要转中文的key值
 * @param {String} list  数据源
 * @param [String,Number] key  数据源的key字段（默认：value）
 * @param {String} label  数据源的label字段（默认：label）
 */
const constantEscape = (value: any, list: any[], key: string | number, label: string | number) => {
  const res = list.find(item => {
    return item[key] === value
  })
  return res && res[label]
}
// // 第一列单选显示类
const radioStyleClass = computed(() => {
  if (Array.isArray(props.table.firstColumn)) {
    return props.table.firstColumn.some((item: { type: string }) => item.type === "radio")
  } else {
    return props.table.firstColumn && props.table.firstColumn.type === "radio"
  }
})
// 单元格编辑是否存在校验
const isEditRules = computed(() => {
  return (
    (props.table.rules && Object.keys(props.table.rules).length > 0) ||
    props.columns.some((item: any) => item?.configEdit?.rules)
  )
})
// 所有列（表头数据）
const renderColumns = computed(() => {
  if (state.columnSet.length === 0) {
    return props.columns
  }
  const columnByProp: any = props.columns.reduce((acc: any, cur: any) => {
    acc[cur.prop] = cur
    return acc
  }, {})
  return state.columnSet.filter((cur: any) => !cur.hidden).map((cur: any) => columnByProp[cur.prop])
})

// 判断是否是多级表头
const isTableHeader = computed(() => {
  return renderColumns.value.some((item: any) => item.children)
})
// 判断如果有表头合并就自动开启单元格缩放
const isTableBorder = computed(() => {
  return props.columns.some((item: any) => item.children)
})
// 单元格编辑键盘事件
const handleKeyup = (event: { keyCode: number }, index: number, key: string) => {
  if (!props.isKeyup) return
  const copyTableData = JSON.parse(JSON.stringify(state.tableData))
  const doms = document.getElementsByClassName(key)
  const focusNextElement = (nextIndex: number) => {
    const nextDom =
      doms[nextIndex]?.getElementsByTagName("input")[0] ||
      doms[nextIndex]?.getElementsByTagName("textarea")[0]
    if (nextDom) nextDom.focus()
  }
  switch (event.keyCode) {
    case 38: // 向上键
      if (!index) index = copyTableData.length
      focusNextElement(index - 1)
      break
    case 40: // 向下键
      if (index === copyTableData.length - 1) index = -1
      focusNextElement(index + 1)
      break
    case 13: // 回车键
      let keyName = props.columns.map((val: any) => val.prop)
      let num = keyName.indexOf(key)
      if (num === -1) {
        num = 0
      } else if (num === keyName.length - 1) {
        if (index === state.copyTableData.length - 1) {
          index = 0
        } else {
          ++index
        }
      } else {
        ++num
      }
      let doms = document.getElementsByClassName(keyName[num])
      if (doms.length) {
        let dom =
          doms[index].getElementsByTagName("input")[0] ||
          doms[index].getElementsByTagName("textarea")[0]
        dom.focus()
      }
      break
  }
}

// forbidden取值（选择单选或取消单选）
const isForbidden = () => {
  forbidden.value = false
  setTimeout(() => {
    forbidden.value = true
  }, 0)
}
// 单选抛出事件radioChange
const radioClick = (row: any, index: any) => {
  forbidden.value = !forbidden.value
  const isCurrentlySelected = radioVal.value === index
  if (isCurrentlySelected) {
    radioVal.value = null
  } else {
    radioVal.value = index
  }
  isForbidden()
  emits("radioChange", radioVal.value ? row : null, radioVal.value)
}

// 点击单选框单元格触发事件
const radioHandleChange = (row: any, index: any) => {
  if (row?.isRadioDisabled) return
  if (props.rowClickRadio) {
    return
  }
  radioClick(row, index)
}
// 点击某行事件
const rowClick = (row: any) => {
  if (row.isRadioDisabled) return
  if (!props.rowClickRadio) {
    return
  }
  radioClick(row, state.tableData.indexOf(row) + 1)
}
// 清除单选框选中状态
const clearRadioHandle = () => {
  radioVal.value = null
  TTable.value.setCurrentRow(-1)
}
// 复制内容
const copyDomText = (val: any) => {
  // 获取需要复制的元素以及元素内的文本内容
  const text = val
  // 添加一个input元素放置需要的文本内容
  const input = document.createElement("input")
  input.value = text
  document.body.appendChild(input)
  // 选中并复制文本到剪切板
  input.select()
  document.execCommand("copy")
  // 移除input元素
  document.body.removeChild(input)
}
// 双击复制单元格内容
const cellDblclick = (row: { [x: string]: any }, column: { property: string | number }) => {
  if (!props.isCopy) {
    return false
  }
  try {
    copyDomText(row[column.property])
    ElMessage.success("复制成功")
  } catch (e) {
    ElMessage.error("复制失败")
  }
}
// 判断是否使用了某个插槽
const isShow = (name: string) => {
  return Object.keys(slots).includes(name)
}

// 整行编辑返回数据
const save = () => {
  if (!isEditRules.value) {
    emits("save", state.tableData)
    return
  }
  // 表单规则校验
  let successLength = 0
  let rulesList: any = []
  let rulesError: any = []
  let propError: any = []
  let propLabelError: any = []
  // 获取所有的form ref
  const refList = Object.keys(formRef.value).filter(item => item.includes("formRef"))
  // 获取单独设置规则项
  const arr = renderColumns.value
    .filter((val: { configEdit: { rules: any } }) => {
      if (val.configEdit?.rules) {
        return val
      }
    })
    .map((item: { prop: any }) => item.prop)
  // 获取整体设置规则
  const arr1 = props.table.rules && Object.keys(props.table.rules)
  // 获取最终设置了哪些规则（其值是设置的--prop）
  const newArr = [...arr, ...arr1]
  // 最终需要校验的ref
  newArr.map(val => {
    refList.map((item: any) => {
      if (item.includes(val)) {
        rulesList.push(item)
      }
    })
  })
  // console.log('最终需要校验的数据', rulesList, formRef.value)
  // 表单都校验
  rulesList.map((val: string | number) => {
    formRef.value[val].validate((valid: any) => {
      if (valid) {
        successLength = successLength + 1
      } else {
        rulesError.push(val)
      }
    })
  })
  setTimeout(() => {
    // 所有表单都校验成功
    if (successLength == rulesList.length) {
      if (isEditRules.value) {
        // console.log('所有表单都校验成功--', state.tableData)
        emits("save", state.tableData)
      }
    } else {
      // 校验未通过的prop
      rulesError.map((item: string | any[]) => {
        newArr.map(val => {
          if (item.includes(val)) {
            propError.push(val)
          }
        })
      })
      // 去重获取校验未通过的prop--label
      Array.from(new Set(propError)).map(item => {
        renderColumns.value.map((val: { prop: unknown; label: any }) => {
          if (item === val.prop) {
            propLabelError.push(val.label)
          }
        })
      })
      console.log("校验未通过的prop--label", propLabelError)
      emits("validateError", propLabelError)
    }
  }, 300)
}
// 是否显示表格操作按钮
const checkIsShow = (
  scope: { row: { [s: string]: unknown } | ArrayLike<unknown> | any },
  item: {
    noshow: any
    show: { val: string | any[]; key: string | number }
    hasPermi: any
    field: string | number
    isField: string | number
  }
) => {
  let isNoshow = false
  if (item.noshow) {
    // 解决双重判断循环递归
    let nushowFun = JSON.parse(JSON.stringify(item.noshow))
    // 双重判断
    nushowFun.map((rs: { isShow: string; val: string | any[]; key: string | number }) => {
      rs.isShow =
        typeof rs.val === "string"
          ? rs.val === "isHasVal"
            ? scope.row[rs.key]
              ? "true"
              : "false"
            : "true"
          : rs.val.includes(scope.row[rs.key])
          ? "false"
          : "true"
    })
    isNoshow = nushowFun.every((key: { isShow: string }) => {
      return key.isShow === "true"
    })
  } else {
    isNoshow = true
  }
  // 单独判断
  let isShow = !item.show || item.show.val.includes(scope.row[item.show.key])
  // 按钮权限
  let isPermission = item.hasPermi ? props.btnPermissions?.includes(item.hasPermi) : true
  // table页面合计
  let totalTxt = Object.values(scope.row).every(key => {
    return key !== "当页合计"
  })
  // table页面合计
  let totalTxt1 = Object.values(scope.row).every(key => {
    return key !== "全部合计"
  })
  return (
    isShow &&
    isNoshow &&
    !scope.row[item.field] &&
    (item.isField ? scope.row[item.isField] : true) &&
    totalTxt &&
    totalTxt1 &&
    isPermission
  )
}
// 单个编辑事件
const handleEvent = ({ type, val }: any, index: any) => {
  emits("handleEvent", type, val, index)
}
// 当前页码
const handlesCurrentChange = (val: any) => {
  emits("page-change", val)
}
/**
 * 公共方法
 */
// 单元格编辑调用save方法返回数据
const saveMethod = (callback: (arg0: any) => any) => {
  if (!isEditRules.value) {
    callback && callback(state.tableData)
    return
  }
  // 表单规则校验
  let successLength = 0
  let rulesList: any = []
  let rulesError: any = []
  let propError: any = []
  let propLabelError: any = []
  // 获取所有的form ref
  const refList = Object.keys(formRef.value).filter(item => item.includes("formRef"))
  // 获取单独设置规则项
  const arr = renderColumns.value
    .filter((val: { configEdit: { rules: any } }) => {
      if (val.configEdit?.rules) {
        return val
      }
    })
    .map((item: { prop: any }) => item.prop)
  // 获取整体设置规则
  const arr1 = props.table.rules && Object.keys(props.table.rules)
  // 获取最终设置了哪些规则（其值是设置的--prop）
  const newArr = [...arr, ...arr1]
  // 最终需要校验的ref
  newArr.map(val => {
    refList.map((item: any) => {
      if (item.includes(val)) {
        rulesList.push(item)
      }
    })
  })
  // console.log('最终需要校验的数据', rulesList, formRef.value)
  // 表单都校验
  rulesList.map((val: string | number) => {
    formRef.value[val].validate((valid: any) => {
      if (valid) {
        successLength = successLength + 1
      } else {
        rulesError.push(val)
      }
    })
  })
  setTimeout(() => {
    // 所有表单都校验成功
    if (successLength == rulesList.length) {
      if (isEditRules.value) {
        // console.log('所有表单都校验成功--', state.tableData)
        callback && callback(state.tableData)
      }
    } else {
      // 校验未通过的prop
      rulesError.map((item: string | any[]) => {
        newArr.map(val => {
          if (item.includes(val)) {
            propError.push(val)
          }
        })
      })
      // 去重获取校验未通过的prop--label
      Array.from(new Set(propError)).map(item => {
        renderColumns.value.map((val: { prop: unknown; label: any }) => {
          if (item === val.prop) {
            propLabelError.push(val.label)
          }
        })
      })
      console.log("校验未通过的prop--label", propLabelError)
      emits("validateError", propLabelError)
    }
  }, 300)
}
// 清空校验规则
const clearValidate = () => {
  const refList = Object.keys(formRef.value).filter(item => item.includes("formRef"))
  refList.length > 0 &&
    refList.map(val => {
      formRef.value[val].clearValidate()
    })
}
// 表单进行重置并移除校验结果
const resetFields = () => {
  const refList = Object.keys(formRef.value).filter(item => item.includes("formRef"))
  refList.length > 0 &&
    refList.map(val => {
      formRef.value[val].resetFields()
    })
  // 重置下拉表格
  const refEditList = Object.keys(editTableRef.value).filter(item => item.includes("singleEditRef"))
  refEditList.length > 0 &&
    refEditList.map(val => {
      editTableRef.value[val].resetTselectTableFields()
    })
}
// 重置下拉表格--单元格编辑
const resetTselectTable = () => {
  // 重置下拉表格
  const refEditList = Object.keys(editTableRef.value).filter(item => item.includes("singleEditRef"))
  refEditList.length > 0 &&
    refEditList.map(val => {
      editTableRef.value[val].resetTselectTableFields()
    })
}
// 获取columnSet缓存数据
const reSetColumnSet = () => {
  return columnSetRef.value?.reSetColumnSet()
}
// 暴露方法出去
defineExpose({
  defaultRadioSelect,
  clearSelection,
  getSelectionRows,
  toggleRowSelection,
  toggleAllSelection,
  toggleRowExpansion,
  setCurrentRow,
  clearSort,
  clearFilter,
  doLayout,
  sort,
  scrollTo,
  setScrollTop,
  setScrollLeft,
  state,
  radioVal,
  clearValidate,
  resetFields,
  saveMethod,
  reSetColumnSet,
  clearRadioHandle,
  resetTselectTable
})
</script>
<style lang="scss" scoped>
.t-table {
  z-index: 0;
  background-color: var(--el-bg-color);
  :deep(.el-table__header-wrapper) {
    .el-table__header {
      margin: 0;
    }
  }
  :deep(.el-table__body-wrapper) {
    .el-table__body {
      margin: 0;
    }
  }
  :deep(.el-pagination) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
    // margin-right: 60px;
    margin-right: calc(2% - 20px);
    background-color: var(--el-bg-color);
  }
  // ttable过长省略号
  .el-table {
    .el-tooltip {
      div {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }
      .single_edit_cell {
        overflow: visible;
        margin-bottom: 0;
      }
    }
  }
  // 多级表头过长省略号
  .multile_head_column {
    :deep(.el-table__row) {
      .el-tooltip {
        div {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
        }
      }
    }
  }
  // 单元格编辑且无规则校验
  .el-table {
    .cell {
      div {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
      }
      .single_edit_cell {
        overflow: visible;
        margin-bottom: 0;
      }
    }
  }
  // 单元格编辑有规则校验
  .el-table {
    .cell {
      .t_edit_cell_form_rules {
        .single_edit_cell {
          margin-bottom: 15px;
        }
      }
    }
  }
  .el-table {
    .cell {
      .click_edit {
        display: flex;
        align-items: center;
        line-height: 1;
        .el-icon {
          margin-left: 2px;
        }
      }
    }
  }
  .el-table th,
  .el-table td {
    padding: 8px 0;
  }

  .el-table--border th:first-child .cell,
  .el-table--border td:first-child .cell {
    padding-left: 5px;
  }

  .el-table .cell {
    padding: 0 5px;
  }

  .el-table--scrollable-y .el-table__fixed-right {
    right: 8px !important;
  }

  .header_wrap {
    display: flex;
    align-items: center;

    .toolbar_top {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .toolbar {
        display: flex;
        justify-content: flex-end;
        width: 100%;
      }

      .el-button--small {
        height: 32px;
      }

      .el-button--success {
        background-color: #355db4;
        border: 1px solid #355db4;
      }
    }

    .header_title {
      display: flex;
      align-items: center;
      flex: 1;
      font-size: 16px;
      font-weight: bold;
      line-height: 35px;
      margin-left: 10px;
      color: var(--el-text-color-primary);
    }
  }
  .title-tip {
    display: flex;
    align-items: center;
    padding-left: 10px;
    font-size: 14px;
  }

  .marginBttom {
    margin-bottom: -8px;
  }

  // 单选样式
  .radioStyle {
    :deep(.el-radio) {
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

  // 复制功能样式
  .cursor {
    :deep(tbody) {
      .el-table__row {
        cursor: pointer;
      }
    }
  }
  // 行拖动
  .row_sort {
    :deep(tbody) {
      .el-table__row {
        cursor: move;
      }
    }
  }
  .row_sort_none {
    :deep(tbody) {
      .el-table__row {
        cursor: default;
      }
      .row_drag {
        cursor: move;
      }
    }
  }

  // 每行高度设置
  .el-table {
    .el-table__body {
      .el-table__row {
        :deep(.el-table__cell) {
          padding: 8px 0;

          .cell {
            min-height: 32px;
            line-height: 32px;
            // display: flex;
            // align-items: center;
            // justify-content: center;
          }
        }
      }
    }
  }
  // treeTable样式
  .tree_style {
    :deep(.el-table__body-wrapper) {
      .el-table__body {
        .cell {
          display: flex;
          align-items: center;
          .el-table__expand-icon {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
  // 页面缓存时，表格内操作栏每行高度撑满
  // :deep(.el-table__fixed-right) {
  //   height: 100% !important;
  // }

  // 选中行样式
  .highlightCurrentRow {
    :deep(.current-row) {
      color: var(--el-color-primary);
      cursor: pointer;
      background-color: #355db4 !important;
    }
  }

  .el-table--scrollable-y .el-table__body-wrapper {
    overflow-x: auto;
  }

  .handle_wrap {
    position: sticky;
    z-index: 10;
    right: 0;
    bottom: -8px;
    margin: 0 -8px -8px;
    padding: 12px 16px;
    background-color: var(--el-bg-color);
    border-top: 1px solid var(--el-table-border);

    .el-btn {
      margin-left: 8px;
    }
  }
}
</style>
