<template>
  <t-layout-page>
    <t-layout-page-item>
      <el-button type="danger" @click="add">新增</el-button>
      <el-button type="danger" @click="edit">编辑</el-button>
      <el-button type="primary" @click="onDisabled">禁用输入框</el-button>
    </t-layout-page-item>
    <el-dialog :title="title" width="40%" v-model="dialogSelectEnt" draggable>
      <t-form ref="TFormDemo" v-model="formOpts.ref" :formOpts="formOpts" :widthSize="1" />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogSelectEnt = false">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </t-layout-page>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
const dialogSelectEnt = ref(false)
const isDisabled = ref(false)
const title = ref("新增数据")
const hobbyList = ref([
  { label: "吉他", value: "0" },
  { label: "看书", value: "1" },
  { label: "美剧", value: "2" },
  { label: "旅游", value: "3" },
  { label: "音乐", value: "4" }
])
const sexList = ref([
  { label: "女", value: 1 },
  { label: "男", value: 0 }
])
const statusList = ref([
  { label: "启用", value: 1 },
  { label: "停用", value: 0 }
])
// 获取ref
const TFormDemo: any = ref(null)
// 提交formOpts.ref 方式form表单
const submitForm = () => {
  formOpts.ref.validate(valid => {
    console.log("校验是否通过", valid)
    if (!valid) return
    console.log("最终数据", formOpts.formData)
    setTimeout(() => {
      dialogSelectEnt.value = false
    }, 1000)
  })
}
const add = () => {
  title.value = "新增数据"
  isDisabled.value = false
  formOpts.fieldList.map(val => {
    if (val.value === "password") {
      val.isHideItem = false
    }
  })
  dialogSelectEnt.value = true
}
const edit = () => {
  title.value = "编辑数据--少密码输入框"
  isDisabled.value = false
  formOpts.fieldList.map(val => {
    if (val.value === "password") {
      val.isHideItem = true
    }
  })
  dialogSelectEnt.value = true
}
const onDisabled = () => {
  title.value = "禁用输入框数据"
  isDisabled.value = true
  dialogSelectEnt.value = true
}
// 提交form表单
// const submitForm = async () => {
//   const { valid, formData } = await TFormDemo.value.validate()
//   console.log('formOpts.ref', formOpts.ref)
//   console.log('formOpts.formData', formData)
//   if (!valid) return
//   console.log('最终数据', formData)
// }

const formOpts = reactive<FormTypes.FormOpts>({
  ref: null,
  formData: {
    account: null, // *用户账号
    password: null, // *用户密码
    name: null, // *用户昵称
    sex: null, // *性别: 0:男 1:女
    hobby: null, // *爱好: 0:男 1:女
    status: null, // *状态: 0：停用，1：启用(默认为1)',
    desc: null // 描述
  },
  fieldList: [
    {
      label: "账号",
      value: "account",
      type: "input",
      comp: "el-input",
      event: "account",
      rules: { required: true, message: "请输入账号", trigger: "blur" },
      bind: () => {
        return {
          disabled: isDisabled.value
        }
      }
    },
    {
      label: "密码",
      value: "password",
      type: "password",
      comp: "el-input",
      bind: () => {
        return {
          "show-password": true,
          disabled: isDisabled.value
        }
      },
      isHideItem: false
    },
    {
      label: "昵称",
      value: "name",
      type: "input",
      comp: "el-input",
      rules: { required: true, message: "请输入昵称", trigger: "blur" },
      bind: () => {
        return {
          disabled: isDisabled.value
        }
      }
    },
    {
      label: "性别",
      value: "sex",
      placeholder: "TSelect单选",
      comp: "t-select",
      isSelfCom: true,
      bind: () => {
        return {
          optionSource: sexList.value,
          valueCustom: "value",
          disabled: isDisabled.value
        }
      }
    },
    {
      label: "状态",
      value: "status",
      placeholder: "TSelect单选",
      comp: "t-select",
      isSelfCom: true,
      bind: () => {
        return {
          optionSource: statusList.value,
          valueCustom: "value",
          disabled: isDisabled.value
        }
      }
    },
    {
      label: "爱好",
      value: "hobby",
      placeholder: "TSelect多选",
      comp: "t-select",
      isSelfCom: true,
      bind: () => {
        return {
          multiple: true,
          optionSource: hobbyList.value,
          valueCustom: "value",
          disabled: isDisabled.value
        }
      }
    },
    {
      label: "描述",
      value: "desc",
      type: "textarea",
      comp: "el-input",
      widthSize: 1,
      bind: () => {
        return {
          disabled: isDisabled.value
        }
      }
    }
  ]
})
</script>
