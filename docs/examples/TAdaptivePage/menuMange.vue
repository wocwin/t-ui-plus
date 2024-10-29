<template>
  <t-adaptive-page
    class="menu_mange"
    title="菜单管理页面"
    row-key="path"
    isTree
    align="left"
    :table="table"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    :columns="table.columns"
    :isShowPagination="false"
    :opts="opts"
    @submit="conditionEnter"
    height="100%"
  >
    <template #toolbar>
      <el-button type="primary" @click="createHandle">新增菜单</el-button>
    </template>
    <el-dialog :title="title" width="50%" draggable v-model="addDialog">
      <t-form
        v-model="formOpts.ref"
        :formOpts="formOpts"
        :widthSize="2"
        @handle-event="handleEvent"
      />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addDialog = false">取消</el-button>
          <el-button type="primary" @click="addConfirm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </t-adaptive-page>
</template>

<script setup lang="tsx" name="menuMange">
import { computed, onMounted, reactive, ref, toRefs } from "vue"
import { ElMessageBox, ElMessage } from "element-plus"
import { Warning } from "@element-plus/icons-vue"
import menuData from "./menu.json"
interface MenuOptions {
  menuId: number
  parentId: number // 上级菜单
  orderNum: number // 排序
  menuType: string // 菜单类型 M 目录 C 菜单 F 按钮
  path: string // 菜单路径(路由地址)
  component?: string // 视图文件路径(组件路径)
  name: string // 菜单别名
  redirect?: string // 重定向地址
  meta: MetaProps // 菜单meta信息
  children?: MenuOptions[]
}
interface MetaProps {
  icon?: string // 菜单图标
  title: string // 菜单标题
  activeMenu?: string // 当前路由为详情页时，需要高亮的菜单
  isLink?: string // 是否外链
  isHide: boolean // 是否隐藏
  isFull: boolean // 是否全屏
  isAffix: boolean // 是否固定在 tabs nav
  isKeepAlive: boolean // 是否缓存
}
const title = ref("新增菜单")
const addDialog = ref(false)
const menuOptions = ref<MenuOptions[]>([])
const formOpts = reactive<FormTypes.FormOpts>({
  ref: null,
  formData: {
    parentId: 0, // 上级菜单
    menuType: "M", // 菜单类型
    title: null, // 菜单名称
    orderNum: 0, // 显示排序
    icon: undefined, // 菜单图标
    isShowLink: false, // 是否外链
    isLink: null, // 外链地址
    isHide: false, // 是否隐藏
    isFull: false, // 是否全屏
    isAffix: false, // 是否固定
    isKeepAlive: false, // 是否缓存
    activeMenu: null, // 高亮菜单
    path: null, // 路由地址
    component: null, // 组件路径
    remark: null // 备注
  },
  fieldList: [
    {
      label: "上级菜单",
      value: "parentId",
      comp: "el-cascader",
      isSelfCom: true,
      bind: {
        props: {
          checkStrictly: true,
          emitPath: false,
          children: "children",
          label: "label",
          value: "menuId"
        },
        "show-all-levels": false,
        options: []
      },
      widthSize: 1
    },
    {
      label: "菜单类型",
      value: "menuType",
      type: "radio",
      list: "menuTypeList",
      comp: "el-radio-group",
      arrKey: "value",
      eventHandle: {
        change: (val: any) => menuTypeChange(val)
      }
    },
    {
      label: "是否隐藏",
      value: "isHide",
      type: "radio",
      list: "isHideList",
      comp: "el-radio-group",
      arrKey: "value",
    },
    { label: "菜单名称", value: "title", type: "input", comp: "el-input" },
    {
      label: "显示排序",
      value: "orderNum",
      type: "inputNumber",
      comp: "el-input-number",
      bind: { "controls-position": "right", min: 0 }
    },
    { label: "菜单图标", value: "icon", comp: "t-select-icon", isSelfCom: true },
    {
      label: "是否外链",
      value: "isShowLink",
      type: "radio",
      list: "whetherList",
      comp: "el-radio-group",
      event: "isShowLink",
      arrKey: "value",
    },
    {
      label: "是否全屏",
      value: "isFull",
      type: "radio",
      list: "whetherList",
      comp: "el-radio-group",
      arrKey: "value",
    },
    {
      label: "是否固定",
      labelRender: () => {
        return (
          <div style="cursor:pointer;display:flex;align-items:center;">
            是否固定
            <el-tooltip content="是否固定在 tabs nav不可删除" placement="top">
              <el-icon>
                <Warning />
              </el-icon>
            </el-tooltip>
          </div>
        )
      },
      value: "isAffix",
      type: "radio",
      list: "whetherList",
      comp: "el-radio-group",
      arrKey: "value",
    },
    {
      label: "是否缓存",
      value: "isKeepAlive",
      type: "radio",
      list: "whetherList",
      comp: "el-radio-group",
      arrKey: "value",
      widthSize: 1
    },
    {
      label: "外链地址",
      value: "isLink",
      type: "input",
      comp: "el-input",
      isHideItem: true
    },
    {
      label: "高亮菜单",
      labelRender: () => {
        return (
          <div style="cursor:pointer;display:flex;align-items:center;">
            高亮菜单
            <el-tooltip content="若当前路由为详情页时，需要配置此值指定高亮的菜单" placement="top">
              <el-icon>
                <Warning />
              </el-icon>
            </el-tooltip>
          </div>
        )
      },
      value: "activeMenu",
      type: "input",
      comp: "el-input"
    },
    { label: "路由地址", value: "path", type: "input", comp: "el-input", widthSize: 1 },
    {
      label: "组件路径",
      value: "component",
      type: "input",
      comp: "el-input",
      isHideItem: true,
      widthSize: 1
    },
    { label: "备注", value: "remark", type: "input", comp: "el-input", widthSize: 1 }
  ],
  rules: {
    title: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
    orderNum: [{ required: true, message: "请输入显示排序", trigger: "blur" }],
    isLink: [{ required: true, message: "请输入外链地址", trigger: "blur" }],
    path: [{ required: true, message: "请输入路由地址", trigger: "blur" }],
    component: [{ required: true, message: "请输入组件路径", trigger: "blur" }]
  },
  // 相关列表
  listTypeInfo: {
    whetherList: [
      { label: "是", value: true },
      { label: "否", value: false }
    ],
    isHideList: [
      { label: "隐藏", value: true },
      { label: "显示", value: false }
    ],
    menuTypeList: [
      { label: "目录", value: "M" },
      { label: "菜单", value: "C" }
      // { label: "按钮", value: "F" }
    ]
  }
})
// 表单输入--触发change事件
const handleEvent = (type: any, val: any) => {
  console.log("handleEvent", type, val)
  if (type === "isShowLink") {
    formOpts.fieldList.map((item: { value: string; isHideItem?: boolean }) => {
      if (item.value === "isLink") {
        item.isHideItem = !val
      }
    })
  }
}
// 菜单类型--change事件
const menuTypeChange = (val: string) => {
  const shouldShowComponent = val === "C"
  formOpts.fieldList.forEach((item: { value: string; isHideItem?: boolean }) => {
    if (item.value === "component") {
      item.isHideItem = !shouldShowComponent
    }
  })
}

