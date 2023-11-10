<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="集成分页器--序列号显示-累加"
        :table="table"
        :columns="table.columns"
        @page-change="pageChange"
        isPaginationCumulative
      >
        <template #pagination>
          <div>测试插槽</div>
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { onMounted, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import data from './data.json'
import data1 from './data2.json'
const table = ref({
  firstColumn: { type: 'index', width: 80, fixed: true },
  total: 0,
  currentPage: 1,
  pageSize: 10,
  layout: 'total,sizes, slot, prev, pager, next, jumper',
  prevText: '上一页',
  nextText: '下一页',
  // 接口返回数据
  data: [],
  // 表头数据
  columns: [
    { prop: 'factoryModelIdLabel', label: '工厂', minWidth: 160 },
    { prop: 'materialTypeLabel', label: '物料分类', minWidth: 120 },
    { prop: 'materialCode', label: '物料编码', minWidth: 120 },
    { prop: 'materialName', label: '物料名称', minWidth: 180 },
    { prop: 'materialSpecs', label: '规格', minWidth: '80' },
    { prop: 'power', label: '功率', minWidth: '80' },
    {
      prop: 'enableStatusLabel',
      label: '状态',
      minWidth: 120,
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
    { prop: 'materialPropertyLabel', label: '物料属性', minWidth: 120 },
    { prop: 'baseUnit', label: '基本单位', minWidth: 120 },
    { prop: 'singleWeight', label: '单重', minWidth: 120 },
    { prop: 'shortRuleMore', label: '改余', minWidth: 120 },
    { prop: 'shortRuleLess', label: '改损', minWidth: 120 },
    { prop: 'materialSourceLabel', label: '数据来源', minWidth: '100' },
    { prop: 'updateTime', label: '最后更新日期', minWidth: 220 },
    { prop: 'updateBy', label: '最后更新人', minWidth: 160 },
  ],
})
onMounted(() => {
  getData(1)
})
const getData = async (pageNum) => {
  let res
  if (pageNum === 1) {
    res = await data
  } else {
    res = await data1
  }
  // console.log('获取列表数据', res)
  if (res.success) {
    table.value.data = res.data.records.splice(0, 5)
    table.value.total = res.data.total
  }
}
const handleStatusChange = (row) => {
  let text = row.enableStatus === 1 ? '启用' : '废止'
  ElMessageBox.confirm(`确认要${text}这条数据吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      console.log('点击确定')
    })
    .catch(() => {
      console.log('点击取消')
    })
}
// 选择当前页码
const pageChange = (val) => {
  console.log('选择当前页码', val)
  table.value.currentPage = val
  getData(val)
}
</script>
