<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition
        :opts="opts"
        labelWidth="140px"
        @submit="conditionEnter"
        @handleEvent="handleEvent"
      >
        <template #date1="{ param }">
          <el-date-picker
            v-model="param.date1"
            type="date"
            placeholder="请选择日期"
            value-format="YYYY-MM-DD"
          />
        </template>
        <template #date2="{ scope }">
          <el-date-picker
            v-model="scope.date2"
            type="date"
            placeholder="请选择日期"
            value-format="YYYY-MM-DD"
          />
        </template>
      </t-query-condition>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { computed, reactive, toRefs } from "vue"
let state = reactive({
  queryData: {
    userName: null, // 登录名
    phonenumber: null, // 手机号码
    workshopNum: null,
    date: null,
    date1: null,
    date2: null,
    likeTransportNo: null
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
    ],
    hobbyList: [
      { label: "点击类", value: 1 },
      { label: "回复类", value: 2 }
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
    likeTransportNo: {
      label: "多选",
      defaultVal: [1],
      comp: "el-checkbox-group",
      type: "checkbox",
      list: "hobbyList",
      listTypeInfo: state.listTypeInfo,
      span: 2
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
      label: "插槽使用(param)",
      slotName: "date1"
    },
    date2: {
      label: "插槽使用(scope)",
      slotName: "date2"
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
  const { userName, phonenumber, workshopNum, date, date1, date2, likeTransportNo } = toRefs(
    state.queryData
  )
  return {
    userName: userName.value,
    workshopNum: workshopNum.value,
    phonenumber: phonenumber.value,
    date1: date1.value,
    beginDate: date.value && date.value[0] ? date.value[0] : null,
    endDate: date.value && date.value[1] ? date.value[1] : null,
    date2: date2.value,
    likeTransportNo: likeTransportNo.value
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
  console.log("最终参数", getQueryData.value)
}
</script>
