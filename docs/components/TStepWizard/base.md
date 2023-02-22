# 步骤组件

### 基础用法

:::demo `继承el-button所有属性` <br/>新增`time`属性（多少时间内点击；默认 1 秒）<br/>

```vue
<template>
  <t-layout-page class="t_step-wizard_demo">
    <t-step-wizard
      style="min-height: 100px"
      :stepData="stepData"
      :active="active"
      :successTitle="successTitle"
      @complete="complete"
    >
      <template #first>第一步</template>
      <template #second>第二步骤</template>
      <template #third>第三步骤</template>
    </t-step-wizard>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const active = ref(0)
const successTitle = ref(
  '企业信息填写完成，等待提交认证资料，经*****平台审核通过后即可办理业务'
)
// 下一步
const next = (val) => {
  switch (val.params) {
    case 1:
      active.value += 1
      break
    case 2:
      active.value += 1
      break
    case 3:
      active.value += 2
      break
    case 4:
      console.log(22222222222)
      break
  }
}
// 上一步
const back = (val) => {
  switch (val.params) {
    case 2:
      active.value -= 1
      break
    case 3:
      active.value -= 1
      break
    case 4:
      console.log(111111111)
      break
  }
}
// 完成
const complete = () => {
  active.value = 0
}
const stepData = ref([
  {
    id: 1,
    title: '创建账户',
    slotName: 'first',
    btnArr: [
      {
        btnTitle: '下一步',
        params: 1,
        fn: next,
      },
    ],
  },
  {
    id: 2,
    title: '填写基础信息',
    slotName: 'second',
    btnArr: [
      {
        btnTitle: '上一步',
        params: 2,
        fn: back,
      },
      {
        btnTitle: '下一步',
        params: 2,
        fn: next,
      },
    ],
  },
  {
    id: 3,
    title: '填写用户信息',
    slotName: 'third',
    btnArr: [
      {
        btnTitle: '上一步',
        params: 3,
        fn: back,
      },
      {
        btnTitle: '下一步',
        params: 3,
        fn: next,
      },
    ],
  },
  {
    id: 4,
    title: '注册成功',
    // lastBtnArr: [
    //   {
    //     btnTitle: '上一步',
    //     params: 4,
    //     fn: back
    //   },
    //   {
    //     btnTitle: '下一步',
    //     params: 4,
    //     fn: next
    //   }
    // ]
  },
])
// _注意:（以上表示）_
// 当前有 4 个步骤，其标题分别为：
// 1、创建账户
// 2、填写基础信息
// 3、填写用户信息
// 4、注册成功
// 解析第一步：（其它步骤都如此）
// 其内容放在 slot 为 first 中；有一个按钮为“下一步”，其事件是 next,默认参数是当前对象内容
</script>
```

:::

### TStepWizard 参数配置

#### 1. 简介：基于 Element-plus el-steps el-step 步骤条组件的二次封装，着重于数据层面，HTML 一行代码

> TStepWizard 步骤组件 **代码示例：**

```html
<t-step-wizard
  :stepData="stepData"
  :active="active"
  :successTitle="successTitle"
  @complete="complete"
>
  <template #first>第一步骤</template>
  .....
</t-step-wizard>
```

#### 2. 配置参数 继承 element-plus el-steps/el-step 提供的属性

| 参数              | 说明                                  | 类型          | 默认值 |
| :---------------- | :------------------------------------ | :------------ | :----- |
| stepData          | 步骤数据源                            | Array         | -      |
| ---id             | 步骤 ID 唯一                          | Number        | -      |
| ---title          | 步骤头文字展示                        | String        | -      |
| ---slotName       | 每个步骤的具名 slot                   | String        | -      |
| ---icon           | 步骤头 icon 展示（element 内置 icon） | String        | -      |
| ---description    | 步骤头描述                            | String        | -      |
| ---btnArr         | 每个步骤的按钮                        | Array         | -      |
| ----- btnTitle    | 按钮文字信息                          | String        | -      |
| ----- params      | 每个按钮传参信息（可以随意定义字段)   | String/Number | -      |
| ----- fn          | 按钮事件                              | function      | -      |
| isShowLastSuccess | 是否显示默认 icon 最后一步            | Boolean       | true   |
| active            | 设置当前激活步骤                      | Number        | 0      |
| ---lastBtnArr     | 最后一步按钮需要多个                  | Array         | -      |
| ----- btnTitle    | 按钮文字信息                          | String        | -      |
| ----- params      | 每个按钮传参信息（可以随意定义字段)   | String/Number | -      |
| ----- fn          | 按钮事件                              | function      | -      |
| lastBtnTitle      | 最后一步骤成功按钮文字                | String        | 完成   |
| successTitle      | 最后一步骤成功提示语                  | String        | -      |

#### 3. events

| 事件名   | 说明                 | 返回值     |
| :------- | :------------------- | :--------- |
| complete | 最后一步按钮点击事件 | 当前步骤值 |
