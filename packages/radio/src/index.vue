<template>
  <el-radio-group v-model="radio1" v-bind="$attrs">
    <el-radio label="1" size="large">Option 1</el-radio>
    <el-radio label="2" size="large">Option 2</el-radio>
  </el-radio-group>
</template>

<script setup lang="ts" name="TRadio">
import { ref } from 'vue'
const props = defineProps({
  time: {
    type: Number,
    default: 1000,
  },
})
// 抛出事件
const emits = defineEmits(['click'])
const radio1 = ref('1')
</script>
