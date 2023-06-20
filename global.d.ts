// declare module "*.vue" {
//   import { defineComponent } from "vue";
//   const Component: ReturnType<typeof defineComponent>;
//   export default Component;
// }
import TLayoutPage from './lib/layout-page/src/index.vue'
import TLayoutPageItem from './lib/layout-page-item/src/index.vue'
import TQueryCondition from './lib/query-condition/src/index.vue'
import TTable from './lib/table/src/index.vue'
import TForm from './lib/form/src/index.vue'
import TSelect from './lib/select/src/index.vue'
import TSelectTable from './lib/select-table/src/index.vue'
import TDetail from './lib/detail/src/index.vue'
import TButton from './lib/button/src/index.vue'
import TStepWizard from './lib/step-wizard/src/index.vue'
import TTimerBtn from './lib/timer-btn/src/index.vue'
import TModuleForm from './lib/module-form/src/index.vue'
import TAdaptivePage from './lib/adaptive-page/src/index.vue'
import TDatePicker from './lib/date-picker/src/index.vue'

declare module 'vue' {
  export interface GlobalComponents {
    TLayoutPage: typeof TLayoutPage
    TLayoutPageItem: typeof TLayoutPageItem
    TQueryCondition: typeof TQueryCondition
    TTable: typeof TTable
    TForm: typeof TForm
    TSelect: typeof TSelect
    TSelectTable: typeof TSelectTable
    TDetail: typeof TDetail
    TButton: typeof TButton
    TStepWizard: typeof TStepWizard
    TTimerBtn: typeof TTimerBtn
    TModuleForm: typeof TModuleForm
    TAdaptivePage: typeof TAdaptivePage
    TDatePicker: typeof TDatePicker
  }
}
