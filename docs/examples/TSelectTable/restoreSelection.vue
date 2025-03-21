<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-select-table
        ref="selectTableRef"
        :table="state.table"
        :columns="state.table.columns"
        :max-height="400"
        :keywords="{ label: 'materialName', value: 'materialCode' }"
        multiple
        @selectionChange="selectionChange"
        isShowPagination
        @page-change="pageChange"
      ></t-select-table>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="tsx">
import { ref, reactive, onMounted } from "vue"
import { ElMessageBox } from "element-plus"
import data from "./data.json"
import data1 from "./data2.json"
const selectTableRef = ref()
const selectRowArr = ref<any[]>([])
const state: any = reactive({
  table: {
    total: 0,
    currentPage: 1,
    data: [],
    columns: [
      { prop: "factoryModelIdLabel", label: "工厂", minWidth: "100" },
      { prop: "materialTypeLabel", label: "物料分类", minWidth: "80" },
      { prop: "materialCode", label: "物料编码", minWidth: "100" },
      { prop: "materialName", label: "物料名称", minWidth: "160" },
      { prop: "materialSpecs", label: "规格", minWidth: "80" },
      { prop: "power", label: "功率", minWidth: "80" },
      {
        prop: "enableStatusLabel",
        label: "状态",
        minWidth: "80",
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
        }
      },
      { prop: "materialPropertyLabel", label: "物料属性", minWidth: "80" },
      { prop: "baseUnit", label: "基本单位", minWidth: "80" },
      { prop: "singleWeight", label: "单重", minWidth: "80" },
      { prop: "shortRuleMore", label: "改余", minWidth: "80" },
      { prop: "shortRuleLess", label: "改损", minWidth: "80" },
      { prop: "materialSourceLabel", label: "数据来源", minWidth: "100" },
      { prop: "updateTime", label: "最后更新日期", minWidth: "100" },
      { prop: "updateBy", label: "最后更新人", minWidth: "100" }
    ]
  }
})
onMounted(async () => {
  await getData(1)
})
const getData = async pageNum => {
  let res
  if (pageNum === 1) {
    res = await data
  } else {
    res = await data1
  }
  // console.log('获取列表数据', res)
  if (res.success) {
    state.table.data = res.data.records
    state.table.total = res.data.total
    selectRowArr.value = [
      {
        materialTypeLabel: "电极",
        erpCodeJoin: "",
        factoryModelId: 1,
        shortRuleMore: 0.0,
        claspType: "",
        enableStatusLabel: "启用",
        baseUnit: "吨",
        materialPropertyLabel: "自产",
        updateBy: "史炜立",
        materialSourceLabel: "自增",
        id: "1628268557300752386",
        power: "RP",
        singleWeight: 500.0,
        materialSource: 1,
        materialSpecs: "500",
        materialType: 1,
        materialCode: "555",
        updateTime: "2023-02-22",
        factoryModelIdLabel: "东日新能源",
        shortRuleLess: 0.0,
        materialProperty: 1,
        materialName: "一烧0227",
        createBy: "史炜立",
        createTime: "2023-02-22 13:40:50",
        enableStatus: 1
      },
      {
        materialTypeLabel: "坩埚",
        erpCodeJoin: "",
        factoryModelId: 1,
        shortRuleMore: 0.0,
        claspType: "",
        enableStatusLabel: "启用",
        baseUnit: "",
        materialPropertyLabel: "自产",
        updateBy: "韦宏波",
        materialSourceLabel: "自增",
        id: "1567343974259994722",
        power: "RP",
        singleWeight: 1.02,
        materialSource: 1,
        materialSpecs: "sa",
        materialType: 6,
        materialCode: "GG15499",
        updateTime: "2022-09-07",
        factoryModelIdLabel: "东日新能源",
        shortRuleLess: 0.0,
        materialProperty: 1,
        materialName: "坩埚99",
        createBy: "韦宏波",
        createTime: "2022-09-07 10:48:18",
        enableStatus: 1
      }
    ]
    restoreSelection()
    // 回显select框选中项
    selectTableRef.value.state.defaultValue = selectRowArr.value.map(item => item.materialName)
  }
}

// 回显el-table选中项
const restoreSelection = () => {
  selectRowArr.value.forEach(row => {
    const index = state.table.data.findIndex(d => d.materialCode === row.materialCode)
    if (index !== -1) {
      selectTableRef.value.selectTable.toggleRowSelection(state.table.data[index], true)
    }
  })
}
// 获取当前的页码
const pageChange = val => {
  console.log("获取当前的页码", val)
  state.table.currentPage = val
  getData(val)
}
const handleStatusChange = row => {
  let text = row.enableStatus === 1 ? "启用" : "废止"
  ElMessageBox.confirm(`确认要${text}这条数据吗？`, "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      console.log("点击确定")
    })
    .catch(() => {
      console.log("点击取消")
    })
}
const selectionChange = (val, ids) => {
  console.log("复选框", val)
  console.log("复选框--id", ids)
}
</script>
