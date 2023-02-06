# TForm 表单组件

---

### 基础用法

<demo src="../../demos/TForm/base.vue"></demo>


### 对齐方式

::: tip 配置

通过设置 `formOpts.labelPosition` 属性可以改变表单域标签的位置，可选值为 `top`、`left`、`right`，默认`right`

**前提：需设置`formOpts.labelWidth`(默认是：100px——即 `label` 的宽度)**

:::

<demo src="../../demos/TForm/labelPosition.vue"></demo>


### 每行展示多少项

::: tip 配置

通过设置 `widthSize` 属性可以改变表单域每行显示项，可选值为 `1`、`2`、`3`、`4`，默认`2`————即每行显示两项

**若某一项需要单独显示一行（通常是备注或者文本域）需要在 fieldList 中设置 `widthSize` 为 1**

:::

<demo src="../../demos/TForm/widthSize.vue"></demo>


### 表单校验规则

::: tip 配置

`TForm` 组件提供了表单验证的功能，只需要通过 `rules` 属性传入约定的验证规则，并将 `Form-Item` 的 `prop` 属性设置为需校验的字段名即可。校验规则参见 [async-validator](https://github.com/yiminghe/async-validator);

可以`自定义校验规则`可以参考`email`方式来写

:::

<demo src="../../demos/TForm/rules.vue"></demo>


### 自定义 label jsx 渲染

::: tip 配置

`TForm`组件提供了自定义 `label`的功能，使用`jsx`方式—————配置`labelRender`

**当`labelRender`与`label`同时存在时：优先渲染`labelRender`**

:::

<demo src="../../demos/TForm/labelRender.vue"></demo>


### 输入框插槽使用

::: tip 配置

`TForm`组件提供了自定义 `输入框插槽`或下拉选择的`option插槽`的功能

输入框插槽：配置`slotName`

option 插槽：配置`childSlotName`

:::

<demo src="../../demos/TForm/slotName.vue"></demo>


### 文本展示

::: tip 配置

`TForm`组件提供了`文本展示`的功能

设置 `textShow: true`; `textValue`——显示的文本

:::

<demo src="../../demos/TForm/textShow.vue"></demo>


### 结合自己封装组件使用

<demo src="../../demos/TForm/comUse.vue"></demo>


### 赋值回显数据

<demo src="../../demos/TForm/assignment.vue"></demo>


### 新开页面或弹窗获取表单数据

<demo src="../../demos/TForm/submit.vue"></demo>


### TForm 参数配置

#### 1. 简介：基于 Element-plus Form 表单组件的二次封装，着重于数据层面，HTML 一行代码

TForm 表单组件 **代码示例：**

```html
<t-form
  v-model="formOpts.ref"
  :formOpts="formOpts"
  :widthSize="2"
  @handleEvent="handleEvent"
/>
//注意formOpts.ref(t-form组件实例相当于vue2 ref)需要要v-model接收
```

#### 2. events

| 事件名 | 说明 | 返回值 |
| :-- | :-- | :-- |
| handleEvent | 单个查询条件触发事件 | fieldList 中 type/查询条件输入的值/fieldList 中 event 值 |

#### 3. Methods 继承 element-plus 的 methods

| 事件名        | 说明     | 参数 |
| :------------ | :------- | :--- |
| resetFields   | 重置表单 | -    |
| clearValidate | 清空校验 | -    |

#### 4. 配置参数

| 参数 | 说明 | 类型 | 是否必须 |
| :-- | :-- | :-- | :-- |
| className | 自定义类名 | String | 否 |
| labelPosition | 改变表单项 label 与输入框的布局方式(默认：right) /top | String | 否 |
| widthSize | 每行显示几个输入项（默认两项） 最大值 4 | Number | 否 |
| formOpts | 表单配置项 | Object | 否 |
| ---listTypeInfo | 下拉选择数据源（type:'select'有效） | Object | 否 |
| ---fieldList | form 表单每项 list | Array | 是 |
| ------isHideItem | 某一项不显示 | Boolean | false |
| ------slotName | 自定义表单某一项输入框 | slot | 否 |
| ------childSlotName | 自定义表单某一下拉选择项子组件插槽（el-option） | slot | 否 |
| ------comp | form 表单每一项组件是输入框还是下拉选择等（可使用第三方 UI 如 el-select/el-input 也可以使用自定义组件） | String | 是 |
| ------bind | 表单每一项属性（继承第三方 UI 的 Attributes，如 el-input 中的 clearable 清空功能）默认清空及下拉过滤 | Object/funnction | 否 |
| ------type | form 表单每一项类型 | String | 是 |
| ------widthSize | form 表单某一项所占比例(如果占一整行则设置 1) | Number | 否 |
| ------width | form 表单某一项所占实际宽度 | String | 否 |
| ------arrLabel | type=select-arr 时，每个下拉显示的中文 | String | 否 |
| ------arrKey | type=select-arr 时，每个下拉显示的中文传后台的数字 | String | 否 |
| ------label | form 表单每一项 title | String | 是 |
| ------labelRender | 自定义某一项 title | function | 是 |
| ------value | form 表单每一项传给后台的参数 | String | 是 |
| ------rules | 每一项输入框的表单校验规则 | Object/Array | 否 |
| ------list | 下拉选择数据源（仅仅对 type:'select'有效） | String | 否 |
| ------event | 表单每一项事件标志（handleEvent 事件） | Array | 否 |
| ------className | 如果某一项需要一行显示则设置：className:'t-form-block' | String | 否 |
| ---formData | 表单提交数据(对应 fieldList 每一项的 value 值) | Object | 是 |
| ---labelWidth | label 宽度 | String | 否 |
| ---rules | 规则（可依据 elementUI el-form 配置————对应 formData 的值） | Object/Array | 否 |
| ---operatorList | 操作按钮 list | Array | 否 |

#### 5. 关于 element-plus el-form/el-form-item 提供的一些方法/属性可直接使用，无需其他配置
