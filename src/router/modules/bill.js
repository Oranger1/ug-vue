export default {
    path: "/home",
    name: "home",
    mate:{
      title:'账单管理'
    },
    component: () => import('../../views/Home.vue'),
    children:[
      {
        path: "/userInfo/one",
        name: "userInfo-one",
        mate:{
          title:'账单管理',
          icon:'el-icon-user-solid',
        },
        component: () => import('../../views/manager/managerInfo.vue')
      }
    ],
}