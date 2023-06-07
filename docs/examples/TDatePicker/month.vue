<template>
  <t-layout-page class="month">
    <t-layout-page-item>
      <div class="box_content">
        <div class="box_flex">
          <div>选择月份范围</div>
          <t-date-picker
            v-model="date"
            type="monthrange"
            @change="change($event, 'monthrange', date)"
          />
        </div>
        <div class="box_flex">
          <div>快捷方式-选择月份范围</div>
          <t-date-picker
            v-model="date1"
            type="monthrange"
            isPickerOptions
            @change="change($event, 'monthrange', date1)"
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
  console.log(`v-model绑定的值是：`, value)
}
</script>
<style lang="scss" scoped>
.month {
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
