<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition
        ref="queryConditionRef"
        :opts="opts"
        @submit="conditionEnter"
        @handleEvent="handleEvent"
      >
        <template #footerBtn>
          <el-button type="danger" @click="queryConditionRef.resetHandle()">重置</el-button>
          <el-button type="primary" @click="queryConditionRef.checkHandle()">查询</el-button>
        </template>
      </t-query-condition>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { computed, reactive, ref, toRefs } from "vue"
let state = reactive({
  queryData: {
    userName: null, // 登录名
    phonenumber: null, // 手机号码
    workshopNum: null,
    date: null,
    date1: null
  },
  listTypeInfo: {
    sexList: [
      {
        label: "前纺一车间",
        key: "W1"
      },
      {
        label: "前纺二车间",
        key: "W2"
      }
    ]
  }
})
const opts = computed(() => {
  return {
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
      list: "sexList",
      listTypeInfo: state.listTypeInfo
    },
    date1: {
      label: "日期",
      comp: "el-date-picker",
      bind: {
        valueFormat: "YYYY-MM-DD"
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
    }
  }
})
// 最终参数获取
const getQueryData = computed(() => {
  const { userName, phonenumber, workshopNum, date, date1 } = toRefs(state.queryData)
  return {
    userName: userName.value,
    workshopNum: workshopNum.value,
    phonenumber: phonenumber.value,
    date1: date1.value,
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
const queryConditionRef: any = ref(null)
// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data)
  state.queryData = data
  console.log("最终参数", getQueryData.value)
}
</script>
