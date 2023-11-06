/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-11-03 15:33:56
 * @Description:
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import qiankun from 'vite-plugin-qiankun'
// 样式插件 推荐vscode安装windicss  文档地址：https://cn.windicss.org/utilities/animations/animation.html
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const config = {
    base: env.VITE_BASE_URL,
    // 打包地址
    // build: {
    //   outDir: '../jaka-web-app/dist/sub-apps/jaka-web-coding'
    // },
    plugins: [
      vue(),
      vueJsx(),
      WindiCSS(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false // css in js
          })
        ]
      }),
      qiankun('sub-app-name', {
        // 微应用名字，与主应用注册的微应用名字保持一致
        useDevMode: true
      })
    ],
    paths: {
      '@/*': ['./src/*']
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0',
      port: 50808,
      origin: '//localhost:5173',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      proxy: {
        '/api': {
          rewrite: (path: string) => path.replace(/^\/api/, ''),
          target: 'http://localhost:7001',
          changeOrigin: true
        }
      }
    },
    output: {
      library: `coding-control-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_coding-control`
    }
  }
  return config
})
