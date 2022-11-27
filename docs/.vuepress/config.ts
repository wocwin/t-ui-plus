import { defineUserConfig, defaultTheme } from 'vuepress'

import path from 'path'
import demoBlock from 'vuepress-plugin-demo-code-block'
import { viteBundler } from '@vuepress/bundler-vite'
export default defineUserConfig({
  lang: 'zh-CN',
  title: 'TuiPlus基础组件文档',
  description: '基于Element-plus基础组件封装使用',
  base: '/t-ui-plus/',
  open: true,
  port: 2222,
  head: [
    [
      'link',
      {
        rel: 'icon', // 增加一个自定义的 favicon(网页标签的图标)
        href: '/favicon.ico'
      }
    ],
    [
      'link',
      {
        rel: 'stylesheet', // 增加一个自定义的 favicon(网页标签的图标)
        href: `/t-ui-plus/css/index.css`
      }
    ]
  ],
  theme: defaultTheme({
    home: '/',
    navbar: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '基础组件',
        link: '/baseComponents/'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/wocwin/t-ui-plus'
      },
      {
        text: 'Gitee码云',
        link: 'https://gitee.com/wocwin/t-ui-plus'
      },
      {
        text: '博客',
        children: [
          { text: 'CSDN', link: 'https://blog.csdn.net/cwin8951' },
          { text: '掘金', link: 'https://juejin.cn/user/888061128344087/posts' }
        ]
      }
    ],
    sidebar: {
      '/baseComponents/': [
        {
          text: '常用组件',
          children: [
            '/baseComponents/TSelect/base.md',
            '/baseComponents/TQueryCondition/base.md',
            '/baseComponents/TForm/base.md'
          ]
        },
        {
          text: 'TTable组件',
          children: ['/baseComponents/TTable/base.md']
        }
      ]
    }
  }),
  plugins: [
    [
      demoBlock({
        componentsDir: path.resolve(__dirname, './../examples'), // 组件目录路径, Component directory path
        githubEditLinkPath:
          'https://github.com/wocwin/t-ui-plus/edit/master/docs/examples/' // github编辑地址路径, the path of github edit link
      })
    ]
  ],
  bundler: viteBundler({
    viteOptions: {
      configFile: path.resolve(__dirname, './vite.config.ts')
      // ssr: {
      //   noExternal: ['element-plus']
      // }
    },
    vuePluginOptions: {}
  })
})
