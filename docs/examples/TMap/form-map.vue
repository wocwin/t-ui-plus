<template>
  <t-layout-page class="t_button_demo">
    <t-layout-page-item>
      <t-form ref="TFormDemo" v-model="formOpts.ref" :formOpts="formOpts" />
      <div>modelValue: {{ formOpts.formData.map }}</div>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
const formOpts: any = reactive({
  ref: null,
  formData: {
    map: [
      114.27493,
      22.71173,
      '广东省深圳市龙岗区龙岗街道龙岗街道党建主题公园八仙岭公园',
    ],
  },
  fieldList: [
    {
      label: '位置选择：',
      value: 'map',
      comp: 't-map',
      widthSize: 1,
      placeholder: '请选择位置',
      bind: {
        options: {
          zoomEnable: false,
          dragEnable: false
        },
      },
      eventHandle: {
        change(e) {
          console.log('e', e)
        },
      },
    },
  ],
})
</script>
