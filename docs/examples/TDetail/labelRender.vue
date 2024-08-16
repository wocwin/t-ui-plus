<template>
  <t-layout-page class="t_detail_demo">
    <t-layout-page-item>
      <t-detail :descData="DataSource.descData" />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="tsx">
import { ref, reactive, onMounted } from "vue"
const DataSource: any = reactive({
  dataList: {
    id: "1498904492217241602",
    stocktakePlanNo: "PD-YX-20220302002",
    planStocktakeDate: "2022-03-03",
    stocktakeJobStatus: 4,
    stocktakeJobStatusLabel: "待盘点录入",
    planStocktakeUserName: "张三",
    planStocktakeUserId: 0,
    createRemark: "测试"
  },
  descData: [
    {
      label: "盘点单编号",
      labelRender: () => {
        return <span style="color:red;">盘点单编号</span>
      },
      fieldName: "stocktakePlanNo",
      value: ""
    },
    {
      label: "盘点单状态",
      labelRender: () => {
        return <span style="color:blue;">盘点单状态</span>
      },
      fieldName: "stocktakeJobStatusLabel",
      value: ""
    },
    {
      label: "盘点负责人",
      labelRender: () => {
        return <span style="color:green;">盘点负责人</span>
      },
      fieldName: "planStocktakeUserName",
      value: ""
    },
    {
      label: "计划盘点日期",
      labelRender: () => {
        return <span style="color:orange;">计划盘点日期</span>
      },
      fieldName: "planStocktakeDate",
      value: ""
    }
  ]
})
onMounted(() => {
  DataSource.descData.map(item => {
    item.value = DataSource.dataList[item.fieldName]
  })
})
</script>
