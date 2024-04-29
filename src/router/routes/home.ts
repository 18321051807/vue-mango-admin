
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const charts: AppRouteModule = {
    path: '/home',
    name: 'Home',
    redirect: '/home/page',
    component: LAYOUT,
    meta: {
        title: "zhuye"
    },
    children: [
        {
            path: 'page',
            name: 'Page',
            meta: {
                title: "主页"
            },
            component: () => import("@/views/home/Index.vue")

        }
    ]
}


export default charts;
