
import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';


const charts: AppRouteModule = {
    path: '/mango',
    name: 'Mango',
    redirect: '/mango/effect',
    component: LAYOUT,
    meta: {
        title: "zhuye"
    },
    children: [
        {
            path: 'effect',
            name: 'Effect',
            meta: {
                title: "主页"
            },
            component: () => import("@/views/hatsuneMiku/Index.vue")
        }
    ]
}


export default charts;
