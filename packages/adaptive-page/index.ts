import AdaptivePage from "./src/index.vue"
import { withInstall } from "../withInstall"
const TAdaptivePage = withInstall(AdaptivePage)
export default TAdaptivePage
export type TAdaptivePageInstance = InstanceType<typeof AdaptivePage>
export * from './src/type'