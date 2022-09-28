<template>
  <t-layout-page class=''>
    <t-layout-page-item>
      menu2页面
    </t-layout-page-item>
  </t-layout-page>
</template>
 
<script setup lang='ts'>
import { ref, reactive, computed } from "vue"
let loading = ref(false)
let state = reactive({
  queryData: {

  },
})
const opts = computed(() => {
  return {

  }
})
// 最终参数获取
const getQueryData = computed(() => {
  const { } = state.queryData
  return {

  }
})
// 点击查询按钮
const conditionEnter = (data: any) => {
  state.queryData = data
  console.log('最终参数', getQueryData.value)
}
</script>