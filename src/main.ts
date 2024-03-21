
// unocss
import 'virtual:uno.css'

// reset style 
import "@/design/index.less"

// dayjs
import "dayjs/locale/zh-cn";
import { createApp } from 'vue'
import App from './App.vue'

// vue Router
// 路由守卫
import router from "@/router"
import errorHandler from '@/utils/errorHandler';

// ant design 
import Antd from 'ant-design-vue';
// antd css
import 'ant-design-vue/dist/reset.css';

// svg配置
import 'virtual:svg-icons-register'

import { setupStore } from '@/store';

const app = createApp(App);
app.config.errorHandler = errorHandler;

// router-guard
app.use(router);

// 配置 store
setupStore(app)
// antd
app.use(Antd)


// 等路由ready以后再进行挂载组件
router.isReady().then(() => app.mount("#app"));

// 在导航期间每次发生未捕获的错误时都会调用该处理程序
// eslint-disable-next-line no-console
router.onError((err) => {
    console.error(err);
});