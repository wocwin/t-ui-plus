<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form ref="TFormDemo" v-model="formOpts.ref" :formOpts="formOpts" :widthSize="1">
        <template #desc>
          <div style="color: red">描述</div>
        </template>
      </t-form>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { Warning } from "@element-plus/icons-vue"
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
const formOpts: any = reactive({
  ref: null,
  formData: {
    account: "wocwin", // *用户账号
    name: null, // *用户昵称
    valDate: null, // el日期选择范围
    email: null, // 邮箱
    desc: null // 描述
  },
  fieldList: [
    {
      labelRender: () => {
        return <div style="color:red;">账号</div>
      },
      placeholder: "请输入账号",
      value: "account",
      type: "input",
      comp: "el-input",
      event: "account"
    },
    {
      labelRender: () => {
        return <div style="color:blue;">昵称</div>
      },
      placeholder: "请输入昵称",
      value: "name",
      type: "input",
      comp: "el-input"
    },
    {
      labelRender: () => {
        return (
          <div style="color:#3eaf7c;cursor:pointer;display:flex;align-items:center;">
            日期组件
            <el-tooltip content="自定义label" placement="right">
              <el-icon>
                <Warning />
              </el-icon>
            </el-tooltip>
          </div>
        )
      },
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
    {
      labelRender: () => {
        return <div style="color:green;">邮箱</div>
      },
      placeholder: "请输入邮箱",
      value: "email",
      type: "input",
      comp: "el-input"
    },
    {
      labelSlotName: "desc",
      placeholder: "使用插槽自定义label",
      value: "desc",
      type: "textarea",
      comp: "el-input",
      widthSize: 1
    }
  ],
  operatorList: [
    { label: "提交", bind: { type: "danger" }, fun: submitForm },
    { label: "重置", bind: { type: "primary" }, fun: resetForm }
  ]
})
</script>
