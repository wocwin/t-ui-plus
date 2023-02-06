import { DefaultTheme,defineConfig } from 'vitepress'
import demoblock from 'vitepress-demoblock'

export default defineConfig({
  title: 'TuiPlus基础组件文档',
  description: '基于Element-plus基础组件封装使用',
  lang: 'cn-ZH',
  base: '/t-ui-plus/',
  lastUpdated: true,
  themeConfig: {
    logo: '/favicon.ico',
    siteTitle: 'TuiPlus基础组件文档',
    outline: 3,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wocwin/t-ui-plus' }
    ],
    nav:[
      {
        text: '安装指南',
        link: '/components/'
      },
      { text: '基础组件', link: '/components/TSelect/base.md' },
      {
        text: 'GitHub地址',
        link: 'https://github.com/wocwin/t-ui-plus'
      },
      {
        text: 'Gitee码云地址',
        link: 'https://gitee.com/wocwin/t-ui-plus'
      },
      {
        text: '博客',
        items: [
          { text: 'CSDN', link: 'https://blog.csdn.net/cwin8951' },
          { text: '掘金', link: 'https://juejin.cn/user/888061128344087/posts' }
        ]
      }
    ],
    sidebar:{
      '/components': [
        {
          text: '常用组件',
          items: [
            { text: '下拉选择组件', link: '/components/TSelect/base.md' },
            { text: '下拉选择表格组件', link: '/components/TSelectTable/base.md' },
          ]
        },
        {
          text: '复杂组件',
          items: [
            { text: '条件查询组件', link: '/components/TQueryCondition/base.md' },
            { text: '表单组件', link: '/components/TForm/base.md' },
            { text: 'table组件', link: '/components/TTable/base.md' },
          ]
        }
      ]
    }
  },
  markdown: {
    config(md) {
      md.use(demoblock)
    }
  }
})
