<template>
  <el-tooltip v-if="tip" :content="tip" :placement="placement">
    <el-button v-bind="$attrs" class="t-button-tip" @click="handleClick">
      <slot />
    </el-button>
  </el-tooltip>
  <el-button v-else v-bind="$attrs" @click="handleClick">
    <slot />
  </el-button>
</template>

<script setup lang="ts" name="TButton">
import { ref } from 'vue'
const props = defineProps({
  time: {
    type: Number,
    default: 1000,
  },
  tip: {
    type: String,
    default: '',
  },
  placement: {
    type: String,
    default: 'top',
  },
})
// 抛出事件
const emits = defineEmits(['click'])
const record = ref(0)
const handleClick = () => {
  let newTime = new Date()
  if (newTime.getTime() - record.value > props.time) {
    emits('click')
  }
  record.value = new Date().getTime()
}
</script>
<style lang="scss" scoped>
.t-button-tip {
  padding: 0;
  height: auto;
  color: var(--color);
  border: none;
  background: none;
}
.t-button-tip:hover {
  color: var(--color);
}
</style>
