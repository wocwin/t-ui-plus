<template>
  <div class="t_form">
    <el-collapse v-model="defaultActiveKey">
      <el-collapse-item
        v-for="(formOpt, formIndex) in formOpts"
        :class="[
          formOpt.className,
          {
            noTitle: !formOpt.title,
            disabledStyle: formOpt.disabled,
            title_bold: titleBold
          }
        ]"
        :key="formIndex"
        :name="formOpt.name"
        :disabled="formOpt.disabled"
      >
        <template #title>
          <span class="collapse-item_title">{{ formOpt.title }}</span>
          <div class="t_btn" v-if="formOpt.btn">
            <slot :name="formOpt.btn"></slot>
          </div>
        </template>
        <template v-if="formOpt.slotName">
          <slot :name="formOpt.slotName"></slot>
        </template>
        <t-form
          :ref="
            (el:any) => {
              dashboardRef[formIndex] = el
            }
          "
          :formOpts="formOpt.opts"
          :widthSize="formOpt.widthSize || 3"
          v-bind="attrs"
          @handleEvent="handleEvent"
        >
          <template v-for="(_index, name) in slots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
          </template>
        </t-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from "vue"
defineOptions({
  name: "ModuleForm"
})
const props: any = defineProps({
  // 表单配置项
  formOpts: {
    type: Object,
    default: () => ({})
  },
  // 是否Title文字加粗
  titleBold: {
    type: Boolean,
    default: false
  }
})
const dashboardRef = ref({}) as any
const slots = useSlots()
const attrs: any = useAttrs()
// 抛出ref
const getChildRef = (index: string | number) => {
  const childRef = dashboardRef.value[index]
  return childRef
}
// 暴露方法出去
defineExpose({ getChildRef })
const defaultActiveKey = computed({
  get() {
    // console.log(333, Object.keys(this.formOpts))
    return Object.keys(props.formOpts)
  },
  set(val) {
    return val
  }
})
// 抛出事件
const emits = defineEmits(["handleEvent"])
const handleEvent = (val: any, type: any) => {
  emits("handleEvent", val, type)
}
</script>
