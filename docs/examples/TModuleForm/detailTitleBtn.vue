<template>
  <t-layout-page class="t_module_form_demo">
    <t-layout-page-item>
      <t-module-form
        title="模块详情组件运用"
        subTitle="Title右侧插槽使用"
        ref="sourceDetail"
        handleType="desc"
        :descData="descData"
      >
        <!-- 标题右侧按钮 -->
        <template #extra>
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="danger">信息按钮</el-button>
        </template>
        <!-- 模块detail详情插槽 -->
        <template #line>
          <el-button type="danger">自定义模块detail插槽</el-button>
        </template>
        <!-- title右侧按钮插槽 -->
        <template #material>
          <el-button size="small" type="primary">批量通过</el-button>
          <el-button size="small" type="danger">批量驳回</el-button>
          <el-button size="small">导出</el-button>
        </template>
        <!-- value自定义插槽 -->
        <template #loadKgPerCar>
          <div class="text-danger">value自定义插槽</div>
        </template>
      </t-module-form>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="tsx">
import { onMounted, reactive } from 'vue'
const descData: any = reactive({
  goods: {
    name: 'goods',
    title: '禁止收缩',
    disabled: true,
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
        value: '3333',
        span: 2,
      },
      {
        label: '备注',
        fieldName: 'cargoRemark',
        value: '占位一整行',
        span: 4,
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
        value: '定率',
        tooltip: '测试字符串提示',
      },
      {
        label: '路耗定额',
        fieldName: 'roadLossKg',
        value: '',
      },
      {
        label: '整车承载',
        fieldName: 'loadKgPerCar',
        slotName: 'loadKgPerCar',
        value: '',
      },
      {
        label: '保险购买',
        fieldName: 'buyInsurance',
        value: '是',
        tooltip: () => (
          <div>
            <div>测试函数方式提示</div>
          </div>
        ),
      },
    ],
  },
  line: {
    name: 'line',
    title: '线路信息',
    disabled: true,
    slotName: 'line',
    btn: 'material',
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
