<template>
  <t-layout-page>
    <t-layout-page-item>
      <div>
        <h4>自定义单个选项插槽</h4>
        <t-radio v-model="value" :options="options" size="large">
          <template #mySlot="scope">
            <div>
              自定义单个选项插槽---{{ scope.label }}---{{ scope.value }}
            </div>
          </template>
        </t-radio>
      </div>
      <div>
        <h4>默认插槽</h4>
        <t-radio v-model="value2" :options="options2" size="large">
          <el-radio label="上海" />
          <el-radio label="北京" />
          <el-radio label="广州" />
          <el-radio label="深圳" />
        </t-radio>
        <br />
        <t-radio v-model="value2" :options="options2" size="large">
          <el-radio-button label="上海" />
          <el-radio-button label="北京" />
          <el-radio-button label="广州" />
          <el-radio-button label="深圳" />
        </t-radio>
      </div>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('1')
const options = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3, slot: 'mySlot' },
])

const value2 = ref('1')
const options2 = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3, slot: 'mySlot' },
])
</script>
