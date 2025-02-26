import Chart from "./src/index.vue"
import { withInstall } from "../withInstall"
const TChart = withInstall(Chart)
export default TChart
export type TChartInstance = InstanceType<typeof Chart>
export * from './src/type'
