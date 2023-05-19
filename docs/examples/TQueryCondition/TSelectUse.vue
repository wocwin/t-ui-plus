<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition
        labelWidth="130px"
        :opts="opts"
        @submit="conditionEnter"
        @handleEvent="handleEvent"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
let state = reactive({
  queryData: {
    userName: null, // 登录名
    phonenumber: null, // 手机号码
    workshopNum: null,
    workshopNum2: null,
    date: null,
    date1: null,
  },
  sexList: [
    {
      label: '前纺一车间',
      key: 'W1',
    },
    {
      label: '前纺二车间',
      key: 'W2',
    },
  ],
  multipleList: [
    {
      name: '前纺一车间',
      id: 'W1',
    },
    {
      name: '前纺二车间',
      id: 'W2',
    },
    {
      name: '前纺三车间',
      id: 'W3',
    },
    {
      name: '前纺四车间',
      id: 'W4',
    },
  ],
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
      label: 't-select单选使用',
      comp: 't-select',
      defaultVal: 'W1',
      bind: {
        optionSource: state.sexList,
      },
    },
    date1: {
      label: '日期',
      comp: 'el-date-picker',
      bind: {
        valueFormat: 'YYYY-MM-DD',
      },
    },
    workshopNum2: {
      label: 't-select多选使用',
      placeholder: '请多选',
      span: 2,
      comp: 't-select',
      bind: {
        valueKey: 'id',
        labelKey: 'name',
        multiple: true,
        optionSource: state.multipleList,
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
  const { userName, phonenumber, workshopNum, date, date1, workshopNum2 } =
    state.queryData
  console.log(444, userName, phonenumber, date1)
  return {
    userName,
    workshopNum,
    phonenumber,
    workshopNum2,
    date1,
    beginDate: date && date[0] ? date[0] : null,
    endDate: date && date[1] ? date[1] : null,
  }
})
// 查询条件change事件
const handleEvent = (type, val) => {
  // console.log(111, type, val)
  switch (type) {
    case 'date':
      console.log('获取event==date的数据', val)
      break
  }
}
// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data)
  state.queryData = data
  console.log('最终参数', getQueryData.value)
}
</script>
