/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-12-01 11:36:20
 * @Description:
 */
import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import qiankun from "vite-plugin-qiankun";
// 样式插件 推荐vscode安装windicss  文档地址：https://cn.windicss.org/utilities/animations/animation.html
import WindiCSS from "vite-plugin-windicss";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const config = {
    plugins: [
      vue(),
      vueJsx(),
      WindiCSS(),
      qiankun("sub-app-name", {
        // 微应用名字，与主应用注册的微应用名字保持一致
        useDevMode: true,
      }),
      legacy({
        targets: ["defaults", "ie >= 11", "chrome 52"], //需要兼容的目标列表，可以设置多个
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
        renderLegacyChunks: true,
        polyfills: [
          "es.symbol",
          "es.array.filter",
          "es.promise",
          "es.promise.finally",
          "es/map",
          "es/set",
          "es.array.for-each",
          "es.object.define-properties",
          "es.object.define-property",
          "es.object.get-own-property-descriptor",
          "es.object.get-own-property-descriptors",
          "es.object.keys",
          "es.object.to-string",
          "web.dom-collections.for-each",
          "esnext.global-this",
          "esnext.string.match-all",
        ],
      }),
    ],
    base: env.VITE_BASE_URL || "./",
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 31201,
      origin: "//localhost:31107",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      proxy: {
        "/api": {
          rewrite: (path: string) => path.replace(/^\/api/, ""),
          target: "http://172.30.3.235:10014",
          changeOrigin: true,
        },
      },
    },
    paths: {
      "@/*": ["./src/*"],
    },
    output: {
      library: `app-[name]`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_app`,
    },
  };
  return config;
});
