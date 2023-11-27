# TForm 表单组件

---

### 基础用法

::: demo
TForm/base
:::

### 继承 Element-plus 组件的事件使用

::: demo
TForm/eventHandle
:::

### el-input 去除前后空格（type=password 除外）

::: demo
TForm/isTrim
:::

### 对齐方式

:::demo 通过设置 `formOpts.labelPosition` 属性可以改变表单域标签的位置，可选值为 `top`、`left`、`right`，默认`right`；**前提：需设置`formOpts.labelWidth`(默认是：100px——即 `label` 的宽度)**
TForm/labelPosition
:::

### 每行展示多少项

:::demo 通过设置 `widthSize` 属性可以改变表单域每行显示项，可选值为 `1`、`2`、`3`、`4`，默认`2`————即每行显示两项；**若某一项需要单独显示一行（通常是备注或者文本域）需要在 fieldList 中设置 `widthSize` 为 1**
TForm/widthSize
:::

### 表单校验规则

:::demo `TForm` 组件提供了表单验证的功能，只需要通过 `rules` 属性传入约定的验证规则，并将 `Form-Item` 的 `prop` 属性设置为需校验的字段名即可。校验规则参见 [async-validator](https://github.com/yiminghe/async-validator);可以`自定义校验规则`可以参考`email`方式来写
TForm/rules
:::

### 自定义 label jsx 渲染

:::demo 使用`tsx`方式—————配置`labelRender`**当`labelRender`与`label`同时存在时：优先渲染`labelRender`**
TForm/labelRender
:::

### 输入框插槽使用

:::demo `TForm`组件提供了自定义 `输入框插槽`或下拉选择的`option插槽`的功能输入框插槽：配置`slotName`option 插槽：配置`childSlotName`
TForm/slotName
:::

### 文本展示

:::demo `TForm`组件提供了`文本展示`的功能设置 `textShow: true`; `textValue`——显示的文本
TForm/textShow
:::

### 结合自己封装组件使用

:::demo
TForm/comUse
:::

### 赋值回显数据

:::demo
TForm/echo
:::

### 密码在新增显示，编辑不显示

:::demo
TForm/isHideItem
:::

### TForm 参数配置

---

### 1. 简介：基于 Element-plus Form 表单组件的二次封装，着重于数据层面，HTML 一行代码

> TForm 表单组件 **代码示例：**

```html
<t-form
  v-model="formOpts.ref"
  :formOpts="formOpts"
  :widthSize="2"
  @handleEvent="handleEvent"
/>
//注意formOpts.ref(t-form组件实例相当于vue2 ref)需要要v-model接收
```

### 2. 配置参数

| 参数                | 说明                                                                                                    | 类型             | 是否必须 |
| :------------------ | :------------------------------------------------------------------------------------------------------ | :--------------- | :------- |
| className           | 自定义类名                                                                                              | String           | -        |
| labelPosition       | 改变表单项 label 与输入框的布局方式(默认：right) /top                                                   | String           | right    |
| widthSize           | 每行显示几个输入项（默认两项） 最大值 4                                                                 | Number           | 2        |
| isTrim              | 全局是否开启清除前后空格(comp 为 el-input 且 type 不等于'password')                                     | Boolean          | true     |
| formOpts            | 表单配置项                                                                                              | Object           | -        |
| ---listTypeInfo     | 下拉选择数据源（type:'select'有效）                                                                     | Object           | -        |
| ---fieldList        | form 表单每项 list                                                                                      | Array            | 是-      |
| ------isHideItem    | 某一项不显示                                                                                            | Boolean          | false    |
| ------slotName      | 自定义表单某一项输入框                                                                                  | slot             | -        |
| ------childSlotName | 自定义表单某一下拉选择项子组件插槽（el-option）                                                         | slot             | -        |
| ------comp          | form 表单每一项组件是输入框还是下拉选择等（可使用第三方 UI 如 el-select/el-input 也可以使用自定义组件） | String           | -        |
| ------bind          | 表单每一项属性（继承第三方 UI 的 Attributes，如 el-input 中的 clearable 清空功能）默认清空及下拉过滤    | Object/funnction | -        |
| ------isSelfCom     | 是否使用自己封装的组件（即不需要嵌套el-option等）                                                       | Boolean          | false    |
| ------isTrim        | 是否不清除前后空格(comp 为 el-input 且 type 不等于'password')                                           | Boolean          | false    |
| ------type          | form 表单每一项类型                                                                                     | String           | -        |
| ------widthSize     | form 表单某一项所占比例(如果占一整行则设置 1)                                                           | Number           | -        |
| ------width         | form 表单某一项所占实际宽度                                                                             | String           | -        |
| ------arrLabel      | type=select-arr 时，每个下拉显示的中文                                                                  | String           | label    |
| ------arrKey        | type=select-arr 时，每个下拉显示的中文传后台的数字                                                      | String           | key      |
| ------label         | form 表单每一项 title                                                                                   | String           | -        |
| ------labelRender   | 自定义某一项 title                                                                                      | function         | -        |
| ------value         | form 表单每一项传给后台的参数                                                                           | String           | -        |
| ------rules         | 每一项输入框的表单校验规则                                                                              | Object/Array     | -        |
| ------list          | 下拉选择数据源（仅仅对 type:'select'有效）                                                              | String           | -        |
| ------event         | 表单每一项事件标志（即是：handleEvent 事件第一个参数值）                                                | String           | -        |
| ------eventHandle   | 继承 comp 组件的事件                                                                                    | Object           | -        |
| ---formData         | 表单提交数据(对应 fieldList 每一项的 value 值)                                                          | Object           | -        |
| ---labelWidth       | label 宽度                                                                                              | String           | 120px    |
| ---rules            | 规则（可依据 elementUI el-form 配置————对应 formData 的值）                                             | Object/Array     | -        |
| ---operatorList     | 操作按钮 list                                                                                           | Array            | -        |
| -------bind         | 继承el-button所有Attributes(默认值{ type:'primary',size:'small',})                                      | Object           | -        |
| -------fun          | 事件名                                                                                                  | function         | -        |

### 3. events

| 事件名      | 说明                 | 返回值                                                   |
| :---------- | :------------------- | :------------------------------------------------------- |
| handleEvent | 单个查询条件触发事件 | fieldList 中 type/查询条件输入的值/fieldList 中 event 值 |

### 4. Methods 继承 element-plus 的 methods

| 事件名       | 说明       | 返回值                        |
| :----------- | :--------- | :---------------------------- |
| selfValidate | 自定义校验 | valid:Boolean;formData:object |

### 5. 关于 element-plus el-form/el-form-item 提供的一些方法/属性可直接使用，无需其他配置
