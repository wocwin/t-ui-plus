export interface TQueryConditionProps {
  opts: Record<string, any>
  labelWidth?: string
  btnCheckBind?: Record<string, any>
  btnResetBind?: Record<string, any>
  loading?: boolean
  reset?: boolean
  boolEnter?: boolean
  isShowOpen?: boolean
  isExpansion?: boolean
  maxVisibleRows?: number
  packUpTxt?: string
  unfoldTxt?: string
  isFooter?: boolean
  configChangedReset?: boolean
  isShowWidthSize?: boolean
  widthSize?: number
  isDropDownSelectMore?: boolean
  moreCheckList?: any[]
  popoverAttrs?: Record<string, any>
  labelPosition?: 'top' | 'left' | 'right'
}
