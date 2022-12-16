import Vue from 'vue'
import App from './App'

import store from 'store'
import service from "@/common/service.js"
Vue.prototype.$service = service;
Vue.prototype.$store = store;
Vue.prototype.$Store = store;

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)


//富文本
import uParse from '@/components/gaoyia-parse/parse.vue'
Vue.component('uParse',uParse)

// 剪裁头像
import avatar from "./components/yq-avatar/yq-avatar.vue";
Vue.component('avatar',avatar)
// 导航
import topbar from "./components/top_bar/top_bar.vue";
Vue.component('topbar',topbar)
// 图片懒加载
import myLazyLoad from "./components/my_lazy_load/my_lazy_load.vue";
Vue.component('myLazyLoad',myLazyLoad)

import kfewm from './components/kf_ewm/kf_ewm.vue'
Vue.component('kfewm',kfewm)

// #ifndef VUE3
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif