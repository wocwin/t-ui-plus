'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const isProduction = process.env.NODE_ENV === 'production'
const name = 'Vue3 中基于Element-plus二次封装基础组件文档' // 标题

module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development' ? 'error' : false, // 生成环境取消 eslint 验证
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  productionSourceMap: false,
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
    hotOnly: true,
    open: true, // 自动打开浏览器
    port: '8002', // 端口
    noInfo: false,
    // 可以通过设置让浏览器 overlay 同时显示警告和错误
    overlay: {
      warnings: process.env.NODE_ENV === 'development',
      errors: process.env.NODE_ENV === 'development'
    },
    proxy: {
      '^/mes': {
        target: `http://10.0.10.243:5000/mesv2`, // 开发环境
        changeOrigin: true,
        pathRewrite: {
          '^/mes': ''
        }
      },
      // 总用户权限管理系统 http://10.0.10.240:8172/portal-user/doc.html
      '^/portal-user': {
        target: `http://10.0.10.240:8172`, // 开发
        // target: `http://10.0.10.213:8172`, // sit
        // target: `http://172.16.40.223:9011`, // prod
        changeOrigin: true,
        pathRewrite: {
          '^/portal-user': '/portal-user'
        }
      },
      // 登录校验服务器 http://10.0.10.240:8171/portal-sso/doc.html
      '^/portal-sso': {
        target: `http://10.0.10.240:8171`, // 开发环境
        // target: `http://10.0.10.213:8171`, // sit环境
        // target: `http://172.16.40.223:9010`, // prod
        changeOrigin: true,
        pathRewrite: {
          '^/portal-sso': '/portal-sso'
        }
      }
    },
    disableHostCheck: true
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss'),
      ]
    }
  },
  // 修改 src 目录 为 examples 目录
  pages: {
    index: {
      entry: 'examples/main.ts',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: config => {
    config.name = name
    config.resolve.alias['@'] = resolve('examples')
    config.resolve.alias['components'] = resolve('examples/components')
    config.resolve.alias['~'] = resolve('packages')
    // 生产环境配置
    if (isProduction) {
      config.mode = 'production'
      // 打包文件大小配置
      config.performance = {
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
      }
    }
  }
}