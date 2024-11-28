import type { PropType, ExtractPropTypes } from "vue"
export const tableProps = {
  // table所需数据
  table: {
    type: Object,
    default: () => {
      return {}
    },
    required: true
  },
  // 表头数据
  columns: {
    type: Array,
    default: () => {
      return []
    }
    // required: true
  },
  // 按钮权限数据集
  btnPermissions: {
    type: Array,
    default: () => {
      return []
    }
  },
  // 表格标题
  title: {
    type: String
  },
  tableTitle: String,
  // table对齐方式
  align: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center'
  },
  // 是否开启Tree-table
  isTree: {
    type: Boolean,
    default: false
  },
  // 是否开启行拖拽
  isRowSort: {
    type: Boolean,
    default: false
  },
  // 开启行拖拽，第一列是否显示拖拽图标
  isRowSortIcon: {
    type: Boolean,
    default: false
  },
  // 显示拖拽列的配置
  rowSortIconBind: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 是否复制单元格
  isCopy: {
    type: Boolean,
    default: false
  },
  // 是否开启点击整行选中单选框
  rowClickRadio: {
    type: Boolean,
    default: true
  },
  // 设置默认选中项（单选）defaultRadioCol值必须大于0！
  defaultRadioCol: Number,
  // 序列号显示是否分页累加
  isPaginationCumulative: {
    type: Boolean,
    default: false
  },
  // 是否显示分页
  isShowPagination: {
    type: Boolean,
    default: true
  },
  // 是否开启编辑保存按钮
  isShowFooterBtn: {
    type: Boolean,
    default: false
  },
  // 是否显示设置（隐藏/显示列）
  columnSetting: {
    type: Boolean,
    default: false
  },
  // 是否高亮选中行
  highlightCurrentRow: {
    type: Boolean,
    default: false
  },
  // 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
  sortable: {
    type: [Boolean, String]
  },
  // 单元格编辑是否开启键盘事件
  isKeyup: {
    type: Boolean,
    default: false
  },
  // TAdaptivePage组件是否使用了Toolbar插槽
  isSlotToolbar: Boolean,
  // TAdaptivePage组件是否使用了title插槽
  isSlotTitle: Boolean,
  // 是否开启边框
  border: {
    type: Boolean,
    default: false
  },
  // table loading
  tableLoading: {
    type: Boolean,
    default: false
  },
  loadingTxt: {
    type: String,
    default: "加载中..."
  },
  // 是否开启虚拟列表
  useVirtual: Boolean,
  // 虚拟列表的渲染行数
  virtualShowSize: {
    type: Number,
    default: 30
  },
  footerBtnAlign: {
    type: String,
    default: "right"
  }
}

export type TTableProps = ExtractPropTypes<typeof tableProps>