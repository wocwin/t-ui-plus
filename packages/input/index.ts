import Input from "./src/index.vue"
import { withInstall } from "../withInstall"
const TInput = withInstall(Input)
export default TInput
export type TInputInstance = InstanceType<typeof Input>
export * from './src/type'
