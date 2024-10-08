<template>
  <t-adaptive-page
    class="menu_mange"
    tableTitle="操作TTable表尾合计行"
    ref="TAdaptivePageSummary"
    isCopy
    :table="table"
    :columns="table.columns"
    :opts="opts"
    isShowWidthSize
    :widthSize="3"
    labelWidth="140px"
    :isShowPagination="false"
    @submit="conditionEnter"
    show-summary
  ></t-adaptive-page>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue"
const table = ref<TableTypes.Table>({
  data: [
    {
      id: "1",
      date: "2019-09-25",
      date1: "2019-09-26",
      name: "张三",
      status: "2",
      num: 1,
      address: "广东省广州市天河区"
    },
    {
      id: "2",
      date: "2019-09-26",
      date1: "2019-09-27",
      name: "张三1",
      status: "1",
      num: 2,
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    },
    {
      id: "3",
      date: "2019-09-26",
      date1: "2019-09-28",
      name: "张三1",
      status: "1",
      num: 3,
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    },
    {
      id: "4",
      date: "2019-09-26",
      date1: "2019-09-29",
      name: "张三1",
      status: "1",
      num: 4,
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    }
  ],
  // 表头数据
  columns: [
    { prop: "name", label: "姓名", minWidth: "100" },
    { prop: "date", label: "日期", minWidth: "180" },
    { prop: "status", label: "状态", minWidth: "80" },
    { prop: "num", label: "数量", minWidth: "80" },
    { prop: "address", label: "地址", minWidth: "220" }
  ]
})
const state = reactive({
  queryData: {
    userName: null, // 登录名
    nickName: null, // 用户状态
    workshopNum: null,
    phonenumber: null,
    date1: null,
    date: null
  },
  multipleList: [
    {
      name: "前纺一车间",
      id: "W1"
    },
    {
      name: "前纺二车间",
      id: "W2"
    },
    {
      name: "前纺三车间",
      id: "W3"
    },
    {
      name: "前纺四车间",
      id: "W4"
    }
  ],
  table: {
    data: [
      { id: 1, code: 1, name: "物料名称1", spec: "物料规格1", unitName: "吨" },
      { id: 2, code: 2, name: "物料名称2", spec: "物料规格2", unitName: "吨" },
      { id: 3, code: 3, name: "物料名称3", spec: "物料规格3", unitName: "吨" },
      { id: 4, code: 4, name: "物料名称4", spec: "物料规格4", unitName: "吨" },
      { id: 5, code: 5, name: "物料名称5", spec: "物料规格5", unitName: "吨" },
      { id: 6, code: 6, name: "物料名称6", spec: "物料规格6", unitName: "吨" },
      { id: 7, code: 7, name: "物料名称7", spec: "物料规格7", unitName: "吨" },
      { id: 8, code: 8, name: "物料名称8", spec: "物料规格8", unitName: "吨" },
      { id: 9, code: 9, name: "物料名称9", spec: "物料规格9", unitName: "吨" }
    ],
    columns: [
      { label: "物料编号", width: "100px", prop: "code" },
      { label: "物料名称", width: "149px", prop: "name" },
      { label: "规格", width: "149px", prop: "spec" },
      { label: "单位", width: "110px", prop: "unitName" }
    ]
  }
})
const opts = computed(() => {
  return {
    userName: {
      label: "下拉选择表格使用",
      comp: "t-select-table",
      isSelfCom: true,
      bind: {
        maxHeight: 400,
        isKeyup: true,
        keywords: { label: "name", value: "id" },
        table: state.table,
        columns: state.table.columns,
        "show-summary": false
      },
      eventHandle: {
        radioChange: val => radioChange(val)
      }
    },
    nickName: {
      label: "姓名",
      comp: "el-input"
    },
    phonenumber: {
      label: "手机号码",
      comp: "el-input"
    },
    date1: {
      label: "日期组件使用",
      comp: "t-date-picker",
      bind: {
        isPickerOptions: true
      }
    },
    workshopNum: {
      label: "t-select使用",
      placeholder: "请多选",
      comp: "t-select",
      isSelfCom: true,
      bind: {
        valueCustom: "id",
        labelCustom: "name",
        multiple: true,
        optionSource: state.multipleList
      }
    },
    date: {
      label: "创建时间",
      comp: "t-date-picker",
      bind: {
        type: "daterange"
      }
    }
  }
})
const userName = ref(null)
const radioChange = val => {
  console.log("下拉选择表格组件--单选", val, opts.value)
  userName.value = val.name
}
// 点击查询按钮
const conditionEnter = (data: any) => {
  state.queryData = data
  state.queryData.userName = userName.value
  console.log("最终参数", state.queryData)
}
</script>
