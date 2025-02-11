import DatePicker from "./src/index.vue"
import { withInstall } from "../withInstall"

const TDatePicker = withInstall(DatePicker)
export default TDatePicker
export type { TDatePickerProps } from "./src/index.vue"
