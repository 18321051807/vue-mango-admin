/*
 * @Author: kkle
 * @Date: 2024-03-12 11:20:56
 * @LastEditors: kkle
 * @LastEditTime: 2024-03-18 10:26:15
 * @Description: 
 */

import type { App } from 'vue';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 创建
const store = createPinia();
store.use(piniaPluginPersistedstate)

export function setupStore(app: App<Element>) {
    app.use(store);
}
// 导出
export { store };



