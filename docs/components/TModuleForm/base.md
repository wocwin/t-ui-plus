# TModuleForm 模块表单/详情组件

---

### 表单模块使用

::: demo

```vue
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

<script setup lang="ts">
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
          label: '日期范围',
          // labelRender: () => {
          //   return (
          //     <div class="label_render">
          //       <div>element日期</div>
          //       <el-tooltip>
          //         <template slot="content">
          //           <span>
          //             总质量4.5吨及以下普通货运车辆的，可填“车籍地6位行政区域代码+000000”。
          //           </span>
          //         </template>
          //         <i
          //           class="el-icon-warning-outline"
          //           style="cursor: pointer;margin-right:2px;"
          //         />
          //       </el-tooltip>
          //     </div>
          //   )
          // },
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
        // account: [
        //   { required: true, message: '请输入账号', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        // ],
        // password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        // name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        // phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        // sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        // hobby: [
        //   {
        //     type: 'array',
        //     required: true,
        //     message: '请至少选择一个爱好',
        //     trigger: 'change',
        //   },
        // ],
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
          // labelRender: () => {
          //   return (
          //     <div class="label_render">
          //       <div>element日期</div>
          //       <el-tooltip>
          //         <template slot="content">
          //           <span>
          //             总质量4.5吨及以下普通货运车辆的，可填“车籍地6位行政区域代码+000000”。
          //           </span>
          //         </template>
          //         <i
          //           class="el-icon-warning-outline"
          //           style="cursor: pointer;margin-right:2px;"
          //         />
          //       </el-tooltip>
          //     </div>
          //   )
          // },
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
```

:::

### 详情模块使用

::: demo

```vue
<template>
  <t-layout-page class="t-module-form_demo">
    <t-layout-page-item>
      <t-module-form
        title="模块详情组件运用"
        subTitle="模块详情222"
        ref="sourceDetail"
        handleType="desc"
        :descData="descData"
        :listTypeInfo="listTypeInfo"
        :dataList="dataList"
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
        <!-- 模块detail详情插槽 -->
        <template #line>
          <el-button type="danger">自定义模块detail插槽</el-button>
        </template>
        <!-- value自定义插槽 -->
        <template #loadKgPerCar>
          <span class="text-danger">插槽值回显</span>
        </template>
      </t-module-form>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
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
// 字典集（一定需要放在listTypeInfo对象里）
const listTypeInfo = {
  stockTakeTypeList: [
    {
      label: '在制品',
      value: 1,
    },
    {
      label: '待检品',
      value: 2,
    },
    {
      label: '合格品',
      value: 3,
    },
    {
      label: '报废品',
      value: 4,
    },
  ],
}
// 后台接口返回的数据
const dataList = {
  stocktakeJobStatus: 4,
}
// 具体详情模块回显源
const descData: any = reactive({
  goods: {
    name: 'goods',
    title: '货品信息',
    data: [
      {
        label: '货品名称',
        fieldName: 'cargoName',
        value: '********',
      },
      {
        label: '字典回显：',
        fieldName: 'stocktakeJobStatus',
        value: 4,
        filters: {
          list: 'stockTakeTypeList',
        },
      },
      {
        label: '货品类别',
        fieldName: 'cargoType',
        value: '******',
      },
      {
        label: '货品价值',
        fieldName: 'cargoMoneyCentPerTon',
        value: '********',
      },
      {
        label: '总重量',
        fieldName: 'cargoWeightKg',
        value: '*****',
      },
      {
        label: '总体积',
        fieldName: 'cargoVolumeDm3',
        value: '********',
      },
      {
        label: '总件数',
        fieldName: 'cargoQty',
        value: '*******',
      },
      {
        label: '易碎品',
        fieldName: 'isBreakable',
        value: '**************',
        span: 2,
      },
      {
        label: '备注',
        fieldName: 'cargoRemark',
        value: '占位一整行',
        span: 4,
      },
    ],
  },
  freight: {
    name: 'freight',
    title: '运费信息',
    data: [
      {
        label: '计费模式',
        fieldName: 'calFeeType',
        value: '*******',
      },
      {
        label: '运费单价',
        value: '*****',
      },

      {
        label: '路损类型',
        fieldName: 'roadLossType',
        value: '**************',
        tooltip: '测试字符串提示',
      },
      {
        label: '路耗定额',
        fieldName: 'roadLossKg',
        value: '*****',
      },
      {
        label: '整车承载',
        fieldName: 'loadKgPerCar',
        slotName: 'loadKgPerCar',
        value: '*******',
      },
      {
        label: '保险购买',
        fieldName: 'buyInsurance',
        value: '**************',
        tooltip: '测试函数方式提示',
        // tooltip: () => (
        //   <div>
        //     <div>测试函数方式提示</div>
        //   </div>
        // ),
      },
    ],
  },
  line: {
    name: 'line',
    title: '线路信息',
    slotName: 'line',
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
```

