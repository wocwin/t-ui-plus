<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form ref="TFormDemo" v-model="formOpts.ref" :formOpts="formOpts" :widthSize="1">
        <template #wechat>
          <el-input v-model="formOpts.formData.wechat" placeholder="自定义输入框插槽"></el-input>
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
        <template #accountType1>
          <el-option
            v-for="(item, key) in formOpts.listTypeInfo.accountTypeList1"
            :key="key"
            :label="item.label"
            :value="item.value"
          ></el-option>
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
  formData: {
    accountType: "", // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
    accountType1: "", // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
    wechat: "", // 邮箱
    desc: "" // 描述
  },
  fieldList: [
    {
      label: "平台用户",
      placeholder: "自定义option--obj插槽",
      value: "accountType",
      comp: "el-select",
      childSlotName: "accountType"
    },
    {
      label: "平台用户1",
      placeholder: "自定义option--arr插槽",
      value: "accountType1",
      comp: "el-select",
      childSlotName: "accountType1"
    },
    { label: "微信", value: "wechat", slotName: "wechat" },
    {
      label: "描述",
      value: "desc",
      type: "textarea",
      comp: "el-input",
      className: "t-form-block"
    }
  ],
  operatorList: [
    { label: "提交", bind: { type: "danger" }, fun: submitForm },
    { label: "重置", bind: { type: "primary" }, fun: resetForm }
  ],
  // 相关列表
  listTypeInfo: {
    accountTypeList: {
      0: "手机用户",
      1: "论坛用户",
      2: "平台用户"
    },
    accountTypeList1: [
      { label: "手机用户", value: 0 },
      { label: "论坛用户", value: 1 },
      { label: "平台用户", value: 2 }
    ]
  }
})
</script>
