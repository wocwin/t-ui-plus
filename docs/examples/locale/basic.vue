<template>
  <t-layout-page>
    <t-layout-page-item>
      <el-button style="margin-bottom: 10px" type="primary" @click="toggle">切换语言</el-button>
      <el-config-provider :locale="locales">
        <t-date-picker style="width: 80%" v-model="date" type="daterange" @change="change" />
      </el-config-provider>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import en from "element-plus/es/locale/lang/en"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import plusZhCn from "@t-ui-plus/locale/lang/zh-cn"
import plusEn from "@t-ui-plus/locale/lang/en"

const zhCnLocales = {
  ...zhCn,
  ...plusZhCn
}
const enLocales = {
  ...en,
  ...plusEn
}

const date = ref()
const language = ref("zh-cn")
const locales = computed(() => (language.value === "zh-cn" ? zhCnLocales : enLocales))
const change = event => {
  console.log(`change选择返回值是：`, event)
  console.log(`v-model绑定的值是：`, date.value)
}
const toggle = () => {
  language.value = language.value === "zh-cn" ? "en" : "zh-cn"
}
</script>
