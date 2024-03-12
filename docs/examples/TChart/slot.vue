<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-chart :options="options" style="width: 100%; height: 500px">
        <el-radio-group
          v-model="accessType"
          style="position: absolute; right: 10px; top: 0px"
          size="small"
          @change="accessTypeChage"
        >
          <el-radio-button :value="0">访问人数</el-radio-button>
          <el-radio-button :value="1">访问人次</el-radio-button>
        </el-radio-group>
      </t-chart>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import data from './data.json'

const accessType: any = ref(0)
// 用户--切换访问时段
const accessTypeChage = (val: any) => {
  console.log('切换访问时段', val)
  getData(accessType.value)
}

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
      data: [],
      type: 'line',
    },
  ],
})
const getData = async (index) => {
  const res = await data
  if (res.success) {
    const series = res.data[index].dataList.map((item: { data: any }) => {
      return {
        type: 'line',
        smooth: true,
        name: res.data[index].type || '',
        data: item.data,
        label: {
          normal: {
            show: true,
            position: 'top',
          },
        },
      }
    })
    const legendData = res.data[index].nameData
    const option = {
      title: {
        text: res.data[index].title,
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: legendData,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: res.data[index].keyData,
      },
      yAxis: {
        type: 'value',
      },
      series,
    }
    options.value = option
  }
}

onMounted(() => {
  setTimeout(() => {
    getData(0)
  }, 1000)
})
</script>
