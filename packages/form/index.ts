import Form from "./src/index.vue"
import { withInstall } from "../withInstall"
const TForm = withInstall(Form)
export default TForm
export type TFormInstance = InstanceType<typeof Form>
export * from './src/type'
