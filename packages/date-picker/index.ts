import DatePicker from "./src/index.vue"
import { withInstall } from "../withInstall"
export type TDatePickerInstance = InstanceType<typeof DatePicker>
const TDatePicker = withInstall(DatePicker)
export default TDatePicker
export * from './src/type'
