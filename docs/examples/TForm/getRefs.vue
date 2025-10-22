<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form
        ref="TFormDemo"
        v-model="formOpts.ref"
        :formOpts="formOpts"
        @getRefs="getRefs"
        :widthSize="1"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import cascaderData from "./cascaderData.json"
const hobbyList = ref([
  { label: "吉他", value: "0" },
  { label: "看书", value: "1" },
  { label: "美剧", value: "2" },
  { label: "旅游", value: "3" },
  { label: "音乐", value: "4" }
])
const sexList = ref([
  { label: "女", value: 1 },
  { label: "男", value: 0 }
])
const tableData = ref([
  { id: 1, code: 1, name: "物料名称1", spec: "物料规格1", unitName: "吨" },
  { id: 2, code: 2, name: "物料名称2", spec: "物料规格2", unitName: "吨" },
  { id: 3, code: 3, name: "物料名称3", spec: "物料规格3", unitName: "吨" },
  { id: 4, code: 4, name: "物料名称4", spec: "物料规格4", unitName: "吨" },
  { id: 5, code: 5, name: "物料名称5", spec: "物料规格5", unitName: "吨" },
  { id: 6, code: 6, name: "物料名称6", spec: "物料规格6", unitName: "吨" },
  { id: 7, code: 7, name: "物料名称7", spec: "物料规格7", unitName: "吨" },
  { id: 8, code: 8, name: "物料名称8", spec: "物料规格8", unitName: "吨" },
  { id: 9, code: 9, name: "物料名称9", spec: "物料规格9", unitName: "吨" }
])
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
  TFormDemo.value.selfResetFields()
}
const resetValue = type => {
  console.log("reset---重置", type)
  const resetActions = {
    cascaderRef: () => allRefs.value[type].cascaderPanelRef.clearCheckedNodes(),
    elDateRef: () => (formOpts.formData.valDate = null),
    iconRef: () => allRefs.value[type].clearIcon(),
    default: () => allRefs.value[type].clear()
  }
  resetActions[type] ? resetActions[type]() : resetActions.default()
}

const radioChange = row => {
  console.log("下拉选择表格-单选", row)
  formOpts.formData.deptCode = row?.id
}
const allRefs = ref({})
const getRefs = (el, item, index) => {
  if (el && item.ref) {
    // console.log("获取所有的ref--getRefs", el, item, index)
    allRefs.value[item.ref] = el
  }
}
onMounted(() => {
  console.log("获取所有的ref", allRefs.value)
})
const formOpts = reactive<FormTypes.FormOpts>({
  ref: null,
  labelWidth: "140px",
  formData: {
    sex: null,
    hobby: null,
    deptCode: null,
    createDeptCode: null,
    valDate: null,
    date: null,
    icon: ""
  },
  fieldList: [
    {
      label: "性别",
      value: "sex",
      placeholder: "TSelect单选",
      type: "select-arr",
      comp: "t-select",
      ref: "sexRef",
      isSelfCom: true,
      bind: { optionSource: sexList, valueCustom: "value" }
    },
    {
      label: "爱好",
      value: "hobby",
      placeholder: "TSelect多选",
      comp: "t-select",
      ref: "hobbyRef",
      isSelfCom: true,
      bind: { multiple: true, optionSource: hobbyList, valueCustom: "value" }
    },
    {
      label: "图标选择器",
      value: "icon",
      placeholder: "TSelectIcon图标选择",
      comp: "t-select-icon",
      ref: "iconRef",
      isSelfCom: true
      // bind: { multiple: true }
    },
    {
      label: "El日期",
      value: "valDate",
      type: "daterange",
      comp: "el-date-picker",
      ref: "elDateRef",
      bind: {
        rangeSeparator: "-",
        startPlaceholder: "开始日期",
        endPlaceholder: "结束日期",
        valueFormat: "YYYY-MM-DD"
      }
    },
    {
      label: "日期范围",
      value: "date",
      comp: "t-date-picker",
      ref: "dateRef",
      bind: { type: "daterange", isPickerOptions: true }
    },
    {
      label: "部门",
      value: "createDeptCode",
      placeholder: "el-cascader使用",
      comp: "el-cascader",
      isSelfCom: true,
      ref: "cascaderRef",
      bind: {
        props: {
          children: "children",
          label: "deptName",
          value: "deptNum"
        },
        options: cascaderData.data
      }
    },
    {
      label: "下拉选择表格-单选",
      value: "deptCode",
      placeholder: "t-select-table单选使用",
      ref: "selectTableRef",
      comp: "t-select-table",
      isSelfCom: true,
      bind: {
        isKeyup: true,
        maxHeight: 400,
        keywords: { label: "name", value: "id" },
        table: { data: tableData },
        columns: [
          { label: "物料编号", width: "100px", prop: "code", align: "left" },
          { label: "物料名称", width: "149px", prop: "name" },
          { label: "规格", width: "149px", prop: "spec" },
          { label: "单位", width: "110px", prop: "unitName" },
          { label: "物料编号1", width: "149px", prop: "code" },
          { label: "物料名称1", width: "149px", prop: "name" }
        ]
      },
      eventHandle: {
        radioChange: val => radioChange(val)
      }
    }
  ],
  operatorList: [
    { label: "提交", bind: { type: "danger" }, fun: submitForm },
    { label: "重置", bind: { type: "primary" }, fun: resetForm },
    {
      label: "重置下拉表格",
      bind: { type: "primary" },
      fun: () => resetValue("selectTableRef")
    },
    { label: "重置性别", bind: { type: "primary" }, fun: () => resetValue("sexRef") },
    { label: "重置图标", bind: { type: "primary" }, fun: () => resetValue("iconRef") },
    { label: "重置部门", bind: { type: "primary" }, fun: () => resetValue("cascaderRef") },
    { label: "重置爱好", bind: { type: "primary" }, fun: () => resetValue("hobbyRef") },
    { label: "重置el日期", bind: { type: "primary" }, fun: () => resetValue("elDateRef") },
    { label: "重置日期范围", bind: { type: "primary" }, fun: () => resetValue("dateRef") }
  ]
})
</script>
