<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition
        :opts="opts"
        @submit="conditionEnter"
        isExpansion
        isShowWidthSize
        :widthSize="2"
        labelWidth="160px"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { computed, onMounted, reactive, ref, toRefs } from "vue"
let state = reactive({
  queryData: {
    userName: "wocwin", // 登录名
    workshopNum: "W1", // 车间编号
    email: "wocwin@163.com",
    date: ["2024-10-11", "2024-10-12"],
    date2: ["2024-10-13", "2024-10-14"],
    date1: "2024-10-11"
  },
  listTypeInfo: {
    sexList: [
      {
        label: "前纺一车间",
        value: "W1"
      },
      {
        label: "前纺二车间",
        value: "W2"
      }
    ]
  }
})
const opts = computed(() => {
  return {
    userName: {
      label: "登录名称",
      defaultVal: "wocwin",
      comp: "el-input"
    },
    email: {
      label: "邮箱",
      defaultVal: "wocwin@163.com",
      comp: "el-input"
    },
    workshopNum: {
      label: "车间",
      comp: "el-select",
      changeEvent: "change",
      type: "select-arr",
      defaultVal: "W1",
      list: "sexList",
      arrLabel: "label",
      arrKey: "value",
      listTypeInfo: state.listTypeInfo
    },
    date1: {
      label: "日期",
      comp: "el-date-picker",
      defaultVal: "2024-10-11",
      bind: {
        valueFormat: "YYYY-MM-DD"
      }
    },
    date: {
      label: "el-date-picker",
      labelRender: () => {
        return <label style="color:red">el-date-picker使用</label>
      },
      comp: "el-date-picker",
      span: 2,
      defaultVal: ["2024-10-11", "2024-10-12"],
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
      labelRender: () => {
        return <label style="color:red">t-date-picker使用</label>
      },
      comp: "t-date-picker",
      defaultVal: ["2024-10-13", "2024-10-14"],
      span: 2,
      bind: {
        type: "daterange"
      }
    }
  }
})
// 最终参数获取
const getQueryData = computed(() => {
  const { userName, workshopNum, email, date, date1, date2 } = toRefs(state.queryData)
  return {
    userName: userName.value,
    workshopNum: workshopNum.value,
    email: email.value,
    start_time: date2.value && date2.value[0] ? date2.value[0] : null,
    end_time: date2.value && date2.value[1] ? date2.value[1] : null,
    date1: date1.value,
    beginDate: date.value && date.value[0] ? date.value[0] : null,
    endDate: date.value && date.value[1] ? date.value[1] : null
  }
})

onMounted(() => {
  console.log("最终参数", getQueryData.value)
})
// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log("点击查询按钮--参数", data)
  state.queryData = data
  console.log("最终参数", getQueryData.value)
}
</script>
