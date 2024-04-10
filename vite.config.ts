/*
 * @Author: kkle
 * @Date: 2022-08-30 16:31:52
 * @LastEditTime: 2024-04-10 14:49:51
 * @LastEditors: kkle
 * @Description:
 * @FilePath: /vue-mango-admin/vite.config.ts
 */
import { resolve } from "path";
import { ConfigEnv, loadEnv, UserConfig, defineConfig } from "vite";
import { alias } from "./build/utils"
import { getPluginsList } from './build/plugins'
import { generateModifyVars } from "./build/modifyVars"
export default ({ mode }: ConfigEnv): UserConfig => {
  const env: any = loadEnv(mode, process.cwd(), "");

  return {
    base: env.NODE_ENV == "production" ? "./" : "/",
    define: {
      "process.platform": null,
      "process.version": null,
    },
    assetsInclude: resolve(__dirname, "./src/assets"), // 静态资源处理
    envPrefix: ["VITE", "VUE"],
    resolve: {
      alias,
      extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".mjs"], // 类型： string[] 导入时想要省略的扩展名列表。
    },
    plugins: getPluginsList(),
    server: {
      hmr: { overlay: false },
      // 服务配置
      host: "0.0.0.0",
      port: env.VITE_PORT,
      open: true,
      cors: true,
      proxy: {
        "/api": {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          secure: false,
          // eslint-disable-next-line no-shadow
          rewrite: (p) => p.replace(/^\/api/, ""),
        },
        '/basic-api': {
          target: env.VITE_APP_BASIC_API,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/basic-api`), ''),
          // only https
          secure: false
        },
        '/local-api': {
          target: env.VITE_APP_LOCAL_URL,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/local-api`), ''),
          // only https
          secure: false
        },
      },
    },
    esbuild: {
      pure: env.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    build: {
      target: "modules",
      cssTarget: 'chrome80',
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: false,
      minify: "esbuild",
      chunkSizeWarningLimit: 1000,
    },
    css: {
      preprocessorOptions: {
        less: {
          // 初始化可直接覆盖变量
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },
    optimizeDeps: {
      include: [
        'echarts/core',
        'echarts/charts',
        'echarts/components',
        'echarts/renderers',
        'qrcode',
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
  };
};
