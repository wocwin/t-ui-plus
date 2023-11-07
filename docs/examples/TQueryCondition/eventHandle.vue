<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition :opts="opts" @submit="conditionEnter" />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

const opts = computed(() => {
  return {
    likeCargoNo: {
      label: '货源编号',
      comp: 'el-input',
      eventHandle: {
        change: ($event, val) => handleBranchCode($event, val),
        focus: ($event, row) => focus($event, row),
        blur: ($event, row) => blur($event, row),
      },
    },
    likeBookNo: {
      label: 't-select单选',
      comp: 't-select',
      span: 2,
      placeholder: '请先输入货源编号',
      isSelfCom: true,
      bind: (row) => {
        return {
          disabled:
            row.likeCargoNo == null || row.likeCargoNo == '' ? true : false,
          optionSource: state.likeBookNoList,
        }
      },
    },
    likeTransportNo: {
      label: '运单编号',
      comp: 'el-input',
    },
    likeCargoName: {
      label: '货品名称',
      comp: 'el-input',
    },
  }
})
// 失去焦点
const blur = (event, row) => {
  console.log('货源编号--失去焦点', row)
}
// 获得焦点
const focus = (event, row) => {
  console.log('货源编号--获得焦点', row)
}
// 货源编号change事件
const handleBranchCode = async (val, row) => {
  console.log('formdata数据--', row)
  await recordStepsList(val)
}
//获取t-select单选数据
const recordStepsList = (workOrderNo) => {
  console.log('货源编号', workOrderNo)
  state.likeBookNoList = [
    {
      label: '前纺一车间',
      key: 'W1',
    },
    {
      label: '前纺二车间',
      key: 'W2',
    },
    {
      label: '前纺三车间',
      key: 'W3',
    },
  ]
}
let state: any = reactive({
  queryData: {
    likeCargoNo: null,
    likeBookNo: null,
    likeTransportNo: null,
    likeCargoName: null,
  },
  likeBookNoList: [],
})
// 最终参数获取
const getQueryData = computed(() => {
  const { likeCargoNo, likeBookNo, likeTransportNo, likeCargoName } =
    state.queryData
  return {
    likeCargoNo,
    likeBookNo,
    likeTransportNo,
    likeCargoName,
  }
})
// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data)
  state.queryData = data
  console.log('最终参数', getQueryData.value)
}
</script>
