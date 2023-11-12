# 下拉选择表格组件

### 单选

::: demo `table` 数据源及表头信息;`keywords` 选项中的 value（选项的值）,label(选项的标签);`@radioChange` 选中事件，传出当前选中对象
TSelectTable/radio
:::

### 单选 -- 开启键盘事件（上下选择高亮，回车选中）

::: demo `table` 数据源及表头信息;`keywords` 选项中的 value（选项的值）,label(选项的标签);`@radioChange` 选中事件，传出当前选中对象；`isKeyup` 是否开启键盘事件（默认不开启）上下选择高亮，回车选中
TSelectTable/radioKeyup
:::

### 单选--动态获取下拉数据源

::: demo `table` 数据源及表头信息;`keywords` 选项中的 value（选项的值）,label(选项的标签);`@radioChange` 选中事件，传出当前选中对象
TSelectTable/dynamic
:::

### 多选--动态获取下拉数据源

:::demo `multiple` 开启多选；`table` 数据源及表头信息；`keywords` 选项中的 value（选项的值）,label(选项的标签)；`@selectionChange` 多选事件，传出当前选中项，及选中项的 keywords.value 集合
TSelectTable/dynamicMultiple
:::

### 不显示首列单选

::: demo `table` 数据源及表头信息;`keywords` 选项中的 value（选项的值）,label(选项的标签);`@radioChange` 选中事件，传出当前选中对象
TSelectTable/isShowFirstColumn
:::

### 单选（默认选中）

:::demo `table` 数据源及表头信息;`keywords` 选项中的 value（选项的值）,label(选项的标签);`@radioChange` 选中事件，传出当前选中对象;`defaultSelectVal` 设置`第一页`默认选中项（即`keywords.value`值）是`String, Number`类型（即：keywords.value 是"id",那么需要默认选中哪项就输入该项 table.data 数据的 id 值即可）
TSelectTable/radioDefaultSelectVal
:::

### 多选（默认选中）

:::demo `multiple` 开启多选；`table` 数据源及表头信息；`keywords` 选项中的 value（选项的值）,label(选项的标签)；`@selectionChange` 多选事件，传出当前选中项，及选中项的 keywords.value 集合;`defaultSelectVal` 设置`第一页`默认选中项（即`keywords.value`值）是`Array`类型（即：`keywords.value`是"id",那么需要默认选中哪项就输入该项`table.data`数据的`id`值即可）
TSelectTable/multipleDefaultSelectVal
:::

### 多选

:::demo `multiple` 开启多选；`table` 数据源及表头信息；`keywords` 选项中的 value（选项的值）,label(选项的标签)；`@selectionChange` 多选事件，传出当前选中项，及选中项的 keywords.value 集合
TSelectTable/multiple
:::

### 开启分页功能（支持翻页选中且默认开启）

:::demo `isShowPagination` 开启分页功能；`@page-change`页码改变事件;传出当前选中的页码；`table` 数据源及表头信息；`keywords` 选项中的 value（选项的值）,label(选项的标签)
TSelectTable/isShowPagination
:::

### 显示查询条件

:::demo `isShowQuery` 是否开启查询条件配置，其配置继承查询条件组件（TQueryCondition组件）的所有属性及事件；`table` 数据源及表头信息；`keywords` 选项中的 value（选项的值）,label(选项的标签);**`注意：`查询筛选后，选择完，`单选：`需要`选中下拉数据`或者`点击下拉选择框`才会隐藏下拉框；`多选：`只能`点击下拉选择框`才会隐藏下拉框**
TSelectTable/isShowQuery
:::

### 查询条件--显示隐藏下拉框按钮

:::demo `isShowBlurBtn` 条件查询组件是否显示隐藏下拉框按钮
TSelectTable/isShowQueryMultiple
:::

### 查询条件--下拉框按钮自定义配置

:::demo `btnBind` 配置隐藏下拉框按钮，继承`el-button`所有属性
TSelectTable/isShowQueryBtnBind
:::

### TSelectTable 参数配置

---

### 1、代码示例

