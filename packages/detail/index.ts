import Detail from "./src/index.vue"
import { withInstall } from "../withInstall"

const TDetail = withInstall(Detail)
export default TDetail
export type TDetailInstance = InstanceType<typeof Detail>
export * from './src/type'
