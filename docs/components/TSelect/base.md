# TSelect 下拉选择组件

### 单选

:::demo
TSelect/single
:::

### 自定义显示下拉项label

:::demo 设置customLabel字符串表达式：`${item.label}（${item.id}）`;注意：表达式必须以`item`开头，且后面的属性必须存在`optionSource`中
TSelect/customLabel
:::

### 单选分页

:::demo 在组件中配置：`isShowPagination` 及 `paginationOption`
TSelect/singePagination
:::

### 多选

:::demo
TSelect/multiple
:::

### 多选--隐藏多余标签的多选

:::demo
TSelect/multipleCollapseTags
:::

### 多选分页

:::demo 在组件中配置：`isShowPagination` 及 `paginationOption`；**`多选不支持翻页选中功能`**
TSelect/pagination
:::

### 虚拟列表--单选

:::demo 在组件中配置：`use-virtual` 即可
TSelect/useVirtual
:::

### 虚拟列表--多选

:::demo 在组件中配置：`use-virtual` 即可
TSelect/useVirtualMultiple
:::

### 虚拟列表--隐藏多余标签的多选

:::demo
TSelect/useVirtualCollapseTags
:::

### TSelect Attributes

---

### 1、代码示例

> `下拉选择组件————可实现单选多选（多选可使用全选功能）`

```html
<t-select
  placeholder="请选择工序"
  v-model="selectVlaue"
  :optionSource="state.stepList"
  valueCustom="label"
  @change="selectChange"
/>
```

### 2、配置参数（Attributes）继承 el-select&el-select-v2 Attributes

| 参数             | 说明                                             | 类型                            | 默认值  |
| :--------------- | :----------------------------------------------- | :------------------------------ | :------ |
| v-model          | 绑定值                                           | boolean / string / number/Array | 无      |
| multiple         | 是否多选                                         | Boolean                         | false   |
| optionSource     | 下拉数据源                                       | Array                           | 无      |
| customLabel      | 是否自定义设置下拉label                          | String                          | -       |
| valueCustom      | 传入的 option 数组中，要作为最终选择项的键值 key | String                          | 'key'   |
| labelCustom      | 传入的 option 数组中，要作为显示项的键值名称     | String                          | 'label' |
| useVirtual       | 是否开启虚拟列表(继承el-select-v2属性)           | Boolean                         | false   |
| isShowPagination | 是否开启分页                                     | Boolean                         | false   |
| paginationOption | 分页配置                                         | Object                          | -       |

### 2-1、paginationOption配置参数（Attributes）继承 el-pagination Attributes

| 参数        | 说明                                                          | 类型   | 默认值                             |
| :---------- | :------------------------------------------------------------ | :----- | :--------------------------------- |
| currentPage | 当前页数                                                      | number | 1                                  |
| pageSize    | 每页显示条目个数                                              | number | 6                                  |
| pagerCount  | 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠 | number | 5                                  |
| total       | 总条目数                                                      | number | 0                                  |
| layout      | 组件布局，子组件名用逗号分隔                                  | string | 'total, prev, pager, next, jumper' |
| bind        | el-pagination属性                                             | Object | -                                  |

### 3、继承 el-select&el-pagination&el-select-v2 events
