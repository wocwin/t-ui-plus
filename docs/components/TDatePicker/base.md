# 日期组件

---

### 单个日期输出

::: demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <el-radio-group v-model="size" label="size control" size="small">
        <el-radio-button label="large">large</el-radio-button>
        <el-radio-button label="default">default</el-radio-button>
        <el-radio-button label="small">small</el-radio-button>
      </el-radio-group>
      <div class="box_content">
        <div class="box_flex">
          <div>选择日期</div>
          <t-date-picker
            v-model="date"
            :size="size"
            @change="change($event, 'date', 'date')"
          />
        </div>
        <div class="box_flex">
          <div>选择周</div>
          <t-date-picker
            v-model="date1"
            :size="size"
            type="week"
            @change="change($event, 'week', 'date1')"
          />
        </div>
        <div class="box_flex">
          <div>选择月</div>
          <t-date-picker
            v-model="date2"
            :size="size"
            type="month"
            @change="change($event, 'month', 'date2')"
          />
        </div>
        <div class="box_flex">
          <div>选择年</div>
          <t-date-picker
            v-model="date3"
            :size="size"
            type="year"
            @change="change($event, 'year', 'date3')"
          />
        </div>
        <div class="box_flex">
          <div>选择日期-快捷方式</div>
          <t-date-picker
            v-model="date4"
            :size="size"
            isPickerOptions
            @change="change($event, 'date', 'date4')"
          />
        </div>
        <div class="box_flex">
          <div>选择日期&时间</div>
          <t-date-picker
            v-model="date5"
            type="datetime"
            @change="change($event, 'datetime', 'date5')"
          />
        </div>
        <div class="box_flex">
          <div>快捷方式-选择日期&时间</div>
          <t-date-picker
            v-model="date6"
            type="datetime"
            isPickerOptions
            @change="change($event, 'datetime', 'date6')"
          />
        </div>
      </div>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const size = ref('default')
const date = ref()
const date1 = ref()
const date2 = ref()
const date3 = ref()
const date4 = ref()
const date5 = ref()
const date6 = ref()

const typeTxt = {
  date: '日期',
  week: '周',
  month: '月',
  year: '年',
  daterange: '日期范围',
  monthrange: '月份范围',
  datetime: '日期&时间',
  datetimerange: '日期和时间点范围',
}

const change = (event, type, value) => {
  console.log(`change选择${typeTxt[type]}返回值是：`, event)
  console.log(`v-model绑定的值是：`, eval(value).value)
}
</script>
<style lang="scss" scoped>
.box_content {
  display: flex;
  padding: 10px;
  border: 1px dashed #ccc;
  margin-top: 10px;
  flex-wrap: wrap;
}
.box_flex {
  display: flex;
  flex-direction: column;
  margin-right: 5px;
}
</style>
```

:::

### 日期范围选择

::: demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <div class="box_content">
        <div class="box_flex">
          <div>选择日期范围（默认显示）</div>
          <t-date-picker
            v-model="date"
            type="daterange"
            @change="change($event, 'daterange', 'date')"
          />
        </div>
        <div class="box_flex">
          <div>选择日期范围加00:00:00 23:59:59时分秒</div>
          <t-date-picker
            v-model="date1"
            type="daterange"
            plusTime
            @change="change($event, 'daterange', 'date1')"
          />
        </div>
        <div class="box_flex">
          <div>快捷方式-选择日期范围</div>
          <t-date-picker
            v-model="date2"
            type="daterange"
            isPickerOptions
            @change="change($event, 'daterange', 'date2')"
          />
        </div>
      </div>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const date = ref()
const date1 = ref()
const date2 = ref()

const typeTxt = {
  date: '日期',
  week: '周',
  month: '月',
  year: '年',
  daterange: '日期范围',
  monthrange: '月份范围',
  datetime: '日期&时间',
  datetimerange: '日期和时间点范围',
}

const change = (event, type, value) => {
  console.log(`change选择${typeTxt[type]}返回值是：`, event)
  console.log(`v-model绑定的值是：`, eval(value).value)
}
</script>
<style lang="scss" scoped>
.box_content {
  display: flex;
  padding: 10px;
  border: 1px dashed #ccc;
  margin-top: 10px;
  flex-wrap: wrap;
}
.box_flex {
  display: flex;
  flex-direction: column;
  margin-right: 5px;
}
</style>
```

:::

### 月份范围选择

::: demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <div class="box_content">
        <div class="box_flex">
          <div>选择月份范围</div>
          <t-date-picker
            v-model="date"
            type="monthrange"
            @change="change($event, 'monthrange', 'date')"
          />
        </div>
        <div class="box_flex">
          <div>快捷方式-选择月份范围</div>
          <t-date-picker
            v-model="date1"
            type="monthrange"
            isPickerOptions
            @change="change($event, 'monthrange', 'date1')"
          />
        </div>
      </div>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const date = ref()
