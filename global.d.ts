declare module '@wocwin/t-ui-plus/lib'
declare module "*.vue" {
  import { defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}
declare module '@avue/runtime-core' {
  export interface GlobalComponents {
    TLayoutPage: typeof import('@wocwin/t-ui-plus/lib')['TLayoutPage']
    TLayoutPageItem: typeof import('@wocwin/t-ui-plus/lib')['TLayoutPageItem']
    TQueryCondition: typeof import('@wocwin/t-ui-plus/lib')['TQueryCondition']
    TTable: typeof import('@wocwin/t-ui-plus/lib')['TTable']
    TForm: typeof import('@wocwin/t-ui-plus/lib')['TForm']
    TSelect: typeof import('@wocwin/t-ui-plus/lib')['TSelect']
    TSelectTable: typeof import('@wocwin/t-ui-plus/lib')['TSelectTable']
    TDetail: typeof import('@wocwin/t-ui-plus/lib')['TDetail']
    TButton: typeof import('@wocwin/t-ui-plus/lib')['TButton']
    TStepWizard: typeof import('@wocwin/t-ui-plus/lib')['TStepWizard']
    TTimerBtn: typeof import('@wocwin/t-ui-plus/lib')['TTimerBtn']
    TModuleForm: typeof import('@wocwin/t-ui-plus/lib')['TModuleForm']
    TAdaptivePage: typeof import('@wocwin/t-ui-plus/lib')['TAdaptivePage']
    TDatePicker: typeof import('@wocwin/t-ui-plus/lib')['TDatePicker']
  }
}
