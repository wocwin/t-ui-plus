<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-select-table
        :table="state.table"
        :columns="state.table.columns"
        :max-height="400"
        :keywords="{ label: 'materialName', value: 'materialCode' }"
        @radioChange="radioChange"
      ></t-select-table>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="tsx">
import { reactive, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import dataList from './data.json'
const state: any = reactive({
  table: {
    data: [],
    columns: [
      { prop: 'factoryModelIdLabel', label: '工厂', minWidth: '100' },
      { prop: 'materialTypeLabel', label: '物料分类', minWidth: '80' },
      { prop: 'erpCodeJoin', label: 'ERP物料编码', minWidth: '100' },
      { prop: 'materialCode', label: '物料编码', minWidth: '100' },
      { prop: 'materialName', label: '物料名称', minWidth: '160' },
      { prop: 'materialSpecs', label: '规格', minWidth: '80' },
      { prop: 'power', label: '功率', minWidth: '80' },
      {
        prop: 'enableStatusLabel',
        label: '状态',
        minWidth: '80',
        render: (text, record) => {
          return (
            <el-switch
              active-value={1}
              inactive-value={2}
              v-model={record.enableStatus}
              onChange={() => handleStatusChange(record)}
            >
              {text}
            </el-switch>
          )
        },
      },
      { prop: 'materialPropertyLabel', label: '物料属性', minWidth: '80' },
      { prop: 'baseUnit', label: '基本单位', minWidth: '80' },
      { prop: 'singleWeight', label: '单重', minWidth: '80' },
      { prop: 'shortRuleMore', label: '改余', minWidth: '80' },
      { prop: 'shortRuleLess', label: '改损', minWidth: '80' },
      { prop: 'materialSourceLabel', label: '数据来源', minWidth: '100' },
      { prop: 'updateTime', label: '最后更新日期', minWidth: '100' },
      { prop: 'updateBy', label: '最后更新人', minWidth: '100' },
    ],
  },
})
onMounted(() => {
  getData()
})
const getData = () => {
  const res = dataList
  // console.log('获取列表数据', res)
  if (res.success) {
    state.table.data = res.data.records
  }
}
const handleStatusChange = (row) => {
  let text = row.enableStatus === 1 ? '启用' : '废止'
  ElMessageBox.confirm(`确认要${text}这条数据吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      console.log('点击确定')
    })
    .catch(() => {
      console.log('点击确定')
    })
}
const radioChange = (row) => {
  console.log('单选--传给后台的值', row)
}
</script>
