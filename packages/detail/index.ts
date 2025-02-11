import Detail from "./src/index.vue"
import { withInstall } from "../withInstall"

const TDetail = withInstall(Detail)
export default TDetail
export type { TDetailProps } from "./src/index.vue"
