<template>
  <t-layout-page class="dept_mange">
    <t-layout-page-item>
      <t-table
        title="菜单管理"
        ref="TreeTable"
        isCopy
        isTree
        :default-expand-all="defaultExpandAll"
        :table="state.table"
        :columns="state.table.columns"
        row-key="menuId"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :isShowPagination="false"
        @selection-change="selectionChange"
      >
        <template #toolbar>
          <el-button
            size="default"
            type="primary"
            :disabled="state.ids.length < 1"
            @click="cancelSelect"
          >取消选中</el-button>
          <el-button size="default" type="primary" @click="expandAll">全部展开</el-button>
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { onMounted, reactive, ref } from 'vue'
import menuData from './menu.json'
const handleDelete = (row: any) => {
  console.log('点击删除', row)
}
// 是否全部展开
const defaultExpandAll = ref(false)
const expandAll = () => {
  defaultExpandAll.value = !defaultExpandAll.value
}

const state: any = reactive({
  ids: [],
  table: {
    // 接口返回数据
    data: [],
    firstColumn: { type: 'selection', fixed: true },
    columns: [
      { prop: 'menuName', label: '菜单名称', minWidth: 180, align: 'left' },
      { prop: 'orderNum', label: '排序', width: '60px', align: 'left' },
      {
        prop: 'menuType',
        label: '菜单类型',
        minWidth: 100,
        align: 'left',
        customRender: {
          comps: [
            {
              comp: 'div',
              child: (scope) => [
                {
                  comp: 'span',
                  text:
                    scope.row.menuType == 'M'
                      ? '目录'
                      : scope.row.menuType == 'C'
                      ? '菜单'
                      : scope.row.menuType == 'F'
                      ? '按钮'
                      : '未知',
                },
              ],
            },
          ],
        },
      },
      {
        prop: 'perms',
        label: '权限标识',
        minWidth: '100px',
        align: 'left',
        noShowTip: true,
      },
      { prop: 'createBy', label: '创建人', minWidth: '60px', align: 'left' },
      { prop: 'createTime', label: '创建时间', width: '100px', align: 'left' },
      { prop: 'remark', label: '备注', width: '100px', align: 'left' },
    ],
    operator: [
      {
        text: '新增',
        // fun: add
      },
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
// 获取ref
const TreeTable: any = ref(null)
// 选择复选框
const selectionChange = (val: any) => {
  console.log('选择复选框', val)
  state.ids = val
}
// 取消选中
const cancelSelect = () => {
  console.log('取消选中', TreeTable.value)
  if (state.ids.length > 0) {
    console.log('取消选中222', TreeTable.value)
    TreeTable.value.clearSelection()
  }
}
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
    (father: { [x: string]: any, children: any }) => {
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
  const res = await menuData
  if (res.success) {
    state.table.data = handleTree(res.data, 'menuId')
  }
}
</script>
