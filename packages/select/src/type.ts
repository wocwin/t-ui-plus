export interface TSelectProps {
  modelValue: string | number | Array<any> | Record<string, any> | undefined
  multiple?: boolean
  width?: string
  valueCustom?: string
  labelCustom?: string
  customLabel?: string
  optionSource?: Array<any>
  filterable?: boolean
  isShowPagination?: boolean
  paginationOption?: {
    pageSize?: number
    currentPage?: number
    pagerCount?: number
    total?: number
    layout?: string
    bind?: Record<string, any>
  }
  useVirtual?: boolean
  returnObject?: boolean
  /**
   * 是否缓存选项
   * @default true
   * @type boolean
   * version 1.5.1
   */
  isCached?: boolean
}