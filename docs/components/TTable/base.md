# Table 表格

用于展示多条结构类似的数据， 可对数据进行排序、筛选、对比或其他自定义操作。

### 基础用法

:::demo
TTable/base
:::

### 边框表格

:::demo 在`table`对象中添加`border:true`
TTable/border
:::

### 复选框表格

:::demo 在`table`对象中添加`firstColumn:{ type: 'selection', fixed: true }`
TTable/selection
:::

### 单选框表格

:::demo 在`table`对象中添加`firstColumn:{ type: 'radio', fixed: true }`,可以再次点击取消选中；添加`@radioChange`事件传当前选中行是数据；默认点击整行选中 可以设置`rowClickRadio：false`,只有点击单选框才选中
TTable/radio
:::

### 序列号表格

:::demo 在`table`对象中添加`firstColumn:{ type: 'index', fixed: true }`；可以新增`label`属性来定义表头名默认'序号'
TTable/serialNum
:::

### 双击单元格复制(默认不开启)

:::demo 若需要关闭（在 TTable 标签中设置属性：`isCopy:true`）
TTable/isCopy
:::

### 字典过滤渲染

:::demo `columns`中某项添加`filters: { list: 'statusList', key: 'id', label: 'label' }`；`table`中添加`listTypeInfo: { statusList:[数据源] }`字典类型的数据源
TTable/filters
:::

### 表头合并单元格（多级表头）

:::demo 只需要配置`columns`中某项新增`children：Array[]`属性;表头合并自动加边框
TTable/multileHead
:::

### 表格操作按钮

:::demo `operator数组`：`operator 数组`是显示按钮数且点击后将当前行数据传出；`operatorConfig` 对象是操作列样式（可以设置宽度/列标题及是否固定在最左/右侧）；按钮的颜色是以 `ElementUI` 内置 `button` 的 `type` 为准；隐藏按钮——`noshow`:多种状态控制按钮的显示与隐藏；例如：`noshow:[{key:'fields',val:'isHasVal'},{key:'status',val:[0,1,99]},{key:'channelCode',val:['bank']}]`；注释： `noshow` 中的 `key` 值(fields/status/channelCode)是表格后台返回的字段； 当 `val` 等于字符串'isHasVal'时,字段'fields'返回为空时，此行操作按钮隐藏； `以上综合：`当'status'为 0/1/99 并且'channelCode'为'bank'及'fields'为空时；`show: { key: 'status', val: [3,4] }`表 status 值为 3 或者 4 时，显示此操作健 根据后台字段返回是数字还是字符串来显示
TTable/operator
:::

### 集成分页器

:::demo
TTable/isShowPagination
:::

### 某列 render 渲染

:::demo
TTable/render
:::

### 某列 作用域插槽渲染

:::demo
TTable/slotName
:::

### 自定义表头渲染

:::demo
TTable/renderHeader
:::

### 动态显示隐藏列且可以拖动排序

:::demo
TTable/columnSetting
:::

### 单元格编辑功能

:::demo
TTable/configEdit
:::

### 单元格单独编辑

:::demo
TTable/configEditUse
:::

### 单元格编辑--键盘事件

:::demo `isKeyup` 单元格编辑是否开启键盘事件;向上、向下、回车横向的下一个输入框
TTable/singleEditKeyup
:::

### 单元格编辑--使用组件事件

:::demo
TTable/eventHandle
:::

### TTable 参数配置

---

#### 1、代码示例

```html
<t-table
  :table="table"
  :columns="table.columns"
  @size-change="handlesSizeChange"
  @page-change="handlesCurrentChange"
/>
```

#### 2、配置参数（Table Attributes）