:::

### TModuleForm Attributes

---

#### 1、简介：基于 TForm 表单组件及 TDetail 详情组件的再次封装，使页面可以分模块的方式（可以收缩）展示 form 表单或者详情页面

> TModuleForm 模块表单/详情组件**代码示例：**

```html
<!-- 第一种 表单形式 -->
<t-module-form
  title="模块表单组件运用"
  subTitle="模块表单222"
  ref="sourceForm"
  :formOpts="formOpts"
  :submit="submit"
  :tabs="tabs"
  @handleEvent="handleEvent"
/>
<!-- 第二种详情展示 根据handleType-->
<t-module-form
  title="模块详情组件运用"
  subTitle="模块详情222"
  ref="sourceDetail"
  handleType="desc"
  :descData="descData"
  :tabs="tabs"
/>
```

#### 2、配置参数（Attributes）继承 t-form/t-detail Attributes

| 参数             | 说明                                                                             | 类型        | 默认值       |
| :--------------- | :------------------------------------------------------------------------------- | :---------- | :----------- |
| title            | 头部返回按钮标题                                                                 | string      | 无           |
| titleSlot        | 是否使用插槽显示 title                                                           | Boolean     | false        |
| subTitle         | 头部副标题                                                                       | string      | 无           |
| extra            | 操作区，位于 title 行的行尾(右侧)                                                | slot        | 无           |
| footer           | 底部操作区（默认展示“取消/保存”按钮；使用插槽则隐藏）footer="null"时隐藏底部操作 | String slot | 无           |
| tabs             | 页面展示是否需要页签（并且 tabs 的 key 是插槽）                                  | Array       | 无           |
| isGoBackEvent    | 点击头部返回（默认返回上一页，设置此值可以自定义 back 事件）                     | Boolean     | false        |
| handleType       | 显示方式（'edit':form 表单操作，'desc':表详情页面）                              | string      | edit         |
| ----edit         | handleType=edit 表 form 表单操作的属性                                           | -           | -            |
| ------formOpts   | 表单配置描述，支持多分组表单                                                     | Object      | 无           |
| ------submit     | 点击保存时返回所有表单数据（数据格式 promise 且可显示 loading 状态）             | function    | 所有表单数据 |
| -----desc        | handleType=desc 表详情页面的属性                                                 | -           | -            |
| ------descColumn | 详情页面展示每行显示几列（handleType= desc 生效）                                | Number      | 4            |
| ------descData   | 详情页面配置描述，支持多分组表 （handleType= desc 生效）                         | Object      | 无           |

##### 2-1、formOpts 配置参数

| 参数      | 说明                                      | 类型    | 默认值 |
| :-------- | :---------------------------------------- | :------ | :----- |
| title     | 表单标题(是否显示控制折叠面板功能)        | String  | 无     |
| slotName  | 插槽(自定义表单数据)有插槽就无需配置 opts | slot    | 无     |
| name      | 每组表单定义的名字（作用：是否默认展开）  | String  | 无     |
| widthSize | 每行显示几个输入项（默认两项） 最大值 4   | Number  | 3      |
| disabled  | 禁用时取消收缩功能及隐藏 icon）           | Boolean | false  |
| opts      | 表单配置项                                | Object  | 无     |

