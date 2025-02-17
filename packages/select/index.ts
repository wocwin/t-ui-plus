import Select from "./src/index.vue"
import { withInstall } from "../withInstall"
export type TSelectInstance = InstanceType<typeof Select>
const TSelect = withInstall(Select)
export default TSelect
export * from './src/type'
