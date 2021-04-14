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
      name: "station-four",
      mate:{
        title:'地铁运营情况',
        icon:'el-icon-user-solid',
      },
      component: () => import('../../views/station/stationSitutation.vue')
    },
    {
      path: "/one",
      name: "station-one",
      mate:{
        title:'购票乘车',
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
    },
    
  ],
}