<template>
  <t-layout-page class="t_module_form_demo">
    <t-layout-page-item>
      <t-module-form
        title="模块详情"
        subTitle="独占一行（span设置）"
        ref="sourceDetail"
        handleType="desc"
        :descData="descData"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue'
const descData: any = reactive({
  goods: {
    name: 'goods',
    title: '货品信息',
    data: [
      {
        label: '货品名称',
        fieldName: 'cargoName',
        value: '',
      },
      {
        label: '货品类别',
        fieldName: 'cargoType',
        value: '',
      },
      {
        label: '货品价值',
        fieldName: 'cargoMoneyCentPerTon',
        value: '',
      },
      {
        label: '总重量',
        fieldName: 'cargoWeightKg',
        value: '',
      },
      {
        label: '总体积',
        fieldName: 'cargoVolumeDm3',
        value: '',
      },
      {
        label: '总件数',
        fieldName: 'cargoQty',
        value: '',
      },
      {
        label: '易碎品',
        fieldName: 'isBreakable',
        span: 2,
        value: '',
      },
      {
        label: '备注(独占一行)',
        fieldName: 'cargoRemark',
        span: 4,
        value: '',
      },
    ],
  },
  freight: {
    name: 'freight',
    title: '运费信息',
    data: [
      {
        label: '计费模式',
        fieldName: 'calFeeType',
        value: '',
      },
      {
        label: '运费单价',
        value: '',
      },

      {
        label: '路损类型',
        fieldName: 'roadLossType',
        value: '',
      },
      {
        label: '路耗定额',
        fieldName: 'roadLossKg',
        value: '',
      },
      {
        label: '整车承载',
        fieldName: 'loadKgPerCar',
        value: '',
      },
      {
        label: '保险购买',
        fieldName: 'buyInsurance',
        value: '',
      },
    ],
  },
})
onMounted(() => {
  const goodsData = {
    cargoName: '汽车总动员',
    cargoType: '玩具',
    cargoMoneyCentPerTon: '500',
    cargoWeightKg: '500',
    cargoVolumeDm3: '30',
    cargoQty: '40',
    isBreakable: '否',
    cargoRemark: '汽车总动员备注',
  }
  descData.goods.data.map((val) => {
    val.value = goodsData[val.fieldName]
  })
})
</script>
