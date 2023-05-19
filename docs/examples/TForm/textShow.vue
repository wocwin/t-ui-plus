<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form
        ref="TFormDemo"
        v-model="formOpts.ref"
        :formOpts="formOpts"
        :widthSize="4"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
// 获取ref
const TFormDemo: any = ref<HTMLElement | null>(null)

const formOpts: any = reactive({
  ref: null,
  formData: {
    account: '张三', // *用户账号
    password: '123456', // *用户密码
    name: '三丫子', // *用户昵称
    sex: '男', // *性别: 0:男 1:女
  },
  fieldList: [
    { label: '账号：', textShow: true, textValue: '张三' },
    { label: '密码：', textShow: true, textValue: '123456' },
    { label: '昵称：', textShow: true, textValue: '三丫子' },
    { label: '性别：', textShow: true, textValue: '男' },
  ],
})
</script>
