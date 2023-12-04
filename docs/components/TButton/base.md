# 按钮组件(内置防抖功能)

### 基础用法

:::demo `继承el-button所有属性` <br/>新增`time`属性（多少时间内点击；默认 1 秒）<br/>
TButton/base
:::

### 提示文字

:::demo 使用 `type、size、tip、icon`和`placement`属性来定义 Button 的样式；
TButton/tip
:::

### 2、配置参数（Attributes）继承 el-button Attributes

| 参数      | 说明                                                      | 类型                                                 | 默认值 |
| :-------- | :-------------------------------------------------------- | :--------------------------------------------------- | :----- |
| size      | 尺寸                                                      | 'large' / 'default' / 'small'                        | -      |
| type      | 类型                                                      | 'default / 'primary / 'success / 'warning / 'danger' | -      |
| plain     | 是否朴素按钮                                              | boolean                                              | false  |
| round     | 是否圆角按钮                                              | boolean                                              | false  |
| circle    | 是否圆形按钮                                              | boolean                                              | false  | 无 |
| time      | 防抖的时间                                                | number                                               | 1000   |
| tip       | 提示文字，常用于type="text" 或拥有text，link 属性的button | string                                               | -      |
| placement | Tooltip 组件出现的位置                                    | 继承el-tooltip                                       | top    |
| tipProps  | Tooltip 组件的配置参数，详情可看 element-plus官网         | object                                               | -      |


### placement 类型

>'top' / 'top-start' / 'top-end' / 'bottom' / 'bottom-start' / 'bottom-end' / 'left' / 'left-start' / 'left-end' / 'right' / 'right-start' / 'right-end'