// 弹窗确定提交
const addConfirm = () => {
  formOpts.ref.validate((valid: any) => {
    console.log(88, valid)
    if (!valid) return
    console.log("最终数据", formOpts.formData)
    ElMessage.success("新增成功")
    addDialog.value = false
  })
}
const handleDelete = (row: any) => {
  console.log("点击删除", row)
  ElMessageBox.confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      ElMessage.success({
        message: "删除成功!"
      })
    })
    .catch(() => {
      ElMessage.info({
        message: "已取消删除"
      })
    })
}
const edit = (row: any) => {
  console.log("编辑", row)
  addDialog.value = true
  title.value = "编辑菜单"
  const { parentId, menuType, label, orderNum, isShowLink, path, component, remark, meta } = row
  const { fieldList } = formOpts
  fieldList.forEach((item: { value: string; isHideItem?: boolean }) => {
    const shouldShow =
      (item.value === "component" && menuType === "C") || (item.value === "isLink" && isShowLink)
    if (item.value === "component" || item.value === "isLink") {
      item.isHideItem = !shouldShow
    }
  })
  formOpts.formData = {
    parentId,
    menuType,
    title: label,
    orderNum,
    isShowLink,
    icon: meta.icon,
    isFull: meta.isFull,
    isHide: meta.isHide,
    isAffix: meta.isAffix,
    isKeepAlive: meta.isKeepAlive,
    isLink: meta.isLink,
    activeMenu: meta.activeMenu,
    path,
    component,
    remark
  }
}
const handleAdd = (row: any) => {
  console.log("表格内新增", row)
  addDialog.value = true
  title.value = "新增菜单"
  resetForm()
  formOpts.fieldList.forEach((item: { value: string; isHideItem?: boolean }) => {
    const shouldShow = formOpts.formData.menuType === "C" || formOpts.formData.isShowLink
    if (item.value === "component" || item.value === "isLink") {
      item.isHideItem = !shouldShow
    }
  })
  formOpts.formData.parentId = row.parentId
}
const createHandle = () => {
  console.log("新增")
  addDialog.value = true
  title.value = "新增菜单"
  resetForm()
  formOpts.fieldList.forEach((item: { value: string; isHideItem?: boolean }) => {
    const shouldShow = formOpts.formData.menuType === "C" || formOpts.formData.isShowLink
    if (item.value === "component" || item.value === "isLink") {
      item.isHideItem = !shouldShow
    }
  })
}
const resetForm = () => {
  formOpts.formData = {
    parentId: 0, // 上级菜单
    menuType: "M", // 菜单类型
    title: null, // 菜单名称
    orderNum: 0, // 显示排序
    icon: undefined, // 菜单图标
    isShowLink: false, // 是否外链
    isLink: null, // 外链地址
    isHide: false, // 是否隐藏
    isFull: false, // 是否全屏
    isAffix: false, // 是否固定
    isKeepAlive: false, // 是否缓存
    activeMenu: null, // 高亮菜单
    path: null, // 路由地址
    component: null, // 组件路径
    remark: null // 备注
  }
  formOpts.ref?.resetFields()
}

