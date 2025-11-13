export interface TSelectTableProps {
  modelValue?: any
  inputValue?: any
  defaultSelectVal?: any[]
  radioSelectValLabel?: string
  table: {
    data: any[]
    currentPage: number
    pageSize: number
    total: number
    [key: string]: any
  }
  keywords?: {
    value: any
    label: string
  }
  value?: any
  columns: any[]
  multiple?: boolean
  filterable?: boolean
  remote?: boolean
  remoteMethod?: Function
  filterMethod?: Function
  isShowInput?: boolean
  inputAttr?: Record<string, any>
  inputWidth?: number
  selectWidth?: number
  tableWidth?: number
  isShowQuery?: boolean
  isShowBlurBtn?: boolean
  btnBind?: Record<string, any>
  align?: "left" | "center" | "right"
  reserveSelection?: boolean
  selectable?: Function
  multipleFixed?: string | boolean
  radioTxt?: string
  radioFixed?: string | boolean
  tableSize?: "" | "large" | "default" | "small"
  border?: boolean
  isShowFirstColumn?: boolean
  useVirtual?: boolean
  virtualShowSize?: number
  isShowPagination?: boolean
  paginationSize?: "" | "large" | "default" | "small"
  selfExpanded?: boolean
  isClearQuery?: boolean
  isRadioEchoLabel?: boolean
  defaultValIsOpenRadioChange?: boolean
  radioSameIsCancel?: boolean
  rowClickRadio?: boolean
  isKeyup?: boolean
  isExpanded?: boolean
  multipleDisableDelete?: boolean
  tableLoading?: boolean
  loadingTxt?: string
}
