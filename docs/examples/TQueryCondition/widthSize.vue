<template>
  <t-layout-page>
    <t-layout-page-item>
      <el-radio-group v-model="widthSize" size="small" style="margin-bottom: 15px">
        <el-radio-button :value="2">一行展示2项</el-radio-button>
        <el-radio-button :value="3">一行展示3项</el-radio-button>
        <el-radio-button :value="4">一行展示4项</el-radio-button>
        <el-radio-button :value="5">一行展示5项</el-radio-button>
        <el-radio-button :value="6">一行展示6项</el-radio-button>
      </el-radio-group>
      <t-query-condition
        :opts="opts"
        @submit="conditionEnter"
        @handleEvent="handleEvent"
        isExpansion
        isShowWidthSize
        :widthSize="widthSize"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, toRefs } from 'vue'
const widthSize = ref(3)
let state: any = reactive({
  queryData: {
    userName: null, // 登录名
    phonenumber: null, // 手机号码
    workshopNum: null,
    start_time: null,
    end_time: null,
    date: null,
    date1: null,
  },
  listTypeInfo: {
    sexList: [
      {
        label: '前纺一车间',
        value: 'W1',
      },
      {
        label: '前纺二车间',
        value: 'W2',
      },
    ],
  },
})
const opts = computed(() => {
  return {
    userName: {
      label: '登录名称',
      comp: 'el-input',
    },
    phonenumber: {
      label: '手机号码',
      comp: 'el-input',
    },
    workshopNum: {
      label: '车间',
      comp: 'el-select',
      changeEvent: 'change',
      type: 'select-arr',
      defaultVal: '',
      list: 'sexList',
      arrLabel: 'label',
      arrKey: 'value',
      listTypeInfo: state.listTypeInfo,
    },
    start_time: {
      label: '开始时间',
      comp: 'el-date-picker',
      bind: {
        valueFormat: 'YYYY-MM-DD',
      },
    },
    end_time: {
      label: '结束时间',
      comp: 'el-date-picker',
      bind: (formData) => {
        return {
          valueFormat: 'YYYY-MM-DD'
          }
      },
    },
    date1: {
      label: '日期',
      comp: 'el-date-picker',
      bind: {
        valueFormat: 'YYYY-MM-DD',
        'disabled-date': (time) => {
          return time.getTime() < new Date()
        },
      },
    },
    date: {
      label: '装炉时间',
      comp: 'el-date-picker',
      span: 2,
      event: 'date',
      bind: {
        rangeSeparator: '-',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        valueFormat: 'YYYY-MM-DD',
        type: 'daterange',
      },
    },
  }
})
// 最终参数获取
const getQueryData = computed(() => {
  const {
    userName,
    phonenumber,
    workshopNum,
    date,
    date1,
    start_time,
    end_time,
  } = toRefs(state.queryData)
  return {
    userName: userName.value,
    workshopNum: workshopNum.value,
    phonenumber: phonenumber.value,
    start_time: start_time.value,
    end_time: end_time.value,
    date1: date1.value,
    beginDate: date.value && date.value[0] ? date.value[0] : null,
    endDate: date.value && date.value[1] ? date.value[1] : null,
  }
})
// 查询条件change事件
const handleEvent = (type, val) => {
  // console.log(111, type, val)
  switch (type) {
    case 'date':
      const arr = [
        {
          label: '前纺一车间666',
          value: 'W5',
        },
        {
          label: '前纺二车间999',
          value: 'W6',
        },
      ]
      state.listTypeInfo.sexList = [...state.listTypeInfo.sexList, ...arr]
      console.log('获取event==date的数据', val)
      break
  }
}
onMounted(() => {
  chageDefaultVal()
})
const chageDefaultVal = () => {
  opts.value.workshopNum.defaultVal = 'W2'
  console.log('opts.value.workshopNum', opts.value.workshopNum)
  const arr = [
    {
      label: '前纺一车间22',
      value: 'W3',
    },
    {
      label: '前纺二车间33',
      value: 'W4',
    },
  ]
  state.listTypeInfo.sexList = [...state.listTypeInfo.sexList, ...arr]
  // state.listTypeInfo.sexList = arr
}
// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data)
  state.queryData = data
  console.log('最终参数', getQueryData.value)
}
</script>
