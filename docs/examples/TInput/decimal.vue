<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-input
        placeholder="请输入数字（含小数点）"
        inputType="decimal"
        :decimalLimit="4"
        v-model="vlaue"
        @change="change"
      >
      </t-input>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from "vue"
const vlaue = ref<any>()
const change = (e: any) => {
  console.log("输出的值", e)
  console.log("v-model的值", vlaue.value)
}
</script>
