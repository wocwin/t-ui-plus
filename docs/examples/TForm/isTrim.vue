<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form ref="TFormDemo" v-model="formOpts.ref" :formOpts="formOpts" />
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
// 清除校验
const clearValidate = () => {
  TFormDemo.value.clearValidate()
}
const formOpts = reactive<FormTypes.FormOpts>({
  ref: null,
  formData: {
    account: "wocwin", // *用户账号
    password: null, // *用户密码
    name: null // *用户昵称
  },
  fieldList: [
    {
      label: "账号",
      value: "account",
      placeholder: "账号设置isTrim，不去除前后空格",
      type: "input",
      comp: "el-input",
      isTrim: true
    },
    {
      label: "密码",
      placeholder: "type为password，不去除前后空格",
      value: "password",
      type: "password",
      comp: "el-input",
      bind: { "show-password": true }
    },
    {
      label: "昵称",
      value: "name",
      placeholder: "默认el-input去除前后空格",
      type: "input",
      comp: "el-input"
    }
  ],
  operatorList: [
    { label: "提交", bind: { type: "danger" }, fun: submitForm },
    { label: "重置", bind: { type: "primary" }, fun: resetForm }
  ]
})
</script>
