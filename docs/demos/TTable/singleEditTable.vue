<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="单元格编辑功能"
        :table="state.table"
        :columns="state.table.columns"
        :isShowPagination="false"
        :listTypeInfo="state.table.listTypeInfo"
      />
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import cellEditData from './cellEditData.json'
import { ref, onMounted, reactive } from 'vue'
// 保存
const save = item => {
  // console.log('保存', item)
  item.isEdit = false
  item.isDisabled = false
  item.isPrint = true
  state.table.operator.map(val => {
    if (val.text == '编辑') {
      val.disabled = false
    }
  })
}
// 编辑
const edit = row => {
  // 禁用操作按钮
  state.table.operator.map(item => {
    if (item.text == '编辑') {
      item.disabled = true
    }
  })
  row.isEdit = true
  row.isDisabled = true
}
// 取消
const cancelEdit = row => {
  // 取消操作按钮禁用
  state.table.operator.map(item => {
    if (item.text == '编辑') {
      item.disabled = false
    }
  })
  row.isEdit = false
  row.isDisabled = false
}
let state = reactive({
  table: {
    // 接口返回数据
    data: [],
    // 表头数据
    columns: [
      {
        prop: 'area',
        label: '装炉位置',
        minWidth: '120',
        canEdit: true,
        configEdit: {
          label: '装炉位置',
          type: 'select-arr',
          editComponent: 'el-select',
          list: 'furnaceAreaList',
          arrLabel: 'dictLabel',
          arrKey: 'dictValue',
          bind: scope => {
            return {
              disabled: scope.row.isDisabled ? false : true
            }
          }
        }
      },
      {
        prop: 'layer',
        label: '装炉层',
        minWidth: '120',
        canEdit: true,
        configEdit: {
          label: '装炉层',
          type: 'select-arr',
          editComponent: 'el-select',
          list: 'furnaceLayerList',
          arrLabel: 'dictLabel',
          arrKey: 'dictValue',
          bind: scope => {
            return {
              disabled: scope.row.isDisabled ? false : true
            }
          }
        }
      },
      {
        prop: 'isTail',
        label: '是否尾包',
        minWidth: '100',
        canEdit: true,
        configEdit: {
          label: '是否尾包',
          type: 'checkbox',
          editComponent: 'el-checkbox',
          bind: scope => {
            return {
              disabled: scope.row.isDisabled ? false : true
            }
          }
        }
      },
      {
        prop: 'packageNumStart',
        label: '开始编号',
        minWidth: '100',
        canEdit: true,
        configEdit: {
          label: '开始编号',
          type: 'input',
          editComponent: 'el-input',
          bind: scope => {
            return {
              disabled: scope.row.isDisabled ? false : true
            }
          }
        }
      },
      {
        prop: 'packageNumEnd',
        label: '结束编号',
        minWidth: '100',
        canEdit: true,
        configEdit: {
          label: '结束编号',
          type: 'input',
          editComponent: 'el-input',
          bind: scope => {
            return {
              disabled: scope.row.isDisabled ? false : true
            }
          }
        }
      },
      { prop: 'startDate', label: '生产日期', minWidth: '100' },
      { prop: 'endDate', label: '出炉日期', minWidth: '100' },
      {
        prop: 'singleWeight',
        label: '单包重量（吨）',
        minWidth: '100',
        canEdit: true,
        configEdit: {
          label: '单包重量（吨）',
          type: 'input',
          editComponent: 'el-input-number',
          event: 'singleWeight',
          bind: scope => {
            return {
              controls: false,
              disabled: scope.row.isDisabled ? false : true,
              min: 1,
              max: 9999,
              precision: 2
            }
          }
        }
      }
    ],
    listTypeInfo: {
      furnaceAreaList: [
        {
          dictLabel: '炉头',
          dictValue: '1'
        },
        {
          dictLabel: '炉中',
          dictValue: '2'
        },
        {
          dictLabel: '炉尾',
          dictValue: '3'
        }
      ],
      furnaceLayerList: [
        {
          dictLabel: '上层',
          dictValue: '1'
        },
        {
          dictLabel: '中层',
          dictValue: '2'
        },
        {
          dictLabel: '下层',
          dictValue: '3'
        }
      ]
    },
    // 表格内操作列
    operator: [
      {
        text: '编辑',
        disabled: false,
        fun: edit,
        noshow: [
          { key: 'isPrint', val: [false] },
          { key: 'isEdit', val: [true] }
        ]
      },
      {
        text: '保存',
        fun: save,
        disabled: false,
        show: { key: 'isEdit', val: [true] }
      },
      {
        text: '取消',
        disabled: false,
        fun: cancelEdit,
        show: { key: 'isEdit', val: [true] }
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
const getList = () => {
  let res: any = cellEditData
  if (res.success) {
    res.data.map((item: any) => {
      item.isEdit = false
      item.isDisabled = false
    })
    state.table.data = res.data
  }
}
onMounted(() => {
  getList()
})
</script>
