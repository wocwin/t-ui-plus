<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-select-icon v-model="iconValue" @select="changeSelect" :selectBind="selectBind" />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from "vue"
const iconValue = ref("")
const selectBind = ref({
  "prefix-icon": "Warning",
  placeholder: "自定义搜索框提示语", // 搜索框提示语
  dialogTitle: "自定义弹窗标题", // 弹窗标题
  searchPlaceholder: "搜索框提示语", // 搜索框提示语
  emptyDescription: "搜索为空提示语", // 搜索为空提示语
  width: "40%" // 弹窗宽度
})
const changeSelect = (val: string) => {
  console.log(`选择的值:${val};v-model值：${iconValue.value}`)
}
</script>
