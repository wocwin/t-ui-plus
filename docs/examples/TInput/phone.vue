<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-input
        placeholder="请输入手机号"
        maxlength="11"
        inputType="phone"
        v-model="vlaue"
        @change="change"
      >
        <template #prepend>手机号</template>
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
