<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table title="多级表头--单元格编辑" :table="state.table" :columns="state.table.columns" :isShowPagination="false"
        :listTypeInfo="state.table.listTypeInfo" ref="singleEdit" @handleEvent="handleEvent">
        <template #toolbar>
          <el-button type="primary" @click="save">获取编辑数据</el-button>
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
const singleEdit: any = ref(null)
// 保存
const save = () => {
  singleEdit.value.saveMethod((data) => {
    console.log('调用方法获取返回数据---saveMethod', data)
  })
}
// 编辑单元格监听事件
const handleEvent = (type, val, index) => {
  console.log(
    `自己标识编辑单元格event值：${type}---修改后的值：${val}----当前所在行：${index}`
  )
}

let state: any = reactive({
  table: {
    // 接口返回数据
    data: [],
    // 表头数据
    columns: [
      {
        prop: 'name',
        label: '第一级表头',
        minWidth: '240',
        children: [
          {
            prop: 'area',
            label: '装炉位置-表头',
            minWidth: '120',
            canEdit: true,
            configEdit: {
              label: '装炉位置-表头',
              type: 'select-arr',
              editComponent: 'el-select',
              list: 'furnaceAreaList',
              arrLabel: 'dictLabel',
              arrKey: 'dictValue',
              event: '装炉位置area',
            },
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
            },
          },
        ]
      },
      {
        prop: 'isTail',
        label: '是否尾包',
        minWidth: '60',
        canEdit: true,
        configEdit: {
          label: '是否尾包',
          type: 'checkbox',
          editComponent: 'el-checkbox',
        },
      },
      {
        prop: 'name1',
        label: '第一级表头',
        minWidth: '200',
        children: [
          {
            prop: 'name2',
            label: '第二级表头',
            minWidth: '100',
            children: [
              {
                prop: 'packageNumStart',
                label: '开始编号',
                minWidth: '100',
                canEdit: true,
                configEdit: {
                  label: '开始编号',
                  type: 'input',
                  editComponent: 'el-input',
                },
              },
            ]
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
            },
          },
        ]
      },
      {
        prop: 'singleWeight1',
        label: '单包重量（吨）',
        minWidth: '160',
        canEdit: true,
        configEdit: {
          label: '单包重量（吨）',
          type: 'input',
          editComponent: 'el-input-number',
          event: 'singleWeight',
        },
      },
    ],
    listTypeInfo: {
      furnaceAreaList: [],
      furnaceLayerList: [],
    },
  },
})
onMounted(() => {
  getData()
})
const getData = () => {
  let resData = [
    {
      area: '',
      remark: null,
      isTail: true,
      packageNumStart: null,
      packageNumEnd: null,
      layer: '',
    },
    {
      area: '',
      remark: null,
      isTail: false,
      packageNumStart: null,
      packageNumEnd: null,
      layer: '',
    },
    {
      area: '',
      remark: null,
      isTail: false,
      packageNumStart: null,
      packageNumEnd: null,
      layer: '',
    },
  ]
  state.table.listTypeInfo.furnaceAreaList = [{
    dictLabel: '炉头',
    dictValue: '1',
  },
  {
    dictLabel: '炉中',
    dictValue: '2',
  },
  {
    dictLabel: '炉尾',
    dictValue: '3',
  },]
  state.table.listTypeInfo.furnaceLayerList = [{
    dictLabel: '上层',
    dictValue: '1',
  },
  {
    dictLabel: '中层',
    dictValue: '2',
  },
  {
    dictLabel: '下层',
    dictValue: '3',
  },]
  state.table.data = resData
}

</script>
