export interface TAdaptivePageProps {
  leftWidth?: number | string
  pageStyle?: Record<string, string>
  columnSetting?: boolean
  name?: string // 表格开启columnSetting后，设置缓存数据唯一标识
  queryPageStyle?: Record<string, string>
  tablePageStyle?: Record<string, string>
  isTTableSelfFilling?: boolean
}