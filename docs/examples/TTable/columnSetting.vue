<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="动态显示隐藏列且可以拖动排序"
        :table="table"
        name="Vuepress2Docs"
        columnSetting
        ref="tableColumnSetRef"
        :columns="table.columns"
        :isShowPagination="false"
        :columnSetBind="{
          btnTxt: '列设置22',
          title: '随便取一个title',
          type: 'primary',
          icon: 'Edit'
        }"
      >
        <template #toolbar>
          <el-tooltip
            content="不建议使用此功能；手动修改localStorage数据调用此方法来更新列设置下拉数据"
            placement="top"
          >
            <t-button @click="restColumnSet" type="danger">更新缓存数据</t-button>
          </el-tooltip>
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref } from "vue"
const tableColumnSetRef = ref<any>(null)
let table = ref<TableTypes.Table>({
  // 接口返回数据
  data: [
    {
      id: "1",
      date: "2019-09-25",
      date1: "2019-09-26",
      name: "张三",
      status: "2",
      address: "广东省广州市天河区"
    },
    {
      id: "2",
      date: "2019-09-26",
      date1: "2019-09-27",
      name: "张三1",
      status: "1",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    },
    {
      id: "3",
      date: "2019-09-26",
      date1: "2019-09-28",
      name: "张三1",
      status: "1",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    },
    {
      id: "4",
      date: "2019-09-26",
      date1: "2019-09-29",
      name: "张三1",
      status: "1",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    }
  ],
  // 表头数据
  columns: [
    { prop: "name", label: "姓名", minWidth: "100" },
    { prop: "date", label: "日期", minWidth: "180" },
    { prop: "status", label: "状态", minWidth: "80", isShowHidden: true },
    { prop: "address", label: "地址", minWidth: "220" }
  ]
})
const restColumnSet = () => {
  console.log("restColumnSet---", tableColumnSetRef.value)
  tableColumnSetRef.value.reSetColumnSet()
}
</script>
