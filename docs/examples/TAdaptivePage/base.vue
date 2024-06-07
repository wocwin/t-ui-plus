<template>
  <t-adaptive-page
    class="menu_mange"
    title="用户管理列表"
    row-key="path"
    isCopy
    isExpansion
    columnSetting
    :queryPageStyle="{ marginBottom: '0px' }"
    :table="state.table"
    :columns="state.table.columns"
    :opts="opts"
    isShowWidthSize
    :widthSize="3"
    @size-change="handlesSizeChange"
    @page-change="handlesCurrentChange"
    @submit="conditionEnter"
  >
    <template #title>优先展示插槽，不写插槽展示tableTitle</template>
    <template #nickName="{ scope }">
      <div>{{ scope.row.nickName }}</div>
    </template>
  </t-adaptive-page>
</template>

<script setup lang="tsx" name="accountManage">
import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue'
import dataList from './dataList.json'
const handleDelete = (row: any) => {
  console.log('点击删除', row)
}
const state: any = reactive({
  queryData: {
    userName: null, // 登录名
    nickName: null, // 用户状态
    workshopNum: null,
    phonenumber: null,
    date1: null,
    date: null,
    role: null,
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
watch(
  () => state.queryData.workshopNum,
  (val) => {
    console.log('watch---val', val)
    handleBranchCode(val)
  },
  {
    deep: true,
  }
)

const opts = ref({
  userName: {
    label: '登录名称',
    comp: 'el-input',
  },
  nickName: {
    label: '姓名',
    comp: 'el-input',
  },
  workshopNum: {
    labelRender: () => {
      return <div style="color:red">新增项条件</div>
    },
    placeholder: '选择第一条数据才新增',
    comp: 't-select',
    isSelfCom: true,
    bind: {
      valueCustom: 'id',
      labelCustom: 'name',
      optionSource: state.multipleList,
    },
    eventHandle: {
      change: (val) => handleBranchCode(val),
    },
  },
  phonenumber: {
    label: '手机号码',
    comp: 'el-input',
  },
  role: {
    label: '角色',
    comp: 'el-input',
  },
  date1: {
    label: '日期组件使用',
    comp: 't-date-picker',
    bind: {
      isPickerOptions: true,
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
})
// 动态添加
const add = {
  email: {
    label: '邮箱',
    comp: 'el-input',
  },
  remark: {
    label: '备注',
    comp: 'el-input',
  },
}
// t-select使用动态新增数据
const handleBranchCode = (val) => {
  console.log('handleBranchCode', val)
  if (val === 'W1') {
    opts.value = {
      ...opts.value,
      ...add,
    }
  } else {
    Object.keys(add).forEach((key) => {
      delete opts.value[key]
    })
  }
}
// 最终参数获取
const getQueryData = computed(() => {
  const { userName, nickName, date, date1, workshopNum, phonenumber, role } =
    toRefs(state.queryData)
  return {
    userName: userName.value,
    nickName: nickName.value,
    workshopNum: workshopNum.value,
    phonenumber: phonenumber.value,
    role: role.value,
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
