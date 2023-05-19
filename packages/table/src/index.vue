<template>
  <div class="t-table">
    <div class="header_wrap">
      <div class="header_title">
        {{ title }}
        <slot name="title" />
      </div>
      <div class="toolbar_top">
        <!-- 表格外操作 -->
        <slot name="toolbar"></slot>
        <!--列设置按钮-->
        <div
          class="header_right_wrap"
          :style="{ marginLeft: isShow('toolbar') ? '12px' : 0 }"
        >
          <slot name="btn" />
          <column-set
            v-if="columnSetting"
            v-bind="$attrs"
            :columns="renderColumns"
            @columnSetting="(v) => (state.columnSet = v)"
          />
        </div>
      </div>
    </div>
    <el-table
      ref="TTable"
      :data="state.tableData"
      :class="{
        cursor: isCopy,
        highlightCurrentRow: highlightCurrentRow,
        radioStyle: table.firstColumn && table.firstColumn.type === 'radio',
      }"
      v-bind="$attrs"
      size="default"
      :highlight-current-row="highlightCurrentRow"
      :border="table.border || isTableBorder"
      @cell-dblclick="cellDblclick"
      @row-click="rowClick"
      :cell-class-name="cellClassNameFuc"
    >
      <!-- 复选框/单选框/序列号 -->
      <template v-if="table.firstColumn">
        <!-- 复选框 -->
        <el-table-column
          v-if="table.firstColumn.type === 'selection'"
          :type="table.firstColumn.type"
          :width="table.firstColumn.width || 55"
          :reserve-selection="table.firstColumn.isPaging || false"
          :label="table.firstColumn.label"
          :align="table.firstColumn.align || 'center'"
          :fixed="table.firstColumn.fixed"
          v-bind="$attrs"
        ></el-table-column>
        <!-- 单选框 -->
        <el-table-column
          :type="table.firstColumn.type"
          :width="table.firstColumn.width || 55"
          :label="table.firstColumn.label"
          :fixed="table.firstColumn.fixed"
          :align="table.firstColumn.align || 'center'"
          v-if="table.firstColumn.type === 'radio'"
        >
          <template #default="scope">
            <el-radio
              v-model="radioVal"
              :label="scope.$index + 1"
              @click.stop="radioChange($event, scope.row, scope.$index + 1)"
            ></el-radio>
          </template>
        </el-table-column>
        <!-- 序列号 -->
        <el-table-column
          :type="table.firstColumn.type"
          :width="table.firstColumn.width || 55"
          :label="table.firstColumn.label || '序号'"
          :fixed="table.firstColumn.fixed"
          :align="table.firstColumn.align || 'center'"
          v-if="table.firstColumn.type === 'index'"
          v-bind="$attrs"
        >
          <template #default="scope">
            <span>
              {{
                isShowPagination
                  ? (table.currentPage - 1) * table.pageSize + scope.$index + 1
                  : scope.$index + 1
              }}
            </span>
          </template>
        </el-table-column>
      </template>
      <!-- 主体内容 -->
      <template v-for="(item, index) in renderColumns">
        <template v-if="!item.children">
          <!-- 常规列 -->
          <el-table-column
            v-if="item.isShowCol === false ? item.isShowCol : true"
            :key="index + 'i'"
            :type="item.type"
            :label="item.label"
            :prop="item.prop"
            :min-width="item['min-width'] || item.minWidth || item.width"
            :sortable="item.sort || sortable"
            :align="item.align || 'center'"
            :fixed="item.fixed"
            :show-overflow-tooltip="
              item.noShowTip === false ? item.noShowTip : true
            "
            v-bind="{ ...item.bind, ...$attrs }"
          >
            <template #header v-if="item.renderHeader">
              <render-header :column="item" :render="item.renderHeader" />
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
                <single-edit-cell
                  :canEdit="item.canEdit"
                  :configEdit="item.configEdit"
                  v-model="scope.row[scope.column.property]"
                  :prop="item.prop"
                  :scope="scope"
                  @handleEvent="handleEvent($event, scope.$index)"
                  @keyup-handle="handleKeyup"
                  v-bind="$attrs"
                  ref="editCell"
                >
                  <slot
                    v-if="item.configEdit && item.configEdit.editSlotName"
                    :name="item.configEdit.editSlotName"
                    :scope="scope"
                  />
                </single-edit-cell>
              </template>
              <!-- 字典过滤 -->
              <template v-if="item.filters && item.filters.list">
                {{
                  constantEscape(
                    scope.row[item.prop],
                    table.listTypeInfo[item.filters.list],
                    item.filters.key || 'value',
                    item.filters.label || 'label'
                  )
                }}
              </template>
              <div
                v-if="
                  !item.render &&
                  !item.slotName &&
                  !item.canEdit &&
                  !item.filters
                "
              >
                <span>{{ scope.row[item.prop] }}</span>
              </div>
            </template>
          </el-table-column>
        </template>
        <!-- 表头合并单元格 -->
        <t-table-column v-else :key="index + 'm'" :item="item" />
      </template>
      <slot></slot>
      <!-- 操作按钮 -->
      <el-table-column
        v-if="table.operator"
        :fixed="table.operatorConfig && table.operatorConfig.fixed"
        :label="(table.operatorConfig && table.operatorConfig.label) || '操作'"
        :min-width="
          (table.operatorConfig &&
            (table.operatorConfig.width || table.operatorConfig.minWidth)) ||
          100
        "
        :align="
          (table.operatorConfig && table.operatorConfig.align) || 'center'
        "
        class-name="operator"
      >
        <template #default="scope">
          <div
            class="operator_btn"
            :style="table.operatorConfig && table.operatorConfig.style"
          >
            <template v-for="(item, index) in table.operator" :key="index">
              <el-button
                @click="
                  item.fun && item.fun(scope.row, scope.$index, state.tableData)
                "
                :type="item.type ? item.type : 'primary'"
                link
                :style="item.style ? item.style : ''"
                :icon="item.icon ? item.icon : ''"
                :disabled="item.disabled"
                :size="item.size ? item.size : 'small'"
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
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-if="state.tableData && state.tableData.length && isShowPagination"
      small
      v-model:current-page="table.currentPage"
      @current-change="handlesCurrentChange"
      :page-sizes="[10, 20, 50, 100]"
      v-model:page-size="table.pageSize"
      layout="total,sizes, prev, pager, next, jumper"
      :total="table.total || 0"
      v-bind="$attrs"
      background
    ></el-pagination>
    <!-- 表格底部按钮 -->
    <footer
      class="handle_wrap"
      v-if="isShowFooterBtn && state.tableData && state.tableData.length > 0"
    >
      <slot name="footer" />
      <div v-if="!$slots.footer">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </footer>
  </div>
