<template>
  <el-radio-group v-model="radio1" v-bind="$attrs">
    <component
      v-for="item in options"
      :key="item.value"
      :label="item.value"
      :is="type === 'radio' ? 'el-radio' : 'el-radio-button'"
      >{{ item.label }}
    </component>
  </el-radio-group>
</template>

<script setup lang="ts" name="TRadio">
import { ref } from 'vue'
const props = defineProps({
  type: {
    type: String,
    default: 'radio',
  },
  options: {
    type: Array,
    default: () => [],
  },
})
// 抛出事件
const emits = defineEmits(['click'])
const radio1 = ref('1')
</script>
