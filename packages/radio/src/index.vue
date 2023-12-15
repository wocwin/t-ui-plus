<template>
  <el-radio-group v-bind="$attrs" :size="size">
    <slot>
      <component
        v-for="({ value, label, slot, ...other }, index) in options"
        :is="radioType"
        :key="value"
        :label="value"
        :border="border"
        v-bind="other"
      >
        <slot :name="slot" v-bind="{ value, label, index, ...other }">
          {{ label }}
        </slot>
      </component>
    </slot>
  </el-radio-group>
</template>

<script setup lang="ts" name="TRadio">
import { computed } from 'vue'
const props = defineProps({
  type: {
    type: String,
    validator: (value: string) => ['', 'radio', 'button'].includes(value),
    default: 'radio',
  },
  options: {
    type: Array,
    default: () => [],
  },
  size: {
    type: String,
    validator: (value: string) =>
      ['', 'large', 'default', 'small'].includes(value),
    default: 'default',
  },
  border: {
    type: Boolean,
    default: false,
  },
})
const radioType = computed(() => {
  const obj = {
    radio: 'el-radio',
    button: 'el-radio-button',
  }
  return obj[props.type] ?? 'el-radio'
})
</script>