const state: any = reactive({
  queryData: {
    title: null, // 菜单名称
    path: null // 菜单路径
  }
})
const table = reactive<TableTypes.Table>({
  data: [],
  columns: [
    {
      label: "菜单名称",
      render: (text: any, row: any) => {
        return <div>{row.meta.title}</div>
      },
      minWidth: 180
    },
    {
      label: "菜单图标",
      render: (text: any, row: any) => {
        return <t-icon icon={row.meta.icon}></t-icon>
      },
      minWidth: 80
    },
    {
      prop: "menuType",
      label: "菜单类型",
      minWidth: 120,
      render: (text: string) => {
        const typeMap: TypeMap = {
          M: { type: "info", val: "目录" },
          C: { type: "success", val: "菜单" },
          F: { type: "warning", val: "按钮" }
        }
        const { type, val } = typeMap[text] || {}
        return <el-tag type={type}>{val}</el-tag>
      }
    },
    { prop: "name", label: "菜单 name", minWidth: 180 },
    { prop: "path", label: "菜单路径", minWidth: 180 },
    { prop: "component", label: "组件路径", minWidth: 180 }
  ],
  operator: [
    {
      text: "新增",
      fun: handleAdd
    },
    {
      text: "编辑",
      fun: edit
    },
    {
      text: "删除",
      fun: handleDelete
    }
  ],
  // 操作列样式
  operatorConfig: {
    fixed: "right", // 固定列表右边（left则固定在左边）
    align: "left",
    width: "160",
    label: "操作"
  }
})
const opts = computed(() => {
  return {
    title: {
      label: "菜单名称",
      comp: "el-input"
    },
    path: {
      label: "菜单路径",
      comp: "el-input"
    }
  }
})
// 最终参数获取
const getQueryData = computed(() => {
  const { title, path } = toRefs(state.queryData)
  return {
    title: title.value,
    path: path.value
  }
})
// 点击查询按钮
const conditionEnter = (data: any) => {
  // console.log(1122, data);
  state.queryData = data
  console.log("最终参数", getQueryData.value)
  getMenuData()
}
onMounted(() => {
  getMenuData()
})
// 获取菜单数据
const getMenuData = async () => {
  const res = await menuData
  console.log(999, res)
  if (res.success) {
    table.data = res.data
    let arr: MenuOptions[] = []
    const menu: MenuOptions = {
      parentId: 0,
      menuId: 0,
      orderNum: 0,
      menuType: "M",
      path: "",
      component: "",
      name: "",
      meta: {
        title: "主类目",
        isHide: false,
        isFull: false,
        isAffix: false,
        isKeepAlive: false
      },
      children: []
    }
    menu.children = res.data
    arr.push(menu)
    const data = await handleTreeData(arr)
    menuOptions.value = data
    // console.log("menuOptions.value", menuOptions.value);
    formOpts.fieldList[0].bind.options = menuOptions.value
  }
}
// 递归处理上级菜单数据
const handleTreeData = (data: any) => {
  data.forEach((item: any) => {
    item.label = item.meta.title
    item.value = item.menuId
    if (item.children) {
      handleTreeData(item.children)
    }
  })
  return data
}
</script>
