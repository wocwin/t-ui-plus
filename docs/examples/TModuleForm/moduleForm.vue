<template>
  <t-layout-page class="t-module-form_demo">
    <t-layout-page-item>
      <t-module-form
        title="模块表单组件运用"
        subTitle="模块表单222"
        ref="sourceForm"
        :formOpts="formOpts"
        :submit="submit"
        :tabs="tabs"
        @handleEvent="handleEvent"
        @validateError="validateError"
        @tabsChange="tabsChange"
      >
        <!-- tabs插槽 -->
        <template #tab1>
          <div>基础信息</div>
        </template>
        <template #tab2>
          <div>指派明细</div>
        </template>
        <template #tab3>
          <div>承运明细</div>
        </template>
        <!-- 标题右侧按钮 -->
        <template #extra>
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="danger">信息按钮</el-button>
        </template>
        <!-- 表单自定义输入框插槽 -->
        <template #wechat>
          <el-input
            v-model="formOpts.goodsInformation.opts.formData.wechat"
            placeholder="插槽方式输入"
          ></el-input>
        </template>
        <template #wechat1>
          <el-input
            v-model="formOpts.loadingDate.opts.formData.wechat1"
            placeholder="插槽方式输入"
          ></el-input>
        </template>
        <!-- 模块form表单插槽 -->
        <template #freight>
          <el-button type="danger">运费信息</el-button>
          <el-button type="primary" @click="clearValidate">清除校验</el-button>
        </template>
        <template #lineMessage>
          <el-button type="danger">线路信息</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
        </template>
      </t-module-form>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
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
// tabs切换
const tabsChange = (val) => {
  console.log('tabs切换', val.props.name)
}
// 触发事件
const handleEvent = (type, val) => {
  console.log(333333, type, val)
  switch (type) {
    case 'checkbox':
      console.log('checkbox', val, type)
      break
  }
}
// 重置form表单
const resetForm = () => {
  // 清空校验
  sourceForm.value.resetFormFields()
}
// 清除校验
const clearValidate = () => {
  sourceForm.value.clearValidate()
}
// 校验失败抛出事件
const validateError = (e) => {
  for (let n in e) {
    console.log(`${formOpts[n].title}存在错误,请检查输入是否正确`)
  }
}
const tabs = ref([
  {
    key: 'tab1',
    title: '基础信息',
  },
  {
    key: 'tab2',
    title: '指派明细',
  },
  {
    key: 'tab3',
    title: '承运明细',
  },
])
const formOpts: any = reactive({
  goodsInformation: {
    title: '货品信息',
    name: 'goodsInformation',
    ref: null,
    widthSize: 2,
    opts: {
      labelPosition: 'top',
      formData: {
        account: null, // *用户账号
        password: null, // *用户密码
        name: null, // *用户昵称
        sex: null, // *性别: 0:男 1:女
        hobby: [], // *爱好: 0:男 1:女
        phone: null, // 手机号码
        createDate: null, // 创建时间
        valDate: null, // el日期选择范围
        wechat: null, // 微信
        qq: null, // qq
        accountType: null, // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
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
        },
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
          labelRender: () => {
            return (
              <div class="label_render">
                <div>element日期</div>
                <el-tooltip>
                  <template slot="content">
                    <span>
                      总质量4.5吨及以下普通货运车辆的，可填“车籍地6位行政区域代码+000000”。
                    </span>
                  </template>
                  <i
                    class="el-icon-warning-outline"
                    style="cursor: pointer;margin-right:2px;"
                  />
                </el-tooltip>
              </div>
            )
          },
          rules: {
            required: true,
            message: '请选择element日期',
            trigger: 'change',
          },
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
        {
          label: '微信',
          value: 'wechat',
          slotName: 'wechat',
          rules: { required: true, message: '请输入微信', trigger: 'blur' },
        },
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
          className: 't-form-block',
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
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
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
    slotName: 'freight',
  },
  lineMessage: {
    title: '线路信息',
    name: 'lineMessage',
    slotName: 'lineMessage',
  },
  loadingDate: {
    name: 'loadingDate',
    title: '承运信息',
    widthSize: 1,
    ref: null,
    opts: {
      formData: {
        createDate: null, // 创建时间
        valDate: null, // el日期选择范围
        wechat1: null, // 微信
        qq: null, // qq
        accountType: null, // *用户类型: 0: 手机注册 1: 论坛注册 2: 管理平台添加
        email: null, // 邮箱
        desc: null, // 描述
        number: null, // 计算器
        status: null, // *状态: 0：停用，1：启用(默认为1)',
      },
      fieldList: [
        {
          label: '创建时间',
          value: 'createDate',
          type: 'year',
          bind: { valueFormat: 'YYYY' },
          comp: 'el-date-picker',
        },
        {
          label: '日期范围',
          rules: {
            required: true,
            message: '请选择element日期',
            trigger: 'change',
          },
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
        {
          label: '微信',
          value: 'wechat1',
          slotName: 'wechat1',
          rules: { required: true, message: '请输入微信', trigger: 'blur' },
        },
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
          className: 't-form-block',
        },
      ],
      // 相关列表
      listTypeInfo: {
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
})
</script>
<style lang="scss">
.t-module-form_demo .t_module_form {
  margin-bottom: 0 !important;
  padding-bottom: 60px;
}
.t-module-form_demo .t_module_form .handle_wrap {
  position: absolute;
  border-top: none;
  box-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.5);
}
</style>
