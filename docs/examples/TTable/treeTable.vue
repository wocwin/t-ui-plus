<template>
  <t-layout-page class="dept_mange">
    <t-layout-page-item>
      <t-table
        title="部门管理列表"
        isCopy
        isTree
        :table="state.table"
        :columns="state.table.columns"
        row-key="deptId"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :isShowPagination="false"
      >
        <template #toolbar>
          <el-button type="primary">新增</el-button>
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { onMounted, reactive } from 'vue'
import deptData from './dept.json'
const handleDelete = (row: any) => {
  console.log('点击删除', row)
}
const state: any = reactive({
  table: {
    // 接口返回数据
    data: [],
    // 表头数据
    columns: [
      { prop: 'deptName', label: '部门名称', minWidth: 180, align: 'left' },
      { prop: 'deptNum', label: '部门编码', minWidth: 80, align: 'left' },
      { prop: 'orderNum', label: '排序', minWidth: 60, align: 'left' },
      { prop: 'createTime', label: '创建时间', minWidth: 160, align: 'left' },
      {
        prop: 'status',
        label: '状态',
        minWidth: 120,
        render: (text: any, row: any) => {
          return (
            <el-switch
              active-value={true}
              v-model={row.status}
              inactive-value={false}
              onChange={() => handleStatusChange(row)}
            ></el-switch>
          )
        },
      },
    ],
    operator: [
      {
        text: '编辑',
        // fun: edit
      },
      {
        text: '删除',
        fun: handleDelete,
      },
    ],
    // 操作列样式
    operatorConfig: {
      fixed: 'right', // 固定列表右边（left则固定在左边）
      align: 'left',
      width: '160',
      label: '操作',
    },
  },
})

const handleStatusChange = (row: any) => {
  console.log('点击状态', row)
}
/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
const handleTree = (
  data: any,
  id: string,
  parentId: string = 'parentId',
  children: string = 'children',
  rootId: number = 0
) => {
  id = id || 'id'
  parentId = parentId || 'parentId'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children = children || 'children'
  rootId = rootId || 0
  //对源数据深度克隆
  const cloneData = JSON.parse(JSON.stringify(data))
  //循环所有项
  const treeData = cloneData.filter(
    (father: { [x: string]: any; children: any }) => {
      let branchArr = cloneData.filter((child: { [x: string]: any }) => {
        //返回每一项的子级数组
        return father[id] === child[parentId]
      })
      branchArr.length > 0 ? (father.children = branchArr) : ''
      //返回第一层
      return father[parentId] === rootId
    }
  )
  return treeData != '' ? treeData : data
}
onMounted(() => {
  getData()
})
// 获取菜单数据
const getData = async () => {
  const res = await deptData
  if (res.success) {
    state.table.data = handleTree(res.data, 'deptId')
  }
}
</script>
