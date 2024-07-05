<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="某列render渲染"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { ref } from "vue"
import TVHtml from "./com/TVHtml.vue"
const table = ref({
  // 接口返回数据
  data: [
    {
      id: "1",
      date: "2019-09-25",
      date1: "2019-09-26",
      name: "张三",
      vhtml: '<span style="color:red">红色</span>',
      tags: [
        { type: "success", name: "标签1" },
        { type: "info", name: "标签2" },
        { type: "warning", name: "标签3" }
      ],
      status: "2",
      address: "广东省广州市天河区"
    },
    {
      id: "2",
      date: "2019-09-26",
      date1: "2019-09-27",
      name: "张三1",
      vhtml: '<span style="color:green">绿色</span>',
      tags: [
        { type: "danger", name: "标签4" },
        { type: "info", name: "标签5" }
      ],
      status: "1",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    },
    {
      id: "3",
      date: "2019-09-26",
      date1: "2019-09-28",
      vhtml: '<span style="color:blue">蓝色</span>',
      tags: [
        { type: "warning", name: "标签6" },
        { type: "success", name: "标签7" }
      ],
      name: "张三1",
      status: "3",
      address: "广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2"
    }
  ],
  // 表头数据
  columns: [
    { prop: "name", label: "姓名", minWidth: "100" },

    {
      prop: "status",
      label: "render方式",
      minWidth: "220",
      renderHeader: () => {
        return <span style="color:red">render方式</span>
      },
      render: val => {
        let label = ""
        let type = ""
        switch (val) {
          case "1":
            type = "info"
            label = "待办"
            break
          case "2":
            type = "warning"
            label = "待提交"
            break
          case "3":
            type = "success"
            label = "完成"
            break
        }
        return <el-tag type={type}>{label}</el-tag>
      }
    },
    {
      prop: "vhtml",
      label: "自定义组件渲染",
      renderHeader: () => {
        return <span style="color:red">自定义组件render渲染</span>
      },
      minWidth: "220",
      render: text => {
        return <t-v-html html={text} />
      }
    },
    {
      prop: "tags",
      label: "render for循环渲染",
      renderHeader: () => {
        return <span style="color:red">render for循环渲染</span>
      },
      minWidth: "180",
      render: (text, record) => {
        return (
          <div>
            {record.tags.map(item => {
              return (
                <el-tag style="margin:0 2px;" type={item.type}>
                  {item.name}
                </el-tag>
              )
            })}
          </div>
        )
      }
    },
    { prop: "date", label: "日期", minWidth: "180" },
    {
      prop: "address",
      label: "地址",
      minWidth: "220"
    }
  ]
})
</script>
