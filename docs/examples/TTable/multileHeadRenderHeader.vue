<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="多级表头--自定义表头"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { ref } from "vue"
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
    {
      prop: "name",
      label: "姓名",
      minWidth: "100",
      renderHeader: col => {
        return (
          <el-checkbox
            style="width:100%;display:flex;align-items:center;justify-content:center;"
            value={col.check}
            onChange={value => handleCheckboxChange(value, col)}
          >
            <span style="font-size:13px;font-weight: 700;color:red;">{col.label}</span>
          </el-checkbox>
        )
      },
      children: [
        {
          prop: "name",
          label: "姓名",
          minWidth: "100",
          children: [
            {
              prop: "type",
              label: "类型",
              minWidth: "100",
              renderHeader: col => {
                return (
                  <el-checkbox
                    style="width:100%;display:flex;align-items:center;justify-content:center;"
                    value={col.check}
                    onChange={value => handleCheckboxChange(value, col)}
                  >
                    <span style="font-size:13px;font-weight: 700;color:red;">{col.label}</span>
                  </el-checkbox>
                )
              },
              children: [{ prop: "date1", label: "日期2552", minWidth: "180" }]
            }
          ]
        },
        {
          prop: "type",
          label: "表头合并1",
          minWidth: "100",
          children: [
            {
              prop: "type",
              label: "类型",
              minWidth: "100",
              children: [
                {
                  prop: "address",
                  label: "地址换行",
                  minWidth: "180",
                  bind: {
                    "show-overflow-tooltip": false
                  }
                }
              ]
            }
          ]
        },
        { prop: "name", label: "姓名", minWidth: "100" },
        {
          prop: "date",
          label: "表头合并2",
          minWidth: "180",
          children: [
            { prop: "status", label: "类型", minWidth: "100" },
            {
              prop: "date",
              label: "日期",
              minWidth: "180",
              children: [{ prop: "date1", label: "日期22", minWidth: "180" }]
            }
          ]
        }
      ]
    },
    {
      prop: "name",
      label: "姓名22",
      minWidth: "100",
      children: [
        {
          prop: "date1",
          label: "formatter格式化",
          minWidth: "100",
          formatter: (row, column, cellValue) => {
            // console.log("formatter--合并表头", row, column, cellValue)
            return "3333"
          }
        }
      ]
    },
    {
      prop: "type",
      label: "表头合并1",
      minWidth: "100",
      children: [
        {
          prop: "type",
          label: "类型",
          minWidth: "100",
          children: [{ prop: "date1", label: "日期2552", minWidth: "180" }]
        }
      ]
    },
    { prop: "name", label: "姓名", minWidth: "100" },
    {
      prop: "date",
      label: "表头合并2",
      minWidth: "180",
      children: [
        { prop: "address", label: "地址22", minWidth: "160" },
        {
          prop: "date",
          label: "日期",
          minWidth: "180",
          children: [{ prop: "date1", label: "日期22", minWidth: "180" }]
        }
      ]
    },
    { prop: "address", label: "地址", minWidth: "220" },
    { prop: "date1", label: "日期", minWidth: "180" }
  ]
})
const handleCheckboxChange = (val, col) => {
  console.log("handleCheckboxChange", val, col)
}
</script>
