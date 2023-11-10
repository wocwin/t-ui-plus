<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form ref="TFormDemo" v-model="formOpts.ref" :formOpts="formOpts" :widthSize="1">
        <template #wechat>
          <t-select-table
            :table="table"
            :columns="table.columns"
            :max-height="400"
            placeholder="使用下拉选择表格组件"
            :defaultSelectVal="formOpts.formData.wechat"
            :keywords="{ label: 'name', value: 'id' }"
            @radioChange="radioChange"
          ></t-select-table>
        </template>
      </t-form>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
const table = {
  data: [
    { id: 1, code: 1, name: '物料名称1', spec: '物料规格1', unitName: '吨' },
    { id: 2, code: 2, name: '物料名称2', spec: '物料规格2', unitName: '吨' },
    { id: 3, code: 3, name: '物料名称3', spec: '物料规格3', unitName: '吨' },
    { id: 4, code: 4, name: '物料名称4', spec: '物料规格4', unitName: '吨' },
    { id: 5, code: 5, name: '物料名称5', spec: '物料规格5', unitName: '吨' },
    { id: 6, code: 6, name: '物料名称6', spec: '物料规格6', unitName: '吨' },
    { id: 7, code: 7, name: '物料名称7', spec: '物料规格7', unitName: '吨' },
    { id: 8, code: 8, name: '物料名称8', spec: '物料规格8', unitName: '吨' },
    { id: 9, code: 9, name: '物料名称9', spec: '物料规格9', unitName: '吨' },
    {
      id: 10,
      code: 10,
      name: '物料名称10',
      spec: '物料规格10',
      unitName: '吨',
    },
    {
      id: 11,
      code: 11,
      name: '物料名称11',
      spec: '物料规格11',
      unitName: '吨',
    },
    {
      id: 12,
      code: 12,
      name: '物料名称12',
      spec: '物料规格12',
      unitName: '吨',
    },
    {
      id: 13,
      code: 13,
      name: '物料名称13',
      spec: '物料规格13',
      unitName: '吨',
    },
  ],
  columns: [
    { label: '物料编号', width: '100px', prop: 'code' },
    { label: '物料名称', width: '149px', prop: 'name' },
    { label: '规格', width: '149px', prop: 'spec' },
    { label: '单位', width: '110px', prop: 'unitName' },
    { label: '物料编号1', width: '149px', prop: 'code' },
    { label: '物料名称1', width: '149px', prop: 'name' },
    { label: '规格1', width: '149px', prop: 'spec' },
    { label: '单位1', width: '110px', prop: 'unitName' },
    { label: '物料编号11', width: '149px', prop: 'code' },
    { label: '物料名称11', width: '149px', prop: 'name' },
    { label: '规格11', width: '149px', prop: 'spec' },
    { label: '单位11', width: '110px', prop: 'unitName' },
    { label: '物料编号111', width: '149px', prop: 'code' },
    { label: '物料名称111', width: '149px', prop: 'name' },
    { label: '规格111', width: '149px', prop: 'spec' },
    { label: '单位111', width: '110px', prop: 'unitName' },
  ],
}
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
const radioChange = (row) => {
  console.log('单选--传给后台的值', row)
  formOpts.formData.wechat = row.id
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
    wechat: null,
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
      isSelfCom: true,
      bind: { optionSource: sexList.value, valueCustom: 'value' },
    },
    {
      label: '状态',
      value: 'status',
      placeholder: 'TSelect单选',
      type: 'select-arr',
      comp: 't-select',
      isSelfCom: true,
      bind: { optionSource: statusList, valueCustom: 'value' },
    },
    {
      label: '爱好',
      value: 'hobby',
      placeholder: 'TSelect多选',
      type: 'select-arr',
      comp: 't-select',
      list: 'hobbyList',
      isSelfCom: true,
      bind: { multiple: true, optionSource: hobbyList, valueCustom: 'value' },
    },
    {
      label: '下拉选择表格',
      value: 'wechat',
      slotName: 'wechat',
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
    wechat: 3,
  }
  formOpts.formData = objShow
}
</script>
