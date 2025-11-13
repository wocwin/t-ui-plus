import type { ButtonProps } from "element-plus"
import type { Mutable } from "element-plus/es/utils"

export interface TButtonSelfProps {
  time?: number
  tip?: string
  placement?: string
  tipProps?: Record<string, any>
  isDebounce?: boolean
}
export type TButtonProps = TButtonSelfProps & Partial<Mutable<ButtonProps>>
