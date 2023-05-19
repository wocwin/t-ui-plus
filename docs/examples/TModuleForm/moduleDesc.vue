<template>
  <t-layout-page class="t-module-form_demo">
    <t-layout-page-item>
      <t-module-form
        title="模块详情组件运用"
        subTitle="模块详情222"
        ref="sourceDetail"
        handleType="desc"
        :descData="descData"
        :listTypeInfo="listTypeInfo"
        :dataList="dataList"
      >
        <!-- tabs插槽 -->
        <template #tab1>
          <div>基础信息</div>
        </template>
        <template #tab2>
          <div>指派明细</div>
        </template>
        <template #tab3>
          <div>承运明细</div>
        </template>
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
        <!-- value自定义插槽 -->
        <template #loadKgPerCar>
          <span class="text-danger">插槽值回显</span>
        </template>
      </t-module-form>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { ref, reactive } from 'vue'
const tabs = ref([
  {
    key: 'tab1',
    title: '基础信息',
  },
  {
    key: 'tab2',
    title: '指派明细',
  },
  {
    key: 'tab3',
    title: '承运明细',
  },
])
// 字典集（一定需要放在listTypeInfo对象里）
const listTypeInfo = {
  stockTakeTypeList: [
    {
      label: '在制品',
      value: 1,
    },
    {
      label: '待检品',
      value: 2,
    },
    {
      label: '合格品',
      value: 3,
    },
    {
      label: '报废品',
      value: 4,
    },
  ],
}
// 后台接口返回的数据
const dataList = {
  stocktakeJobStatus: 4,
}
// 具体详情模块回显源
const descData: any = reactive({
  goods: {
    name: 'goods',
    title: '货品信息',
    data: [
      {
        label: '货品名称',
        fieldName: 'cargoName',
        value: '********',
      },
      {
        label: '字典回显：',
        fieldName: 'stocktakeJobStatus',
        value: 4,
        filters: {
          list: 'stockTakeTypeList',
        },
      },
      {
        label: '货品类别',
        fieldName: 'cargoType',
        value: '******',
      },
      {
        label: '货品价值',
        fieldName: 'cargoMoneyCentPerTon',
        value: '********',
      },
      {
        label: '总重量',
        fieldName: 'cargoWeightKg',
        value: '*****',
      },
      {
        label: '总体积',
        fieldName: 'cargoVolumeDm3',
        value: '********',
      },
      {
        label: '总件数',
        fieldName: 'cargoQty',
        value: '*******',
      },
      {
        label: '易碎品',
        fieldName: 'isBreakable',
        value: '**************',
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
        value: '*******',
      },
      {
        label: '运费单价',
        value: '*****',
      },

      {
        label: '路损类型',
        fieldName: 'roadLossType',
        value: '**************',
        tooltip: '测试字符串提示',
      },
      {
        label: '路耗定额',
        fieldName: 'roadLossKg',
        value: '*****',
      },
      {
        label: '整车承载',
        fieldName: 'loadKgPerCar',
        slotName: 'loadKgPerCar',
        value: '*******',
        tooltip: '测试函数方式提示',
      },
      {
        label: '保险购买',
        fieldName: 'buyInsurance',
        value: '**************',
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
    slotName: 'line',
  },
})
</script>
<style lang="scss">
.t-module-form_demo .t_module_form {
  margin-bottom: 0 !important;
  padding-bottom: 60px;
}
.t-module-form_demo .t_module_form .handle_wrap {
  position: absolute;
  border-top: none;
  box-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.5);
}
</style>
