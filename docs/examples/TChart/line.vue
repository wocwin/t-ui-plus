<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-chart :options="options" style="width: 100%; height: 500px" />
      <el-button @click="addData()">增加数据</el-button>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const options = ref({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
    },
  ],
})

const addData = () => {
  options.value.xAxis.data.push(
    'test' + Math.random().toString(36).substring(2, 8)
  )
  options.value.series[0].data.push(Math.random() * 200)
}
</script>
