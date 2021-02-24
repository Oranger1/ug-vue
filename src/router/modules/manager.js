export default {
    path: "/home",
    name: "home",
    mate:{
      title:'员工管理'
    },
    component: () => import('../../views/Home.vue'),
    children:[
      {
        path: "/userInfo/one",
        name: "userInfo-one",
        mate:{
          title:'管理员管理',
          icon:'el-icon-user-solid',
        },
        component: () => import('../../views/manager/managerInfo.vue')
      },
      {
        path: "/userInfo/two",
        name: "userInfo-two",
        mate:{
          title:'地铁站管理',
          icon:'el-icon-star-on',
        },
        component: () => import('../../views/station/stationInfo.vue')
      }
    ],
}