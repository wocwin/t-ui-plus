<template>
  <t-layout-page>
    <t-layout-page-item>
      <el-button type="danger" @click="showWordLimit = !showWordLimit">{{
        `${!showWordLimit ? "显示" : "不显示"}剩余字数`
      }}</el-button>
    </t-layout-page-item>
    <t-layout-page-item>
      <t-input
        v-model="textarea1"
        style="width: 240px"
        autosize
        :show-word-limit="showWordLimit"
        type="textarea"
        maxlength="10"
        placeholder="Please input"
      />
    </t-layout-page-item>
    <t-layout-page-item>
      <t-input
        v-model="textarea2"
        style="width: 240px"
        :autosize="{ minRows: 2, maxRows: 4 }"
        :show-word-limit="showWordLimit"
        maxlength="30"
        type="textarea"
        placeholder="Please input"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script lang="ts" setup>
import { ref } from "vue"
const textarea1 = ref("")
const textarea2 = ref("")
const showWordLimit = ref(false)
</script>
