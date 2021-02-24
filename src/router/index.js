import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import home from "./modules/manager"

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue')
  },
  {
    path: '/',
    redirect:'home' // 默认跳登录页面  可以直接改成home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  home,
  // {
  //   path: '/user-index',
  //   name: 'user-index',
  //   component: () => import('../views/user/user-index.vue')
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
router.afterEach( (to,from) => {
  // console.log(to,from,'to,from');
  if (to.name == 'login' && from.name) {
      location.reload()
  }
})

export default router;
