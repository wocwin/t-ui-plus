<template>
  <t-layout-page>
    <t-layout-page-item>
      <div>
        <h4>自定义单个选项插槽</h4>
        <t-checkbox v-model="value" :options="options" size="large">
          <template #mySlot="scope">
            <div>
              自定义单个选项插槽---{{ scope.label }}---{{ scope.value }}
            </div>
          </template>
        </t-checkbox>
      </div>
      <div>
        <h4>默认插槽</h4>
        <t-checkbox v-model="value2" :options="options2" size="large">
          <el-checkbox label="上海" />
          <el-checkbox label="北京" />
          <el-checkbox label="广州" />
          <el-checkbox label="深圳" />
        </t-checkbox>
        <br />
        <t-checkbox v-model="value2" :options="options2" size="large">
          <el-checkbox-button label="上海" />
          <el-checkbox-button label="北京" />
          <el-checkbox-button label="广州" />
          <el-checkbox-button label="深圳" />
        </t-checkbox>
      </div>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref([])
const options = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3, slot: 'mySlot' },
])

const value2 = ref([])
const options2 = ref([
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3, slot: 'mySlot' },
])
</script>
