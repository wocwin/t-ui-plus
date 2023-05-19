<template>
  <t-layout-page class="slotCustomize">
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
let dateTemp = ''
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
.slotCustomize {
  .t_layout_page_item {
    margin: 0 !important;
    padding: 0 !important;
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
