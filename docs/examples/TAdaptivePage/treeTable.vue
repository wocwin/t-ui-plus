<template>
  <t-adaptive-page
    class="tree_table_demo"
    title="treeTable列表"
    row-key="path"
    isTree
    :table="state.table"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    :columns="state.table.columns"
    :isShowPagination="false"
    :opts="opts"
    align="left"
    :key="isKey"
    ref="TreeTableRef"
    :default-expand-all="isExpandAll"
    @submit="conditionEnter"
    @selection-change="selectionChange"
  >
    <!-- <template #title> -->
    <el-alert :closable="false" type="success">
      <template #title>
        <div style="display: flex; align-items: center">
          <div>{{ state.ids.length ? `已选择${state.ids.length}条数据` : "未选中任何记录" }}</div>
          <el-button
            style="margin-left: 10px"
            type="primary"
            link
            :disabled="state.ids.length < 1"
            @click="cancelSelect"
            >取消</el-button
          >
        </div>
      </template>
    </el-alert>
    <!-- </template> -->
    <template #toolbar>
      <el-button
        size="default"
        type="danger"
        @click="toggleSelection([state.table.data[1], state.table.data[2]])"
        >{{ !isSelectRow ? "点击选中" : "点击取消" }}第二第三项</el-button
      >
      <el-button size="default" type="primary" @click="expandAll"
        >全部{{ !isExpandAll ? "展开" : "收起" }}</el-button
      >
      <el-button size="default" type="primary" @click="expandRow(6, true)">展开第七行</el-button>
      <el-button size="default" type="primary" @click="expandRow(6, false)">收起第七行</el-button>
    </template>
  </t-adaptive-page>
</template>

<script setup lang="tsx" name="treeTableDemo">
import { computed, onMounted, reactive, ref, toRefs } from "vue"
import menuData from "./menu.json"
const TreeTableRef: any = ref<HTMLElement | null>(null)
// 选择复选框
const selectionChange = (val: any) => {
  console.log("选择复选框", val)
  state.ids = val
}
// 是否全部展开
const isExpandAll = ref(false)
const isKey = ref(false)
const expandAll = () => {
  // console.log("全部展开", isExpandAll.value);
  isKey.value = !isKey.value
  isExpandAll.value = !isExpandAll.value
}
// 展开或收起第七行
const expandRow = (index: number, isExpand: boolean) => {
  const row = state.table.data[index]
  if (row) {
    TreeTableRef.value.toggleRowExpansion(row, isExpand)
  }
}
const isSelectRow = ref(false)
// 点击选中第二第三项
const toggleSelection = (rows?: any) => {
  isSelectRow.value = !isSelectRow.value
  if (rows) {
    rows.forEach(row => {
      TreeTableRef.value?.toggleRowSelection(row, isSelectRow.value)
      TreeTableRef.value?.toggleRowExpansion(row, isSelectRow.value)
    })
  }
}
const edit = (row: any) => {
  console.log("编辑", row)
}
const handleAdd = (row: any) => {
  console.log("表格内新增", row)
}
// 取消选中
const cancelSelect = () => {
  console.log("取消选中", TreeTableRef.value)
  if (state.ids.length > 0) {
    console.log("取消选中222", TreeTableRef.value)
    TreeTableRef.value.clearSelection()
  }
}
const state: any = reactive({
  ids: [],
  queryData: {
    title: null, // 菜单名称
    path: null // 菜单路径
  },
  table: {
    data: [],
    firstColumn: { type: "selection", fixed: true },
    columns: [
      {
        label: "菜单名称",
        render: (text: any, row: any) => {
          return <div>{row.meta.title}</div>
        },
        minWidth: 180
      },
      {
        label: "菜单图标",
        render: (text: any, row: any) => {
          return <t-icon icon={row.meta.icon}></t-icon>
        },
        minWidth: 80
      },
      { prop: "name", label: "菜单 name", minWidth: 180 },
      { prop: "path", label: "菜单路径", minWidth: 180 },
      { prop: "component", label: "组件路径", minWidth: 180 }
    ],
    operator: [
      {
        text: "新增",
        fun: handleAdd
      },
      {
        text: "编辑",
        fun: edit
      }
    ],
    // 操作列样式
    operatorConfig: {
      fixed: "right", // 固定列表右边（left则固定在左边）
      align: "left",
      width: "160",
      label: "操作"
    }
  }
})

const opts = computed(() => {
  return {
    title: {
      label: "菜单名称",
      comp: "el-input"
    },
    path: {
      label: "菜单路径",
      comp: "el-input"
    }
  }
})
// 最终参数获取
const getQueryData = computed(() => {
  const { title, path } = toRefs(state.queryData)
  return {
    title: title.value,
    path: path.value
  }
})
// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data)
  state.queryData = data
  console.log("最终参数", getQueryData.value)
}
onMounted(() => {
  getMenuData()
})
// 获取菜单数据
const getMenuData = async () => {
  const res = await menuData
  // console.log(999, res);
  if (res.success) {
    state.table.data = res.data
  }
}
</script>
