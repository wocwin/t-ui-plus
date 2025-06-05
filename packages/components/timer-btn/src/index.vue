<template>
  <div class="t-timer-btn">
    <button
      class="sendSmsBtn"
      :class="{ dissendSmsBtn: disabled, className }"
      type="button"
      @click="run"
      :disabled="disabled || time > 0"
    >
      {{ text }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
defineOptions({
  name: "TTimerBtn"
})
export interface TTimerBtnProps {
  second?: number
  className?: string
}
const props = withDefaults(defineProps<TTimerBtnProps>(), {
  second: 60,
  className: ""
})
const time = ref(0)
const disabled = ref(false)
const text = computed(() => {
  return time.value > 0 ? `${time.value}s 后重获取` : "获取验证码"
})
const emits = defineEmits(["click"])
const run = () => {
  emits("click")
  start()
}
// 重置倒计时0
const reset = () => {
  time.value = 0
}
const start = () => {
  time.value = props.second
  disabled.value = true
  timer()
}
const timer = () => {
  if (time.value > 0) {
    time.value--
    setTimeout(timer, 1000)
  } else {
    disabled.value = false
  }
}
// 暴露方法出去
defineExpose({ reset })
</script>
