<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form
        ref="TFormDemo"
        v-model="formOpts.ref"
        :formOpts="formOpts"
        :widthSize="3"
        @handleEvent="handleEvent"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
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
// 邮箱校验
const validatorEmail = (rule, value, callback) => {
  if (value && !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
    callback(new Error(rule.message))
  }
  callback()
}
const formOpts: any = reactive({
  // labelPosition: 'top',
  ref: null,
  formData: {
    account: null, // *用户账号
    password: null, // *用户密码
    name: null, // *用户昵称
    sex: null, // *性别: 0:男 1:女
    hobby: [], // *爱好: 0:男 1:女
    phone: null, // 手机号码
    createDate: null, // 创建时间
    valDate: null, // el日期选择范围
    wechat: null, // 微信
    qq: null, // qq
    email: null, // 邮箱
    desc: null, // 描述
    status: null, // *状态: 0：停用，1：启用(默认为1)',
  },
  fieldList: [
    {
      label: '账号',
      value: 'account',
      type: 'input',
      comp: 'el-input',
      event: 'account',
    },
    { label: '密码', value: 'password', type: 'password', comp: 'el-input' },
    { label: '昵称', value: 'name', type: 'input', comp: 'el-input' },
    {
      label: '性别',
      value: 'sex',
      type: 'select-arr',
      comp: 'el-select',
      list: 'sexList',
      arrLabel: 'key',
      arrKey: 'value',
    },
    {
      label: '状态',
      value: 'status',
      type: 'select-arr',
      list: 'statusList',
      comp: 'el-select',
      arrLabel: 'key',
      arrKey: 'value',
    },
    {
      label: '爱好',
      value: 'hobby',
      type: 'checkbox',
      comp: 'el-checkbox-group',
      list: 'hobbyList',
      event: 'checkbox',
    },
    {
      label: '手机号码',
      value: 'phone',
      type: 'input',
      comp: 'el-input',
      bind: { maxlength: 11 },
    },
    {
      label: '日期',
      value: 'valDate',
      type: 'daterange',
      comp: 'el-date-picker',
      bind: {
        rangeSeparator: '-',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        valueFormat: 'YYYY-MM-DD',
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
  rules: {
    account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
    phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
    sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
    hobby: [
      {
        type: 'array',
        required: true,
        message: '请至少选择一个爱好',
        trigger: 'change',
      },
    ],
    email: [
      {
        validator: validatorEmail,
        message: '自定义配置校验规则',
        trigger: 'blur',
      },
    ],
  },
  operatorList: [
    { label: '提交', type: 'danger', fun: submitForm },
    { label: '重置', type: 'primary', fun: resetForm },
    { label: '清除校验', type: 'danger', fun: clearValidate },
  ],
  // 相关列表
  listTypeInfo: {
    hobbyList: [
      { label: '吉他', value: '0' },
      { label: '看书', value: '1' },
      { label: '美剧', value: '2' },
      { label: '旅游', value: '3' },
      { label: '音乐', value: '4' },
    ],
    sexList: [
      { key: '女', value: 1 },
      { key: '男', value: 0 },
    ],
    statusList: [
      { key: '启用', value: 1 },
      { key: '停用', value: 0 },
    ],
  },
})
// 触发事件
const handleEvent = (type, val) => {
  switch (type) {
    case 'checkbox':
      console.log('checkbox', val, type)
      break
  }
}
</script>
