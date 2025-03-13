<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="操作列-显示更多"
        ref="selectionTable"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
      >
        <template #toolbar>
          <el-button size="default" type="primary" @click="add">新增</el-button>
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { reactive, ref } from "vue"
const viewDetail = val => {
  console.log("viewDetail", val)
}
const edit = val => {
  console.log("edit", val)
}
const nullify = val => {
  console.log("nullify", val)
}
const del = val => {
  console.log("del", val)
}
// 获取ref
const selectionTable = ref<any>(null)
let table = reactive<TableTypes.Table>({
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
      status: "3",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    },
    {
      id: "4",
      date: "2019-09-26",
      date1: "2019-09-29",
      name: "张三1",
      status: "2",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    }
  ],
  // 表头数据
  columns: [
    { prop: "name", label: "姓名", width: "120" },
    { prop: "date", label: "日期", width: "180" },
    {
      prop: "status",
      label: "状态",
      width: "100"
    },
    { prop: "date1", label: "日期22", width: "180" },
    {
      prop: "address",
      label: "地址",
      width: "220"
    }
  ],
  // 表格内操作列
  operator: [
    {
      text: "查看",
      fun: viewDetail
    },
    {
      text: "编辑",
      fun: edit,
      isDisabled: row => {
        return row.status === "3"
      }
    },
    {
      text: "作废",
      fun: nullify,
      isMore: true
    },
    {
      text: "删除",
      fun: del,
      isMore: true,
      itemBind: { divided: true },
      bind: { type: "danger", icon: "Delete" },
      isDisabled: row => {
        return row.status == "2"
      }
    }
  ],
  // 操作列样式
  operatorConfig: {
    dropdownBind: { trigger: "click", btnBind: { type: "danger" } }, // 下拉按钮样式
    fixed: "right", // 固定列表右边（left则固定在左边）
    width: 140,
    label: "操作"
  }
})
// 新增按钮
const add = () => {
  console.log("add按钮")
  table.data.push({
    id: "3",
    date: "2019-09-26",
    date1: "2019-09-28",
    name: "push新增",
    status: "1",
    address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
  })
}
</script>
