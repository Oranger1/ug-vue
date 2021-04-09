import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// import Vconsole from 'vconsole'
// const vconsole = new Vconsole()
// Vue.use(vconsole)

Vue.config.productionTip = false;


// axios
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5754"
Vue.prototype.$axios = axios;
// 饿了么UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 图片验证
import SlideVerify from 'vue-monoplasty-slide-verify';
Vue.use(SlideVerify);
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import './style/index.scss'

import {get, post, put} from './http/http'
Vue.prototype.$get=get;
Vue.prototype.$post=post;
Vue.prototype.$put=put;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
