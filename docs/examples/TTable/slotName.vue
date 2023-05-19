<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="某列插槽渲染"
        :table="table"
        :columns="table.columns"
        :isShowPagination="false"
      >
        <!-- 插槽渲染 -->
        <template #date1="{ scope }">
          <div>{{ scope.row.date1 }}</div>
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
const table = {
  // 接口返回数据
  data: [
    {
      id: '1',
      date: '2019-09-25',
      date1: '2019-09-26',
      name: '张三',
      status: '2',
      address: '广东省广州市天河区',
    },
    {
      id: '2',
      date: '2019-09-26',
      date1: '2019-09-27',
      name: '张三1',
      status: '1',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
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
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
  ],
  // 表头数据
  columns: [
    { prop: 'name', label: '姓名', minWidth: '100' },
    { prop: 'date', label: '日期', minWidth: '180' },
    {
      prop: 'status',
      label: 'render方式',
      minWidth: '220',
      render: (val) => {
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
      },
    },
    { prop: 'date1', label: '插槽渲染', minWidth: '180', slotName: 'date1' },
    {
      prop: 'address',
      label: '地址',
      minWidth: '220',
    },
  ],
}
</script>
