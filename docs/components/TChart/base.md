# chart

### 基础用法

:::demo 基于 Element-plus 的 `el-radio` 二次封装的**单选组件**，继承原组件的所有属性
TChart/base
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
