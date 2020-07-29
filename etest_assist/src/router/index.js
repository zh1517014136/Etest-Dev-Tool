import Vue from 'vue'
import VueRouter from 'vue-router'
import EEmpty from '../components/EEmpty.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: EEmpty
    }, {

        // 数据转换工具
        path: '/tool/dataformat',
        name: 'EToolDataFormat',
        component: () => import( /* webpackChunkName: "e_tool_dataformat" */ '../views/EToolDataFormat'),
    }, {
        // 图标库
        path: '/tool/icons',
        name: 'EToolIcons',
        component: () => import( /* webpackChunkName: "e_tool_icons" */ '../views/EToolIcons'),
    }, {
        // 转态机生成器
        path: '/tool/state_code',
        name: 'EToolStateCode',
        component: () => import( /* webpackChunkName: "e_tool_statecode" */ '../views/EToolStateCode'),
    },
    {
        // 组合配对工具
        path: '/tool/pairing',
        name: 'EToolPairing',
        component: () => import( /* webpackChunkName: "e_tool_statecode" */ '../views/EToolPairing'),
    },
    {
        // 陆工大工具
        path: '/tool/engineering',
        name: 'EToolEngineering',
        component: () => import( /* webpackChunkName: "e_tool_statecode" */ '../views/EToolEngineering'),
    },
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router