<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="自定义表头渲染"
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
      status: '3',
      address: '广东省广州市天河区',
    },
    {
      id: '2',
      date: '2019-09-26',
      date1: '2019-09-27',
      name: '张三1',
      status: '2',
      address: '广东省广州市天广东省广州市天河区2广东省广州市天河区2河区2',
    },
    {
      id: '3',
      date: '2019-09-26',
      date1: '2019-09-28',
      name: '张三1',
      status: '0',
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
    {
      prop: 'date',
      minWidth: '180',
      renderHeader: () => {
        return (
          <div>
            <span style="color:red">自定义表头</span>
            <search style="width: 1em; height: 1em; margin-right: 8px" />
          </div>
        )
      },
    },
    {
      prop: 'status',
      label: 'render方式',
      minWidth: '220',
      render: (text) => {
        let type = ''
        let val = ''
        switch (text) {
          case '0':
            type = 'info'
            val = '其它'
            break
          case '1':
            type = 'success'
            val = '新增'
            break
          case '2':
            type = 'warning'
            val = '修改'
            break
          case '3':
            type = 'danger'
            val = '删除'
            break
        }
        return <el-tag type={type}>{val}</el-tag>
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
