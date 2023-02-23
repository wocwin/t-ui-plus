# 倒计时组件

### 基础用法

:::demo

```vue
<template>
  <t-layout-page class="t-timer-btn_demo">
    <t-layout-page-item>
      <t-timer-btn ref="TTimerBtn" @click="sendCode" />
      <t-button style="margin-top:15px;" color="#626aef" @click="reset"
        >重置倒计时</t-button>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const TTimerBtn = ref()
const sendCode = (val) => {
  console.log('点击', val)
}
const reset = () => {
  TTimerBtn.value.reset()
}
</script>
```

:::
