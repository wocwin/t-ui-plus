import StepWizard from "./src/index.vue"
import { withInstall } from "../withInstall"

const TStepWizard = withInstall(StepWizard)
export default TStepWizard
export type TStepWizardInstance = InstanceType<typeof StepWizard>
export * from './src/type'
