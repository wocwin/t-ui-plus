<template>
  <t-layout-page>
    <t-layout-page-item>
      <el-radio-group v-model="tabPosition" style="margin-bottom: 10px">
        <el-radio-button label="top">top</el-radio-button>
        <el-radio-button label="right">right</el-radio-button>
        <el-radio-button label="bottom">bottom</el-radio-button>
        <el-radio-button label="left">left</el-radio-button>
      </el-radio-group>
      <t-tabs :tabs="tabs" :tab-position="tabPosition" @tab-click="tabsChange">
        <template #tab1>
          <div>订单数据</div>
        </template>
        <template #tab2>
          <div>用户数据</div>
        </template>
        <template #tab3>
          <div>商品数据</div>
        </template>
        <template #tab4>
          <div>页面数据</div>
        </template>
      </t-tabs>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const tabPosition = ref('left')
const tabs = ref([
  {
    key: 'tab1',
    title: '订单数据',
  },
  {
    key: 'tab2',
    title: '用户数据',
  },
  {
    key: 'tab3',
    title: '商品数据',
  },
  {
    key: 'tab4',
    title: '页面数据',
  },
])
const tabsChange = (key: string) => {
  console.log('tabsChange', key)
}
</script>
