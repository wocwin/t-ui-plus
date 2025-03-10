<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition
        labelWidth="140px"
        :opts="opts"
        isExpansion
        @submit="conditionEnter"
        @handleEvent="handleEvent"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { computed, reactive, ref, toRefs } from "vue"
import cascaderData from "./cascaderData.json"
let state = reactive({
  queryData: {
    userName: null, // 登录名
    userName2: null, // 登录名
    workshopNum: null,
    workshopNum2: null,
    workshopNum3: null,
    date: null,
    date1: [],
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
const initials = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
const stepList = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`
}))
const userName = ref()
const userName2 = ref()
const opts = computed(() => {
  return {
    userName: {
      label: "下拉选择表格组件",
      comp: "t-select-table",
      span: 2,
      isSelfCom: true,
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
    userName2: {
      label: "下拉表格组件2",
      comp: "t-select-table",
      span: 2,
      isSelfCom: true,
      bind: {
        maxHeight: 400,
        isKeyup: true,
        keywords: { label: "name", value: "id" },
        table: state.table,
        columns: state.table.columns
      },
      eventHandle: {
        radioChange: val => radioChange2(val)
      }
    },
    workshopNum: {
      label: "t-select单选使用",
      comp: "t-select",
      span: 2,
      defaultVal: "W1",
      isSelfCom: true,
      bind: {
        optionSource: state.sexList
      }
    },
    workshopNum2: {
      label: "t-select多选使用",
      placeholder: "请多选",
      span: 2,
      comp: "t-select",
      isSelfCom: true,
      bind: {
        valueCustom: "id",
        labelCustom: "name",
        multiple: true,
        optionSource: state.multipleList
      }
    },
    workshopNum3: {
      label: "虚拟列表",
      placeholder: "TSelect虚拟列表",
      span: 2,
      comp: "t-select",
      isSelfCom: true,
      bind: {
        useVirtual: true,
        optionSource: stepList
      }
    },
    icon: {
      label: "图标选择器",
      comp: "t-select-icon",
      span: 2
    },
    date1: {
      label: "t-date-picker",
      comp: "t-date-picker",
      span: 2,
      bind: {
        type: "daterange",
        isPickerOptions: true
      }
    },
    date: {
      label: "装炉时间",
      comp: "el-date-picker",
      span: 2,
      event: "date",
      bind: {
        rangeSeparator: "-",
        startPlaceholder: "开始日期",
        endPlaceholder: "结束日期",
        valueFormat: "YYYY-MM-DD",
        type: "daterange"
      }
    },
    deptCode: {
      label: "el-cascader使用",
      placeholder: "级联选择",
      span: 2,
      comp: "el-cascader",
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
const radioChange2 = val => {
  console.log("下拉选择表格组件--单选222", val)
  userName2.value = val?.name
}
// 最终参数获取
const getQueryData = computed(() => {
  const {
    userName,
    userName2,
    workshopNum,
    date,
    workshopNum2,
    workshopNum3,
    deptCode,
    date1,
    icon
  } = toRefs(state.queryData)
  return {
    userName: userName.value,
    userName2: userName2.value,
    workshopNum: workshopNum.value,
    workshopNum2: workshopNum2.value,
    workshopNum3: workshopNum3.value,
    deptCode: deptCode.value,
    date1: date1.value,
    icon: icon.value,
    beginDate: date.value && date.value[0] ? date.value[0] : null,
    endDate: date.value && date.value[1] ? date.value[1] : null
  }
})
// 查询条件change事件
const handleEvent = (type, val) => {
  // console.log(111, type, val)
  switch (type) {
    case "date":
      console.log("获取event==date的数据", val)
      break
  }
}
// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data)
  state.queryData = data
  state.queryData.userName = userName.value
  state.queryData.userName2 = userName2.value
  console.log("最终参数", getQueryData.value)
}
</script>
