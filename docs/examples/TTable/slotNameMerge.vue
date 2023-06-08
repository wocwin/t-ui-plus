<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="表头合并--插槽使用"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
      >
        <template #slotNameMergeDate1="{ scope }">{{
          scope.row.date1
        }}</template>
        <template #slotNameMergename="{ scope }">{{ scope.row.name }}</template>
        <template #slotNameMergeaddress="{ scope }">{{
          scope.row.address
        }}</template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
let table = {
  // 接口返回数据
  data: [
    {
      id: '1',
      date: '2019-09-25',
      date1: '2019-09-26',
      name: '张三',
      status: '2',
      type: '2',
      address: '广东省广州市天河区',
    },
    {
      id: '2',
      date: '2019-09-26',
      date1: '2019-09-27',
      name: '张三1',
      status: '1',
      type: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '3',
      date: '2019-09-26',
      date1: '2019-09-28',
      name: '张三1',
      status: '1',
      type: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '4',
      date: '2019-09-26',
      date1: '2019-09-29',
      name: '张三1',
      status: '1',
      type: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
  ],
  // 表头数据
  columns: [
    {
      prop: 'name',
      label: '姓名',
      minWidth: '100',
      children: [
        {
          prop: 'name',
          label: '姓名',
          minWidth: '100',
          children: [
            {
              prop: 'type',
              label: '类型',
              minWidth: '100',
              children: [{ prop: 'date1', label: '日期2552', minWidth: '180' }],
            },
          ],
        },
        {
          prop: 'type',
          label: '表头合并1',
          minWidth: '100',
          children: [
            {
              prop: 'type',
              label: '类型',
              minWidth: '100',
              children: [
                {
                  prop: 'date1',
                  label: '日期插槽使用',
                  minWidth: '180',
                  slotNameMerge: 'slotNameMergeDate1',
                },
              ],
            },
          ],
        },
        {
          prop: 'name',
          label: '姓名插槽使用',
          minWidth: '100',
          slotNameMerge: 'slotNameMergename',
        },
        {
          prop: 'date',
          label: '表头合并2',
          minWidth: '180',
          children: [
            { prop: 'type', label: '类型', minWidth: '100' },
            {
              prop: 'date',
              label: '日期',
              minWidth: '180',
              children: [{ prop: 'date1', label: '日期22', minWidth: '180' }],
            },
          ],
        },
      ],
    },
    {
      prop: 'name',
      label: '姓名',
      minWidth: '100',
      children: [
        {
          prop: 'type',
          label: '类型',
          minWidth: '100',
          children: [{ prop: 'date1', label: '日期2552', minWidth: '180' }],
        },
      ],
    },
    {
      prop: 'type',
      label: '表头合并1',
      minWidth: '100',
      children: [
        {
          prop: 'type',
          label: '类型',
          minWidth: '100',
          children: [{ prop: 'date1', label: '日期2552', minWidth: '180' }],
        },
      ],
    },
    { prop: 'name', label: '姓名', minWidth: '100' },
    {
      prop: 'date',
      label: '表头合并2',
      minWidth: '180',
      children: [
        { prop: 'type', label: '类型', minWidth: '100' },
        {
          prop: 'date',
          label: '日期',
          minWidth: '180',
          children: [{ prop: 'date1', label: '日期22', minWidth: '180' }],
        },
      ],
    },
    {
      prop: '',
      label: '地址插槽（非合并项）',
      minWidth: '220',
      slotName: 'slotNameMergeaddress',
    },
    { prop: 'date1', label: '日期', minWidth: '180' },
  ],
}
</script>