```html
<t-select-table
  :table="table"
  :columns="table.columns"
  :max-height="400"
  :keywords="{ label: 'name', value: 'id' }"
  @radioChange="radioChange"
></t-select-table>
```

### 2、配置参数（Attributes）继承 el-table 及 el-select 属性

| 参数              | 说明                                                                                    | 类型                      | 默认值     |
| :---------------- | :-------------------------------------------------------------------------------------- | :------------------------ | :--------- |
| v-model           | 绑定值                                                                                  | boolean / string / number | 仅显示     |
| table             | 表格数据对象                                                                            | Object                    | {}         |
| ---data           | 展示下拉数据源                                                                          | Array                     | []         |
| ---total          | 数据总条数                                                                              | Number                    | -          |
| ---pageSize       | 每页显示条目个数                                                                        | Number                    | -          |
| ---currentPage    | 当前页数                                                                                | Number                    | -          |
| columns           | 表头信息                                                                                | Array                     | []         |
| ----bind          | el-table-column Attributes                                                              | Object                    | -          |
| ----noShowTip     | 是否换行 （设置：noShowTip:true）                                                       | Boolean                   | false      |
| ----fixed         | 列是否固定( left, right)                                                                | string, boolean           | -          |
| ----align         | 对齐方式(left/center/right)                                                             | String                    | center     |
| ----render        | 返回三个参数(text：当前值,row：当前整条数据 ,index：当前行)                             | function                  | -          |
| ----slotName      | 插槽显示此列数据（其值是具名作用域插槽）                                                | String                    | -          |
| ------scope       | 具名插槽获取此行数据必须用解构接收{scope}                                               | Object                    | 当前行数据 |
| keywords          | 关键字配置（value-key 配置）                                                            | Object                    | 无         |
| ------label       | 选项的标签                                                                              | String                    | ‘label’    |
| ------value       | 选项的值                                                                                | String                    | ‘value’    |
| radioTxt          | 单选文案                                                                                | String                    | 单选       |
| multiple          | 是否开启多选                                                                            | Boolean                   | false      |
| rowClickRadio     | 是否开启整行选中(单选)                                                                  | boolean                   | true       |
| isShowFirstColumn | 是否显示首列(单选)                                                                      | boolean                   | true       |
| defaultSelectVal  | 设置第一页默认选中项--keywords.value 值（单选是 String, Number 类型；多选时是数组）     | Number / string / Array   | -          |
| filterable        | 是否开启过滤(根据 keywords 的 label 值进行过滤)                                         | Boolean                   | true       |
| reserveSelection  | 是否支持翻页选中                                                                        | Boolean                   | true       |
| isShowPagination  | 开启分页                                                                                | Boolean                   | false      |
| tableWidth        | table 宽度                                                                              | Number                    | 550        |
| isKeyup           | 单选是否开启键盘事件                                                                    | Boolean                   | false      |
| isShowQuery       | 是否允许配置查询条件(继承TQueryCondition的所有属性、事件、插槽)                         | Boolean                   | false      |
| isShowBlurBtn     | 条件查询组件是否显示隐藏下拉框按钮                                                      | Boolean                   | false      |
| btnBind           | 显示下拉框按钮配置，继承`el-button`所有属性;`默认值{type:'danger',btnTxt:'关闭下拉框'}` | Object                    | -          |

### 3、事件（events）继承 el-table 及 el-select 属性

| 事件名          | 说明                                                 | 回调参数                                       |
| :-------------- | :--------------------------------------------------- | :--------------------------------------------- |
| page-change     | 页码改变事件(避免与el-table的current-change事件冲突) | 返回选中的页码                                 |
| selectionChange | 多选事件                                             | 返回选中的项数据及选中项的 keywords.value 集合 |
| radioChange     | 单选                                                 | 返回当前项所有数据                             |

### 4、方法（Methods）继承 el-table 及 el-select 属性

| 方法名 | 说明                            | 回调参数 |
| :----- | :------------------------------ | :------- |
| clear  | 清空选中项                      |          |
| focus  | 使 input 获取焦点               |          |
| blur   | 使 input 失去焦点，并隐藏下拉框 |          |
