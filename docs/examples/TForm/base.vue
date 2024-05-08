<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-form
        ref="TFormDemo"
        v-model="formOpts.ref"
        :formOpts="formOpts"
        @handleEvent="handleEvent"
      >
        <template #wechat>
          <t-select-table
            ref="selectTableRef"
            placeholder="下拉选择表格组件插槽使用"
            :table="state.table"
            :columns="state.table.columns"
            :max-height="400"
            :keywords="{ label: 'materialName', value: 'materialCode' }"
            multiple
            @selectionChange="selectionChange"
            isShowPagination
            @page-change="pageChange"
          ></t-select-table>
        </template>
      </t-form>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { ElMessageBox } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import data from '../TSelectTable/data.json'
import data1 from '../TSelectTable/data2.json'
// 获取ref
const TFormDemo: any = ref(null)
const selectTableRef: any = ref(null)
// 提交formOpts.ref 方式form表单
const submitForm = () => {
  formOpts.ref.validate((valid) => {
    console.log(88, valid)
    console.log(77, formOpts.formData)
    if (!valid) return
    console.log('最终数据', formOpts.formData)
  })
}
const state: any = reactive({
  table: {
    total: 0,
    currentPage: 1,
    data: [],
    columns: [
      { prop: 'factoryModelIdLabel', label: '工厂', minWidth: '100' },
      { prop: 'materialTypeLabel', label: '物料分类', minWidth: '80' },
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
    state.table.data = res.data.records
    state.table.total = res.data.total
  }
}
// 获取当前的页码
const pageChange = (val) => {
  console.log('获取当前的页码', val)
  state.table.currentPage = val
  getData(val)
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
const selectionChange = (val, ids) => {
  console.log('复选框', val)
  console.log('复选框--id', ids)
  formOpts.formData.wechat = ids
}
// 提交form表单
// const submitForm = async () => {
//   const { valid, formData } = await TFormDemo.value.validate()
//   console.log('formOpts.ref', formOpts.ref)
//   console.log('formOpts.formData', formData)
//   if (!valid) return
//   console.log('最终数据', formData)
// }
// 重置form表单
const resetForm = () => {
  // formOpts.formData = {}
  // 清空下拉选择表格数组数据
  selectTableRef.value.clear()
  // 清空校验
  TFormDemo.value.selfResetFields()
}
// 表单事件
const handleEvent = (type, val) => {
  console.log('表单事件--base', type, val)
}
const accountFocus = ({ type }) => {
  console.log('账号聚焦事件', type)
}
const accountClear = () => {
  console.log('账号清空事件')
}
const accountBlur = ({ type }) => {
  console.log('账号失焦事件', type)
}
const formOpts: any = reactive({
  ref: null,
  formData: {
    account: 'wocwin', // *用户账号
    password: 123456, // *用户密码
    name: null, // *用户昵称
    sex: null, // *性别: 0:男 1:女
    sex1: null, // *性别: 0:男 1:女
    hobby: [], // *爱好: 0:男 1:女
    phone: null, // 手机号码
    valDate: null, // el日期选择范围
    wechat: null, // 微信
    qq: null, // qq
    email: null, // 邮箱
    desc: null, // 描述
    number: null, // 计算器
    status: null, // *状态: 0：停用，1：启用(默认为1)',
  },
  fieldList: [
    {
      label: '账号',
      value: 'account',
      type: 'input',
      comp: 'el-input',
      event: 'account',
      eventHandle: {
        focus: (val) => accountFocus(val),
        clear: () => accountClear(),
        blur: (val) => accountBlur(val),
      },
    },
    {
      label: '密码',
      value: 'password',
      type: 'password',
      comp: 'el-input',
      bind: { 'show-password': true },
    },
    { label: '昵称', value: 'name', type: 'input', comp: 'el-input' },
    {
      label: '性别',
      value: 'sex',
      type: 'select-arr',
      comp: 'el-select',
      list: 'sexList',
      arrLabel: 'key',
      arrKey: 'value',
    },
    {
      label: '性别单选',
      value: 'sex1',
      type: 'radio',
      comp: 'el-radio-group',
      list: 'sexList1',
    },
    {
      label: '状态',
      value: 'status',
      type: 'select-arr',
      list: 'statusList',
      comp: 'el-select',
      arrLabel: 'key',
      arrKey: 'value',
    },
    {
      label: '爱好',
      value: 'hobby',
      type: 'checkbox',
      comp: 'el-checkbox-group',
      list: 'hobbyList',
      event: 'checkbox',
    },
    {
      label: '手机号码',
      value: 'phone',
      type: 'input',
      comp: 'el-input',
      bind: { maxlength: 11 },
    },
    {
      label: '日期',
      value: 'valDate',
      type: 'daterange',
      comp: 'el-date-picker',
      bind: {
        rangeSeparator: '-',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        valueFormat: 'YYYY-MM-DD',
      },
    },
    { label: 'QQ', value: 'qq', type: 'input', comp: 'el-input' },
    { label: '邮箱', value: 'email', type: 'input', comp: 'el-input' },
    {
      label: '下拉选择表格',
      value: 'wechat',
      slotName: 'wechat',
      widthSize: 1,
    },
    {
      label: '计数器',
      value: 'number',
      type: 'inputNumber',
      widthSize: 1,
      bind: { controls: false, min: 2, max: 99 },
      comp: 'el-input-number',
    },
    {
      label: '描述',
      value: 'desc',
      type: 'textarea',
      comp: 'el-input',
      widthSize: 1,
    },
  ],
  operatorList: [
    { label: '提交', bind: { type: 'danger' }, fun: submitForm },
    { label: '重置', bind: { type: 'primary' }, fun: resetForm },
  ],
  // 相关列表
  listTypeInfo: {
    hobbyList: [
      { label: '吉他', value: '0' },
      { label: '看书', value: '1' },
      { label: '美剧', value: '2' },
      { label: '旅游', value: '3' },
      { label: '音乐', value: '4' },
    ],
    sexList1: [
      { label: '女', value: 1 },
      { label: '男', value: 0 },
    ],
    sexList: [
      { key: '女', value: 1 },
      { key: '男', value: 0 },
    ],
    statusList: [
      { key: '启用', value: 1 },
      { key: '停用', value: 0 },
    ],
  },
})
</script>
