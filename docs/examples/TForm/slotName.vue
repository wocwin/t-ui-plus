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
