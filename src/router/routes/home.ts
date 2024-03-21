
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';


const charts: AppRouteModule = {
    path: '/home',
    name: 'Home',
    component: LAYOUT,
    meta: {
        title: "zhuye"
    },
    children: [
        {
            path: '/home',
            name: 'Home',
            meta: {
                title: "主页"
            },
            component: () => import("@/views/home/Index.vue")

        }
    ]
}


export default charts;
