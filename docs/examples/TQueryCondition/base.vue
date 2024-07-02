<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition
        :opts="opts"
        @submit="conditionEnter"
        @handleEvent="handleEvent"
        isExpansion
        labelWidth="160px"
        :btnResetBind="{ size: 'small', btnTxt: '重置', icon: 'Search' }"
      >
        <template #disabledDate="{ param }">
          <el-date-picker
            v-model="param.disabledDate"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            :disabled-date="disabledDate"
            @calendar-change="calendarChange"
          />
        </template>
      </t-query-condition>
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
    disabledDate: null,
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
// 禁用日期（只能选择7天内）
const firstChooseDate: any = ref("")
const disabledDate = (time: Date) => {
  if (firstChooseDate.value) {
    const timeRange = 1 * 24 * 60 * 60 * 1000 // 1天时间戳
    const minTime = firstChooseDate.value - timeRange * 7
    const maxTime = firstChooseDate.value + timeRange * 6
    return time.getTime() <= minTime || time.getTime() > maxTime
  } else {
    return false
  }
}
const calendarChange = (val: any) => {
  console.log("calendarChange----", val)
  firstChooseDate.value = val[0].getTime() //点击第一次选中日期
  if (val[1]) firstChooseDate.value = "" // 选中后必须清空
}
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
      span: 2,
      list: "sexList",
      arrLabel: "label",
      arrKey: "value",
      listTypeInfo: state.listTypeInfo
    },
    disabledDate: {
      labelRender: () => {
        return <label style="color:red">插槽禁用时间</label>
      },
      span: 2,
      slotName: "disabledDate"
    },
    date: {
      label: "el-date-picker",
      labelRender: () => {
        return <label style="color:red">el-date-picker禁用</label>
      },
      comp: "el-date-picker",
      span: 2,
      event: "date",
      bind: {
        rangeSeparator: "-",
        startPlaceholder: "开始日期",
        endPlaceholder: "结束日期",
        valueFormat: "YYYY-MM-DD",
        type: "daterange",
        "disabled-date": disabledDate
      },
      eventHandle: {
        calendarChange: val => calendarChange(val)
      }
    },
    date2: {
      label: "t-date-picker",
      labelRender: () => {
        return <label style="color:red">t-date-picker禁用</label>
      },
      comp: "t-date-picker",
      span: 2,
      bind: {
        type: "daterange",
        "disabled-date": disabledDate
      },
      eventHandle: {
        calendarChange: val => calendarChange(val)
      }
    },
    date1: {
      label: "日期",
      comp: "el-date-picker",
      bind: {
        valueFormat: "YYYY-MM-DD",
        "disabled-date": time => {
          return time.getTime() < new Date()
        }
      }
    }
  }
})
// 最终参数获取
const getQueryData = computed(() => {
  const { userName, phonenumber, workshopNum, date, date1, date2, disabledDate } = toRefs(
    state.queryData
  )
  return {
    userName: userName.value,
    workshopNum: workshopNum.value,
    phonenumber: phonenumber.value,
    start_time: disabledDate.value && disabledDate.value[0] ? disabledDate.value[0] : null,
    end_time: disabledDate.value && disabledDate.value[1] ? disabledDate.value[1] : null,
    date2: date2.value,
    date1: date1.value,
    beginDate: date.value && date.value[0] ? date.value[0] : null,
    endDate: date.value && date.value[1] ? date.value[1] : null
  }
})
// 查询条件change事件
const handleEvent = (type, val) => {
  console.log("handleEvent", type, val)
  switch (type) {
    case "date":
      const arr = [
        {
          label: "前纺一车间666",
          value: "W5"
        },
        {
          label: "前纺二车间999",
          value: "W6"
        }
      ]
      state.listTypeInfo.sexList = [...state.listTypeInfo.sexList, ...arr]
      console.log("获取event==date的数据", val)
      break
  }
}
onMounted(() => {
  chageDefaultVal()
})
const chageDefaultVal = () => {
  opts.value.workshopNum.defaultVal = "W2"
  console.log("opts.value.workshopNum", opts.value.workshopNum)
  const arr = [
    {
      label: "前纺一车间22",
      value: "W3"
    },
    {
      label: "前纺二车间33",
      value: "W4"
    }
  ]
  state.listTypeInfo.sexList = [...state.listTypeInfo.sexList, ...arr]
  // state.listTypeInfo.sexList = arr
}
// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data)
  state.queryData = data
  console.log("最终参数", getQueryData.value)
}
</script>
