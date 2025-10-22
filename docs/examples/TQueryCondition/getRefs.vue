<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition
        labelWidth="140px"
        :opts="opts"
        ref="queryRef"
        @submit="conditionEnter"
        @getRefs="getRefs"
        :isShowOpen="false"
      >
        <template #querybar>
          <el-button size="small" type="danger" @click="() => resetValue('selectTableRef')"
            >重置选择表格组件</el-button
          >
          <el-button size="small" type="danger" @click="() => resetValue('workshopNumRef')"
            >重置车间</el-button
          >
          <el-button size="small" type="danger" @click="() => resetValue('iconRef')"
            >重置图标</el-button
          >
          <el-button size="small" type="danger" @click="() => resetValue('elDateRef')"
            >重置El日期</el-button
          >
          <el-button size="small" type="danger" @click="() => resetValue('elDateRef1')"
            >另一种重置日期</el-button
          >
          <el-button size="small" type="danger" @click="() => resetValue('dateRef')"
            >重置日期范围</el-button
          >
          <el-button size="small" type="danger" @click="() => resetValue('elCascaderRef')"
            >重置级联选择</el-button
          >
        </template>
      </t-query-condition>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { computed, reactive, ref, toRefs } from "vue"
import cascaderData from "./cascaderData.json"
const queryRef = ref()
let state = reactive({
  queryData: {
    userName: null, // 登录名
    workshopNum: null,
    date: null,
    date1: null,
    valDate: null,
    deptCode: null,
    icon: ""
  },
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
  },
  sexList: [
    {
      label: "前纺一车间",
      key: "W1"
    },
    {
      label: "前纺二车间",
      key: "W2"
    }
  ],
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
  ]
})
const allRefs = ref({})
const getRefs = (el, item, index) => {
  if (el && item.ref) {
    // console.log("获取所有的ref--getRefs", el, item, index)
    allRefs.value[item.ref] = el
  }
}
// 重置
const resetValue = type => {
  const resetActions = {
    iconRef: () => allRefs.value[type].clearIcon(),
    elDateRef: () => (queryRef.value.queryState.form.date = null),
    elDateRef1: () => (queryRef.value.queryState.form.date1 = null),
    elCascaderRef: () => allRefs.value[type].cascaderPanelRef.clearCheckedNodes(),
    default: () => allRefs.value[type].clear()
  }
  resetActions[type] ? resetActions[type]() : resetActions.default()
}
const userName = ref()
const opts = computed(() => {
  return {
    userName: {
      label: "下拉选择表格组件",
      comp: "t-select-table",
      span: 2,
      isSelfCom: true,
      ref: "selectTableRef",
      bind: {
        maxHeight: 400,
        isKeyup: true,
        keywords: { label: "name", value: "id" },
        table: state.table,
        columns: state.table.columns
      },
      eventHandle: {
        radioChange: val => radioChange(val)
      }
    },
    workshopNum: {
      label: "车间",
      placeholder: "请多选",
      span: 2,
      comp: "t-select",
      ref: "workshopNumRef",
      isSelfCom: true,
      bind: {
        valueCustom: "id",
        labelCustom: "name",
        multiple: true,
        optionSource: state.multipleList
      }
    },
    icon: {
      label: "图标选择器",
      comp: "t-select-icon",
      ref: "iconRef",
      span: 2
    },
    date: {
      label: "El日期",
      comp: "el-date-picker",
      span: 2,
      ref: "elDateRef",
      bind: {
        rangeSeparator: "-",
        startPlaceholder: "开始日期",
        endPlaceholder: "结束日期",
        valueFormat: "YYYY-MM-DD",
        type: "daterange"
      }
    },
    date1: {
      label: "日期",
      comp: "el-date-picker",
      span: 2,
      ref: "elDateRef1",
      bind: {
        rangeSeparator: "-",
        startPlaceholder: "开始日期",
        endPlaceholder: "结束日期",
        valueFormat: "YYYY-MM-DD",
        type: "daterange"
      }
    },
    valDate: {
      label: "日期范围",
      comp: "t-date-picker",
      span: 2,
      ref: "dateRef",
      bind: { type: "daterange", isPickerOptions: true }
    },
    deptCode: {
      label: "el-cascader使用",
      placeholder: "级联选择",
      span: 2,
      comp: "el-cascader",
      ref: "elCascaderRef",
      isSelfCom: true,
      bind: {
        props: {
          children: "children",
          label: "deptName",
          value: "deptNum"
        },
        "show-all-levels": false,
        options: cascaderData.data
      }
    }
  }
})
const radioChange = val => {
  console.log("下拉选择表格组件--单选", val, opts.value)
  userName.value = val?.name
}

// 最终参数获取
const getQueryData = computed(() => {
  const { userName, workshopNum, date, deptCode, icon, valDate, date1 } = toRefs(state.queryData)
  return {
    userName: userName.value,
    workshopNum: workshopNum.value,
    deptCode: deptCode.value,
    icon: icon.value,
    valDate: valDate.value,
    date1: date1.value,
    beginDate: date.value && date.value[0] ? date.value[0] : null,
    endDate: date.value && date.value[1] ? date.value[1] : null
  }
})

// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data)
  state.queryData = data
  state.queryData.userName = userName.value
  console.log("最终参数", getQueryData.value)
}
</script>
