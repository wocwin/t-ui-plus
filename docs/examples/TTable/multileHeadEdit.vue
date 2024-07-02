<template>
  <t-layout-page class="multile_head_edit_demo">
    <t-layout-page-item>
      <t-table
        title="多级表头单元格编辑"
        ref="multileHeadSingleEdit"
        :table="state.table"
        :columns="state.table.columns"
        :isShowPagination="false"
        :listTypeInfo="state.table.listTypeInfo"
        isShowFooterBtn
        @save="singleSave"
        @handleEvent="handleEvent"
      >
        <template #toolbar>
          <div class="add_data">
            <el-input-number v-model="num" clearable placeholder="请输入追加条数"></el-input-number>
            <el-button type="primary" @click="add">追加{{ num ? num : "" }}条数据</el-button>
          </div>
          <el-button type="primary" v-if="state.table.data.length > 0" @click="clearData"
            >清空</el-button
          >
          <el-button type="primary" v-if="state.table.data.length > 0" @click="save"
            >另一种获取table数据</el-button
          >
        </template>
      </t-table>
    </t-layout-page-item>
  </t-layout-page>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from "vue"
import tselectData from "./tselecttabledata.json"
// 添加数据条数
const num = ref(2)
const multileHeadSingleEdit: any = ref(null)
const tableData: any = ref([])
const areaList: any = ref([])
// 获取下拉选择表格数据
const getSelectTableList = async () => {
  const res = await tselectData
  if (res.success) {
    tableData.value = res?.data.rows
  }
}
// 调用方法获取返回数据
const save = () => {
  multileHeadSingleEdit.value.saveMethod((data: any) => {
    console.log("调用方法获取返回数据---saveMethod", data)
  })
}
// 清除数据
const clearData = () => {
  state.table.data = []
}

// 添加数据
const add = () => {
  if (num.value > 0) {
    for (let i = 0; i < num.value; i++) {
      state.table.data.push({})
    }
  }
}
// 点击保存按钮获取table数据
const singleSave = (data: any) => {
  console.log("点击保存按钮获取table数据", data)
}
// 编辑单元格监听事件
const handleEvent = (type: any, val: any, index: any) => {
  console.log(`自己标识编辑单元格event值：${type}---修改后的值：${val}----当前所在行：${index}`)
}

const radioChange = (row: any, scope: any) => {
  console.log("下拉选择表格-单选", row, scope)
  state.table.data[scope.$index].deptCode = row.userId
}

onMounted(() => {
  getSelectTableList()
  getList()
})
const getList = () => {
  const list = [
    {
      label: "炉头",
      key: "1"
    },
    {
      label: "炉中",
      key: "2"
    },
    {
      label: "炉尾",
      key: "3"
    }
  ]
  areaList.value = list
}

let state: any = reactive({
  table: {
    data: [],
    columns: [
      {
        prop: "name1",
        label: "第一级表头第一类",
        minWidth: "320",
        children: [
          {
            prop: "area",
            label: "装炉位置(使用t-select)",
            minWidth: "160",
            headerRequired: true,
            canEdit: true,
            configEdit: {
              label: "装炉位置",
              editComponent: "t-select",
              isSelfCom: true,
              bind: {
                valueCustom: "key",
                labelCustom: "label",
                optionSource: areaList
              }
            }
          },
          {
            prop: "layer",
            label: "装炉层(使用el-select)",
            minWidth: "160",
            headerRequired: true,
            canEdit: true,
            configEdit: {
              label: "装炉层",
              type: "select-arr",
              editComponent: "el-select",
              list: "furnaceLayerList",
              arrLabel: "label",
              arrKey: "key"
            }
          }
        ]
      },

      {
        prop: "",
        label: "第一级表头第二类",
        minWidth: "280",
        children: [
          {
            prop: "deptCode",
            label: "t-select-table使用",
            minWidth: "180",
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
            prop: "name1",
            label: "第二级表头",
            minWidth: "100",
            children: [
              {
                prop: "isTail",
                label: "是否尾包",
                minWidth: "100",
                canEdit: true,
                configEdit: {
                  label: "是否尾包",
                  type: "checkbox",
                  editComponent: "el-checkbox"
                }
              }
            ]
          }
        ]
      },
      {
        prop: "",
        label: "第一级表头第三类",
        minWidth: "640",
        children: [
          {
            prop: "",
            label: "第三类第二级表头",
            minWidth: "640",
            children: [
              {
                prop: "packageNumStart",
                label: "开始编号",
                minWidth: "160",
                headerRequired: true,
                canEdit: true,
                configEdit: {
                  label: "开始编号",
                  placeholder: "请输入开始编号",
                  type: "input",
                  editComponent: "el-input"
                }
              },
              {
                prop: "packageNumEnd",
                label: "结束编号",
                minWidth: "160",
                canEdit: true,
                headerRequired: true,
                configEdit: {
                  label: "结束编号",
                  placeholder: "请输入结束编号",
                  type: "input",
                  editComponent: "el-input"
                }
              },
              {
                prop: "",
                label: "第三级表头",
                minWidth: "360",
                children: [
                  {
                    prop: "startDate",
                    label: "生产日期(t-date-picker)",
                    minWidth: "180",
                    canEdit: true,
                    headerRequired: true,
                    configEdit: {
                      label: "生产日期",
                      type: "date",
                      editComponent: "t-date-picker",
                      bind: {
                        isPickerOptions: true
                      }
                    }
                  },
                  {
                    prop: "endDate",
                    label: "出炉日期(el-date-picker)",
                    minWidth: "180",
                    canEdit: true,
                    configEdit: {
                      label: "出炉日期",
                      type: "date",
                      editComponent: "el-date-picker",
                      bind: {
                        "value-format": "YYYY-MM-DD"
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        prop: "singleWeight",
        label: "单包重量（吨）",
        minWidth: "160",
        canEdit: true,
        configEdit: {
          label: "单包重量（吨）",
          type: "input",
          editComponent: "el-input-number",
          event: "singleWeight"
        }
      }
    ],
    listTypeInfo: {
      furnaceLayerList: [
        {
          label: "上层",
          key: "1"
        },
        {
          label: "中层",
          key: "2"
        },
        {
          label: "下层",
          key: "3"
        }
      ]
    }
  }
})
</script>
<style lang="scss" scoped>
.multile_head_edit_demo {
  .add_data {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }
}
</style>
