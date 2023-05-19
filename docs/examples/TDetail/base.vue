<template>
  <t-layout-page class="t_detail_demo">
    <t-detail :descData="DataSource.descData" />
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
const DataSource: any = reactive({
  dataList: {
    id: '1498904492217241602',
    stocktakePlanNo: 'PD-YX-20220302002',
    workshopId: 301,
    workshopLabel: '压型车间',
    planStocktakeDate: '2022-03-03',
    warehouseId: 1,
    warehouseName: '压型电极仓',
    stocktakeJobStatus: 4,
    stocktakeJobStatusLabel: '待盘点录入',
    stocktakeType: 2,
    stocktakeTypeLabel: '临时盘点',
    originTypeList: '[1, 3]',
    originTypeListLabel: '在制品,合格品',
    planStocktakeUserName: '张三',
    planStocktakeUserId: 0,
    createRemark: '测试',
  },
  descData: [
    {
      label: '盘点单编号：',
      fieldName: 'stocktakePlanNo',
      value: '',
    },
    {
      label: '盘点单状态：',
      fieldName: 'stocktakeJobStatusLabel',
      value: '',
    },
    {
      label: '盘点负责人：',
      fieldName: 'planStocktakeUserName',
      value: '',
    },
    {
      label: '计划盘点日期：',
      fieldName: 'planStocktakeDate',
      value: '',
    },
    {
      label: '车间：',
      fieldName: 'workshopLabel',
      value: '',
    },
    {
      label: '仓库：',
      fieldName: 'warehouseName',
      value: '',
    },
    {
      label: '盘点所有物料：',
      fieldName: 'originTypeListLabel',
      value: '',
    },
    {
      label: '备注：',
      fieldName: 'createRemark',
      value: '',
      span: 4,
    },
  ],
})
onMounted(() => {
  DataSource.descData.map((item) => {
    item.value = DataSource.dataList[item.fieldName]
  })
})
</script>
