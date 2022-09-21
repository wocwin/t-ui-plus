import { defineUserConfig, defaultTheme } from 'vuepress'

import { path } from '@vuepress/utils'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
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
        href: './favicon.ico'
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
        link: 'https://github.com/wocwin/t-ui'
      },
      {
        text: 'Gitee码云',
        link: 'https://gitee.com/wocwin/t-ui'
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
          children: ['/baseComponents/TQueryCondition/base.md']
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
      registerComponentsPlugin({
        componentsDir: path.resolve(__dirname, './components/docsComponents'),
        components: {
          CodeFormat: path.resolve(__dirname, './components/code-format.vue')
        }
      })
    ]
    // [
    //   'vuepress-plugin-demoblock-plus',
    //   {
    //     customClass: 'demoblock-custom',
    //     // theme: 'github-light',
    //     scriptReplaces: [
    //       {
    //         searchValue:
    //           /const ({ defineComponent as _defineComponent }) = Vue/g,
    //         replaceValue: 'const { defineComponent: _defineComponent } = Vue'
    //       }
    //     ]
    //   }
    // ]
  ],
  bundler: viteBundler({
    viteOptions: {
      ssr: {
        noExternal: ['element-plus']
      }
    },
    vuePluginOptions: {}
  })
})
