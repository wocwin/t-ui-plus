# 单选组件

### 基础用法

:::demo 基于 Element-plus 的 `el-radio` 二次封装的**单选组件**，继承原组件的所有属性
TRadio/base
:::

### 尺寸大小

:::demo 通过 size 属性用来控制单选框的大小
TRadio/size
:::

### 按钮样式

:::demo 你可以让单选框看起来像一个按钮一样, 只需要将`type`属性设置为 button
TRadio/button
:::

### 带有边框

:::demo 设置 border 属性为 true 可以渲染为带有边框的单选框。
TRadio/border
:::

### 插槽使用及自定义

:::demo 给选项添加 slot 属性，可以自定义单个插槽。也可以通过默认插槽，实现自定义 radio
TRadio/slot
:::

### 可选项

:::demo 设置 props 属性，可设置 `value`, `label`, `disabled` 取值
TRadio/props
:::

### 2、配置参数（Attributes）继承 el-radio Attributes

| 参数                  | 说明                 | 类型                          | 默认值    |
| :-------------------- | :------------------- | :---------------------------- | :-------- |
| model-value / v-model | 绑定值               | string / number / boolean     | 无        |
| option                | 单选数据源           | Array                         | 无        |
| size                  | 单选框的尺寸         | 'large' / 'default' / 'small' | 'default' |
| type                  | 按钮样式             | 'radio' / 'button'            | 'radio'   |
| props                 | 配置选项，具体看下表 | object                        | -         |
| border                | 是否显示边框         | boolean                       | false     |

### 2-1、option 配置参数（Attributes）继承 el-radioGroup Attributes

| 参数     | 说明     | 类型                      | 默认值 |
| :------- | :------- | :------------------------ | :----- |
| value    | 绑定值   | string / number / boolean | 无     |
| label    | 显示值   | string                    | 无     |
| disabled | 是否禁用 | Boolean                   | false  |
| slot     | 插槽名称 | string                    | 无     |

### 2-2、Props

| 参数     | 说明                                   | 类型   | 默认值     |
| :------- | :------------------------------------- | :----- | :--------- |
| value    | 指定节点绑定值为节点对象的某个属性值   | string | 'label'    |
| label    | 指定节点显示值为节点对象的某个属性值   | string | 'label'    |
| disabled | 指定节点是否禁用为节点对象的某个属性值 | string | 'disabled' |

### 3、继承 el-radio&el-radioGroup events
