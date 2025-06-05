import type { FormProps } from "element-plus"
import type { Mutable } from "element-plus/es/utils"
export interface FormOpts {
  formData?: Record<string, any>
  rules?: Record<string, any>
  fieldList: Array<any>
  operatorList?: Array<{
    label: string
    fun: Function
    bind?: Record<string, any>
    isHideBtn?: boolean
    render?: Function
  }>
  listTypeInfo?: Record<string, any[]>
  labelWidth?: string
  btnSlotName?: string
  labelPosition?: "left" | "right" | "top"
}
export interface TFormSelfProps {
  className?: string
  formOpts: FormOpts | any
  widthSize?: 1 | 2 | 3 | 4 | 5 | 6
  labelPosition?: "left" | "right" | "top"
  isTrim?: boolean
}
export type TFormProps = TFormSelfProps & Partial<Mutable<FormProps>>
