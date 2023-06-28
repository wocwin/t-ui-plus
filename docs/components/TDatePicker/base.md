# 日期组件

---

### 单个日期输出

::: demo
TDatePicker/singleDate
:::

### 日期范围选择

::: demo
TDatePicker/dateRange
:::

### 月份范围选择

::: demo
TDatePicker/month
:::

### 日期&时间范围选择

::: demo
TDatePicker/dateTime
:::

### 插槽使用及自定义日期面板

::: demo
TDatePicker/slotCustomize
:::

### TDatePicker 参数配置

### 简介：基于 Element-plus DatePicker DateTimePicker 组件的二次封装，取决于 type 值

> TDatePicker 日期组件 **代码示例：**

```html
<t-date-picker v-model="date" />
```

### Attributes 继承 DatePicker DateTimePicker 的 Attributes

| 参数            | 说明                                               | 类型                                            | 默认值 |
| :-------------- | :------------------------------------------------- | :---------------------------------------------- | :----- |
| v-model         | 绑定值                                             | [String, Date, Array]                           | -      |
| plusTime        | 日期范围是否显示 00:00:00 23:59:59 时分秒          | Boolean                                         | false  |
| type            | 时间类型（继承 element DatePicker DateTimePicker） | String                                          | date   |
| shortcuts       | 设置快捷选项，需要传入数组对象                     | Array<{ text: string, value: Date & Function }> | -      |
| isPickerOptions | 是否开启自带快捷方式                               | Boolean                                         | false  |

### type 类型

> week 周；month 月；year 年；dates 多个日期；months 多个月；years 多个年；daterange 日期范围；monthrange 月份范围;datetime 日期和时间点;datetimerange 日期和时间点范围

### events

| 事件名 | 说明                   | 返回值                                               |
| :----- | :--------------------- | :--------------------------------------------------- |
| change | 用户确认选定的值时触发 | 组件绑定值。格式与绑定值一致，可受 value-format 控制 |

### Slots

| 事件名          | 说明                 |
| :-------------- | :------------------- |
| default         | 自定义内容           |
| range-separator | 自定义范围分割符内容 |
