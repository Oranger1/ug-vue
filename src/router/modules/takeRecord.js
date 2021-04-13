export default {
    path: "/takeRecord",
    name: "takeRecord",
    mate:{
      title:'乘车记录管理'
    },
    component: () => import('../../views/Home.vue'),
    children:[
      {
        path: "/takeRecord/one",
        name: "takeRecord-one",
        mate:{
          title:'乘车记录管理',
          icon:'el-icon-user-solid',
        },
        component: () => import('../../views/takeRecord/takeRecordInfo.vue')
      }
    ],
}