| 参数                    | 说明                                                                           | 类型         | 默认值  |
| :---------------------- | :----------------------------------------------------------------------------- | :----------- | :------ |
| table                   | 表格数据对象                                                                   | Object       | {}      |
| ---data                 | 展示数据                                                                       | Array        | []      |
| ---toolbar              | 表格外操作栏选中表格某行，可以将其数据传出                                     | Array        | []      |
| ---operator             | 表格内操作栏数据                                                               | Array        | []      |
| -------show             | 表格内操作栏根据状态显示                                                       | Object       | -       |
| -------noshow           | 表格内操作栏根据多种状态不显示                                                 | Array        | -       |
| ---operatorConfig       | 表格内操作栏样式                                                               | Object       | -       |
| ---firstColumn          | 表格首列(序号 index,复选框 selection）排列                                     | object       | -       |
| ---total                | 数据总条数                                                                     | Number       | -       |
| ---pageSize             | 页数量                                                                         | Number       | -       |
| ---currentPage          | 是否需要显示切换页条数                                                         | Number       | -       |
| columns                 | 表头信息                                                                       | Array        | []      |
| ----sort                | 排序 （设置：sort:true）                                                       | Boolean      | false   |
| ----renderHeader        | 列标题 Label 区域渲染使用的 Function(val) 可以用 jsx 方式                      | Function     | -       |
| ----bind                | el-table-column Attributes                                                     | Object       | -       |
| ----noShowTip           | 是否换行 （设置：noShowTip:true）                                              | Boolean      | false   |
| ----slotName            | 插槽显示此列数据（其值是具名作用域插槽                                         | String       | -       |
| ----------param         | 具名插槽获取此行数据必须用解构接收{scope}.row 是当前行数据 }                   | Object       | -       |
| ----canEdit             | 是否开启单元格编辑功能                                                         | Boolean      | false   |
| ----configEdit          | 表格编辑配置（开启编辑功能有效）                                               | Object       | -       |
| ----------label         | placeholder 显示                                                               | String       | -       |
| ----------editComponent | 组件名称可直接指定全局注册的组件，也可引入'element/abtd'如：'a-input/el-input' | String       | -       |
| ----------eventHandle   | 第三方 UI 的 事件（返回两个参数，第一个自己自带，第二个 scope）                | Object       | -       |
| ----------bind          | 第三方 UI 的 Attributes，如 el-input 中的 clearable 清空功能                   | Object       | -       |
| ----------event         | 触发 handleEvent 事件的标志                                                    | String       | -       |
| ----------type          | 下拉或者复选框显示（select-arr/select-obj/checkbox）                           | String       | -       |
| ----------list          | 下拉选择数据源名称                                                             | String       | -       |
| ----------arrLabel      | type:select-arr 时对应显示的中文字段                                           | String       | -       |
| ----------arrKey        | type:select-arr 时对应显示的数字字段                                           | String       | -       |
| ----filters             | 字典过滤                                                                       | Object       | -       |
| ----------list          | listTypeInfo 里面对应的下拉数据源命名                                          | String       | -       |
| ----------key           | 数据源的 key 字段                                                              | String       | 'value' |
| ----------label         | 数据源的 label 字段                                                            | String       | 'label' |
| listTypeInfo            | 下拉选择数据源                                                                 | Object       | -       |
| footer                  | 底部操作区（默认隐藏，使用插槽展示“保存”按钮）                                 | slot         | -       |
| isKeyup                 | 单元格编辑是否开启键盘事件                                                     | Boolean      | false   |
| isShowFooterBtn         | 是否显示保存按钮                                                               | Boolean      | false   |
| title                   | 表格左上标题                                                                   | String /slot | -       |
| isShowPagination        | 是否显示分页(默认显示分页)                                                     | Boolean      | true    |
| isTableColumnHidden     | 是否开启合计行隐藏复选框/单选框                                                | Boolean      | false   |
| isCopy                  | 是否允许双击单元格复制                                                         | Boolean      | false   |
| rowClickRadio           | 是否开启点击整行选中单选框                                                     | Boolean      | true    |
| columnSetting           | 是否显示设置（隐藏/显示列）                                                    | Boolean      | false   |
| name                    | 与 columnSetting 配合使用标记隐藏/显示列唯一性                                 | String       | title   |

#### 3、events 其他事件按照 el-table 直接使用（如 sort-change 排序事件）

| 事件名      | 说明             | 返回值                                        |
| :---------- | :--------------- | :-------------------------------------------- |
| page-change | 当前页码         | 当前选中的页码                                |
| save        | 保存按钮         | 编辑后的所有数据                              |
| handleEvent | 单个输入触发事件 | configEdit 中的 event 值和对应输入的 value 值 |
| radioChange | 单选选中事件     | 返回当前选中的整行数据                        |

#### 4、Methods 方法

| 事件名             | 说明                         | 参数 |
| :----------------- | :--------------------------- | :--- |
| clearSelection     | 用于多选表格，清空用户的选择 | -    |
| clearSort          | 清空排序条件                 | -    |
| toggleRowSelection | 取消某一项选中项             | -    |
| toggleAllSelection | 全部选中                     | -    |
