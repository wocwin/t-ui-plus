<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form
        ref="TFormDemo"
        v-model="formOpts.ref"
        :formOpts="formOpts"
        :widthSize="2"
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
const statusList = ref([
  { label: "启用", value: 1 },
  { label: "停用", value: 0 }
])
// 获取ref
const TFormDemo = ref<HTMLElement | any>(null)
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
const allRefs = ref({})
const getRefs = (el, item, index) => {
  if (el && item.ref) {
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
    status: null,
    hobby: null,
    icon: "",
    createDate: null,
    date: null,
    wechat: null,
    deptCode: null,
    createDeptCode: null,
    valDate3: null
  },
  fieldList: [
    {
      label: "性别",
      value: "sex",
      placeholder: "选择女显示状态",
      type: "select-arr",
      comp: "t-select",
      ref: "adioSelect",
      isSelfCom: true,
      bind: { optionSource: sexList, valueCustom: "value" }
    },
    {
      label: "状态",
      value: "status",
      placeholder: "TSelect单选",
      type: "select-arr",
      comp: "t-select",
      isSelfCom: true,
      bind: { optionSource: statusList, valueCustom: "value" },
      isHideItem: data => {
        return data.sex == "1"
      }
    },
    {
      label: "爱好",
      value: "hobby",
      placeholder: "有值时显示图标选择器",
      comp: "t-select",
      isSelfCom: true,
      bind: { multiple: true, optionSource: hobbyList, valueCustom: "value" }
    },
    {
      label: "图标选择器",
      value: "icon",
      placeholder: "TSelectIcon图标选择",
      comp: "t-select-icon",
      isSelfCom: true,
      isHideItem: data => {
        return data.hobby && data.hobby.length > 0
      }
    },
    {
      label: "年份",
      value: "createDate",
      placeholder: "有值时显示日期选择",
      bind: { type: "year" },
      comp: "t-date-picker",
      eventHandle: {
        change: val => createDateChange(val)
      }
    },
    {
      label: "日期",
      value: "date",
      placeholder: "TDatePicker选择日期",
      comp: "t-date-picker",
      isHideItem: data => {
        return data.createDate && data.createDate.length > 0
      }
    },
    {
      label: "时间范围",
      value: "valDate3",
      placeholder: "有值时显示el-cascader使用",
      comp: "t-date-picker",
      bind: { type: "datetimerange", isPickerOptions: true }
    },
    {
      label: "部门",
      value: "deptCode1",
      placeholder: "el-cascader使用",
      comp: "el-cascader",
      isSelfCom: true,
      bind: {
        props: {
          children: "children",
          label: "deptName",
          value: "deptNum"
        },
        options: cascaderData.data
      },
      isHideItem: data => {
        return data.valDate3 && data.valDate3.length > 0
      }
    }
  ],
  operatorList: [
    { label: "提交", bind: { type: "danger" }, fun: submitForm },
    { label: "重置", bind: { type: "primary" }, fun: resetForm }
  ]
})

const createDateChange = val => {
  console.log("年份选择", val)
}
</script>
