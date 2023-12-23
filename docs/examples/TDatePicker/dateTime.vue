<template>
  <t-layout-page class="dateTime">
    <t-layout-page-item>
      <div class="box_content">
        <div class="box_flex">
          <div>选择日期&时间范围</div>
          <t-date-picker
            v-model="date"
            type="datetimerange"
            @change="change($event, 'datetimerange', date)"
          />
        </div>
        <div class="box_flex">
          <div>快捷方式-选择日期&时间范围</div>
          <t-date-picker
            v-model="date1"
            type="datetimerange"
            isPickerOptions
            @change="change($event, 'datetimerange', date1)"
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
            @change="change($event, 'datetimerange', date2)"
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
  console.log(`v-model绑定的值是：`, value)
}
</script>
<style lang="scss" scoped>
.dateTime {
  .t_layout_page_item {
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
  }
}
</style>
