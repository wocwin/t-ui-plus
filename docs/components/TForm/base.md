# TForm 表单组件

---

### 基础用法

::: demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form ref="TFormDemo" v-model="formOpts.ref" :formOpts="formOpts" />
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
const accountFocus = ({ type }) => {
  console.log('账号聚焦事件', type)
}
const accountClear = () => {
  console.log('账号清空事件')
}
const accountBlur = ({ type }) => {
  console.log('账号失焦事件', type)
}
const formOpts: any = reactive({
  ref: null,
  formData: {
    account: null, // *用户账号
    password: null, // *用户密码
    name: null, // *用户昵称
    sex: null, // *性别: 0:男 1:女
    hobby: [], // *爱好: 0:男 1:女
    phone: null, // 手机号码
    valDate: null, // el日期选择范围
    wechat: null, // 微信
    qq: null, // qq
    email: null, // 邮箱
    desc: null, // 描述
    number: null, // 计算器
    status: null, // *状态: 0：停用，1：启用(默认为1)',
  },
  fieldList: [
    {
      label: '账号',
      value: 'account',
      type: 'input',
      comp: 'el-input',
      event: 'account',
      eventHandle: {
        focus: (val) => accountFocus(val),
        clear: () => accountClear(),
        blur: (val) => accountBlur(val),
      },
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
      label: '计数器',
      value: 'number',
      type: 'inputNumber',
      widthSize: 1,
      bind: { controls: false, min: 2, max: 99 },
      comp: 'el-input-number',
    },
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
</script>
```

:::

### 继承 Element-plus 组件的事件使用

::: demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form ref="TFormDemo" v-model="formOpts.ref" :formOpts="formOpts" />
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
const accountFocus = ({ type }) => {
  console.log('账号聚焦事件', type)
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
        focus: (val) => accountFocus(val),
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
```

:::

### el-input 去除前后空格（type=password 除外）

::: demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form ref="TFormDemo" v-model="formOpts.ref" :formOpts="formOpts" />
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
const formOpts: any = reactive({
  ref: null,
  formData: {
    account: null, // *用户账号
    password: null, // *用户密码
    name: null, // *用户昵称
  },
  fieldList: [
    {
      label: '账号',
      value: 'account',
      placeholder: '账号设置isTrim，不去除前后空格',
      type: 'input',
      comp: 'el-input',
      isTrim: true,
    },
    {
      label: '密码',
      placeholder: 'type为password，不去除前后空格',
      value: 'password',
      type: 'password',
      comp: 'el-input',
      bind: { 'show-password': true },
    },
    {
      label: '昵称',
      value: 'name',
      placeholder: '默认el-input去除前后空格',
      type: 'input',
      comp: 'el-input',
    },
  ],
  operatorList: [
    { label: '提交', type: 'danger', fun: submitForm },
    { label: '重置', type: 'primary', fun: resetForm },
  ],
})
</script>
```

:::

### 对齐方式

:::demo 配置:<br/>通过设置 `formOpts.labelPosition` 属性可以改变表单域标签的位置，可选值为 `top`、`left`、`right`，默认`right`<br/>**前提：需设置`formOpts.labelWidth`(默认是：100px——即 `label` 的宽度)**

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <el-radio-group
        v-model="formOpts.labelPosition"
        size="small"
        style="margin-bottom:15px;"
      >
        <el-radio-button label="left">左对齐</el-radio-button>
        <el-radio-button label="right">右对齐</el-radio-button>
        <el-radio-button label="top">顶部对齐</el-radio-button>
      </el-radio-group>
      <t-form
        ref="TFormDemo"
        v-model="formOpts.ref"
        :formOpts="formOpts"
        :widthSize="1"
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
const formOpts: any = reactive({
  labelPosition: 'right',
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
    accountType: null, // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
    email: null, // 邮箱
    desc: null, // 描述
    number: null, // 计算器
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
      bind: (row) => {
        return {
          disabled: true,
        }
      },
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
      // labelRender: () => {
      //   return (
      //     <div class="label_render">
      //       <div>自定义label</div>
      //     </div>
      //   )
      // },
      label: '自定义label',
      placeholder: '请选择element日期范围',
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
</script>
```

:::

### 每行展示多少项

:::demo 配置:<br/>通过设置 `widthSize` 属性可以改变表单域每行显示项，可选值为 `1`、`2`、`3`、`4`，默认`2`————即每行显示两项<br/>**若某一项需要单独显示一行（通常是备注或者文本域）需要在 fieldList 中设置 `widthSize` 为 1**

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <el-radio-group
        v-model="widthSize"
        size="small"
        style="margin-bottom:15px;"
      >
        <el-radio-button :label="1">一行展示</el-radio-button>
        <el-radio-button :label="2">一行展示2项</el-radio-button>
        <el-radio-button :label="3">一行展示3项</el-radio-button>
        <el-radio-button :label="4">一行展示4项</el-radio-button>
      </el-radio-group>
      <t-form
        ref="TFormDemo"
        v-model="formOpts.ref"
        :formOpts="formOpts"
        :widthSize="widthSize"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { ref, reactive } from 'vue'
const widthSize = ref(1)
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
const formOpts: any = reactive({
  labelPosition: 'right',
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
    accountType: null, // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
    email: null, // 邮箱
    desc: null, // 描述
    number: null, // 计算器
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
      label: '计数器',
      value: 'number',
      type: 'inputNumber',
      widthSize: 1,
      bind: { controls: false, min: 2, max: 99 },
      comp: 'el-input-number',
    },
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
</script>
```

:::

### 表单校验规则

:::demo 配置:<br/>`TForm` 组件提供了表单验证的功能，只需要通过 `rules` 属性传入约定的验证规则，并将 `Form-Item` 的 `prop` 属性设置为需校验的字段名即可。校验规则参见 [async-validator](https://github.com/yiminghe/async-validator);<br/>可以`自定义校验规则`可以参考`email`方式来写

```vue
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
```

:::

### 自定义 label jsx 渲染

:::demo 配置:<br/>案例暂不支持 tsx 方式,但实际项目可以这样使用<br/>`TForm`组件提供了自定义 `label`的功能，使用`tsx`方式—————配置`labelRender`<br/>**当`labelRender`与`label`同时存在时：优先渲染`labelRender`**

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form
        ref="TFormDemo"
        v-model="formOpts.ref"
        :formOpts="formOpts"
        :widthSize="1"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
// import { Warning } from '@element-plus/icons-vue'
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
const formOpts: any = reactive({
  ref: null,
  formData: {
    account: null, // *用户账号
    name: null, // *用户昵称
    valDate: null, // el日期选择范围
    email: null, // 邮箱
    desc: null, // 描述
  },
  fieldList: [
    {
      // labelRender: () => {
      //   return (
      //     <div style="color:red;">
      //       账号
      //     </div>
      //   )
      // },
      label: '账号',
      value: 'account',
      type: 'input',
      comp: 'el-input',
      event: 'account',
    },
    {
      // labelRender: () => {
      //   return (
      //     <div style="color:blue;">
      //       昵称
      //     </div>
      //   )
      // },
      label: '昵称',
      value: 'name',
      type: 'input',
      comp: 'el-input',
    },
    {
      // labelRender: () => {

      //   return (
      //     <div style="color:#3eaf7c;cursor:pointer;display:flex;align-items:center;">日期组件
      //       <el-tooltip content="自定义label" placement="right" >
      //         <el-icon><Warning /></el-icon>
      //       </el-tooltip >
      //     </div >
      //   )
      // },
      label: '自定义label',
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
    {
      // labelRender: () => {
      //   return (
      //     <div style="color:green;">
      //       邮箱
      //     </div>
      //   )
      // },
      label: '邮箱',
      value: 'email',
      type: 'input',
      comp: 'el-input',
    },
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
```

:::

### 输入框插槽使用

:::demo 配置:<br/>`TForm`组件提供了自定义 `输入框插槽`或下拉选择的`option插槽`的功能<br/>输入框插槽：配置`slotName`<br/>option 插槽：配置`childSlotName`<br/>

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form
        ref="TFormDemo"
        v-model="formOpts.ref"
        :formOpts="formOpts"
        :widthSize="1"
      >
        <template #wechat>
          <el-input
            v-model="formOpts.formData.wechat"
            placeholder="自定义输入框插槽"
          ></el-input>
        </template>
        <!-- 平台用户下拉子组件自定义插槽 -->
        <template #accountType>
          <el-option
            v-for="(item, key) in formOpts.listTypeInfo.accountTypeList"
            :key="key"
            :label="item"
            :value="key"
          ></el-option>
        </template>
      </t-form>
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
const formOpts: any = reactive({
  ref: null,
  formData: {
    accountType: '', // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
    wechat: '', // 邮箱
    desc: '', // 描述
  },
  fieldList: [
    {
      label: '平台用户',
      placeholder: '自定义option插槽',
      value: 'accountType',
      type: 'select-obj',
      comp: 'el-select',
      list: 'accountTypeList',
      childSlotName: 'accountType',
    },
    { label: '微信', value: 'wechat', slotName: 'wechat' },
    {
      label: '描述',
      value: 'desc',
      type: 'textarea',
      comp: 'el-input',
      className: 't-form-block',
    },
  ],
  operatorList: [
    { label: '提交', type: 'danger', fun: submitForm },
    { label: '重置', type: 'primary', fun: resetForm },
  ],
  // 相关列表
  listTypeInfo: {
    accountTypeList: {
      0: '手机用户',
      1: '论坛用户',
      2: '平台用户',
    },
  },
})
</script>
```

:::

### 文本展示

:::demo 配置:<br/>`TForm`组件提供了`文本展示`的功能<br/>设置 `textShow: true`; `textValue`——显示的文本

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form
        ref="TFormDemo"
        v-model="formOpts.ref"
        :formOpts="formOpts"
        :widthSize="4"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
// 获取ref
const TFormDemo: any = ref<HTMLElement | null>(null)

const formOpts: any = reactive({
  ref: null,
  formData: {
    account: '张三', // *用户账号
    password: '123456', // *用户密码
    name: '三丫子', // *用户昵称
    sex: '男', // *性别: 0:男 1:女
  },
  fieldList: [
    { label: '账号：', textShow: true, textValue: '张三' },
    { label: '密码：', textShow: true, textValue: '123456' },
    { label: '昵称：', textShow: true, textValue: '三丫子' },
    { label: '性别：', textShow: true, textValue: '男' },
  ],
})
</script>
```

:::

### 结合自己封装组件使用

:::demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form
        ref="TFormDemo"
        v-model="formOpts.ref"
        :formOpts="formOpts"
        :widthSize="1"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const hobbyList = ref([
  { label: '吉他', value: '0' },
  { label: '看书', value: '1' },
  { label: '美剧', value: '2' },
  { label: '旅游', value: '3' },
  { label: '音乐', value: '4' },
])
const sexList = ref([
  { label: '女', value: 1 },
  { label: '男', value: 0 },
])
const statusList = ref([
  { label: '启用', value: 1 },
  { label: '停用', value: 0 },
])
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
const formOpts: any = reactive({
  ref: null,
  formData: {
    sex: null, // *性别: 0:男 1:女
    hobby: null, // *爱好: 0:男 1:女
    status: null, // *状态: 0：停用，1：启用(默认为1)',
  },
  fieldList: [
    {
      label: '性别',
      value: 'sex',
      placeholder: 'TSelect单选',
      type: 'select-arr',
      comp: 't-select',
      bind: { optionSource: sexList.value, valueKey: 'value' },
    },
    {
      label: '状态',
      value: 'status',
      placeholder: 'TSelect单选',
      type: 'select-arr',
      comp: 't-select',
      bind: { optionSource: statusList, valueKey: 'value' },
    },
    {
      label: '爱好',
      value: 'hobby',
      placeholder: 'TSelect多选',
      type: 'select-arr',
      comp: 't-select',
      list: 'hobbyList',
      bind: { multiple: true, optionSource: hobbyList, valueKey: 'value' },
    },
  ],
  operatorList: [
    { label: '提交', type: 'danger', fun: submitForm },
    { label: '重置', type: 'primary', fun: resetForm },
  ],
})
</script>
```

:::

### 赋值回显数据

:::demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form
        ref="TFormDemo"
        v-model="formOpts.ref"
        :formOpts="formOpts"
        :widthSize="1"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
const hobbyList = ref([
  { label: '吉他', value: '0' },
  { label: '看书', value: '1' },
  { label: '美剧', value: '2' },
  { label: '旅游', value: '3' },
  { label: '音乐', value: '4' },
])
const sexList = ref([
  { label: '女', value: 1 },
  { label: '男', value: 0 },
])
const statusList = ref([
  { label: '启用', value: 1 },
  { label: '停用', value: 0 },
])
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
const formOpts: any = reactive({
  ref: null,
  formData: {
    account: null, // *用户账号
    password: null, // *用户密码
    name: null, // *用户昵称
    sex: null, // *性别: 0:男 1:女
    hobby: null, // *爱好: 0:男 1:女
    status: null, // *状态: 0：停用，1：启用(默认为1)',
    desc: null, // 描述
  },
  fieldList: [
    {
      label: '账号',
      value: 'account',
      type: 'input',
      comp: 'el-input',
      event: 'account',
    },
    {
      label: '密码',
      value: 'password',
      type: 'password',
      comp: 'el-input',
      bind: { 'show-password': true },
    },
    { label: '昵称', value: 'name', type: 'input', comp: 'el-input' },
    {
      label: '性别',
      value: 'sex',
      placeholder: 'TSelect单选',
      type: 'select-arr',
      comp: 't-select',
      bind: { optionSource: sexList.value, valueKey: 'value' },
    },
    {
      label: '状态',
      value: 'status',
      placeholder: 'TSelect单选',
      type: 'select-arr',
      comp: 't-select',
      bind: { optionSource: statusList, valueKey: 'value' },
    },
    {
      label: '爱好',
      value: 'hobby',
      placeholder: 'TSelect多选',
      type: 'select-arr',
      comp: 't-select',
      list: 'hobbyList',
      bind: { multiple: true, optionSource: hobbyList, valueKey: 'value' },
    },
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
onMounted(() => {
  getData()
})
// 回显赋值
const getData = () => {
  const objShow = {
    sex: 0, // *性别: 0:男 1:女
    hobby: ['0', '2'], // *爱好
    account: '张三',
    password: '123456',
    name: '三丫子',
    desc: '8888', // 描述
    status: 1, // *状态: 0：停用，1：启用(默认为1)',
  }
  formOpts.formData = objShow
}
</script>
```

:::

### 密码在新增显示，编辑不显示

:::demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <el-button type="danger" @click="add">新增</el-button>
      <el-button type="danger" @click="edit">编辑</el-button>
    </t-layout-page-item>
    <el-dialog :title="title" width="40%" v-model="dialogSelectEnt" draggable>
      <t-form
        ref="TFormDemo"
        v-model="formOpts.ref"
        :formOpts="formOpts"
        :widthSize="1"
      />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogSelectEnt = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const dialogSelectEnt = ref(false)
const title = ref('新增数据')
const hobbyList = ref([
  { label: '吉他', value: '0' },
  { label: '看书', value: '1' },
  { label: '美剧', value: '2' },
  { label: '旅游', value: '3' },
  { label: '音乐', value: '4' },
])
const sexList = ref([
  { label: '女', value: 1 },
  { label: '男', value: 0 },
])
const statusList = ref([
  { label: '启用', value: 1 },
  { label: '停用', value: 0 },
])
// 获取ref
const TFormDemo: any = (ref < HTMLElement) | (null > null)
// 提交formOpts.ref 方式form表单
const submitForm = () => {
  formOpts.ref.validate((valid) => {
    console.log('校验是否通过', valid)
    if (!valid) return
    console.log('最终数据', formOpts.formData)
    setTimeout(() => {
      dialogSelectEnt.value = false
    }, 1000)
  })
}
const add = () => {
  title.value = '新增数据'
  formOpts.fieldList.map((val) => {
    if (val.value === 'password') {
      val.isHideItem = false
    }
  })
  dialogSelectEnt.value = true
}
const edit = () => {
  title.value = '编辑数据'
  formOpts.fieldList.map((val) => {
    if (val.value === 'password') {
      val.isHideItem = true
    }
  })
  dialogSelectEnt.value = true
}
// 提交form表单
// const submitForm = async () => {
//   const { valid, formData } = await TFormDemo.value.validate()
//   console.log('formOpts.ref', formOpts.ref)
//   console.log('formOpts.formData', formData)
//   if (!valid) return
//   console.log('最终数据', formData)
// }

const formOpts: any = reactive({
  ref: null,
  formData: {
    account: null, // *用户账号
    password: null, // *用户密码
    name: null, // *用户昵称
    sex: null, // *性别: 0:男 1:女
    hobby: null, // *爱好: 0:男 1:女
    status: null, // *状态: 0：停用，1：启用(默认为1)',
    desc: null, // 描述
  },
  fieldList: [
    {
      label: '账号',
      value: 'account',
      type: 'input',
      comp: 'el-input',
      event: 'account',
      rules: { required: true, message: '请输入账号', trigger: 'blur' },
    },
    {
      label: '密码',
      value: 'password',
      type: 'password',
      comp: 'el-input',
      bind: { 'show-password': true },
      FisHideItem: false,
    },
    {
      label: '昵称',
      value: 'name',
      type: 'input',
      comp: 'el-input',
      rules: { required: true, message: '请输入昵称', trigger: 'blur' },
    },
    {
      label: '性别',
      value: 'sex',
      placeholder: 'TSelect单选',
      type: 'select-arr',
      comp: 't-select',
      bind: { optionSource: sexList.value, valueKey: 'value' },
    },
    {
      label: '状态',
      value: 'status',
      placeholder: 'TSelect单选',
      type: 'select-arr',
      comp: 't-select',
      bind: { optionSource: statusList, valueKey: 'value' },
    },
    {
      label: '爱好',
      value: 'hobby',
      placeholder: 'TSelect多选',
      type: 'select-arr',
      comp: 't-select',
      list: 'hobbyList',
      bind: { multiple: true, optionSource: hobbyList, valueKey: 'value' },
    },
    {
      label: '描述',
      value: 'desc',
      type: 'textarea',
      comp: 'el-input',
      widthSize: 1,
    },
  ],
})
</script>
```

:::

### TForm 参数配置

---

#### 1. 简介：基于 Element-plus Form 表单组件的二次封装，着重于数据层面，HTML 一行代码

> TForm 表单组件 **代码示例：**

```html
<t-form
  v-model="formOpts.ref"
  :formOpts="formOpts"
  :widthSize="2"
  @handleEvent="handleEvent"
/>
//注意formOpts.ref(t-form组件实例相当于vue2 ref)需要要v-model接收
```

#### 2. 配置参数

| 参数                | 说明                                                                                                    | 类型             | 是否必须 |
| :------------------ | :------------------------------------------------------------------------------------------------------ | :--------------- | :------- |
| className           | 自定义类名                                                                                              | String           | -        |
| labelPosition       | 改变表单项 label 与输入框的布局方式(默认：right) /top                                                   | String           | right    |
| widthSize           | 每行显示几个输入项（默认两项） 最大值 4                                                                 | Number           | 2        |
| isTrim              | 全局是否开启清除前后空格(comp 为 el-input 且 type 不等于'password')                                     | Boolean          | true     |
| formOpts            | 表单配置项                                                                                              | Object           | -        |
| ---listTypeInfo     | 下拉选择数据源（type:'select'有效）                                                                     | Object           | -        |
| ---fieldList        | form 表单每项 list                                                                                      | Array            | 是-      |
| ------isHideItem    | 某一项不显示                                                                                            | Boolean          | false    |
| ------slotName      | 自定义表单某一项输入框                                                                                  | slot             | -        |
| ------childSlotName | 自定义表单某一下拉选择项子组件插槽（el-option）                                                         | slot             | -        |
| ------comp          | form 表单每一项组件是输入框还是下拉选择等（可使用第三方 UI 如 el-select/el-input 也可以使用自定义组件） | String           | -        |
| ------bind          | 表单每一项属性（继承第三方 UI 的 Attributes，如 el-input 中的 clearable 清空功能）默认清空及下拉过滤    | Object/funnction | -        |
| ------isTrim        | 是否不清除前后空格(comp 为 el-input 且 type 不等于'password')                                           | Boolean          | false    |
| ------type          | form 表单每一项类型                                                                                     | String           | -        |
| ------widthSize     | form 表单某一项所占比例(如果占一整行则设置 1)                                                           | Number           | -        |
| ------width         | form 表单某一项所占实际宽度                                                                             | String           | -        |
| ------arrLabel      | type=select-arr 时，每个下拉显示的中文                                                                  | String           | label    |
| ------arrKey        | type=select-arr 时，每个下拉显示的中文传后台的数字                                                      | String           | key      |
| ------label         | form 表单每一项 title                                                                                   | String           | -        |
| ------labelRender   | 自定义某一项 title                                                                                      | function         | -        |
| ------value         | form 表单每一项传给后台的参数                                                                           | String           | -        |
| ------rules         | 每一项输入框的表单校验规则                                                                              | Object/Array     | -        |
| ------list          | 下拉选择数据源（仅仅对 type:'select'有效）                                                              | String           | -        |
| ------event         | 表单每一项事件标志（即是：handleEvent 事件第一个参数值）                                                | String           | -        |
| ------eventHandle   | 继承 comp 组件的事件                                                                                    | Object           | -        |
| ---formData         | 表单提交数据(对应 fieldList 每一项的 value 值)                                                          | Object           | -        |
| ---labelWidth       | label 宽度                                                                                              | String           | -        |
| ---rules            | 规则（可依据 elementUI el-form 配置————对应 formData 的值）                                             | Object/Array     | -        |
| ---operatorList     | 操作按钮 list                                                                                           | Array            | -        |

#### 3. events

| 事件名      | 说明                 | 返回值                                                   |
| :---------- | :------------------- | :------------------------------------------------------- |
| handleEvent | 单个查询条件触发事件 | fieldList 中 type/查询条件输入的值/fieldList 中 event 值 |

#### 4. Methods 继承 element-plus 的 methods

| 事件名        | 说明     | 参数 |
| :------------ | :------- | :--- |
| resetFields   | 重置表单 | -    |
| clearValidate | 清空校验 | -    |

#### 5. 关于 element-plus el-form/el-form-item 提供的一些方法/属性可直接使用，无需其他配置