</template>
<script lang="ts">
export default {
  name: 'TTable',
}
</script>
<script setup lang="ts">
import { computed, ref, watch, useSlots, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
// import store from '@/store'
import SingleEditCell from './singleEditCell.vue'
import ColumnSet from './ColumnSet.vue'
import RenderCol from './renderCol.vue'
import RenderHeader from './renderHeader.vue'
import TTableColumn from './TTableColumn.vue'
const props = defineProps({
  // table所需数据
  table: {
    type: Object,
    default: () => {
      return {}
    },
    required: true,
  },
  // 表头数据
  columns: {
    type: Array,
    default: () => {
      return []
    },
    // required: true
  },
  // 表格标题
  title: {
    type: String,
  },
  // 是否复制单元格
  isCopy: {
    type: Boolean,
    default: false,
  },
  // 是否开启点击整行选中单选框
  rowClickRadio: {
    type: Boolean,
    default: true,
  },
  // 是否显示分页
  isShowPagination: {
    type: Boolean,
    default: true,
  },
  // 是否开启编辑保存按钮
  isShowFooterBtn: {
    type: Boolean,
    default: false,
  },
  // 是否显示设置（隐藏/显示列）
  columnSetting: {
    type: Boolean,
    default: false,
  },
  // 是否高亮选中行
  highlightCurrentRow: {
    type: Boolean,
    default: false,
  },
  // 是否开启合计行隐藏复选框/单选框/序列
  isTableColumnHidden: {
    type: Boolean,
    default: false,
  },
  // 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
  sortable: {
    type: [Boolean, String],
  },
  // 单元格编辑是否开启键盘事件
  isKeyup: {
    type: Boolean,
    default: false,
  },
})
// 初始化数据
let state = reactive({
  tableData: props.table.data,
  columnSet: [],
  copyTableData: [], // 键盘事件
})
// 单选框
const radioVal = ref(null)
// 判断单选选中及取消选中
const forbidden = ref(true)
// 获取ref
const TTable: any = ref<HTMLElement | null>(null)
// 抛出事件
const emits = defineEmits(['save', 'page-change', 'handleEvent', 'radioChange'])
// 获取所有插槽
const slots = useSlots()
watch(
  () => props.table.data,
  (val) => {
    // console.log(111, val)
    state.tableData = val
  },
  { deep: true }
)
onMounted(() => {
  // console.log('onMounted', props.table.firstColumn)
})
// 按钮权限
// const btnPremissions = computed(() => {
//   // return store.getters.permissions
//   // return store.getters.permissions
// })
// 过滤字典
/**
 * 下拉数据回显中文过滤器
 * @param [String,Number] value 需要转中文的key值
 * @param {String} list  数据源
 * @param [String,Number] key  数据源的key字段（默认：value）
 * @param {String} label  数据源的label字段（默认：label）
 */
const constantEscape = (value, list, key, label) => {
  const res = list.find((item) => {
    return item[key] === value
  })
  return res && res[label]
}
// 所有列（表头数据）
const renderColumns = computed(() => {
  return state.columnSet.length > 0
    ? state.columnSet.reduce((acc: any, cur: any) => {
        if (!cur.hidden) {
          let columnByProp: any = props.columns.reduce((acc: any, cur: any) => {
            acc[cur.prop] = cur
            return acc
          }, {})
          acc.push(columnByProp[cur.prop])
        }
        // console.log('columnSet', acc)
        return acc
      }, [])
    : props.columns
})
// 判断如果有表头合并就自动开启单元格缩放
const isTableBorder = computed(() => {
  return props.columns.some((item: any) => item.children)
})
// 单元格编辑键盘事件
const handleKeyup = (event, index, key) => {
  if (!props.isKeyup) return
  state.copyTableData = JSON.parse(JSON.stringify(state.tableData))
  // 向上键
  if (event.keyCode === 38) {
    let doms = document.getElementsByClassName(key)
    if (!index) {
      index = state.copyTableData.length
    }
    if (doms.length) {
      let dom
      if (doms[index - 1].getElementsByTagName('input')[0]) {
        dom = doms[index - 1].getElementsByTagName('input')[0]
      } else {
        dom = doms[index - 1].getElementsByTagName('textarea')[0]
      }
      dom.focus()
      // dom.select()
    }
  }
  // 向下键
  if (event.keyCode === 40) {
    let doms = document.getElementsByClassName(key)
    if (+index === state.copyTableData.length - 1) {
      index = -1
    }
    if (doms.length) {
      let dom
      if (doms[index + 1].getElementsByTagName('input')[0]) {
        dom = doms[index + 1].getElementsByTagName('input')[0]
      } else {
        dom = doms[index + 1].getElementsByTagName('textarea')[0]
      }
      dom.focus()
      // dom.select()
    }
  }
  // 回车横向 向右移动
  if (event.keyCode === 13) {
    let keyName = props.columns.map((val: any) => val.prop)
    let num = 0
    if (key === keyName[keyName.length - 1]) {
      if (index === state.copyTableData.length - 1) {
        index = 0
      } else {
        ++index
      }
    } else {
      keyName.map((v, i) => {
        if (v === key) {
          num = i + 1
        }
      })
    }
    let doms = document.getElementsByClassName(keyName[num])
    if (doms.length) {
      let dom
      if (doms[index].getElementsByTagName('input')[0]) {
        dom = doms[index].getElementsByTagName('input')[0]
      } else {
        dom = doms[index].getElementsByTagName('textarea')[0]
      }
      dom.focus()
      // dom.select()
    }
  }
}
// 合并行隐藏复选框/单选框
const cellClassNameFuc = ({ row }) => {
  if (!props.isTableColumnHidden) {
    return false
  }
  if (
    state.tableData.length -
      (state.tableData.length - props.table.pageSize < 0
        ? 1
        : state.tableData.length - props.table.pageSize) <=
    row.rowIndex
  ) {
    return 'table_column_hidden'
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
const radioClick = (row, index) => {
  forbidden.value = !!forbidden.value
  if (radioVal.value) {
    if (radioVal.value === index) {
      radioVal.value = null
      isForbidden()
      // 取消勾选就把回传数据清除
      emits('radioChange', null, radioVal.value)
    } else {
      isForbidden()
      radioVal.value = index
      emits('radioChange', row, radioVal.value)
    }
  } else {
    isForbidden()
    radioVal.value = index
    emits('radioChange', row, radioVal.value)
  }
}
// 点击单选框单元格触发事件
const radioChange = (e, row, index) => {
  e.preventDefault()
  radioClick(row, index)
}
// 点击某行事件
const rowClick = (row) => {
  if (props.rowClickRadio) {
    radioClick(row, state.tableData.indexOf(row) + 1)
  }
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
  if (!props.isCopy) {
    return false
  }
  try {
    copyDomText(row[column.property])
    ElMessage.success('复制成功')
  } catch (e) {
    ElMessage.error('复制失败')
  }
}
// 判断是否使用漏了某个插槽
const isShow = (name) => {
  return Object.keys(slots).includes(name)
}
// 整行编辑返回数据
const save = () => {
  emits('save', state.tableData)
  return state.tableData
}
// 是否显示表格操作按钮
const checkIsShow = (scope, item) => {
  let isNoshow = false
  if (item.noshow) {
    // 解决双重判断循环递归
    let nushowFun = JSON.parse(JSON.stringify(item.noshow))
    // 双重判断
    nushowFun.map((rs) => {
      rs.isShow =
        typeof rs.val === 'string'
          ? rs.val === 'isHasVal'
            ? scope.row[rs.key]
              ? 'true'
              : 'false'
            : 'true'
          : rs.val.includes(scope.row[rs.key])
          ? 'false'
          : 'true'
    })
    isNoshow = nushowFun.every((key) => {
      return key.isShow === 'true'
    })
  } else {
    isNoshow = true
  }
  // 单独判断
  let isShow = !item.show || item.show.val.includes(scope.row[item.show.key])
  // 按钮权限
  // let isPermission = item.hasPermi ? btnPremissions.value.includes(item.hasPermi) : true
  // table页面合计
  let totalTxt = Object.values(scope.row).every((key) => {
    return key !== '当页合计'
  })
  // table页面合计
  let totalTxt1 = Object.values(scope.row).every((key) => {
    return key !== '全部合计'
  })
  return (
    isShow &&
    isNoshow &&
    !scope.row[item.field] &&
    (item.isField ? scope.row[item.isField] : true) &&
    totalTxt &&
    totalTxt1
  )
}
// 单个编辑事件
const handleEvent = ({ type, val }, index) => {
  emits('handleEvent', type, val, index)
}
// 当前页码
const handlesCurrentChange = (val) => {
  emits('page-change', val)
}
/**
 * 公共方法
 */
// 清空排序条件
const clearSort = () => {
  return TTable.value.clearSort()
}
// 取消某一项选中项
const toggleRowSelection = (row, selected = false) => {
  return TTable.value.toggleRowSelection(row, selected)
}
// 全部选中
const toggleAllSelection = () => {
  return TTable.value.toggleAllSelection()
}
// 清空复选框
const clearSelection = () => {
  return TTable.value.clearSelection()
}
// 暴露方法出去
defineExpose({
  clearSelection,
  toggleRowSelection,
  toggleAllSelection,
  clearSort,
  state,
  radioVal,
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
    margin-top: 20px;
    // margin-right: 60px;
    margin-right: calc(2% - 20px);
    background-color: var(--el-bg-color);
  }

  // 某行隐藏复选框/单选框
  .el-table {
    .el-table__row {
      :deep(.table_column_hidden) {
        .cell {
          .el-radio__input,
          .el-checkbox__input {
            display: none;
          }

          & > span {
            display: none;
          }
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
      flex: 0 70%;
      display: flex;
      padding: 10px 0;
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
      flex: 0 30%;
      padding: 10px 0;
      font-size: 16px;
      font-weight: bold;
      line-height: 35px;
      margin-left: 10px;
      color: var(--el-text-color-primary);
    }
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

  .operator {
    // 操作样式
    .operator_btn {
      .el-button {
        margin: 0;
        margin-right: 10px;
      }
    }
  }

  // 页面缓存时，表格内操作栏每行高度撑满
  :deep(.el-table__fixed-right) {
    height: 100% !important;
  }

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
    border-top: 1px solid #ebeef5;
    text-align: right;

    .el-btn {
      margin-left: 8px;
    }
  }
}
</style>
