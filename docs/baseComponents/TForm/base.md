# TForm 表单组件

---

## 基础用法

:::demo

TForm/base

:::

## TForm 参数配置

### 1. 简介：基于 Element-plus Form 表单组件的二次封装，着重于数据层面，HTML 一行代码

TForm 表单组件 **代码示例：**

```html
<t-form
  :formOpts="formOpts"
  :widthSize="2"
  @handleEvent="handleEvent"
/>
//注意:ref-obj(form校验规则相当于ref)必须要‘.sync’修饰符
```

### 2. events

| 事件名 | 说明 | 返回值 |
| :-- | :-- | :-- |
| handleEvent | 单个查询条件触发事件 | fieldList 中 type/查询条件输入的值/fieldList 中 event 值 |

### 3. Methods

| 事件名        | 说明     | 参数 |
| :------------ | :------- | :--- |
| resetFields   | 重置表单 | -    |
| clearValidate | 清空校验 | -    |

### 4. 配置参数

| 参数 | 说明 | 类型 | 是否必须 |
| :-- | :-- | :-- | :-- |
| className | 自定义类名 | String | 否 |
| labelPosition | 改变表单项 label 与输入框的布局方式(默认：right) /top | String | 否 |
| widthSize | 每行显示几个输入项（默认两项） 最大值 4 | Number | 否 |
| formOpts | 表单配置项 | Object | 否 |
| ---listTypeInfo | 下拉选择数据源（type:'select'有效） | Object | 否 |
| ---fieldList | form 表单每项 list | Array | 是 |
| ------slotName | 自定义表单某一项输入框 | slot | 否 |
| ------childSlotName | 自定义表单某一下拉选择项子组件插槽（el-option） | slot | 否 |
| ------comp | form 表单每一项组件是输入框还是下拉选择等（可使用第三方 UI 如 el-select/el-input 也可以使用自定义组件） | String | 是 |
| ------bind | 表单每一项属性（继承第三方 UI 的 Attributes，如 el-input 中的 clearable 清空功能）默认清空及下拉过滤 | Object | 否 |
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

### 5. 关于 element-ui el-form/el-form-item 提供的一些方法/属性可直接使用，无需其他配置
