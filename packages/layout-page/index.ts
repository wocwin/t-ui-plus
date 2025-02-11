import LayoutPage from "./src/index.vue"
import { withInstall } from "../withInstall"

const TLayoutPage = withInstall(LayoutPage)
export default TLayoutPage
export type { TLayoutPageProps } from "./src/index.vue"
