<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form ref="TFormDemo" v-model="formOpts.ref" :formOpts="formOpts" :widthSize="1">
        <template #btnSlot>
          <el-button type="primary" plain @click="resetForm">自定义重置</el-button>
          <el-button type="danger" plain @click="submitForm">自定义提交</el-button>
        </template>
      </t-form>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
// 获取ref
const TFormDemo: any = ref<HTMLElement | null>(null)
// 提交formOpts.ref 方式form表单
const submitForm = () => {
  formOpts.ref.validate(valid => {
    console.log(88, valid)
    console.log(77, formOpts.formData)
    if (!valid) return
    console.log("最终数据", formOpts.formData)
  })
}
// 提交form表单
// const submitForm = async () => {
//   const { valid, formData } = await TFormDemo.value.validate()
//   console.log('formOpts.ref', formOpts.ref)
//   console.log('formOpts.formData', formData)
//   if (!valid) return
//   console.log('最终数据', formData)
// }
// 重置form表单
const resetForm = () => {
  TFormDemo.value.resetFields()
}
const formOpts = reactive<FormTypes.FormOpts>({
  ref: null,
  btnSlotName: "btnSlot", // 提交按钮插槽名称
  formData: {
    account: "wocwin", // *用户账号
    name: null, // *用户昵称
    valDate: null, // el日期选择范围
    email: null, // 邮箱
    desc: null // 描述
  },
  fieldList: [
    { label: "账号", value: "account", type: "input", comp: "el-input", event: "account" },
    { label: "昵称", value: "name", type: "input", comp: "el-input" },
    {
      label: "日期范围",
      value: "valDate",
      type: "daterange",
      comp: "el-date-picker",
      bind: {
        rangeSeparator: "-",
        startPlaceholder: "开始日期",
        endPlaceholder: "结束日期",
        valueFormat: "YYYY-MM-DD"
      }
    },
    { label: "邮箱", value: "email", type: "input", comp: "el-input" }
  ]
})
</script>
