# TSelectIcon elemnt-plus图标选择组件

### 基本使用

:::demo
TSelectIcon/base
:::

### 是否显示弹窗搜索框

:::demo
TSelectIcon/isShowSearch
:::

### 是否显示选中后的图标

:::demo
TSelectIcon/isShowIcon
:::

### selectBind属性配置

:::demo
TSelectIcon/selectBind
:::

### TSelectIcon Attributes

---

### 1、代码示例

```html
<t-select-icon v-model="selectVlaue" />
```

### 2、配置参数（Attributes）继承 el-input Attributes

| 参数         | 说明                 | 类型       | 默认值                                                                                                             |
| :----------- | :------------------- | :--------- | :----------------------------------------------------------------------------------------------------------------- |
| v-model      | 绑定值               | string     | -                                                                                                                  |
| prefixIcon   | 输入框前缀icon       | string     | Search                                                                                                             |
| isShowSearch | 是否显示搜索图标     | Boolean    | true                                                                                                               |
| isShowIcon   | 是否显示选中后的图标 | Boolean    | true                                                                                                               |
| selectBind   | Attributes           | selectBind | `"prefix-icon": props.prefixIcon, placeholder: "请选择图标",dialogTitle:'请选择图标',clearable: true,width: "50%"` |

### 3、事件（events）继承 el-input 属事件

| 事件名 | 说明       | 回调参数           |
| :----- | :--------- | :----------------- |
| select | 选择完图标 | 返回选中的图标name |
