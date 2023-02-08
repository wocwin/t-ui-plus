# TSelect 下拉选择组件

### 基础用法

:::demo

```vue
<template>
  <t-layout-page>
    <t-select
      placeholder="请选择工序"
      v-model="selectVlaue"
      :optionSource="stepList"
      valueKey="label"
      @change="selectChange"
      width="200px"
    />
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const selectVlaue = ref<any>()
const stepList=  [
    { label: '开始' },
    { label: 'POSUI' },
    { label: '11' },
    { label: 'GX123' },
    { label: '烘干破碎' },
    { label: '车间仓库' },
    { label: 'ui3333' },
    { label: 'hhh333' }
  ]
const selectChange = (val:any) => {
  console.log('selectChange', val, selectVlaue.value)
}
</script>

```

:::
### 多选

:::demo

```vue
<template>
  <t-layout-page>
    <t-select
      placeholder="请选择工序"
      v-model="selectVlaue"
      :optionSource="stepList"
      valueKey="label"
      @change="selectChange"
      multiple
    />
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
const selectVlaue = ref<any>()
const stepList=  [
    { label: '开始' },
    { label: 'POSUI' },
    { label: '11' },
    { label: 'GX123' },
    { label: '烘干破碎' },
    { label: '车间仓库' },
    { label: 'ui3333' },
    { label: 'hhh333' }
  ]
const selectChange = (val:any) => {
  console.log('selectChange', val, selectVlaue.value)
}
</script>

```

:::

### TSelect Attributes

*****
#### 1、代码示例

>`下拉选择组件————可实现单选多选（多选可使用全选功能）`


```html
<t-select
  placeholder="请选择工序"
  v-model="selectVlaue"
  :optionSource="state.stepList"
  valueKey="label"
  @change="selectChange"
/>
```

#### 2、配置参数（Attributes）继承 el-select Attributes

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | --: |
| v-model | 绑定值 | boolean / string / number/Array | 无 |
| multiple | 是否多选 | Boolean | false |
| optionSource | 下拉数据源 | Array | 无 |
| valueKey | 传入的 option 数组中，要作为最终选择项的键值 key | String | 'key' |
| labelKey | 传入的 option 数组中，要作为显示项的键值名称 | String | 'label' |

#### 3、继承 el-select events

