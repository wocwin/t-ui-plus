<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition
        :opts="opts"
        @submit="conditionEnter"
        @handleEvent="handleEvent"
        isExpansion
        :btnResetBind="{ size: 'small',btnTxt:'搜索', icon:'Search'}"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
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
        dictLabel: '前纺一车间',
        dictValue: 'W1',
      },
      {
        dictLabel: '前纺二车间',
        dictValue: 'W2',
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
      list: 'sexList',
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
          valueFormat: 'YYYY-MM-DD',
          disabled:
            formData.start_time == null || formData.start_time == ''
              ? true
              : false,
          'disabled-date': (time) => {
            return (
              time.getTime() <
              new Date(formData.start_time).getTime() - 86400000
            )
          },
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
  } = state.queryData
  console.log(444, userName, phonenumber, date1)
  return {
    userName,
    workshopNum,
    phonenumber,
    start_time,
    end_time,
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
