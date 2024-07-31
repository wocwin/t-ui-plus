<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition
        :opts="state.opts"
        @submit="conditionEnter"
        isShowWidthSize
        :widthSize="2"
        isDropDownSelectMore
        :moreCheckList="moreCheckList"
        @getCheckList="getChildCheck"
        labelWidth="160px"
      >
      </t-query-condition>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { computed, onMounted, reactive, ref, watch } from "vue"
const listTypeInfo: any = ref({
  workshopNumList: [
    {
      label: "前纺一车间",
      value: "W1"
    },
    {
      label: "前纺二车间",
      value: "W2"
    }
  ],
  sexList: []
})
let state: any = reactive({
  queryData: {
    userName: null, // 登录名
    phonenumber: null, // 手机号码
    workshopNum: null,
    date: null,
    date2: null
  },
  hobbyList: [],
  // 选中的查询条件
  checkQuery: {},
  opts: {
    userName: {
      label: "登录名称",
      comp: "el-input"
    },
    phonenumber: {
      label: "手机号码",
      comp: "el-input"
    },
    workshopNum: {
      label: "车间",
      comp: "el-select",
      changeEvent: "change",
      type: "select-arr",
      defaultVal: "",
      list: "workshopNumList",
      arrLabel: "label",
      arrKey: "value",
      listTypeInfo: listTypeInfo.value
    },
    date: {
      label: "el-date-picker",
      comp: "el-date-picker",
      event: "date",
      bind: {
        rangeSeparator: "-",
        startPlaceholder: "开始日期",
        endPlaceholder: "结束日期",
        valueFormat: "YYYY-MM-DD",
        type: "daterange"
      }
    },
    date2: {
      label: "t-date-picker",
      comp: "t-date-picker",
      bind: {
        type: "daterange",
        isPickerOptions: true
      }
    }
  }
})
// 动态新增查询条件
const moreCheckList = computed(() => {
  return [
    { label: "姓名", comp: "el-input", prop: "name" },
    { label: "年龄", comp: "el-input", prop: "age" },
    {
      label: "性别",
      comp: "el-select",
      prop: "sex",
      arrKey: "value",
      type: "select-arr",
      changeEvent: "change",
      list: "sexList",
      listTypeInfo: listTypeInfo.value
    },
    {
      label: "爱好",
      comp: "t-select",
      prop: "hobby",
      bind: { multiple: true, optionSource: state.hobbyList, valueCustom: "value" },
      isSelfCom: true
    },
    { label: "合同号", comp: "el-input", prop: "contractNo" },
    { label: "供应商", comp: "el-input", prop: "supplier" },
    { label: "磅单号", comp: "el-input", prop: "balanceCode" },
    { label: "车牌号", comp: "el-input", prop: "license" },
    { label: "备注", comp: "el-input", prop: "remark" },
    { label: "检验员", comp: "el-input", prop: "inspector" },
    { label: "取样人", comp: "el-input", prop: "sampler" },
    { label: "审核人", comp: "el-input", prop: "reviewer" },
    { label: "其他检验项", comp: "el-input", prop: "physicsInspection" },
    { label: "实际数量", comp: "el-input", prop: "factQuantity" }
  ]
})
watch(
  () => state.checkQuery,
  (nval, oval) => {
    // console.log("旧值", oval)
    // console.log("新值", nval)
    for (let i = 0; i < Object.keys(oval).length; i++) {
      delete state.opts[Object.keys(oval)[i]]
    }
    state.opts = {
      ...state.opts,
      ...nval
    }
    for (let i = 0; i < Object.keys(state.opts).length; i++) {
      state.queryData[Object.keys(state.opts)[i]] = null
    }
  },
  { deep: true }
)
onMounted(() => {
  getList()
})
const getList = () => {
  listTypeInfo.value.sexList = [
    { label: "男", value: "1" },
    { label: "女", value: "2" }
  ]
  state.hobbyList = [
    { label: "吉他", value: "0" },
    { label: "看书", value: "1" },
    { label: "美剧", value: "2" },
    { label: "旅游", value: "3" },
    { label: "音乐", value: "4" }
  ]
}
// 获取选中的查询条件
const getChildCheck = val => {
  state.checkQuery = val
}
// 点击查询按钮
const conditionEnter = (data: any) => {
  state.queryData = data
  console.log("最终参数", state.queryData)
}
</script>
