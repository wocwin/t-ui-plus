import type { ExtractPropTypes } from 'vue'
export const queryProps = {
  opts: {
    type: Object,
    required: true,
    default: () => ({})
  },
  labelWidth: {
    type: String,
    default: "120px"
  },
  // 查询按钮配置
  btnCheckBind: {
    type: Object,
    default: () => ({})
  },
  // 重置按钮配置
  btnResetBind: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  },
  reset: {
    type: Boolean,
    default: true
  },
  boolEnter: {
    type: Boolean,
    default: true
  },
  // 是否显示收起和展开
  isShowOpen: {
    type: Boolean,
    default: true
  },
  // 是否默认展开
  isExpansion: {
    type: Boolean,
    default: false
  },
  // 收起时设置默认展示行数
  maxVisibleRows: {
    type: Number,
    default: 1
  },
  packUpTxt: {
    type: String,
    default: "收起"
  },
  unfoldTxt: {
    type: String,
    default: "展开"
  },
  // 是否显示底部操作按钮
  isFooter: {
    type: Boolean,
    default: true
  },
  configChangedReset: {
    type: Boolean,
    default: false
  },
  // 是否开启一行显示几个查询条件
  isShowWidthSize: {
    type: Boolean,
    default: false
  },
  // 一行显示几个查询条件
  widthSize: {
    type: Number,
    default: 4
  },
  // 是否以下拉方式展示更多条件
  isDropDownSelectMore: {
    type: Boolean,
    default: false
  },
  // 以下拉方式展示更多条件---数据源
  moreCheckList: {
    type: Array,
    default: () => []
  },
  // 更多条件--el-popover属性
  popoverAttrs: {
    type: Object,
    default: () => ({})
  }
}
export type TQueryProps = ExtractPropTypes<typeof queryProps>