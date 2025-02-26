import type { DatePickerProps } from 'element-plus'
import type { Mutable } from 'element-plus/es/utils'
export interface TDatePickerSelfProps {
  modelValue: string | Date | Array<string | Date> | undefined
  plusTime?: boolean
  type?:
  | "date"
  | "week"
  | "month"
  | "year"
  | "dates"
  | "months"
  | "years"
  | "daterange"
  | "monthrange"
  | "datetime"
  | "datetimerange"
  shortcuts?: any[]
  isPickerOptions?: boolean
}

export type TDatePickerProps = TDatePickerSelfProps & Partial<Mutable<DatePickerProps>>