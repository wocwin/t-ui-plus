import type { PropType, ExtractPropTypes } from "vue"
export const selectTableProps = {
  // input输入框的值（modelValue）
  inputValue: {
    type: [Array, String, Number, Boolean, Object],
    default: undefined
  },
  modelValue: {
    type: [Array, String, Number, Boolean, Object],
    default: undefined
  },
  // 是否显示input框回显
  isShowInput: {
    type: Boolean,
    default: false
  },
  // input框的宽度
  inputWidth: {
    type: [String, Number],
    default: 550
  },
  // input属性
  inputAttr: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 选择值
  value: {
    type: [String, Number, Array, Object],
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
    default: "单选"
  },
  // 是否显示搜索条件
  isShowQuery: {
    type: Boolean,
    default: false
  },
  // 是否清空搜索条件
  isClearQuery: {
    type: Boolean,
    default: false
  },
  // 是否显示隐藏下拉框按钮
  isShowBlurBtn: {
    type: Boolean,
    default: false
  },
  // 显示隐藏下拉框按钮属性
  btnBind: {
    type: Object,
    default: () => {
      return {
        btnTxt: "关闭下拉框"
      }
    }
  },
  // 单选框--是否开启点击整行选中
  rowClickRadio: {
    type: Boolean,
    default: true
  },
  // 是否显示首列
  isShowFirstColumn: {
    type: Boolean,
    default: true
  },
  // 是否过滤
  filterable: {
    type: Boolean,
    default: true
  },
  // 是否支持翻页选中
  reserveSelection: {
    type: Boolean,
    default: true
  },
  // 是否显示分页
  isShowPagination: {
    type: Boolean,
    default: false
  },
  // 是否自定义过滤
  filterMethod: {
    type: Function
  },
  // 下拉数据指向的label/value
  keywords: {
    type: Object,
    default: () => {
      return {
        label: "label",
        value: "value"
      }
    }
  },
  // 单选是否开启键盘事件
  isKeyup: {
    type: Boolean,
    default: false
  },
  // 多选
  multiple: {
    type: Boolean,
    default: false
  },
  // select 宽度
  selectWidth: {
    type: [String, Number],
    default: 550
  },
  // table宽度
  tableWidth: {
    type: [String, Number],
    default: 550
  },
  // 是否始终显示下拉框
  selfExpanded: {
    type: Boolean,
    default: false
  },
  // 显示下拉框
  isExpanded: {
    type: Boolean,
    default: false
  },
  // 设置默认选中项--keywords.value值
  defaultSelectVal: {
    type: Array,
    default: () => []
  },
  // Function(row: any, index: number) 的返回值用来决定这一行的 CheckBox 是否可以勾选
  selectable: {
    type: Function as PropType<(row: any, index: number) => boolean>
  },
  // 是否开启虚拟列表
  useVirtual: Boolean,
  // 虚拟列表显示条数
  virtualShowSize: {
    type: Number,
    default: 30
  },
  // 是否固定多选
  multipleFixed: Boolean,
  // 是否固定单选
  radioFixed: Boolean,
  // 多选--之前选中的数据不在新数据源下，是否隐藏删除icon
  multipleDisableDelete: Boolean,
  // 默认赋值--是否开启单选事件
  defaultValIsOpenRadioChange: Boolean,
  // 单选选中同一条数据，是否取消选中
  radioSameIsCancel: {
    type: Boolean,
    default: true
  },
  // table是否显示边框
  border: {
    type: Boolean,
    default: true
  },
  // table大小 可选值：`large`、`default`、`small`
  tableSize: {
    type: String as PropType<'' | 'large' | 'default' | 'small'>,
    default: ''
  },
  // table对齐方式 可选值：`left`、`center`、`right`
  align: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center'
  },
  // 分页器大小 可选值：`large`、`default`、`small`
  paginationSize: {
    type: String as PropType<'' | 'large' | 'default' | 'small'>,
    default: 'small'
  },
  // 单选--是否开启回显label
  isRadioEchoLabel: {
    type: Boolean,
    default: true
  },
  // 单选--回显label
  radioSelectValLabel: String,
  // 其中的选项是否从服务器远程加载
  remote: Boolean,
  // 自定义远程搜索方法
  remoteMethod: Function,
}

export type TSelectTableProps = ExtractPropTypes<typeof selectTableProps>