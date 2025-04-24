<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-select
        placeholder="单选--回显不是第一页的label"
        v-model="selectVlaue"
        :radioSelectValLabel="inputValue"
        :optionSource="stepList"
        labelCustom="materialName"
        valueCustom="id"
        @current-change="currentChange"
        @change="selectChange"
        @input="selectinput"
        @select-input="selectinput1"
        isShowPagination
        :paginationOption="paginationOption"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts" name="Pagination">
import { onMounted, ref } from "vue"
import data from "./data.json"
import data1 from "./data1.json"
const selectVlaue = ref<any>()
const inputValue = ref<any>("石墨UHP450*2250-11（450*2550 UHP)")
const stepList = ref([])
const paginationOption = ref({
  pageSize: 6, // 每页显示条数
  currentPage: 1, // 当前页
  pagerCount: 7, // 按钮数，超过时会折叠
  total: 0 // 总条数
})
const selectinput = (val: any) => {
  console.log("分页器-input", val)
}
const selectinput1 = (val: any) => {
  console.log("select-input", val)
}
onMounted(() => {
  getList(1)
})
const getList = async pageNum => {
  let res
  if (pageNum === 1) {
    res = await data
  } else {
    res = await data1
  }
  if (res.success) {
    stepList.value = res.data.records
    paginationOption.value.total = res.data.total
    // 回显label选中效果
    stepList.value.forEach((item: any) => {
      if (item.materialName === inputValue.value) {
        selectVlaue.value = item.id
        console.log("回显label选中效果-333", item.materialName, selectVlaue.value)
      }
    })
    // console.log('获取数据', paginationOption.value)
  }
}
// 切换分页
const currentChange = (val: any) => {
  console.log("切换分页current-change事件", val)
  getList(val)
}
const selectChange = (val: any) => {
  console.log(`change返回值${val};v-model值${selectVlaue.value}`)
}
</script>
