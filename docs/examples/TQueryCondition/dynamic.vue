<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition
        :opts="opts"
        @submit="conditionEnter"
        @handleEvent="handleEvent"
        isShowWidthSize
        :widthSize="3"
        isExpansion
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { computed, onMounted, reactive, ref, toRefs, watch } from "vue"
const listTypeInfo: any = ref({
  sexList: []
})
let state = reactive({
  queryData: {
    userName: null, // 登录名
    workshopNum: null,
    workshopNum2: null,
    date: null,
    date1: null,
    phonenumber: null,
    email: null,
    remark: null
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
  },
  opt: {
    userName: {
      label: "登录名称",
      comp: "el-input"
    },
    workshopNum: {
      label: "车间",
      comp: "el-select",
      changeEvent: "change",
      type: "select-arr",
      list: "sexList",
      listTypeInfo: listTypeInfo.value
    },
    workshopNum2: {
      // label: 't-select使用',
      labelRender: () => {
        return <div style="color:red">新增项条件</div>
      },
      comp: "t-select",
      placeholder: "选择第一条数据才新增",
      isSelfCom: true,
      bind: {
        valueCustom: "key",
        labelCustom: "label",
        optionSource: []
      },
      eventHandle: {
        change: val => handleBranchCode(val)
      }
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
watch(
  () => state.queryData.workshopNum2,
  val => {
    console.log("watch---val", val)
    handleBranchCode(val)
  },
  {
    deep: true
  }
)
const opts = computed({
  get() {
    return state.opt
  },
  set(val) {
    state.opt = val
  }
})
// 动态添加
const add = {
  phonenumber: {
    label: "手机号码",
    comp: "el-input"
  },
  email: {
    label: "邮箱",
    comp: "el-input"
  },
  remark: {
    label: "备注",
    comp: "el-input"
  }
}
// t-select使用动态新增数据
const handleBranchCode = val => {
  console.log("handleBranchCode", val)
  if (val === "W1") {
    opts.value = {
      ...opts.value,
      ...add
    }
  } else {
    Object.keys(add).forEach(key => {
      delete opts.value[key]
    })
  }
}
// 最终参数获取
const getQueryData = computed(() => {
  const { userName, workshopNum, workshopNum2, date, date1 } = toRefs(state.queryData)
  // console.log(444, userName, date1)
  return {
    userName: userName.value,
    workshopNum: workshopNum.value,
    workshopNum2: workshopNum2.value,
    phonenumber: state.queryData.phonenumber,
    email: state.queryData.email,
    remark: state.queryData.remark,
    date1: date1.value,
    beginDate: date.value && date.value[0] ? date.value[0] : null,
    endDate: date.value && date.value[1] ? date.value[1] : null
  }
})
onMounted(() => {
  getList()
})
const getList = () => {
  listTypeInfo.value.sexList = [
    {
      label: "前纺一车间",
      key: "W1"
    },
    {
      label: "前纺二车间",
      key: "W2"
    },
    {
      label: "前纺三车间",
      key: "W3"
    }
  ]
  state.opt.workshopNum2.bind.optionSource = listTypeInfo.value.sexList
}

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
