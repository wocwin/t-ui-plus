export interface TChartProps {
  options?: Record<string, any>
  id?: string
  theme?: string
  isEmpty?: boolean | ((options: Record<string, any>) => boolean)
  description?: string
}