const date1 = ref()

const typeTxt = {
  date: '日期',
  week: '周',
  month: '月',
  year: '年',
  daterange: '日期范围',
  monthrange: '月份范围',
  datetime: '日期&时间',
  datetimerange: '日期和时间点范围',
}

const change = (event, type, value) => {
  console.log(`change选择${typeTxt[type]}返回值是：`, event)
  console.log(`v-model绑定的值是：`, eval(value).value)
}
</script>
<style lang="scss" scoped>
.box_content {
  display: flex;
  padding: 10px;
  border: 1px dashed #ccc;
  margin-top: 10px;
  flex-wrap: wrap;
}
.box_flex {
  display: flex;
  flex-direction: column;
  margin-right: 5px;
}
</style>
```

:::

### 日期&时间范围选择

::: demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <div class="box_content">
        <div class="box_flex">
          <div>选择日期&时间范围</div>
          <t-date-picker
            v-model="date"
            type="datetimerange"
            @change="change($event, 'datetimerange', 'date')"
          />
        </div>
        <div class="box_flex">
          <div>快捷方式-选择日期&时间范围</div>
          <t-date-picker
            v-model="date1"
            type="datetimerange"
            isPickerOptions
            @change="change($event, 'datetimerange', 'date1')"
          />
        </div>
        <div class="box_flex">
          <div>选择日期&时间范围--默认时间设置及自定义分隔符号</div>
          <t-date-picker
            v-model="date2"
            type="datetimerange"
            range-separator="To"
            :default-time="[
              new Date(2000, 1, 1, 12, 0, 0),
              new Date(2000, 2, 1, 23, 59, 59),
            ]"
            @change="change($event, 'datetimerange', 'date2')"
          />
        </div>
      </div>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const date = ref()
const date1 = ref()
const date2 = ref()

const typeTxt = {
  date: '日期',
  week: '周',
  month: '月',
  year: '年',
  daterange: '日期范围',
  monthrange: '月份范围',
  datetime: '日期&时间',
  datetimerange: '日期和时间点范围',
}

const change = (event, type, value) => {
  console.log(`change选择${typeTxt[type]}返回值是：`, event)
  console.log(`v-model绑定的值是：`, eval(value).value)
}
</script>
<style lang="scss" scoped>
.box_content {
  display: flex;
  padding: 10px;
  border: 1px dashed #ccc;
  margin-top: 10px;
  flex-wrap: wrap;
}
.box_flex {
  display: flex;
  flex-direction: column;
  margin-right: 5px;
}
</style>
```

:::

### 插槽使用及自定义日期面板

::: demo

```vue
<template>
  <t-layout-page>
    <t-layout-page-item>
      <div class="box_content">
        <div class="box_flex">
          <div>插槽使用及自定义日期面板</div>
          <t-date-picker v-model="date" @change="change">
            <template #default="cell">
              <div class="cell_slot" :class="{ current: cell.isCurrent }">
                <span class="customize_text">{{ cell.text }}</span>
                <span v-if="isHoliday(cell)" class="slot_holiday" />
              </div>
            </template>
          </t-date-picker>
        </div>
      </div>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const date = ref()
//获取今天日期
const myDate = new Date()
myDate.setDate(myDate.getDate() - 7)
let holidays = []
let dateTemp
var flag = 1
for (var i = 0; i < 7; i++) {
  dateTemp = `${myDate.getFullYear()}-${
    myDate.getMonth() + 1 > 9
      ? myDate.getMonth() + 1
      : '0' + (myDate.getMonth() + 1)
  }-${myDate.getDate() > 9 ? myDate.getDate() : '0' + myDate.getDate()}`
  holidays.push(dateTemp)
  myDate.setDate(myDate.getDate() + flag)
}
const isHoliday = ({ dayjs }) => {
  return holidays.includes(dayjs.format('YYYY-MM-DD'))
}
const change = (event) => {
  console.log(`change事件返回值是：`, event)
  console.log(`v-model绑定的值是：`, date.value)
}
</script>
<style lang="scss">
.box_content {
  display: flex;
  padding: 10px;
  border: 1px dashed #ccc;
  margin-top: 10px;
  flex-wrap: wrap;
}
.box_flex {
  display: flex;
  flex-direction: column;
  margin-right: 5px;
}
.cell_slot {
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;
}
.cell_slot.current .customize_text {
  background: #626aef;
  color: #fff;
}
.customize_text {
  width: 24px;
  height: 24px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
}
.slot_holiday {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--el-color-danger);
  border-radius: 50%;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
```

:::

### TDatePicker 参数配置

#### 简介：基于 Element-plus DatePicker DateTimePicker 组件的二次封装，取决于 type 值

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
