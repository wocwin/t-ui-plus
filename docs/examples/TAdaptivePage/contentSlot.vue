<template>
  <t-adaptive-page
    class="menu_mange"
    tableTitle="content插槽使用"
    ref="TAdaptivePageDemo"
    isCopy
    :table="table"
    :columns="table.columns"
    :opts="opts"
    isShowWidthSize
    :widthSize="3"
    @size-change="handlesSizeChange"
    @page-change="handlesCurrentChange"
    @selection-change="selectionChange"
    @submit="conditionEnter"
  >
    <template #content>
      <t-layout-page-item>
        <div>条件查询与TTable组件之间contnet插槽</div>
      </t-layout-page-item>
    </template>
    <template #toolbar>
      <el-button
        size="default"
        type="primary"
        :disabled="state.ids.length < 1"
        @click="cancelSelect"
        >取消选中</el-button
      >
    </template>
  </t-adaptive-page>
</template>

<script setup lang="tsx" name="selection">
import { computed, onMounted, reactive, ref, toRefs } from "vue"
import dataList from "./dataList.json"
// 获取ref
const TAdaptivePageDemo: any = ref(null)
const handleDelete = (row: any) => {
  console.log("点击删除", row)
}
// 选择复选框
const selectionChange = (val: any) => {
  console.log("选择复选框", val)
  state.ids = val
}
// 取消选中
const cancelSelect = () => {
  console.log("取消选中", TAdaptivePageDemo.value)
  if (state.ids.length > 0) {
    console.log("取消选中222", TAdaptivePageDemo.value.TTablePage)
    // 方式一
    TAdaptivePageDemo.value.clearSelection()
    // 方式二（TTablePage ref）
    // TAdaptivePageDemo.value.TTablePage.clearSelection()
  }
}
const state = reactive({
  ids: [],
  queryData: {
    userName: null, // 登录名
    nickName: null, // 用户状态
    workshopNum: null,
    phonenumber: null,
    date1: null,
    date: null
  },
  multipleList: [
    {
      name: "前纺一车间",
      id: "W1"
    },
    {
      name: "前纺二车间",
      id: "W2"
    },
    {
      name: "前纺三车间",
      id: "W3"
    },
    {
      name: "前纺四车间",
      id: "W4"
    }
  ]
})
const table = reactive<TableTypes.Table>({
  firstColumn: { type: "selection", fixed: true },
  currentPage: 1,
  pageSize: 15,
  total: 0,
  // 接口返回数据
  data: [],
  // 表头数据
  columns: [
    { prop: "userName", label: "登录名", minWidth: 120 },
    {
      prop: "nickName",
      label: "姓名",
      minWidth: 120
    },
    { prop: "deptName", label: "部门", minWidth: 120 },
    { prop: "roleName", label: "角色", minWidth: 120 },
    { prop: "descript", label: "描述", minWidth: 260 },
    { prop: "createTime", label: "创建时间", minWidth: 220 }
  ],
  operator: [
    {
      text: "编辑"
      // fun: edit
    },
    {
      text: "重置密码"
      // fun: resetHandle
    },
    {
      text: "删除",
      fun: handleDelete
    }
  ],
  // 操作列样式
  operatorConfig: {
    fixed: "right", // 固定列表右边（left则固定在左边）
    width: 200,
    label: "操作"
  }
})
const opts = computed(() => {
  return {
    userName: {
      label: "登录名称",
      comp: "el-input"
    },
    nickName: {
      label: "姓名",
      comp: "el-input"
    },
    phonenumber: {
      label: "手机号码",
      comp: "el-input"
    },
    date1: {
      label: "日期组件使用",
      comp: "t-date-picker",
      bind: {
        isPickerOptions: true
      }
    },
    workshopNum: {
      label: "t-select使用",
      placeholder: "请多选",
      span: 2,
      comp: "t-select",
      isSelfCom: true,
      bind: {
        valueCustom: "id",
        labelCustom: "name",
        multiple: true,
        optionSource: state.multipleList
      }
    },
    date: {
      label: "创建时间",
      comp: "t-date-picker",
      span: 2,
      bind: {
        type: "daterange"
      }
    }
  }
})
// 最终参数获取
const getQueryData = computed(() => {
  const { userName, nickName, date, date1, workshopNum, phonenumber } = toRefs(state.queryData)
  return {
    userName: userName.value,
    nickName: nickName.value,
    workshopNum: workshopNum.value,
    phonenumber: phonenumber.value,
    date1: date1.value,
    beginDate: date.value && date.value[0] ? date.value[0] : null,
    endDate: date.value && date.value[1] ? date.value[1] : null,
    pageNum: table.currentPage,
    pageSize: table.pageSize
  }
})
// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data)
  state.queryData = data
  console.log("最终参数", getQueryData.value)
  getData()
}
onMounted(() => {
  getData()
})
// 获取菜单数据
const getData = async () => {
  const res = await dataList
  if (res.success) {
    table.data = res?.data.rows
    table.total = res.data.total
  }
}
// 页面大小
const handlesSizeChange = (val: any) => {
  table.pageSize = val
  getData()
}
// 页码
const handlesCurrentChange = (val: any) => {
  table.currentPage = val
  getData()
}
</script>
