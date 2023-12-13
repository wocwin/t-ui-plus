<template>
  <el-radio-group v-bind="$attrs">
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
</script>
