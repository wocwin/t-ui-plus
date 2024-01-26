<!--  线 + 柱混合图 -->
<template>
  <div class="t-chart" :id="id" ref="echartRef" />
</template>

<script setup lang="ts" name="TChart">
import {
  onMounted,
  getCurrentInstance,
  ref,
  watch,
  nextTick,
  onBeforeUnmount,
  markRaw,
} from 'vue'
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

// 图表初始化
const renderChart = () => {
  chart.value = markRaw(proxy.$echarts.init(echartRef.value))
  setOption(props.options)
}

// 重绘图表函数
const resizeChart = debounce(() => {
  chart.value?.resize()
}, 300)

// 设置图表函数
const setOption = debounce(async (data) => {
  if (!chart.value) return
  chart.value.setOption(data, true, true)
  await nextTick()
  resizeChart()
}, 300)

watch(
  () => props.options,
  async (nw) => {
    await nextTick()
    setOption(nw)
  },
  { deep: true }
)

onMounted(() => {
  renderChart()
  // 大小自适应
  window.addEventListener('resize', (e) => {
    resizeChart()
  })
})
onBeforeUnmount(() => {
  // 取消监听
  window.removeEventListener('resize', (e) => {
    console.log('onBeforeUnmount-e-----', e)
  })
  // 销毁echarts实例
  chart.value.dispose()
  chart.value = null
})
</script>

<style lang="scss" scoped>
.t-chart {
  width: 100%;
  height: 100%;
}
</style>
