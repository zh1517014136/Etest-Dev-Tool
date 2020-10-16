import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'EToolNetwork',
    component: () => import( /* webpackChunkName: "e_tool_statecode" */ '../views/EToolNetwork'),
  },
  // {
  //   // 练习工具
  //   path: '/tool/network',
  //   name: 'EToolNetwork',
  //   title: '网络调试助手',
  //   icon: 'mdi-lan',
  //   component: () => import( /* webpackChunkName: "e_tool_statecode" */ '../views/EToolNetwork'),
  // },
  // {
  //   // 数据转换工具
  //   path: '/tool/dataformat',
  //   name: 'EToolDataFormat',
  //   title: '数据转换工具',
  //   icon: 'mdi-database',
  //   component: () => import( /* webpackChunkName: "e_tool_dataformat" */ '../views/EToolDataFormat'),
  // }, {
  //   // 图标库
  //   path: '/tool/icons',
  //   name: 'EToolIcons',
  //   title: '图标库',
  //   icon: 'mdi-simple-icons',

  //   component: () => import( /* webpackChunkName: "e_tool_icons" */ '../views/EToolIcons'),
  // }, {
  //   // 状态机生成器
  //   path: '/tool/state_code',
  //   name: 'EToolStateCode',
  //   title: '状态机生成器',
  //   icon: 'mdi-state-machine',

  //   component: () => import( /* webpackChunkName: "e_tool_statecode" */ '../views/EToolStateCode'),
  // },
  // {
  //   // 状态机生成器
  //   path: '/tool/mackdown',
  //   name: 'Mackdown',
  //   title: '状态机生成器',
  //   icon: 'mdi-state-machine',

  //   component: () => import( /* webpackChunkName: "e_tool_statecode" */ '../views/Mackdown'),
  // },
]
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
export default router