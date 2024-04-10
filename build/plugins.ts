
import vue from "@vitejs/plugin-vue";
import type { PluginOption } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import { vitePluginFakeServer } from "vite-plugin-fake-server";
import svgLoader from "vite-svg-loader";
import removeConsole from "vite-plugin-remove-console";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from "path";

import UnoCSS from 'unocss/vite'

export function getPluginsList(): PluginOption[] {
    // const lifecycle = process.env.npm_lifecycle_event;
    return [
        vue(),
        // * vite 可以使用 jsx/tsx 语法
        vueJsx(),
        AutoImport({
            imports: [
                'vue',
                'vue-router',
                'pinia'
            ],
            dts: 'src/auto-import.d.ts',
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        // mock支持
        // vitePluginFakeServer({
        //     logger: false,
        //     include: "mock",
        //     infixName: false,
        //     enableProd: true
        // }),
        // svg组件化支持
        svgLoader(),
        // 线上环境删除console
        removeConsole({ external: ["src/assets/iconfont/iconfont.js"] }),
        UnoCSS(),
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
            // 指定symbolId格式
            symbolId: 'icon-[dir]-[name]'
        })
    ];

}
