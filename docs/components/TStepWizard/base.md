# 步骤组件

### 基础用法

:::demo
TStepWizard/base
:::

### TStepWizard 参数配置

### 1. 简介：基于 Element-plus el-steps el-step 步骤条组件的二次封装，着重于数据层面，HTML 一行代码

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

### 2. 配置参数 继承 element-plus el-steps/el-step 提供的属性

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

### 3. events

| 事件名   | 说明                 | 返回值     |
| :------- | :------------------- | :--------- |
| complete | 最后一步按钮点击事件 | 当前步骤值 |
