export default {
    path: "/bill",
    name: "bill",
    mate:{
      title:'账单管理'
    },
    component: () => import('../../views/Home.vue'),
    children:[
      {
        path: "/bill/one",
        name: "bill-one",
        mate:{
          title:'账单管理',
          icon:'el-icon-user-solid',
        },
        component: () => import('../../views/bill/billInfo.vue')
      }
    ],
}