<!--  线 + 柱混合图 -->
<template>
  <div class="t-chart" :id="id" ref="box" />
</template>

<script setup lang="ts" name="TChart">
import { onMounted, getCurrentInstance, ref } from 'vue'
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
const box = ref<HTMLDivElement>()
onMounted(() => {
  // 图表初始化
  const chart = proxy.$echarts.init(box.value)
  chart.setOption(props.options)

  // 大小自适应
  window.addEventListener('resize', (e) => {
    console.log('e------', e)
    chart.resize()
  })
})
</script>

<style lang="scss" scoped>
.t-chart {
  width: 100%;
  height: 100%;
}
</style>
