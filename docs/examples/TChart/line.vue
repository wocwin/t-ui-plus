<template>
  <t-layout-page>
    <t-layout-page-item>
      <el-button @click="isShow = !isShow">{{isShow?'隐藏':'显示'}}</el-button>
      <el-button @click="addData()">增加数据</el-button>
      <t-chart
        v-show="isShow"
        :options="options"
        style="width: 100%; height: 500px"
        @click="click"
        @dblclick="addData()"
        @mousedown="mousedown"
        @mousemove="mousemove"
        @mouseover="mouseover"
        @mouseout="mouseout"
        @globalout="globalout"
        @contextmenu="contextmenu"
        @chart="chart"
      />
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

const isShow = ref(true)
const addData = () => {
  options.value.xAxis.data.push(
    'test' + Math.random().toString(36).substring(2, 8)
  )
  options.value.series[0].data.push(Math.random() * 200)
}
const click = (e) => {
  console.log('click-----', e)
}
const mousedown = (e) => {
  console.log('mousedown-----', e)
}
const mousemove = (e) => {
  console.log('mousemove-----', e)
}
const mouseover = (e) => {
  console.log('mouseover-----', e)
}
const mouseout = (e) => {
  console.log('mouseout-----', e)
}
const globalout = (e) => {
  console.log('globalout-----', e)
}
const contextmenu = (e) => {
  console.log('contextmenu-----', e)
}

const chartRef = ref(null)
const chart = (dom) => {
  chartRef.value = dom
}
</script>
