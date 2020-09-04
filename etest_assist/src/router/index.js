import Vue from 'vue'
import VueRouter from 'vue-router'
import EEmpty from '../components/EEmpty.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: EEmpty
    }, 
    {
      // 练习工具
      path: '/tool/network',
      name: 'EToolNetwork',
      title:'网络调试助手',
      icon:'mdi-lan',
      component: () => import( /* webpackChunkName: "e_tool_statecode" */ '../views/EToolNetwork'),
  },
    {

        // 数据转换工具
        path: '/tool/dataformat',
        name: 'EToolDataFormat',
        title:'数据转换工具',
        icon:'mdi-database',
        component: () => import( /* webpackChunkName: "e_tool_dataformat" */ '../views/EToolDataFormat'),
    }, {
        // 图标库
        path: '/tool/icons',
        name: 'EToolIcons',
        title:'图标库',
        icon:'mdi-simple-icons',

        component: () => import( /* webpackChunkName: "e_tool_icons" */ '../views/EToolIcons'),
    }, {
        // 状态机生成器
        path: '/tool/state_code',
        name: 'EToolStateCode',
        title:'状态机生成器',
        icon:'mdi-state-machine',

        component: () => import( /* webpackChunkName: "e_tool_statecode" */ '../views/EToolStateCode'),
    },
    {
      // 状态机生成器
      path: '/tool/read_me',
      name: 'Readme',
      title:'状态机生成器',
      icon:'mdi-state-machine',

      component: () => import( /* webpackChunkName: "e_tool_statecode" */ '../views/Readme'),
  },
    // {
    //     // 组合配对工具
    //     path: '/tool/pairing',
    //     name: 'EToolPairing',
    //     title:'组合配对工具',
    //     icon:'mdi-rhombus-split-outline',

    //     component: () => import( /* webpackChunkName: "e_tool_statecode" */ '../views/EToolPairing'),
    // },
    // {
    //     // 陆工大工具
    //     path: '/tool/serialport',
    //     name: 'EToolSerialport',
    //     title:'串口调试助手',
    //     icon:'mdi-serial-port',

    //     component: () => import( /* webpackChunkName: "e_tool_statecode" */ '../views/EToolSerialport'),
    // },
   
    // {
    //     // 练习工具
    //     path: '/tool/EToolNetworkTcp',
    //     name: 'EToolNetworkTcp',
    //     title:'网络调试助手',
    //     icon:'mdi-lan',
    //     component: () => import( /* webpackChunkName: "e_tool_statecode" */ '../views/EToolNetworkTcp'),
    // },
//     {
//       // 练习工具
//       path: '/tool/lrMoveMindows',
//       name: 'lrMoveMindows',
//       title:'左右移动窗口',
//       icon:'mdi-dock-window',
//       component: () => import( /* webpackChunkName: "e_tool_statecode" */ '../views/lrMoveMindows'),
//   },
//   {
//     // 练习工具
//     path: '/tool/tbMoveMindows',
//     name: 'tbMoveMindows',
//     title:'上下移动窗口',
//     icon:'mdi-dock-window',
//     component: () => import( /* webpackChunkName: "e_tool_statecode" */ '../views/tbMoveMindows'),
// }, {
//     // 练习工具
//     path: '/tool/EToolCloseCard',
//     name: 'EToolCloseCard',
//     title:'可关闭卡片',
//     icon:'mdi-dock-window',
//     component: () => import( /* webpackChunkName: "e_tool_statecode" */ '../views/EToolCloseCard'),
// },
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router