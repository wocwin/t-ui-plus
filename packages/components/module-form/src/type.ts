export interface TModuleFormProps {
  handleType?: "edit" | "desc"
  isShowHeader?: boolean
  titleSlot?: boolean
  isShowBack?: boolean
  isGoBackEvent?: boolean
  btnSaveBind?: Record<string, any>
  btnCancelBind?: Record<string, any>
  isTabMargin?: boolean
  tabMarginNum?: number
  footer?: any
  title?: string
  subTitle?: string
  tabs?: Array<{ key: string; title: string }>
  submit?: (form: Record<string, any>) => Promise<boolean>
}
