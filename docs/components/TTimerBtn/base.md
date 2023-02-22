# 倒计时组件

### 基础用法

:::demo

```vue
<template>
  <t-layout-page class="t-timer-btn_demo">
    <t-layout-page-item>
      <t-timer-btn @click="sendCode" />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const sendCode = (val) => {
  console.log('点击', val)
}
</script>
```

:::
