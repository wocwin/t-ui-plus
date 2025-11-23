# 版本升级


## 从v2.0.4 升级到 v2.0.6
> 注意： `v2.0.5`版本中，因国际化配置错误，导致`TTable`组件的报错，请升级到`v2.0.6`版本

```html
<template>
  <div id="app">
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
  import { ElConfigProvider } from 'element-plus'
  import { useGlobalStore } from "@/store/modules/global"; // 引入pinia全局状态管理
  import en from 'element-plus/es/locale/lang/en'
  import zhCn from 'element-plus/es/locale/lang/zh-cn'
  import plusZhCn from '@wocwin/t-ui-plus/locale/zh-cn'
  import plusEn from '@wocwin/t-ui-plus/locale/en'

  const zhCnLocales = {
    ...zhCn,
    ...plusZhCn
  }
  const enLocales = {
    ...en,
    ...plusEn
  }

  const globalStore = useGlobalStore();
  const locale = computed(() => (globalStore.language === 'zh' ? zhCnLocales : enLocales))

</script>
```

## 从v1.5.2 升级到 v2.0.1
> 注意： 引入`t-ui-plus`样式有重大变更

```js
// v1.5.2 样式引入
import '@wocwin/t-ui-plus/lib/style.css'

// v2.0.1 样式入
import '@wocwin/t-ui-plus/index.css'
```


## 从v1.2.* 升级到 v1.3.*
> 注意： 使用 `TSelectTable` 下拉选择表格组件时，必须:`Element-plus`版本`v2.6`以上