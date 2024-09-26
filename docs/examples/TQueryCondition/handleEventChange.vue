<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition
        ref="handleEventChangeRef"
        :opts="opts"
        @submit="conditionEnter"
        isExpansion
        isShowWidthSize
        :widthSize="3"
        labelWidth="160px"
      ></t-query-condition>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { computed, onMounted, reactive, ref, toRefs } from "vue"
let state: any = reactive({
  queryData: {
    userName: null, // 登录名
    phonenumber: null, // 手机号码
    workshopNum: null,
    date: null,
    date2: null,
    date1: null
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
const handleEventChangeRef: any = ref(null)
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
      defaultVal: "",
      list: "sexList",
      arrLabel: "label",
      arrKey: "value",
      listTypeInfo: state.listTypeInfo
    },
    date: {
      label: "el-date-picker",
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
    date1: {
      label: "日期",
      comp: "el-date-picker",
      bind: {
        valueFormat: "YYYY-MM-DD"
      }
    },
    date2: {
      label: "t-date-picker",
      comp: "t-date-picker",
      span: 2,
      bind: {
        type: "daterange"
      }
    }
  }
})
// 最终参数获取
const getQueryData = computed(() => {
  const { userName, phonenumber, workshopNum, date, date1, date2 } = toRefs(state.queryData)
  return {
    userName: userName.value,
    workshopNum: workshopNum.value,
    phonenumber: phonenumber.value,
    date2: date2.value,
    date1: date1.value,
    beginDate: date.value && date.value[0] ? date.value[0] : null,
    endDate: date.value && date.value[1] ? date.value[1] : null
  }
})

onMounted(() => {
  // console.log("ref--", handleEventChangeRef.value)
  // 设置车间默认值
  handleEventChangeRef.value.handleEvent({ isChange: true, val: "W2" }, "workshopNum")
})

// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data)
  state.queryData = data
  console.log("最终参数", getQueryData.value)
}
</script>
