# Table 表格

用于展示多条结构类似的数据， 可对数据进行排序、筛选、对比或其他自定义操作。

## 基础用法

:::demo

TTable/base

:::

## 边框表格

在`table`对象中添加`border:true`

:::demo

TTable/border

:::

## 复选框表格

在`table`对象中添加`firstColumn:{ type: 'selection', fixed: true }`

:::demo

TTable/checkbox

:::

## 单选框表格

在`table`对象中添加`firstColumn:{ type: 'radio', fixed: true }`,可以再次点击取消选中；添加`@radioChange`事件传当前选中行是数据<br/>默认点击整行选中 可以设置`rowClickRadio：false`,只有点击单选框才选中

:::demo

TTable/radio

:::

## 序列号表格

在`table`对象中添加`firstColumn:{ type: 'index', fixed: true }`；可以新增`label`属性来定义表头名默认'序号'

:::demo

TTable/serialNum

:::

## 双击单元格复制(默认开启)

若需要关闭（在 TTable 标签中设置属性：`isCopy:false`）

:::demo

TTable/copy

:::

## 字典过滤渲染

`columns`中某项添加`filters: { list: 'statusList', key: 'id', label: 'label' }`<br/>`table`中添加`listTypeInfo: { statusList:[数据源] }`字典类型的数据源

:::demo

TTable/dictionaryFilter

:::

## 表头合并单元格（多级表头）

只需要配置`columns`中某项新增`children：Array[]`属性;表头合并自动加边框

:::demo

TTable/headerGroup

:::

## 表格操作按钮

在组件中需配置：`operator数组`

`operator 数组`是显示按钮数且点击后将当前行数据传出

`operatorConfig` 对象是操作列样式（可以设置宽度/列标题及是否固定在最左/右侧）

按钮的颜色是以 `ElementUI` 内置 `button` 的 `type` 为准

隐藏按钮——`noshow`:多种状态控制按钮的显示与隐藏

例如：`noshow:[{key:'fields',val:'isHasVal'},{key:'status',val:[0,1,99]},{key:'channelCode',val:['bank']}]`

> 注释： `noshow` 中的 `key` 值(fields/status/channelCode)是表格后台返回的字段
>
> 当 `val` 等于字符串'isHasVal'时,字段'fields'返回为空时，此行操作按钮隐藏
>
> `以上综合：`当'status'为 0/1/99 并且'channelCode'为'bank'及'fields'为空时

`show: { key: 'status', val: [3,4] }`表 status 值为 3 或者 4 时，显示此操作健 根据后台字段返回是数字还是字符串来显示

:::demo

TTable/operation

:::

## 集成分页器

:::demo

TTable/pagination

:::

## 某列 render 渲染

:::demo

TTable/renderCol

:::

## 某列 作用域插槽渲染

:::demo

TTable/slotName

:::

## 自定义表头渲染

:::demo

TTable/renderHeader

:::

## 动态显示隐藏列且可以拖动排序

:::demo

TTable/columnSet

:::

<!-- ## 单元格编辑功能 -->

<!-- :::demo

TTable/singleEditTable

::: -->

## 使用帮助

### 代码示例

```
     <t-table
          :table="table"
          :columns="table.columns"
          @size-change="handlesSizeChange"
          @page-change="handlesCurrentChange"
        />
```

### events 其他事件按照 el-table 直接使用（如 sort-change 排序事件）

| 事件名 | 说明 | 返回值 |
| :-- | :-- | :-- |
| page-change | 当前页码 | 当前选中的页码 |
| save | 保存按钮 | 编辑后的所有数据 |
| handleEvent | 单个输入触发事件 | configEdit 中的 event 值和对应输入的 value 值 |
| radioChange | 单选选中事件 | 返回当前选中的整行数据 |

### Methods 方法

| 事件名             | 说明                         | 参数 |
| :----------------- | :--------------------------- | :--- |
| clearSelection     | 用于多选表格，清空用户的选择 | -    |
| clearSort          | 清空排序条件                 | -    |
| toggleRowSelection | 取消某一项选中项             | -    |

### 配置参数（Table Attributes）

| 参数 | 说明 | 类型 | 是否必须 |
| :-- | :-- | :-- | :-- |
| table | 表格数据对象 | Object | 是 |
| ---data | 展示数据 | Array | 是 |
| ---toolbar | 表格外操作栏选中表格某行，可以将其数据传出 | Array | 否 |
| ---operator | 表格内操作栏数据 | Array | 否 |
| -------show | 表格内操作栏根据状态显示 | Object | 否 |
| -------noshow | 表格内操作栏根据多种状态不显示 | Array | 否 |
| ---operatorConfig | 表格内操作栏样式 | Object | 否 |
| ---firstColumn | 表格首列(序号 index,复选框 selection）排列 | object | 否 |
| ---total | 数据总条数 | Number | 否 |
| ---pageSize | 页数量 | Number | 否 |
| ---currentPage | 是否需要显示切换页条数 | Number | 否 |
| columns | 表头信息 | Array | 是 |
| ----sort | 排序 （设置：sort:true） | Boolean | 否 |
| ----renderHeader | 列标题 Label 区域渲染使用的 Function(val) 可以用 jsx 方式 | Function | 否 |
| ----bind | el-table-column Attributes | Object | 否 |
| ----noShowTip | 是否换行 （设置：noShowTip:true） | Boolean | 否 |
| ----slotName | 插槽显示此列数据（其值是具名作用域插槽 | String | 否 |
| ----------param | 具名插槽获取此行数据必须用解构接收{scope}.row 是当前行数据 } | Object | 否 |
| ----canEdit | 是否开启单元格编辑功能 | Boolean | 否 |
| ----configEdit | 表格编辑配置（开启编辑功能有效） | Object | 否 |
| ----------label | placeholder 显示 | String | 否 |
| ----------editComponent | 组件名称可直接指定全局注册的组件，也可引入'element/abtd'如：'a-input/el-input' | String | 否 |
| ----------bind | 第三方 UI 的 Attributes，如 el-input 中的 clearable 清空功能 | Object | 否 |
| ----------event | 触发 handleEvent 事件的标志 | String | 否 |
| ----------type | 下拉或者复选框显示（select-arr/select-obj/checkbox） | String | 否 |
| ----------list | 下拉选择数据源名称 | String | 否 |
| ----------arrLabel | type:select-arr 时对应显示的中文字段 | String | 否 |
| ----------arrKey | type:select-arr 时对应显示的数字字段 | String | 否 |
| ----filters | 字典过滤 | Object | - |
| ----------list | listTypeInfo 里面对应的下拉数据源命名 | String | - |
| ----------key | 数据源的 key 字段 | String | 'value' |
| ----------label | 数据源的 label 字段 | String | 'label' |
| listTypeInfo | 下拉选择数据源 | Object | 否 |
| footer | 底部操作区（默认隐藏，使用插槽展示“保存”按钮） | slot | 否 |
| isShowFooterBtn | 是否显示保存按钮 | Boolean | 否 |
| title | 表格左上标题 | String /slot | 否 |
| isShowPagination | 是否显示分页(默认显示分页) | Boolean | 否 |
| isTableColumnHidden | 是否开启合计行隐藏复选框/单选框 | Boolean | 否 |
| isCopy | 是否允许双击单元格复制 | Boolean | true |
| rowClickRadio | 是否开启点击整行选中单选框 | Boolean | true |
| columnSetting | 是否显示设置（隐藏/显示列） | Boolean | false |
| name | 与 columnSetting 配合使用标记隐藏/显示列唯一性 | String | title |
