<template>
  <t-layout-page>
    <t-layout-page-item>
      <t-table :table="table" :columns="table.columns" :listTypeInfo="table.listTypeInfo">
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>

<script setup lang="ts">
import { reactive } from "vue"
const nameFocus = (val, scope) => {
  console.log("姓名聚焦事件", val.type, scope)
}
const nameBlur = (val, prop, scope) => {
  console.log("姓名失焦事件", val, prop, scope.row[prop], scope.$index)
  table.data[scope.$index].remake = `${scope.row[prop]}动态设置`
}
const nameClear = scope => {
  console.log("姓名清空事件", scope)
}
// 数量change事件
const numChange = (val, prop, scope) => {
  console.log("数量change事件", val, prop, scope.row[prop])
  table.data[scope.$index].amount = val * table.data[scope.$index].price
}
let table = reactive<TableTypes.Table>({
  data: [
    {
      name: null,
      num: null,
      price: 6,
      amount: null,
      hobby: null,
      hobby1: [],
      hobby2: [],
      year: null,
      time: null,
      remake: null,
      number: 12
    },
    {
      name: "李四",
      num: 2,
      price: 6,
      amount: 12,
      hobby: "2",
      hobby1: ["0", "2"],
      hobby2: ["0", "2"],
      year: "2021",
      time: "2022-01-19 16:58:58",
      remake: "备注李四",
      number: 15
    }
  ],
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
        editComponent: "el-input",
        rules: {
          required: true,
          message: "请输入姓名",
          trigger: "blur"
        },
        eventHandle: {
          focus: ({ val, scope }) => nameFocus(val, scope),
          clear: ({ scope }) => nameClear(scope),
          blur: ({ val, prop, scope }) => nameBlur(val, prop, scope)
        }
      }
    },
    {
      prop: "num",
      label: "数量",
      minWidth: "160",
      canEdit: true,
      headerRequired: true,
      configEdit: {
        label: "数量",
        editComponent: "el-input-number",
        bind: {
          controls: false
        },
        rules: {
          required: true,
          message: "请输入数量",
          trigger: "blur"
        },
        eventHandle: {
          change: ({ val, prop, scope }) => numChange(val, prop, scope)
        }
      }
    },
    {
      prop: "price",
      label: "单价",
      minWidth: "160",
      canEdit: true,
      configEdit: {
        label: "单价",
        type: "input",
        editComponent: "el-input",
        bind: {
          disabled: true
        }
      }
    },
    {
      prop: "amount",
      label: "金额",
      minWidth: "160",
      canEdit: true,
      configEdit: {
        label: "金额",
        type: "input",
        editComponent: "el-input",
        bind: {
          disabled: true
        }
      }
    },
    {
      prop: "remake",
      label: "输入框",
      minWidth: "220",
      canEdit: true,
      headerRequired: true,
      configEdit: {
        label: "备注",
        append: "吨",
        rules: {
          required: true,
          message: "请输入备注",
          trigger: "blur"
        },
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
