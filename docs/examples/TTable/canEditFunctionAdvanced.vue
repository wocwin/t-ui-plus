<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        :table="table"
        :columns="columns"
        @selection-change="selectionChange"
        :isShowPagination="false"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"

// 当前选中的行
const selectRow = ref<any[]>([])

// 处理复选框事件
const selectionChange = (row: any) => {
  selectRow.value = row
}

const table = reactive({
  firstColumn: { type: "selection", fixed: true },
  data: [
    {
      name: "张三",
      age: 25,
      address: "北京市朝阳区",
      status: "在职",
      salary: 8000,
      remark: "测试备注1"
    },
    {
      name: "李四",
      age: 30,
      address: "上海市浦东新区",
      status: "在职",
      salary: 12000,
      remark: "测试备注2"
    },
    {
      name: "王五",
      age: 28,
      address: "广州市天河区",
      status: "离职",
      salary: 9000,
      remark: "测试备注3"
    },
    {
      name: "赵六",
      age: 35,
      address: "深圳市南山区",
      status: "在职",
      salary: 15000,
      remark: "测试备注4"
    }
  ]
})

const columns = ref([
  {
    prop: "name",
    label: "姓名",
    minWidth: 120
  },
  {
    prop: "age",
    label: "年龄",
    minWidth: 180,
    // 场景1: 当选中某行时开启编辑
    canEdit: (scope: any) => {
      return selectRow.value.some((item: any) => item === scope.row)
    },
    configEdit: {
      label: "请输入年龄",
      editComponent: "el-input-number",
      bind: {
        min: 1,
        max: 100
      }
    }
  },
  {
    prop: "address",
    label: "地址",
    minWidth: 200,
    // 场景1: 当选中某行时开启编辑
    canEdit: (scope: any) => {
      return selectRow.value.some((item: any) => item === scope.row)
    },
    configEdit: {
      label: "请输入地址",
      editComponent: "el-input"
    }
  },
  {
    prop: "status",
    label: "状态",
    minWidth: 120
  },
  {
    prop: "salary",
    label: "工资",
    minWidth: 180,
    // 场景2: 根据行数据的某个字段值判断是否可编辑
    canEdit: (scope: any) => {
      return scope.row.status === "在职"
    },
    configEdit: {
      label: "请输入工资",
      editComponent: "el-input-number",
      bind: {
        min: 0,
        step: 1000
      }
    }
  },
  {
    prop: "remark",
    label: "备注",
    minWidth: 240,
    // 场景3: 根据行数据的多个条件判断是否可编辑
    canEdit: (scope: any) => {
      return scope.row.age > 30
    },
    configEdit: {
      label: "请输入备注",
      editComponent: "el-input",
      bind: {
        type: "textarea",
        rows: 2
      }
    }
  }
])
</script>
