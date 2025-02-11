import ModuleForm from "./src/index.vue"
import { withInstall } from "../withInstall"

const TModuleForm = withInstall(ModuleForm)
export default TModuleForm
export type { TModuleFormProps } from "./src/index.vue"
