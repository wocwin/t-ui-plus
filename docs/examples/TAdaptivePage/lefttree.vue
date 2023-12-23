<template>
  <t-adaptive-page
    class="menu_mange"
    title="显示左侧tree结构"
    isCopy
    :table="state.table"
    :columns="state.table.columns"
    :opts="opts"
    @size-change="handlesSizeChange"
    @page-change="handlesCurrentChange"
    @submit="conditionEnter"
  >
    <template #leftContent>
      <el-tree
        ref="treeRef"
        class="filter-tree"
        :data="data"
        :props="{children: 'children',label: 'label'}"
        default-expand-all
        :filter-node-method="filterNode"
      />
    </template>
    <template #nickName="{ scope }">
      <div>{{ scope.row.nickName }}</div>
    </template>
  </t-adaptive-page>
</template>

<script setup lang="tsx" name="accountManage">
import { computed, onMounted, reactive, toRefs } from 'vue'
import dataList from './dataList.json'
interface Tree {
  [key: string]: any;
}
const handleDelete = (row: any) => {
  console.log('点击删除', row)
}
const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}
const data: Tree[] = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]
const state: any = reactive({
  queryData: {
    userName: null, // 登录名
    nickName: null, // 用户状态
    workshopNum: null,
    phonenumber: null,
    date1: null,
    date: null,
  },
  multipleList: [
    {
      name: '前纺一车间',
      id: 'W1',
    },
    {
      name: '前纺二车间',
      id: 'W2',
    },
    {
      name: '前纺三车间',
      id: 'W3',
    },
    {
      name: '前纺四车间',
      id: 'W4',
    },
  ],
  table: {
    currentPage: 1,
    pageSize: 15,
    total: 0,
    // 接口返回数据
    data: [],
    // 表头数据
    columns: [
      { prop: 'userName', label: '登录名', minWidth: 120 },
      {
        prop: 'nickName',
        label: '姓名',
        slotName: 'nickName',
      },
      { prop: 'deptName', label: '部门', minWidth: 120 },
      { prop: 'roleName', label: '角色', minWidth: 120 },
      { prop: 'descript', label: '描述', minWidth: 260 },
      { prop: 'createTime', label: '创建时间', minWidth: 220 },
    ],
    operator: [
      {
        text: '编辑',
        // fun: edit
      },
      {
        text: '重置密码',
        // fun: resetHandle
      },
      {
        text: '删除',
        fun: handleDelete,
      },
    ],
    // 操作列样式
    operatorConfig: {
      fixed: 'right', // 固定列表右边（left则固定在左边）
      width: 200,
      label: '操作',
    },
  },
})

const opts = computed(() => {
  return {
    userName: {
      label: '登录名称',
      comp: 'el-input',
    },
    nickName: {
      label: '姓名',
      comp: 'el-input',
    },
    phonenumber: {
      label: '手机号码',
      comp: 'el-input',
    },
    date1: {
      label: '日期组件使用',
      comp: 't-date-picker',
      bind: {
        isPickerOptions: true,
      },
    },
    workshopNum: {
      label: 't-select使用',
      placeholder: '请多选',
      span: 2,
      comp: 't-select',
      isSelfCom: true,
      bind: {
        valueCustom: 'id',
        labelCustom: 'name',
        multiple: true,
        optionSource: state.multipleList,
      },
    },
    date: {
      label: '创建时间',
      comp: 't-date-picker',
      span: 2,
      bind: {
        type: 'daterange',
      },
    },
  }
})
// 最终参数获取
const getQueryData = computed(() => {
  const { userName, nickName, date, date1, workshopNum, phonenumber } = toRefs(
    state.queryData
  )
  return {
    userName: userName.value,
    nickName: nickName.value,
    workshopNum: workshopNum.value,
    phonenumber: phonenumber.value,
    date1: date1.value,
    beginDate: date.value && date.value[0] ? date.value[0] : null,
    endDate: date.value && date.value[1] ? date.value[1] : null,
    pageNum: state.table.currentPage,
    pageSize: state.table.pageSize,
  }
})
// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data)
  state.queryData = data
  console.log('最终参数', getQueryData.value)
  getData()
}
onMounted(() => {
  getData()
})
// 获取菜单数据
const getData = async () => {
  const res = await dataList
  if (res.success) {
    state.table.data = res?.data.rows
    state.table.total = res.data.total
  }
}
// 页面大小
const handlesSizeChange = (val: any) => {
  state.table.pageSize = val
  getData()
}
// 页码
const handlesCurrentChange = (val: any) => {
  state.table.currentPage = val
  getData()
}
</script>
