<!--  线 + 柱混合图 -->
<template>
  <div class="t-chart" :id="id" ref="echartRef" />
</template>

<script setup lang="ts" name="TChart">
import { onMounted, getCurrentInstance, ref } from 'vue'
import { debounce } from '../../utils'
const { proxy } = getCurrentInstance() as any
const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
  id: {
    type: String,
    default: () => Math.random().toString(36).substring(2, 8),
  },
})

const echartRef = ref<HTMLDivElement>()
const chart = ref()
//重绘图表函数
const resizeHandler = debounce(() => {
  chart.value.resize()
}, 300)

onMounted(() => {
  // 图表初始化
  chart.value = proxy.$echarts.init(echartRef.value)
  chart.value.setOption(props.options)
  // 大小自适应
  window.addEventListener('resize', (e) => {
    resizeHandler()
  })
})
</script>

<style lang="scss" scoped>
.t-chart {
  width: 100%;
  height: 100%;
}
</style>
