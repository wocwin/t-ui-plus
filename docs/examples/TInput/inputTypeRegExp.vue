<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-input
        placeholder="请输入字母和数字"
        :input-type="/^[A-Za-z0-9]+$/"
        custom-error-tip="只能输入字母和数字"
        v-model="vlaue"
        :isShowErrorTip="true"
        @change="change"
      ></t-input>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from "vue"
const vlaue = ref<any>()
const change = (e: any) => {
  console.log("输出的值", e)
  console.log("v-model的值", vlaue.value)
  console.log("v-model的值----", typeof vlaue.value)
}
</script>
