//import Vue from 'vue' Vue变量名 vue是包名
/**
 * import Vue from 'vue'


// 导入element-ui
import elementUi from 'element-ui'
// 基于vue的需要集成
Vue.use(elementUi)
*/

import router from './router'
//导入根组件
import App from './App'
// 导入时间过滤器
import './filters'


import 'element-ui/lib/theme-chalk/index.css'



import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{

  // 需要用到require
    loading: require('./statics/images/02.gif')
})

// 导入vuex
import store from './store'

// import '../test/test2'
new Vue({
  // 导入路由
  router, //集成路由之后 App.vue实例上就挂载了$route $router

  // 注入仓库 供所有子组件使用 
  store, //$store
  render: h => h(App)
}).$mount('#app')
