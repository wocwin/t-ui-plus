<template>
  <t-layout-page class="t_module_form_demo">
    <t-layout-page-item>
      <t-module-form
        title="表单校验错误提示"
        ref="sourceForm"
        :formOpts="formOpts"
        :submit="submit"
        @validateError="validateError"
      >
        <template #footer>
          <el-button type="primary" @click="clearValidate">清除校验</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
          <el-button type="danger" @click="save">保存</el-button>
        </template>
      </t-module-form>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
// 获取ref
const sourceForm: any = ref<HTMLElement | null>(null)
// 第一种：获取最终form表单数据
const submit = (form) => {
  console.log('最终提交数据', form)
}
// 第二种：获取最终form表单数据-->显示loading
// const submit = (form) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(form)
//       console.log('最终提交数据', form)
//     }, 1000)
//   })
// }
// 校验失败抛出事件
const validateError = (e) => {
  for (let n in e) {
    setTimeout(() => {
      ElMessage.error(`${formOpts[n].title}存在错误,请检查输入是否正确`)
    }, 500)
  }
}
// 重置表单
const resetForm = () => {
  console.log('重置表单')
  sourceForm.value.resetFormFields()
}
// 清除校验
const clearValidate = () => {
  console.log('清除校验')
  sourceForm.value.clearValidate()
}
const save = () => {
  sourceForm.value.saveHandle()
}
const formOpts: any = reactive({
  goodsInformation: {
    title: '货品信息',
    name: 'goodsInformation',
    ref: null,
    opts: {
      labelPosition: 'top',
      formData: {
        id: `${Math.floor(Math.random() * 10 + 1)}`, // *唯一ID
        account: null, // *用户账号
        password: null, // *用户密码
        name: null, // *用户昵称
        sex: null, // *性别: 0:男 1:女
        hobby: [], // *爱好: 0:男 1:女
        accountType: null, // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
        status: null, // *状态: 0：停用，1：启用(默认为1)',
      },
      fieldList: [
        {
          label: '账号',
          value: 'account',
          type: 'input',
          comp: 'el-input',
          event: 'account',
        },
        {
          label: '密码',
          value: 'password',
          type: 'password',
          comp: 'el-input',
        },
        { label: '昵称', value: 'name', type: 'input', comp: 'el-input' },
        {
          label: '性别',
          value: 'sex',
          type: 'select-arr',
          comp: 'el-select',
          list: 'sexList',
          bind: { disabled: false },
          arrLabel: 'key',
          arrKey: 'value',
        },
        {
          label: '平台用户',
          value: 'accountType',
          type: 'select-obj',
          comp: 'el-select',
          list: 'accountTypeList',
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
          widthSize: 1,
        },
      ],
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }],
        accountType: [
          { required: true, message: '请选择平台用户', trigger: 'change' },
        ],
        hobby: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个爱好',
            trigger: 'change',
          },
        ],
      },
      // 相关列表
      listTypeInfo: {
        hobbyList: [
          { label: '吉他', value: '0' },
          { label: '看书', value: '1' },
          { label: '美剧', value: '2' },
          { label: '旅游', value: '3' },
          { label: '音乐', value: '4' },
        ],
        sexList: [
          { key: '女', value: 1 },
          { key: '男', value: 0 },
        ],
        accountTypeList: {
          0: '手机用户',
          1: '论坛用户',
          2: '平台用户',
        },
        statusList: [
          { key: '启用', value: 1 },
          { key: '停用', value: 0 },
        ],
      },
    },
  },
  freight: {
    title: '运费信息',
    name: 'freight',
    opts: {
      formData: {
        phone: null, // 手机号码
        createDate: null, // 创建时间
        valDate: null, // el日期选择范围
        wechat: null, // 微信
        qq: null, // qq
        email: null, // 邮箱
        desc: null, // 描述
        number: 2, // 计算器
      },
      fieldList: [
        {
          label: '手机号码',
          value: 'phone',
          type: 'input',
          comp: 'el-input',
          bind: { maxlength: 11 },
        },
        {
          label: '创建时间',
          value: 'createDate',
          type: 'year',
          bind: { valueFormat: 'YYYY' },
          comp: 'el-date-picker',
        },
        {
          label: 'element日期',
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
        { label: '微信', value: 'wechat', type: 'input', comp: 'el-input' },
        { label: 'QQ', value: 'qq', type: 'input', comp: 'el-input' },
        { label: '邮箱', value: 'email', type: 'input', comp: 'el-input' },
        {
          label: '计数器',
          value: 'number',
          type: 'inputNumber',
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
      rules: {
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        createDate: [
          { required: true, message: '请选择创建时间', trigger: 'change' },
        ],
        valDate: [
          { required: true, message: '请选择element日期', trigger: 'change' },
        ],
        wechat: [{ required: true, message: '请输入微信', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        qq: [{ required: true, message: '请输入QQ', trigger: 'blur' }],
      },
    },
  },
})
</script>
