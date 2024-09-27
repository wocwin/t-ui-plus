import { defineConfig } from "vitepress"
import { mdPlugin } from "./config/plugins"
export default defineConfig({
  title: "TuiPlus基础组件文档",
  description: "基于Element-plus基础组件封装使用",
  lang: "cn-ZH",
  base: "/t-ui-plus/",
  lastUpdated: true,
  themeConfig: {
    logo: "/favicon.ico",
    siteTitle: "TuiPlus基础组件文档",
    outline: 3,
    socialLinks: [{ icon: "github", link: "https://github.com/wocwin/t-ui-plus" }],
    nav: [
      {
        text: "安装指南",
        link: "/components/"
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
        text: "博客",
        items: [
          { text: "CSDN", link: "https://blog.csdn.net/cwin8951" },
          {
            text: "掘金",
            link: "https://juejin.cn/user/888061128344087/posts"
          }
        ]
      }
    ],
    sidebar: {
      "/components": [
        {
          text: "常用组件",
          items: [
            { text: "输入框组件<el-tag type='danger'>v1.4.12</el-tag> ", link: "/components/TInput/base.md" },
            { text: "下拉选择组件", link: "/components/TSelect/base.md" },
            { text: "详情组件", link: "/components/TDetail/base.md" },
            { text: "Button组件", link: "/components/TButton/base.md" },
            { text: "Radio组件", link: "/components/TRadio/base.md" },
            { text: "多选框组组件", link: "/components/TCheckbox/base.md" },
            { text: "日期组件", link: "/components/TDatePicker/base.md" },
            { text: "Tabs组件", link: "/components/TTabs/base.md" },
            { text: "步骤组件", link: "/components/TStepWizard/base.md" },
            { text: "图标选择组件<el-tag type='danger'>v1.4.12</el-tag> ", link: "/components/TSelectIcon/base.md" },
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
            { text: "Virtualized TSelectTable<el-tag type='danger'>v1.4.13</el-tag>", link: "/components/multipleVirtual/base.md" },
            {
              text: "条件查询组件",
              link: "/components/TQueryCondition/base.md"
            },
            { text: "表单组件", link: "/components/TForm/base.md" },
            { text: "模块表单组件", link: "/components/TModuleForm/base.md" },
            { text: "table组件", link: "/components/TTable/base.md" },
            { text: "Virtualized TTable<el-tag type='danger'>v1.4.13</el-tag>", link: "/components/TTableVirtual/base.md" }
          ]
        }
      ]
    }
  },
  markdown: {
    headers: {
      level: [0, 0]
    },
    // light: #f9fafb, dark: --vp-code-block-bg
    theme: { light: "github-light", dark: "github-dark" },
    config: md => mdPlugin(md)
  }
})
