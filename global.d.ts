import TLayoutPage from './packages/layout-page'
import TLayoutPageItem from './packages/layout-page-item'
import TQueryCondition from './packages/query-condition'
import TTable from './packages/table'
import TForm from './packages/form'
import TSelect from './packages/select'
import TSelectTable from './packages/select-table'
import TDetail from './packages/detail'
import TButton from './packages/button'
import TStepWizard from './packages/step-wizard'
import TTimerBtn from './packages/timer-btn'
import TModuleForm from './packages/module-form'
import TAdaptivePage from './packages/adaptive-page'
declare module '@avue/runtime-core' {
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
  }
}
