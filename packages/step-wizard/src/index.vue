<template>
  <div class="t_step-wizard">
    <el-steps :active="active" finish-status="success" v-bind="$attrs">
      <el-step
        v-bind="$attrs"
        v-for="(item, index) in stepData"
        :key="index"
        :title="`${index + 1} ${item.title}`"
        :icon="item.icon ? item.icon : ''"
        :description="item.description ? item.description : ''"
      >
        <template v-for="(index, name) in slots" v-slot:[name]="data">
          <slot :name="name" v-bind="data" />
        </template>
      </el-step>
    </el-steps>
    <div class="content-step-main step-content">
      <div
        class="step-first flex-box flex-col flex-ver-h"
        v-for="(val, key) in stepContent()"
        :key="key"
        v-show="active === key"
      >
        <template v-if="val.slotName">
          <slot :name="val.slotName"></slot>
        </template>
        <div class="step_btn">
          <el-button
            v-for="(val1, key1) in val.btnArr"
            :key="key1"
            :type="val1.type || 'danger'"
            @click="val1.fn(val1)"
            :disabled="val.disable || false"
            >{{ val1.btnTitle }}</el-button
          >
        </div>
      </div>
      <div
        class="step-last flex-box flex-col flex-ver"
        v-if="active === stepData.length && isShowLastSuccess"
      >
        <div class="icon-success">
          <el-icon>
            <CircleCheck />
          </el-icon>
        </div>
        <h2 class="success-margin" v-html="successTitle"></h2>
        <div class="step_btn">
          <el-button
            v-if="!stepData[stepData.length - 1].lastBtnArr"
            type="danger"
            @click="complete"
            >{{ lastBtnTitle }}</el-button
          >
          <el-button
            v-else
            v-for="(item, key) in stepData[stepData.length - 1].lastBtnArr"
            :key="key"
            :type="item.type || 'danger'"
            @click="item.fn(item)"
            :disabled="item.disable || false"
            >{{ item.btnTitle }}</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from "vue"
defineOptions({
  name: "TStepWizard"
})
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
const props = withDefaults(defineProps<TStepWizardProps>(), {
  stepData: () => [],
  successTitle: "",
  lastBtnTitle: "完成",
  active: 0,
  isShowLastSuccess: true
})

const slots = useSlots()
const stepContent = () => {
  return props.isShowLastSuccess
    ? props.stepData && props.stepData.slice(0, props.stepData.length - 1)
    : props.stepData
}
const emits = defineEmits(["complete"])
// 第四步完成
const complete = () => {
  emits("complete", props.active)
}
</script>
<style lang="scss">
.t_step-wizard {
  position: relative;
  .el-steps--simple {
    .el-step__head {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .content-step-main {
    .step-last {
      .icon-success {
        color: var(--el-color-primary);
        font-size: 95px;
        margin-top: 40px;
      }
      .success-margin {
        color: var(--el-color-primary);
        margin-bottom: 70px;
      }
    }
    .step_btn {
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      background: var(--el-bg-color);
    }
  }
  .flex-box {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }
  .flex-ver {
    align-items: center;
    justify-content: center;
  }
  .flex-col {
    flex-direction: column;
  }
}
</style>
