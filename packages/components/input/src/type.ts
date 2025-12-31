import type { InputProps } from "element-plus"
import type { Mutable } from "element-plus/es/utils"
export interface TInputSelfProps {
  modelValue: string | number | null
  placeholder?: string
  decimalLimit?: number
  inputType?: "text" | "amount" | "decimal" | "phone" | "integer" | "idCard" | RegExp
  appendTitle?: string
  showThousands?: boolean
  isTip?: boolean
  isShowErrorTip?: boolean
  customErrorTip?: string
}
export type TInputProps = TInputSelfProps & Partial<Mutable<InputProps>>
