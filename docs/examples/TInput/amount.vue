<template>
  <t-layout-page>
    <t-layout-page-item>
      <el-radio-group v-model="isShowErrorTip" aria-label="size control" size="small">
        <el-radio-button :value="true">开启错误提示</el-radio-button>
        <el-radio-button :value="false">关闭错误提示</el-radio-button>
      </el-radio-group>
    </t-layout-page-item>
    <t-layout-page-item>
      <t-input
        placeholder="请输入金额"
        inputType="amount"
        showThousands
        v-model="vlaue"
        :isShowErrorTip="isShowErrorTip"
        @change="change"
      >
      </t-input>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from "vue"
const isShowErrorTip = ref(true)
const vlaue = ref<any>()
const change = (e: any) => {
  console.log("输出的值", e)
  console.log("v-model的值", vlaue.value)
}
</script>
