import type { AppRouteModule } from '@/router/types';

const charts: AppRouteModule = {
    path: '/charts123',
    name: 'Charts123',
    meta: {
        title: "",
        isShow: false
    },
    component: () => import("@/views/login/Index.vue")
}


export default charts;
