<template>
  <t-layout-page class="dateRange">
    <t-layout-page-item>
      <div class="box_content">
        <div class="box_flex">
          <div>选择日期范围（默认显示）</div>
          <t-date-picker
            v-model="date"
            type="daterange"
            @change="change($event, 'daterange', date)"
          />
        </div>
        <div class="box_flex">
          <div>选择日期范围加00:00:00 23:59:59时分秒</div>
          <t-date-picker
            v-model="date1"
            type="daterange"
            plusTime
            @change="change($event, 'daterange', date1)"
          />
        </div>
        <div class="box_flex">
          <div>快捷方式-选择日期范围</div>
          <t-date-picker
            v-model="date2"
            type="daterange"
            isPickerOptions
            @change="change($event, 'daterange', date2)"
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
.dateRange {
  .t_layout_page_item {
    margin: 0;
    padding: 0;
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
