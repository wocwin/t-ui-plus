# TSelect 下拉选择组件

### 单选

:::demo
TSelect/single
:::

### 自定义显示下拉项 label

:::demo 设置 customLabel 字符串表达式：`${_item.label}（${_item.id}）`;注意：表达式必须以`_item`开头，且后面的属性必须存在`optionSource`中
TSelect/customLabel
:::

### 单选分页

:::demo 在组件中配置：`isShowPagination` 及 `paginationOption`,`isCached`属性，默认`true`开启缓存，切换分页后会把上一页选中的数据，追加在当前页的数据中。
TSelect/singePagination
:::

### 单选--回显不是第一页的label<el-tag>1.5.2</el-tag>

:::demo 需要开启`isRadioEchoLabel`（默认是开启），设置`radioSelectValLabel`，使用场景：切换分页选中提交，点击编辑时，无法回显不是第一页的数据；需要后台返回对应的`valueCustom`及`labelCustom`，将编辑时返回是`labelCustom`赋值给`radioSelectValLabel`即可，若想要实现选中效果，需要在切换分页时，动态遍历当前页数据是否存在`radioSelectValLabel`,存在则将其对应的`valueCustom` 赋值给`v-model`即可。`注意：只能是单选分页`
TSelect/radioSelectValLabel
:::

### 单选禁用

:::demo 在组件中数据源：`optionSource` 不满足条件时，新增`disabled`属性，设置为`true`即可
TSelect/singleDisabled
:::

### 多选禁用

:::demo 在组件中数据源：`optionSource` 不满足条件时，新增`disabled`属性，设置为`true`即可
TSelect/multipleDisabled
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

:::demo 在组件中配置：`isShowPagination` 及 `paginationOption`；**`多选不支持翻页选中功能`**，`isCached`属性，默认`true`开启缓存，切换分页后会把上一页选中的数据，追加在当前页的数据中。
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

### 选中值返回对象<el-tag>1.4.14</el-tag>
:::demo 在组件中配置：`returnObject` ；必须设置 `value-key` 属性且具有唯一性。支持多选
TSelect/returnObject
:::

### TSelect Attributes

---

### 1、代码示例

```html
<t-select
  v-model="selectVlaue"
  :optionSource="state.stepList"
/>
```

### 2、配置参数（Attributes）继承 el-select&el-select-v2 Attributes

| 参数                                      | 说明                                             | 类型                            | 默认值  |
| :---------------------------------------- | :----------------------------------------------- | :------------------------------ | :------ |
| v-model                                   | 绑定值                                           | boolean / string / number/Array | 无      |
| multiple                                  | 是否多选                                         | Boolean                         | false   |
| optionSource                              | 下拉数据源                                       | Array                           | 无      |
| customLabel                               | 是否自定义设置下拉 label                         | String                          | -       |
| valueCustom                               | 传入的 option 数组中，要作为最终选择项的键值 key | String                          | 'key'   |
| labelCustom                               | 传入的 option 数组中，要作为显示项的键值名称     | String                          | 'label' |
| useVirtual                                | 是否开启虚拟列表(继承 el-select-v2 属性)         | Boolean                         | false   |
| isShowPagination                          | 是否开启分页                                     | Boolean                         | false   |
| paginationOption                          | 分页配置                                         | Object                          | -       |
| returnObject<el-tag>1.4.14</el-tag>       | 选中值是否返回对象必须设置`value-key`            | Boolean                         | false   |
| isCached<el-tag>1.5.1</el-tag>            | 分页是否开启缓存选中项                           | Boolean                         | true    |
| isRadioEchoLabel<el-tag>1.5.2</el-tag>    | 是否开启回显不是第一页数据的label                | Boolean                         | true    |
| radioSelectValLabel<el-tag>1.5.2</el-tag> | 回显不是第一页数据label的绑定值                  | String                          | ''      |

### 2-1、paginationOption 配置参数（Attributes）继承 el-pagination Attributes

| 参数        | 说明                                                          | 类型   | 默认值                             |
| :---------- | :------------------------------------------------------------ | :----- | :--------------------------------- |
| currentPage | 当前页数                                                      | number | 1                                  |
| pageSize    | 每页显示条目个数                                              | number | 6                                  |
| pagerCount  | 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠 | number | 5                                  |
| total       | 总条目数                                                      | number | 0                                  |
| layout      | 组件布局，子组件名用逗号分隔                                  | string | 'total, prev, pager, next, jumper' |
| bind        | el-pagination 属性                                            | Object | -                                  |

### 3、继承 el-select&el-pagination&el-select-v2 events

| 事件名       | 说明                 | 回调参数     |
| :----------- | :------------------- | :----------- |
| change       | 选中值发生变化时触发 | 返回选中的值 |
| input        | 分页器输入框触发     | 返回输入的值 |
| select-input | 选择输入框触发       | 返回输入的值 |

### Exposes（Method）

| Method                       | 说明       |
| :--------------------------- | :--------- |
| clear<el-tag>v1.5.1</el-tag> | 重置选中项 |
