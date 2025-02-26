import SelectTable from "./src/index.vue"
import { withInstall } from "../withInstall"
const TSelectTable = withInstall(SelectTable)
export default TSelectTable
export type TSelectTableInstance = InstanceType<typeof SelectTable>
export * from './src/type'
