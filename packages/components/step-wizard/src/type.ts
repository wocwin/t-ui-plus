export interface StepItem {
  title?: string
  icon?: string
  description?: string
  slotName?: string
  btnArr?: Array<{ type?: string; fn: Function; btnTitle: string }>
  lastBtnArr?: Array<{ type?: string; fn: Function; btnTitle: string; disable?: boolean }>
  disable?: boolean
}

export interface TStepWizardProps {
  stepData?: StepItem[]
  successTitle?: string
  lastBtnTitle?: string
  active?: number
  isShowLastSuccess?: boolean
}
