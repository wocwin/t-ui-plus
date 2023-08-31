<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form ref="TFormDemo" v-model="formOpts.ref" :formOpts="formOpts" />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
// 获取ref
const TFormDemo: any = ref<HTMLElement | null>(null)
// 提交formOpts.ref 方式form表单
const submitForm = () => {
  formOpts.ref.validate((valid) => {
    console.log(88, valid)
    console.log(77, formOpts.formData)
    if (!valid) return
    console.log('最终数据', formOpts.formData)
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
  formOpts.formData = {}
  // 清空校验
  TFormDemo.value.clearValidate()
}
// 清除校验
const clearValidate = () => {
  TFormDemo.value.clearValidate()
}
const accountFocus = ({ type }, row) => {
  console.log('账号聚焦事件', type, row)
}
const accountClear = () => {
  console.log('账号清空事件')
}
const accountBlur = ({ type }) => {
  console.log('账号失焦事件', type)
}
const nameBlur = ({ type }) => {
  console.log('昵称失焦事件', type)
}
const formOpts: any = reactive({
  ref: null,
  formData: {
    account: null, // *用户账号
    password: null, // *用户密码
    name: null, // *用户昵称
    qq: null, // qq
    email: null, // 邮箱
    desc: null, // 描述
  },
  fieldList: [
    {
      label: '账号',
      value: 'account',
      type: 'input',
      comp: 'el-input',
      eventHandle: {
        focus: (val, row) => accountFocus(val, row),
        clear: () => accountClear(),
        blur: (val) => accountBlur(val),
      },
    },
    { label: '密码', value: 'password', type: 'password', comp: 'el-input' },
    {
      label: '昵称',
      value: 'name',
      type: 'input',
      comp: 'el-input',
      eventHandle: {
        blur: (val) => nameBlur(val),
      },
    },

    { label: 'QQ', value: 'qq', type: 'input', comp: 'el-input' },
    { label: '邮箱', value: 'email', type: 'input', comp: 'el-input' },
    {
      label: '描述',
      value: 'desc',
      type: 'textarea',
      comp: 'el-input',
      widthSize: 1,
    },
  ],
  operatorList: [
    { label: '提交', type: 'danger', fun: submitForm },
    { label: '重置', type: 'primary', fun: resetForm },
  ],
})
</script>
