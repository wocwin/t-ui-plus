<template>
  <t-layout-page>
    <t-layout-page-item>
      <el-radio-group v-model="size" aria-label="size control" size="small">
        <el-radio-button value="large">large</el-radio-button>
        <el-radio-button value="default">default</el-radio-button>
        <el-radio-button value="small">small</el-radio-button>
      </el-radio-group>
    </t-layout-page-item>
    <t-layout-page-item>
      <t-input placeholder="请输入内容" :size="size" v-model="vlaue" @change="change" />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from "vue"
const vlaue = ref<any>()
const size = ref("default")
const change = (e: any) => {
  console.log("输出的值", e)
  console.log("v-model的值", vlaue.value)
}
</script>
