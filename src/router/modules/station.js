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
      name: "station-one",
      mate:{
        title:'地铁站概览',
        icon:'el-icon-user-solid',
      },
      component: () => import('../../views/station/station-gailan.vue')
    },
    {
      path: "/thrid",
      name: "station-thrid",
      mate:{
        title:'线路管理',
        icon:'el-icon-star-on',
      },
      component: () => import('../../views/line/lineInfo.vue')
    },
    {
      path: "/two",
      name: "station-two",
      mate:{
        title:'地铁站管理',
        icon:'el-icon-star-on',
      },
      component: () => import('../../views/station/stationInfo.vue')
    }
  ],
}