###### 2-1-1、opts 配置参数

| 参数            | 说明                                                                                                    | 类型         | 默认值 |
| :-------------- | :------------------------------------------------------------------------------------------------------ | :----------- | :----- |
| rules           | 规则（可依据 element-plus el-form 配置————对应 formData 的值）                                          | Object/Array | -      |
| operatorList    | 操作按钮 list                                                                                           | Array        | -      |
| listTypeInfo    | 下拉选择数据源（type:'select'有效）                                                                     | Object       | -      |
| labelPosition   | 改变表单项 label 与输入框的布局方式(默认：right) /top                                                   | String       | right  |
| labelWidth      | label 宽度(默认值 120px)                                                                                | String       | 120px  |
| formData        | 表单提交数据(对应 fieldList 每一项的 value 值)                                                          | Object       | -      |
| fieldList       | form 表单每项 list                                                                                      | Array        | -      |
| ----slotName    | 自定义表单某一项输入框                                                                                  | slot         | -      |
| ----comp        | form 表单每一项组件是输入框还是下拉选择等（可使用第三方 UI 如 el-select/el-input 也可以使用自定义组件） | String       | -      |
| ----bind        | 表单每一项属性（继承第三方 UI 的 Attributes，如 el-input 中的 clearable 清空功能）默认清空及下拉过滤    | Object       | -      |
| ----type        | form 表单每一项类型                                                                                     | String       | -      |
| ----widthSize   | form 表单某一项所占比例(如果一行展示可以设值：1)                                                        | Number       | 2      |
| ----width       | form 表单某一项所占实际宽度                                                                             | String       | -      |
| ----arrLabel    | type=select-arr 时，每个下拉显示的中文                                                                  | String       | label  |
| ----arrKey      | type=select-arr 时，每个下拉显示的中文传后台的数字                                                      | String       | key    |
| ----label       | form 表单每一项 title                                                                                   | String       | -      |
| ----labelRender | 自定义某一项 title                                                                                      | function     | -      |
| ----value       | form 表单每一项传给后台的参数                                                                           | String       | -      |
| ----rules       | 每一项输入框的表单校验规则                                                                              | Object/Array | -      |
| ----list        | 下拉选择数据源（仅仅对 type:'select'有效）                                                              | String       | -      |
| ----event       | 表单每一项事件标志（handleEvent 事件）                                                                  | String       | -      |

##### 2-2、descData 配置参数

| 参数         | 说明                                      | 类型            | 默认值 |
| :----------- | :---------------------------------------- | :-------------- | :----- |
| title        | 详情标题(是否显示控制折叠面板功能)        | String          | -      |
| slotName     | 插槽(自定义详情数据)有插槽就无需配置 data | slot            | -      |
| name         | 每组详情定义的名字（作用：是否默认展开）  | String          | -      |
| disabled     | 禁用时取消收缩功能及隐藏 icon）           | Boolean         | false  |
| data         | 详情配置项                                | Object          | -      |
| ----label    | 详情字段说明标题                          | String          | -      |
| ----value    | 详情字段返回值                            | String          | -      |
| ----slotName | 插槽（自定义 value）                      | slot            | -      |
| ----span     | 占用的列宽，默认占用 1 列，最多 4 列      | Number          | 1      |
| ----tooltip  | value 值的提示语                          | String/function | -      |

#### 3、events

| 事件名        | 说明                 | 返回值                                       |
| :------------ | :------------------- | :------------------------------------------- |
| handleEvent   | 单个查询条件触发事件 | fieldList 中的 event 值和对应输入的 value 值 |
| tabsChange    | 点击 tab 切换触发    | 被选中的标签 tab 实例                        |
| validateError | 校验失败抛出事件     | obj——每个收缩块的对象                        |
| back          | 头部标题点击返回事件 | -                                            |

#### 4、Methods

| 事件名          | 说明         | 参数                |
| :-------------- | :----------- | :------------------ |
| resetFormFields | 重置表单     | -                   |
| clearValidate   | 清空校验     | -                   |
| setSelectedTab  | 默认选中 tab | 默认选中 tab 插槽名 |
