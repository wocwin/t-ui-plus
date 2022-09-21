# TQueryCondition 参数配置

### 1. 简介：可以让多种查询条件在输入值后置顶并且按钮显示在右侧

查询条件组件
**代码示例：**

```html
<t-query-condition :opts="conditionParams" @submit="conditionEnter" />
```

### 2. 配置参数（Attributes）

| 参数         | 说明                        | 类型      |     默认值 |
| :--------- | :------------------------ | :------ | ------: |
| opts       | 接收筛选器组件配置                 | object  |       无 |
| loading    | 查询按钮 loading 状态，请求数据时需要体现 | Boolean |   false |
| reset      | 是否显示“重置”按钮                | Boolean |    true |
| boolEnter  | 是否敲回车查询                   | Boolean |    true |
| labelWidth | labelWidth 宽度             | String  | '100px' |
| querybar   | 按钮区域的具名插槽                 | slot    |       - |

### 3.opts 配置参数（opts Attributes）

| 参数          | 说明                                       | 类型               |     默认值 |
| :---------- | :--------------------------------------- | :--------------- | ------: |
| label       | 表单字段说明标题                                 | string           |       无 |
| className   | 自定义 class                                | string           |       无 |
| labelRender | 自定义 label（render 函数 jsx 方式编写）            | function         |       无 |
| slotName    | 自定义输入框插槽(作用域插槽解构接收{param}返回当前所有表单初始值)    | string           |       无 |
| comp        | 组件名称，可直接指定全局注册的组件，也可引入'elmentUI'如：Button 或者'el-button' | string,component |       无 |
| span        | 控件占用的列宽，默认占用 1 列，最多 4 列 (独占一行)           | number           |       1 |
| changeEvent | 默认事件为@input，可通过该属性指定其他事件                 | string           | 'input' |
| text        | 插入到 dom 中的内容                             | string           |       无 |
| bind        | 渲染时组件会调用 v-bind 指定设置该配置更新元素的属性           | object           |       无 |
| event       | 配置组件事件，与写组件时@change 等同理                  | object           |       无 |
| child       | 子组件列表，类似 select 组件存在 options 子组件的则需要用到   | formOpt[]        |       无 |

### 4. 事件（events）

| 事件名    | 说明           | 回调参数                                     |
| :----- | :----------- | :--------------------------------------- |
| change | 筛选器数据发生变化时触发 | Function(form: {[propName: dataIndex]: any}) |
| submit | 点击筛选器查询按钮时触发 | Function(form: {[propName: dataIndex]: any}) |
| reset  | 点击筛选器重置按钮时触发 | Function(form: {[propName: dataIndex]: any}) |
