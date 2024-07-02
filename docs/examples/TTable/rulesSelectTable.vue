<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table
        title="单元格编辑TSelectTable--rules"
        :table="state.table"
        :columns="state.table.columns"
        :isShowPagination="false"
        ref="singleEditTSelectTable"
        :listTypeInfo="state.listTypeInfo"
        @handleEvent="handleEvent"
        @save="singleSave"
        @validateError="validateError"
        isShowFooterBtn
      >
        <template #toolbar>
          <div class="add_data" style="display: flex; margin-right: 10px">
            <el-input-number v-model="num" clearable placeholder="请输入追加条数"></el-input-number>
            <el-button type="primary" @click="add">追加{{ num ? num : "" }}条数据</el-button>
          </div>
          <el-button type="primary" @click="save">另一种获取table数据</el-button>
          <el-button @click="clearValidate">清除校验规则</el-button>
          <el-button type="primary" @click="reset">重置表单</el-button>
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="tsx">
import { ElMessage } from "element-plus"
import { onMounted, reactive, ref } from "vue"
import tselectData from "./tselecttabledata.json"
// const singleEditTSelectTable: any = (ref < HTMLElement) | (null > null)
const singleEditTSelectTable: any = ref(null)
// 添加数据条数
const num = ref(3)
// 下拉表格数据
const tableData: any = ref([])
// 保存
const save = () => {
  // console.log('另一种获取的table--ref', singleEditTSelectTable.value)
  singleEditTSelectTable.value.saveMethod(data => {
    console.log("调用方法获取返回数据---saveMethod", data)
  })
}
// 点击保存获取table数据
const singleSave = data => {
  console.log("单个单元格编辑保存--saveshijian", data)
}
// 编辑单元格监听事件
const handleEvent = (type, val, index) => {
  console.log(`自己标识编辑单元格event值：${type}---修改后的值：${val}----当前所在行：${index}`)
}
// 添加数据
const add = () => {
  if (num.value > 0) {
    for (let i = 0; i < num.value; i++) {
      state.table.data.push({})
    }
  }
}
// 清除校验规则
const clearValidate = () => {
  singleEditTSelectTable.value.clearValidate()
}
// 重置表单
const reset = () => {
  singleEditTSelectTable.value.resetFields()
}
const editDel = (item, index, row) => {
  // console.log('9966--', singleEditTSelectTable.value.save())
  row.splice(index, 1)
  console.log("删除", item, row, index)
}
// 错误校验提示
const validateError = list => {
  list.map(val => {
    setTimeout(() => {
      ElMessage.error(`${val}是必填项！`)
    }, 100)
  })
}
const radioChange = (row: any, scope: any) => {
  console.log("下拉选择表格-单选", row, scope)
  // formOpts.formData.deptCode = row.userId;
  state.table.data[scope.$index].deptCode = row.userId
}
// 获取下拉选择表格数据
const getSelectTableList = async () => {
  const res = await tselectData
  if (res.success) {
    tableData.value = res?.data.rows
  }
}
onMounted(() => {
  getSelectTableList()
})
let state: any = reactive({
  table: {
    rules: {
      hobby: [{ required: true, message: "请至少选择一个爱好", trigger: "change" }],
      deptCode: [{ required: true, message: "请选择用户名称", trigger: "change" }],
      year: [{ required: true, message: "请选择年份", trigger: "change" }],
      name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
    },
    firstColumn: { type: "index", label: "序列" }, // 显示序列号
    data: [],
    columns: [
      {
        prop: "name",
        label: "姓名",
        minWidth: "160",
        canEdit: true,
        headerRequired: true,
        configEdit: {
          label: "姓名",
          type: "input",
          editComponent: "el-input"
        }
      },
      {
        prop: "deptCode",
        label: "t-select-table使用",
        minWidth: "220",
        headerRequired: true,
        canEdit: true,
        configEdit: {
          label: "用户名称",
          editComponent: "t-select-table",
          isSelfCom: true,
          bind: {
            isKeyup: true,
            maxHeight: 400,
            selectWidth: 500,
            defaultSelectVal: [],
            keywords: { label: "userName", value: "userId" },
            table: { data: tableData },
            columns: [
              { prop: "userName", label: "登录名", minWidth: "120" },
              { prop: "nickName", label: "插槽使用", minWidth: "120" },
              { prop: "deptName", label: "部门", minWidth: "120" },
              { prop: "roleName", label: "角色", minWidth: "120" },
              { prop: "descript", label: "描述", minWidth: "180" },
              { prop: "createTime", label: "创建时间", minWidth: "180" }
            ]
          },
          eventHandle: {
            radioChange: ({ row, scope }) => radioChange(row, scope)
          }
        }
      },
      {
        prop: "unit",
        label: "单位",
        minWidth: "220",
        canEdit: true,
        headerRequired: true,
        configEdit: {
          label: "单位",
          append: "吨",
          rules: { required: true, message: "请输入单位", trigger: "blur" },
          bind: { "prefix-icon": "el-icon-search" },
          editComponent: "el-input"
        }
      },
      {
        prop: "hobby",
        label: "爱好单选",
        minWidth: "180",
        headerRequired: true,
        canEdit: true,
        configEdit: {
          label: "爱好单选",
          type: "select-arr",
          editComponent: "el-select",
          list: "hobbyList",
          event: "hobbyList",
          arrLabel: "label",
          arrKey: "value"
        }
      },
      {
        prop: "year",
        label: "日期年",
        minWidth: "180",
        canEdit: true,
        headerRequired: true,
        configEdit: {
          label: "日期年",
          type: "year",
          editComponent: "el-date-picker",
          bind: { valueFormat: "YYYY" }
        }
      },
      {
        prop: "time",
        label: "日期时间",
        minWidth: "180",
        canEdit: true,
        configEdit: {
          label: "日期时间",
          type: "datetime",
          editComponent: "el-date-picker",
          bind: {
            valueFormat: "yyyy-MM-dd hh:mm:ss"
          }
        }
      },
      {
        prop: "number",
        label: "计数器",
        minWidth: "220",
        canEdit: true,
        configEdit: {
          label: "计数器",
          type: "inputNumber",
          bind: { min: 0, max: 99 },
          editComponent: "el-input-number"
        }
      },
      {
        prop: "remake",
        label: "备注",
        minWidth: "220",
        canEdit: true,
        configEdit: {
          label: "备注",
          type: "textarea",
          bind: { type: "textarea" },
          editComponent: "el-input"
        }
      }
    ],
    // 表格内操作列
    operator: [
      {
        type: "danger",
        text: "删除",
        fun: editDel
      }
    ],
    operatorConfig: {
      fixed: "right"
    }
  },
  // 下拉选择项
  listTypeInfo: {
    hobbyList: [
      { label: "吉他", value: "0" },
      { label: "看书", value: "1" },
      { label: "美剧", value: "2" },
      { label: "旅游", value: "3" },
      { label: "音乐", value: "4" }
    ]
  }
})
</script>
