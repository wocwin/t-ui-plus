<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-query-condition :opts="opts" @submit="conditionEnter" @handleEvent="handleEvent" />
    </t-layout-page-item>
    <t-layout-page-item>
      <t-table ref="selectionTable" title="TTable组件使用" :table="state.table" :columns="state.table.columns"
         @selection-change="selectionChange" :isShowPagination="false" @radioChange="radioChange">
        <!-- 插槽渲染 -->
        <template #dateSlot="{scope}">
          <div>{{scope.row.date1}}</div>
        </template>
        <template #toolbar>
          <el-button size="default" type="primary" :disabled="state.ids.length<1" @click="cancelSelect">取消选中</el-button>
          <el-button size="default" type="primary" @click="add">新增</el-button>
          <el-button size="default" type="danger" :disabled="state.ids.length<1" @click="del">删除</el-button>
        </template>
      </t-table>
    </t-layout-page-item>
    <t-layout-page-item>
      <t-table ref="selectionTable" title="TTable组件使用" :table="state.table" :columns="state.table.columns"
         @selection-change="selectionChange" :isShowPagination="false" @radioChange="radioChange">
        <!-- 插槽渲染 -->
        <template #dateSlot="{scope}">
          <div>{{scope.row.date1}}</div>
        </template>
        <template #toolbar>
          <el-button size="default" type="primary" :disabled="state.ids.length<1" @click="cancelSelect">取消选中</el-button>
          <el-button size="default" type="primary" @click="add">新增</el-button>
          <el-button size="default" type="danger" :disabled="state.ids.length<1" @click="del">删除</el-button>
        </template>
      </t-table>
    </t-layout-page-item>
    <t-layout-page-item>
      <t-table ref="selectionTable" title="TTable组件使用" :table="state.table" :columns="state.table.columns"
         @selection-change="selectionChange" :isShowPagination="false" @radioChange="radioChange">
        <!-- 插槽渲染 -->
        <template #dateSlot="{scope}">
          <div>{{scope.row.date1}}</div>
        </template>
        <template #toolbar>
          <el-button size="default" type="primary" :disabled="state.ids.length<1" @click="cancelSelect">取消选中</el-button>
          <el-button size="default" type="primary" @click="add">新增</el-button>
          <el-button size="default" type="danger" :disabled="state.ids.length<1" @click="del">删除</el-button>
        </template>
      </t-table>
    </t-layout-page-item>
    <t-layout-page-item>
      <t-table ref="selectionTable" title="TTable组件使用" :table="state.table" :columns="state.table.columns"
         @selection-change="selectionChange" :isShowPagination="false" @radioChange="radioChange">
        <!-- 插槽渲染 -->
        <template #dateSlot="{scope}">
          <div>{{scope.row.date1}}</div>
        </template>
        <template #toolbar>
          <el-button size="default" type="primary" :disabled="state.ids.length<1" @click="cancelSelect">取消选中</el-button>
          <el-button size="default" type="primary" @click="add">新增</el-button>
          <el-button size="default" type="danger" :disabled="state.ids.length<1" @click="del">删除</el-button>
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx" name="Table">
import { ref, computed, reactive } from 'vue'
const viewDetail = (val: any) => {
  console.log('viewDetail', val)
}
const edit = (val: any) => {
  console.log('edit', val)
}
const nullify = (val: any) => {
  console.log('nullify', val)
}
const change = (val: any, type: any) => {
  console.log(111, val, type)
}
let state = reactive({
  queryData: {
    userName: null, // 登录名
    phonenumber: null, // 手机号码
    workshopNum: null,
    date: null,
    date1: null
  },
  listTypeInfo: {
    sexList: [
      {
        dictLabel: '前纺一车间',
        dictValue: 'W1'
      },
      {
        dictLabel: '前纺二车间',
        dictValue: 'W2'
      }
    ]
  },
  ids: [],
  table: {
    total: 20,
    currentPage: 1,
    pageSize: 10,
    firstColumn: { type: 'radio', fixed: true },
    // 接口返回数据
    data: [
      {
        id: '1',
        date: '2019-09-25',
        date1: '2019-09-26',
        name: '张三',
        status: '2',
        address: '广东省广州市天河区'
      },
      {
        id: '2',
        date: '2019-09-26',
        date1: '2019-09-27',
        name: '张三1',
        status: '1',
        address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
      },
      {
        id: '3',
        date: '2019-09-26',
        date1: '2019-09-28',
        name: '张三1',
        status: '1',
        address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
      },
      {
        id: '4',
        date: '2019-09-26',
        date1: '2019-09-29',
        name: '张三1',
        status: '1',
        address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2'
      }
    ],
    // 表头数据
    columns: [
      { prop: 'name', label: '姓名', minWidth: '100' },
      { prop: 'date', label: '日期', minWidth: '180' },
      // {
      //   prop: 'status',
      //   label: '字典过滤',
      //   minWidth: '120',
      //   filters: { list: 'statusList', key: 'id', label: 'label' }
      // },

      {
        prop: 'status',
        label: 'render方式',
        minWidth: '220',
        render: (val: any) => {
          let label
          switch (val) {
            case '1':
              label = '待办'
              break
            case '2':
              label = '待提交'
              break
            case '3':
              label = '完成'
              break
          }
          return <div>{label}</div>
        }
      },
      { prop: 'date1', label: '日期22', minWidth: '180', slotName: 'dateSlot' },
      {
        prop: 'address',
        label: '地址',
        minWidth: '220',
        canEdit: true,
        configEdit: {
          label: '地址',
          type: 'el-input'
        }
      }
    ],
    // 字典渲染数据源
    listTypeInfo: {
      statusList: [
        {
          id: '1',
          label: '待办'
        },
        {
          id: '2',
          label: '待审批'
        },
        {
          id: '3',
          label: '报废'
        }
      ]
    },
    // 表格内操作列
    operator: [
      {
        text: '查看',
        fun: viewDetail,
        show: { key: 'status', val: ['1'] }
      },
      {
        text: '编辑',
        fun: edit
      },
      {
        text: '作废',
        fun: nullify
      }
    ],
    // 操作列样式
    operatorConfig: {
      fixed: 'right', // 固定列表右边（left则固定在左边）
      width: 200,
      label: '操作'
    }
  }
})
// 获取ref
const selectionTable: any = ref<HTMLElement | null>(null)
const opts = computed(() => {
  return {
    userName: {
      label: '登录名称',
      comp: 'el-input'
    },
    phonenumber: {
      label: '手机号码',
      comp: 'el-input'
    },
    workshopNum: {
      label: '车间',
      comp: 'el-select',
      changeEvent: 'change',
      type: 'select-arr',
      list: 'sexList',
      listTypeInfo: state.listTypeInfo
    },
    date1: {
      label: '日期',
      comp: 'el-date-picker',
      bind: {
        valueFormat: 'YYYY-MM-DD'
      }
    },
    date: {
      labelRender: () => {
        return <label>装炉时间</label>
      },
      comp: 'el-date-picker',
      span: 2,
      event: 'date',
      bind: {
        rangeSeparator: '-',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        valueFormat: 'YYYY-MM-DD',
        type: 'daterange'
      }
    }
  }
})
// 最终参数获取
const getQueryData = computed(() => {
  const { userName, phonenumber, workshopNum, date, date1 } = state.queryData
  console.log(444, userName, phonenumber, date1)
  return {
    userName,
    workshopNum,
    phonenumber,
    date1,
    beginDate: date && date[0] ? date[0] : null,
    endDate: date && date[1] ? date[1] : null
  }
})
// 查询条件change事件
const handleEvent = (type: any, val: any) => {
  // console.log(111, type, val)
  switch (type) {
    case 'date':
      console.log('获取event==date的数据', val)
      break
  }
}
// 点击查询按钮
const conditionEnter = (data: any) => {
  console.log(1122, data)
  state.queryData = data
  console.log('最终参数', getQueryData.value)
}
// 选择复选框
const selectionChange = (val: any) => {
  console.log('选择复选框', val)
  state.ids = val
}
// 选择单选框
const radioChange = (row: any) => {
  console.log('选择单选框', row)
}
// 新增按钮
const add = () => {
  console.log('add按钮')
}
// 删除按钮
const del = () => {
  console.log('del按钮')
}
// 取消选中
const cancelSelect = () => {
  console.log('取消选中', selectionTable.value)
  if (state.ids.length > 0) {
    console.log('取消选中222', selectionTable.value)
    selectionTable.value.clearSelection()
  }
}
</script>