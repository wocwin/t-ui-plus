import Chart from "./src/index.vue"
import { withInstall } from "../withInstall"
export type { TChartProps } from "./src/index.vue"
const TChart = withInstall(Chart)
export default TChart
