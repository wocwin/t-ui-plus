# TInput 输入框组件

### 基本使用

:::demo
TInput/base
:::

### 输入金额

:::demo 设置`inputType=amount`；若开启千分号显示`showThousands`，则必须`type=text`，默认2位小数点，可设置`decimalLimit`来调整小数点位数。
TInput/amount
:::

### 金额鼠标移入提示中文

:::demo 设置`inputType=amount`；标签添加`isTip`开启中文提示则不允许开启千分号显示`showThousands`。
TInput/amountTip
:::

### 输入手机号

:::demo 设置`inputType=phone`
TInput/phone
:::

### 输入整数

:::demo 设置`inputType=integer`
TInput/integer
:::

### 输入数字（含小数点）
:::demo 设置`inputType=decimal`，默认2位小数点，可设置`decimalLimit`来调整小数点位数。
TInput/decimal
:::

### 输入身份证号

:::demo 设置`inputType=idCard`
TInput/idCard
:::

### 格式化输入内容

:::demo 在 `formatter`的情况下显示值，我们通常同时使用 `parser`
TInput/formatter
:::

### 文本域
:::demo 设置 `type="textarea"`，并可通过 `rows` 属性控制文本域高度
TInput/textarea
:::

### 复合型输入框
:::demo 可通过 slot = prepend 和 slot = append 来增加前置和后置的元素
TInput/compoundType
:::

### 尺寸
:::demo 可通过 `size` 属性指定输入框的尺寸，该属性可接受 `medium`, `small`, `mini` 三个值
TInput/size
:::

### 插槽使用
:::demo 按照 `el-input` 方式来使用插槽
TInput/slot
:::

### TInput Attributes

---

### 1、代码示例

```html
<t-input v-model="inputVlaue" />
```

### 2、配置参数（Attributes）继承 el-input Attributes

| 参数          | 说明                                                  | 类型                                                                                              | 默认值   |
| :------------ | :---------------------------------------------------- | :------------------------------------------------------------------------------------------------ | :------- |
| v-model       | 绑定值                                                | string                                                                                            | -        |
| placeholder   | placeholder提示语                                     | string                                                                                            | '请输入' |
| decimalLimit  | 小数点位数 <t-tip content='小数、金额类型时生效'/>    | Number                                                                                            | 2        |
| appendTitle   | 插槽append显示文案<t-tip content='金额类型时生效'/>   | string                                                                                            | '元'     |
| showThousands | 是否显示千分号<t-tip content='小数、金额类型时生效'/> | Boolean                                                                                           | false    |
| isTip         | 是否提示金额中文<t-tip content='金额类型时生效'/>     | Boolean                                                                                           | false    |
| inputType     | 特性类型标注                                          | string<t-tip content='文字:text,金额:amount,电话:phone,整数:integer,小数:decimal,身份证:idCard'/> | text     |


### 3、继承 el-input 事件、插槽、方法


