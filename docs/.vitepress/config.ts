import { defineConfig } from "vitepress"
import { mdPlugin } from "./plugins/mdPlugin"
import pkg from "../../package.json"
// 生产环境判断
const content = [
  "vue 版本的 t-ui-plus",
  "vue t-ui-plus",
  "t-ui-plus vue",
  "TuiPlus",
  "t-ui-plus",
  "element-plus",
  "Page level components",
  "component library",
  "ui framework",
  "ui",
  "基础组件",
  "二次封装",
  "wocwin",
  "vue"
].toString()
export default defineConfig({
  title: "TuiPlus基础组件文档",
  description: content,
  lang: "cn-ZH",
  base: "/t-ui-plus/",
  head: [
    ["meta", { name: "author", content: "wocwin" }],
    [
      "meta",
      {
        name: "viewport",
        content:
          "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
      }
    ],
    [
      "meta",
      {
        name: "description",
        content
      }
    ],
    ["meta", { name: "keywords", content }],
    ["link", { rel: "icon", href: "./favicon.ico" }]
  ],
  lastUpdated: true,
  themeConfig: {
    logo: "/logo.jpg",
    siteTitle: "TuiPlus基础组件文档",
    outline: 3,
    search: {
      provider: "local"
    },
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    outlineTitle: "本页导航",
    lastUpdatedText: "上次更新时间",
    docFooter: {
      prev: "上一页",
      next: "下一页"
    },
    socialLinks: [{ icon: "github", link: "https://github.com/wocwin/t-ui-plus" }],
    nav: [
      {
        text: "安装指南",
        link: "/guide/"
      },
      { text: "基础组件", link: "/components/TInput/base.md" },
      {
        text: "GitHub地址",
        link: "https://github.com/wocwin/t-ui-plus"
      },
      {
        text: "Gitee码云地址",
        link: "https://gitee.com/wocwin/t-ui-plus"
      },
      {
        text: `v${pkg.version}`,
        items:[
          {
            text: "版本升级",
            link: "/guide/upgrade"
          },
          {
            text: "历史版本",
            link: "https://github.com/wocwin/t-ui-plus/releases"
          }
        ]
      },
      {
        text: "演练场",
        link: "https://wocwin.github.io/wocwin-playground/"
      }
    ],
    sidebar: {
      "/guide/": [
        {
          text: "安装指南",
          items: [
            {
              text: "简介",
              link: "/guide/index"
            },
            {
              text: "安装",
              link: "/guide/installation"
            },
            {
              text: "快速开始",
              link: "/guide/quickstart"
            },
            {
              text: "Resolver按需引入",
              link: "/guide/resolver"
            }
          ]
        }
      ],
      "/components": [
        {
          text: "常用组件",
          items: [
            {
              text: "输入框组件<el-tag type='danger'>v1.4.12</el-tag> ",
              link: "/components/TInput/base.md"
            },
            { text: "下拉选择组件", link: "/components/TSelect/base.md" },
            { text: "详情组件", link: "/components/TDetail/base.md" },
            { text: "Button组件", link: "/components/TButton/base.md" },
            { text: "Radio组件", link: "/components/TRadio/base.md" },
            { text: "多选框组组件", link: "/components/TCheckbox/base.md" },
            { text: "日期组件", link: "/components/TDatePicker/base.md" },
            { text: "Tabs组件", link: "/components/TTabs/base.md" },
            { text: "步骤组件", link: "/components/TStepWizard/base.md" },
            {
              text: "图标选择组件<el-tag type='danger'>v1.4.12</el-tag> ",
              link: "/components/TSelectIcon/base.md"
            }
          ]
        },
        {
          text: "复杂组件",
          items: [
            {
              text: "TAdaptivePage组件",
              link: "/components/TAdaptivePage/base.md"
            },
            { text: "Chart图表组件", link: "/components/TChart/base.md" },
            {
              text: "下拉选择表格组件",
              link: "/components/TSelectTable/base.md"
            },
            {
              text: "Virtualized TSelectTable<el-tag type='danger'>v1.4.13</el-tag>",
              link: "/components/multipleVirtual/base.md"
            },
            {
              text: "条件查询组件",
              link: "/components/TQueryCondition/base.md"
            },
            { text: "表单组件", link: "/components/TForm/base.md" },
            { text: "模块表单组件", link: "/components/TModuleForm/base.md" },
            { text: "table组件", link: "/components/TTable/base.md" },
            {
              text: "Virtualized TTable<el-tag type='danger'>v1.4.13</el-tag>",
              link: "/components/TTableVirtual/base.md"
            }
          ]
        }
      ]
    }
  },
  markdown: {
    lineNumbers: true,
    config: (md: any) => mdPlugin(md)
  }
})
