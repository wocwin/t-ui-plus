import QueryCondition from "./src/index.vue"
import { withInstall } from "../withInstall"

const TQueryCondition = withInstall(QueryCondition)
export default TQueryCondition
export type TQueryConditionInstance = InstanceType<typeof QueryCondition>
export * from './src/type'
