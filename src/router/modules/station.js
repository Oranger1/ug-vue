export default {
  path: "/station",
  name: "home",
  mate:{
    title:'地铁站管理'
  },
  component: () => import('../../views/Home.vue'),
  children:[
    {
      path: "/one",
      name: "userInfo-one",
      mate:{
        title:'地铁站概览',
        icon:'el-icon-user-solid',
      },
      component: () => import('../../views/station/station-gailan.vue')
    },
    {
      path: "/two",
      name: "userInfo-two",
      mate:{
        title:'地铁站管理',
        icon:'el-icon-star-on',
      },
      component: () => import('../../views/station/stationInfo.vue')
    }
  ],
}