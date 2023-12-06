<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="单元格编辑--校验 rules"
        :table="state.table"
        :columns="state.table.columns"
        :isShowPagination="false"
        ref="singleEdit"
        :listTypeInfo="state.listTypeInfo"
        @handleEvent="handleEvent"
        @save="singleSave"
        @validateError="validateError"
        isShowFooterBtn
      >
        <template #toolbar>
          <el-button type="primary" @click="save"
            >另一种获取table数据</el-button
          >
          <el-button @click="clearValidate">清除校验规则</el-button>
          <el-button type="primary" @click="reset">重置表单</el-button>
        </template>
        <!-- 自定义单元格编辑组件(多选下拉选择) -->
        <template #editHobby="{ scope }">
          <el-select v-model="scope.row[scope.column.property]" multiple>
            <el-option
              v-for="item in state.listTypeInfo.hobbyList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
const singleEdit: any = ref<HTMLElement | null>(null)
// 保存
const save = (tableData) => {
  console.log('另一种获取的table数据', singleEdit.value.save())
}
// 点击保存获取table数据
const singleSave = (data) => {
  console.log('单个单元格编辑保存', data)
}
// 编辑单元格监听事件
const handleEvent = (type, val, index) => {
  console.log(
    `自己标识编辑单元格event值：${type}---修改后的值：${val}----当前所在行：${index}`
  )
}
// 清除校验规则
const clearValidate = () => {
  singleEdit.value.clearValidate()
}
// 重置表单
const reset = () => {
  singleEdit.value.resetFields()
}
const editDel = (item, index, row) => {
  // console.log('9966--', singleEdit.value.save())
  row.splice(index, 1)
  console.log('删除', item, row, index)
}
// 错误校验提示
const validateError = (list) => {
  list.map((val) => {
    setTimeout(() => {
      ElMessage.error(`${val}是必填项！`)
    }, 100)
  })
}
let state: any = reactive({
  table: {
    rules: {
      hobby: [
        { required: true, message: '请至少选择一个爱好', trigger: 'change' },
      ],
      year: [{ required: true, message: '请选择年份', trigger: 'change' }],
      name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    },
    firstColumn: { type: 'index', label: '序列' }, // 显示序列号
    data: [
      {
        name: null,
        hobby: null,
        slotName: [],
        year: null,
        time: null,
        remake: null,
        number: 12,
      },
      {
        name: null,
        hobby: null,
        slotName: [],
        year: null,
        time: null,
        remake: null,
        number: 12,
      },
    ],
    columns: [
      {
        prop: 'name',
        label: '姓名',
        minWidth: '160',
        canEdit: true,
        headerRequired: true,
        configEdit: {
          label: '姓名',
          type: 'input',
          editComponent: 'el-input',
        },
      },
      {
        prop: 'unit',
        label: '单位',
        minWidth: '220',
        canEdit: true,
        headerRequired: true,
        configEdit: {
          label: '单位',
          append: '吨',
          rules: { required: true, message: '请输入单位', trigger: 'blur' },
          bind: { 'prefix-icon': 'el-icon-search' },
          editComponent: 'el-input',
        },
      },
      {
        prop: 'hobby',
        label: '爱好单选',
        minWidth: '180',
        headerRequired: true,
        canEdit: true,
        configEdit: {
          label: '爱好单选',
          type: 'select-arr',
          editComponent: 'el-select',
          list: 'hobbyList',
          event: 'hobbyList',
          arrLabel: 'label',
          arrKey: 'value',
        },
      },
      {
        prop: 'slotName',
        label: '编辑组件插槽',
        minWidth: '180',
        renderHeader: (row) => {
          return (
            <div>
              <span>{row.label}</span>
              <i
                class="el-icon-question"
                style="color:#409eff;margin-left:5px;font-size:15px;"
              ></i>
            </div>
          )
        },
        canEdit: true,
        configEdit: {
          label: '编辑组件插槽',
          type: 'el-select-multiple',
          editComponent: 'el-select',
          editSlotName: 'editHobby',
        },
      },
      {
        prop: 'year',
        label: '日期年',
        minWidth: '180',
        canEdit: true,
        headerRequired: true,
        configEdit: {
          label: '日期年',
          type: 'year',
          editComponent: 'el-date-picker',
          bind: { valueFormat: 'YYYY' },
        },
      },
      {
        prop: 'time',
        label: '日期时间',
        minWidth: '180',
        canEdit: true,
        configEdit: {
          label: '日期时间',
          type: 'datetime',
          editComponent: 'el-date-picker',
          bind: {
            valueFormat: 'yyyy-MM-dd hh:mm:ss',
          },
        },
      },
      {
        prop: 'number',
        label: '计数器',
        minWidth: '220',
        canEdit: true,
        configEdit: {
          label: '计数器',
          type: 'inputNumber',
          bind: { min: 0, max: 99 },
          editComponent: 'el-input-number',
        },
      },
      {
        prop: 'remake',
        label: '备注',
        minWidth: '220',
        canEdit: true,
        configEdit: {
          label: '备注',
          type: 'textarea',
          bind: { type: 'textarea' },
          editComponent: 'el-input',
        },
      },
    ],
    // 表格内操作列
    operator: [
      {
        type: 'danger',
        text: '删除',
        fun: editDel,
      },
    ],
    operatorConfig: {
      fixed: 'right',
    },
  },
  // 下拉选择项
  listTypeInfo: {
    hobbyList: [
      { label: '吉他', value: '0' },
      { label: '看书', value: '1' },
      { label: '美剧', value: '2' },
      { label: '旅游', value: '3' },
      { label: '音乐', value: '4' },
    ],
  },
})
</script>
