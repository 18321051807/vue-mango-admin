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



